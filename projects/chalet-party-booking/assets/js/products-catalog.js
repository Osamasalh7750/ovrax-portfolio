/* ==========================================================================
   PRODUCTS-CATALOG.JS - محرك عرض وتصفية واجهة المنتجات والتجهيزات (21 صنفاً)
   تصفية بحسب النوع، فرز، بحث لحظي، معاينة سريعة، وربط مع حاسبة الحجز
   ========================================================================== */

(function () {
  'use strict';

  let currentCategory = 'all';
  let currentSort = 'featured';
  let searchQuery = '';

  const container = document.getElementById('products-grid-container');
  const countBadge = document.getElementById('products-counter-badge');

  // مصفوفة المنتجات المختارة المضافة للحجز
  window.selectedCatalogItems = [];

  function initCatalog() {
    renderCategoryCounters();
    renderProducts();
    setupCatalogEvents();
  }

  // 1. تحديث أرقام العدادات في التبويبات
  function renderCategoryCounters() {
    const data = window.PRODUCTS_CATALOG_DATA || [];
    const counts = {
      all: data.length,
      chalets: data.filter(p => p.category === 'chalets').length,
      koshas: data.filter(p => p.category === 'koshas').length,
      'sound-light': data.filter(p => p.category === 'sound-light').length,
      catering: data.filter(p => p.category === 'catering').length,
      'decor-seating': data.filter(p => p.category === 'decor-seating').length,
      staff: data.filter(p => p.category === 'staff').length
    };

    for (const [key, count] of Object.entries(counts)) {
      const el = document.getElementById(`cat-count-${key}`);
      if (el) el.textContent = count;
    }
  }

  // 2. تصفية وفرز وعرض المنتجات
  function renderProducts() {
    if (!container) return;

    let items = [...(window.PRODUCTS_CATALOG_DATA || [])];

    // تصفية حسب الفئة
    if (currentCategory !== 'all') {
      items = items.filter(p => p.category === currentCategory);
    }

    // تصفية حسب كلمة البحث
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q)
      );
    }

    // الفرز
    if (currentSort === 'price-asc') {
      items.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
      items.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'rating-desc') {
      items.sort((a, b) => b.rating - a.rating);
    }

    // تحديث عداد النتائج
    if (countBadge) {
      countBadge.textContent = `عرض ${items.length} من إجمالي 21 صنفاً`;
    }

    container.innerHTML = '';

    if (items.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #fff; border-radius: var(--radius-xl); border: 1px dashed var(--border-gold);">
          <i class="fa-solid fa-box-open" style="font-size: 3rem; color: var(--champagne-light); margin-bottom: 14px;"></i>
          <h3 style="font-size: 1.3rem; color: var(--text-dark);">لم يتم العثور على أصناف مطابقة</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">جرب كتابة كلمة أخرى أو اختيار تبويب مختلف من الأعلى.</p>
        </div>
      `;
      return;
    }

    // بناء بطاقات المنتجات
    items.forEach(prod => {
      const isAdded = window.selectedCatalogItems.some(item => item.id === prod.id);

      const card = document.createElement('div');
      card.className = 'product-item-card luxury-card';
      card.id = `card-${prod.id}`;

      let starsHtml = '';
      for (let i = 0; i < 5; i++) {
        starsHtml += `<i class="fa-solid fa-star" style="color: ${i < Math.floor(prod.rating) ? '#f59e0b' : '#e2e8f0'}; font-size: 0.78rem;"></i>`;
      }

      card.innerHTML = `
        <div class="prod-media">
          <img src="${prod.image}" alt="${prod.title}" loading="lazy">
          <div class="prod-badges-top">
            <span class="badge-pastel ${prod.badgeClass}"><i class="fa-solid fa-sparkles"></i> ${prod.badge}</span>
            <span class="badge-pastel badge-champagne"><i class="fa-solid fa-layer-group"></i> ${prod.categoryLabel}</span>
          </div>
          <button type="button" class="prod-quick-btn" onclick="window.openProductQuickView('${prod.id}')" title="معاينة سريعة وتفاصيل">
            <i class="fa-solid fa-eye"></i> معاينة سريعة
          </button>
        </div>

        <div class="prod-body">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 4px;">
              ${starsHtml}
              <small style="color: var(--text-muted); font-size: 0.78rem; font-weight: 700; margin-right: 4px;">${prod.rating} (${prod.reviewsCount})</small>
            </div>
            <span style="font-size: 0.78rem; color: #10b981; font-weight: 700;"><i class="fa-solid fa-circle-check"></i> متاح فوري</span>
          </div>

          <h3 class="prod-title">${prod.title}</h3>

          <p class="prod-desc">${prod.desc}</p>

          <div class="prod-specs-pills">
            ${prod.specs.slice(0, 3).map(s => `<span class="prod-spec-pill"><i class="fa-solid fa-check" style="color:#10b981;"></i> ${s}</span>`).join('')}
          </div>

          <div class="prod-footer">
            <div>
              <span class="prod-price-label">السعر:</span>
              <div>
                <strong class="prod-price-amount">${prod.price.toLocaleString('ar-SA')}</strong>
                <small class="prod-price-unit">ر.س / ${prod.unit}</small>
              </div>
            </div>

            <button type="button" class="btn ${isAdded ? 'btn-soft' : 'btn-champagne'}" id="btn-add-${prod.id}" onclick="window.toggleProductToBooking('${prod.id}')" style="padding: 9px 18px; font-size: 0.88rem;">
              <i class="fa-solid ${isAdded ? 'fa-check' : 'fa-plus'}"></i>
              <span>${isAdded ? 'تمت الإضافة' : 'أضف لحجزك'}</span>
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  }

  // 3. إضافة أو إزالة المنتج من باقة الحجز
  window.toggleProductToBooking = function (prodId) {
    const data = window.PRODUCTS_CATALOG_DATA || [];
    const prod = data.find(p => p.id === prodId);
    if (!prod) return;

    const existingIdx = window.selectedCatalogItems.findIndex(i => i.id === prodId);

    if (existingIdx >= 0) {
      // إزالة
      window.selectedCatalogItems.splice(existingIdx, 1);
      window.showAppNotification(`تمت إزالة [${prod.title}] من الحجز`, 'info');
    } else {
      // إضافة
      window.selectedCatalogItems.push(prod);
      window.showAppNotification(`🎉 تم بنجاح إضافة [${prod.title}] إلى تفاصيل حجزك بمبلغ ${prod.price} ر.س!`, 'success');
      
      // تشغيل تأثير احتفال خفيف
      if (typeof confetti === 'function') {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
      }
    }

    // تحديث أزرار البطاقات
    updateProductCardButtons();

    // تحديث الحاسبة وتكلفة الفاتورة
    updateBookingEngineExtras();
  };

  function updateProductCardButtons() {
    (window.PRODUCTS_CATALOG_DATA || []).forEach(prod => {
      const isAdded = window.selectedCatalogItems.some(i => i.id === prod.id);
      const btn = document.getElementById(`btn-add-${prod.id}`);
      if (btn) {
        btn.className = `btn ${isAdded ? 'btn-soft' : 'btn-champagne'}`;
        btn.innerHTML = `<i class="fa-solid ${isAdded ? 'fa-check' : 'fa-plus'}"></i> <span>${isAdded ? 'تمت الإضافة' : 'أضف لحجزك'}</span>`;
        if (isAdded) {
          btn.style.background = 'var(--pastel-sage)';
          btn.style.color = '#10b981';
          btn.style.borderColor = '#10b981';
        } else {
          btn.style.background = '';
          btn.style.color = '';
          btn.style.borderColor = '';
        }
      }
    });

    // تحديث شارة سلة الإضافات
    const cartBadge = document.getElementById('catalog-selected-count');
    if (cartBadge) {
      cartBadge.textContent = window.selectedCatalogItems.length;
      cartBadge.style.display = window.selectedCatalogItems.length > 0 ? 'inline-flex' : 'none';
    }
  }

  // 4. ربط الإضافات المحددة بحاسبة الأسعار في booking-engine.js
  function updateBookingEngineExtras() {
    let extrasTotal = 0;
    window.selectedCatalogItems.forEach(item => {
      extrasTotal += item.price;
    });

    if (window.BookingState) {
      window.BookingState.catalogExtrasTotal = extrasTotal;
      if (window.calculateDynamicPrice) {
        // نعدل السعر في الحاسبة فورياً
        window.calculateDynamicPrice();
      }
    }

    // تحديث سطر الإضافات في ملخص الفاتورة إن وجد
    const extraRow = document.getElementById('calc-catalog-extras-row');
    const extraVal = document.getElementById('calc-catalog-extras-val');
    if (extraRow && extraVal) {
      if (extrasTotal > 0) {
        extraRow.style.display = 'flex';
        extraVal.textContent = extrasTotal.toLocaleString('ar-SA') + ' ر.س';
      } else {
        extraRow.style.display = 'none';
      }
    }
  }

  // 5. نافذة المعاينة السريعة للمنتج (Quick View Modal)
  window.openProductQuickView = function (prodId) {
    const data = window.PRODUCTS_CATALOG_DATA || [];
    const prod = data.find(p => p.id === prodId);
    if (!prod) return;

    const modal = document.getElementById('product-quickview-modal');
    if (!modal) return;

    const isAdded = window.selectedCatalogItems.some(i => i.id === prod.id);

    modal.innerHTML = `
      <div class="modal-card" style="max-width: 720px;">
        <div class="modal-header">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="badge-pastel ${prod.badgeClass}">${prod.categoryLabel}</span>
            <span class="badge-pastel badge-sage"><i class="fa-solid fa-circle-check"></i> متوفر فورياً</span>
          </div>
          <button type="button" onclick="document.getElementById('product-quickview-modal').classList.remove('active')" style="background:none; border:none; font-size:1.4rem; cursor:pointer;">&times;</button>
        </div>

        <div class="modal-body" style="padding: 24px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: flex-start;">
            <div style="border-radius: var(--radius-lg); overflow: hidden; height: 320px; border: 1px solid var(--border-gold);">
              <img src="${prod.image}" alt="${prod.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>

            <div>
              <h3 style="font-size: 1.4rem; font-weight: 800; color: var(--text-dark); margin-bottom: 8px;">${prod.title}</h3>
              <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 16px;">${prod.desc}</p>

              <h5 style="font-size: 0.88rem; font-weight: 800; color: var(--text-dark); margin-bottom: 8px;">المواصفات والتجهيزات:</h5>
              <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px; font-size: 0.85rem; color: var(--text-body); margin-bottom: 20px;">
                ${prod.specs.map(s => `<li><i class="fa-solid fa-circle-check" style="color:#10b981; margin-left:6px;"></i> ${s}</li>`).join('')}
              </ul>

              <div style="background: var(--champagne-gradient-soft); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 14px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
                <div>
                  <small style="color: var(--text-muted); display: block;">سعر التجهيز المعتمد:</small>
                  <strong style="font-size: 1.35rem; color: var(--champagne-primary);">${prod.price.toLocaleString('ar-SA')} ر.س</strong>
                  <small style="color: var(--text-muted);">/ ${prod.unit}</small>
                </div>
                <div style="text-align: left;">
                  <strong style="color: #f59e0b;"><i class="fa-solid fa-star"></i> ${prod.rating}</strong>
                  <small style="display:block; color:var(--text-muted);">${prod.reviewsCount} تقييم</small>
                </div>
              </div>

              <div style="display: flex; gap: 10px;">
                <button type="button" class="btn btn-champagne" style="flex: 1; padding: 12px;" onclick="window.toggleProductToBooking('${prod.id}'); document.getElementById('product-quickview-modal').classList.remove('active');">
                  <i class="fa-solid ${isAdded ? 'fa-check' : 'fa-plus'}"></i> ${isAdded ? 'إزالة من الحجز' : 'إضافة هذا الصنف لحجزك'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
  };

  // 6. تهيئة مستمعي الأحداث
  function setupCatalogEvents() {
    // أزرار الفئات
    document.querySelectorAll('.cat-pill-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.cat-pill-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        currentCategory = e.currentTarget.dataset.category;
        renderProducts();
      });
    });

    // حقل البحث
    const searchInput = document.getElementById('catalog-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderProducts();
      });
    }

    // قائمة الفرز
    const sortSelect = document.getElementById('catalog-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProducts();
      });
    }
  }

  // بدء التشغيل
  document.addEventListener('DOMContentLoaded', initCatalog);

})();
