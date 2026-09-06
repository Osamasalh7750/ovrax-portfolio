/**
 * Safwa Car Rental - Main Application Orchestrator & View Controller
 * Light & Airy Luxury Minimal Prototype
 */

class App {
  constructor() {
    this.currentView = 'home';
    this.selectedCarIdForDetails = 'car-1';
    this.carFilter = {
      category: 'all',
      maxPrice: 3000,
      transmission: 'all',
      seats: 'all',
      fuel: 'all',
      brand: 'all',
      searchQuery: '',
      sortBy: 'featured'
    };
  }

  init() {
    // 1. Apply translations
    window.i18n.applyToDOM();

    // 2. Setup hero dates & branch selects
    this.initHeroSearch();

    // 3. Render home sections
    this.renderHomeSections();

    // 4. Listen to hash routes
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();

    // 5. Setup subscriptions
    this.bindStoreEvents();

    // 6. Init notifications & wishlist counters
    this.updateNotificationBadge();
    this.updateWishlistCounters();
  }

  bindStoreEvents() {
    window.appStore.subscribe('cars_updated', () => {
      if (this.currentView === 'home') this.renderHomeSections();
      if (this.currentView === 'cars') this.renderCarsCatalog();
      if (this.currentView === 'car-details') this.renderDedicatedCarDetails(this.selectedCarIdForDetails);
    });

    window.appStore.subscribe('language_changed', () => {
      this.initHeroSearch();
      this.renderHomeSections();
      if (this.currentView === 'cars') this.renderCarsCatalog();
      if (this.currentView === 'car-details') this.renderDedicatedCarDetails(this.selectedCarIdForDetails);
      if (this.currentView === 'account') this.renderAccountView();
      if (this.currentView === 'admin') window.adminCtrl.init();
    });

    window.appStore.subscribe('favorites_updated', () => {
      this.updateWishlistCounters();
      if (this.currentView === 'cars') this.renderCarsCatalog();
      if (this.currentView === 'home') this.renderHomeSections();
      if (this.currentView === 'account') this.renderAccountFavorites();
    });

    window.appStore.subscribe('notifications_updated', () => {
      this.updateNotificationBadge();
    });
  }

  handleRoute() {
    const rawHash = window.location.hash || '#home';
    const parts = rawHash.replace('#', '').split('?');
    const viewName = parts[0];
    const params = new URLSearchParams(parts[1] || '');

    const validViews = ['home', 'cars', 'car-details', 'my-account', 'admin', 'faq', 'contact'];
    
    if (viewName === 'car-details') {
      const carId = params.get('id') || this.selectedCarIdForDetails || 'car-1';
      this.selectedCarIdForDetails = carId;
      this.switchView('car-details');
    } else if (validViews.includes(viewName)) {
      this.switchView(viewName === 'my-account' ? 'account' : viewName);
    } else {
      this.switchView('home');
    }
  }

  switchView(viewName) {
    this.currentView = viewName;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Hide all view containers
    document.querySelectorAll('.view-container').forEach(el => el.classList.remove('active'));

    // Update nav active link
    document.querySelectorAll('.nav-link').forEach(el => {
      el.classList.remove('active');
      const href = el.getAttribute('href');
      if (href === `#${viewName === 'account' ? 'my-account' : viewName}`) {
        el.classList.add('active');
      }
    });

    const target = document.getElementById(`view-${viewName}`);
    if (target) {
      target.classList.add('active');
    }

    // View-specific renderers
    if (viewName === 'home') {
      this.renderHomeSections();
    } else if (viewName === 'cars') {
      this.renderCarsCatalog();
    } else if (viewName === 'car-details') {
      this.renderDedicatedCarDetails(this.selectedCarIdForDetails);
    } else if (viewName === 'account') {
      this.renderAccountView();
    } else if (viewName === 'admin') {
      window.adminCtrl.init();
    }
  }

  // --- HERO SEARCH INITIALIZATION ---
  initHeroSearch() {
    const branches = window.appStore.getBranches();
    const search = window.appStore.getCurrentSearch();
    const isRtl = window.i18n.isRTL();

    const pickupSelect = document.getElementById('heroPickupLoc');
    const returnSelect = document.getElementById('heroReturnLoc');

    if (pickupSelect && returnSelect) {
      const optionsHtml = branches.map(b => 
        `<option value="${b.id}" ${b.id === search.pickupLocationId ? 'selected' : ''}>${isRtl ? b.nameAr : b.nameEn}</option>`
      ).join('');

      pickupSelect.innerHTML = optionsHtml;
      returnSelect.innerHTML = branches.map(b => 
        `<option value="${b.id}" ${b.id === (search.returnLocationId || search.pickupLocationId) ? 'selected' : ''}>${isRtl ? b.nameAr : b.nameEn}</option>`
      ).join('');
    }

    const pDateInput = document.getElementById('heroPickupDate');
    const rDateInput = document.getElementById('heroReturnDate');
    if (pDateInput && rDateInput) {
      pDateInput.value = search.pickupDate || this.getFutureDateStr(0);
      rDateInput.value = search.returnDate || this.getFutureDateStr(3);
    }
  }

