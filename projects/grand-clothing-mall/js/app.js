/**
 * Grand Clothing Mall - Core Application Logic
 * Supports pure static file:/// execution, hash routing, interactive modals, cart, filters, and checkout
 */

(function () {
  'use strict';

  // SVG Fallback Generator for Offline / Image Failure
  function getFallbackImageSvg(title, categoryName) {
    const initials = (title || 'أزياء').substring(0, 8);
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 450" width="100%" height="100%">
        <defs>
          <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1e293b"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>
        </defs>
        <rect width="400" height="450" fill="url(#g)"/>
        <circle cx="200" cy="180" r="70" fill="#d4af37" opacity="0.15"/>
        <path d="M160 180 L200 130 L240 180 L220 250 L180 250 Z" fill="none" stroke="#d4af37" stroke-width="4" stroke-linejoin="round"/>
        <path d="M185 145 L200 165 L215 145" fill="none" stroke="#fce79a" stroke-width="3"/>
        <text x="200" y="310" fill="#fce79a" font-family="Tajawal, sans-serif" font-size="20" font-weight="bold" text-anchor="middle">${initials}</text>
        <text x="200" y="340" fill="#94a3b8" font-family="Tajawal, sans-serif" font-size="14" text-anchor="middle">${categoryName || 'مول النخبة للأزياء'}</text>
      </svg>
    `;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  const App = {
    currentRoute: 'home',
    activeModal: null,

    init: function () {
      console.log('Initializing Grand Clothing Mall App...');
      
      this.bindEvents();
      this.handleRouting();
      this.updateHeaderCounters();

      // Subscribe to Store updates
      window.MallStore.subscribe((type, data) => {
        this.updateHeaderCounters();
        if (type === 'cart_updated') {
          this.renderCartDrawer();
          if (this.currentRoute === 'cart') this.renderCartPage();
        } else if (type === 'filters_changed') {
          if (this.currentRoute === 'catalog') this.renderCatalogPage();
        } else if (type === 'wishlist_updated') {
          this.updateWishlistButtons();
          if (this.currentRoute === 'wishlist') this.renderWishlistPage();
        }
      });
    },

    bindEvents: function () {
      // Hash change router
      window.addEventListener('hashchange', () => this.handleRouting());

      // Search input live autocomplete
      const searchInput = document.getElementById('mainSearchInput');
      const searchDropdown = document.getElementById('searchDropdown');
      
      if (searchInput && searchDropdown) {
        searchInput.addEventListener('input', (e) => {
          const query = e.target.value.trim().toLowerCase();
          if (query.length < 2) {
            searchDropdown.classList.remove('active');
            searchDropdown.innerHTML = '';
            return;
          }

          const allProducts = (window.MALL_DATA && window.MALL_DATA.products) || [];
          const matches = allProducts.filter(p => 
            p.title.toLowerCase().includes(query) ||
            p.factory.name.toLowerCase().includes(query) ||
            p.factory.country.toLowerCase().includes(query) ||
            p.fabric.toLowerCase().includes(query)
          ).slice(0, 6);

          if (matches.length > 0) {
            searchDropdown.innerHTML = matches.map(p => `
              <div class="search-result-item" onclick="App.openProductModal('${p.id}'); document.getElementById('searchDropdown').classList.remove('active');">
                <img src="${p.imageUrl}" alt="${p.title}" onerror="this.src='${getFallbackImageSvg(p.title, p.factory.country)}'">
                <div style="flex: 1;">
                  <div style="font-weight: 700; font-size: 0.9rem; color: var(--color-primary);">${p.title}</div>
                  <div style="font-size: 0.75rem; color: #854d0e;">${p.factory.name} (${p.factory.country})</div>
                </div>
                <div style="font-weight: 800; color: var(--color-primary); font-size: 0.95rem;">${p.price} <span style="font-size: 0.75rem;">ر.س</span></div>
              </div>
            `).join('');
            searchDropdown.classList.add('active');
          } else {
            searchDropdown.innerHTML = '<div style="padding: 16px; text-align: center; color: var(--color-text-muted); font-size: 0.85rem;">لا توجد ملابس مطابقة لبحثك</div>';
            searchDropdown.classList.add('active');
          }
        });

        // Search submit on enter
        searchInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            searchDropdown.classList.remove('active');
            window.MallStore.setFilter('search', query);
            window.location.hash = '#catalog';
          }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
          if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
            searchDropdown.classList.remove('active');
          }
        });
      }
    },

    handleRouting: function () {
      const hash = window.location.hash || '#home';
      const cleanHash = hash.replace('#', '');
      const parts = cleanHash.split('?');
      const route = parts[0] || 'home';
      
      const queryParams = new URLSearchParams(parts[1] || '');

      this.currentRoute = route;
      this.updateActiveNavLinks(route);

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      const contentContainer = document.getElementById('appContent');
      if (!contentContainer) return;

      if (route.startsWith('product/')) {
        const productId = route.replace('product/', '');
        this.renderSingleProductPage(productId);
      } else if (route === 'catalog') {
        const catParam = queryParams.get('cat');
        if (catParam) {
          window.MallStore.filters.category = catParam;
        }
        const countryParam = queryParams.get('country');
        if (countryParam) {
          window.MallStore.filters.country = countryParam;
        }
        this.renderCatalogPage();
      } else if (route === 'floors') {
        this.renderFloorsPage();
      } else if (route === 'cart') {
        this.renderCartPage();
      } else if (route === 'checkout') {
        this.renderCheckoutPage();
      } else if (route === 'wishlist') {
        this.renderWishlistPage();
      } else if (route === 'about') {
        this.renderAboutPage();
      } else {
        // Default Home
        this.renderHomePage();
      }
    },

    updateActiveNavLinks: function (route) {
      document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href') || '';
        if (href === '#' + route || (route === 'home' && href === '#home')) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    },

    updateHeaderCounters: function () {
      const cartCountEl = document.getElementById('headerCartCount');
      const wishlistCountEl = document.getElementById('headerWishlistCount');
      
      if (cartCountEl) {
        const c = window.MallStore.getCartCount();
        cartCountEl.textContent = c;
        cartCountEl.style.display = c > 0 ? 'flex' : 'none';
      }

      if (wishlistCountEl) {
        const w = window.MallStore.wishlist.length;
        wishlistCountEl.textContent = w;
        wishlistCountEl.style.display = w > 0 ? 'flex' : 'none';
      }
    },

    updateWishlistButtons: function () {
      document.querySelectorAll('.thumb-wishlist-btn').forEach(btn => {
        const id = btn.getAttribute('data-id');
        if (window.MallStore.isInWishlist(id)) {
          btn.classList.add('active');
          btn.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
          btn.classList.remove('active');
          btn.innerHTML = '<i class="far fa-heart"></i>';
        }
      });
    },

    // =========================================================================
    // VIEW RENDERERS
    // =========================================================================

    // 1. HOME PAGE
    renderHomePage: function () {
      const data = window.MALL_DATA;
      const appContent = document.getElementById('appContent');
      if (!data || !appContent) return;

      const featuredProducts = data.products.slice(0, 8);
      const flashDeals = data.products.filter(p => p.oldPrice && p.oldPrice > p.price).slice(0, 8);

      appContent.innerHTML = `
        <!-- Hero Section -->
        <section class="hero-section">
          <div class="container">
            <div class="hero-banner">
              <div class="hero-pattern"></div>
              <div class="hero-content">
                <div class="hero-badge">
                  <i class="fas fa-crown"></i>
                  <span>أكبر مجمع متخصص بالملابس في الشرق الأوسط</span>
                </div>
                <h1 class="hero-title">
                  عاصمة الأناقة العالمية <br>
                  <span class="gold-text">120 تشكيلة حصرية من أرقى مصانع العالم</span>
                </h1>
                <p class="hero-desc">
                  متجر وسوق متكامل مخصص حصرياً للملابس بكافة أنواعها: رجالية، نسائية، أطفال، مواليد، ملابس رياضية، بدلات سهرة، وأزياء شرقية تقليدية مع بيانات المصانع والمنشأ المعتمدة.
                </p>
                <div class="flex gap-4 flex-wrap">
                  <a href="#catalog" class="btn btn-gold btn-lg">
                    <i class="fas fa-shopping-bag"></i>
                    <span>تصفح الكتالوج الشامل (120 منتجاً)</span>
                  </a>
                  <a href="#floors" class="btn btn-outline" style="color: #ffffff; border-color: rgba(255,255,255,0.3);">
                    <i class="fas fa-map-marked-alt"></i>
                    <span>دليل طوابق ومتاجر المول</span>
                  </a>
                </div>
                <div class="hero-stats">
                  <div class="stat-item">
                    <h3>8</h3>
                    <p>أقسام ملابس رئيسية</p>
                  </div>
                  <div class="stat-item">
                    <h3>120+</h3>
                    <p>منتج مفصل مع بيانات المصنع</p>
                  </div>
                  <div class="stat-item">
                    <h3>13</h3>
                    <p>دولة مصنّعة بشهادات دولية</p>
                  </div>
                  <div class="stat-item">
                    <h3>4</h3>
                    <p>طوابق تسوق متخصصة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Categories Section -->
        <section class="container" style="margin-bottom: 50px;">
          <div class="section-header">
            <div class="section-title-wrap">
              <div class="section-subtitle">تنوع يشمل كل أفراد العائلة</div>
              <h2 class="section-title">أقسام أزياء المول (15 منتجاً لكل قسم)</h2>
              <p class="section-desc">اختر القسم لتصفح تشكيلة الملابس المتوفرة فورياً داخل المول مع بيانات منشأ كل قطعة.</p>
            </div>
            <a href="#catalog" class="btn btn-outline btn-sm">
              <span>عرض جميع الأقسام</span>
              <i class="fas fa-arrow-left"></i>
            </a>
          </div>

          <div class="categories-grid">
            ${data.categories.map(cat => `
              <div class="category-card" onclick="App.navigateToCategory('${cat.id}')">
                <div class="category-icon-box">
                  <i class="${cat.icon}"></i>
                </div>
                <div class="category-card-name">${cat.name}</div>
                <div class="category-card-desc">${cat.description}</div>
                <div class="category-card-footer">
                  <span>${cat.floor}</span>
                  <span class="badge badge-gold">${cat.badge}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Flash Deals & Best Sellers -->
        <section class="container" style="margin-bottom: 60px;">
          <div class="section-header">
            <div class="section-title-wrap">
              <div class="section-subtitle">توفير حصري بالمول</div>
              <h2 class="section-title">عروض وخصومات مميزة</h2>
              <p class="section-desc">قطع مختارة بأسعار مخفضة واردة من أشهر المصانع في إيطاليا، فرنسا، تركيا، واليابان.</p>
            </div>
            <a href="#catalog" class="btn btn-outline btn-sm">
              <span>مشاهدة كل العروض</span>
              <i class="fas fa-arrow-left"></i>
            </a>
          </div>

          <div class="product-grid">
            ${flashDeals.map(p => this.renderProductCardHtml(p)).join('')}
          </div>
        </section>

        <!-- Factory & Global Craftsmanship Banner -->
        <section class="container" style="margin-bottom: 60px;">
          <div class="factory-card" style="padding: 36px 32px; background: linear-gradient(135deg, #0b132b 0%, #1e293b 100%); color: #ffffff; border-color: var(--color-gold);">
            <div class="flex items-center justify-between flex-wrap gap-6">
              <div style="max-width: 650px;">
                <span class="badge badge-gold" style="margin-bottom: 12px;">شفافية المنشأ وجودة التصنيع</span>
                <h3 style="font-size: 1.8rem; font-weight: 800; color: #fce79a; margin-bottom: 12px;">
                  ملابسك صنعت بإتقان في أعرق مصانع النسيج العالمية
                </h3>
                <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.7;">
                  نحن في مول النخبة للأزياء نؤمن بحق العميل في معرفة أدق تفاصيل ملابسه: أين نُسجت، ما هو اسم المصنع، ما هي شهادات الجودة والبيئة الحاصل عليها (مثل OEKO-TEX و GOTS)، وما هي ألياف القماش المستخدمة بالضبط.
                </p>
              </div>
              <div class="flex flex-col gap-3">
                <a href="#catalog" class="btn btn-gold btn-lg">
                  <i class="fas fa-search"></i>
                  <span>تصفية الملابس حسب بلد ومصنع المنشأ</span>
                </a>
                <button onclick="App.openSizeGuideModal('general')" class="btn btn-outline" style="color: #ffffff; border-color: rgba(255,255,255,0.4);">
                  <i class="fas fa-ruler-combined"></i>
                  <span>دليل المقاسات الذكي التفاعلي</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- New Arrivals Showcase -->
        <section class="container" style="margin-bottom: 60px;">
          <div class="section-header">
            <div class="section-title-wrap">
              <div class="section-subtitle">وصل حديثاً لبوتيكات المول</div>
              <h2 class="section-title">أحدث صيحات الموضة والأزياء</h2>
              <p class="section-desc">مجموعات الموسم الجديد متوفرة في صالات عرض المول مع خدمة التوصيل الفوري.</p>
            </div>
            <a href="#catalog" class="btn btn-outline btn-sm">
              <span>الكتالوج الكامل</span>
              <i class="fas fa-arrow-left"></i>
            </a>
          </div>

          <div class="product-grid">
            ${featuredProducts.map(p => this.renderProductCardHtml(p)).join('')}
          </div>
        </section>

        <!-- Mall Services & Guarantee -->
        <section class="container" style="margin-bottom: 60px;">
          <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
            ${data.mallInfo.services.map(srv => `
              <div style="background: #ffffff; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 24px 20px; box-shadow: var(--shadow-sm);">
                <div style="width: 46px; height: 46px; border-radius: var(--radius-sm); background-color: var(--color-gold-light); color: #854d0e; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-bottom: 14px;">
                  <i class="${srv.icon}"></i>
                </div>
                <h4 style="font-weight: 800; font-size: 1.05rem; color: var(--color-primary); margin-bottom: 8px;">${srv.title}</h4>
                <p style="font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.6;">${srv.desc}</p>
              </div>
            `).join('')}
          </div>
        </section>
      `;

      this.updateWishlistButtons();
    },

    // 2. CATALOG PAGE
    renderCatalogPage: function () {
      const data = window.MALL_DATA;
      const appContent = document.getElementById('appContent');
      if (!data || !appContent) return;

      const filteredProducts = window.MallStore.getFilteredProducts();
      const activeFilters = window.MallStore.filters;

      appContent.innerHTML = `
        <div class="container" style="padding-top: 24px;">
          <!-- Breadcrumb & Header -->
          <div style="margin-bottom: 24px;">
            <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 6px;">
              <a href="#home">الرئيسية</a> / <span>الكتالوج والمتجر الشامل</span>
            </div>
            <h1 style="font-size: 1.9rem; font-weight: 900; color: var(--color-primary);">
              متجر سوق ملابس المول (${filteredProducts.length} منتجاً متاحاً)
            </h1>
            <p style="color: var(--color-text-muted); font-size: 0.95rem;">
              تصفح جميع تشكيلات الملابس مع إمكانية التصفية المتقدمة حسب بلد ومصنع الصنع، ونوع القماش، والأسعار.
            </p>
          </div>

          <div class="catalog-layout">
            <!-- Sidebar Filter -->
            <aside class="catalog-sidebar">
              <div class="flex items-center justify-between" style="margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid var(--color-border);">
                <div style="font-weight: 800; font-size: 1.05rem; color: var(--color-primary); display: flex; align-items: center; gap: 8px;">
                  <i class="fas fa-sliders-h" style="color: var(--color-gold);"></i>
                  <span>تصفية المنتجات</span>
                </div>
                <button onclick="window.MallStore.resetFilters()" class="btn-sm" style="color: var(--color-danger); font-weight: 700; font-size: 0.78rem;">
                  إعادة ضبط الكل
                </button>
              </div>

              <!-- Categories Filter -->
              <div class="filter-group">
                <div class="filter-title">
                  <span>أقسام الملابس</span>
                  <i class="fas fa-tshirt" style="color: var(--color-gold);"></i>
                </div>
                <div class="filter-list">
                  <label class="flex items-center gap-2" style="font-size: 0.88rem; cursor: pointer;">
                    <input type="radio" name="catFilter" value="all" ${activeFilters.category === 'all' ? 'checked' : ''} onchange="window.MallStore.setFilter('category', 'all')">
                    <span style="font-weight: ${activeFilters.category === 'all' ? '700' : '500'};">جميع الأقسام (120)</span>
                  </label>
                  ${data.categories.map(cat => `
                    <label class="flex items-center gap-2" style="font-size: 0.88rem; cursor: pointer;">
                      <input type="radio" name="catFilter" value="${cat.id}" ${activeFilters.category === cat.id ? 'checked' : ''} onchange="window.MallStore.setFilter('category', '${cat.id}')">
                      <span style="font-weight: ${activeFilters.category === cat.id ? '700' : '500'};">${cat.name} (15)</span>
                    </label>
                  `).join('')}
                </div>
              </div>

              <!-- Country of Origin Filter -->
              <div class="filter-group">
                <div class="filter-title">
                  <span>بلد المنشأ والمصنع</span>
                  <i class="fas fa-globe" style="color: var(--color-gold);"></i>
                </div>
                <div class="filter-chip-list">
                  <button class="chip-btn ${activeFilters.country === 'all' ? 'active' : ''}" onclick="window.MallStore.setFilter('country', 'all')">الكل</button>
                  ${data.filters.countries.map(country => `
                    <button class="chip-btn ${activeFilters.country === country ? 'active' : ''}" onclick="window.MallStore.setFilter('country', '${country}')">
                      ${country}
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- Price Filter -->
              <div class="filter-group">
                <div class="filter-title">
                  <span>نطاق السعر (ريال)</span>
                  <i class="fas fa-tag" style="color: var(--color-gold);"></i>
                </div>
                <div class="price-slider-wrap">
                  <input type="range" class="range-slider" min="90" max="3000" step="50" value="${activeFilters.maxPrice}" oninput="document.getElementById('priceVal').textContent = this.value; window.MallStore.setFilter('maxPrice', parseInt(this.value, 10))">
                  <div class="price-slider-inputs">
                    <span>90 ر.س</span>
                    <span>حتى <span id="priceVal">${activeFilters.maxPrice}</span> ر.س</span>
                  </div>
                </div>
              </div>

              <!-- Sizes Filter -->
              <div class="filter-group">
                <div class="filter-title">
                  <span>المقاس</span>
                  <i class="fas fa-ruler" style="color: var(--color-gold);"></i>
                </div>
                <div class="filter-chip-list">
                  <button class="filter-size-btn ${activeFilters.size === 'all' ? 'active' : ''}" onclick="window.MallStore.setFilter('size', 'all')">الكل</button>
                  <button class="filter-size-btn ${activeFilters.size === 'S' ? 'active' : ''}" onclick="window.MallStore.setFilter('size', 'S')">S</button>
                  <button class="filter-size-btn ${activeFilters.size === 'M' ? 'active' : ''}" onclick="window.MallStore.setFilter('size', 'M')">M</button>
                  <button class="filter-size-btn ${activeFilters.size === 'L' ? 'active' : ''}" onclick="window.MallStore.setFilter('size', 'L')">L</button>
                  <button class="filter-size-btn ${activeFilters.size === 'XL' ? 'active' : ''}" onclick="window.MallStore.setFilter('size', 'XL')">XL</button>
                  <button class="filter-size-btn ${activeFilters.size === 'XXL' ? 'active' : ''}" onclick="window.MallStore.setFilter('size', 'XXL')">XXL</button>
                </div>
              </div>
            </aside>

            <!-- Catalog Main Content -->
            <main class="catalog-main">
              <!-- Toolbar -->
              <div class="catalog-toolbar">
                <div class="flex items-center gap-3">
                  <span style="font-size: 0.9rem; color: var(--color-text-muted);">
                    عرض <strong>${filteredProducts.length}</strong> منتج
                  </span>
                  ${activeFilters.search ? `
                    <span class="badge badge-gold">
                      بحث: "${activeFilters.search}"
                      <i class="fas fa-times" style="cursor: pointer;" onclick="document.getElementById('mainSearchInput').value=''; window.MallStore.setFilter('search', '')"></i>
                    </span>
                  ` : ''}
                  ${activeFilters.country !== 'all' ? `
                    <span class="badge badge-gold">
                      المنشأ: ${activeFilters.country}
                      <i class="fas fa-times" style="cursor: pointer;" onclick="window.MallStore.setFilter('country', 'all')"></i>
                    </span>
                  ` : ''}
                </div>

                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2">
                    <label style="font-size: 0.85rem; font-weight: 600;">الترتيب حسب:</label>
                    <select class="sort-select" onchange="window.MallStore.setFilter('sortBy', this.value)">
                      <option value="featured" ${activeFilters.sortBy === 'featured' ? 'selected' : ''}>المميز والموصى به</option>
                      <option value="price-asc" ${activeFilters.sortBy === 'price-asc' ? 'selected' : ''}>السعر: من الأقل للأعلى</option>
                      <option value="price-desc" ${activeFilters.sortBy === 'price-desc' ? 'selected' : ''}>السعر: من الأعلى للأقل</option>
                      <option value="rating" ${activeFilters.sortBy === 'rating' ? 'selected' : ''}>الأعلى تقييماً</option>
                      <option value="newest" ${activeFilters.sortBy === 'newest' ? 'selected' : ''}>الأكثر طلباً</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Product Grid -->
              ${filteredProducts.length > 0 ? `
                <div class="product-grid">
                  ${filteredProducts.map(p => this.renderProductCardHtml(p)).join('')}
                </div>
              ` : `
                <div style="background: #ffffff; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 60px 20px; text-align: center;">
                  <div style="font-size: 3rem; color: #cbd5e1; margin-bottom: 16px;">
                    <i class="fas fa-search-minus"></i>
                  </div>
                  <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--color-primary); margin-bottom: 8px;">لم نجد أي ملابس تطابق خيارات التصفية</h3>
                  <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 20px;">
                    جرب توسيع نطاق السعر أو مسح فلاتر بلد المنشأ والمقاسات.
                  </p>
                  <button onclick="window.MallStore.resetFilters()" class="btn btn-gold">
                    <i class="fas fa-undo"></i>
                    <span>إعادة ضبط جميع الفلاتر</span>
                  </button>
                </div>
              `}
            </main>
          </div>
        </div>
      `;

      this.updateWishlistButtons();
    },

    // 3. PRODUCT CARD HTML HELPER
    renderProductCardHtml: function (product) {
      const isFav = window.MallStore.isInWishlist(product.id);
      const fallbackSvg = getFallbackImageSvg(product.title, product.factory.country);

      return `
        <div class="product-card" id="card-${product.id}">
          <div class="product-thumb">
            <img src="${product.imageUrl}" alt="${product.title}" loading="lazy" onerror="this.src='${fallbackSvg}'">
            
            <div class="thumb-badges">
              ${product.oldPrice ? `<span class="badge badge-sale">خصم ${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%</span>` : ''}
              ${product.badge ? `<span class="badge badge-gold">${product.badge}</span>` : ''}
            </div>

            <button class="thumb-wishlist-btn ${isFav ? 'active' : ''}" data-id="${product.id}" onclick="App.toggleWishlist('${product.id}')" title="أضف للمفضلة">
              <i class="${isFav ? 'fas fa-heart' : 'far fa-heart'}"></i>
            </button>

            <div class="thumb-actions">
              <button class="quick-view-btn" onclick="App.openProductModal('${product.id}')">
                <i class="fas fa-eye"></i>
                <span>نظرة سريعة وتفاصيل المصنع</span>
              </button>
            </div>
          </div>

          <div class="product-body">
            <div class="product-origin-tag">
              <i class="fas fa-industry"></i>
              <span>${product.factory.name} • ${product.factory.country}</span>
            </div>

            <h3 class="product-title" onclick="App.openProductModal('${product.id}')" title="${product.title}">
              ${product.title}
            </h3>

            <div class="product-fabric-hint" title="${product.fabric}">
              <i class="fas fa-feather" style="color: var(--color-gold);"></i>
              <span>${product.fabric}</span>
            </div>

            <div class="product-mall-store">
              <i class="fas fa-map-marker-alt" style="color: var(--color-danger);"></i>
              <span>${product.mallStore.storeName} (${product.mallStore.floor})</span>
            </div>

            <div class="product-rating">
              <i class="fas fa-star"></i>
              <span style="font-weight: 700; color: var(--color-primary);">${product.rating}</span>
              <span class="count">(${product.reviewsCount} تقييم)</span>
            </div>

            <div class="product-footer">
              <div class="product-prices">
                <div>
                  <span class="price-val">${product.price}</span>
                  <span class="price-currency">ر.س</span>
                  ${product.oldPrice ? `<span class="old-price">${product.oldPrice} ر.س</span>` : ''}
                </div>
              </div>

              <button class="btn-add-cart-mini" onclick="App.quickAddToCart('${product.id}')" title="أضف إلى السلة">
                <i class="fas fa-cart-plus"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    },

    // 4. DEDICATED PRODUCT DETAILS PAGE
    renderSingleProductPage: function (productId) {
      const all = (window.MALL_DATA && window.MALL_DATA.products) || [];
      const product = all.find(p => p.id === productId);
      const appContent = document.getElementById('appContent');

      if (!product || !appContent) {
        window.location.hash = '#catalog';
        return;
      }

      const isFav = window.MallStore.isInWishlist(product.id);
      const fallbackSvg = getFallbackImageSvg(product.title, product.factory.country);
      const related = all.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

      appContent.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px;">
          <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 20px;">
            <a href="#home">الرئيسية</a> / 
            <a href="#catalog?cat=${product.category}">${product.category}</a> / 
            <span>${product.title}</span>
          </div>

          <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 36px; background: #ffffff; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 32px; box-shadow: var(--shadow-sm); margin-bottom: 48px;">
            <!-- Gallery / Image View -->
            <div style="position: relative;">
              <div style="width: 100%; border-radius: var(--radius-md); overflow: hidden; background: #f8fafc; border: 1px solid var(--color-border);">
                <img id="detailMainImg" src="${product.imageUrl}" alt="${product.title}" style="width: 100%; height: 480px; object-fit: cover;" onerror="this.src='${fallbackSvg}'">
              </div>
              <div class="flex gap-2" style="margin-top: 12px;">
                <button onclick="document.getElementById('detailMainImg').src='${product.imageUrl}'" style="width: 70px; height: 70px; border-radius: var(--radius-sm); border: 2px solid var(--color-gold); overflow: hidden; padding: 0;">
                  <img src="${product.imageUrl}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='${fallbackSvg}'">
                </button>
              </div>
            </div>

            <!-- Product Specs & Actions -->
            <div class="flex flex-col gap-4">
              <div class="flex items-center justify-between">
                <span class="badge badge-gold">${product.badge || 'أزياء فاخرة'}</span>
                <span style="color: var(--color-success); font-weight: 700; font-size: 0.85rem;">
                  <i class="fas fa-check-circle"></i> ${product.stock}
                </span>
              </div>

              <h1 style="font-size: 1.6rem; font-weight: 900; color: var(--color-primary); line-height: 1.3;">
                ${product.title}
              </h1>

              <div class="flex items-center gap-3">
                <div class="product-rating" style="font-size: 0.95rem;">
                  <i class="fas fa-star"></i>
                  <span style="font-weight: 800; color: var(--color-primary);">${product.rating}</span>
                  <span class="count">(${product.reviewsCount} تقييم حقيقي)</span>
                </div>
                <span style="color: var(--color-border);">|</span>
                <span style="font-size: 0.85rem; color: var(--color-text-muted);">
                  رمز التخزين (SKU): <strong>${product.id.toUpperCase()}</strong>
                </span>
              </div>

              <!-- Price Box -->
              <div style="background-color: var(--color-surface-soft); padding: 14px 18px; border-radius: var(--radius-md); display: flex; align-items: baseline; gap: 10px;">
                <span style="font-size: 1.9rem; font-weight: 900; color: var(--color-primary);">${product.price}</span>
                <span class="price-currency" style="font-size: 1rem;">ريال سعودي</span>
                ${product.oldPrice ? `
                  <span class="old-price" style="font-size: 1.1rem;">${product.oldPrice} ر.س</span>
                  <span class="badge badge-sale">وفرت ${product.oldPrice - product.price} ر.س</span>
                ` : ''}
              </div>

              <!-- Fabric & Description -->
              <div>
                <h4 style="font-size: 0.9rem; font-weight: 800; margin-bottom: 4px;">نوع القماش والخامات:</h4>
                <p style="font-size: 0.92rem; color: #1e293b; font-weight: 600;">${product.fabric}</p>
              </div>

              <p style="color: var(--color-text-muted); font-size: 0.92rem; line-height: 1.7;">
                ${product.description}
              </p>

              <!-- Size Selector -->
              <div>
                <div class="flex justify-between items-center" style="margin-bottom: 8px;">
                  <label style="font-size: 0.88rem; font-weight: 800;">اختر المقاس:</label>
                  <button onclick="App.openSizeGuideModal('${product.category}')" style="font-size: 0.82rem; color: var(--color-gold-hover); font-weight: 700; text-decoration: underline;">
                    <i class="fas fa-ruler-combined"></i> جدول المقاسات
                  </button>
                </div>
                <div class="filter-chip-list" id="detailSizesWrap">
                  ${product.sizes.map((s, idx) => `
                    <button class="filter-size-btn ${idx === 0 ? 'active' : ''}" onclick="App.selectDetailSize(this, '${s}')">
                      ${s}
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- Color Selector -->
              <div>
                <label style="font-size: 0.88rem; font-weight: 800; display: block; margin-bottom: 8px;">اللون المتاح:</label>
                <div class="flex gap-2 flex-wrap" id="detailColorsWrap">
                  ${product.colors.map((c, idx) => `
                    <div class="chip-btn ${idx === 0 ? 'active' : ''}" onclick="App.selectDetailColor(this, '${c.name}')" style="display: flex; align-items: center; gap: 6px;">
                      <span style="width: 14px; height: 14px; border-radius: 50%; background-color: ${c.hex}; border: 1px solid #ccc; display: inline-block;"></span>
                      <span>${c.name}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Quantity & Purchase Actions -->
              <div class="flex items-center gap-4 flex-wrap" style="margin-top: 10px;">
                <div class="cart-qty-control" style="padding: 4px;">
                  <button class="cart-qty-btn" onclick="App.stepQty(-1)">-</button>
                  <input type="text" id="detailQtyInput" class="cart-qty-val" value="1" readonly>
                  <button class="cart-qty-btn" onclick="App.stepQty(1)">+</button>
                </div>

                <button class="btn btn-primary btn-lg" style="flex: 1;" onclick="App.addCurrentDetailToCart('${product.id}')">
                  <i class="fas fa-cart-plus"></i>
                  <span>إضافة إلى سلة التسوق</span>
                </button>

                <button class="action-btn" onclick="App.toggleWishlist('${product.id}')" title="أضف للمفضلة">
                  <i class="${isFav ? 'fas fa-heart' : 'far fa-heart'}" style="color: ${isFav ? 'var(--color-danger)' : 'inherit'};"></i>
                </button>
              </div>

              <!-- Mall Location Box -->
              <div style="background-color: var(--color-gold-light); border: 1px solid rgba(197, 155, 39, 0.3); border-radius: var(--radius-md); padding: 12px 16px; font-size: 0.88rem;">
                <div style="font-weight: 800; color: #854d0e; margin-bottom: 2px;">
                  <i class="fas fa-store-alt"></i> مكان توافر القطعة داخل المول:
                </div>
                <div style="color: #451a03;">
                  متوفرة في: <strong>${product.mallStore.storeName}</strong> • ${product.mallStore.floor} (${product.mallStore.shopNumber})
                  <br>
                  هاتف المحل: <span dir="ltr">${product.mallStore.phone}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- FULL FACTORY & ORIGIN CARD -->
          <div class="factory-card" style="margin-bottom: 48px;">
            <div class="factory-card-header">
              <div>
                <span class="badge badge-gold" style="margin-bottom: 4px;">بيانات المصنع والمنشأ المعتمد</span>
                <h3 class="factory-name">${product.factory.name}</h3>
              </div>
              <div class="factory-origin-badge">
                <i class="fas fa-map-marker-alt" style="color: var(--color-danger);"></i>
                <span>${product.factory.city}، ${product.factory.country}</span>
              </div>
            </div>

            <div class="factory-grid-specs">
              <div class="factory-spec-item">
                <span class="label">تاريخ تأسيس المصنع:</span>
                <span class="val">${product.factory.established} م (أكثر من ${2026 - product.factory.established} عاماً من الخبرة)</span>
              </div>
              <div class="factory-spec-item">
                <span class="label">شهادات الجودة والمطابقة:</span>
                <span class="val">${product.factory.certifications}</span>
              </div>
              <div class="factory-spec-item" style="grid-column: span 2;">
                <span class="label">معايير التصنيع والحرفية:</span>
                <span class="val">${product.factory.productionStandards}</span>
              </div>
              <div class="factory-spec-item" style="grid-column: span 2;">
                <span class="label">إرشادات الغسيل والعناية:</span>
                <span class="val" style="color: var(--color-text-muted);">${product.care}</span>
              </div>
            </div>
          </div>

          <!-- Related Products Carousel -->
          <div>
            <h3 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 20px;">قطع أخرى من نفس القسم قد تنال إعجابك:</h3>
            <div class="product-grid">
              ${related.map(p => this.renderProductCardHtml(p)).join('')}
            </div>
          </div>
        </div>
      `;

      this.updateWishlistButtons();
    },

    // 5. MALL FLOOR DIRECTORY VIEW
    renderFloorsPage: function () {
      const data = window.MALL_DATA;
      const appContent = document.getElementById('appContent');
      if (!data || !appContent) return;

      const floors = data.floors;

      appContent.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px;">
          <div style="margin-bottom: 24px;">
            <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 6px;">
              <a href="#home">الرئيسية</a> / <span>دليل طوابق ومتاجر المول</span>
            </div>
            <h1 style="font-size: 1.9rem; font-weight: 900; color: var(--color-primary);">
              خريطة ودليل طوابق مول النخبة للأزياء
            </h1>
            <p style="color: var(--color-text-muted); font-size: 0.95rem;">
              استكشف طوابق المول الأربعة المتخصصة، وتعرف على البوتيكات ومواقعها وخدمات كل طابق لتجربة تسوق راقية وسلسة.
            </p>
          </div>

          <div class="floors-container">
            <div class="floor-tab-buttons">
              ${floors.map((fl, idx) => `
                <button class="floor-tab-btn ${idx === 0 ? 'active' : ''}" onclick="App.switchFloorView(this, 'floor-card-${fl.id}')">
                  <i class="fas fa-layer-group"></i>
                  <span>${fl.name}</span>
                </button>
              `).join('')}
            </div>

            ${floors.map((fl, idx) => `
              <div class="floor-view-card" id="floor-card-${fl.id}" style="${idx !== 0 ? 'display: none;' : ''}">
                <div class="flex items-center justify-between flex-wrap gap-4" style="border-bottom: 1px solid var(--color-border); padding-bottom: 16px;">
                  <div>
                    <span class="badge badge-gold" style="margin-bottom: 6px;">${fl.theme}</span>
                    <h2 style="font-size: 1.5rem; font-weight: 900; color: var(--color-primary);">${fl.name}</h2>
                    <p style="color: var(--color-text-muted); font-size: 0.92rem; margin-top: 4px;">${fl.description}</p>
                  </div>
                  <div style="background: var(--color-surface-soft); padding: 10px 16px; border-radius: var(--radius-md); font-weight: 700; font-size: 0.9rem;">
                    <i class="fas fa-store" style="color: var(--color-gold);"></i>
                    <span>${fl.storesCount} متجر متخصص</span>
                  </div>
                </div>

                <div style="margin-top: 18px;">
                  <h4 style="font-weight: 800; font-size: 0.95rem; margin-bottom: 8px; color: var(--color-primary);">الخدمات والمرافق المتاحة في هذا الطابق:</h4>
                  <div class="flex gap-2 flex-wrap">
                    ${fl.amenities.map(a => `
                      <span class="badge badge-outline">
                        <i class="fas fa-check" style="color: var(--color-gold);"></i> ${a}
                      </span>
                    `).join('')}
                  </div>
                </div>

                <h3 style="font-size: 1.15rem; font-weight: 800; margin-top: 24px; color: var(--color-primary);">متاجر وبوتيكات الطابق:</h3>
                <div class="floor-stores-grid">
                  ${fl.stores.map(st => `
                    <div class="store-card">
                      <div class="store-header">
                        <div class="store-name">${st.name}</div>
                        <div class="store-number">${st.shopNo}</div>
                      </div>
                      <div class="store-category">${st.category}</div>
                      <div style="font-size: 0.78rem; color: var(--color-text-muted); margin-top: 6px; display: flex; align-items: center; gap: 4px;">
                        <i class="fas fa-phone-alt"></i>
                        <span dir="ltr">${st.contact}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    },

    // 6. CART VIEW (FULL PAGE)
    renderCartPage: function () {
      const cart = window.MallStore.cart;
      const totals = window.MallStore.getCartTotals();
      const appContent = document.getElementById('appContent');
      if (!appContent) return;

      if (cart.length === 0) {
        appContent.innerHTML = `
          <div class="container" style="padding: 80px 20px; text-align: center;">
            <div style="font-size: 3.5rem; color: #cbd5e1; margin-bottom: 16px;">
              <i class="fas fa-shopping-bag"></i>
            </div>
            <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--color-primary); margin-bottom: 8px;">سلة التسوق فارغة حالياً</h2>
            <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 24px;">لم تقم بإضافة أي ملابس بعد. تصفح أقسام المول وأضف ما يعجبك.</p>
            <a href="#catalog" class="btn btn-gold btn-lg">
              <i class="fas fa-shopping-bag"></i>
              <span>ابدأ التسوق الآن</span>
            </a>
          </div>
        `;
        return;
      }

      appContent.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px;">
          <h1 style="font-size: 1.9rem; font-weight: 900; color: var(--color-primary); margin-bottom: 24px;">
            سلة المشتريات (${totals.itemsCount} قطع)
          </h1>

          <div class="grid" style="grid-template-columns: 2fr 1fr; gap: 32px; align-items: flex-start;">
            <!-- Cart Items Table/List -->
            <div style="background: #ffffff; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 24px; box-shadow: var(--shadow-sm);">
              ${cart.map(item => `
                <div class="cart-item-row" id="cart-item-${item.itemId}">
                  <img src="${item.product.imageUrl}" class="cart-item-thumb" alt="${item.product.title}" onerror="this.src='${getFallbackImageSvg(item.product.title, item.product.factory.country)}'">
                  <div class="cart-item-details">
                    <div class="flex justify-between items-start">
                      <a href="#product/${item.product.id}" class="cart-item-title">${item.product.title}</a>
                      <button onclick="window.MallStore.removeFromCart('${item.itemId}')" style="color: var(--color-danger); font-size: 0.9rem;" title="حذف">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </div>
                    <div class="cart-item-meta">المقاس: <strong>${item.size}</strong> | اللون: <strong>${item.color}</strong></div>
                    <div class="cart-item-meta" style="color: #854d0e;">المصنع: ${item.product.factory.name} (${item.product.factory.country})</div>
                    <div class="flex justify-between items-center" style="margin-top: 6px;">
                      <div class="cart-qty-control">
                        <button class="cart-qty-btn" onclick="window.MallStore.updateCartQuantity('${item.itemId}', ${item.quantity - 1})">-</button>
                        <span class="cart-qty-val">${item.quantity}</span>
                        <button class="cart-qty-btn" onclick="window.MallStore.updateCartQuantity('${item.itemId}', ${item.quantity + 1})">+</button>
                      </div>
                      <div style="font-weight: 800; font-size: 1.1rem; color: var(--color-primary);">
                        ${item.price * item.quantity} <span style="font-size: 0.8rem;">ر.س</span>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}

              <div class="flex justify-between items-center" style="padding-top: 16px;">
                <a href="#catalog" style="font-weight: 700; font-size: 0.88rem; color: var(--color-gold-hover);">
                  <i class="fas fa-arrow-right"></i> مواصلة التسوق في المول
                </a>
                <button onclick="window.MallStore.clearCart()" style="color: var(--color-danger); font-size: 0.85rem; font-weight: 600;">
                  تفريغ السلة
                </button>
              </div>
            </div>

            <!-- Order Summary Sidebar -->
            <div style="background: #ffffff; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 24px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 16px;">
              <h3 style="font-size: 1.2rem; font-weight: 800; border-bottom: 1px solid var(--color-border); padding-bottom: 12px;">ملخص الطلب</h3>

              <!-- Coupon Code Box -->
              <div>
                <label style="font-size: 0.82rem; font-weight: 700; margin-bottom: 4px; display: block;">كوبون الخصم:</label>
                <div class="flex gap-2">
                  <input type="text" id="cartCouponInput" placeholder="ادخل الكوبون (MALL10)" style="flex: 1; border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 8px 12px; font-size: 0.85rem;" value="${window.MallStore.coupon ? window.MallStore.coupon.code : ''}">
                  <button class="btn btn-primary btn-sm" onclick="App.applyCartCoupon()">تطبيق</button>
                </div>
                ${window.MallStore.coupon ? `
                  <div style="font-size: 0.78rem; color: var(--color-success); font-weight: 700; margin-top: 4px; display: flex; justify-content: space-between;">
                    <span>✓ ${window.MallStore.coupon.label}</span>
                    <span style="cursor: pointer; color: var(--color-danger);" onclick="window.MallStore.removeCoupon()">إلغاء</span>
                  </div>
                ` : ''}
              </div>

              <!-- Delivery Choice -->
              <div>
                <label style="font-size: 0.82rem; font-weight: 700; margin-bottom: 6px; display: block;">طريقة الاستلام:</label>
                <div class="flex flex-col gap-2">
                  <label class="flex items-center gap-2" style="font-size: 0.85rem; cursor: pointer;">
                    <input type="radio" name="pageDeliveryMethod" value="pickup" ${window.MallStore.deliveryMethod === 'pickup' ? 'checked' : ''} onchange="window.MallStore.setDeliveryMethod('pickup')">
                    <span>استلام مباشر من متجر المول (مجاناً)</span>
                  </label>
                  <label class="flex items-center gap-2" style="font-size: 0.85rem; cursor: pointer;">
                    <input type="radio" name="pageDeliveryMethod" value="delivery" ${window.MallStore.deliveryMethod === 'delivery' ? 'checked' : ''} onchange="window.MallStore.setDeliveryMethod('delivery')">
                    <span>توصيل لباب المنزل (${totals.subtotal >= 500 ? 'مجاني للطلبات فوق 500 ريال' : '35 ريال'})</span>
                  </label>
                </div>
              </div>

              <!-- Calculation Rows -->
              <div style="border-top: 1px solid var(--color-border); padding-top: 14px; display: flex; flex-direction: column; gap: 8px; font-size: 0.9rem;">
                <div class="flex justify-between">
                  <span class="text-muted">المجموع الفرعي:</span>
                  <span class="font-bold">${totals.subtotal} ر.س</span>
                </div>
                ${totals.discount > 0 ? `
                  <div class="flex justify-between" style="color: var(--color-danger);">
                    <span>الخصم:</span>
                    <span class="font-bold">-${totals.discount} ر.س</span>
                  </div>
                ` : ''}
                <div class="flex justify-between">
                  <span class="text-muted">ضريبة القيمة المضافة (15%):</span>
                  <span class="font-bold">${totals.vat} ر.س</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted">الشحن والتوصيل:</span>
                  <span class="font-bold">${totals.shipping === 0 ? 'مجاني' : totals.shipping + ' ر.س'}</span>
                </div>
                <div class="flex justify-between" style="font-size: 1.25rem; font-weight: 900; color: var(--color-primary); border-top: 2px solid var(--color-primary); padding-top: 10px;">
                  <span>الإجمالي النهائي:</span>
                  <span>${totals.total} ر.س</span>
                </div>
              </div>

              <a href="#checkout" class="btn btn-gold btn-lg" style="width: 100%;">
                <i class="fas fa-lock"></i>
                <span>متابعة الشراء وإتمام الطلب</span>
              </a>
            </div>
          </div>
        </div>
      `;
    },

    // 7. CHECKOUT FLOW & PAYMENT
    renderCheckoutPage: function () {
      const cart = window.MallStore.cart;
      const totals = window.MallStore.getCartTotals();
      const appContent = document.getElementById('appContent');
      if (!appContent) return;

      if (cart.length === 0) {
        window.location.hash = '#cart';
        return;
      }

      appContent.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px;">
          <h1 style="font-size: 1.9rem; font-weight: 900; color: var(--color-primary); margin-bottom: 24px;">
            إتمام الطلب والدفع الآمن
          </h1>

          <div class="grid" style="grid-template-columns: 2fr 1fr; gap: 32px; align-items: flex-start;">
            <!-- Checkout Form -->
            <div style="background: #ffffff; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 28px; box-shadow: var(--shadow-sm);">
              <form id="checkoutForm" onsubmit="App.handleCheckoutSubmit(event)">
                <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 16px; color: var(--color-primary);">
                  1. بيانات العميل والتواصل
                </h3>
                <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px;">
                  <div>
                    <label style="font-size: 0.85rem; font-weight: 700; margin-bottom: 4px; display: block;">الاسم الكامل *</label>
                    <input type="text" id="custName" required placeholder="مثال: عبد الله السعيد" style="width: 100%; border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 10px 14px;">
                  </div>
                  <div>
                    <label style="font-size: 0.85rem; font-weight: 700; margin-bottom: 4px; display: block;">رقم الجوال *</label>
                    <input type="tel" id="custPhone" required placeholder="0501234567" style="width: 100%; border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 10px 14px;">
                  </div>
                  <div style="grid-column: span 2;">
                    <label style="font-size: 0.85rem; font-weight: 700; margin-bottom: 4px; display: block;">البريد الإلكتروني (لاستلام الفاتورة)</label>
                    <input type="email" id="custEmail" placeholder="customer@domain.com" style="width: 100%; border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 10px 14px;">
                  </div>
                </div>

                <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 16px; color: var(--color-primary);">
                  2. عنوان الاستلام أو التوصيل
                </h3>
                <div class="flex gap-4" style="margin-bottom: 16px;">
                  <label class="flex items-center gap-2" style="font-weight: 700; font-size: 0.9rem; cursor: pointer;">
                    <input type="radio" name="checkoutDelivery" value="pickup" ${window.MallStore.deliveryMethod === 'pickup' ? 'checked' : ''} onchange="App.toggleCheckoutAddress(false)">
                    <span>استلام فوري من بوتيك المول</span>
                  </label>
                  <label class="flex items-center gap-2" style="font-weight: 700; font-size: 0.9rem; cursor: pointer;">
                    <input type="radio" name="checkoutDelivery" value="delivery" ${window.MallStore.deliveryMethod === 'delivery' ? 'checked' : ''} onchange="App.toggleCheckoutAddress(true)">
                    <span>توصيل لباب منزلي</span>
                  </label>
                </div>

                <div id="checkoutAddressFields" style="${window.MallStore.deliveryMethod === 'pickup' ? 'display: none;' : ''} margin-bottom: 24px;">
                  <div class="grid" style="grid-template-columns: 1fr 2fr; gap: 14px;">
                    <div>
                      <label style="font-size: 0.85rem; font-weight: 700; margin-bottom: 4px; display: block;">المدينة</label>
                      <select id="custCity" style="width: 100%; border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 10px 14px; background: #ffffff;">
                        <option value="الرياض">الرياض</option>
                        <option value="جدة">جدة</option>
                        <option value="الدمام">الدمام</option>
                        <option value="مكة المكرمة">مكة المكرمة</option>
                        <option value="المدينة المنورة">المدينة المنورة</option>
                      </select>
                    </div>
                    <div>
                      <label style="font-size: 0.85rem; font-weight: 700; margin-bottom: 4px; display: block;">الحي والشارع ورقم المبنى</label>
                      <input type="text" id="custAddress" placeholder="حي النرجس، شارع الأمير فيصل، مبنى 24" style="width: 100%; border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 10px 14px;">
                    </div>
                  </div>
                </div>

                <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 16px; color: var(--color-primary);">
                  3. وسيلة الدفع المحاكاة
                </h3>
                <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; margin-bottom: 24px;">
                  <label class="payment-method-label" style="border: 2px solid var(--color-gold); border-radius: var(--radius-md); padding: 12px; text-align: center; cursor: pointer; display: block;">
                    <input type="radio" name="paymentMethod" value="mada" checked style="display: none;">
                    <div style="font-weight: 800; font-size: 0.95rem; color: var(--color-primary);">مدى (Mada)</div>
                    <div style="font-size: 0.72rem; color: var(--color-text-muted);">بطاقات الصراف السعودية</div>
                  </label>
                  <label class="payment-method-label" style="border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 12px; text-align: center; cursor: pointer; display: block;">
                    <input type="radio" name="paymentMethod" value="applepay" style="display: none;">
                    <div style="font-weight: 800; font-size: 0.95rem; color: var(--color-primary);">Apple Pay</div>
                    <div style="font-size: 0.72rem; color: var(--color-text-muted);">دفع فوري بلمسة واحدة</div>
                  </label>
                  <label class="payment-method-label" style="border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 12px; text-align: center; cursor: pointer; display: block;">
                    <input type="radio" name="paymentMethod" value="visa" style="display: none;">
                    <div style="font-weight: 800; font-size: 0.95rem; color: var(--color-primary);">فيزا / ماستر</div>
                    <div style="font-size: 0.72rem; color: var(--color-text-muted);">البطاقات الائتمانية</div>
                  </label>
                  <label class="payment-method-label" style="border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 12px; text-align: center; cursor: pointer; display: block;">
                    <input type="radio" name="paymentMethod" value="cod" style="display: none;">
                    <div style="font-weight: 800; font-size: 0.95rem; color: var(--color-primary);">الدفع عند الاستلام</div>
                    <div style="font-size: 0.72rem; color: var(--color-text-muted);">نقداً أو شبكة بالفرع</div>
                  </label>
                </div>

                <button type="submit" class="btn btn-gold btn-lg" style="width: 100%;">
                  <i class="fas fa-check-circle"></i>
                  <span>تأكيد الطلب وإصدار الفاتورة الرسمية</span>
                </button>
              </form>
            </div>

            <!-- Mini Cart Review -->
            <div style="background: #ffffff; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 24px; box-shadow: var(--shadow-sm);">
              <h3 style="font-size: 1.15rem; font-weight: 800; border-bottom: 1px solid var(--color-border); padding-bottom: 12px; margin-bottom: 16px;">
                المنتجات المطلوبة (${cart.length})
              </h3>
              <div style="max-height: 280px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">
                ${cart.map(item => `
                  <div class="flex justify-between items-center" style="font-size: 0.85rem; border-bottom: 1px dashed var(--color-border); padding-bottom: 8px;">
                    <div>
                      <div style="font-weight: 700; color: var(--color-primary);">${item.product.title}</div>
                      <div style="font-size: 0.75rem; color: var(--color-text-muted);">المقاس: ${item.size} • الكمية: ${item.quantity}</div>
                    </div>
                    <div style="font-weight: 800;">${item.price * item.quantity} ر.س</div>
                  </div>
                `).join('')}
              </div>

              <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.9rem; border-top: 1px solid var(--color-border); padding-top: 12px;">
                <div class="flex justify-between">
                  <span>المجموع:</span>
                  <span class="font-bold">${totals.subtotal} ر.س</span>
                </div>
                ${totals.discount > 0 ? `
                  <div class="flex justify-between" style="color: var(--color-danger);">
                    <span>الخصم:</span>
                    <span class="font-bold">-${totals.discount} ر.س</span>
                  </div>
                ` : ''}
                <div class="flex justify-between">
                  <span>الضريبة (15%):</span>
                  <span class="font-bold">${totals.vat} ر.س</span>
                </div>
                <div class="flex justify-between" style="font-size: 1.2rem; font-weight: 900; color: var(--color-primary); border-top: 2px solid var(--color-primary); padding-top: 8px;">
                  <span>الإجمالي المطلوب:</span>
                  <span>${totals.total} ر.س</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    // 8. ORDER INVOICE VIEW
    renderInvoicePage: function (order) {
      order = order || window.MallStore.lastOrder;
      const appContent = document.getElementById('appContent');
      if (!order || !appContent) {
        window.location.hash = '#catalog';
        return;
      }

      appContent.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px;">
          <div class="no-print flex justify-between items-center" style="margin-bottom: 20px;">
            <a href="#home" class="btn btn-outline btn-sm">
              <i class="fas fa-home"></i> العودة للرئيسية
            </a>
            <div class="flex gap-2">
              <button onclick="window.print()" class="btn btn-gold btn-sm">
                <i class="fas fa-print"></i> طباعة الفاتورة الرسمية
              </button>
            </div>
          </div>

          <div class="printable-area invoice-box">
            <!-- Header -->
            <div class="invoice-header">
              <div>
                <div style="font-size: 1.4rem; font-weight: 900; color: var(--color-primary);">
                  ${window.MALL_DATA.mallInfo.name}
                </div>
                <div style="font-size: 0.82rem; color: var(--color-gold); font-weight: 700;">
                  ${window.MALL_DATA.mallInfo.slogan}
                </div>
                <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: 4px;">
                  ${window.MALL_DATA.mallInfo.address} • الرقم الضريبي: 310245890200003
                </div>
              </div>

              <div class="qr-code-mock">
                <i class="fas fa-qrcode" style="font-size: 2.2rem; color: var(--color-primary);"></i>
                <span>فاتورة ضريبية مبسطة معتمدة</span>
              </div>
            </div>

            <!-- Order Metadata -->
            <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin: 20px 0; background: var(--color-surface-soft); padding: 14px 18px; border-radius: var(--radius-sm);">
              <div>
                <span class="text-muted" style="font-size: 0.8rem; display: block;">رقم الفاتورة:</span>
                <span style="font-weight: 800; color: var(--color-primary); font-size: 1.05rem;">${order.orderNumber}</span>
              </div>
              <div>
                <span class="text-muted" style="font-size: 0.8rem; display: block;">تاريخ ووقت الإصدار:</span>
                <span style="font-weight: 700;">${new Date(order.createdAt).toLocaleString('ar-SA')}</span>
              </div>
              <div>
                <span class="text-muted" style="font-size: 0.8rem; display: block;">العميل:</span>
                <span style="font-weight: 700;">${order.customer.name} (${order.customer.phone})</span>
              </div>
              <div>
                <span class="text-muted" style="font-size: 0.8rem; display: block;">طريقة الاستلام:</span>
                <span style="font-weight: 700;">${order.deliveryMethod === 'pickup' ? 'استلام من متجر المول' : 'توصيل لباب المنزل'}</span>
              </div>
            </div>

            <!-- Table of Items -->
            <table class="invoice-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>بيان الملابس</th>
                  <th>المصنع والمنشأ</th>
                  <th>المقاس / اللون</th>
                  <th>السعر</th>
                  <th>الكمية</th>
                  <th>الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map((it, idx) => `
                  <tr>
                    <td>${idx + 1}</td>
                    <td style="font-weight: 700; color: var(--color-primary);">${it.product.title}</td>
                    <td style="font-size: 0.82rem; color: #854d0e;">${it.product.factory.name} (${it.product.factory.country})</td>
                    <td>${it.size} / ${it.color}</td>
                    <td>${it.price} ر.س</td>
                    <td style="font-weight: 700;">${it.quantity}</td>
                    <td style="font-weight: 800;">${it.price * it.quantity} ر.س</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <!-- Totals Breakdown -->
            <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
              <div style="width: 320px; display: flex; flex-direction: column; gap: 8px; font-size: 0.92rem;">
                <div class="flex justify-between">
                  <span class="text-muted">المجموع قبل الضريبة:</span>
                  <span class="font-bold">${order.totals.subtotal} ر.س</span>
                </div>
                ${order.totals.discount > 0 ? `
                  <div class="flex justify-between" style="color: var(--color-danger);">
                    <span>الخصم المطبق:</span>
                    <span class="font-bold">-${order.totals.discount} ر.س</span>
                  </div>
                ` : ''}
                <div class="flex justify-between">
                  <span class="text-muted">ضريبة القيمة المضافة (15%):</span>
                  <span class="font-bold">${order.totals.vat} ر.س</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted">الشحن / التوصيل:</span>
                  <span class="font-bold">${order.totals.shipping === 0 ? 'مجاني' : order.totals.shipping + ' ر.س'}</span>
                </div>
                <div class="flex justify-between" style="font-size: 1.35rem; font-weight: 900; color: var(--color-primary); border-top: 2px solid var(--color-primary); padding-top: 8px;">
                  <span>المبلغ الإجمالي المدفوع:</span>
                  <span>${order.totals.total} ر.س</span>
                </div>
              </div>
            </div>

            <!-- Footer Notes -->
            <div style="margin-top: 36px; padding-top: 20px; border-top: 1px dashed var(--color-border); font-size: 0.8rem; color: var(--color-text-muted); text-align: center;">
              شكراً لتسوقك من مول النخبة للأزياء. يسعدنا استقبالك في أي وقت لتعديل المقاسات الفوري أو الاستبدال خلال 14 يوماً مع إبراز هذه الفاتورة.
            </div>
          </div>
        </div>
      `;
    },

    // 9. WISHLIST VIEW
    renderWishlistPage: function () {
      const products = window.MallStore.getWishlistProducts();
      const appContent = document.getElementById('appContent');
      if (!appContent) return;

      if (products.length === 0) {
        appContent.innerHTML = `
          <div class="container" style="padding: 80px 20px; text-align: center;">
            <div style="font-size: 3.5rem; color: #cbd5e1; margin-bottom: 16px;">
              <i class="far fa-heart"></i>
            </div>
            <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--color-primary); margin-bottom: 8px;">قائمة المفضلة فارغة</h2>
            <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 24px;">انقر على أيقونة القلب على أي قطعة ملابس لحفظها في قائمتك المفضلة.</p>
            <a href="#catalog" class="btn btn-gold btn-lg">تصفح الملابس الآن</a>
          </div>
        `;
        return;
      }

      appContent.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px;">
          <h1 style="font-size: 1.9rem; font-weight: 900; color: var(--color-primary); margin-bottom: 24px;">
            الملابس المفضلة لديك (${products.length})
          </h1>
          <div class="product-grid">
            ${products.map(p => this.renderProductCardHtml(p)).join('')}
          </div>
        </div>
      `;

      this.updateWishlistButtons();
    },

    // 10. ABOUT MALL VIEW
    renderAboutPage: function () {
      const mall = window.MALL_DATA.mallInfo;
      const appContent = document.getElementById('appContent');
      if (!appContent) return;

      appContent.innerHTML = `
        <div class="container" style="padding-top: 24px; padding-bottom: 60px;">
          <div style="background: #ffffff; border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 36px; box-shadow: var(--shadow-sm); max-width: 900px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 32px;">
              <span class="badge badge-gold" style="margin-bottom: 8px;">عن المول</span>
              <h1 style="font-size: 2rem; font-weight: 900; color: var(--color-primary);">${mall.name}</h1>
              <p style="color: var(--color-gold-hover); font-weight: 700; font-size: 1.05rem;">${mall.slogan}</p>
            </div>

            <div style="line-height: 1.8; color: #334155; font-size: 0.98rem; display: flex; flex-direction: column; gap: 16px;">
              <p>
                يعد <strong>${mall.name}</strong> الصرح الأول من نوعه المتخصص بالكامل في تجارة وتفصيل الأزياء والملابس بمختلف فئاتها تحت سقف واحد. نجمع لكم 120 تشكيلة فريدة تم اختيارها من أشهر مصانع الحياكة والنسيج في إيطاليا، فرنسا، تركيا، اليابان، البرتغال، إسبانيا ومصر.
              </p>
              <p>
                يتميز المول بتوفير الشفافية الكاملة لكل منتج: بلد وموقع المصنع، سنة التأسيس، شهادات الجودة والبيئة (OEKO-TEX, GOTS)، ونوعية الخيوط والأقمشة بدقة، مع خدمات خياطة وتعديل مقاسات فورية مجانية لكافة العملاء.
              </p>
            </div>

            <div style="margin-top: 32px; border-top: 1px solid var(--color-border); padding-top: 24px;">
              <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 16px; color: var(--color-primary);">معلومات الزيارة والاتصال:</h3>
              <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; font-size: 0.9rem;">
                <div>
                  <span class="text-muted" style="display: block;">العنوان:</span>
                  <strong>${mall.address}</strong>
                </div>
                <div>
                  <span class="text-muted" style="display: block;">أوقات العمل:</span>
                  <strong>${mall.hours}</strong>
                </div>
                <div>
                  <span class="text-muted" style="display: block;">هاتف المول:</span>
                  <strong dir="ltr">${mall.phone}</strong>
                </div>
                <div>
                  <span class="text-muted" style="display: block;">البريد الإلكتروني:</span>
                  <strong>${mall.email}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    },

    // =========================================================================
    // MODAL & DRAWER CONTROLS
    // =========================================================================

    // Quick View / Product Detail Modal
    openProductModal: function (productId) {
      const all = (window.MALL_DATA && window.MALL_DATA.products) || [];
      const product = all.find(p => p.id === productId);
      if (!product) return;

      const modalOverlay = document.getElementById('globalModalOverlay');
      const modalContainer = document.getElementById('globalModalContent');
      if (!modalOverlay || !modalContainer) return;

      const isFav = window.MallStore.isInWishlist(product.id);
      const fallbackSvg = getFallbackImageSvg(product.title, product.factory.country);

      modalContainer.innerHTML = `
        <button class="modal-close-btn" onclick="App.closeModal()">
          <i class="fas fa-times"></i>
        </button>

        <div style="padding: 28px;">
          <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 28px;">
            <!-- Modal Image -->
            <div>
              <div style="width: 100%; border-radius: var(--radius-md); overflow: hidden; background: #f8fafc; border: 1px solid var(--color-border);">
                <img src="${product.imageUrl}" alt="${product.title}" style="width: 100%; height: 380px; object-fit: cover;" onerror="this.src='${fallbackSvg}'">
              </div>
            </div>

            <!-- Modal Details -->
            <div class="flex flex-col gap-3">
              <div class="flex items-center justify-between">
                <span class="badge badge-gold">${product.badge || 'أزياء فاخرة'}</span>
                <span style="font-size: 0.8rem; color: var(--color-success); font-weight: 700;">
                  <i class="fas fa-check-circle"></i> ${product.stock}
                </span>
              </div>

              <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--color-primary); line-height: 1.3;">
                ${product.title}
              </h2>

              <div class="product-rating" style="font-size: 0.85rem;">
                <i class="fas fa-star"></i>
                <span style="font-weight: 700;">${product.rating}</span>
                <span class="count">(${product.reviewsCount} تقييم)</span>
              </div>

              <!-- Price Box -->
              <div style="background-color: var(--color-surface-soft); padding: 10px 14px; border-radius: var(--radius-sm); display: flex; align-items: baseline; gap: 8px;">
                <span class="price-val" style="font-size: 1.5rem;">${product.price}</span>
                <span class="price-currency">ر.س</span>
                ${product.oldPrice ? `<span class="old-price">${product.oldPrice} ر.س</span>` : ''}
              </div>

              <!-- Factory & Origin Card -->
              <div class="factory-card" style="padding: 14px;">
                <div class="factory-card-header" style="margin-bottom: 6px;">
                  <div class="factory-name" style="font-size: 0.95rem;">${product.factory.name}</div>
                  <div class="factory-origin-badge" style="font-size: 0.78rem;">
                    <i class="fas fa-map-marker-alt"></i> ${product.factory.city}، ${product.factory.country}
                  </div>
                </div>
                <div style="font-size: 0.8rem; color: var(--color-text-muted);">
                  <strong>الشهادات:</strong> ${product.factory.certifications}
                </div>
              </div>

              <!-- Fabric & Care -->
              <div style="font-size: 0.82rem; color: #1e293b;">
                <strong>الخامة:</strong> ${product.fabric}
              </div>

              <!-- Size selector -->
              <div>
                <label style="font-size: 0.82rem; font-weight: 700; margin-bottom: 4px; display: block;">المقاس:</label>
                <div class="filter-chip-list" id="modalSizesWrap">
                  ${product.sizes.map((s, idx) => `
                    <button class="filter-size-btn ${idx === 0 ? 'active' : ''}" onclick="App.selectDetailSize(this, '${s}')">
                      ${s}
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- Actions -->
              <div class="flex gap-3" style="margin-top: 10px;">
                <button class="btn btn-primary" style="flex: 1;" onclick="App.addCurrentDetailToCart('${product.id}')">
                  <i class="fas fa-cart-plus"></i> أضف للسلة
                </button>
                <a href="#product/${product.id}" class="btn btn-outline" onclick="App.closeModal()">
                  صفحة المنتج الكاملة
                </a>
              </div>
            </div>
          </div>
        </div>
      `;

      modalOverlay.classList.add('active');
    },

    // Interactive Size Chart Modal
    openSizeGuideModal: function (category) {
      const modalOverlay = document.getElementById('globalModalOverlay');
      const modalContainer = document.getElementById('globalModalContent');
      if (!modalOverlay || !modalContainer) return;

      modalContainer.innerHTML = `
        <button class="modal-close-btn" onclick="App.closeModal()">
          <i class="fas fa-times"></i>
        </button>

        <div style="padding: 28px;">
          <span class="badge badge-gold" style="margin-bottom: 6px;">حاسبة المقاس التفاعلية</span>
          <h2 style="font-size: 1.4rem; font-weight: 900; color: var(--color-primary); margin-bottom: 12px;">
            دليل المقاسات الدقيق وحاسبة الحجم المثالي
          </h2>
          <p style="color: var(--color-text-muted); font-size: 0.88rem; margin-bottom: 20px;">
            ادخل طولك ووزنك لحساب المقاس المقترح تلقائياً بناءً على معايير تفصيل المول.
          </p>

          <!-- Interactive Calculator -->
          <div style="background: var(--color-surface-soft); padding: 18px; border-radius: var(--radius-md); margin-bottom: 24px;">
            <div class="grid" style="grid-template-columns: 1fr 1fr auto; gap: 12px; align-items: flex-end;">
              <div>
                <label style="font-size: 0.82rem; font-weight: 700; margin-bottom: 4px; display: block;">الطول (سم):</label>
                <input type="number" id="calcHeight" value="175" style="width: 100%; border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 8px 12px; background: #ffffff;">
              </div>
              <div>
                <label style="font-size: 0.82rem; font-weight: 700; margin-bottom: 4px; display: block;">الوزن (كجم):</label>
                <input type="number" id="calcWeight" value="75" style="width: 100%; border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 8px 12px; background: #ffffff;">
              </div>
              <button class="btn btn-gold btn-sm" onclick="App.calculateSmartSize()" style="height: 40px;">
                احسب المقاس
              </button>
            </div>
            <div id="calcResult" style="margin-top: 14px; font-weight: 800; color: var(--color-primary); font-size: 0.95rem; display: none;"></div>
          </div>

          <!-- Standard Chart Table -->
          <table class="invoice-table" style="font-size: 0.85rem;">
            <thead>
              <tr>
                <th>المقاس الدولي</th>
                <th>محيط الصدر (سم)</th>
                <th>محيط الخصر (سم)</th>
                <th>طول الثوب / القميص</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Small (S)</td><td>88 - 94</td><td>76 - 82</td><td>54 - 56 إنش</td></tr>
              <tr><td>Medium (M)</td><td>95 - 102</td><td>83 - 89</td><td>56 - 58 إنش</td></tr>
              <tr><td>Large (L)</td><td>103 - 110</td><td>90 - 97</td><td>58 - 60 إنش</td></tr>
              <tr><td>X-Large (XL)</td><td>111 - 118</td><td>98 - 105</td><td>60 - 62 إنش</td></tr>
              <tr><td>XX-Large (XXL)</td><td>119 - 128</td><td>106 - 115</td><td>62 - 64 إنش</td></tr>
            </tbody>
          </table>

          <div style="margin-top: 16px; font-size: 0.8rem; color: var(--color-text-muted);">
            * ملاحظة: يتوفر قسم تعديل وتقصير المقاسات مجاناً في كل طابق داخل المول خلال 30 دقيقة.
          </div>
        </div>
      `;

      modalOverlay.classList.add('active');
    },

    calculateSmartSize: function () {
      const h = parseInt(document.getElementById('calcHeight').value, 10) || 170;
      const w = parseInt(document.getElementById('calcWeight').value, 10) || 70;
      const resEl = document.getElementById('calcResult');

      let size = 'Medium (M)';
      let note = 'مقاس مناسب ومريح';

      if (w < 60) {
        size = 'Small (S)';
      } else if (w <= 75) {
        size = 'Medium (M)';
      } else if (w <= 88) {
        size = 'Large (L)';
      } else if (w <= 100) {
        size = 'X-Large (XL)';
      } else {
        size = 'XX-Large (XXL)';
      }

      resEl.innerHTML = `
        <div style="background: #ecfdf5; border: 1px solid #10b981; border-radius: var(--radius-sm); padding: 10px 14px; color: #065f46;">
          المقاس المقترح لجسمك هو: <strong>${size}</strong> (${note})
        </div>
      `;
      resEl.style.display = 'block';
    },

    closeModal: function () {
      const modalOverlay = document.getElementById('globalModalOverlay');
      if (modalOverlay) modalOverlay.classList.remove('active');
    },

    // Cart Drawer Toggle
    openCartDrawer: function () {
      const drawer = document.getElementById('cartDrawer');
      const overlay = document.getElementById('cartDrawerOverlay');
      if (drawer && overlay) {
        this.renderCartDrawer();
        drawer.classList.add('active');
        overlay.classList.add('active');
      }
    },

    closeCartDrawer: function () {
      const drawer = document.getElementById('cartDrawer');
      const overlay = document.getElementById('cartDrawerOverlay');
      if (drawer && overlay) {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
      }
    },

    renderCartDrawer: function () {
      const cart = window.MallStore.cart;
      const totals = window.MallStore.getCartTotals();
      const body = document.getElementById('cartDrawerBody');
      const footer = document.getElementById('cartDrawerFooter');

      if (!body || !footer) return;

      if (cart.length === 0) {
        body.innerHTML = `
          <div style="padding: 40px 20px; text-align: center; color: var(--color-text-muted);">
            <i class="fas fa-shopping-bag" style="font-size: 2.5rem; margin-bottom: 12px; color: #cbd5e1;"></i>
            <div style="font-weight: 700; font-size: 1rem; color: var(--color-primary);">سلة التسوق فارغة</div>
            <p style="font-size: 0.85rem; margin-top: 4px;">تصفح أقسام المول وأضف قطع ملابسك المفضلة.</p>
          </div>
        `;
        footer.style.display = 'none';
        return;
      }

      footer.style.display = 'flex';
      body.innerHTML = cart.map(item => `
        <div class="cart-item-row">
          <img src="${item.product.imageUrl}" class="cart-item-thumb" alt="${item.product.title}" onerror="this.src='${getFallbackImageSvg(item.product.title, item.product.factory.country)}'">
          <div class="cart-item-details">
            <div class="flex justify-between items-start">
              <span class="cart-item-title">${item.product.title}</span>
              <button onclick="window.MallStore.removeFromCart('${item.itemId}')" style="color: var(--color-danger); font-size: 0.85rem;">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="cart-item-meta">المقاس: ${item.size} • ${item.price} ر.س</div>
            <div class="flex justify-between items-center">
              <div class="cart-qty-control">
                <button class="cart-qty-btn" onclick="window.MallStore.updateCartQuantity('${item.itemId}', ${item.quantity - 1})">-</button>
                <span class="cart-qty-val">${item.quantity}</span>
                <button class="cart-qty-btn" onclick="window.MallStore.updateCartQuantity('${item.itemId}', ${item.quantity + 1})">+</button>
              </div>
              <span style="font-weight: 800; font-size: 0.95rem;">${item.price * item.quantity} ر.س</span>
            </div>
          </div>
        </div>
      `).join('');

      footer.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.88rem;">
          <div class="flex justify-between">
            <span class="text-muted">المجموع الفرعي:</span>
            <span class="font-bold">${totals.subtotal} ر.س</span>
          </div>
          ${totals.discount > 0 ? `
            <div class="flex justify-between" style="color: var(--color-danger);">
              <span>الخصم:</span>
              <span class="font-bold">-${totals.discount} ر.س</span>
            </div>
          ` : ''}
          <div class="flex justify-between">
            <span class="text-muted">الضريبة (15%):</span>
            <span class="font-bold">${totals.vat} ر.س</span>
          </div>
          <div class="flex justify-between" style="font-size: 1.15rem; font-weight: 900; color: var(--color-primary); border-top: 1px solid var(--color-border); padding-top: 8px;">
            <span>الإجمالي:</span>
            <span>${totals.total} ر.س</span>
          </div>
        </div>

        <a href="#cart" class="btn btn-outline btn-sm" onclick="App.closeCartDrawer()">
          عرض سلة التسوق كاملة
        </a>
        <a href="#checkout" class="btn btn-gold" onclick="App.closeCartDrawer()">
          <i class="fas fa-lock"></i> إتمام الشراء الآن
        </a>
      `;
    },

    // =========================================================================
    // USER ACTIONS & INTERACTION HELPERS
    // =========================================================================

    navigateToCategory: function (catId) {
      window.MallStore.setFilter('category', catId);
      window.location.hash = '#catalog?cat=' + catId;
    },

    toggleWishlist: function (productId) {
      const isAdded = window.MallStore.toggleWishlist(productId);
      this.showToast(isAdded ? 'تمت إضافة القطعة إلى قائمة المفضلة ❤️' : 'تمت إزالة القطعة من المفضلة');
    },

    quickAddToCart: function (productId) {
      const all = (window.MALL_DATA && window.MALL_DATA.products) || [];
      const product = all.find(p => p.id === productId);
      if (!product) return;

      window.MallStore.addToCart(product, product.sizes[0], product.colors[0].name, 1);
      this.showToast(`تمت إضافة "${product.title}" إلى السلة 🛍️`);
      this.openCartDrawer();
    },

    addCurrentDetailToCart: function (productId) {
      const all = (window.MALL_DATA && window.MALL_DATA.products) || [];
      const product = all.find(p => p.id === productId);
      if (!product) return;

      const qtyInput = document.getElementById('detailQtyInput');
      const qty = qtyInput ? parseInt(qtyInput.value, 10) : 1;

      const activeSizeBtn = document.querySelector('#detailSizesWrap .filter-size-btn.active, #modalSizesWrap .filter-size-btn.active');
      const size = activeSizeBtn ? activeSizeBtn.textContent.trim() : product.sizes[0];

      const activeColorBtn = document.querySelector('#detailColorsWrap .chip-btn.active');
      const color = activeColorBtn ? activeColorBtn.textContent.trim() : product.colors[0].name;

      window.MallStore.addToCart(product, size, color, qty);
      this.closeModal();
      this.showToast(`تمت إضافة "${product.title}" إلى السلة 🛍️`);
      this.openCartDrawer();
    },

    selectDetailSize: function (btn, size) {
      const parent = btn.parentElement;
      parent.querySelectorAll('.filter-size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    },

    selectDetailColor: function (btn, color) {
      const parent = btn.parentElement;
      parent.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    },

    stepQty: function (delta) {
      const input = document.getElementById('detailQtyInput');
      if (!input) return;
      let val = parseInt(input.value, 10) || 1;
      val += delta;
      if (val < 1) val = 1;
      if (val > 10) val = 10;
      input.value = val;
    },

    switchFloorView: function (btn, floorCardId) {
      document.querySelectorAll('.floor-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.floor-view-card').forEach(card => card.style.display = 'none');
      const target = document.getElementById(floorCardId);
      if (target) target.style.display = 'block';
    },

    applyCartCoupon: function () {
      const input = document.getElementById('cartCouponInput');
      if (!input) return;
      const res = window.MallStore.applyCoupon(input.value);
      this.showToast(res.message);
      if (res.success) {
        this.renderCartPage();
      }
    },

    toggleCheckoutAddress: function (show) {
      const addr = document.getElementById('checkoutAddressFields');
      if (addr) addr.style.display = show ? 'block' : 'none';
      window.MallStore.setDeliveryMethod(show ? 'delivery' : 'pickup');
    },

    handleCheckoutSubmit: function (e) {
      e.preventDefault();
      const name = document.getElementById('custName').value.trim();
      const phone = document.getElementById('custPhone').value.trim();
      const email = document.getElementById('custEmail').value.trim();
      const city = document.getElementById('custCity') ? document.getElementById('custCity').value : 'الرياض';
      const address = document.getElementById('custAddress') ? document.getElementById('custAddress').value : '';
      
      const paymentInput = document.querySelector('input[name="paymentMethod"]:checked');
      const paymentMethod = paymentInput ? paymentInput.value : 'mada';

      const order = window.MallStore.createOrder({
        customer: { name, phone, email },
        paymentMethod: paymentMethod,
        address: `${city} - ${address}`
      });

      this.showToast(`تم تأكيد طلبك بنجاح برقم: ${order.orderNumber} 🎉`);
      this.renderInvoicePage(order);
    },

    showToast: function (message) {
      let container = document.getElementById('toastContainer');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
      }

      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = `
        <i class="fas fa-bell" style="color: var(--color-gold);"></i>
        <span>${message}</span>
      `;
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    }
  };

  // Expose App globally
  window.App = App;

  // Initialize once DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
  } else {
    App.init();
  }
})();
