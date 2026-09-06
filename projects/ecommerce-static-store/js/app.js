/**
 * سوق النخبة | Elite Store - تطبيق المتجر الإلكتروني العصري المتكامل
 * يعمل مباشرة بنقر مزدوج على index.html دون خادم وبدون CORS
 */

// ==========================================
// 1. إدارة الحالة العامة والمتغيرات
// ==========================================
const AppState = {
    currentCategory: 'all',
    searchQuery: '',
    maxPrice: 6000,
    inStockOnly: false,
    sortBy: 'featured',
    currentAdminTab: 'overview',
    activeOrderFilter: 'all',
    appliedCoupon: '',
    selectedPaymentMethod: 'mada',
    isAdminMode: false
};

// ==========================================
// 2. دوال مساعدة ونظام الإشعارات (Toasts)
// ==========================================
function formatMoney(amount) {
    const settings = Store.getSettings();
    return Number(amount || 0).toLocaleString('ar-SA', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }) + ' ' + settings.currency;
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let iconSvg = '';
    if (type === 'success') {
        iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--accent-emerald); flex-shrink: 0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
    } else if (type === 'error') {
        iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--accent-rose); flex-shrink: 0;"><circle cx="12" cy="12" r="10"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/></svg>`;
    } else {
        iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--primary); flex-shrink: 0;"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>`;
    }

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ==========================================
// 3. المظهر الداكن / الفاتح (Dark Mode)
// ==========================================
function initTheme() {
    const savedTheme = localStorage.getItem(Store.KEYS.THEME) || 'light';
    applyTheme(savedTheme);

    const toggleBtn = document.getElementById('btnThemeToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem(Store.KEYS.THEME, next);
        });
    }
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const sunIcon = document.getElementById('themeIconSun');
    const moonIcon = document.getElementById('themeIconMoon');
    if (sunIcon && moonIcon) {
        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }
}

// ==========================================
// 4. التنقل بين واجهة المتجر ولوحة الإدارة
// ==========================================
function initNavigation() {
    const btnToggleAdmin = document.getElementById('btnToggleAdminView');
    const btnBackToStore = document.getElementById('btnBackToStore');
    const footerAdminLink = document.getElementById('footerAdminLink');
    const storefrontView = document.getElementById('storefrontView');
    const adminView = document.getElementById('adminView');
    const adminSwitchBtnText = document.getElementById('adminSwitchBtnText');

    function toggleAdmin(showAdmin) {
        AppState.isAdminMode = showAdmin;
        if (showAdmin) {
            storefrontView.style.display = 'none';
            adminView.classList.add('active');
            adminSwitchBtnText.textContent = 'واجهة المتجر';
            renderAdminDashboard();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            storefrontView.style.display = 'block';
            adminView.classList.remove('active');
            adminSwitchBtnText.textContent = 'لوحة الإدارة';
            renderProducts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    if (btnToggleAdmin) {
        btnToggleAdmin.addEventListener('click', (e) => {
            e.preventDefault();
            toggleAdmin(!AppState.isAdminMode);
        });
    }

    if (btnBackToStore) {
        btnBackToStore.addEventListener('click', () => toggleAdmin(false));
    }

    if (footerAdminLink) {
        footerAdminLink.addEventListener('click', (e) => {
            e.preventDefault();
            toggleAdmin(true);
        });
    }

    // روابط التنقل
    const navLinkHome = document.getElementById('navLinkHome');
    const navBrandLogo = document.getElementById('navBrandLogo');
    const navLinkProducts = document.getElementById('navLinkProducts');

    [navLinkHome, navBrandLogo].forEach(el => {
        if (el) {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                toggleAdmin(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    });

    if (navLinkProducts) {
        navLinkProducts.addEventListener('click', () => {
            toggleAdmin(false);
        });
    }

    const btnExploreDeals = document.getElementById('btnExploreDeals');
    if (btnExploreDeals) {
        btnExploreDeals.addEventListener('click', () => {
            AppState.currentCategory = 'all';
            AppState.sortBy = 'featured';
            document.getElementById('sortSelect').value = 'featured';
            renderCategoryChips();
            renderProducts();
            const catalogSec = document.getElementById('catalogSection');
            if (catalogSec) catalogSec.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// ==========================================
// 5. محرك البحث والفلترة المباشرة
// ==========================================
function initSearchAndFilters() {
    const searchInput = document.getElementById('mainSearchInput');
    const searchDropdown = document.getElementById('searchResultsDropdown');

    if (searchInput && searchDropdown) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            AppState.searchQuery = query;

            if (query.length === 0) {
                searchDropdown.classList.remove('active');
                searchDropdown.innerHTML = '';
                renderProducts();
                return;
            }

            const products = Store.getProducts();
            const matches = products.filter(p =>
                p.name.toLowerCase().includes(query) ||
                (p.description && p.description.toLowerCase().includes(query)) ||
                (p.badge && p.badge.toLowerCase().includes(query))
            );

            if (matches.length > 0) {
                searchDropdown.innerHTML = matches.slice(0, 5).map(p => `
                    <div class="search-result-item" data-id="${p.id}">
                        <img src="${p.image}" alt="${p.name}">
                        <div style="flex:1;">
                            <div style="font-weight:700; font-size:0.9rem; color:var(--text-main);">${p.name}</div>
                            <div style="font-size:0.8rem; color:var(--primary); font-weight:800;">${formatMoney(p.price)}</div>
                        </div>
                    </div>
                `).join('');
                searchDropdown.classList.add('active');

                searchDropdown.querySelectorAll('.search-result-item').forEach(item => {
                    item.addEventListener('click', () => {
                        const id = item.dataset.id;
                        openProductModal(id);
                        searchDropdown.classList.remove('active');
                    });
                });
            } else {
                searchDropdown.innerHTML = `
                    <div style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.88rem;">
                        لا توجد منتجات مطابقة لـ "${query}"
                    </div>
                `;
                searchDropdown.classList.add('active');
            }

            renderProducts();
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
                searchDropdown.classList.remove('active');
            }
        });
    }

    // فلتر نطاق السعر
    const priceRangeInput = document.getElementById('priceRangeInput');
    const priceFilterDisplay = document.getElementById('priceFilterDisplay');
    if (priceRangeInput && priceFilterDisplay) {
        priceRangeInput.addEventListener('input', (e) => {
            const val = Number(e.target.value);
            AppState.maxPrice = val;
            priceFilterDisplay.textContent = `حتى ${val} ر.س`;
            renderProducts();
        });
    }

    // فلتر التوفر
    const inStockToggle = document.getElementById('inStockOnlyToggle');
    if (inStockToggle) {
        inStockToggle.addEventListener('change', (e) => {
            AppState.inStockOnly = e.target.checked;
            renderProducts();
        });
    }

    // الترتيب
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            AppState.sortBy = e.target.value;
            renderProducts();
        });
    }

    // زر إعادة ضبط الفلاتر
    const btnResetFilters = document.getElementById('btnResetFilters');
    if (btnResetFilters) {
        btnResetFilters.addEventListener('click', () => {
            AppState.currentCategory = 'all';
            AppState.searchQuery = '';
            AppState.maxPrice = 6000;
            AppState.inStockOnly = false;
            AppState.sortBy = 'featured';

            if (searchInput) searchInput.value = '';
            if (priceRangeInput) priceRangeInput.value = 6000;
            if (priceFilterDisplay) priceFilterDisplay.textContent = 'حتى 6000 ر.س';
            if (inStockToggle) inStockToggle.checked = false;
            if (sortSelect) sortSelect.value = 'featured';

            renderCategoryChips();
            renderSidebarCategories();
            renderProducts();
            showToast('تمت إعادة ضبط فلاتر البحث بنجاح', 'info');
        });
    }
}

// ==========================================
// 6. عرض شرائح التصنيفات والفلاتر
// ==========================================
function renderCategoryChips() {
    const container = document.getElementById('categoryChipsContainer');
    if (!container) return;

    const categories = Store.getCategories();
    const products = Store.getProducts();

    const allCount = products.length;

    let html = `
        <div class="category-chip ${AppState.currentCategory === 'all' ? 'active' : ''}" data-cat="all">
            <span>جميع المنتجات</span>
            <span style="opacity: 0.7; font-size: 0.8rem;">(${allCount})</span>
        </div>
    `;

    categories.forEach(cat => {
        if (cat.id === 'all') return;
        const count = products.filter(p => p.category === cat.id).length;
        html += `
            <div class="category-chip ${AppState.currentCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
                <span>${cat.name}</span>
                <span style="opacity: 0.7; font-size: 0.8rem;">(${count})</span>
            </div>
        `;
    });

    container.innerHTML = html;

    container.querySelectorAll('.category-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            AppState.currentCategory = chip.dataset.cat;
            renderCategoryChips();
            renderSidebarCategories();
            renderProducts();
        });
    });
}

