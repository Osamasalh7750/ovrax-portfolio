/**
 * منطق واجهة المتجر وسلة التسوق وتفاصيل المنتجات
 * متوافق تماماً مع التشغيل المحلي المباشر عبر file:///
 */

// ==========================================
// إدارة البيانات في الـ LocalStorage
// ==========================================
const STORAGE_KEYS = {
  PRODUCTS: 'luxury_furniture_products_v1',
  CART: 'luxury_furniture_cart_v1',
  WISHLIST: 'luxury_furniture_wishlist_v1',
  ORDERS: 'luxury_furniture_orders_v1',
  PROMO: 'luxury_furniture_applied_promo'
};

// تهيئة المنتجات في التخزين المحلي إذا لم تكن موجودة
function getStoredProducts() {
  const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(window.INITIAL_PRODUCTS || []));
    return window.INITIAL_PRODUCTS || [];
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Error parsing products from localStorage', e);
    return window.INITIAL_PRODUCTS || [];
  }
}

function saveStoredProducts(products) {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
}

function getStoredCart() {
  const data = localStorage.getItem(STORAGE_KEYS.CART);
  return data ? JSON.parse(data) : [];
}

function saveStoredCart(cart) {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  updateCartUI();
}

function getStoredWishlist() {
  const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
  return data ? JSON.parse(data) : [];
}

function saveStoredWishlist(wishlist) {
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  updateWishlistUI();
}

function getStoredOrders() {
  const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
  return data ? JSON.parse(data) : [];
}

function saveStoredOrders(orders) {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
}

// صورة بديلة في حال تعذر تحميل الصورة من الإنترنت (SVG Fallback)
window.FALLBACK_IMAGE = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='450' viewBox='0 0 600 450'%3E%3Crect width='100%25' height='100%25' fill='%2320252e'/%3E%3Ctext x='50%25' y='46%25' dominant-baseline='middle' text-anchor='middle' fill='%23C5A880' font-family='sans-serif' font-size='26' font-weight='bold'%3Eأثاث فاخر متكامل%3C/text%3E%3Ctext x='50%25' y='56%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-family='sans-serif' font-size='16'%3ELuxury Furniture Collection%3C/text%3E%3C/svg%3E";

// ==========================================
// حالة المتجر (State Management)
// ==========================================
const appState = {
  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'default',
  maxPrice: 15000,
  activeProductModal: null,
  selectedColorForModal: null,
  appliedPromo: null
};

// ==========================================
// تهيئة التطبيق عند فتح الصفحة
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initCategoriesNav();
  renderProducts();
  updateCartUI();
  updateWishlistUI();
  setupEventListeners();
  checkInitialOrders();
});

// إدراج طلب تجريبي أولي فقط لتظهر لوحة الإدارة حية وممتلئة بالبيانات عند أول تشغيل
function checkInitialOrders() {
  const orders = getStoredOrders();
  if (!orders || orders.length === 0) {
    const sampleOrders = [
      {
        id: "ORD-9842",
        date: "2026-09-08 11:30",
        customerName: "سلطان العتيبي",
        phone: "0554128930",
        city: "الرياض",
        address: "حي حطين - شارع الأمير تركي",
        paymentMethod: "بطاقة مدى / فيزا",
        status: "جاري التجهيز",
        deliveryOption: "مساءً (4م - 9م)",
        freeInstallation: true,
        items: [
          { title: "طقم كنب رويال إمبيريال 7 مقاعد", quantity: 1, price: 5490, color: "رمادي لؤلؤي" },
          { title: "طقم طاولات قهوة رخامية متداخلة", quantity: 1, price: 1350, color: "أبيض مع عروق رمادية" }
        ],
        subtotal: 6840,
        discount: 0,
        shipping: 0,
        total: 6840
      },
      {
        id: "ORD-7619",
        date: "2026-09-07 16:45",
        customerName: "نورة القحطاني",
        phone: "0503381920",
        city: "جدة",
        address: "حي الروضة - شارع الكيال",
        paymentMethod: "تقسيط تمارا",
        status: "تم التسليم",
        deliveryOption: "صباحاً (9ص - 2م)",
        freeInstallation: true,
        items: [
          { title: "سرير كينج نورديك هيدبورد بوكليه", quantity: 1, price: 3650, color: "أوف وايت كريمي" }
        ],
        subtotal: 3650,
        discount: 365,
        shipping: 0,
        total: 3285
      }
    ];
    saveStoredOrders(sampleOrders);
  }
}

