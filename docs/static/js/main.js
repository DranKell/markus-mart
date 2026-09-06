// ═══════════════════════════════════════════════════════════════
// Маркус-март — Клиентский интерактивный скрипт (GitHub Pages)
// ═══════════════════════════════════════════════════════════════

// ─── Каталог товаров ───
const productsData = {
    1: {
        id: 1,
        name: "Хомуты для катамарана (40 мм)",
        category: "rafting",
        price: 450,
        priceText: "450 ₽ / шт",
        stock: 100,
        description: "Хомуты для рамы катамарана. Диаметр трубы рамы 40 мм. На сплавах часто теряются, найти быструю замену на реке тяжело. Продажа как поштучно, так и полным комплектом. Комплект всегда держится в наличии. При необходимости возможно оперативное изготовление под заказ. Незаменимо для туристических клубов и организаторов сплавов!",
        images: [
            "./static/uploads/60VcwPMw5UK0Cdc8Q1TrJMOWsdgAmOfofbTLGRi55Ej5QYmYVY-6P9dXy1MMJEKxBkXDhCkb1uTeocrBShiX2HsK_1786176622.jpg",
            "./static/uploads/ejQHQi5TGrWo4Qo-0WbaFD_ozxOPDUJzEJ3PWVMFAp1ZlCjwTMNWIZtkODXVlgMSDBj1uSL1LhYyT41jlp7QDiWp_1786176622.jpg",
            "./static/uploads/gvSbNk3LiJwOUFXvZZsVHOZmvT-9HWb2_uP1CUN2hDtbYaomIxewjElZ6QPFuf5vASvDyWHWdogt0HqRnQPjzCFJ_1786176622.jpg"
        ]
    },
    2: {
        id: 2,
        name: "Рюкзак туристический 65L 'Nordic'",
        category: "gear",
        price: 5490,
        priceText: "5 490 ₽",
        stock: 12,
        description: "Прочный экспедиционный рюкзак с водоотталкивающим покрытием ripstop nylon 420D. Анатомическая система вентиляции спины, регулируемые лямки с мягкими вставками, поясной ремень с карманами и отдельный отсек для спальника. Объём: 65 литров, вес: 1.8 кг.",
        images: []
    },
    3: {
        id: 3,
        name: "Палатка 3-местная 'Эверест Pro'",
        category: "gear",
        price: 12990,
        priceText: "12 990 ₽",
        stock: 5,
        description: "Всесезонная ветроустойчивая палатка с двойным тентом и проклеенными швами. Дюралюминиевый каркас, усиленные штормовые оттяжки и два тамбура для вещей. Водостойкость тента 3000 мм, дна — 6000 мм. Вес всего 2.8 кг.",
        images: []
    },
    4: {
        id: 4,
        name: "Спальник -15°C 'Арктика'",
        category: "gear",
        price: 4890,
        priceText: "4 890 ₽",
        stock: 0,
        description: "Тёплый анатомический спальный мешок типа 'кокон'. Современный трёхслойный утеплитель Hollow Fiber сохраняет тепло даже во влажных условиях. Температура комфорта -5°C, экстрим -15°C. Компрессионный чехол в комплекте.",
        images: []
    },
    5: {
        id: 5,
        name: "Фонарь кемпинговый LED 500лм",
        category: "gear",
        price: 2490,
        priceText: "2 490 ₽",
        stock: 20,
        description: "Многофункциональный светодиодный кемпинговый фонарь с плавной регулировкой теплоты и яркости. Встроенный аккумулятор на 10 000 mAh выполняет роль PowerBank для зарядки смартфонов. Защита от дождя и брызг IPX6.",
        images: []
    },
    6: {
        id: 6,
        name: "Компас жидкостный 'Турист Pro'",
        category: "gear",
        price: 1490,
        priceText: "1 490 ₽",
        stock: 50,
        description: "Высокоточный планшетный компас с демпфирующей жидкостью для мгновенной стабилизации стрелки. Включает миллиметровую линейку, масштабные сетки 1:25000 / 1:50000, увеличительное стекло и люминесцентную ночную разметку.",
        images: []
    },
    7: {
        id: 7,
        name: "Горелка газовая 'Следопыт'",
        category: "gear",
        price: 1890,
        priceText: "1 890 ₽",
        stock: 8,
        description: "Сверхкомпактная складная газовая горелка тепловой мощностью 2800 Вт со встроенным пьезоподжигом. Устойчива к ветру до 5 м/с. Подходит для стандартных резьбовых и цанговых баллонов (через адаптер). Вес 140 г.",
        images: []
    },
    8: {
        id: 8,
        name: "Талисман команды 'Слон Маркус'",
        category: "souvenirs",
        price: 990,
        priceText: "990 ₽",
        stock: 1,
        description: "Легендарный сувенир и талисман команды туристов 'Маркус-март'. Приносит удачу на порогах, сухую погоду и надёжных попутчиков в любом путешествии!",
        images: [
            "./static/uploads/1393333403_1737806842_1786180842.jpg"
        ]
    }
};

// ─── Переключение темы ───
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

// ─── Хранилище заявок (localStorage) ───
function getReservations() {
    try {
        return JSON.parse(localStorage.getItem('markus_reservations') || '[]');
    } catch (e) {
        return [];
    }
}

function saveReservation(order) {
    const list = getReservations();
    list.unshift(order);
    localStorage.setItem('markus_reservations', JSON.stringify(list));
    updateOrdersBadge();
}