function renderSidebarCategories() {
    const container = document.getElementById('categoriesFilterList');
    if (!container) return;

    const categories = Store.getCategories();
    const products = Store.getProducts();

    let html = `
        <label class="filter-radio-label">
            <input type="radio" name="sidebarCat" value="all" ${AppState.currentCategory === 'all' ? 'checked' : ''}>
            <span>الكل (${products.length})</span>
        </label>
    `;

    categories.forEach(cat => {
        if (cat.id === 'all') return;
        const count = products.filter(p => p.category === cat.id).length;
        html += `
            <label class="filter-radio-label">
                <input type="radio" name="sidebarCat" value="${cat.id}" ${AppState.currentCategory === cat.id ? 'checked' : ''}>
                <span>${cat.name} (${count})</span>
            </label>
        `;
    });

    container.innerHTML = html;

    container.querySelectorAll("input[name='sidebarCat']").forEach(radio => {
        radio.addEventListener('change', (e) => {
            AppState.currentCategory = e.target.value;
            renderCategoryChips();
            renderProducts();
        });
    });
}

// ==========================================
// 7. تصفية وعرض بطاقات المنتجات
// ==========================================
function getFilteredProducts() {
    let list = Store.getProducts();

    // فلترة بالتصنيف
    if (AppState.currentCategory !== 'all') {
        list = list.filter(p => p.category === AppState.currentCategory);
    }

    // فلترة بالبحث
    if (AppState.searchQuery) {
        list = list.filter(p =>
            p.name.toLowerCase().includes(AppState.searchQuery) ||
            (p.description && p.description.toLowerCase().includes(AppState.searchQuery))
        );
    }

    // فلترة بنطاق السعر
    list = list.filter(p => p.price <= AppState.maxPrice);

    // فلترة بالتوفر في المخزون
    if (AppState.inStockOnly) {
        list = list.filter(p => p.stock > 0);
    }

    // الترتيب
    if (AppState.sortBy === 'price-low') {
        list.sort((a, b) => a.price - b.price);
    } else if (AppState.sortBy === 'price-high') {
        list.sort((a, b) => b.price - a.price);
    } else if (AppState.sortBy === 'rating') {
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (AppState.sortBy === 'name') {
        list.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
    } else {
        // المميز أولاً
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const countDisplay = document.getElementById('productsCountDisplay');
    if (!grid) return;

    const products = getFilteredProducts();
    if (countDisplay) countDisplay.textContent = products.length;

    if (products.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--text-light); margin-bottom: 1rem;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
                <h3 style="font-weight: 800; margin-bottom: 0.5rem; color: var(--text-main);">لم يتم العثور على أي منتج</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem;">جرب تعديل خيارات الفلترة أو ابحث بكلمات أخرى.</p>
            </div>
        `;
        return;
    }

    const categories = Store.getCategories();

    grid.innerHTML = products.map(product => {
        const catObj = categories.find(c => c.id === product.category);
        const catName = catObj ? catObj.name : 'منتجات عامة';
        const isWishlisted = Store.isInWishlist(product.id);
        const isOutOfStock = product.stock <= 0;

        return `
            <div class="product-card" data-id="${product.id}">
                <div class="product-card-media">
                    ${product.badge ? `<span class="product-badge ${product.badge.includes('خصم') ? 'sale' : 'new'}">${product.badge}</span>` : ''}
                    ${isOutOfStock ? `<span class="product-badge" style="background: var(--text-muted); right: auto; left: 12px;">نفذت الكمية</span>` : ''}
                    
                    <div class="card-quick-actions">
                        <button class="btn-card-icon btn-wishlist-toggle ${isWishlisted ? 'active-wishlist' : ''}" data-id="${product.id}" title="إضافة للمفضلة">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                        </button>
                        <button class="btn-card-icon btn-quick-view" data-id="${product.id}" title="معاينة سريعة">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                    </div>

                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>

                <div class="product-card-body">
                    <span class="product-card-category">${catName}</span>
                    <h3 class="product-card-title btn-open-detail" data-id="${product.id}">${product.name}</h3>

                    <div class="product-rating">
                        <div class="stars-row">
                            ${'★'.repeat(Math.floor(product.rating || 5))}${'☆'.repeat(5 - Math.floor(product.rating || 5))}
                        </div>
                        <span class="rating-count">(${product.reviewsCount || 10})</span>
                    </div>

                    <div class="product-card-footer">
                        <div class="price-box">
                            <span class="price-current">${formatMoney(product.price)}</span>
                            ${product.oldPrice ? `<span class="price-old">${formatMoney(product.oldPrice)}</span>` : ''}
                        </div>
                        <button class="btn-add-cart btn-add-to-cart" data-id="${product.id}" ${isOutOfStock ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                            <span>${isOutOfStock ? 'غير متوفر' : 'أضف للسلة'}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // ربط أحداث البطاقات
    grid.querySelectorAll('.btn-add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.dataset.id;
            const res = Store.addToCart(id, 1);
            if (res.success) {
                showToast(res.message, 'success');
                openCartDrawer();
            } else {
                showToast(res.message, 'error');
            }
        });
    });

    grid.querySelectorAll('.btn-wishlist-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.dataset.id;
            const isAdded = Store.toggleWishlist(id);
            btn.classList.toggle('active-wishlist', isAdded);
            showToast(isAdded ? 'تمت إضافة المنتج إلى المفضلة' : 'تمت إزالة المنتج من المفضلة', 'info');
            updateHeaderBadges();
        });
    });

    grid.querySelectorAll('.btn-quick-view, .btn-open-detail').forEach(el => {
        el.addEventListener('click', () => {
            openProductModal(el.dataset.id);
        });
    });
}

