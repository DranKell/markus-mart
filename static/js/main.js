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
        icon: "🛶",
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
        name: "Кривой стартёр ледокольного парохода «Челюскин»",
        category: "rafting",
        icon: "⚓",
        price: 89900,
        priceText: "89 900 ₽",
        stock: 1,
        badge: "Арктический раритет",
        description: "Оригинальный ручной кривой стартёр для запуска главного парового котла в ледовом плену Чукотского моря (1933 г.). Выкован из метеоритного чугуна. Незаменим на сплаве: если катамаран застрял на перекате, два оборота этим стартёром запускают волну цунами, смывающую катамаран прямо на базу. Вес: 48 кг (в карман спасжилета).",
        images: []
    },
    3: {
        id: 3,
        name: "Самогонный аппарат на реактивной тяге (РД-180)",
        category: "hardware",
        icon: "🚀",
        price: 145000,
        priceText: "145 000 ₽",
        stock: 3,
        badge: "Сверхзвуковой перегон",
        description: "Походный дистиллятор закрытого цикла на керосиново-кислородной смеси. Разгоняет брагу до первой космической скорости за 3.2 секунды. Производительность: 120 литров чистого первача в секунду на форсаже. При перегоне создаёт тягу 400 тонн, позволяя катамарану преодолевать пороги 6-й категории вверх по течению.",
        images: []
    },
    4: {
        id: 4,
        name: "Шерстяной надувной спальник с подогревом от угля",
        category: "tent",
        icon: "🦣",
        price: 3490,
        priceText: "3 490 ₽",
        stock: 12,
        badge: "Двойной загар",
        description: "Связан вручную из чистой шерсти мамонта и обработан надувной герметизацией. В области пяток встроен чугунный колосник под древесный уголь Антрацит. При правильной загрузке угля до утра гарантирует температуру внутри спальника до +240°C. В комплекте: совок, кочерга и огнеупорные носки.",
        images: []
    },
    5: {
        id: 5,
        name: "Педальный привод для подводной лодки проекта «Акула»",
        category: "rafting",
        icon: "🚴",
        price: 49990,
        priceText: "49 990 ₽",
        stock: 2,
        badge: "Тихий бесшумный ход",
        description: "Экологичный бионический привод с цепной передачей Shimano Deore (24 скорости). Разработан для скрытного прохождения мелководья и ночной ловли хариуса. Легко крепится синей изолентой к раме катамарана. Позволяет развивать скорость до 35 узлов, если дежурный по лагерю выпьет утренний кофе.",
        images: []
    },
    6: {
        id: 6,
        name: "Надувной походный рояль «Красный Октябрь» (концертный)",
        category: "tent",
        icon: "🎹",
        price: 24900,
        priceText: "24 900 ₽",
        stock: 5,
        badge: "Для душевного костра",
        description: "Полноразмерный надувной трёхпедальный рояль из лодочного ПВХ плотностью 1100 г/м². В сложенном виде занимает половину гермомешка. Идеален для исполнения 'Изгиб гитары жёлтой' и 'Шизгары' в акустике таёжного каньона. В комплекте: насос-лягушка высокого давления и чугунный табурет на карабинах.",
        images: []
    },
    7: {
        id: 7,
        name: "Урановый кипятильник карманный «Малыш-ЧАЭС»",
        category: "hardware",
        icon: "☢️",
        price: 19990,
        priceText: "19 990 ₽",
        stock: 7,
        badge: "Кипятит Байкал",
        description: "Работает на обогащённом уране-235 без батареек и дров. Доводит 50-литровый котел до кипения за 0.04 секунды вместе с рыбой, водорослями и дном котла. В темноте даёт уютное изумрудное свечение, заменяя кемпинговый фонарь на площади до 15 квадратных километров. Гарантия: период полураспада (700 млн лет).",
        images: []
    },
    8: {
        id: 8,
        name: "Ласты титановые штурмовые со встроенным мангалом",
        category: "hardware",
        icon: "🥩",
        price: 7800,
        priceText: "7 800 ₽",
        stock: 9,
        badge: "Греби и жарь",
        description: "Штурмовые гидродинамические ласты из титанового сплава ВТ-6. На лопастях профрезерованы пазы под 8 шампуров. Позволяют совмещать форсирование прижима на пороге с одновременной прожаркой свиной шейки до аппетитной корочки. В комплекте опахало и баночка маринада.",
        images: []
    },
    9: {
        id: 9,
        name: "GPS-навигатор на бересте с компасом из осинового кола",
        category: "hardware",
        icon: "🧭",
        price: 1290,
        priceText: "1 290 ₽",
        stock: 33,
        badge: "ГЛОНАСС Древней Руси",
        description: "Энергонезависимый навигационный комплекс XII века. Карты масштаба 1:1 выжжены на новгородской бересте. Осиновый компас безошибочно указывает направление на север, а также отпугивает речных русалок, леших и инспекторов ГИМС. Не боится влаги, мороза и ядерного электромагнитного импульса.",
        images: []
    },
    10: {
        id: 10,
        name: "Талисман команды 'Слон Маркус'",
        category: "souvenirs",
        icon: "🐘",
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
        const stored = localStorage.getItem('markus_products_v2');
        if (stored) return JSON.parse(stored);
    } catch (e) {}
    localStorage.setItem('markus_products_v2', JSON.stringify(initialProducts));
    return initialProducts;
}