// ==========================================
// بناء شريط الفئات (Category Pills)
// ==========================================
function initCategoriesNav() {
  const container = document.getElementById('navCategoriesList');
  if (!container) return;

  container.innerHTML = '';
  window.CATEGORIES.forEach(cat => {
    const li = document.createElement('li');
    li.className = `nav-cat-item ${cat.id === appState.activeCategory ? 'active' : ''}`;
    li.innerHTML = `<i class="fas ${cat.icon}"></i> <span>${cat.name}</span>`;
    li.addEventListener('click', () => {
      document.querySelectorAll('.nav-cat-item').forEach(el => el.classList.remove('active'));
      li.classList.add('active');
      appState.activeCategory = cat.id;

      // مزامنة القائمة المنسدلة في شريط الفلترة إن وجدت
      const select = document.getElementById('categoryFilterSelect');
      if (select) select.value = cat.id;

      renderProducts();
    });
    container.appendChild(li);
  });
}

// ==========================================
// عرض وفلترة المنتجات في المتجر
// ==========================================
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const countBadge = document.getElementById('catalogCountBadge');
  if (!grid) return;

  const products = getStoredProducts();
  const wishlist = getStoredWishlist();

  // فلترة حسب القسم
  let filtered = products.filter(p => {
    if (appState.activeCategory === 'all') return true;
    return p.category === appState.activeCategory;
  });

  // فلترة حسب البحث
  if (appState.searchQuery.trim() !== '') {
    const q = appState.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.material && p.material.toLowerCase().includes(q))
    );
  }

  // فلترة حسب السعر
  filtered = filtered.filter(p => p.price <= appState.maxPrice);

  // الترتيب
  if (appState.sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (appState.sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (appState.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (appState.sortBy === 'discount') {
    filtered.sort((a, b) => {
      const discA = a.oldPrice ? (a.oldPrice - a.price) : 0;
      const discB = b.oldPrice ? (b.oldPrice - b.price) : 0;
      return discB - discA;
    });
  }

  // تحديث عداد المعروضات
  if (countBadge) {
    countBadge.textContent = `عرض ${filtered.length} من إجمالي ${products.length} منتج`;
  }

  // في حالة عدم العثور على نتائج
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results-box">
        <i class="fas fa-couch"></i>
        <h3>لم يتم العثور على قطع أثاث مطابقة لبحثك</h3>
        <p>يرجى تجربة كلمات بحث أخرى أو إعادة ضبط فلاتر البحث والسعر.</p>
        <button class="btn-primary-gold" style="margin-top: 15px;" onclick="resetAllFilters()">إعادة ضبط الفلاتر</button>
      </div>
    `;
    return;
  }

  // بناء كروت المنتجات الـ 50
  grid.innerHTML = filtered.map(product => {
    const isWishlisted = wishlist.includes(product.id);
    const mainImg = (product.images && product.images.length > 0) ? product.images[0] : window.FALLBACK_IMAGE;

    // شارات المنتج
    let badgesHtml = '';
    if (product.badges && product.badges.length > 0) {
      badgesHtml = product.badges.slice(0, 3).map(b => {
        let badgeClass = 'badge-free-delivery';
        if (b.includes('تركيب')) badgeClass = 'badge-free-install';
        else if (b.includes('خصم')) badgeClass = 'badge-discount';
        else if (b.includes('ضمان')) badgeClass = 'badge-warranty';
        return `<span class="badge-tag ${badgeClass}"><i class="fas fa-check-circle"></i> ${b}</span>`;
      }).join('');
    }

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-thumb-container" onclick="openProductModal(${product.id})">
          <img src="${mainImg}" 
               alt="${product.title}" 
               class="product-img"
               loading="lazy"
               onerror="this.onerror=null; this.src=window.FALLBACK_IMAGE;">
          
          <div class="product-badges">
            ${badgesHtml}
          </div>

          <div class="thumb-quick-actions" onclick="event.stopPropagation()">
            <button class="quick-action-btn ${isWishlisted ? 'wishlist-active' : ''}" 
                    title="إضافة إلى المفضلة" 
                    onclick="toggleWishlist(${product.id})">
              <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <button class="quick-action-btn" 
                    title="معاينة سريعة" 
                    onclick="openProductModal(${product.id})">
              <i class="fas fa-eye"></i>
            </button>
          </div>
        </div>

        <div class="product-content">
          <div class="product-category-row">
            <span class="product-cat-name">${product.categoryName}</span>
            <div class="product-rating">
              <i class="fas fa-star"></i>
              <span>${product.rating || 4.8}</span>
              <span class="rating-count">(${product.reviewsCount || 20})</span>
            </div>
          </div>

          <h3 class="product-title" onclick="openProductModal(${product.id})">${product.title}</h3>
          
          <p class="product-dimensions-brief">
            <i class="fas fa-ruler-combined" style="color: var(--primary-gold); margin-left: 4px;"></i>
            ${product.dimensions ? product.dimensions.split('|')[0] : 'أبعاد مريحة ومطابقة للمواصفات'}
          </p>

          <div class="product-price-row">
            <span class="current-price">${product.price.toLocaleString('ar-SA')} <span class="currency">ر.س</span></span>
            ${product.oldPrice ? `<span class="old-price">${product.oldPrice.toLocaleString('ar-SA')} ر.س</span>` : ''}
          </div>

          <div class="card-bottom-actions">
            <button class="btn-add-cart" onclick="quickAddToCart(${product.id})">
              <i class="fas fa-shopping-bag"></i> أضف للسلة
            </button>
            <button class="btn-quick-view" onclick="openProductModal(${product.id})" title="عرض التفاصيل والمواصفات">
              <i class="fas fa-info-circle"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================
// نافذة تفاصيل المنتج المنبثقة (Product Modal)
// ==========================================
function openProductModal(productId) {
  const products = getStoredProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  appState.activeProductModal = product;
  appState.selectedColorForModal = (product.colors && product.colors.length > 0) ? product.colors[0].name : '';

  const modal = document.getElementById('productDetailModal');
  if (!modal) return;

  // إعداد صور المعرض
  const images = (product.images && product.images.length > 0) ? product.images : [window.FALLBACK_IMAGE];
  const mainImgElem = document.getElementById('modalMainImage');
  const thumbsContainer = document.getElementById('modalThumbsContainer');

  if (mainImgElem) {
    mainImgElem.src = images[0];
    mainImgElem.onerror = function() { this.src = window.FALLBACK_IMAGE; };
  }

  if (thumbsContainer) {
    thumbsContainer.innerHTML = images.map((imgUrl, index) => `
      <div class="modal-thumb ${index === 0 ? 'active' : ''}" onclick="switchModalImage('${imgUrl}', this)">
        <img src="${imgUrl}" onerror="this.onerror=null; this.src=window.FALLBACK_IMAGE;">
      </div>
    `).join('');
  }

  // تعبئة النصوص والبيانات
  document.getElementById('modalCategoryTag').textContent = product.categoryName;
  document.getElementById('modalTitle').textContent = product.title;
  document.getElementById('modalRatingVal').textContent = product.rating || 4.9;
  document.getElementById('modalReviewCount').textContent = `(${product.reviewsCount || 25} تقييم حقيقي)`;
  document.getElementById('modalCurrentPrice').innerHTML = `${product.price.toLocaleString('ar-SA')} <span style="font-size: 1rem; color: var(--text-muted);">ر.س</span>`;
  
  const oldPriceElem = document.getElementById('modalOldPrice');
  if (product.oldPrice) {
    oldPriceElem.textContent = `${product.oldPrice.toLocaleString('ar-SA')} ر.س`;
    oldPriceElem.style.display = 'inline';
  } else {
    oldPriceElem.style.display = 'none';
  }

  document.getElementById('modalDesc').textContent = product.description || 'قطعة أثاث فاخرة صُممت بعناية فائقة لتضفي على منزلك الراحة والأناقة الاستثنائية.';
  document.getElementById('modalSpecDimensions').textContent = product.dimensions || 'مطابق للمعايير القياسية';
  document.getElementById('modalSpecMaterial').textContent = product.material || 'أخشاب وأقمشة طبيعية فاخرة';
  document.getElementById('modalSpecStock').textContent = `${product.inStock || 10} قطع متوفرة بالمستودع`;

  // منتقي الألوان
  const colorsBox = document.getElementById('modalColorsContainer');
  if (colorsBox) {
    if (product.colors && product.colors.length > 0) {
      colorsBox.innerHTML = `
        <span class="colors-label">اللون المختار: <strong id="modalSelectedColorText" style="color: var(--primary-gold);">${appState.selectedColorForModal}</strong></span>
        <div class="colors-options-list">
          ${product.colors.map((c, idx) => `
            <button class="color-option-btn ${idx === 0 ? 'active' : ''}" 
                    type="button" 
                    onclick="selectModalColor('${c.name}', this)">
              <span class="color-swatch-circle" style="background-color: ${c.hex};"></span>
              <span>${c.name}</span>
            </button>
          `).join('')}
        </div>
      `;
    } else {
      colorsBox.innerHTML = '';
    }
  }

  // قائمة المزايا
  const featuresList = document.getElementById('modalFeaturesList');
  if (featuresList) {
    const defaultFeatures = [
      "توصيل مجاني فائق السرعة حتى باب المنزل",
      "تركيب وتجميع مجاني بأيدي فنيين محترفين معتمدين",
      "ضمان ذهبي 5-10 سنوات على الهيكل الداخلي والخامات",
      "إمكانية الاسترجاع والاستبدال خلال 14 يوماً بسهولة"
    ];
    const features = (product.features && product.features.length > 0) ? product.features : defaultFeatures;
    featuresList.innerHTML = features.map(f => `
      <li><i class="fas fa-check-circle"></i> <span>${f}</span></li>
    `).join('');
  }

  // إعادة ضبط عداد الكمية
  const qtyInput = document.getElementById('modalQtyInput');
  if (qtyInput) qtyInput.value = 1;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  const modal = document.getElementById('productDetailModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
  appState.activeProductModal = null;
}

function switchModalImage(imgUrl, thumbElem) {
  const mainImg = document.getElementById('modalMainImage');
  if (mainImg) {
    mainImg.src = imgUrl;
  }
  document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
  if (thumbElem) thumbElem.classList.add('active');
}

function selectModalColor(colorName, btnElem) {
  appState.selectedColorForModal = colorName;
  const label = document.getElementById('modalSelectedColorText');
  if (label) label.textContent = colorName;
  document.querySelectorAll('.color-option-btn').forEach(b => b.classList.remove('active'));
  if (btnElem) btnElem.classList.add('active');
}

function changeModalQty(delta) {
  const input = document.getElementById('modalQtyInput');
  if (!input) return;
  let val = parseInt(input.value) || 1;
  val = Math.max(1, Math.min(20, val + delta));
  input.value = val;
}

// ==========================================
// سلة التسوق (Cart System)
// ==========================================
function quickAddToCart(productId) {
  const products = getStoredProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const defaultColor = (product.colors && product.colors.length > 0) ? product.colors[0].name : 'اللون القياسي';
  addItemToCart(product, 1, defaultColor);
}

function addModalProductToCart() {
  if (!appState.activeProductModal) return;
  const input = document.getElementById('modalQtyInput');
  const qty = parseInt(input ? input.value : 1) || 1;
  addItemToCart(appState.activeProductModal, qty, appState.selectedColorForModal || 'اللون القياسي');
  closeProductModal();
  openCartDrawer();
}

function addItemToCart(product, quantity, color) {
  let cart = getStoredCart();
  const existingIndex = cart.findIndex(item => item.productId === product.id && item.color === color);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: Date.now() + Math.random(),
      productId: product.id,
      title: product.title,
      price: product.price,
      image: (product.images && product.images.length > 0) ? product.images[0] : window.FALLBACK_IMAGE,
      color: color,
      quantity: quantity
    });
  }

  saveStoredCart(cart);
  showToast(`تمت إضافة "${product.title}" إلى سلة مشترياتك بنجاح`, 'success');
}

function updateCartUI() {
  const cart = getStoredCart();
  const cartCountElem = document.getElementById('cartCounterBadge');
  const cartItemsList = document.getElementById('cartItemsList');
  const emptyCartView = document.getElementById('emptyCartView');
  const cartFooter = document.getElementById('cartDrawerFooter');

  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  if (cartCountElem) {
    cartCountElem.textContent = totalCount;
    cartCountElem.style.display = totalCount > 0 ? 'flex' : 'none';
  }

  if (!cartItemsList) return;

  if (cart.length === 0) {
    cartItemsList.innerHTML = '';
    if (emptyCartView) emptyCartView.style.display = 'block';
    if (cartFooter) cartFooter.style.display = 'none';
    return;
  }

  if (emptyCartView) emptyCartView.style.display = 'none';
  if (cartFooter) cartFooter.style.display = 'block';

  cartItemsList.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div class="cart-item-thumb">
        <img src="${item.image}" alt="${item.title}" onerror="this.onerror=null; this.src=window.FALLBACK_IMAGE;">
      </div>
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <div class="cart-item-color"><i class="fas fa-palette"></i> ${item.color}</div>
        <div class="cart-item-price">${(item.price * item.quantity).toLocaleString('ar-SA')} ر.س</div>
      </div>
      <div class="cart-item-controls">
        <button class="cart-item-remove" onclick="removeCartItem(${index})" title="حذف القطعة">
          <i class="fas fa-trash-alt"></i>
        </button>
        <div class="cart-item-qty">
          <button class="cart-qty-btn" onclick="modifyCartItemQty(${index}, -1)">-</button>
          <span class="cart-qty-count">${item.quantity}</span>
          <button class="cart-qty-btn" onclick="modifyCartItemQty(${index}, 1)">+</button>
        </div>
      </div>
    </div>
  `).join('');

  // حساب الحسابات والمجاميع
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  let discount = 0;
  if (appState.appliedPromo === 'LUXURY10') {
    discount = Math.round(subtotal * 0.10);
  }

  const finalTotal = Math.max(0, subtotal - discount);

  document.getElementById('cartSubtotalAmount').textContent = `${subtotal.toLocaleString('ar-SA')} ر.س`;
  document.getElementById('cartDiscountAmount').textContent = discount > 0 ? `-${discount.toLocaleString('ar-SA')} ر.س` : '0 ر.س';
  document.getElementById('cartTotalAmount').textContent = `${finalTotal.toLocaleString('ar-SA')} ر.س`;
}

function modifyCartItemQty(index, delta) {
  let cart = getStoredCart();
  if (!cart[index]) return;

  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveStoredCart(cart);
}

function removeCartItem(index) {
  let cart = getStoredCart();
  cart.splice(index, 1);
  saveStoredCart(cart);
  showToast('تمت إزالة القطعة من السلة', 'info');
}

function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartDrawerOverlay');
  if (drawer) drawer.classList.add('active');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartDrawerOverlay');
  if (drawer) drawer.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function applyCartPromo() {
  const input = document.getElementById('cartPromoInput');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (code === 'LUXURY10') {
    appState.appliedPromo = 'LUXURY10';
    showToast('مبروك! تم تطبيق كود الخصم (خصم 10% على إجمالي طلبك)', 'success');
    updateCartUI();
  } else if (code === '') {
    showToast('يرجى إدخال كود الخصم أولاً', 'error');
  } else {
    showToast('عذراً، كود الخصم غير صالح أو منتهي الصلاحية', 'error');
  }
}

// ==========================================
// قائمة المفضلة (Wishlist)
// ==========================================
function toggleWishlist(productId) {
  let wishlist = getStoredWishlist();
  const index = wishlist.indexOf(productId);
  const products = getStoredProducts();
  const product = products.find(p => p.id === productId);

  if (index > -1) {
    wishlist.splice(index, 1);
    showToast(`تمت إزالة "${product ? product.title : ''}" من المفضلة`, 'info');
  } else {
    wishlist.push(productId);
    showToast(`تمت إضافة "${product ? product.title : ''}" إلى قائمتك المفضلة`, 'success');
  }

  saveStoredWishlist(wishlist);
  renderProducts();
}

function updateWishlistUI() {
  const wishlist = getStoredWishlist();
  const counter = document.getElementById('wishlistCounterBadge');
  if (counter) {
    counter.textContent = wishlist.length;
    counter.style.display = wishlist.length > 0 ? 'flex' : 'none';
  }
}

function openWishlistModal() {
  const wishlist = getStoredWishlist();
  const products = getStoredProducts();
  const items = products.filter(p => wishlist.includes(p.id));

  // إذا كانت المفضلة فارغة
  if (items.length === 0) {
    showToast('قائمة المفضلة لديك فارغة حالياً', 'info');
    return;
  }

  // فلترة المعروضات على المفضلة
  appState.activeCategory = 'all';
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  // تمرير الشاشة للكتالوج مع تصفية المنتجات المفضلة فقط
  grid.scrollIntoView({ behavior: 'smooth' });
  showToast(`يتم الآن عرض منتجاتك المفضلة (${items.length} قطع أثاث)`, 'info');
}

// ==========================================
// نافذة إتمام الطلب وتأكيد الشراء (Checkout)
// ==========================================
function openCheckoutModal() {
  const cart = getStoredCart();
  if (cart.length === 0) {
    showToast('السلة فارغة! يرجى إضافة أثاث أولاً.', 'error');
    return;
  }

  closeCartDrawer();
  const modal = document.getElementById('checkoutModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // حساب الإجمالي
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discount = appState.appliedPromo === 'LUXURY10' ? Math.round(subtotal * 0.10) : 0;
    const total = subtotal - discount;

    const summaryText = document.getElementById('checkoutSummaryText');
    if (summaryText) {
      summaryText.textContent = `${total.toLocaleString('ar-SA')} ر.س (${cart.length} قطع أثاث)`;
    }
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function selectPaymentMethod(elem, method) {
  document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('active'));
  elem.classList.add('active');
  const input = document.getElementById('selectedPaymentMethodInput');
  if (input) input.value = method;
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const cart = getStoredCart();
  if (cart.length === 0) return;

  const name = document.getElementById('orderCustomerName').value.trim();
  const phone = document.getElementById('orderCustomerPhone').value.trim();
  const city = document.getElementById('orderCustomerCity').value;
  const address = document.getElementById('orderCustomerAddress').value.trim();
  const deliveryTime = document.getElementById('orderDeliveryTime').value;
  const freeInstall = document.getElementById('orderNeedInstall').checked;
  const paymentMethod = document.getElementById('selectedPaymentMethodInput').value || 'الدفع عند الاستلام';

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = appState.appliedPromo === 'LUXURY10' ? Math.round(subtotal * 0.10) : 0;
  const total = subtotal - discount;

  // توليد رقم طلب عشوائي
  const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date();
  const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

  const newOrder = {
    id: orderId,
    date: dateStr,
    customerName: name,
    phone: phone,
    city: city,
    address: address,
    deliveryOption: deliveryTime,
    freeInstallation: freeInstall,
    paymentMethod: paymentMethod,
    status: 'قيد المراجعة',
    items: cart.map(i => ({ title: i.title, quantity: i.quantity, price: i.price, color: i.color })),
    subtotal: subtotal,
    discount: discount,
    shipping: 0,
    total: total
  };

  // حفظ الطلب في التخزين
  let orders = getStoredOrders();
  orders.unshift(newOrder);
  saveStoredOrders(orders);

  // تفريغ السلة
  saveStoredCart([]);
  appState.appliedPromo = null;

  // إغلاق نافذة الدفع وإظهار الفاتورة والتهنئة
  closeCheckoutModal();
  showOrderSuccessReceipt(newOrder);
}

function showOrderSuccessReceipt(order) {
  const modal = document.getElementById('orderSuccessModal');
  if (!modal) return;

  document.getElementById('receiptOrderId').textContent = order.id;
  document.getElementById('receiptCustomerName').textContent = order.customerName;
  document.getElementById('receiptPhone').textContent = order.phone;
  document.getElementById('receiptAddress').textContent = `${order.city} - ${order.address}`;
  document.getElementById('receiptPayment').textContent = order.paymentMethod;
  document.getElementById('receiptTotal').textContent = `${order.total.toLocaleString('ar-SA')} ر.س`;
  document.getElementById('receiptItemsCount').textContent = `${order.items.length} قطع أثاث`;
  document.getElementById('receiptInstallBadge').textContent = order.freeInstallation ? 'نعم (تركيب مجاني شامل)' : 'لا';

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeOrderSuccessModal() {
  const modal = document.getElementById('orderSuccessModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ==========================================
// التبديل بين المتجر ولوحة الإدارة
// ==========================================
function toggleAdminView() {
  const storeSection = document.getElementById('storeMainSection');
  const adminSection = document.getElementById('adminMainSection');
  const btn = document.getElementById('adminToggleBtn');

  if (adminSection.classList.contains('active')) {
    // العودة للمتجر
    adminSection.classList.remove('active');
    storeSection.classList.remove('hidden');
    if (btn) btn.innerHTML = '<i class="fas fa-chart-line"></i> <span>لوحة إدارة المتجر</span>';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    // الذهاب للوحة الإدارة
    adminSection.classList.add('active');
    storeSection.classList.add('hidden');
    if (btn) btn.innerHTML = '<i class="fas fa-store"></i> <span>العودة للمتجر</span>';
    if (window.adminDashboard && typeof window.adminDashboard.refreshAll === 'function') {
      window.adminDashboard.refreshAll();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ==========================================
// إعداد مستمعي الأحداث (Event Listeners)
// ==========================================
function setupEventListeners() {
  // شريط البحث المباشر
  const searchInput = document.getElementById('mainSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      appState.searchQuery = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = e.target.value.length > 0 ? 'block' : 'none';
      }
      renderProducts();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      appState.searchQuery = '';
      clearSearchBtn.style.display = 'none';
      renderProducts();
    });
  }

  // فرز المنتجات
  const sortSelect = document.getElementById('catalogSortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      appState.sortBy = e.target.value;
      renderProducts();
    });
  }

  // فلتر السعر
  const priceSlider = document.getElementById('priceRangeSlider');
  const priceLabel = document.getElementById('maxPriceLabel');
  if (priceSlider && priceLabel) {
    priceSlider.addEventListener('input', (e) => {
      appState.maxPrice = parseInt(e.target.value);
      priceLabel.textContent = `${appState.maxPrice.toLocaleString('ar-SA')} ر.س`;
      renderProducts();
    });
  }

  // نموذج إتمام الطلب
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  }
}

function resetAllFilters() {
  appState.activeCategory = 'all';
  appState.searchQuery = '';
  appState.sortBy = 'default';
  appState.maxPrice = 15000;

  const searchInput = document.getElementById('mainSearchInput');
  if (searchInput) searchInput.value = '';

  const sortSelect = document.getElementById('catalogSortSelect');
  if (sortSelect) sortSelect.value = 'default';

  const priceSlider = document.getElementById('priceRangeSlider');
  const priceLabel = document.getElementById('maxPriceLabel');
  if (priceSlider) priceSlider.value = 15000;
  if (priceLabel) priceLabel.textContent = '15,000 ر.س';

  document.querySelectorAll('.nav-cat-item').forEach(el => el.classList.remove('active'));
  const firstCat = document.querySelector('.nav-cat-item');
  if (firstCat) firstCat.classList.add('active');

  renderProducts();
  showToast('تمت استعادة الفلاتر الافتراضية بنجاح', 'info');
}

// ==========================================
// نظام رسائل التنبيه العائمة (Toast Messages)
// ==========================================
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-msg ${type}`;
  
  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-check-circle';
  else if (type === 'error') icon = 'fa-exclamation-circle';

  toast.innerHTML = `
    <i class="fas ${icon}" style="font-size: 1.2rem;"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 20);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