  getFutureDateStr(offsetDays) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  toggleSameReturnLocation(checkbox) {
    const returnGroup = document.getElementById('returnLocationGroup');
    if (returnGroup) {
      returnGroup.style.display = checkbox.checked ? 'none' : 'block';
    }
    if (checkbox.checked) {
      const pickupVal = document.getElementById('heroPickupLoc')?.value;
      const returnSelect = document.getElementById('heroReturnLoc');
      if (returnSelect && pickupVal) returnSelect.value = pickupVal;
    }
  }

  executeHeroSearch() {
    const pLoc = document.getElementById('heroPickupLoc')?.value;
    const isSame = document.getElementById('sameLocationCheck')?.checked;
    const rLoc = isSame ? pLoc : document.getElementById('heroReturnLoc')?.value;
    const pDate = document.getElementById('heroPickupDate')?.value;
    const rDate = document.getElementById('heroReturnDate')?.value;
    const pTime = document.getElementById('heroPickupTime')?.value || '10:00';
    const rTime = document.getElementById('heroReturnTime')?.value || '10:00';

    const p = new Date(pDate);
    const r = new Date(rDate);
    if (r <= p) {
      this.showToast(window.i18n.isRTL() ? 'تاريخ التسليم يجب أن يكون بعد تاريخ الاستلام' : 'Return date must be after pickup date', 'warning');
      return;
    }

    const diffDays = Math.max(1, Math.ceil((r - p) / (1000 * 60 * 60 * 24)));

    window.appStore.saveCurrentSearch({
      pickupLocationId: pLoc,
      returnLocationId: rLoc,
      pickupDate: pDate,
      pickupTime: pTime,
      returnDate: rDate,
      returnTime: rTime,
      rentalDays: diffDays
    });

    window.location.hash = '#cars';
    this.switchView('cars');
    this.showToast(window.i18n.isRTL() ? `تم تحديد مدة الإيجار: ${diffDays} أيام` : `Rental set to ${diffDays} days`, 'info');
  }

  // --- HOME PAGE SECTIONS ---
  renderHomeSections() {
    const cars = window.appStore.getCars();
    const search = window.appStore.getCurrentSearch();
    const days = search.rentalDays || 3;

    // 1. Featured cars grid
    const featuredContainer = document.getElementById('homeFeaturedCarsGrid');
    if (featuredContainer) {
      const featured = cars.filter(c => c.featured);
      featuredContainer.innerHTML = featured.map(c => this.renderCarCard(c, days)).join('');
    }

    // 2. Update category counts in Home
    const counts = {
      economy: cars.filter(c => c.category === 'economy').length,
      sedan: cars.filter(c => c.category === 'sedan').length,
      suv: cars.filter(c => c.category === 'suv').length,
      luxury: cars.filter(c => c.category === 'luxury').length,
      electric: cars.filter(c => c.category === 'electric').length
    };

    for (const [cat, count] of Object.entries(counts)) {
      const el = document.getElementById(`catCount_${cat}`);
      if (el) el.textContent = `${count} ${window.i18n.isRTL() ? 'سيارات متاحة' : 'Cars'}`;
    }
  }

  filterByCategoryFromHome(category) {
    this.resetFilters();
    this.setCategoryFilter(category);
    window.location.hash = '#cars';
    this.switchView('cars');
  }

  // --- CARS CATALOG VIEW & FILTERS ---
  renderCarsCatalog() {
    const cars = window.appStore.getCars();
    const search = window.appStore.getCurrentSearch();
    const days = search.rentalDays || 3;
    const isRtl = window.i18n.isRTL();
    const branches = window.appStore.getBranches();
    const pBranch = branches.find(b => b.id === search.pickupLocationId) || branches[0];
    const rBranch = branches.find(b => b.id === search.returnLocationId) || branches[0];

    // Filter logic
    let filtered = cars.filter(c => {
      // Category
      if (this.carFilter.category !== 'all' && c.category !== this.carFilter.category) return false;
      // Max Price
      if (c.dailyPrice > this.carFilter.maxPrice) return false;
      // Transmission
      if (this.carFilter.transmission !== 'all' && c.transmission !== this.carFilter.transmission) return false;
      // Seats
      if (this.carFilter.seats !== 'all' && c.seats < parseInt(this.carFilter.seats, 10)) return false;
      // Fuel
      if (this.carFilter.fuel !== 'all') {
        if (this.carFilter.fuel === 'electric' && c.category !== 'electric') return false;
        if (this.carFilter.fuel === 'gasoline' && c.category === 'electric') return false;
      }
      // Brand
      if (this.carFilter.brand !== 'all' && c.brand.toLowerCase() !== this.carFilter.brand.toLowerCase()) return false;
      // Search text query
      if (this.carFilter.searchQuery) {
        const q = this.carFilter.searchQuery.toLowerCase();
        const matchName = c.name.toLowerCase().includes(q) || c.nameEn.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q);
        if (!matchName) return false;
      }
      return true;
    });