// ==========================================
// 8. نافذة تفاصيل المنتج السريعة (Product Modal)
// ==========================================
function openProductModal(productId) {
    const product = Store.getProductById(productId);
    if (!product) return;

    const modal = document.getElementById('productQuickModal');
    const body = document.getElementById('productModalBody');
    if (!modal || !body) return;

    const isOutOfStock = product.stock <= 0;
    const isWishlisted = Store.isInWishlist(product.id);

    body.innerHTML = `
        <div class="product-modal-gallery">
            <img src="${product.image}" alt="${product.name}" id="modalMainImg">
        </div>
        <div class="product-modal-info">
            ${product.badge ? `<span class="product-badge sale" style="position:static; display:inline-block; margin-bottom: 0.75rem;">${product.badge}</span>` : ''}
            <h2>${product.name}</h2>

            <div class="product-rating" style="margin-bottom: 1rem;">
                <div class="stars-row" style="font-size: 1.1rem;">
                    ${'★'.repeat(Math.floor(product.rating || 5))}${'☆'.repeat(5 - Math.floor(product.rating || 5))}
                </div>
                <span style="font-weight: 700; color: var(--text-main); margin-right: 0.4rem;">${product.rating || 5.0}</span>
                <span class="rating-count">(${product.reviewsCount || 10} تقييم حقيقي من المشترين)</span>
            </div>

            <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1.25rem;">
                <span style="font-size: 1.8rem; font-weight: 900; color: var(--primary);">${formatMoney(product.price)}</span>
                ${product.oldPrice ? `<span style="font-size: 1.1rem; color: var(--text-light); text-decoration: line-through;">${formatMoney(product.oldPrice)}</span>` : ''}
                <span style="font-size: 0.85rem; color: ${product.stock > 5 ? 'var(--accent-emerald)' : 'var(--accent-rose)'}; font-weight: 700;">
                    ${product.stock > 0 ? `متوفر في المخزون (${product.stock} قطعة)` : 'نفذت الكمية حالياً'}
                </span>
            </div>

            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.8; margin-bottom: 1.5rem;">
                ${product.description}
            </p>

            ${product.features && product.features.length > 0 ? `
                <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.5rem;">أبرز المزايا والمواصفات:</div>
                <ul class="product-modal-features">
                    ${product.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
            ` : ''}

            <div style="display: flex; align-items: center; gap: 1rem; margin-top: 2rem;">
                <div class="quantity-control" style="border-radius: var(--radius-md); padding: 0.2rem;">
                    <button id="modalQtyMinus" style="width: 34px; height: 34px;">-</button>
                    <span id="modalQtyDisplay" style="font-size: 1rem; min-width: 32px; text-align: center;">1</span>
                    <button id="modalQtyPlus" style="width: 34px; height: 34px;">+</button>
                </div>
                
                <button class="btn-primary" id="btnModalAddToCart" style="flex: 1; justify-content: center; padding: 0.85rem;" ${isOutOfStock ? 'disabled style="opacity:0.5;"' : ''}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    <span>${isOutOfStock ? 'المنتج غير متوفر' : 'إضافة إلى سلة الشراء'}</span>
                </button>
            </div>
        </div>
    `;

    modal.classList.add('open');

    // منطق الكمية في المودال
    let currentQty = 1;
    const qtyDisplay = document.getElementById('modalQtyDisplay');
    const btnMinus = document.getElementById('modalQtyMinus');
    const btnPlus = document.getElementById('modalQtyPlus');
    const btnAdd = document.getElementById('btnModalAddToCart');

    if (btnMinus && btnPlus && qtyDisplay) {
        btnMinus.addEventListener('click', () => {
            if (currentQty > 1) {
                currentQty--;
                qtyDisplay.textContent = currentQty;
            }
        });
        btnPlus.addEventListener('click', () => {
            if (currentQty < product.stock) {
                currentQty++;
                qtyDisplay.textContent = currentQty;
            } else {
                showToast(`الكمية المتاحة في المخزون هي ${product.stock} فقط`, 'error');
            }
        });
    }

    if (btnAdd) {
        btnAdd.addEventListener('click', () => {
            const res = Store.addToCart(product.id, currentQty);
            if (res.success) {
                modal.classList.remove('open');
                showToast(res.message, 'success');
                openCartDrawer();
            } else {
                showToast(res.message, 'error');
            }
        });
    }
}

// ==========================================
// 9. السلة الجانبية (Drawer Cart)
// ==========================================
function initCartDrawer() {
    const btnCartOpen = document.getElementById('btnCartOpen');
    const btnCloseCart = document.getElementById('btnCloseCartDrawer');
    const overlay = document.getElementById('cartDrawerOverlay');
    const drawer = document.getElementById('cartDrawer');
    const btnCheckout = document.getElementById('btnOpenCheckoutModal');
    const btnApplyCoupon = document.getElementById('btnApplyDrawerCoupon');

    if (btnCartOpen) {
        btnCartOpen.addEventListener('click', () => openCartDrawer());
    }

    if (btnCloseCart) {
        btnCloseCart.addEventListener('click', () => closeCartDrawer());
    }

    if (overlay) {
        overlay.addEventListener('click', () => closeCartDrawer());
    }

    if (btnApplyCoupon) {
        btnApplyCoupon.addEventListener('click', () => {
            const input = document.getElementById('drawerCouponInput');
            if (!input) return;
            const code = input.value.trim();
            const totals = Store.calculateTotals(code);

            const msgDiv = document.getElementById('couponFeedbackMessage');
            if (totals.couponInfo) {
                AppState.appliedCoupon = code;
                msgDiv.style.display = 'block';
                msgDiv.style.color = 'var(--accent-emerald)';
                msgDiv.textContent = `تم تطبيق الخصم: ${totals.couponInfo.discountPercent}% (${totals.couponInfo.title})`;
                showToast('تم تفعيل كود الخصم بنجاح!', 'success');
            } else {
                AppState.appliedCoupon = '';
                const val = Store.validateCoupon(code, totals.subtotal);
                msgDiv.style.display = 'block';
                msgDiv.style.color = 'var(--accent-rose)';
                msgDiv.textContent = val.message || 'كود غير صالح';
            }
            renderCartDrawer();
        });
    }

    if (btnCheckout) {
        btnCheckout.addEventListener('click', () => {
            const cart = Store.getCart();
            if (cart.length === 0) {
                showToast('سلة المشتريات فارغة!', 'error');
                return;
            }
            closeCartDrawer();
            openCheckoutModal();
        });
    }

    window.addEventListener('cart-updated', () => {
        updateHeaderBadges();
        renderCartDrawer();
    });
}

function openCartDrawer() {
    const overlay = document.getElementById('cartDrawerOverlay');
    const drawer = document.getElementById('cartDrawer');
    if (overlay && drawer) {
        renderCartDrawer();
        overlay.classList.add('open');
        drawer.classList.add('open');
    }
}

function closeCartDrawer() {
    const overlay = document.getElementById('cartDrawerOverlay');
    const drawer = document.getElementById('cartDrawer');
    if (overlay && drawer) {
        overlay.classList.remove('open');
        drawer.classList.remove('open');
    }
}

function renderCartDrawer() {
    const list = document.getElementById('drawerCartItemsList');
    const countBadge = document.getElementById('drawerCartCount');
    if (!list) return;

    const totals = Store.calculateTotals(AppState.appliedCoupon);
    if (countBadge) countBadge.textContent = Store.getCartCount();

    // مؤشر الشحن المجاني
    const settings = Store.getSettings();
    const threshold = settings.freeShippingThreshold;
    const progressFill = document.getElementById('freeShippingFill');
    const progressText = document.getElementById('freeShippingText');

    if (progressFill && progressText) {
        if (totals.subtotal >= threshold) {
            progressFill.style.width = '100%';
            progressFill.style.background = 'var(--accent-emerald)';
            progressText.innerHTML = '🎉 مبروك! لقد حصلت على <b>شحن مجاني</b> لهذا الطلب!';
        } else {
            const diff = threshold - totals.subtotal;
            const pct = Math.min(100, Math.round((totals.subtotal / threshold) * 100));
            progressFill.style.width = `${pct}%`;
            progressFill.style.background = 'linear-gradient(90deg, var(--accent-emerald), var(--primary))';
            progressText.innerHTML = `أضف بقيمة <b>${formatMoney(diff)}</b> إضافية للحصول على <b>شحن مجاني</b>!`;
        }
    }

    if (totals.items.length === 0) {
        list.innerHTML = `
            <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--text-light); margin-bottom: 1rem;"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                <h4 style="font-weight: 800; color: var(--text-main); margin-bottom: 0.35rem;">سلتك فارغة حالياً</h4>
                <p style="font-size: 0.88rem;">استكشف منتجاتنا المميزة وأضف ما يعجبك!</p>
            </div>
        `;
    } else {
        list.innerHTML = totals.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${formatMoney(item.price)}</div>
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div class="quantity-control">
                            <button class="btn-qty-minus" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="btn-qty-plus" data-id="${item.id}">+</button>
                        </div>
                        <button class="btn-remove-item btn-cart-remove" data-id="${item.id}" title="حذف">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // أزرار زيادة ونقصان وحذف
        list.querySelectorAll('.btn-qty-minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const item = totals.items.find(i => i.id === id);
                if (item) Store.updateCartQuantity(id, item.quantity - 1);
            });
        });

        list.querySelectorAll('.btn-qty-plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const item = totals.items.find(i => i.id === id);
                if (item) Store.updateCartQuantity(id, item.quantity + 1);
            });
        });

        list.querySelectorAll('.btn-cart-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                Store.removeFromCart(id);
                showToast('تم حذف العنصر من السلة', 'info');
            });
        });
    }

    // الحسابات والتكلفة
    document.getElementById('drawerSubtotal').textContent = formatMoney(totals.subtotal);
    const discountRow = document.getElementById('drawerDiscountRow');
    if (totals.discount > 0) {
        discountRow.style.display = 'flex';
        document.getElementById('drawerDiscount').textContent = `- ${formatMoney(totals.discount)}`;
    } else {
        discountRow.style.display = 'none';
    }

    document.getElementById('drawerShipping').textContent = totals.shipping === 0 ? 'مجاناً' : formatMoney(totals.shipping);
    document.getElementById('drawerTax').textContent = formatMoney(totals.tax);
    document.getElementById('drawerGrandTotal').textContent = formatMoney(totals.grandTotal);
}

