// ═══════════════════════════════════════════════════════════════
// Маркус-март — Экстренное снаряжение и расходники для туристов
// Клиентский скрипт: витрина, бронирование и защищенная админка
// ═══════════════════════════════════════════════════════════════

// ─── Каталог товаров: «То, что вечно теряется на сплавах и в походах» ───
const initialProducts = {
    1: {
        id: 1,
        name: "Хомуты (скобы) для рамы катамарана 40 мм",
        category: "rafting",
        price: 450,
        priceText: "450 ₽ / шт",
        stock: 100,
        badge: "Хит сплавов",
        description: "Хомуты-скобы для жесткого соединения дюралевых труб рамы катамарана диаметром 40 мм. На порогах и перекатах болты и скобы теряются чаще всего, а найти замену на реке невозможно! В комплекте: стальная скоба, прижимная планка, болты и удобные барашковые гайки для сборки вручную. Всегда держим запас в наличии.",
        images: [
            "./static/uploads/60VcwPMw5UK0Cdc8Q1TrJMOWsdgAmOfofbTLGRi55Ej5QYmYVY-6P9dXy1MMJEKxBkXDhCkb1uTeocrBShiX2HsK_1786176622.jpg",
            "./static/uploads/ejQHQi5TGrWo4Qo-0WbaFD_ozxOPDUJzEJ3PWVMFAp1ZlCjwTMNWIZtkODXVlgMSDBj1uSL1LhYyT41jlp7QDiWp_1786176622.jpg",
            "./static/uploads/gvSbNk3LiJwOUFXvZZsVHOZmvT-9HWb2_uP1CUN2hDtbYaomIxewjElZ6QPFuf5vASvDyWHWdogt0HqRnQPjzCFJ_1786176622.jpg"
        ]
    },
    2: {
        id: 2,
        name: "Колышки трёхгранные Y-Beam (алюминий 7001, комплект 8 шт)",
        category: "tent",
        price: 890,
        priceText: "890 ₽",
        stock: 25,
        badge: "Теряется чаще всего",
        description: "Комплект сверхлегких трехгранных штормовых колышков из авиационного алюминия 7001-T6. Длина 18 см. Яркое анодирование и светоотражающие петли из паракорда, чтобы не терять колышки в густой траве и темноте. Не гнутся в каменистом грунте. Вес комплекта всего 105 г, тканевый чехол в комплекте.",
        images: []
    },
    3: {
        id: 3,
        name: "Штормовые винтовые колышки-якоря (песок / берег, 4 шт)",
        category: "tent",
        price: 690,
        priceText: "690 ₽",
        stock: 18,
        badge: "Для берега реки",
        description: "Шнековые спиральные колышки длиной 25 см для надежной фиксации палаток, тентов и бань на речных песчаных косах, рыхлом грунте и торфе. Там, где обычные колышки вырывает порывом ветра, винтовой якорь держит намертво.",
        images: []
    },
    4: {
        id: 4,
        name: "Ремнабор для каркаса дуг палатки (переходники 8.5/9.5 мм + корд)",
        category: "tent",
        price: 590,
        priceText: "590 ₽",
        stock: 30,
        badge: "Скорая помощь",
        description: "Комплект для полевого ремонта сломанных секций дуг палатки. Включает 4 алюминиевые ремонтные гильзы-трубки разного диаметра, концевые заглушки дуг и эластичный шнур-корд длиной 4 метра для перетяжки каркаса палатки прямо в лагере.",
        images: []
    },
    5: {
        id: 5,
        name: "Набор запасных фастексов и пряжек-самосбросов (6 шт)",
        category: "hardware",
        price: 490,
        priceText: "490 ₽",
        stock: 40,
        badge: "Для рюкзака и жилета",
        description: "Универсальный ремнабор фурнитуры из ударопрочного полиацеталя Duraflex: пряжки-самосбросы 25 мм и 38 мм, фастексы и щелевые пряжки. Позволяет мгновенно заменить сломанную или потерянную застежку на поясном ремне рюкзака, стропе спасательного жилета или гермомешка.",
        images: []
    },
    6: {
        id: 6,
        name: "Запасной клапан и пробка для надувных баллонов (Браво / Голубева)",
        category: "rafting",
        price: 550,
        priceText: "550 ₽",
        stock: 22,
        badge: "Для катамарана",
        description: "Поворотный клапан высокого давления для надувных баллонов катамарана, байдарки или рафта. Силиконовое уплотнительное кольцо, фиксирующая цепочка (чтобы крышка не упала в воду). Подходит для большинства стандартных посадочных мест.",
        images: []
    },
    7: {
        id: 7,
        name: "Походный ремнабор для ткани ПВХ (клей Десмокол + 5 заплат)",
        category: "hardware",
        price: 650,
        priceText: "650 ₽",
        stock: 35,
        badge: "Ремонт баллонов",
        description: "Экстренный набор для ремонта пробоин и порезов баллонов на берегу реки: специальный полиуретановый клей для лодочной ткани ПВХ, обезжиривающие салфетки, абразив и 5 армированных заплат плотностью 850 г/м² разного размера.",
        images: []
    },
    8: {
        id: 8,
        name: "Гермочехол для смартфона и документов (IPX8) со свистком",
        category: "hardware",
        price: 490,
        priceText: "490 ₽",
        stock: 15,
        badge: "Не тонет",
        description: "Герметичный чехол с воздушной рамкой безопасности (не тонет при падении в воду). Сенсорный экран работает через пленку. В комплекте шнурок на шею с громким спасательным сигнальным свистком без шарика (работает даже после воды).",
        images: []
    },
    9: {
        id: 9,
        name: "Карабины легкосплавные с винтовой муфтой (комплект 2 шт)",
        category: "hardware",
        price: 390,
        priceText: "390 ₽",
        stock: 50,
        badge: "Вспомогательные",
        description: "Алюминиевые карабины с надежной муфтой для фиксации снаряжения к раме катамарана, страховки гермомешков, подвешивания котелков и фонарей в лагере.",
        images: []
    },
    10: {
        id: 10,
        name: "Талисман команды 'Слон Маркус'",
        category: "souvenirs",
        price: 990,
        priceText: "990 ₽",
        stock: 1,
        badge: "Талисман удачи",
        description: "Легендарный сувенир и талисман команды туристов 'Маркус-март'. Приносит сухую погоду, безаварийное прохождение порогов и отличное настроение у костра!",
        images: [
            "./static/uploads/1393333403_1737806842_1786180842.jpg"
        ]
    }
};

