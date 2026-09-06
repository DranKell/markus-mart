import os
import sqlite3
import smtplib
import re
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
from flask import Flask, render_template, request, redirect, url_for, flash, session, send_from_directory, g
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash, generate_password_hash
from dotenv import load_dotenv

# ═══════════════════════════════════════════════════════════════
# ЗАГРУЗКА .ENV
# ═══════════════════════════════════════════════════════════════

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ENV_PATH = os.path.join(BASE_DIR, ".env")

# Если .env нет — создаём с дефолтами
if not os.path.exists(ENV_PATH):
    with open(ENV_PATH, "w", encoding="utf-8") as f:
        f.write("""# Маркус-март — конфигурация\n\nADMIN_USERNAME=admin\nADMIN_PASSWORD=markus2024\n\nSMTP_SERVER=smtp.yandex.ru\nSMTP_PORT=465\nSMTP_USER=info@markus-mart.ru\nSMTP_PASSWORD=your_password_here\nADMIN_EMAIL=admin@markus-mart.ru\n\nSECRET_KEY=markus-mart-secret-key-change-me\n""")

load_dotenv(ENV_PATH)

# ═══════════════════════════════════════════════════════════════
# НАСТРОЙКИ (читаются из .env)
# ═══════════════════════════════════════════════════════════════

SMTP_SERVER = os.environ.get("SMTP_SERVER", "smtp.yandex.ru")
SMTP_PORT = int(os.environ.get("SMTP_PORT", 465))
SMTP_USER = os.environ.get("SMTP_USER", "info@markus-mart.ru")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "your_password_here")
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@markus-mart.ru")

ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD_HASH = generate_password_hash(os.environ.get("ADMIN_PASSWORD", "markus2024"))

DATABASE = os.path.join(BASE_DIR, "database.db")
UPLOAD_FOLDER = os.path.join(BASE_DIR, "static", "uploads")
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "webp"}

MAX_LOGIN_ATTEMPTS = 3
BAN_DURATION_DAYS = 90

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "markus-mart-secret-key-change-me")
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ═══════════════════════════════════════════════════════════════
# УТИЛИТА: сохранение в .env
# ═══════════════════════════════════════════════════════════════

def save_env(key, value):
    """Сохраняет/обновляет ключ в .env файле"""
    lines = []
    if os.path.exists(ENV_PATH):
        with open(ENV_PATH, "r", encoding="utf-8") as f:
            lines = f.readlines()

    pattern = re.compile(rf'^\s*{re.escape(key)}\s*=.*$')
    updated = False
    new_lines = []
    for line in lines:
        if pattern.match(line):
            new_lines.append(f'{key}={value}\n')
            updated = True
        else:
            new_lines.append(line)

    if not updated:
        if new_lines and not new_lines[-1].endswith('\n'):
            new_lines.append('\n')
        new_lines.append(f'{key}={value}\n')

    with open(ENV_PATH, "w", encoding="utf-8") as f:
        f.writelines(new_lines)

    # Обновляем os.environ для текущей сессии
    os.environ[key] = value

def reload_settings():
    """Перечитывает критичные настройки из os.environ"""
    global SMTP_SERVER, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, ADMIN_EMAIL
    global ADMIN_USERNAME, ADMIN_PASSWORD_HASH, app

    SMTP_SERVER = os.environ.get("SMTP_SERVER", "smtp.yandex.ru")
    SMTP_PORT = int(os.environ.get("SMTP_PORT", 465))
    SMTP_USER = os.environ.get("SMTP_USER", "info@markus-mart.ru")
    SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "your_password_here")
    ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@markus-mart.ru")
    ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
    ADMIN_PASSWORD_HASH = generate_password_hash(os.environ.get("ADMIN_PASSWORD", "markus2024"))
    app.secret_key = os.environ.get("SECRET_KEY", "markus-mart-secret-key-change-me")

# ═══════════════════════════════════════════════════════════════
# БАЗА ДАННЫХ
# ═══════════════════════════════════════════════════════════════

def get_db():
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, "_database", None)
    if db is not None:
        db.close()