    // Sort logic
    if (this.carFilter.sortBy === 'price_asc') {
      filtered.sort((a, b) => a.dailyPrice - b.dailyPrice);
    } else if (this.carFilter.sortBy === 'price_desc') {
      filtered.sort((a, b) => b.dailyPrice - a.dailyPrice);
    } else if (this.carFilter.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    // Update summary tags
    const summaryBox = document.getElementById('catalogSearchSummaryTags');
    if (summaryBox) {
      summaryBox.innerHTML = `
        <span class="summary-tag">📍 ${isRtl ? 'الاستلام:' : 'Pickup:'} ${isRtl ? pBranch.nameAr : pBranch.nameEn}</span>
        <span class="summary-tag">🏁 ${isRtl ? 'التسليم:' : 'Return:'} ${isRtl ? rBranch.nameAr : rBranch.nameEn}</span>
        <span class="summary-tag">📅 ${search.pickupDate} → ${search.returnDate} (${days} ${isRtl ? 'أيام' : 'Days'})</span>
      `;
    }

    const countEl = document.getElementById('catalogResultsCount');
    if (countEl) {
      countEl.textContent = isRtl ? `${filtered.length} سيارة متاحة للحجز` : `${filtered.length} Available Vehicles`;
    }

    const grid = document.getElementById('catalogCarsGrid');
    if (grid) {
      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="empty-state-card" style="grid-column: 1 / -1;">
            <span class="empty-icon">🔍</span>
            <h3>${isRtl ? 'لم نعثر على سيارات مطابقة لخيارات التصفية' : 'No cars match your search filters'}</h3>
            <p class="text-muted">${isRtl ? 'يرجى تجربة توسيع نطاق السعر أو إلغاء بعض الفلاتر' : 'Try expanding your price range or resetting filters'}</p>
            <button class="btn btn-outline mt-3" onclick="window.app.resetFilters()">${window.i18n.t('clear_filters')}</button>
          </div>
        `;
      } else {
        grid.innerHTML = filtered.map(c => this.renderCarCard(c, days)).join('');
      }
    }
  }

  // Universal Clean Minimal Car Card Component
  renderCarCard(car, rentalDays = 3) {
    const isRtl = window.i18n.isRTL();
    const t = (k, r) => window.i18n.t(k, r);
    const isFav = window.appStore.isFavorite(car.id);
    const totalPrice = car.dailyPrice * rentalDays;

    let statusBadge = '';
    if (car.status === 'available') {
      statusBadge = `<span class="car-status-badge available">● ${t('badge_available')}</span>`;
    } else if (car.status === 'rented') {
      statusBadge = `<span class="car-status-badge rented">● ${t('badge_rented')}</span>`;
    } else if (car.status === 'reserved') {
      statusBadge = `<span class="car-status-badge reserved">● ${t('badge_reserved')}</span>`;
    } else {
      statusBadge = `<span class="car-status-badge maintenance">● ${t('badge_maintenance')}</span>`;
    }

    return `
      <div class="car-card animate-fade">
        <div class="car-card-image-wrap">
          <img src="${car.imageUrl}" alt="${car.name}" class="car-card-img" loading="lazy" onerror="this.src='assets/car-placeholder.svg'">
          ${statusBadge}
          <button class="wishlist-btn ${isFav ? 'active' : ''}" onclick="window.app.toggleWishlist('${car.id}', event)" title="إضافة للمفضلة">
            ${isFav ? '❤️' : '🤍'}
          </button>
          <div class="category-pill">${car.categoryAr || car.category}</div>
        </div>

        <div class="car-card-body">
          <div class="d-flex justify-content-between align-items-baseline">
            <h3 class="car-title">${isRtl ? car.name : car.nameEn} <span class="model-year">(${car.modelYear})</span></h3>
            <div class="car-rating">⭐ <strong>${car.rating}</strong> <small class="text-muted">(${car.reviewCount})</small></div>
          </div>

          <div class="car-features-grid">
            <div class="feat-badge">💺 ${car.seats} ${t('seats_label')}</div>
            <div class="feat-badge">⚙️ ${isRtl ? car.transmissionAr : car.transmissionEn}</div>
            <div class="feat-badge">⛽ ${isRtl ? car.fuelType : car.fuelTypeEn}</div>
            <div class="feat-badge">🧳 ${car.luggage} ${t('luggage_label')}</div>
          </div>

          <div class="car-pricing-footer">
            <div class="pricing-col">
              <div class="daily-rate">
                <span class="price-number">${car.dailyPrice}</span>
                <span class="price-currency">${t('per_day')}</span>
              </div>
              <div class="total-rate">
                ${t('total_period', { days: rentalDays })} <strong>${totalPrice} ${t('sar')}</strong>
              </div>
              <div class="deposit-tag">
                ${t('security_deposit')} <strong>${car.deposit} ${t('sar')}</strong>
              </div>
            </div>

            <div class="actions-col">
              <button class="btn btn-outline btn-sm" onclick="window.app.navigateToDetails('${car.id}')">${t('btn_details')}</button>
              ${car.status === 'available' ? `
                <button class="btn btn-primary btn-sm" onclick="window.bookingEngine.startBooking('${car.id}')">${t('btn_book_now')}</button>
              ` : `
                <button class="btn btn-disabled btn-sm" disabled>${t('badge_rented')}</button>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- DEDICATED CAR DETAILS PAGE ---
  navigateToDetails(carId) {
    this.selectedCarIdForDetails = carId;
    window.location.hash = `#car-details?id=${carId}`;
    this.switchView('car-details');
  }

  renderDedicatedCarDetails(carId) {
    const car = window.appStore.getCarById(carId) || window.appStore.getCars()[0];
    if (!car) return;

    this.selectedCarIdForDetails = car.id;
    const isRtl = window.i18n.isRTL();
    const t = (k, r) => window.i18n.t(k, r);
    const search = window.appStore.getCurrentSearch();
    const days = search.rentalDays || 3;
    const pricing = window.bookingEngine.calculatePricing({ car, rentalDays: days });

    const container = document.getElementById('carDetailsDedicatedContent');
    if (!container) return;

    const gallery = car.gallery && car.gallery.length > 0 ? car.gallery : [car.imageUrl];

    container.innerHTML = `
      <div class="details-page-wrap animate-fade">
        <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <button class="btn btn-outline btn-sm" onclick="window.location.hash='#cars'; window.app.switchView('cars');">
            ${isRtl ? '← العودة لأسطول السيارات' : '← Back to Fleet'}
          </button>
          <div class="d-flex align-items-center gap-2">
            <span class="badge badge-brand">${car.brand}</span>
            <span class="badge badge-gold">موديل ${car.modelYear}</span>
            <span class="badge badge-subtle">${car.categoryAr || car.category}</span>
          </div>
        </div>

        <div class="grid-2-col" style="gap: 2rem; align-items: start;">
          <!-- Gallery -->
          <div class="details-gallery-wrap">
            <img src="${gallery[0]}" id="mainDedicatedDetailsImg" class="main-gallery-img" alt="${car.name}" onerror="this.src='assets/car-placeholder.svg'">
            <div class="gallery-thumbs">
              ${gallery.map((img, idx) => `
                <img src="${img}" class="thumb-img ${idx === 0 ? 'active' : ''}" onclick="window.app.switchDedicatedThumb('${img}', this)" alt="thumb" onerror="this.src='assets/car-placeholder.svg'">
              `).join('')}
            </div>
          </div>

          <!-- Summary & Specs -->
          <div>
            <h1 class="hero-title" style="font-size: 2.2rem; text-align: start; margin-bottom: 0.5rem;">${isRtl ? car.name : car.nameEn}</h1>
            <div class="d-flex align-items-center gap-2 mb-3">
              <span class="car-rating">⭐ <strong>${car.rating}</strong> (${car.reviewCount} تقييم)</span>
              <span>•</span>
              <span class="text-success font-bold">${car.status === 'available' ? '🟢 متاحة للاستلام الفوري' : '🔴 غير متاحة حالياً'}</span>
            </div>

            <!-- Specs Grid -->
            <h4 class="mt-4 mb-2">📋 ${t('details_title')}</h4>
            <div class="specs-table-grid">
              <div class="spec-cell"><span class="text-muted">${t('specs_year')}</span> <strong>${car.modelYear}</strong></div>
              <div class="spec-cell"><span class="text-muted">${t('specs_engine')}</span> <strong>${car.engine || '2.5L'}</strong></div>
              <div class="spec-cell"><span class="text-muted">${t('specs_fuel_economy')}</span> <strong>${isRtl ? car.fuelConsumption : car.fuelConsumptionEn}</strong></div>
              <div class="spec-cell"><span class="text-muted">${t('specs_transmission')}</span> <strong>${isRtl ? car.transmissionAr : car.transmissionEn}</strong></div>
              <div class="spec-cell"><span class="text-muted">${t('seats_label')} / ${t('doors_label')}</span> <strong>${car.seats} مقاعد / ${car.doors} أبواب</strong></div>
              <div class="spec-cell"><span class="text-muted">${t('specs_mileage_limit')}</span> <strong>${car.mileageLimit} كم/يوم</strong></div>
              <div class="spec-cell"><span class="text-muted">${t('specs_extra_km')}</span> <strong>${car.extraKmRate} ريال/كم</strong></div>
              <div class="spec-cell"><span class="text-muted">${t('security_deposit')}</span> <strong>${car.deposit} ريال</strong></div>
            </div>

            <!-- Features -->
            <h4 class="mt-4 mb-2">✨ ${t('specs_features')}</h4>
            <div class="features-tags-list">
              ${(isRtl ? car.featuresAr : car.featuresEn).map(f => `<span class="badge-feature">✓ ${f}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Rental Policies -->
        <h4 class="mt-5 mb-3">📄 شروط وسياسات الاستئجار والتأمين</h4>
        <div class="policies-grid">
          <div class="policy-item">
            <strong>⛽ ${t('fuel_policy_title')}</strong>
            <p class="text-muted mt-1">${t('fuel_policy_desc')}</p>
          </div>
          <div class="policy-item">
            <strong>🔄 ${t('cancellation_policy_title')}</strong>
            <p class="text-muted mt-1">${t('cancellation_policy_desc')}</p>
          </div>
          <div class="policy-item">
            <strong>🛡️ ${isRtl ? 'تفاصيل التأمين والتحمل' : 'Insurance & Excess'}</strong>
            <p class="text-muted mt-1">${isRtl ? 'تأمين ضد الغير مشمول مجاناً مع إمكانية الترقية لتأمين شامل بدون أي نسبة تحمل (0 ريال).' : 'Third-party cover included with available zero-deductible upgrade.'}</p>
          </div>
          <div class="policy-item">
            <strong>📑 ${t('rental_terms_title')}</strong>
            <p class="text-muted mt-1">${isRtl ? car.termsAr : car.termsEn}</p>
          </div>
        </div>

        <!-- Sticky Bottom Pricing Bar -->
        <div class="details-bottom-bar mt-5">
          <div>
            <div class="price-val">${car.dailyPrice} <small style="font-size: 1rem; color: var(--text-muted);">${t('per_day')}</small></div>
            <div class="text-muted small">${t('total_period', { days })} <strong>${pricing.finalPaidAmount} ${t('sar')}</strong> (شامل الضريبة 15%) • الوديعة المستردة: ${car.deposit} ريال</div>
          </div>
          ${car.status === 'available' ? `
            <button class="btn btn-primary btn-large" onclick="window.bookingEngine.startBooking('${car.id}')">
              🚀 ${t('btn_book_now')}
            </button>
          ` : `
            <button class="btn btn-disabled btn-large" disabled>${t('badge_rented')}</button>
          `}
        </div>
      </div>
    `;
  }

  switchDedicatedThumb(src, el) {
    const main = document.getElementById('mainDedicatedDetailsImg');
    if (main) main.src = src;
    document.querySelectorAll('.gallery-thumbs .thumb-img').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }

  // --- FILTER CONTROLS ---
  setCategoryFilter(cat) {
    this.carFilter.category = cat;
    document.querySelectorAll('.cat-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === cat);
    });
    this.renderCarsCatalog();
  }

  setPriceFilter(val) {
    this.carFilter.maxPrice = parseInt(val, 10);
    const display = document.getElementById('priceFilterDisplay');
    if (display) display.textContent = `${val} ${window.i18n.t('sar')}`;
    this.renderCarsCatalog();
  }

  setTransmissionFilter(val) {
    this.carFilter.transmission = val;
    this.renderCarsCatalog();
  }

  setSeatsFilter(val) {
    this.carFilter.seats = val;
    this.renderCarsCatalog();
  }

  setFuelFilter(val) {
    this.carFilter.fuel = val;
    this.renderCarsCatalog();
  }

  setBrandFilter(val) {
    this.carFilter.brand = val;
    this.renderCarsCatalog();
  }

  setSortFilter(val) {
    this.carFilter.sortBy = val;
    this.renderCarsCatalog();
  }

  setSearchQuery(val) {
    this.carFilter.searchQuery = val.trim();
    this.renderCarsCatalog();
  }

  resetFilters() {
    this.carFilter = {
      category: 'all',
      maxPrice: 3000,
      transmission: 'all',
      seats: 'all',
      fuel: 'all',
      brand: 'all',
      searchQuery: '',
      sortBy: 'featured'
    };

    const priceInput = document.getElementById('priceFilterInput');
    if (priceInput) priceInput.value = 3000;
    const priceDisplay = document.getElementById('priceFilterDisplay');
    if (priceDisplay) priceDisplay.textContent = `3000 ${window.i18n.t('sar')}`;

    const searchInput = document.getElementById('catalogSearchInput');
    if (searchInput) searchInput.value = '';

    document.querySelectorAll('.cat-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.category === 'all'));
    document.querySelectorAll('.filter-select').forEach(s => s.selectedIndex = 0);

    this.renderCarsCatalog();
  }

  // --- WISHLIST / FAVORITES ---
  toggleWishlist(carId, event) {
    if (event) event.stopPropagation();
    const isNowFav = window.appStore.toggleFavorite(carId);
    this.showToast(isNowFav 
      ? (window.i18n.isRTL() ? 'تمت إضافة السيارة إلى المفضلة ❤️' : 'Added to favorites ❤️')
      : (window.i18n.isRTL() ? 'تمت إزالة السيارة من المفضلة' : 'Removed from favorites'),
      'info'
    );
  }

  updateWishlistCounters() {
    const favs = window.appStore.getFavorites();
    document.querySelectorAll('.wishlist-counter-badge').forEach(b => {
      b.textContent = favs.length;
    });
  }

  // --- CUSTOMER ACCOUNT DASHBOARD ---
  renderAccountView() {
    this.switchAccountTab('active');
    this.populateProfileForm();
  }

  switchAccountTab(tabName) {
    document.querySelectorAll('.account-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabName);
    });

    const content = document.getElementById('accountTabContent');
    if (!content) return;

    const bookings = window.appStore.getBookings();
    const t = (k) => window.i18n.t(k);

    const profileWrapper = document.getElementById('profileTabWrapper');
    if (profileWrapper) {
      profileWrapper.classList.toggle('d-none', tabName !== 'profile');
    }

    if (tabName === 'active') {
      const active = bookings.filter(b => b.bookingStatus === 'confirmed' || b.bookingStatus === 'active' || b.bookingStatus === 'pending');
      content.innerHTML = this.renderBookingsList(active, true);
    } else if (tabName === 'past') {
      const past = bookings.filter(b => b.bookingStatus === 'completed');
      content.innerHTML = this.renderBookingsList(past, false);
    } else if (tabName === 'cancelled') {
      const cancelled = bookings.filter(b => b.bookingStatus === 'cancelled');
      content.innerHTML = this.renderBookingsList(cancelled, false);
    } else if (tabName === 'favorites') {
      this.renderAccountFavorites();
    }
  }

  renderBookingsList(list, canCancel = false) {
    const isRtl = window.i18n.isRTL();
    const t = (k) => window.i18n.t(k);

    if (list.length === 0) {
      return `
        <div class="empty-state-card">
          <span class="empty-icon">📁</span>
          <h4>${t('no_bookings_yet')}</h4>
          <button class="btn btn-primary mt-3" onclick="window.location.hash='#cars'; window.app.switchView('cars')">${t('btn_view_fleet')}</button>
        </div>
      `;
    }

    return `
      <div class="user-bookings-grid">
        ${list.map(b => `
          <div class="booking-portal-card animate-fade">
            <div class="booking-portal-header">
              <div>
                <span class="badge badge-brand">${b.bookingNumber}</span>
                <h4 class="mt-1">${b.carName}</h4>
              </div>
              <span class="booking-status-badge status-${b.bookingStatus}">
                ${window.appStore.getBookingStatusLabelAr(b.bookingStatus)}
              </span>
            </div>

            <div class="booking-portal-details">
              <div>📍 <strong>الاستلام:</strong> ${b.pickupLocationName} (${b.pickupDate})</div>
              <div>📍 <strong>التسليم:</strong> ${b.returnLocationName} (${b.returnDate})</div>
              <div>🛡️ <strong>التأمين:</strong> ${b.insuranceName}</div>
              <div>💳 <strong>المدفوع:</strong> <span class="text-success font-bold">${b.finalPaidAmount} ريال</span> | التأمين: ${b.refundableDeposit} ريال</div>
            </div>

            <div class="d-flex gap-2">
              <button class="btn btn-outline btn-sm" onclick="window.app.viewBookingReceipt('${b.bookingNumber}')">🖨️ ${t('btn_view_receipt')}</button>
              ${canCancel && b.bookingStatus !== 'cancelled' ? `
                <button class="btn btn-outline-danger btn-sm" onclick="window.app.cancelCustomerBooking('${b.bookingNumber}')">${t('btn_cancel_booking')}</button>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderAccountFavorites() {
    const favIds = window.appStore.getFavorites();
    const cars = window.appStore.getCars().filter(c => favIds.includes(c.id));
    const content = document.getElementById('accountTabContent');
    if (!content) return;

    if (cars.length === 0) {
      content.innerHTML = `
        <div class="empty-state-card">
          <span class="empty-icon">🤍</span>
          <h4>لم تقم بإضافة سيارات إلى قائمتك المفضلة بعد</h4>
          <button class="btn btn-primary mt-3" onclick="window.location.hash='#cars'; window.app.switchView('cars')">${window.i18n.t('btn_view_fleet')}</button>
        </div>
      `;
      return;
    }

    content.innerHTML = `
      <div class="catalog-cars-grid">
        ${cars.map(c => this.renderCarCard(c, 3)).join('')}
      </div>
    `;
  }

  cancelCustomerBooking(bookingNumber) {
    const isRtl = window.i18n.isRTL();
    if (confirm(window.i18n.t('cancel_confirm_msg'))) {
      window.appStore.updateBookingStatus(bookingNumber, 'cancelled', 'إلغاء بناء على طلب العميل');
      this.showToast(isRtl ? 'تم إلغاء الحجز بنجاح وإصدار أمر استرداد المبلغ.' : 'Booking cancelled and refund processed.', 'success');
      this.switchAccountTab('active');
    }
  }

  viewBookingReceipt(bookingNumber) {
    const b = window.appStore.getBookingByNumber(bookingNumber);
    if (!b) return;
    window.bookingEngine.lastCreatedBooking = b;
    window.bookingEngine.currentStep = 6;
    window.bookingEngine.renderModal();
    const modal = document.getElementById('bookingModal');
    if (modal) modal.classList.add('active');
  }

  populateProfileForm() {
    const u = window.appStore.getUserProfile();
    const nameEl = document.getElementById('profile_name');
    const phoneEl = document.getElementById('profile_phone');
    const emailEl = document.getElementById('profile_email');
    const idEl = document.getElementById('profile_id');
    const licEl = document.getElementById('profile_license');

    if (nameEl) nameEl.value = u.name || '';
    if (phoneEl) phoneEl.value = u.phone || '';
    if (emailEl) emailEl.value = u.email || '';
    if (idEl) idEl.value = u.idNumber || '';
    if (licEl) licEl.value = u.licenseNumber || '';
  }

  saveProfile(event) {
    event.preventDefault();
    const profile = {
      name: document.getElementById('profile_name')?.value.trim() || '',
      phone: document.getElementById('profile_phone')?.value.trim() || '',
      email: document.getElementById('profile_email')?.value.trim() || '',
      idNumber: document.getElementById('profile_id')?.value.trim() || '',
      licenseNumber: document.getElementById('profile_license')?.value.trim() || '',
      age: 29
    };
    window.appStore.saveUserProfile(profile);
    this.showToast(window.i18n.isRTL() ? 'تم حفظ وتحديث بيانات الملف الشخصي بنجاح!' : 'Profile details updated!', 'success');
  }

  // --- AUTH MODALS (LOGIN / REGISTER) ---
  openAuthModal(mode = 'login') {
    const isRtl = window.i18n.isRTL();
    const modalHtml = `
      <div class="modal-backdrop active" id="authModal">
        <div class="modal-dialog animate-scale" style="max-width: 440px;">
          <div class="modal-header">
            <h3>${mode === 'login' ? (isRtl ? 'تسجيل الدخول' : 'Sign In') : (isRtl ? 'إنشاء حساب جديد' : 'Create Account')}</h3>
            <button class="close-btn" onclick="document.getElementById('authModal').remove()">✕</button>
          </div>
          <div class="modal-body">
            <form onsubmit="window.app.processAuth(event, '${mode}')">
              ${mode === 'register' ? `
                <div class="form-group mb-2">
                  <label>${isRtl ? 'الاسم الكامل' : 'Full Name'} *</label>
                  <input type="text" id="auth_name" class="form-control" required placeholder="عبدالرحمن الشهري">
                </div>
              ` : ''}
              <div class="form-group mb-2">
                <label>${isRtl ? 'رقم الجوال أو البريد' : 'Mobile or Email'} *</label>
                <input type="text" id="auth_id" class="form-control" required placeholder="+9665xxxxxxxx">
              </div>
              <div class="form-group mb-3">
                <label>${isRtl ? 'كلمة المرور' : 'Password'} *</label>
                <input type="password" class="form-control" required placeholder="••••••••">
              </div>
              <button type="submit" class="btn btn-primary w-100">
                ${mode === 'login' ? (isRtl ? 'دخول لحسابي' : 'Sign In') : (isRtl ? 'تأكيد التسجيل' : 'Register Now')}
              </button>
              <div class="text-center mt-3 text-muted small">
                ${mode === 'login' 
                  ? `${isRtl ? 'ليس لديك حساب؟' : 'New here?'} <a href="javascript:void(0)" onclick="document.getElementById('authModal').remove(); window.app.openAuthModal('register');" style="color:var(--text-primary); font-weight:700;">${isRtl ? 'إنشاء حساب جديد' : 'Register'}</a>`
                  : `${isRtl ? 'لديك حساب بالفعل؟' : 'Have an account?'} <a href="javascript:void(0)" onclick="document.getElementById('authModal').remove(); window.app.openAuthModal('login');" style="color:var(--text-primary); font-weight:700;">${isRtl ? 'تسجيل الدخول' : 'Sign In'}</a>`
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    const container = document.getElementById('detailsModalContainer');
    if (container) container.innerHTML = modalHtml;
  }

  processAuth(e, mode) {
    e.preventDefault();
    const modal = document.getElementById('authModal');
    if (modal) modal.remove();

    if (mode === 'register') {
      const name = document.getElementById('auth_name')?.value.trim();
      if (name) {
        window.appStore.saveUserProfile({ ...window.appStore.getUserProfile(), name });
      }
    }

    this.showToast(window.i18n.isRTL() ? 'تم تسجيل الدخول بنجاح! مرحباً بك في الصفوة.' : 'Logged in successfully! Welcome to Safwa.', 'success');
    window.location.hash = '#my-account';
    this.switchView('account');
  }

  // --- NOTIFICATIONS SYSTEM ---
  toggleNotificationDropdown() {
    const dropdown = document.getElementById('notificationDropdown');
    if (dropdown) {
      dropdown.classList.toggle('active');
      if (dropdown.classList.contains('active')) {
        this.renderNotificationsList();
      }
    }
  }

  renderNotificationsList() {
    const list = window.appStore.getNotifications();
    const container = document.getElementById('notificationListItems');
    if (!container) return;

    const isRtl = window.i18n.isRTL();

    if (list.length === 0) {
      container.innerHTML = `<div class="p-3 text-center text-muted small">لا توجد إشعارات جديدة</div>`;
      return;
    }

    container.innerHTML = list.map(n => `
      <div class="notification-item ${n.read ? 'read' : 'unread'}">
        <div class="notif-title">
          <strong>${isRtl ? n.titleAr : n.titleEn}</strong>
          <small class="text-muted">${this.timeAgo(n.time)}</small>
        </div>
        <p class="notif-desc">${isRtl ? n.messageAr : n.messageEn}</p>
      </div>
    `).join('');

    window.appStore.markNotificationsRead();
  }

  updateNotificationBadge() {
    const list = window.appStore.getNotifications();
    const unread = list.filter(n => !n.read).length;
    const badge = document.getElementById('notifBadgeCounter');
    if (badge) {
      badge.textContent = unread;
      badge.style.display = unread > 0 ? 'inline-block' : 'none';
    }
  }

  timeAgo(timeStr) {
    const date = new Date(timeStr);
    const diff = Math.floor((new Date() - date) / 1000);
    if (diff < 60) return 'الآن';
    if (diff < 3600) return `منذ ${Math.floor(diff / 60)} دقيقة`;
    if (diff < 86400) return `منذ ${Math.floor(diff / 3600)} ساعة`;
    return `منذ ${Math.floor(diff / 86400)} يوم`;
  }

  // --- TOAST NOTIFICATIONS ---
  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type} animate-slide-in`;

    const iconMap = {
      success: '✓',
      warning: '⚠️',
      error: '✕',
      info: 'ℹ️'
    };

    toast.innerHTML = `
      <span class="toast-icon">${iconMap[type] || 'ℹ️'}</span>
      <span class="toast-text">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  openWhatsApp() {
    const text = encodeURIComponent(window.i18n.t('whatsapp_help_text'));
    window.open(`https://wa.me/966501234567?text=${text}`, '_blank');
  }

  toggleMobileMenu() {
    const nav = document.getElementById('mainNavLinks');
    if (nav) nav.classList.toggle('mobile-active');
  }
}

// Global App Instance
window.app = new App();

if (typeof document !== 'undefined' && document.addEventListener) {
  document.addEventListener('DOMContentLoaded', () => {
    window.app.init();
  });
}