// Загрузка товаров из localStorage или по умолчанию
function getProducts() {
    try {
        const stored = localStorage.getItem('markus_products');
        if (stored) return JSON.parse(stored);
    } catch (e) {}
    return initialProducts;
}

function saveProducts(prods) {
    localStorage.setItem('markus_products', JSON.stringify(prods));
}

let productsData = getProducts();

// ─── Переключение темы (Dark/Light) ───
(function() {
    const saved = localStorage.getItem('markus-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
})();

function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('markus-theme', next);
    updateThemeIcon(next);
}

function updateThemeIcon(theme) {
    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.textContent = theme === 'dark' ? '☀️' : '🌙';
        btn.title = theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему';
    }
}

// ─── Хранилище заказов (localStorage) с демо-заказами ───
const initialOrders = [
    {
        id: "MM-4821",
        productId: 1,
        productName: "Хомуты (скобы) для рамы катамарана 40 мм",
        price: 1800,
        quantity: 4,
        customerName: "Иван Смирнов (Клуб 'Урал-Сплав')",
        phone: "+7 (922) 145-88-21",
        email: "ivan.smirnov@yandex.ru",
        note: "Срочно нужно 4 хомута до четверга! В пятницу утром стартуем на реку Чусовая.",
        date: "06.09.2026, 11:20",
        status: "Новый"
    },
    {
        id: "MM-4309",
        productId: 2,
        productName: "Колышки трёхгранные Y-Beam (комплект 8 шт)",
        price: 890,
        quantity: 1,
        customerName: "Сергей Васильев",
        phone: "+7 (912) 345-67-89",
        email: "s.vasiliev@mail.ru",
        note: "Потеряли колышки на прошлом сплаве. Заберу сам.",
        date: "05.09.2026, 17:45",
        status: "Выполнен"
    }
];

function getReservations() {
    try {
        const stored = localStorage.getItem('markus_reservations');
        if (stored) return JSON.parse(stored);
    } catch (e) {}
    localStorage.setItem('markus_reservations', JSON.stringify(initialOrders));
    return initialOrders;
}

