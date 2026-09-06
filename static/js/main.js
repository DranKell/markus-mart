// ═══════════════════════════════════════════════════════════════
// Маркус-март — клиентский скрипт
// ═══════════════════════════════════════════════════════════════

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

// ─── HOVER КАРУСЕЛЬ ───
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.hover-carousel');
    carousels.forEach(carousel => {
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
        function nextSlide() {
            showSlide((current + 1) % slides.length);
        }
        const card = carousel.closest('.product-card');
        card.addEventListener('mouseenter', () => {
            interval = setInterval(nextSlide, 1200);
        });
        card.addEventListener('mouseleave', () => {
            clearInterval(interval);
            showSlide(0);
        });
    });
});

// ─── МОДАЛКА: Карточка товара (фото в ряд + увеличение) ───
let pcmCurrentImg = 0;
let pcmImagesList = [];

function openProductCard(productId) {
    const data = productsData[productId];
    if (!data) return;

    pcmImagesList = data.images;
    pcmCurrentImg = 0;

    const modal = document.getElementById('productCardModal');
    const content = document.getElementById('productCardContent');

    // Галерея: главное фото + ряд миниатюр
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
        galleryHtml = `<div style="height:200px; background:var(--bg-secondary); display:flex; align-items:center; justify-content:center; color:var(--text-muted); font-size:3rem;">🏕️</div>`;
    }

    content.innerHTML = `
        ${galleryHtml}
        <div class="pcm-body">
            <h2 class="pcm-title">${data.name}</h2>
            <div class="pcm-price">${data.price.toLocaleString('ru-RU')} ₽</div>
            <p class="pcm-description">${data.description || 'Описание появится позже.'}</p>
            <div class="pcm-actions">
                <button class="btn btn-primary" onclick="closeProductCard(); openReserveModal(${productId}, '${data.name.replace(/'/g, "\'")}', ${data.price});">
                    📌 Отложить
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
    if (mainImg) {
        mainImg.src = pcmImagesList[index];
        mainImg.setAttribute('onclick', `openZoom('${pcmImagesList[index]}')`);
    }
    document.querySelectorAll('.pcm-thumb').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

function closeProductCard() {
    document.getElementById('productCardModal').classList.remove('active');
    document.body.style.overflow = '';
}

// ─── ZOOM (увеличение фото) ───
function openZoom(src) {
    const modal = document.getElementById('zoomModal');
    const img = document.getElementById('zoomImage');
    img.src = src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeZoom() {
    document.getElementById('zoomModal').classList.remove('active');
    document.body.style.overflow = '';
}

// ─── МОДАЛКА: Отложить ───
function openReserveModal(productId, productName, productPrice) {
    const modal = document.getElementById('reserveModal');
    const form = document.getElementById('reserveForm');
    const nameEl = document.getElementById('modalProductName');
    const priceEl = document.getElementById('modalProductPrice');
    const queueInfo = document.getElementById('queueInfo');
    const queuePos = document.getElementById('queuePosition');

    form.action = '/reserve/' + productId;
    nameEl.textContent = productName;
    priceEl.textContent = productPrice.toLocaleString('ru-RU') + ' ₽';

    const data = productsData[productId];
    if (data && data.queueLength > 0) {
        queuePos.textContent = data.queueLength + 1;
        queueInfo.style.display = 'block';
    } else {
        queueInfo.style.display = 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('customer_name').focus(), 100);
}

function closeReserveModal() {
    document.getElementById('reserveModal').classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('reserveForm').reset();
}

// Закрытие по Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProductCard();
        closeReserveModal();
        closeZoom();
    }
});

// ─── Маска телефона ───
document.addEventListener('DOMContentLoaded', function() {
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

    initNavSloganRotation();
});

// ─── Интерактивный разворот слогана на 360° по направлению курсора ───
function initNavSloganRotation() {
    const slogan = document.querySelector('.nav-slogan');
    if (!slogan) return;

    let prevX = null;
    let currentAngle = 0;
    let isRotating = false;

    slogan.addEventListener('mouseenter', function(e) {
        prevX = e.clientX;
    });

    slogan.addEventListener('mousemove', function(e) {
        if (isRotating) return;
        if (prevX === null) {
            prevX = e.clientX;
            return;
        }

        const deltaX = e.clientX - prevX;
        prevX = e.clientX;

        if (Math.abs(deltaX) > 1) {
            isRotating = true;
            const direction = deltaX > 0 ? 1 : -1;
            currentAngle += direction * 360;

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
}