function updateOrdersBadge() {
    const count = getReservations().length;
    const badge = document.getElementById('ordersBadge');
    if (badge) {
        if (count > 0) {
            badge.textContent = count;
            badge.style.display = 'inline-flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

// ─── Hover Карусель ───
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

// ─── Модалка карточки товара ───
let pcmCurrentImg = 0;
let pcmImagesList = [];

function openProductCard(productId) {
    const data = productsData[productId];
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
            <p style="font-size:0.9rem; margin-top:8px;">Фото готовится</p>
        </div>`;
    }

    const safeName = data.name.replace(/'/g, "\\'");
    const stockBadge = data.stock > 0
        ? `<span class="product-badge in-stock" style="position:static; display:inline-block; margin-bottom:12px;">В наличии (${data.stock} шт)</span>`
        : `<span class="product-badge out-of-stock" style="position:static; display:inline-block; margin-bottom:12px;">Под заказ</span>`;

    content.innerHTML = `
        ${galleryHtml}
        <div class="pcm-body">
            ${stockBadge}
            <h2 class="pcm-title">${data.name}</h2>
            <div class="pcm-price">${data.priceText || data.price.toLocaleString('ru-RU') + ' ₽'}</div>
            <p class="pcm-description">${data.description || 'Описание появится позже.'}</p>
            <div class="pcm-actions">
                <button class="btn btn-primary" onclick="closeProductCard(); openReserveModal(${productId}, '${safeName}', ${data.price});">
                    📌 ${data.stock > 0 ? 'Отложить' : 'Заказать'}
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

// ─── Zoom модалка ───
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

// ─── Модалка бронирования ───
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

// Обработка формы бронирования
function handleReserveSubmit(e) {
    e.preventDefault();
    const product = productsData[currentReserveProductId] || { name: 'Снаряжение', price: 0 };
    const name = document.getElementById('customer_name').value.trim();
    const phone = document.getElementById('customer_phone').value.trim();
    const email = document.getElementById('customer_email').value.trim();
    const note = document.getElementById('note').value.trim();

    if (!name || !phone) {
        alert('Пожалуйста, укажите ваше имя и телефон для связи!');
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

// Подтверждение заказа
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

// ─── Демо Админ-панель / Мои заказы ───
function openAdminModal() {
    const modal = document.getElementById('adminModal');
    const tbody = document.getElementById('adminOrdersTableBody');
    const emptyMsg = document.getElementById('adminEmptyOrders');
    const orders = getReservations();

    if (orders.length === 0) {
        tbody.innerHTML = '';
        emptyMsg.style.display = 'block';
    } else {
        emptyMsg.style.display = 'none';
        tbody.innerHTML = orders.map((o, index) => `
            <tr>
                <td style="font-weight:700; color:var(--accent);">${o.id}</td>
                <td>
                    <div style="font-weight:600; color:var(--text-primary);">${o.productName}</div>
                    <small style="color:var(--text-muted);">${o.price > 0 ? o.price.toLocaleString('ru-RU') + ' ₽' : 'По запросу'}</small>
                </td>
                <td>
                    <div><strong>${o.customerName}</strong></div>
                    <div style="color:var(--text-secondary); font-size:0.85rem;">📞 ${o.phone}</div>
                    ${o.email ? `<div style="color:var(--text-muted); font-size:0.8rem;">✉️ ${o.email}</div>` : ''}
                    ${o.note ? `<div style="color:var(--accent); font-size:0.8rem; margin-top:4px;">💬 "${o.note}"</div>` : ''}
                </td>
                <td style="font-size:0.8rem; color:var(--text-muted);">${o.date}</td>
                <td><span class="badge badge-success">${o.status}</span></td>
                <td>
                    <button class="btn btn-outline" style="padding:4px 10px; font-size:0.75rem;" onclick="deleteOrder('${o.id}')">✕</button>
                </td>
            </tr>
        `).join('');
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAdminModal() {
    const modal = document.getElementById('adminModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

function deleteOrder(id) {
    let orders = getReservations();
    orders = orders.filter(o => o.id !== id);
    localStorage.setItem('markus_reservations', JSON.stringify(orders));
    updateOrdersBadge();
    openAdminModal();
}

function clearAllOrders() {
    if (confirm('Очистить все тестовые заказы?')) {
        localStorage.removeItem('markus_reservations');
        updateOrdersBadge();
        openAdminModal();
    }
}

// ─── Фильтрация и поиск ───
function filterProducts(category, buttonEl) {
    document.querySelectorAll('.filter-pill').forEach(btn => btn.classList.remove('active'));
    if (buttonEl) buttonEl.classList.add('active');

    const searchInput = document.getElementById('searchInput');
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

    document.querySelectorAll('.product-card').forEach(card => {
        const pid = card.getAttribute('data-product-id');
        const p = productsData[pid];
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

// ─── Инициализация DOM ───
document.addEventListener('DOMContentLoaded', function() {
    initCarousels();
    updateOrdersBadge();

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

    // Закрытие клавишей Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProductCard();
            closeReserveModal();
            closeZoom();
            closeSuccessModal();
            closeAdminModal();
        }
    });

    // Клик по карточке товара
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.btn-reserve')) return;
            const productId = this.getAttribute('data-product-id');
            openProductCard(parseInt(productId));
        });
    });
});