// ==========================================
// 10. إتمام الشراء وتوليد الفاتورة (Checkout)
// ==========================================
function initCheckout() {
    const modal = document.getElementById('checkoutModal');
    const form = document.getElementById('checkoutForm');
    const btnClose = document.getElementById('btnCloseCheckoutModal');

    if (btnClose) {
        btnClose.addEventListener('click', () => modal.classList.remove('open'));
    }

    // اختيار وسيلة الدفع
    const paymentOptions = document.querySelectorAll('.payment-card-option');
    paymentOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            paymentOptions.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            AppState.selectedPaymentMethod = opt.dataset.method;
        });
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const totals = Store.calculateTotals(AppState.appliedCoupon);
            if (totals.items.length === 0) {
                showToast('السلة فارغة!', 'error');
                return;
            }

            const orderData = {
                customer: {
                    name: document.getElementById('custName').value.trim(),
                    phone: document.getElementById('custPhone').value.trim(),
                    email: document.getElementById('custEmail').value.trim(),
                    city: document.getElementById('custCity').value,
                    address: document.getElementById('custAddress').value.trim()
                },
                items: totals.items,
                subtotal: totals.subtotal,
                discount: totals.discount,
                couponCode: AppState.appliedCoupon,
                shipping: totals.shipping,
                tax: totals.tax,
                total: totals.grandTotal,
                paymentMethod: AppState.selectedPaymentMethod,
                notes: document.getElementById('custNotes').value.trim()
            };

            const createdOrder = Store.addOrder(orderData);
            Store.clearCart();
            modal.classList.remove('open');
            form.reset();

            showToast(`تم تأكيد طلبك بنجاح! رقم الطلب: ${createdOrder.id}`, 'success');
            openInvoiceModal(createdOrder.id);
        });
    }
}

function openCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (!modal) return;

    const totals = Store.calculateTotals(AppState.appliedCoupon);
    document.getElementById('checkoutSubtotal').textContent = formatMoney(totals.subtotal);

    const discountRow = document.getElementById('checkoutDiscountRow');
    if (totals.discount > 0) {
        discountRow.style.display = 'flex';
        document.getElementById('checkoutDiscount').textContent = `- ${formatMoney(totals.discount)}`;
    } else {
        discountRow.style.display = 'none';
    }

    document.getElementById('checkoutShipping').textContent = totals.shipping === 0 ? 'مجاناً' : formatMoney(totals.shipping);
    document.getElementById('checkoutTax').textContent = formatMoney(totals.tax);
    document.getElementById('checkoutGrandTotal').textContent = formatMoney(totals.grandTotal);

    modal.classList.add('open');
}

