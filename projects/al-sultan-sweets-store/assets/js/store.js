/**
 * محرك التصفية، البحث، والفرز التفاعلي لمتجر الحلويات
 * Storefront Display & Filtering Logic
 */

let currentCategory = 'all';
let currentSort = 'default';
let currentSearchQuery = '';
let maxPriceFilter = 500;

// رسم بطاقة حلوى منفردة
function createProductCardHTML(product) {
  const isFav = Wishlist.hasItem(product.id);
  return `
    <div class="product-card" data-id="${product.id}" data-category="${product.category}">
      <div class="product-thumb">
        <span class="badge ${product.badge.includes('مبي') || product.badge.includes('طلباً') ? 'badge-primary' : 'badge-gold'} product-badge">
          ${product.badge}
        </span>
        <button class="product-fav-btn ${isFav ? 'active' : ''}" data-fav-id="${product.id}" onclick="Wishlist.toggleItem('${product.id}')" title="أضف للمفضلة">
          <i class="fas fa-heart"></i>
        </button>
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="quick-view-overlay">
          <button class="quick-view-btn" onclick="openQuickView('${product.id}')">
            <i class="fas fa-eye"></i> معاينة سريعة
          </button>
        </div>
      </div>
      <div class="product-details">
        <div class="product-meta">
          <span class="product-cat">${product.categoryName}</span>
          <div class="product-rating">
            <i class="fas fa-star"></i>
            <span>${product.rating}</span>
            <small style="color: var(--text-muted)">(${product.reviewsCount})</small>
          </div>
        </div>
        <h3 class="product-title">
          <a href="product-details.html?id=${product.id}">${product.name}</a>
        </h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <div class="product-price">
            <span class="current-price">${product.price} <small>${STORE_CONFIG.currency}</small></span>
            ${product.oldPrice ? `<span class="old-price">${product.oldPrice} ${STORE_CONFIG.currency}</span>` : ''}
          </div>
          <button class="add-cart-btn" onclick="Cart.addItem('${product.id}')" title="أضف إلى السلة">
            <i class="fas fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// تصفية وعرض المنتجات
function filterAndRenderProducts() {
  const container = document.getElementById('productsGrid');
  if (!container) return;

  let filtered = SWEETS_DATA.filter(product => {
    const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
    const matchesSearch = product.name.includes(currentSearchQuery) || 
                          product.description.includes(currentSearchQuery) ||
                          product.categoryName.includes(currentSearchQuery);
    const matchesPrice = product.price <= maxPriceFilter;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // فرز المنتجات
  if (currentSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (currentSort === 'popular') {
    filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
  }

  const resultCountEl = document.getElementById('productCount');
  if (resultCountEl) {
    resultCountEl.textContent = `عرض ${filtered.length} من أصل ${SWEETS_DATA.length} صنف`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
        <i class="fas fa-cookie-bite" style="font-size: 3.5rem; color: #d0c7cb; margin-bottom: 16px;"></i>
        <h3 style="font-size: 1.3rem; font-weight: 800;">لم يتم العثور على حلويات مطابقة!</h3>
        <p style="color: var(--text-muted); margin-top: 8px;">جرب تغيير خيارات التصفية أو البحث عن صنف آخر.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(createProductCardHTML).join('');
}

// نافذة المعاينة السريعة (Quick View Modal)
function openQuickView(productId) {
  const product = SWEETS_DATA.find(p => p.id === productId);
  if (!product) return;

  const modalContainer = document.getElementById('quickViewModal');
  if (!modalContainer) return;

  let selectedWeight = product.weightOptions[0];
  let currentPrice = product.weightsPricing[selectedWeight] || product.price;

  modalContainer.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" onclick="closeQuickView()"><i class="fas fa-times"></i></button>
      <div class="modal-grid">
        <div class="modal-img-wrap">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="modal-body">
          <div class="modal-meta">
            <span class="badge badge-gold">${product.categoryName}</span>
            <div class="product-rating">
              <i class="fas fa-star"></i>
              <span>${product.rating}</span> (${product.reviewsCount} تقييم)
            </div>
          </div>
          <h2>${product.name}</h2>
          <div class="modal-price" id="modalActivePrice">${currentPrice} ${STORE_CONFIG.currency}</div>
          <p class="modal-desc">${product.description}</p>
          
          <div class="info-pills">
            <div class="info-pill"><i class="fas fa-fire-alt" style="color: #e67e22"></i> ${product.calories}</div>
            ${product.allergens.length ? `<div class="info-pill"><i class="fas fa-exclamation-circle" style="color: #e74c3c"></i> حساسية: ${product.allergens.join('، ')}</div>` : ''}
          </div>

          <div class="weight-selector">
            <label>اختر الوزن / الحجم:</label>
            <div class="weight-options">
              ${product.weightOptions.map((w, i) => `
                <button class="weight-chip ${i === 0 ? 'active' : ''}" onclick="selectModalWeight('${product.id}', '${w}', this)">
                  ${w}
                </button>
              `).join('')}
            </div>
          </div>

          <div style="display: flex; gap: 12px; margin-top: 24px;">
            <button class="btn btn-primary" style="flex-grow: 1;" onclick="addModalItemToCart('${product.id}')">
              <i class="fas fa-cart-plus"></i> أضف إلى السلة
            </button>
            <a href="product-details.html?id=${product.id}" class="btn btn-outline">
              التفاصيل الكاملة
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  modalContainer.classList.add('active');
}

function selectModalWeight(productId, weight, btn) {
  const product = SWEETS_DATA.find(p => p.id === productId);
  if (!product) return;

  btn.parentElement.querySelectorAll('.weight-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');

  const newPrice = product.weightsPricing[weight] || product.price;
  const priceEl = document.getElementById('modalActivePrice');
  if (priceEl) priceEl.textContent = `${newPrice} ${STORE_CONFIG.currency}`;
}

function addModalItemToCart(productId) {
  const activeWeightChip = document.querySelector('.weight-chip.active');
  const selectedWeight = activeWeightChip ? activeWeightChip.textContent.trim() : null;
  Cart.addItem(productId, selectedWeight, 1);
  closeQuickView();
}

function closeQuickView() {
  const modalContainer = document.getElementById('quickViewModal');
  if (modalContainer) modalContainer.classList.remove('active');
}

// تهيئة فلاتر وأحداث المتجر
document.addEventListener('DOMContentLoaded', () => {
  // فلاتر التصنيف
  const categoryButtons = document.querySelectorAll('[data-filter-cat]');
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter-cat');
      filterAndRenderProducts();
    });
  });

  // حقل البحث
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim();
      filterAndRenderProducts();
    });
  }

  // الترتيب
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      filterAndRenderProducts();
    });
  }

  // فلتر السعر
  const priceSlider = document.getElementById('priceRange');
  const priceLabel = document.getElementById('priceRangeLabel');
  if (priceSlider) {
    priceSlider.addEventListener('input', (e) => {
      maxPriceFilter = Number(e.target.value);
      if (priceLabel) priceLabel.textContent = `${maxPriceFilter} ${STORE_CONFIG.currency}`;
      filterAndRenderProducts();
    });
  }

  filterAndRenderProducts();
});