function saveReservation(order) {
    const list = getReservations();
    list.unshift(order);
    localStorage.setItem('markus_reservations', JSON.stringify(list));
    updateOrdersBadge();
}

function updateOrdersBadge() {
    const orders = getReservations();
    const newCount = orders.filter(o => o.status === 'Новый').length;
    const badge = document.getElementById('ordersBadge');
    if (badge) {
        if (newCount > 0) {
            badge.textContent = newCount;
            badge.style.display = 'inline-flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

// ─── АВТОРИЗАЦИЯ В АДМИНКУ ПО ПАРОЛЮ ───
const ADMIN_CORRECT_LOGIN = "admin";
const ADMIN_CORRECT_PASS = "markus2026";
let adminLoginAttempts = 0;

function isUserAdmin() {
    return sessionStorage.getItem('markus_admin_auth') === 'true';
}

function updateAdminNavBtn() {
    const btn = document.getElementById('adminNavBtn');
    if (!btn) return;
    if (isUserAdmin()) {
        btn.innerHTML = `⚙️ Админка <span class="badge-count" id="ordersBadge"></span>`;
        btn.setAttribute('title', 'Вы авторизованы как Администратор');
    } else {
        btn.innerHTML = `🔐 Вход в админку <span class="badge-count" id="ordersBadge"></span>`;
        btn.setAttribute('title', 'Вход по паролю администратора');
    }
    updateOrdersBadge();
}

function onAdminNavClick() {
    if (isUserAdmin()) {
        openAdminModal();
    } else {
        openAdminLoginModal();
    }
}

function openAdminLoginModal() {
    const modal = document.getElementById('adminLoginModal');
    const form = document.getElementById('adminLoginForm');
    const errorEl = document.getElementById('adminLoginError');
    if (form) form.reset();
    if (errorEl) errorEl.style.display = 'none';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        const input = document.getElementById('adminLoginUsername');
        if (input) input.focus();
    }, 100);
}

function closeAdminLoginModal() {
    const modal = document.getElementById('adminLoginModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

function handleAdminLoginSubmit(e) {
    e.preventDefault();
    const username = document.getElementById('adminLoginUsername').value.trim();
    const password = document.getElementById('adminLoginPassword').value;
    const errorEl = document.getElementById('adminLoginError');
    const card = document.querySelector('#adminLoginModal .modal-content');

    if (username === ADMIN_CORRECT_LOGIN && password === ADMIN_CORRECT_PASS) {
        // Успешный вход
        sessionStorage.setItem('markus_admin_auth', 'true');
        adminLoginAttempts = 0;
        closeAdminLoginModal();
        updateAdminNavBtn();
        openAdminModal();
    } else {
        // Ошибка пароля
        adminLoginAttempts++;
        if (errorEl) {
            errorEl.innerHTML = `⛔ Неверный логин или пароль! (Попытка ${adminLoginAttempts} из 3)<br><small style="color:var(--text-muted)">Подсказка: логин <b>admin</b>, пароль <b>markus2026</b></small>`;
            errorEl.style.display = 'block';
        }
        if (card) {
            card.style.animation = 'shake 0.4s ease';
            setTimeout(() => card.style.animation = '', 400);
        }
    }
}

function adminLogout() {
    sessionStorage.removeItem('markus_admin_auth');
    updateAdminNavBtn();
    closeAdminModal();
    alert('Вы вышли из режима администратора.');
}

// ─── ДАШБОРД АДМИНИСТРАТОРА (ЗАКАЗЫ И СКЛАД) ───
function openAdminModal() {
    if (!isUserAdmin()) {
        openAdminLoginModal();
        return;
    }
    const modal = document.getElementById('adminModal');
    renderAdminOrders();
    renderAdminProducts();
    loadEmailSettings();
    switchAdminTab('tab-admin-orders');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAdminModal() {
    const modal = document.getElementById('adminModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

function switchAdminTab(tabId) {
    document.querySelectorAll('.admin-tab-pane').forEach(p => p.style.display = 'none');
    document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
    const pane = document.getElementById(tabId);
    const btn = document.getElementById('btn-' + tabId);
    if (pane) pane.style.display = 'block';
    if (btn) btn.classList.add('active');
}

function renderAdminOrders() {
    const orders = getReservations();
    const tbody = document.getElementById('adminOrdersTableBody');
    const emptyMsg = document.getElementById('adminEmptyOrders');
    const countBadge = document.getElementById('adminOrdersTabCount');

    if (countBadge) countBadge.textContent = orders.length;

    if (!tbody) return;

    if (orders.length === 0) {
        tbody.innerHTML = '';
        if (emptyMsg) emptyMsg.style.display = 'block';
    } else {
        if (emptyMsg) emptyMsg.style.display = 'none';
        tbody.innerHTML = orders.map((o) => {
            let statusBadge = '';
            if (o.status === 'Новый') {
                statusBadge = `<span class="badge" style="background:var(--accent); color:#fff; cursor:pointer;" onclick="toggleOrderStatus('${o.id}')" title="Нажмите, чтобы сменить статус">🔴 Новый</span>`;
            } else if (o.status === 'В обработке') {
                statusBadge = `<span class="badge" style="background:#f97316; color:#fff; cursor:pointer;" onclick="toggleOrderStatus('${o.id}')" title="Нажмите, чтобы сменить статус">🟠 В работе</span>`;
            } else {
                statusBadge = `<span class="badge badge-success" style="cursor:pointer;" onclick="toggleOrderStatus('${o.id}')" title="Нажмите, чтобы сменить статус">🟢 Выполнен</span>`;
            }

            return `
            <tr>
                <td style="font-weight:700; color:var(--accent); font-family:'Oswald',sans-serif; font-size:1.05rem;">${o.id}</td>
                <td>
                    <div style="font-weight:600; color:var(--text-primary);">${o.productName}</div>
                    <div style="color:var(--text-muted); font-size:0.85rem;">${o.price ? o.price.toLocaleString('ru-RU') + ' ₽' : 'По запросу'}</div>
                </td>
                <td>
                    <div style="font-weight:600;">${o.customerName}</div>
                    <div><a href="tel:${o.phone}" style="color:var(--accent); text-decoration:none; font-weight:500;">📞 ${o.phone}</a></div>
                    ${o.email ? `<div style="color:var(--text-muted); font-size:0.8rem;">✉️ ${o.email}</div>` : ''}
                    ${o.note ? `<div style="color:var(--text-secondary); background:var(--bg-secondary); padding:4px 8px; border-radius:6px; font-size:0.8rem; margin-top:4px; border-left:2px solid var(--accent);">💬 ${o.note}</div>` : ''}
                </td>
                <td style="font-size:0.8rem; color:var(--text-muted); white-space:nowrap;">${o.date}</td>
                <td>${statusBadge}</td>
                <td style="white-space:nowrap;">
                    <button class="btn btn-outline" style="padding:4px 10px; font-size:0.75rem; border-color:var(--danger); color:var(--danger);" onclick="deleteOrder('${o.id}')" title="Удалить заявку">🗑</button>
                </td>
            </tr>
            `;
        }).join('');
    }
}

function toggleOrderStatus(orderId) {
    let orders = getReservations();
    const order = orders.find(o => o.id === orderId);
    if (order) {
        if (order.status === 'Новый') order.status = 'В обработке';
        else if (order.status === 'В обработке') order.status = 'Выполнен';
        else order.status = 'Новый';
        localStorage.setItem('markus_reservations', JSON.stringify(orders));
        updateOrdersBadge();
        renderAdminOrders();
    }
}

function deleteOrder(id) {
    if (!confirm('Удалить эту заявку?')) return;
    let orders = getReservations();
    orders = orders.filter(o => o.id !== id);
    localStorage.setItem('markus_reservations', JSON.stringify(orders));
    updateOrdersBadge();
    renderAdminOrders();
}

function clearAllOrders() {
    if (confirm('Внимание! Очистить все заказы в базе браузера?')) {
        localStorage.setItem('markus_reservations', JSON.stringify([]));
        updateOrdersBadge();
        renderAdminOrders();
    }
}

// ─── Управление товарами в админке ───
function renderAdminProducts() {
    const prods = getProducts();
    const tbody = document.getElementById('adminProductsTableBody');
    if (!tbody) return;

    tbody.innerHTML = Object.values(prods).map(p => `
        <tr>
            <td style="font-weight:700; color:var(--text-primary);">${p.name}</td>
            <td style="color:var(--accent); font-weight:600;">${p.price.toLocaleString('ru-RU')} ₽</td>
            <td>
                <div style="display:flex; align-items:center; gap:6px;">
                    <button class="btn btn-outline" style="padding:2px 8px; font-size:0.8rem;" onclick="changeProductStock(${p.id}, -1)">-</button>
                    <span style="font-weight:700; min-width:28px; text-align:center;">${p.stock}</span>
                    <button class="btn btn-outline" style="padding:2px 8px; font-size:0.8rem;" onclick="changeProductStock(${p.id}, 1)">+</button>
                </div>
            </td>
            <td>
                <span class="badge ${p.stock > 0 ? 'badge-success' : 'badge-danger'}" 
                      style="cursor:pointer;" onclick="toggleProductStockStatus(${p.id})">
                    ${p.stock > 0 ? '✅ В наличии' : '❌ Под заказ'}
                </span>
            </td>
        </tr>
    `).join('');
}

function changeProductStock(pid, delta) {
    const prods = getProducts();
    if (prods[pid]) {
        prods[pid].stock = Math.max(0, prods[pid].stock + delta);
        saveProducts(prods);
        productsData = prods;
        renderAdminProducts();
        renderPublicCatalog();
    }
}

function toggleProductStockStatus(pid) {
    const prods = getProducts();
    if (prods[pid]) {
        prods[pid].stock = prods[pid].stock > 0 ? 0 : 10;
        saveProducts(prods);
        productsData = prods;
        renderAdminProducts();
        renderPublicCatalog();
    }
}

// ─── ДИНАМИЧЕСКИЙ РЕНДЕР КАТАЛОГА ───
function renderPublicCatalog() {
    const container = document.getElementById('productsContainer');
    if (!container) return;

    const prods = getProducts();
    container.innerHTML = Object.values(prods).map(p => {
        const images = p.images || [];
        const isStock = p.stock > 0;
        const stockBadge = isStock
            ? `<span class="product-badge in-stock">В наличии (${p.stock} шт)</span>`
            : `<span class="product-badge out-of-stock">Под заказ</span>`;
        const countBadge = images.length > 1 ? `<span class="photo-count">📷 ${images.length} фото</span>` : '';

        let imgHtml = '';
        if (images.length > 0) {
            imgHtml = `
                <div class="hover-carousel" data-current="0">
                    ${images.map((img, idx) => `
                        <img src="${img}" alt="${p.name}" class="carousel-slide ${idx === 0 ? 'active' : ''}" loading="lazy">
                    `).join('')}
                    ${images.length > 1 ? `
                        <div class="carousel-dots">
                            ${images.map((_, idx) => `<span class="dot ${idx === 0 ? 'active' : ''}"></span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        } else {
            let icon = '⛺';
            if (p.category === 'rafting') icon = '🌊';
            else if (p.category === 'tent') icon = '⛺';
            else if (p.category === 'hardware') icon = '🔧';
            imgHtml = `
                <div class="product-image-placeholder">
                    <span style="font-size: 3.5rem;">${icon}</span>
                    <p style="color:var(--text-muted); font-size:0.85rem; margin-top:6px;">${p.badge || 'Расходник для похода'}</p>
                </div>
            `;
        }

        const safeName = p.name.replace(/'/g, "\\'");

        return `
        <article class="product-card" data-product-id="${p.id}" data-category="${p.category}">
            <div class="product-image-wrapper">
                ${stockBadge}
                ${countBadge}
                ${imgHtml}
            </div>
            <div class="product-info">
                <div class="product-category">${p.badge || 'Снаряжение для сплавов'}</div>
                <h3 class="product-name">${p.name}</h3>
                <p class="product-description">${p.description.substring(0, 95)}...</p>
                <div class="product-footer">
                    <span class="product-price">${p.priceText || p.price.toLocaleString('ru-RU') + ' ₽'}</span>
                    <button class="btn btn-primary btn-reserve" onclick="event.stopPropagation(); openReserveModal(${p.id}, '${safeName}', ${p.price})">
                        📌 ${isStock ? 'Отложить' : 'Заказать'}
                    </button>
                </div>
            </div>
        </article>
        `;
    }).join('');

    initCarousels();
    bindCardClicks();
}

function bindCardClicks() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.btn-reserve')) return;
            const productId = this.getAttribute('data-product-id');
            openProductCard(parseInt(productId));
        });
    });
}

// ─── HOVER КАРУСЕЛЬ ───
function initCarousels() {
    document.querySelectorAll('.hover-carousel').forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.dot');
        if (slides.length <= 1) return;
        let current = 0;
        let interval = null;

        function showSlide(index) {
            slides.forEach((s, i) => s.classList.toggle('active', i === index));
            dots.forEach((d, i) => d.classList.toggle('active', i === index));
            current = index;
        }

        const card = carousel.closest('.product-card');
        if (!card) return;

        card.addEventListener('mouseenter', () => {
            interval = setInterval(() => {
                showSlide((current + 1) % slides.length);
            }, 1200);
        });

        card.addEventListener('mouseleave', () => {
            clearInterval(interval);
            showSlide(0);
        });
    });
}

// ─── МОДАЛКА КАРТОЧКИ ТОВАРА ───
let pcmCurrentImg = 0;
let pcmImagesList = [];

function openProductCard(productId) {
    const prods = getProducts();
    const data = prods[productId];
    if (!data) return;

    pcmImagesList = data.images || [];
    pcmCurrentImg = 0;

    const modal = document.getElementById('productCardModal');
    const content = document.getElementById('productCardContent');

    let galleryHtml = '';
    if (pcmImagesList.length > 0) {
        galleryHtml = `
            <img src="${pcmImagesList[0]}" class="pcm-main-img" id="pcmMainImg" onclick="openZoom('${pcmImagesList[0]}')" alt="${data.name}">
            <div class="pcm-gallery-row">
                ${pcmImagesList.map((img, i) => `
                    <img src="${img}" class="pcm-thumb ${i === 0 ? 'active' : ''}" 
                         onclick="pcmSelectImage(${i})" alt="фото ${i+1}">
                `).join('')}
            </div>
        `;
    } else {
        galleryHtml = `<div style="height:200px; background:var(--bg-secondary); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; color:var(--text-muted); font-size:3rem;">
            <span>🏕️</span>
            <p style="font-size:0.9rem; margin-top:8px;">${data.badge || 'Расходник для похода'}</p>
        </div>`;
    }

    const safeName = data.name.replace(/'/g, "\\'");
    const stockBadge = data.stock > 0
        ? `<span class="product-badge in-stock" style="position:static; display:inline-block; margin-bottom:12px;">✅ В наличии (${data.stock} шт)</span>`
        : `<span class="product-badge out-of-stock" style="position:static; display:inline-block; margin-bottom:12px;">⚠️ Под заказ</span>`;

    content.innerHTML = `
        ${galleryHtml}
        <div class="pcm-body">
            ${stockBadge}
            <h2 class="pcm-title">${data.name}</h2>
            <div class="pcm-price">${data.priceText || data.price.toLocaleString('ru-RU') + ' ₽'}</div>
            <p class="pcm-description" style="white-space:pre-line;">${data.description}</p>
            <div class="pcm-actions" style="margin-top:20px;">
                <button class="btn btn-primary" onclick="closeProductCard(); openReserveModal(${productId}, '${safeName}', ${data.price});">
                    📌 ${data.stock > 0 ? 'Отложить товар' : 'Заказать поставку'}
                </button>
                <button class="btn btn-outline" onclick="closeProductCard()">Закрыть</button>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function pcmSelectImage(index) {
    pcmCurrentImg = index;
    const mainImg = document.getElementById('pcmMainImg');
    if (mainImg && pcmImagesList[index]) {
        mainImg.src = pcmImagesList[index];
        mainImg.setAttribute('onclick', `openZoom('${pcmImagesList[index]}')`);
    }
    document.querySelectorAll('.pcm-thumb').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

function closeProductCard() {
    const modal = document.getElementById('productCardModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ─── ZOOM МОДАЛКА ───
function openZoom(src) {
    const modal = document.getElementById('zoomModal');
    const img = document.getElementById('zoomImage');
    if (modal && img) {
        img.src = src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeZoom() {
    const modal = document.getElementById('zoomModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ─── ОФОРМЛЕНИЕ БРОНИРОВАНИЯ ───
let currentReserveProductId = null;

function openReserveModal(productId, productName, productPrice) {
    currentReserveProductId = productId;
    const modal = document.getElementById('reserveModal');
    const nameEl = document.getElementById('modalProductName');
    const priceEl = document.getElementById('modalProductPrice');
    const queueInfo = document.getElementById('queueInfo');

    nameEl.textContent = productName;
    priceEl.textContent = (typeof productPrice === 'number' && productPrice > 0)
        ? productPrice.toLocaleString('ru-RU') + ' ₽'
        : 'По запросу';

    // Расчет текущей очереди
    const existingCount = getReservations().filter(r => r.productId === productId).length;
    if (existingCount > 0 && queueInfo) {
        document.getElementById('queuePosition').textContent = existingCount + 1;
        queueInfo.style.display = 'block';
    } else if (queueInfo) {
        queueInfo.style.display = 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        const input = document.getElementById('customer_name');
        if (input) input.focus();
    }, 100);
}

function closeReserveModal() {
    const modal = document.getElementById('reserveModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
    const form = document.getElementById('reserveForm');
    if (form) form.reset();
}

function handleReserveSubmit(e) {
    e.preventDefault();
    const prods = getProducts();
    const product = prods[currentReserveProductId] || { name: 'Снаряжение', price: 0 };
    const name = document.getElementById('customer_name').value.trim();
    const phone = document.getElementById('customer_phone').value.trim();
    const email = document.getElementById('customer_email').value.trim();
    const note = document.getElementById('note').value.trim();

    if (!name || !phone) {
        alert('Пожалуйста, укажите имя и телефон для связи!');
        return;
    }

    const orderId = 'MM-' + Math.floor(1000 + Math.random() * 9000);
    const dateStr = new Date().toLocaleString('ru-RU', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    const newOrder = {
        id: orderId,
        productId: currentReserveProductId,
        productName: product.name,
        price: product.price,
        customerName: name,
        phone: phone,
        email: email,
        note: note,
        date: dateStr,
        status: 'Новый'
    };

    saveReservation(newOrder);
    closeReserveModal();
    showOrderSuccessModal(newOrder);
}

function showOrderSuccessModal(order) {
    const modal = document.getElementById('successModal');
    if (!modal) return;

    document.getElementById('successOrderId').textContent = order.id;
    document.getElementById('successProductName').textContent = order.productName;
    document.getElementById('successCustomerPhone').textContent = order.phone;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ─── ФИЛЬТРАЦИЯ И ЖИВОЙ ПОИСК ───
function filterProducts(category, buttonEl) {
    document.querySelectorAll('.filter-pill').forEach(btn => btn.classList.remove('active'));
    if (buttonEl) buttonEl.classList.add('active');

    const searchInput = document.getElementById('searchInput');
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const prods = getProducts();

    document.querySelectorAll('.product-card').forEach(card => {
        const pid = card.getAttribute('data-product-id');
        const p = prods[pid];
        if (!p) return;

        const matchCategory = (category === 'all')
            || (category === 'stock' && p.stock > 0)
            || (p.category === category);

        const matchSearch = !query
            || p.name.toLowerCase().includes(query)
            || p.description.toLowerCase().includes(query);

        if (matchCategory && matchSearch) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function handleSearch(query) {
    const activePill = document.querySelector('.filter-pill.active');
    const category = activePill ? activePill.getAttribute('data-category') : 'all';
    filterProducts(category, activePill);
}

// ─── НАСТРОЙКИ ПОЧТЫ (EMAIL & SMTP) ───
const defaultEmailSettings = {
    smtp_user: "info@markus-mart.ru",
    smtp_password: "",
    smtp_server: "smtp.yandex.ru",
    smtp_port: "465",
    admin_email: "admin@markus-mart.ru",
    same_email: false
};

function getEmailSettings() {
    try {
        const stored = localStorage.getItem('markus_email_settings');
        if (stored) return JSON.parse(stored);
    } catch (e) {}
    return defaultEmailSettings;
}

function saveEmailSettings(settings) {
    localStorage.setItem('markus_email_settings', JSON.stringify(settings));
}

function loadEmailSettings() {
    const s = getEmailSettings();
    const userEl = document.getElementById('adminSmtpUser');
    const passEl = document.getElementById('adminSmtpPassword');
    const serverEl = document.getElementById('adminSmtpServer');
    const portEl = document.getElementById('adminSmtpPort');
    const adminEmailEl = document.getElementById('adminRecipientEmail');
    const sameCheckbox = document.getElementById('adminSameEmailCheckbox');

    if (userEl) userEl.value = s.smtp_user || '';
    if (passEl) passEl.value = s.smtp_password || '';
    if (serverEl) serverEl.value = s.smtp_server || 'smtp.yandex.ru';
    if (portEl) portEl.value = s.smtp_port || '465';
    if (adminEmailEl) adminEmailEl.value = s.admin_email || '';
    if (sameCheckbox) {
        const isSame = s.same_email || (s.smtp_user && s.smtp_user === s.admin_email);
        sameCheckbox.checked = isSame;
        toggleSameEmail(isSame);
    }
}

function applySmtpPreset(provider) {
    const srv = document.getElementById('adminSmtpServer');
    const port = document.getElementById('adminSmtpPort');
    if (!srv || !port) return;
    if (provider === 'yandex') {
        srv.value = 'smtp.yandex.ru';
        port.value = '465';
    } else if (provider === 'mailru') {
        srv.value = 'smtp.mail.ru';
        port.value = '465';
    } else if (provider === 'gmail') {
        srv.value = 'smtp.gmail.com';
        port.value = '587';
    }
}

function toggleSameEmail(checked) {
    const recipient = document.getElementById('adminRecipientEmail');
    const sender = document.getElementById('adminSmtpUser');
    if (!recipient) return;
    if (checked) {
        if (sender) recipient.value = sender.value;
        recipient.setAttribute('readonly', 'true');
        recipient.style.opacity = '0.7';
    } else {
        recipient.removeAttribute('readonly');
        recipient.style.opacity = '1';
    }
}

function handleSenderEmailInput(val) {
    const checkbox = document.getElementById('adminSameEmailCheckbox');
    if (checkbox && checkbox.checked) {
        const recipient = document.getElementById('adminRecipientEmail');
        if (recipient) recipient.value = val;
    }
}

function handleEmailSettingsSubmit(e) {
    e.preventDefault();
    const sameCheckbox = document.getElementById('adminSameEmailCheckbox');
    const sender = document.getElementById('adminSmtpUser').value.trim();
    const recipient = document.getElementById('adminRecipientEmail').value.trim();
    const settings = {
        smtp_user: sender,
        smtp_password: document.getElementById('adminSmtpPassword').value,
        smtp_server: document.getElementById('adminSmtpServer').value.trim(),
        smtp_port: document.getElementById('adminSmtpPort').value.trim(),
        admin_email: sameCheckbox && sameCheckbox.checked ? sender : recipient,
        same_email: sameCheckbox ? sameCheckbox.checked : false
    };
    saveEmailSettings(settings);
    const alertBox = document.getElementById('emailSettingsSavedAlert');
    if (alertBox) {
        alertBox.innerHTML = `✅ Настройки почты успешно сохранены!<br>Все новые заказы будут отправляться на адрес: <strong>${settings.admin_email}</strong>`;
        alertBox.style.display = 'block';
        setTimeout(() => alertBox.style.display = 'none', 5000);
    }
}

function testEmailSend() {
    const s = getEmailSettings();
    const recipient = s.admin_email || 'admin@markus-mart.ru';
    const sender = s.smtp_user || 'info@markus-mart.ru';
    const modal = document.getElementById('testEmailModal');
    if (modal) {
        document.getElementById('testEmailSender').textContent = sender;
        document.getElementById('testEmailRecipient').textContent = recipient;
        document.getElementById('testEmailServer').textContent = `${s.smtp_server}:${s.smtp_port}`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeTestEmailModal() {
    const modal = document.getElementById('testEmailModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ─── ИНИЦИАЛИЗАЦИЯ СТРАНИЦЫ ───
document.addEventListener('DOMContentLoaded', function() {
    renderPublicCatalog();
    updateAdminNavBtn();

    // Телефонная маска
    const phoneInput = document.getElementById('customer_phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') value = value.substring(1);
                let formatted = '+7';
                if (value.length > 0) formatted += ' (' + value.substring(0, 3);
                if (value.length >= 3) formatted += ') ' + value.substring(3, 6);
                if (value.length >= 6) formatted += '-' + value.substring(6, 8);
                if (value.length >= 8) formatted += '-' + value.substring(8, 10);
                e.target.value = formatted;
            }
        });
    }

    // Клавиша Escape закрывает любое активное окно
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProductCard();
            closeReserveModal();
            closeZoom();
            closeSuccessModal();
            closeAdminModal();
            closeAdminLoginModal();
        }
    });
});