// ==========================================
// 11. الفاتورة الإلكترونية القابلة للطباعة
// ==========================================
function openInvoiceModal(orderId) {
    const order = Store.getOrderById(orderId);
    if (!order) {
        showToast('لم يتم العثور على الطلب!', 'error');
        return;
    }

    const modal = document.getElementById('invoiceModal');
    const area = document.getElementById('printableInvoiceArea');
    if (!modal || !area) return;

    const settings = Store.getSettings();
    const orderDate = new Date(order.date).toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    let paymentMethodName = 'مدى / بطاقة ائتمان';
    if (order.paymentMethod === 'apple_pay') paymentMethodName = 'Apple Pay';
    if (order.paymentMethod === 'cod') paymentMethodName = 'الدفع عند الاستلام';

    area.innerHTML = `
        <div class="invoice-header">
            <div>
                <h2 style="font-size: 1.6rem; font-weight: 900; color: #0f172a; margin-bottom: 0.25rem;">${settings.storeName}</h2>
                <p style="color: #64748b; font-size: 0.88rem;">فاتورة ضريبية مبسطة (معتمدة إلكترونياً)</p>
                <p style="color: #64748b; font-size: 0.85rem;">الرقم الضريبي: 310294857200003</p>
            </div>
            <div style="text-align: left;">
                <div style="font-size: 1.25rem; font-weight: 900; color: #2563eb;">${order.id}</div>
                <div style="font-size: 0.85rem; color: #64748b; margin-top: 0.2rem;">${orderDate}</div>
            </div>
        </div>

        <div class="invoice-parties">
            <div>
                <h4 style="font-weight: 800; font-size: 0.95rem; margin-bottom: 0.4rem; color: #0f172a;">بيانات المشتري:</h4>
                <div style="font-size: 0.9rem; color: #334155; line-height: 1.6;">
                    <b>الاسم:</b> ${order.customer.name}<br>
                    <b>الجوال:</b> ${order.customer.phone}<br>
                    <b>المدينة والعنوان:</b> ${order.customer.city}، ${order.customer.address}
                </div>
            </div>
            <div>
                <h4 style="font-weight: 800; font-size: 0.95rem; margin-bottom: 0.4rem; color: #0f172a;">تفاصيل المعاملة:</h4>
                <div style="font-size: 0.9rem; color: #334155; line-height: 1.6;">
                    <b>طريقة الدفع:</b> ${paymentMethodName}<br>
                    <b>حالة الطلب:</b> <span class="status-badge ${order.status}">${translateStatus(order.status)}</span><br>
                    <b>الملاحظات:</b> ${order.notes || 'لا يوجد'}
                </div>
            </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; text-align: right; font-size: 0.92rem;">
            <thead>
                <tr style="background: #f1f5f9; border-bottom: 2px solid #cbd5e1;">
                    <th style="padding: 0.75rem 1rem;">المنتج</th>
                    <th style="padding: 0.75rem; text-align: center;">الكمية</th>
                    <th style="padding: 0.75rem; text-align: left;">سعر الوحدة</th>
                    <th style="padding: 0.75rem 1rem; text-align: left;">الإجمالي</th>
                </tr>
            </thead>
            <tbody>
                ${order.items.map(it => `
                    <tr style="border-bottom: 1px solid #e2e8f0;">
                        <td style="padding: 0.85rem 1rem; font-weight: 600;">${it.name}</td>
                        <td style="padding: 0.85rem; text-align: center;">${it.quantity}</td>
                        <td style="padding: 0.85rem; text-align: left;">${formatMoney(it.price)}</td>
                        <td style="padding: 0.85rem 1rem; text-align: left; font-weight: 700;">${formatMoney(it.price * it.quantity)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>

        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
            <!-- محاكاة رمز QR الضريبي الإلكتروني -->
            <div style="text-align: center; border: 1px solid #e2e8f0; padding: 0.75rem; border-radius: 8px; width: 130px; background: #fff;">
                <svg width="90" height="90" viewBox="0 0 100 100" fill="#0f172a">
                    <rect width="30" height="30" x="5" y="5" fill="#0f172a"/>
                    <rect width="20" height="20" x="10" y="10" fill="#fff"/>
                    <rect width="10" height="10" x="15" y="15" fill="#0f172a"/>
                    <rect width="30" height="30" x="65" y="5" fill="#0f172a"/>
                    <rect width="20" height="20" x="70" y="10" fill="#fff"/>
                    <rect width="10" height="10" x="75" y="15" fill="#0f172a"/>
                    <rect width="30" height="30" x="5" y="65" fill="#0f172a"/>
                    <rect width="20" height="20" x="10" y="70" fill="#fff"/>
                    <rect width="10" height="10" x="15" y="75" fill="#0f172a"/>
                    <rect width="10" height="10" x="45" y="15" fill="#0f172a"/>
                    <rect width="15" height="10" x="45" y="35" fill="#0f172a"/>
                    <rect width="10" height="25" x="65" y="45" fill="#0f172a"/>
                    <rect width="15" height="15" x="45" y="75" fill="#0f172a"/>
                </svg>
                <div style="font-size: 0.65rem; color: #64748b; margin-top: 0.25rem;">فاتورة مشفرة ZATCA</div>
            </div>

            <div style="width: 280px; font-size: 0.92rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem; color: #64748b;">
                    <span>المجموع الفرعي:</span>
                    <span>${formatMoney(order.subtotal)}</span>
                </div>
                ${order.discount > 0 ? `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem; color: #10b981; font-weight: 700;">
                        <span>الخصم المطبق:</span>
                        <span>- ${formatMoney(order.discount)}</span>
                    </div>
                ` : ''}
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem; color: #64748b;">
                    <span>الشحن والتوصيل:</span>
                    <span>${order.shipping === 0 ? 'مجاناً' : formatMoney(order.shipping)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem; color: #64748b;">
                    <span>ضريبة القيمة المضافة (15%):</span>
                    <span>${formatMoney(order.tax)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding-top: 0.6rem; border-top: 2px solid #0f172a; font-size: 1.15rem; font-weight: 900; color: #0f172a;">
                    <span>المجموع الإجمالي:</span>
                    <span style="color: #2563eb;">${formatMoney(order.total)}</span>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('open');

    const printBtn = document.getElementById('btnPrintInvoiceBtn');
    if (printBtn) {
        printBtn.onclick = () => window.print();
    }

    const closeBtn = document.getElementById('btnCloseInvoiceModal');
    if (closeBtn) {
        closeBtn.onclick = () => modal.classList.remove('open');
    }
}

function translateStatus(status) {
    const map = {
        pending: 'قيد الانتظار',
        processing: 'جارِ التجهيز',
        shipped: 'تم الشحن',
        delivered: 'تم التوصيل',
        cancelled: 'ملغي'
    };
    return map[status] || status;
}

// ==========================================
// 12. تتبع الطلبات (Order Tracking Section)
// ==========================================
function initOrderTracking() {
    const btnSearch = document.getElementById('btnSearchTracking');
    const input = document.getElementById('trackingInput');
    const resultArea = document.getElementById('trackingResultArea');

    if (btnSearch && input && resultArea) {
        btnSearch.addEventListener('click', () => {
            const val = input.value.trim();
            if (!val) {
                showToast('يرجى إدخال رقم الطلب أو رقم الجوال', 'error');
                return;
            }

            let order = Store.getOrderById(val);
            if (!order) {
                const phoneOrders = Store.getOrdersByPhone(val);
                if (phoneOrders.length > 0) order = phoneOrders[0];
            }

            if (!order) {
                resultArea.style.display = 'block';
                resultArea.innerHTML = `
                    <div style="text-align: center; padding: 2rem; color: var(--accent-rose);">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 0.5rem;"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                        <h4 style="font-weight: 800;">عذراً، لم يتم العثور على أي طلب برقم "${val}"</h4>
                        <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.25rem;">تأكد من كتابة الرمز بشكل صحيح مثل (ORD-8812) أو رقم الهاتف المستخدم عند الشراء.</p>
                    </div>
                `;
                return;
            }

            // تحديد خطوات التتبع
            const stepOrder = ['pending', 'processing', 'shipped', 'delivered'];
            const currentIdx = stepOrder.indexOf(order.status);

            resultArea.style.display = 'block';
            resultArea.innerHTML = `
                <div style="background: var(--bg-surface-soft); border-radius: var(--radius-lg); padding: 1.75rem; border: 1px solid var(--border-color);">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
                        <div>
                            <span style="font-size: 0.85rem; color: var(--text-muted);">رقم الشحنة والطلب:</span>
                            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--primary);">${order.id}</h3>
                        </div>
                        <span class="status-badge ${order.status}" style="font-size: 0.9rem; padding: 0.4rem 1rem;">
                            الحالة الحالية: ${translateStatus(order.status)}
                        </span>
                    </div>

                    <!-- خط التتبع الزمني -->
                    <div class="tracking-timeline">
                        <div class="timeline-step ${currentIdx >= 0 ? (currentIdx > 0 ? 'completed' : 'active') : ''}">
                            <div class="step-circle">1</div>
                            <div class="step-label">تم استلام الطلب</div>
                        </div>
                        <div class="timeline-step ${currentIdx >= 1 ? (currentIdx > 1 ? 'completed' : 'active') : ''}">
                            <div class="step-circle">2</div>
                            <div class="step-label">قيد التجهيز</div>
                        </div>
                        <div class="timeline-step ${currentIdx >= 2 ? (currentIdx > 2 ? 'completed' : 'active') : ''}">
                            <div class="step-circle">3</div>
                            <div class="step-label">تم الشحن</div>
                        </div>
                        <div class="timeline-step ${currentIdx >= 3 ? 'completed active' : ''}">
                            <div class="step-circle">4</div>
                            <div class="step-label">تم التوصيل</div>
                        </div>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; pt: 1rem; border-top: 1px solid var(--border-soft);">
                        <div style="font-size: 0.9rem; color: var(--text-muted);">
                            المستلم: <b>${order.customer.name}</b> (${order.customer.city})
                        </div>
                        <button class="btn-secondary" id="btnTrackViewInvoice" style="background: var(--bg-surface); color: var(--text-main); font-size: 0.85rem; padding: 0.45rem 1rem;">
                            عرض وطباعة الفاتورة
                        </button>
                    </div>
                </div>
            `;

            document.getElementById('btnTrackViewInvoice').addEventListener('click', () => {
                openInvoiceModal(order.id);
            });
        });
    }
}

// ==========================================
// 13. لوحة تحكم إدارة المتجر (Admin Control)
// ==========================================
function initAdminDashboard() {
    // تبديل تبويبات الإدارة
    const tabBtns = document.querySelectorAll('.admin-tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            if (!tabName) return;

            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.querySelectorAll('.admin-tab-pane').forEach(p => {
                p.style.display = 'none';
                p.classList.remove('active');
            });

            const targetPane = document.getElementById(`adminTabContent${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
            if (targetPane) {
                targetPane.style.display = 'block';
                targetPane.classList.add('active');
            }

            AppState.currentAdminTab = tabName;
            renderAdminDashboard();
        });
    });

    // إضافة منتج جديد
    const btnOpenAdd = document.getElementById('btnOpenAddProductModal');
    const modalAdd = document.getElementById('productFormModal');
    const formAdd = document.getElementById('productEditForm');
    const btnCancelAdd = document.getElementById('btnCancelProductForm');
    const btnCloseAdd = document.getElementById('btnCloseProductFormModal');

    if (btnOpenAdd) {
        btnOpenAdd.addEventListener('click', () => {
            formAdd.reset();
            document.getElementById('editProductId').value = '';
            document.getElementById('productFormTitle').textContent = 'إضافة منتج جديد للمتجر';
            populateProductCategoryDropdown();
            document.getElementById('formImgPreview').style.display = 'none';
            modalAdd.classList.add('open');
        });
    }

    [btnCancelAdd, btnCloseAdd].forEach(b => {
        if (b) b.addEventListener('click', () => modalAdd.classList.remove('open'));
    });

    // معاينة الصورة واختيار ملف محلي Base64
    const fileInput = document.getElementById('formProdFileInput');
    const urlInput = document.getElementById('formProdImageUrl');
    const imgPreview = document.getElementById('formImgPreview');

    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    imgPreview.src = evt.target.result;
                    imgPreview.style.display = 'block';
                    urlInput.value = '';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (urlInput) {
        urlInput.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            if (val) {
                imgPreview.src = val;
                imgPreview.style.display = 'block';
            }
        });
    }

    document.querySelectorAll('#sampleImagePickers button').forEach(btn => {
        btn.addEventListener('click', () => {
            const sample = btn.dataset.img;
            urlInput.value = sample;
            imgPreview.src = sample;
            imgPreview.style.display = 'block';
        });
    });

    // حفظ المنتج (إضافة أو تعديل)
    if (formAdd) {
        formAdd.addEventListener('submit', (e) => {
            e.preventDefault();

            const editId = document.getElementById('editProductId').value;
            const imgSrc = imgPreview.src || urlInput.value.trim() || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';

            const prodData = {
                name: document.getElementById('formProdName').value.trim(),
                category: document.getElementById('formProdCategory').value,
                price: Number(document.getElementById('formProdPrice').value),
                oldPrice: Number(document.getElementById('formProdOldPrice').value) || null,
                stock: Number(document.getElementById('formProdStock').value),
                badge: document.getElementById('formProdBadge').value.trim(),
                featured: document.getElementById('formProdFeatured').value === 'true',
                image: imgSrc,
                description: document.getElementById('formProdDescription').value.trim()
            };

            if (editId) {
                Store.updateProduct(editId, prodData);
                showToast('تم تحديث بيانات المنتج بنجاح!', 'success');
            } else {
                Store.addProduct(prodData);
                showToast('تمت إضافة المنتج الجديد إلى المتجر بنجاح!', 'success');
            }

            modalAdd.classList.remove('open');
            renderAdminProductsTable();
            renderAdminOverview();
            renderCategoryChips();
            renderSidebarCategories();
            renderProducts();
        });
    }

    // فلترة وبحث المنتجات في الإدارة
    const adminSearch = document.getElementById('adminProductsSearchInput');
    const adminCatFilter = document.getElementById('adminProductCategoryFilter');
    if (adminSearch) adminSearch.addEventListener('input', () => renderAdminProductsTable());
    if (adminCatFilter) adminCatFilter.addEventListener('change', () => renderAdminProductsTable());

    // فلاتر الطلبات في الإدارة
    document.querySelectorAll('#orderFilterButtons button').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#orderFilterButtons button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            AppState.activeOrderFilter = btn.dataset.status;
            renderAdminOrdersTable();
        });
    });

    // إضافة كوبون جديد
    const couponForm = document.getElementById('couponForm');
    if (couponForm) {
        couponForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const code = document.getElementById('inputCouponCode').value.trim().toUpperCase();
            const percent = Number(document.getElementById('inputCouponPercent').value);
            const minSpend = Number(document.getElementById('inputCouponMinSpend').value);

            Store.addCoupon({
                code,
                discountPercent: percent,
                minSpend,
                active: true,
                title: `خصم ${percent}% للطلبات فوق ${minSpend} ر.س`
            });

            couponForm.reset();
            showToast(`تم إنشاء وتفعيل الكوبون "${code}" بنجاح!`, 'success');
            renderAdminCouponsTable();
        });
    }

    // حفظ الإعدادات
    const settingsForm = document.getElementById('storeSettingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            Store.updateSettings({
                storeName: document.getElementById('settingStoreName').value.trim(),
                currency: document.getElementById('settingCurrency').value.trim(),
                phone: document.getElementById('settingPhone').value.trim(),
                email: document.getElementById('settingEmail').value.trim(),
                taxRate: Number(document.getElementById('settingTaxRate').value),
                standardShippingCost: Number(document.getElementById('settingShippingCost').value),
                freeShippingThreshold: Number(document.getElementById('settingFreeShippingThreshold').value)
            });
            showToast('تم حفظ إعدادات المتجر بنجاح!', 'success');
        });
    }

    // تصدير واستيراد قاعدة البيانات
    const btnExport = document.getElementById('btnExportDatabase');
    const importInput = document.getElementById('importJsonInput');
    const btnReset = document.getElementById('btnResetAllData');

    if (btnExport) {
        btnExport.addEventListener('click', () => {
            const dataStr = Store.exportAllData();
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `elite_store_backup_${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
            showToast('تم تصدير نسخة احتياطية من قاعدة البيانات بنجاح!', 'success');
        });
    }

    if (importInput) {
        importInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    const res = Store.importAllData(evt.target.result);
                    if (res.success) {
                        showToast(res.message, 'success');
                        renderAdminDashboard();
                        renderProducts();
                    } else {
                        showToast(res.message, 'error');
                    }
                };
                reader.readAsText(file);
            }
        });
    }

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            if (confirm('هل أنت متأكد من رغبتك في إعادة تعيين كافة بيانات المتجر إلى الوضع الافتراضي؟')) {
                Store.resetToDefault();
                showToast('تمت استعادة البيانات الافتراضية بنجاح!', 'success');
                renderAdminDashboard();
                renderCategoryChips();
                renderSidebarCategories();
                renderProducts();
            }
        });
    }

    const btnGoToOrders = document.getElementById('btnGoToOrders');
    if (btnGoToOrders) {
        btnGoToOrders.addEventListener('click', () => {
            const tabBtn = document.querySelector(".admin-tab-btn[data-tab='orders']");
            if (tabBtn) tabBtn.click();
        });
    }
}