function saveProducts(prods) {
    localStorage.setItem('markus_products_v2', JSON.stringify(prods));
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
            errorEl.innerHTML = `⛔ Неверный логин или пароль! (Попытка ${adminLoginAttempts} из 3)`;
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

// ─── Управление товарами в админке (CRUD: Редактирование, Добавление, Удаление) ───
function renderAdminProducts() {
    const prods = getProducts();
    const tbody = document.getElementById('adminProductsTableBody');
    if (!tbody) return;

    tbody.innerHTML = Object.values(prods).map(p => {
        const iconOrPhoto = (p.images && p.images.length > 0)
            ? `<img src="${p.images[0]}" style="width:38px; height:38px; object-fit:cover; border-radius:8px; border:1px solid var(--border);" alt="">`
            : `<span style="font-size:1.6rem;">${p.icon || '⛺'}</span>`;

        let categoryName = 'Сплавы';
        if (p.category === 'tent') categoryName = 'Палатки';
        else if (p.category === 'hardware') categoryName = 'Фурнитура';
        else if (p.category === 'souvenirs') categoryName = 'Сувениры';

        return `
        <tr>
            <td style="text-align:center; width:52px;">${iconOrPhoto}</td>
            <td style="font-weight:700; color:var(--text-primary);">
                <div style="font-size:0.95rem; line-height:1.3;">${p.name}</div>
                <div style="font-size:0.75rem; color:var(--text-muted); font-weight:normal; max-width:240px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; margin-top:2px;">
                    ${p.description}
                </div>
            </td>
            <td style="font-size:0.82rem; color:var(--text-secondary); white-space:nowrap;">${categoryName}</td>
            <td style="color:var(--accent); font-weight:700; white-space:nowrap; font-size:0.95rem;">${p.price.toLocaleString('ru-RU')} ₽</td>
            <td style="white-space:nowrap;">
                <div class="stock-control-cluster">
                    <button class="btn-stock-pill" onclick="changeProductStock(${p.id}, -1)" title="Уменьшить">-</button>
                    <span class="stock-val">${p.stock}</span>
                    <button class="btn-stock-pill" onclick="changeProductStock(${p.id}, 1)" title="Увеличить">+</button>
                </div>
            </td>
            <td style="white-space:nowrap;">
                <span class="badge-pill ${p.stock > 0 ? 'in-stock' : 'out-of-stock'}" 
                      onclick="toggleProductStockStatus(${p.id})" title="Кликните для переключения статуса">
                    ${p.stock > 0 ? '✅ В наличии' : '❌ Под заказ'}
                </span>
            </td>
            <td style="text-align:right; white-space:nowrap;">
                <div class="admin-actions-cell">
                    <button class="btn btn-primary btn-action-edit" onclick="openEditProductModal(${p.id})" title="Редактировать товар">
                        ✏️ Изменить
                    </button>
                    <button class="btn btn-action-del" onclick="deleteAdminProduct(${p.id})" title="Удалить товар">
                        🗑️
                    </button>
                </div>
            </td>
        </tr>
        `;
    }).join('');
}

function openAddProductModal() {
    document.getElementById('productEditModalTitle').textContent = "➕ Добавление нового товара";
    document.getElementById('editProductId').value = "";
    document.getElementById('editProductName').value = "";
    document.getElementById('editProductPrice').value = "";
    document.getElementById('editProductStock').value = "10";
    document.getElementById('editProductCategory').value = "rafting";
    document.getElementById('editProductIcon').value = "🛶";
    document.getElementById('editProductBadge').value = "Новинка";
    document.getElementById('editProductDescription').value = "";
    document.getElementById('editProductImages').value = "";

    const modal = document.getElementById('productEditModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function openEditProductModal(pid) {
    const prods = getProducts();
    const p = prods[pid];
    if (!p) return;

    document.getElementById('productEditModalTitle').textContent = `✏️ Редактирование: ${p.name}`;
    document.getElementById('editProductId').value = p.id;
    document.getElementById('editProductName').value = p.name;
    document.getElementById('editProductPrice').value = p.price;
    document.getElementById('editProductStock').value = p.stock;
    document.getElementById('editProductCategory').value = p.category || 'rafting';
    document.getElementById('editProductIcon').value = p.icon || '⛺';
    document.getElementById('editProductBadge').value = p.badge || '';
    document.getElementById('editProductDescription').value = p.description || '';
    document.getElementById('editProductImages').value = (p.images || []).join(', ');

    const modal = document.getElementById('productEditModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeProductEditModal() {
    const modal = document.getElementById('productEditModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

function handleProductEditSubmit(e) {
    e.preventDefault();
    const prods = getProducts();
    const idVal = document.getElementById('editProductId').value;
    const name = document.getElementById('editProductName').value.trim();
    const price = parseFloat(document.getElementById('editProductPrice').value) || 0;
    const stock = parseInt(document.getElementById('editProductStock').value, 10) || 0;
    const category = document.getElementById('editProductCategory').value;
    const icon = document.getElementById('editProductIcon').value.trim() || '⛺';
    const badge = document.getElementById('editProductBadge').value.trim();
    const description = document.getElementById('editProductDescription').value.trim();
    const imagesRaw = document.getElementById('editProductImages').value.trim();
    
    let images = [];
    if (imagesRaw) {
        images = imagesRaw.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
    }

    if (!name || isNaN(price)) {
        alert('Пожалуйста, заполните наименование и корректную цену!');
        return;
    }

    if (idVal) {
        // Редактирование существующего
        const pid = parseInt(idVal, 10);
        if (prods[pid]) {
            prods[pid].name = name;
            prods[pid].price = price;
            prods[pid].priceText = `${price.toLocaleString('ru-RU')} ₽`;
            prods[pid].stock = stock;
            prods[pid].category = category;
            prods[pid].icon = icon;
            prods[pid].badge = badge;
            prods[pid].description = description;
            if (images.length > 0 || imagesRaw === '') {
                prods[pid].images = images;
            }
        }
    } else {
        // Добавление нового товара
        const maxId = Math.max(0, ...Object.keys(prods).map(Number));
        const newId = maxId + 1;
        prods[newId] = {
            id: newId,
            name: name,
            category: category,
            icon: icon,
            price: price,
            priceText: `${price.toLocaleString('ru-RU')} ₽`,
            stock: stock,
            badge: badge || 'Новинка',
            description: description,
            images: images
        };
    }

    saveProducts(prods);
    productsData = prods;
    renderAdminProducts();
    renderPublicCatalog();
    closeProductEditModal();
}

function deleteAdminProduct(pid) {
    const prods = getProducts();
    const p = prods[pid];
    if (!p) return;

    if (confirm(`Удалить товар «${p.name}» с витрины и склада?`)) {
        delete prods[pid];
        saveProducts(prods);
        productsData = prods;
        renderAdminProducts();
        renderPublicCatalog();
    }
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
            let icon = p.icon || '⛺';
            if (!p.icon) {
                if (p.category === 'rafting') icon = '🌊';
                else if (p.category === 'tent') icon = '⛺';
                else if (p.category === 'hardware') icon = '🔧';
            }
            imgHtml = `
                <div class="product-image-placeholder">
                    <span style="font-size: 3.8rem;">${icon}</span>
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
        const icon = data.icon || '🏕️';
        galleryHtml = `<div style="height:200px; background:var(--bg-secondary); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; color:var(--text-muted); font-size:4.5rem;">
            <span>${icon}</span>
            <p style="font-size:0.95rem; font-weight:600; color:var(--accent); margin-top:8px;">${data.badge || 'Расходник для похода'}</p>
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

// ─── ОФОРМЛЕНИЕ БРОНИРОВАНИЯ (ПРЯМАЯ СВЯЗЬ: ПОЧТА И ЗВОНОК) ───
let currentReserveProductId = null;

function openReserveModal(productId, productName, productPrice) {
    currentReserveProductId = productId;
    const modal = document.getElementById('reserveModal');
    const nameEl = document.getElementById('modalProductName');
    const priceEl = document.getElementById('modalProductPrice');
    const emailValEl = document.getElementById('reserveEmailVal');
    const phoneValEl = document.getElementById('reservePhoneVal');
    const emailLinkEl = document.getElementById('reserveEmailLink');
    const phoneLinkEl = document.getElementById('reservePhoneLink');
    const previewEl = document.getElementById('reserveEmailBodyPreview');

    if (nameEl) nameEl.textContent = productName;
    const priceFormatted = (typeof productPrice === 'number' && productPrice > 0)
        ? productPrice.toLocaleString('ru-RU') + ' ₽'
        : 'По запросу';
    if (priceEl) priceEl.textContent = priceFormatted;

    // Получаем текущие контакты администратора из настроек
    const s = getEmailSettings();
    const adminEmail = s.admin_email || 'admin@markus-mart.ru';
    const adminPhone = s.admin_phone || '+7 (999) 123-45-67';

    if (emailValEl) emailValEl.textContent = adminEmail;
    if (phoneValEl) phoneValEl.textContent = adminPhone;

    // Формируем текст темы и тела письма для почтовой программы
    const emailSubject = `Бронирование: ${productName} (Маркус-март)`;
    const emailBody = `Здравствуйте!

Хочу заказать / отложить товар в магазине Маркус-март:
• Наименование: ${productName}
• Стоимость: ${priceFormatted}

Контакты для связи и детали заказа:
Имя / Клуб: 
Телефон: 
Количество / Комментарий: `;

    if (previewEl) {
        previewEl.innerHTML = `<strong>Тема:</strong> ${emailSubject}<br><br>${emailBody.replace(/\n/g, '<br>')}`;
    }

    // Ссылка mailto для запуска стандартного почтового клиента
    if (emailLinkEl) {
        emailLinkEl.href = `mailto:${encodeURIComponent(adminEmail)}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    }

    // Ссылка tel для запуска телефонного звонка
    if (phoneLinkEl) {
        const cleanPhone = adminPhone.replace(/[^\d+]/g, '');
        phoneLinkEl.href = `tel:${cleanPhone}`;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeReserveModal() {
    const modal = document.getElementById('reserveModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
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

// ─── НАСТРОЙКИ ПОЧТЫ И СВЯЗИ (EMAIL, ТЕЛЕФОН & SMTP) ───
const defaultEmailSettings = {
    smtp_user: "info@markus-mart.ru",
    smtp_password: "",
    smtp_server: "smtp.yandex.ru",
    smtp_port: "465",
    admin_email: "admin@markus-mart.ru",
    admin_phone: "+7 (999) 123-45-67",
    same_email: false
};

function getEmailSettings() {
    try {
        const stored = localStorage.getItem('markus_email_settings');
        if (stored) return { ...defaultEmailSettings, ...JSON.parse(stored) };
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
    const adminPhoneEl = document.getElementById('adminContactPhone');
    const sameCheckbox = document.getElementById('adminSameEmailCheckbox');

    if (userEl) userEl.value = s.smtp_user || '';
    if (passEl) passEl.value = s.smtp_password || '';
    if (serverEl) serverEl.value = s.smtp_server || 'smtp.yandex.ru';
    if (portEl) portEl.value = s.smtp_port || '465';
    if (adminEmailEl) adminEmailEl.value = s.admin_email || '';
    if (adminPhoneEl) adminPhoneEl.value = s.admin_phone || '+7 (999) 123-45-67';
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
    const contactPhone = (document.getElementById('adminContactPhone') ? document.getElementById('adminContactPhone').value.trim() : '') || '+7 (999) 123-45-67';
    const settings = {
        smtp_user: sender,
        smtp_password: document.getElementById('adminSmtpPassword').value,
        smtp_server: document.getElementById('adminSmtpServer').value.trim(),
        smtp_port: document.getElementById('adminSmtpPort').value.trim(),
        admin_email: sameCheckbox && sameCheckbox.checked ? sender : recipient,
        admin_phone: contactPhone,
        same_email: sameCheckbox ? sameCheckbox.checked : false
    };
    saveEmailSettings(settings);
    const alertBox = document.getElementById('emailSettingsSavedAlert');
    if (alertBox) {
        alertBox.innerHTML = `✅ Настройки связи успешно сохранены!<br>Email для заказов: <strong>${settings.admin_email}</strong><br>Телефон для клиентов: <strong>${settings.admin_phone}</strong>`;
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
            closeProductEditModal();
        }
    });

    // Инициализация интерактивного вращения слогана при движении мыши
    initNavSloganRotation();
});

// ─── Интерактивный разворот слогана на 360° + ПАСХАЛКА (слоган ломается) ───
function initNavSloganRotation() {
    const slogan = document.querySelector('.nav-slogan');
    if (!slogan) return;

    const originalHTML = slogan.innerHTML;
    let prevX = null;
    let currentAngle = 0;
    let isRotating = false;
    let spinCount = 0;
    let isBroken = false;

    slogan.addEventListener('mouseenter', function(e) {
        if (isBroken) return;
        prevX = e.clientX;
    });

    slogan.addEventListener('mousemove', function(e) {
        if (isBroken || isRotating) return;
        if (prevX === null) {
            prevX = e.clientX;
            return;
        }

        const deltaX = e.clientX - prevX;
        prevX = e.clientX;

        // Если есть движение курсора вправо или влево
        if (Math.abs(deltaX) > 1) {
            isRotating = true;
            spinCount++;

            const direction = deltaX > 0 ? 1 : -1;
            currentAngle += direction * 360;

            // Если крутят уже 4-5 раз — начинает трястись и предупреждать
            if (spinCount >= 4 && spinCount < 6) {
                slogan.classList.add('dizzy');
            }

            // ПАСХАЛКА: на 6-й оборот слоган ломается и перекашивается!
            if (spinCount >= 6) {
                breakSlogan();
                return;
            }

            slogan.style.transition = 'transform 0.75s cubic-bezier(0.25, 1, 0.5, 1), filter 0.3s ease';
            slogan.style.transform = `scaleX(1.18) rotateY(${currentAngle}deg)`;

            setTimeout(() => {
                isRotating = false;
            }, 750);
        }
    });

    slogan.addEventListener('mouseleave', function() {
        prevX = null;
    });

    function breakSlogan() {
        isBroken = true;
        isRotating = false;
        slogan.classList.remove('dizzy');
        slogan.classList.add('broken');
        
        // Слоган трескается и разваливается
        slogan.innerHTML = `💥 Мелочи... ХРЯСЬ! 🛶 <span class="slogan-fix-hint">🛠️ починить (клик)</span>`;
        slogan.title = "Ой! Вы перекрутили слоган и он сломался! Кликните, чтобы починить.";
        
        // Звуковой эффект хруста через Web Audio API
        playCrackSound();

        // Клик чинит слоган обратно
        slogan.addEventListener('click', repairSlogan, { once: true });
    }

    function repairSlogan(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Анимация восстановления
        slogan.classList.remove('broken');
        slogan.innerHTML = originalHTML;
        slogan.title = "";
        currentAngle = 0;
        spinCount = 0;
        
        slogan.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease';
        slogan.style.transform = 'scaleX(1.18) rotate(0deg) translateY(0)';
        
        // Звуковой эффект "дзынь" починки
        playRepairSound();

        setTimeout(() => {
            isBroken = false;
        }, 500);
    }

    // Простой генератор звуков поломки/починки (без внешних файлов)
    function playCrackSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(140, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.35);
        } catch(e) {}
    }

    function playRepairSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(350, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.25);
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.25);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } catch(e) {}
    }
}