def init_db():
    with app.app_context():
        db = get_db()
        db.executescript("""
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                price REAL NOT NULL,
                stock INTEGER DEFAULT 0,
                image_filename TEXT,
                image2 TEXT,
                image3 TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS reservations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product_id INTEGER NOT NULL,
                customer_name TEXT NOT NULL,
                customer_phone TEXT NOT NULL,
                customer_email TEXT,
                note TEXT,
                is_new INTEGER DEFAULT 1,
                queue_position INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (product_id) REFERENCES products (id)
            );
            CREATE TABLE IF NOT EXISTS login_attempts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ip TEXT NOT NULL,
                username TEXT,
                success INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS bans (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ip TEXT NOT NULL UNIQUE,
                reason TEXT DEFAULT 'bruteforce',
                geo_info TEXT,
                banned_until TIMESTAMP NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        count = db.execute("SELECT COUNT(*) FROM products").fetchone()[0]
        if count == 0:
            demo = [
                (
                    "Хомуты (скобы) для рамы катамарана 40 мм",
                    "Хомуты для соединения труб рамы катамарана диаметром 40 мм. На сплавах по горным рекам и перекатам теряются постоянно! В комплекте усиленные болты и барашковые гайки. Продаются поштучно и комплектами по 4/8 шт. Всегда держим запас в наличии.",
                    450.0,
                    100,
                    "60VcwPMw5UK0Cdc8Q1TrJMOWsdgAmOfofbTLGRi55Ej5QYmYVY-6P9dXy1MMJEKxBkXDhCkb1uTeocrBShiX2HsK_1786176622.jpg",
                    "ejQHQi5TGrWo4Qo-0WbaFD_ozxOPDUJzEJ3PWVMFAp1ZlCjwTMNWIZtkODXVlgMSDBj1uSL1LhYyT41jlp7QDiWp_1786176622.jpg",
                    "gvSbNk3LiJwOUFXvZZsVHOZmvT-9HWb2_uP1CUN2hDtbYaomIxewjElZ6QPFuf5vASvDyWHWdogt0HqRnQPjzCFJ_1786176622.jpg"
                ),
                (
                    "Колышки трёхгранные Y-Beam (алюминий 7001, комплект 8 шт)",
                    "Комплект сверхлёгких и прочных трёхгранных колышков для палатки со светоотражающими петлями. Не гнутся в каменистом грунте и не теряются в траве. Вес комплекта всего 105 г, длина 18 см. В комплекте чехол.",
                    890.0,
                    25,
                    None, None, None
                ),
                (
                    "Штормовые винтовые колышки-якоря (песок / берег, 4 шт)",
                    "Спиральные винтовые якоря для надёжного крепления палаток и тентов в песке, на галечных речных косах и в рыхлом грунте. Длина 25 см, прочный морозостойкий полимер.",
                    690.0,
                    18,
                    None, None, None
                ),
                (
                    "Ремнабор для дуг палатки (переходники 8.5/9.5 мм + корд 4м)",
                    "Экстренный комплект для сломанных дуг палатки прямо в походе. 4 алюминиевые соединительные ремонтные гильзы (муфты), концевики и эластичный шнур 4 м для перетяжки каркаса.",
                    590.0,
                    30,
                    None, None, None
                ),
                (
                    "Комплект запасных фастексов и пряжек (20, 25, 38 мм, 6 шт)",
                    "Набор пряжек-самосбросов и фастексов из ударопрочного полиацеталя Duraflex. Подходят для быстрого полевого ремонта лямок рюкзаков, поясов, строп спасжилетов и гермомешков.",
                    490.0,
                    40,
                    None, None, None
                ),
                (
                    "Запасной клапан и пробка для надувных баллонов (Браво / Голубева)",
                    "Поворотный клапан для баллонов катамаранов, байдарок и рафтов с силиконовым уплотнителем и цепочкой от потери крышки.",
                    550.0,
                    22,
                    None, None, None
                ),
                (
                    "Походный ремнабор для ПВХ (клей Десмокол + 5 заплат 850 г/м²)",
                    "Специальный двухкомпонентный полиуретановый клей для лодочной ткани ПВХ, обезжириватель, наждачка и заплаты разного диаметра для быстрого ремонта пробоин баллонов на берегу.",
                    650.0,
                    35,
                    None, None, None
                ),
                (
                    "Талисман команды 'Слон Маркус'",
                    "Легендарный сувенир и талисман команды туристов 'Маркус-март'. Приносит удачу на порогах, сухую погоду и надёжных попутчиков в любом путешествии!",
                    990.0,
                    1,
                    "1393333403_1737806842_1786180842.jpg",
                    None, None
                )
            ]
            db.executemany(
                "INSERT INTO products (name, description, price, stock, image_filename, image2, image3) VALUES (?, ?, ?, ?, ?, ?, ?)",
                demo
            )
            db.commit()
            print("[INIT] Товары каталога добавлены:", len(demo))

        res_count = db.execute("SELECT COUNT(*) FROM reservations").fetchone()[0]
        if res_count == 0:
            demo_orders = [
                (1, "Иван Смирнов (Клуб 'Урал-Сплав')", "+7 (922) 145-88-21", "ivan.smirnov@yandex.ru", "Срочно нужно 4 хомута для катамарана 40 мм до четверга, выезжаем на сплав!", 1, 1),
                (2, "Сергей Васильев", "+7 (912) 345-67-89", "s.vasiliev@mail.ru", "Запасной комплект колышков 8 шт и ремнабор для дуг 8.5 мм", 0, 1)
            ]
            db.executemany(
                "INSERT INTO reservations (product_id, customer_name, customer_phone, customer_email, note, is_new, queue_position) VALUES (?, ?, ?, ?, ?, ?, ?)",
                demo_orders
            )
            db.commit()
            print("[INIT] Демо-заявки добавлены")

init_db()

# ═══════════════════════════════════════════════════════════════
# БРУТФОРС-ЗАЩИТА
# ═══════════════════════════════════════════════════════════════

def get_client_ip():
    if request.headers.get("X-Forwarded-For"):
        return request.headers.get("X-Forwarded-For").split(",")[0].strip()
    elif request.headers.get("X-Real-IP"):
        return request.headers.get("X-Real-IP")
    return request.remote_addr or "127.0.0.1"

def get_geo_info(ip):
    return f"IP: {ip}"

def is_ip_banned(ip):
    db = get_db()
    ban = db.execute(
        "SELECT * FROM bans WHERE ip = ? AND banned_until > datetime('now')", (ip,)
    ).fetchone()
    return ban is not None

def record_login_attempt(ip, username, success=False):
    db = get_db()
    db.execute(
        "INSERT INTO login_attempts (ip, username, success) VALUES (?, ?, ?)",
        (ip, username, 1 if success else 0)
    )
    db.commit()
    if not success:
        count = db.execute(
            """SELECT COUNT(*) FROM login_attempts
               WHERE ip = ? AND success = 0 AND created_at > datetime('now', '-1 day')""",
            (ip,)
        ).fetchone()[0]
        if count >= MAX_LOGIN_ATTEMPTS:
            banned_until = datetime.now() + timedelta(days=BAN_DURATION_DAYS)
            geo = get_geo_info(ip)
            try:
                db.execute(
                    "INSERT OR REPLACE INTO bans (ip, reason, geo_info, banned_until) VALUES (?, ?, ?, ?)",
                    (ip, f"{MAX_LOGIN_ATTEMPTS} failed login attempts", geo, banned_until)
                )
                db.commit()
            except Exception:
                pass
            return True
    return False

def cleanup_old_attempts():
    db = get_db()
    db.execute("DELETE FROM login_attempts WHERE created_at < datetime('now', '-1 day')")
    db.commit()

# ═══════════════════════════════════════════════════════════════
# УТИЛИТЫ
# ═══════════════════════════════════════════════════════════════

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def send_notification_email(product, customer):
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"📦 Новое отложение: {product['name']}"
        msg["From"] = SMTP_USER
        msg["To"] = ADMIN_EMAIL
        text_body = f"""
Новое отложение товара в Маркус-март!

Товар: {product['name']}
Цена: {product['price']:,.0f} ₽

Клиент:
  Имя:  {customer['name']}
  Тел:  {customer['phone']}
  Почта: {customer.get('email', 'не указана')}
  Примечание: {customer.get('note', 'нет')}

Дата: {datetime.now().strftime('%d.%m.%Y %H:%M')}
        """.strip()
        html_body = f"""
        <html><head><meta charset="utf-8"></head>
        <body style="font-family:Arial,sans-serif;line-height:1.6;color:#333;">
            <div style="max-width:600px;margin:0 auto;padding:20px;border:1px solid #e0e0e0;border-radius:10px;">
                <h2 style="color:#2c5282;">📦 Маркус-март — новое отложение</h2>
                <hr style="border:none;border-top:2px solid #e0e0e0;">
                <h3 style="color:#2c5282;margin-top:20px;">Товар</h3>
                <p><strong>{product['name']}</strong></p>
                <p style="font-size:18px;color:#2c5282;"><strong>{product['price']:,.0f} ₽</strong></p>
                <h3 style="color:#2c5282;margin-top:20px;">Клиент</h3>
                <table style="width:100%;border-collapse:collapse;">
                    <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Имя:</strong></td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">{customer['name']}</td></tr>
                    <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Телефон:</strong></td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">{customer['phone']}</td></tr>
                    <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;"><strong>Почта:</strong></td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">{customer.get('email', 'не указана')}</td></tr>
                    <tr><td style="padding:8px 0;"><strong>Примечание:</strong></td><td style="padding:8px 0;">{customer.get('note', 'нет')}</td></tr>
                </table>
                <p style="margin-top:20px;color:#888;font-size:12px;">
                    Уведомление отправлено: {datetime.now().strftime('%d.%m.%Y %H:%M')}<br>
                    Маркус-март — аксессуары для туристического бизнеса
                </p>
            </div>
        </body></html>
        """
        msg.attach(MIMEText(text_body, "plain", "utf-8"))
        msg.attach(MIMEText(html_body, "html", "utf-8"))
        if SMTP_PORT == 587:
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.starttls()
        else:
            server = smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT)
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, ADMIN_EMAIL, msg.as_string())
        server.quit()
        return True
    except Exception as e:
        print(f"[EMAIL ERROR] {e}")
        return False

def get_queue_info(product_id):
    db = get_db()
    return db.execute(
        """SELECT id, customer_name, customer_phone, created_at, queue_position, is_new,
                  ROW_NUMBER() OVER (ORDER BY created_at ASC) as actual_position
           FROM reservations WHERE product_id = ? ORDER BY created_at ASC""",
        (product_id,)
    ).fetchall()

def update_queue_positions(product_id):
    db = get_db()
    db.execute(
        """UPDATE reservations SET queue_position = (
            SELECT row_num FROM (
                SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) as row_num
                FROM reservations WHERE product_id = ?
            ) sub WHERE sub.id = reservations.id
        ) WHERE product_id = ?""",
        (product_id, product_id)
    )
    db.commit()

def save_image(file):
    if file and file.filename and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        name_part, ext = os.path.splitext(filename)
        filename = f"{name_part}_{int(datetime.now().timestamp())}{ext}"
        file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
        return filename
    return None

# ═══════════════════════════════════════════════════════════════
# МАРШРУТЫ
# ═══════════════════════════════════════════════════════════════

@app.route("/")
def index():
    db = get_db()
    products = db.execute("SELECT * FROM products ORDER BY created_at DESC").fetchall()
    queue_counts = {}
    for p in products:
        c = db.execute("SELECT COUNT(*) FROM reservations WHERE product_id = ?", (p["id"],)).fetchone()[0]
        queue_counts[p["id"]] = c
    return render_template("index.html", products=products, queue_counts=queue_counts)

@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

@app.route("/logo.png")
def logo():
    return send_from_directory(os.path.join(BASE_DIR, "templates", "logo"), "logo.png")

@app.route("/admin/login", methods=["GET", "POST"])
def admin_login():
    ip = get_client_ip()
    if is_ip_banned(ip):
        db = get_db()
        ban = db.execute("SELECT * FROM bans WHERE ip = ?", (ip,)).fetchone()
        until = ban["banned_until"][:10] if ban else ""
        flash(f"⛔ Доступ заблокирован до {until}.", "danger")
        return render_template("login.html"), 403
    if request.method == "POST":
        cleanup_old_attempts()
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")
        if username == ADMIN_USERNAME and check_password_hash(ADMIN_PASSWORD_HASH, password):
            record_login_attempt(ip, username, success=True)
            session["admin"] = True
            flash("Вы вошли в админ-панель", "success")
            return redirect(url_for("admin_panel"))
        else:
            banned = record_login_attempt(ip, username, success=False)
            db = get_db()
            remaining = MAX_LOGIN_ATTEMPTS - db.execute(
                """SELECT COUNT(*) FROM login_attempts
                   WHERE ip = ? AND success = 0 AND created_at > datetime('now', '-1 day')""",
                (ip,)
            ).fetchone()[0]
            if banned:
                flash("⛔ IP заблокирован на 3 месяца.", "danger")
            else:
                flash(f"Неверный логин или пароль. Осталось: {remaining}", "danger")
    return render_template("login.html")

@app.route("/admin/logout")
def admin_logout():
    session.pop("admin", None)
    flash("Вы вышли", "info")
    return redirect(url_for("index"))

@app.route("/admin")
def admin_panel():
    if not session.get("admin"):
        return redirect(url_for("admin_login"))
    db = get_db()
    products = db.execute("SELECT * FROM products ORDER BY created_at DESC").fetchall()
    reservations = db.execute("""
        SELECT r.*, p.name as product_name, p.price, p.stock
        FROM reservations r JOIN products p ON r.product_id = p.id
        ORDER BY r.created_at DESC
    """).fetchall()
    new_count = db.execute("SELECT COUNT(*) FROM reservations WHERE is_new = 1").fetchone()[0]
    queue_data = {}
    for p in products:
        queue = get_queue_info(p["id"])
        if queue:
            queue_data[p["id"]] = queue
    bans = db.execute("SELECT * FROM bans WHERE banned_until > datetime('now') ORDER BY created_at DESC").fetchall()

    # Текущие настройки для формы
    settings = {
        "admin_username": os.environ.get("ADMIN_USERNAME", "admin"),
        "admin_password": os.environ.get("ADMIN_PASSWORD", ""),
        "smtp_server": os.environ.get("SMTP_SERVER", "smtp.yandex.ru"),
        "smtp_port": os.environ.get("SMTP_PORT", "465"),
        "smtp_user": os.environ.get("SMTP_USER", ""),
        "smtp_password": os.environ.get("SMTP_PASSWORD", ""),
        "admin_email": os.environ.get("ADMIN_EMAIL", ""),
        "secret_key": os.environ.get("SECRET_KEY", ""),
    }

    return render_template("admin.html", products=products, reservations=reservations,
                          new_count=new_count, queue_data=queue_data, bans=bans, settings=settings)

@app.route("/admin/settings", methods=["POST"])
def admin_settings():
    if not session.get("admin"):
        return redirect(url_for("admin_login"))

    # Сохраняем все настройки в .env
    fields = {
        "ADMIN_USERNAME": request.form.get("admin_username", "").strip(),
        "SMTP_SERVER": request.form.get("smtp_server", "").strip(),
        "SMTP_PORT": request.form.get("smtp_port", "").strip(),
        "SMTP_USER": request.form.get("smtp_user", "").strip(),
        "ADMIN_EMAIL": request.form.get("admin_email", "").strip(),
        "SECRET_KEY": request.form.get("secret_key", "").strip(),
    }

    # Пароль сохраняем только если введён
    new_password = request.form.get("admin_password", "").strip()
    if new_password:
        fields["ADMIN_PASSWORD"] = new_password

    smtp_password = request.form.get("smtp_password", "").strip()
    if smtp_password:
        fields["SMTP_PASSWORD"] = smtp_password

    for key, value in fields.items():
        if value:
            save_env(key, value)

    reload_settings()
    flash("Настройки сохранены в .env и применены", "success")
    return redirect(url_for("admin_panel"))

@app.route("/admin/test-email", methods=["POST"])
def admin_test_email():
    if not session.get("admin"):
        return redirect(url_for("admin_login"))
    test_product = {"name": "Хомуты (скобы) для рамы катамарана 40 мм", "price": 450}
    test_customer = {
        "name": "Тестовый Покупатель (Проверка почты)",
        "phone": "+7 (999) 000-00-00",
        "email": ADMIN_EMAIL,
        "note": "Это тестовое сообщение из панели управления Маркус-март. Настройки почты работают корректно!"
    }
    success = send_notification_email(test_product, test_customer)
    if success:
        flash(f"✅ Тестовое письмо успешно отправлено с '{SMTP_USER}' на '{ADMIN_EMAIL}'!", "success")
    else:
        flash(f"❌ Ошибка отправки письма с '{SMTP_USER}' на '{ADMIN_EMAIL}'. Проверьте сервер, порт и пароль приложения SMTP.", "danger")
    return redirect(url_for("admin_panel"))

@app.route("/admin/add", methods=["POST"])
def admin_add():
    if not session.get("admin"):
        return redirect(url_for("admin_login"))
    name = request.form.get("name", "").strip()
    description = request.form.get("description", "").strip()
    price_str = request.form.get("price", "").strip()
    stock = int(request.form.get("stock", "0") or 0)
    if not name or not price_str:
        flash("Название и цена обязательны", "danger")
        return redirect(url_for("admin_panel"))
    try:
        price = float(price_str.replace(" ", "").replace(",", "."))
    except ValueError:
        flash("Некорректная цена", "danger")
        return redirect(url_for("admin_panel"))
    image_filename = save_image(request.files.get("image"))
    image2 = save_image(request.files.get("image2"))
    image3 = save_image(request.files.get("image3"))
    db = get_db()
    db.execute(
        "INSERT INTO products (name, description, price, stock, image_filename, image2, image3) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (name, description, price, stock, image_filename, image2, image3)
    )
    db.commit()
    flash("Товар добавлен", "success")
    return redirect(url_for("admin_panel"))

@app.route("/admin/edit/<int:product_id>", methods=["POST"])
def admin_edit(product_id):
    if not session.get("admin"):
        return redirect(url_for("admin_login"))
    db = get_db()
    product = db.execute("SELECT * FROM products WHERE id = ?", (product_id,)).fetchone()
    if not product:
        flash("Товар не найден", "danger")
        return redirect(url_for("admin_panel"))
    name = request.form.get("name", "").strip()
    description = request.form.get("description", "").strip()
    price_str = request.form.get("price", "").strip()
    stock = int(request.form.get("stock", "0") or 0)
    if not name or not price_str:
        flash("Название и цена обязательны", "danger")
        return redirect(url_for("admin_panel"))
    try:
        price = float(price_str.replace(" ", "").replace(",", "."))
    except ValueError:
        flash("Некорректная цена", "danger")
        return redirect(url_for("admin_panel"))
    db.execute(
        "UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?",
        (name, description, price, stock, product_id)
    )
    for field, file_key in [("image_filename", "image"), ("image2", "image2"), ("image3", "image3")]:
        new_img = save_image(request.files.get(file_key))
        if new_img:
            old = product[field]
            if old and os.path.exists(os.path.join(app.config["UPLOAD_FOLDER"], old)):
                os.remove(os.path.join(app.config["UPLOAD_FOLDER"], old))
            db.execute(f"UPDATE products SET {field} = ? WHERE id = ?", (new_img, product_id))
    db.commit()
    flash("Товар обновлён", "success")
    return redirect(url_for("admin_panel"))

@app.route("/admin/delete/<int:product_id>", methods=["POST"])
def admin_delete(product_id):
    if not session.get("admin"):
        return redirect(url_for("admin_login"))
    db = get_db()
    product = db.execute("SELECT * FROM products WHERE id = ?", (product_id,)).fetchone()
    if product:
        for f in ["image_filename", "image2", "image3"]:
            img = product[f]
            if img and os.path.exists(os.path.join(app.config["UPLOAD_FOLDER"], img)):
                os.remove(os.path.join(app.config["UPLOAD_FOLDER"], img))
    db.execute("DELETE FROM reservations WHERE product_id = ?", (product_id,))
    db.execute("DELETE FROM products WHERE id = ?", (product_id,))
    db.commit()
    flash("Товар удалён", "success")
    return redirect(url_for("admin_panel"))

@app.route("/admin/stock/<int:product_id>", methods=["POST"])
def admin_update_stock(product_id):
    if not session.get("admin"):
        return redirect(url_for("admin_login"))
    stock = int(request.form.get("stock", "0") or 0)
    db = get_db()
    db.execute("UPDATE products SET stock = ? WHERE id = ?", (stock, product_id))
    db.commit()
    flash("Склад обновлён", "success")
    return redirect(url_for("admin_panel"))

@app.route("/admin/reservation/read/<int:reservation_id>", methods=["POST"])
def admin_read_reservation(reservation_id):
    if not session.get("admin"):
        return redirect(url_for("admin_login"))
    db = get_db()
    db.execute("UPDATE reservations SET is_new = 0 WHERE id = ?", (reservation_id,))
    db.commit()
    flash("Заявка отмечена прочитанной", "info")
    return redirect(url_for("admin_panel"))

@app.route("/admin/reservation/delete/<int:reservation_id>", methods=["POST"])
def admin_delete_reservation(reservation_id):
    if not session.get("admin"):
        return redirect(url_for("admin_login"))
    db = get_db()
    db.execute("DELETE FROM reservations WHERE id = ?", (reservation_id,))
    db.commit()
    flash("Заявка удалена", "info")
    return redirect(url_for("admin_panel"))

@app.route("/admin/ban/unban/<int:ban_id>", methods=["POST"])
def admin_unban(ban_id):
    if not session.get("admin"):
        return redirect(url_for("admin_login"))
    db = get_db()
    db.execute("DELETE FROM bans WHERE id = ?", (ban_id,))
    db.commit()
    flash("IP разблокирован", "success")
    return redirect(url_for("admin_panel"))

@app.route("/reserve/<int:product_id>", methods=["POST"])
def reserve(product_id):
    db = get_db()
    product = db.execute("SELECT * FROM products WHERE id = ?", (product_id,)).fetchone()
    if not product:
        flash("Товар не найден", "danger")
        return redirect(url_for("index"))
    name = request.form.get("customer_name", "").strip()
    phone = request.form.get("customer_phone", "").strip()
    email = request.form.get("customer_email", "").strip()
    note = request.form.get("note", "").strip()
    if not name or not phone:
        flash("Имя и телефон обязательны", "danger")
        return redirect(url_for("index"))
    db.execute(
        "INSERT INTO reservations (product_id, customer_name, customer_phone, customer_email, note, is_new) VALUES (?, ?, ?, ?, ?, 1)",
        (product_id, name, phone, email, note)
    )
    db.commit()
    update_queue_positions(product_id)
    queue = get_queue_info(product_id)
    my_position = None
    for q in queue:
        if q["customer_phone"] == phone and q["customer_name"] == name:
            my_position = q["actual_position"]
            break
    customer = {"name": name, "phone": phone, "email": email, "note": note}
    sent = send_notification_email(dict(product), customer)
    queue_msg = f" Позиция в очереди: {my_position}." if my_position else ""
    if sent:
        flash(f"✅ Отложено!{queue_msg}", "success")
    else:
        flash(f"⚠️ Отложено!{queue_msg} Письмо не отправлено.", "warning")
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