function renderAdminDashboard() {
    renderAdminOverview();
    renderAdminProductsTable();
    renderAdminOrdersTable();
    renderAdminCouponsTable();
    populateAdminSettingsForm();
}

function renderAdminOverview() {
    const analytics = Store.getAnalytics();

    const revEl = document.getElementById('statTotalRevenue');
    const ordEl = document.getElementById('statTotalOrders');
    const prodEl = document.getElementById('statTotalProducts');
    const lowEl = document.getElementById('statLowStock');

    if (revEl) revEl.textContent = formatMoney(analytics.totalRevenue);
    if (ordEl) ordEl.textContent = analytics.ordersCount;
    if (prodEl) prodEl.textContent = analytics.productsCount;
    if (lowEl) lowEl.textContent = analytics.lowStockCount;

    // رسم بياني تفاعلي للمبيعات عبر SVG
    renderSalesChart(analytics.chartData);

    // جدول أحدث الطلبات
    const recentBody = document.getElementById('recentOrdersTableBody');
    if (recentBody) {
        const orders = Store.getOrders().slice(0, 5);
        if (orders.length === 0) {
            recentBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:1.5rem; color:var(--text-muted);">لا توجد أي طلبات مسجلة حتى الآن.</td></tr>`;
        } else {
            recentBody.innerHTML = orders.map(ord => `
                <tr>
                    <td><b>${ord.id}</b></td>
                    <td>${ord.customer.name}</td>
                    <td>${ord.customer.city}</td>
                    <td style="font-weight:700; color:var(--primary);">${formatMoney(ord.total)}</td>
                    <td>${ord.paymentMethod}</td>
                    <td><span class="status-badge ${ord.status}">${translateStatus(ord.status)}</span></td>
                </tr>
            `).join('');
        }
    }
}

function renderSalesChart(data) {
    const container = document.getElementById('chartContainer');
    if (!container || !data || data.length === 0) return;

    const maxSale = Math.max(...data.map(d => d.sales), 10000);
    const height = 180;
    const width = 800;
    const barWidth = 48;
    const spacing = width / data.length;

    let svgBars = '';
    data.forEach((d, idx) => {
        const x = idx * spacing + (spacing - barWidth) / 2;
        const barH = (d.sales / maxSale) * (height - 40);
        const y = height - barH - 25;

        svgBars += `
            <g class="chart-bar-group" style="cursor: pointer;">
                <rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="8" fill="url(#barGradient)" />
                <text x="${x + barWidth / 2}" y="${y - 8}" text-anchor="middle" fill="var(--text-main)" font-size="11" font-weight="700">${d.sales} ر.س</text>
                <text x="${x + barWidth / 2}" y="${height - 6}" text-anchor="middle" fill="var(--text-muted)" font-size="12">${d.day}</text>
            </g>
        `;
    });

    container.innerHTML = `
        <svg class="sales-svg-chart" viewBox="0 0 ${width} ${height}">
            <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#2563eb" />
                    <stop offset="100%" stop-color="#60a5fa" stop-opacity="0.7" />
                </linearGradient>
            </defs>
            <line x1="0" y1="${height - 25}" x2="${width}" y2="${height - 25}" stroke="var(--border-color)" stroke-width="1.5" />
            ${svgBars}
        </svg>
    `;
}

function renderAdminProductsTable() {
    const tbody = document.getElementById('adminProductsTableBody');
    if (!tbody) return;

    let products = Store.getProducts();
    const query = (document.getElementById('adminProductsSearchInput')?.value || '').trim().toLowerCase();
    const catFilter = document.getElementById('adminProductCategoryFilter')?.value || 'all';

    if (catFilter !== 'all') {
        products = products.filter(p => p.category === catFilter);
    }
    if (query) {
        products = products.filter(p => p.name.toLowerCase().includes(query) || p.id.toLowerCase().includes(query));
    }

    if (products.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">لا توجد أي منتجات تطابق البحث.</td></tr>`;
        return;
    }

    const categories = Store.getCategories();

    tbody.innerHTML = products.map(prod => {
        const cat = categories.find(c => c.id === prod.category);
        const catName = cat ? cat.name : prod.category;

        return `
            <tr>
                <td><img src="${prod.image}" alt="${prod.name}" class="table-prod-img"></td>
                <td style="max-width:280px; font-weight:700;">${prod.name}</td>
                <td><span style="background:var(--bg-surface-soft); padding:0.25rem 0.6rem; border-radius:var(--radius-sm); font-size:0.82rem;">${catName}</span></td>
                <td style="font-weight:800; color:var(--primary);">${formatMoney(prod.price)}</td>
                <td>
                    <span class="status-badge ${prod.stock > 5 ? 'delivered' : (prod.stock > 0 ? 'pending' : 'cancelled')}">
                        ${prod.stock > 0 ? `${prod.stock} قطع` : 'نفذت'}
                    </span>
                </td>
                <td>⭐ ${prod.rating || 5.0}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn-table-action btn-edit-prod" data-id="${prod.id}" title="تعديل">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                        </button>
                        <button class="btn-table-action delete btn-delete-prod" data-id="${prod.id}" title="حذف">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    tbody.querySelectorAll('.btn-edit-prod').forEach(btn => {
        btn.addEventListener('click', () => openEditProductModal(btn.dataset.id));
    });

    tbody.querySelectorAll('.btn-delete-prod').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            if (confirm('هل أنت متأكد من حذف هذا المنتج نهائياً من المتجر؟')) {
                Store.deleteProduct(id);
                showToast('تم حذف المنتج بنجاح', 'info');
                renderAdminProductsTable();
                renderAdminOverview();
                renderProducts();
            }
        });
    });
}

function openEditProductModal(id) {
    const prod = Store.getProductById(id);
    if (!prod) return;

    populateProductCategoryDropdown();

    document.getElementById('editProductId').value = prod.id;
    document.getElementById('productFormTitle').textContent = `تعديل المنتج: ${prod.name}`;
    document.getElementById('formProdName').value = prod.name;
    document.getElementById('formProdCategory').value = prod.category;
    document.getElementById('formProdPrice').value = prod.price;
    document.getElementById('formProdOldPrice').value = prod.oldPrice || '';
    document.getElementById('formProdStock').value = prod.stock;
    document.getElementById('formProdBadge').value = prod.badge || '';
    document.getElementById('formProdFeatured').value = prod.featured ? 'true' : 'false';
    document.getElementById('formProdImageUrl').value = prod.image;
    document.getElementById('formProdDescription').value = prod.description;

    const imgPreview = document.getElementById('formImgPreview');
    imgPreview.src = prod.image;
    imgPreview.style.display = 'block';

    document.getElementById('productFormModal').classList.add('open');
}

function populateProductCategoryDropdown() {
    const select = document.getElementById('formProdCategory');
    const filterSelect = document.getElementById('adminProductCategoryFilter');
    const categories = Store.getCategories();

    if (select) {
        select.innerHTML = categories.filter(c => c.id !== 'all').map(c => `
            <option value="${c.id}">${c.name}</option>
        `).join('');
    }

    if (filterSelect && filterSelect.options.length <= 1) {
        filterSelect.innerHTML = `<option value="all">جميع التصنيفات</option>` +
            categories.filter(c => c.id !== 'all').map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }
}

function renderAdminOrdersTable() {
    const tbody = document.getElementById('adminOrdersTableBody');
    if (!tbody) return;

    let orders = Store.getOrders();
    if (AppState.activeOrderFilter !== 'all') {
        orders = orders.filter(o => o.status === AppState.activeOrderFilter);
    }

    if (orders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:2rem; color:var(--text-muted);">لا توجد أي طلبات في هذه الحالة.</td></tr>`;
        return;
    }

    tbody.innerHTML = orders.map(ord => `
        <tr>
            <td><b>${ord.id}</b></td>
            <td>${new Date(ord.date).toLocaleDateString('ar-SA')}</td>
            <td>
                <div style="font-weight:700;">${ord.customer.name}</div>
                <div style="font-size:0.8rem; color:var(--text-muted);">${ord.customer.phone}</div>
            </td>
            <td>${ord.customer.city}</td>
            <td style="font-weight:800; color:var(--primary);">${formatMoney(ord.total)}</td>
            <td><span style="font-size:0.85rem;">${ord.paymentMethod}</span></td>
            <td>
                <select class="form-control select-order-status" data-id="${ord.id}" style="padding:0.25rem 0.5rem; font-size:0.85rem; width:130px;">
                    <option value="pending" ${ord.status === 'pending' ? 'selected' : ''}>قيد الانتظار</option>
                    <option value="processing" ${ord.status === 'processing' ? 'selected' : ''}>جارِ التجهيز</option>
                    <option value="shipped" ${ord.status === 'shipped' ? 'selected' : ''}>تم الشحن</option>
                    <option value="delivered" ${ord.status === 'delivered' ? 'selected' : ''}>تم التوصيل</option>
                    <option value="cancelled" ${ord.status === 'cancelled' ? 'selected' : ''}>ملغي</option>
                </select>
            </td>
            <td>
                <button class="btn-secondary btn-order-invoice" data-id="${ord.id}" style="padding:0.3rem 0.7rem; font-size:0.82rem; background:var(--bg-surface-soft);">
                    عرض وطباعة
                </button>
            </td>
        </tr>
    `).join('');

    tbody.querySelectorAll('.select-order-status').forEach(sel => {
        sel.addEventListener('change', (e) => {
            const id = sel.dataset.id;
            const newStatus = e.target.value;
            Store.updateOrderStatus(id, newStatus);
            showToast(`تم تحديث حالة الطلب ${id} إلى "${translateStatus(newStatus)}"`, 'success');
            renderAdminOverview();
        });
    });

    tbody.querySelectorAll('.btn-order-invoice').forEach(btn => {
        btn.addEventListener('click', () => openInvoiceModal(btn.dataset.id));
    });
}

function renderAdminCouponsTable() {
    const tbody = document.getElementById('adminCouponsTableBody');
    if (!tbody) return;

    const coupons = Store.getCoupons();
    if (coupons.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:1.5rem; color:var(--text-muted);">لا توجد كوبونات فعالة حالياً.</td></tr>`;
        return;
    }

    tbody.innerHTML = coupons.map(c => `
        <tr>
            <td><b style="letter-spacing:1px; color:var(--primary);">${c.code}</b></td>
            <td><span style="font-weight:700;">${c.discountPercent}%</span></td>
            <td>${c.minSpend} ر.س</td>
            <td><span class="status-badge delivered">${c.active ? 'نشط' : 'معطل'}</span></td>
            <td>
                <button class="btn-table-action delete btn-delete-coupon" data-code="${c.code}">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
            </td>
        </tr>
    `).join('');

    tbody.querySelectorAll('.btn-delete-coupon').forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.dataset.code;
            Store.deleteCoupon(code);
            showToast(`تم حذف الكوبون ${code}`, 'info');
            renderAdminCouponsTable();
        });
    });
}

function populateAdminSettingsForm() {
    const settings = Store.getSettings();
    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val !== undefined ? val : '';
    };

    setVal('settingStoreName', settings.storeName);
    setVal('settingCurrency', settings.currency);
    setVal('settingPhone', settings.phone);
    setVal('settingEmail', settings.email);
    setVal('settingTaxRate', settings.taxRate);
    setVal('settingShippingCost', settings.standardShippingCost);
    setVal('settingFreeShippingThreshold', settings.freeShippingThreshold);
}

// ==========================================
// 14. نافذة المفضلة (Wishlist Modal)
// ==========================================
function initWishlistModal() {
    const btnOpen = document.getElementById('btnWishlistOpen');
    const modal = document.getElementById('wishlistModal');
    const btnClose = document.getElementById('btnCloseWishlistModal');

    if (btnOpen) {
        btnOpen.addEventListener('click', () => {
            renderWishlistModal();
            modal.classList.add('open');
        });
    }

    if (btnClose) {
        btnClose.addEventListener('click', () => modal.classList.remove('open'));
    }

    window.addEventListener('wishlist-updated', () => {
        updateHeaderBadges();
        renderWishlistModal();
    });
}

function renderWishlistModal() {
    const container = document.getElementById('wishlistItemsContainer');
    if (!container) return;

    const wishlistIds = Store.getWishlist();
    const products = Store.getProducts().filter(p => wishlistIds.includes(p.id));

    if (products.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--text-light); margin-bottom: 0.75rem;"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                <h4 style="font-weight: 800; color: var(--text-main); margin-bottom: 0.25rem;">لا توجد عناصر في المفضلة</h4>
                <p style="font-size: 0.85rem;">اضغط على أيقونة القلب على أي منتج لحفظه هنا.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = products.map(p => `
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.75rem 1rem; background: var(--bg-surface-soft); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <img src="${p.image}" alt="${p.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: var(--radius-sm);">
                <div>
                    <div style="font-weight: 700; font-size: 0.9rem;">${p.name}</div>
                    <div style="font-weight: 800; color: var(--primary); font-size: 0.95rem;">${formatMoney(p.price)}</div>
                </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button class="btn-primary btn-wish-add-cart" data-id="${p.id}" style="padding: 0.4rem 0.9rem; font-size: 0.82rem;">
                    أضف للسلة
                </button>
                <button class="btn-table-action delete btn-wish-remove" data-id="${p.id}" title="إزالة">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
                </button>
            </div>
        </div>
    `).join('');

    container.querySelectorAll('.btn-wish-add-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            Store.addToCart(id, 1);
            showToast('تمت إضافة المنتج إلى السلة بنجاح!', 'success');
            openCartDrawer();
        });
    });

    container.querySelectorAll('.btn-wish-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            Store.toggleWishlist(id);
            showToast('تمت إزالة المنتج من المفضلة', 'info');
        });
    });
}

function updateHeaderBadges() {
    const cartBadge = document.getElementById('cartCountBadge');
    const wishBadge = document.getElementById('wishlistCountBadge');
    if (cartBadge) cartBadge.textContent = Store.getCartCount();
    if (wishBadge) wishBadge.textContent = Store.getWishlist().length;
}

// ==========================================
// 15. التشغيل الأولي للتطبيق (DOMContentLoaded)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initSearchAndFilters();
    renderCategoryChips();
    renderSidebarCategories();
    renderProducts();
    initCartDrawer();
    initCheckout();
    initOrderTracking();
    initAdminDashboard();
    initWishlistModal();
    updateHeaderBadges();

    // إغلاق مودال تفاصيل المنتج عند النقر على الإغلاق
    const btnCloseProductModal = document.getElementById('btnCloseProductModal');
    if (btnCloseProductModal) {
        btnCloseProductModal.addEventListener('click', () => {
            document.getElementById('productQuickModal').classList.remove('open');
        });
    }

    // إغلاق المودالات عند النقر على الخلفية
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                backdrop.classList.remove('open');
            }
        });
    });

    console.log('سوق النخبة جاهز للعمل 100% بدون خادم (Static LocalStorage Mode)');
});
