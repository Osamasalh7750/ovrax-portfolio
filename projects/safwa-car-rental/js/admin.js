/**
 * Safwa Car Rental - Admin Control Panel Controller (Light Minimal Design)
 * Fleet CRUD, live bookings management, coupons manager, and clean SVG analytics
 */

class AdminController {
  constructor() {
    this.currentTab = 'fleet'; // fleet, reservations, coupons, reports, customers
    this.statusFilter = 'all';
    this.editingCarId = null;
  }

  init() {
    this.renderStats();
    this.renderTabs();
    this.bindEvents();
  }

  bindEvents() {
    window.appStore.subscribe('cars_updated', () => {
      this.renderStats();
      if (this.currentTab === 'fleet') this.renderFleetTab();
    });

    window.appStore.subscribe('bookings_updated', () => {
      this.renderStats();
      if (this.currentTab === 'reservations') this.renderReservationsTab();
      if (this.currentTab === 'reports') this.renderReportsTab();
      if (this.currentTab === 'customers') this.renderCustomersTab();
    });

    window.appStore.subscribe('coupons_updated', () => {
      if (this.currentTab === 'coupons') this.renderCouponsTab();
    });
  }

  switchTab(tabName) {
    this.currentTab = tabName;
    document.querySelectorAll('.admin-nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.tab === tabName);
    });
    this.renderCurrentTab();
  }

  renderStats() {
    const cars = window.appStore.getCars();
    const bookings = window.appStore.getBookings();

    const totalRevenue = bookings
      .filter(b => b.bookingStatus !== 'cancelled')
      .reduce((sum, b) => sum + (b.finalPaidAmount || 0), 0);

    const activeCars = cars.filter(c => c.status === 'rented').length;
    const reservedCars = cars.filter(c => c.status === 'reserved').length;
    const occupancyRate = cars.length > 0 ? Math.round(((activeCars + reservedCars) / cars.length) * 100) : 0;

    const statRev = document.getElementById('adminStatRevenue');
    const statBook = document.getElementById('adminStatBookings');
    const statActive = document.getElementById('adminStatActive');
    const statOcc = document.getElementById('adminStatOccupancy');

    if (statRev) statRev.textContent = `${totalRevenue.toLocaleString()} ر.س`;
    if (statBook) statBook.textContent = bookings.length;
    if (statActive) statActive.textContent = `${activeCars} سيارة`;
    if (statOcc) statOcc.textContent = `${occupancyRate}%`;
  }

  renderTabs() {
    this.renderCurrentTab();
  }

  renderCurrentTab() {
    const container = document.getElementById('adminTabContent');
    if (!container) return;

    if (this.currentTab === 'fleet') {
      this.renderFleetTab();
    } else if (this.currentTab === 'reservations') {
      this.renderReservationsTab();
    } else if (this.currentTab === 'coupons') {
      this.renderCouponsTab();
    } else if (this.currentTab === 'reports') {
      this.renderReportsTab();
    } else if (this.currentTab === 'customers') {
      this.renderCustomersTab();
    }
  }

  // --- FLEET MANAGEMENT TAB ---
  renderFleetTab() {
    const container = document.getElementById('adminTabContent');
    if (!container) return;

    const cars = window.appStore.getCars();
    const isRtl = window.i18n.isRTL();
    const t = (k) => window.i18n.t(k);

    const filteredCars = this.statusFilter === 'all' 
      ? cars 
      : cars.filter(c => c.status === this.statusFilter);

    let html = `
      <div class="admin-panel-header">
        <div class="d-flex align-items-center gap-2 flex-wrap">
          <h3 style="font-weight:800;">🚗 ${isRtl ? 'إدارة أسطول المركبات' : 'Fleet Management'} (${cars.length})</h3>
          <div class="status-pill-filters">
            <button class="pill-btn ${this.statusFilter === 'all' ? 'active' : ''}" onclick="window.adminCtrl.filterFleet('all')">${isRtl ? 'الكل' : 'All'} (${cars.length})</button>
            <button class="pill-btn ${this.statusFilter === 'available' ? 'active' : ''}" onclick="window.adminCtrl.filterFleet('available')">🟢 ${isRtl ? 'متاحة' : 'Available'} (${cars.filter(c => c.status === 'available').length})</button>
            <button class="pill-btn ${this.statusFilter === 'rented' ? 'active' : ''}" onclick="window.adminCtrl.filterFleet('rented')">🔵 ${isRtl ? 'مؤجرة' : 'Rented'} (${cars.filter(c => c.status === 'rented').length})</button>
            <button class="pill-btn ${this.statusFilter === 'reserved' ? 'active' : ''}" onclick="window.adminCtrl.filterFleet('reserved')">🟡 ${isRtl ? 'محجوزة' : 'Reserved'} (${cars.filter(c => c.status === 'reserved').length})</button>
            <button class="pill-btn ${this.statusFilter === 'maintenance' ? 'active' : ''}" onclick="window.adminCtrl.filterFleet('maintenance')">🔴 ${isRtl ? 'صيانة' : 'Maintenance'} (${cars.filter(c => c.status === 'maintenance').length})</button>
          </div>
        </div>
        <button class="btn btn-primary" onclick="window.adminCtrl.openAddCarModal()">+ ${t('btn_add_car')}</button>
      </div>

      <div class="admin-table-responsive mt-3">
        <table class="admin-table">
          <thead>
            <tr>
              <th>المركبة</th>
              <th>اللوحة</th>
              <th>الفئة</th>
              <th>السعر اليومي</th>
              <th>العداد</th>
              <th>الحالة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            ${filteredCars.map(c => `
              <tr>
                <td>
                  <div class="table-car-cell">
                    <img src="${c.imageUrl}" class="table-thumb" alt="${c.name}" onerror="this.src='assets/car-placeholder.svg'">
                    <div>
                      <strong>${c.name}</strong> <span class="badge badge-subtle">${c.modelYear}</span>
                      <br><small class="text-muted">${c.brand}</small>
                    </div>
                  </div>
                </td>
                <td><span class="plate-badge">${c.plateNumber || '—'}</span></td>
                <td><span class="badge badge-brand">${c.categoryAr || c.category}</span></td>
                <td><strong>${c.dailyPrice}</strong> ر.س</td>
                <td>${(c.odometer || 0).toLocaleString()} كم</td>
                <td>
                  <select class="status-select" onchange="window.adminCtrl.changeCarStatus('${c.id}', this.value)">
                    <option value="available" ${c.status === 'available' ? 'selected' : ''}>🟢 متاحة</option>
                    <option value="rented" ${c.status === 'rented' ? 'selected' : ''}>🔵 مؤجرة</option>
                    <option value="reserved" ${c.status === 'reserved' ? 'selected' : ''}>🟡 محجوزة</option>
                    <option value="maintenance" ${c.status === 'maintenance' ? 'selected' : ''}>🔴 صيانة</option>
                  </select>
                </td>
                <td>
                  <div class="action-btn-group">
                    <button class="btn-icon" title="تعديل" onclick="window.adminCtrl.editCar('${c.id}')">✏️</button>
                    <button class="btn-icon text-danger" title="حذف" onclick="window.adminCtrl.confirmDeleteCar('${c.id}')">🗑️</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = html;
  }

  filterFleet(status) {
    this.statusFilter = status;
    this.renderFleetTab();
  }

  changeCarStatus(carId, newStatus) {
    window.appStore.updateCarStatus(carId, newStatus);
    window.app.showToast(`تم تغيير حالة السيارة إلى: ${newStatus.toUpperCase()}`, 'success');
  }

  confirmDeleteCar(carId) {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذه السيارة من الأسطول؟')) {
      window.appStore.deleteCar(carId);
      window.app.showToast('تم حذف السيارة من النظام بنجاح', 'info');
    }
  }

  openAddCarModal(car = null) {
    this.editingCarId = car ? car.id : null;
    const isEdit = !!car;

    const modalHtml = `
      <div class="modal-backdrop active" id="carCrudModal">
        <div class="modal-dialog animate-scale">
          <div class="modal-header">
            <h3>${isEdit ? 'تعديل بيانات المركبة' : 'إضافة سيارة جديدة للأسطول'}</h3>
            <button class="close-btn" onclick="window.adminCtrl.closeCarModal()">✕</button>
          </div>
          <div class="modal-body">
            <form id="carForm" onsubmit="window.adminCtrl.saveCarForm(event)">
              <div class="grid-2-col">
                <div class="form-group">
                  <label>اسم السيارة (بالعربية) *</label>
                  <input type="text" id="car_name" class="form-control" required value="${car?.name || ''}" placeholder="تويوتا كامري">
                </div>
                <div class="form-group">
                  <label>اسم السيارة (بالإنجليزية) *</label>
                  <input type="text" id="car_name_en" class="form-control" required value="${car?.nameEn || ''}" placeholder="Toyota Camry">
                </div>
              </div>

              <div class="grid-3-col mt-2">
                <div class="form-group">
                  <label>الشركة المصنعة *</label>
                  <input type="text" id="car_brand" class="form-control" required value="${car?.brand || 'Toyota'}">
                </div>
                <div class="form-group">
                  <label>سنة الصنع *</label>
                  <input type="number" id="car_year" class="form-control" required value="${car?.modelYear || 2025}">
                </div>
                <div class="form-group">
                  <label>الفئة *</label>
                  <select id="car_category" class="form-control">
                    <option value="sedan" ${car?.category === 'sedan' ? 'selected' : ''}>سيدان</option>
                    <option value="economy" ${car?.category === 'economy' ? 'selected' : ''}>اقتصادية</option>
                    <option value="suv" ${car?.category === 'suv' ? 'selected' : ''}>دفع رباعي وعائلية</option>
                    <option value="luxury" ${car?.category === 'luxury' ? 'selected' : ''}>فاخرة</option>
                    <option value="electric" ${car?.category === 'electric' ? 'selected' : ''}>كهربائية</option>
                  </select>
                </div>
              </div>

              <div class="grid-3-col mt-2">
                <div class="form-group">
                  <label>السعر اليومي (ريال) *</label>
                  <input type="number" id="car_price" class="form-control" required value="${car?.dailyPrice || 220}" min="50">
                </div>
                <div class="form-group">
                  <label>مبلغ التأمين المسترد (ريال) *</label>
                  <input type="number" id="car_deposit" class="form-control" required value="${car?.deposit || 1000}" min="0">
                </div>
                <div class="form-group">
                  <label>رقم اللوحة *</label>
                  <input type="text" id="car_plate" class="form-control" required value="${car?.plateNumber || 'أ ب ج 1234'}">
                </div>
              </div>

              <div class="grid-3-col mt-2">
                <div class="form-group">
                  <label>عدد المقاعد</label>
                  <input type="number" id="car_seats" class="form-control" value="${car?.seats || 5}" min="2" max="12">
                </div>
                <div class="form-group">
                  <label>ناقل الحركة</label>
                  <select id="car_trans" class="form-control">
                    <option value="automatic" ${car?.transmission === 'automatic' ? 'selected' : ''}>أوتوماتيك</option>
                    <option value="manual" ${car?.transmission === 'manual' ? 'selected' : ''}>يدوي</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>قراءة العداد (كم)</label>
                  <input type="number" id="car_odometer" class="form-control" value="${car?.odometer || 15000}">
                </div>
              </div>

              <div class="form-group mt-2">
                <label>رابط الصورة الرئيسية</label>
                <input type="url" id="car_image" class="form-control" value="${car?.imageUrl || 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=900&q=80'}">
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-outline" onclick="window.adminCtrl.closeCarModal()">إلغاء</button>
                <button type="submit" class="btn btn-primary">حفظ المركبة</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    const container = document.getElementById('adminModalContainer');
    if (container) container.innerHTML = modalHtml;
  }

  editCar(carId) {
    const car = window.appStore.getCarById(carId);
    if (car) this.openAddCarModal(car);
  }

  closeCarModal() {
    const modal = document.getElementById('carCrudModal');
    if (modal) modal.remove();
  }

  saveCarForm(event) {
    event.preventDefault();
    const existing = this.editingCarId ? window.appStore.getCarById(this.editingCarId) : {};

    const carData = {
      ...existing,
      id: this.editingCarId || 'car-' + Date.now(),
      name: document.getElementById('car_name').value.trim(),
      nameEn: document.getElementById('car_name_en').value.trim(),
      brand: document.getElementById('car_brand').value.trim(),
      modelYear: parseInt(document.getElementById('car_year').value, 10),
      category: document.getElementById('car_category').value,
      categoryAr: document.getElementById('car_category').selectedOptions[0].text,
      dailyPrice: parseFloat(document.getElementById('car_price').value),
      deposit: parseFloat(document.getElementById('car_deposit').value),
      plateNumber: document.getElementById('car_plate').value.trim(),
      seats: parseInt(document.getElementById('car_seats').value, 10),
      transmission: document.getElementById('car_trans').value,
      transmissionAr: document.getElementById('car_trans').value === 'automatic' ? 'أوتوماتيك' : 'يدوي',
      odometer: parseInt(document.getElementById('car_odometer').value, 10),
      imageUrl: document.getElementById('car_image').value.trim(),
      status: existing.status || 'available',
      rating: existing.rating || 4.9,
      reviewCount: existing.reviewCount || 1,
      doors: 4,
      luggage: 3,
      fuelType: 'بنزين 91',
      engine: '2.5L Standard',
      mileageLimit: 300,
      extraKmRate: 0.50,
      featuresAr: ['مكيف هواء قوي', 'بلوتوث وحساسات', 'كاميرا خلفية'],
      termsAr: 'العمر الأدنى 21 عاماً، رخصة قيادة سارية.'
    };

    window.appStore.saveCar(carData);
    this.closeCarModal();
    window.app.showToast('تم حفظ بيانات المركبة بنجاح!', 'success');
  }

  // --- RESERVATIONS MANAGEMENT TAB ---
  renderReservationsTab() {
    const container = document.getElementById('adminTabContent');
    if (!container) return;

    const bookings = window.appStore.getBookings();

    let html = `
      <div class="admin-panel-header">
        <h3 style="font-weight:800;">📑 إدارة الحجوزات والطلبات (${bookings.length})</h3>
      </div>

      <div class="admin-table-responsive mt-3">
        <table class="admin-table">
          <thead>
            <tr>
              <th>رقم الحجز</th>
              <th>العميل</th>
              <th>السيارة</th>
              <th>الفرع والتواريخ</th>
              <th>المبلغ المدفوع</th>
              <th>الدفع</th>
              <th>الحالة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            ${bookings.map(b => `
              <tr>
                <td><strong>${b.bookingNumber}</strong><br><small class="text-muted">${b.createdAt?.substring(0, 10) || ''}</small></td>
                <td>
                  <strong>${b.customerName}</strong><br>
                  <small class="text-muted">${b.customerPhone}</small>
                </td>
                <td><strong>${b.carName}</strong></td>
                <td>
                  <small>📍 ${b.pickupLocationName}</small><br>
                  <small>📅 ${b.pickupDate} (${b.rentalDays} أيام)</small>
                </td>
                <td><strong>${b.finalPaidAmount}</strong> ر.س</td>
                <td><span class="badge badge-subtle">${b.paymentMethod?.toUpperCase()}</span></td>
                <td>
                  <span class="booking-status-badge status-${b.bookingStatus}">
                    ${window.appStore.getBookingStatusLabelAr(b.bookingStatus)}
                  </span>
                </td>
                <td>
                  <div class="action-btn-group">
                    ${b.bookingStatus === 'pending' ? `
                      <button class="btn btn-sm btn-success" onclick="window.adminCtrl.updateBookingStatus('${b.bookingNumber}', 'confirmed')">قبول</button>
                    ` : ''}
                    ${b.bookingStatus === 'confirmed' ? `
                      <button class="btn btn-sm btn-primary" onclick="window.adminCtrl.updateBookingStatus('${b.bookingNumber}', 'active')">تسليم المفتاح</button>
                    ` : ''}
                    ${b.bookingStatus === 'active' ? `
                      <button class="btn btn-sm btn-outline" onclick="window.adminCtrl.updateBookingStatus('${b.bookingNumber}', 'completed')">استلام السيارة</button>
                    ` : ''}
                    ${b.bookingStatus !== 'cancelled' && b.bookingStatus !== 'completed' ? `
                      <button class="btn btn-sm btn-outline-danger" onclick="window.adminCtrl.updateBookingStatus('${b.bookingNumber}', 'cancelled')">إلغاء</button>
                    ` : ''}
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = html;
  }

  updateBookingStatus(bookingNumber, status) {
    window.appStore.updateBookingStatus(bookingNumber, status);
    window.app.showToast(`تم تحديث حالة الحجز ${bookingNumber} إلى ${status.toUpperCase()}`, 'success');
  }

  // --- CUSTOMERS TAB ---
  renderCustomersTab() {
    const container = document.getElementById('adminTabContent');
    if (!container) return;

    const bookings = window.appStore.getBookings();
    const uniqueCustomers = [];
    const map = new Set();

    bookings.forEach(b => {
      if (b.customerName && !map.has(b.customerName)) {
        map.add(b.customerName);
        uniqueCustomers.push({
          name: b.customerName,
          phone: b.customerPhone,
          idNumber: b.customerIdNumber,
          email: b.customerEmail,
          totalBookings: bookings.filter(x => x.customerName === b.customerName).length,
          lastBooking: b.bookingNumber
        });
      }
    });

    let html = `
      <div class="admin-panel-header">
        <h3 style="font-weight:800;">👥 قائمة العملاء المسجلين (${uniqueCustomers.length})</h3>
      </div>

      <div class="admin-table-responsive mt-3">
        <table class="admin-table">
          <thead>
            <tr>
              <th>اسم العميل</th>
              <th>رقم الجوال</th>
              <th>الهوية / الإقامة</th>
              <th>البريد الإلكتروني</th>
              <th>عدد الحجوزات</th>
              <th>آخر حجز</th>
            </tr>
          </thead>
          <tbody>
            ${uniqueCustomers.map(c => `
              <tr>
                <td><strong>${c.name}</strong></td>
                <td>${c.phone}</td>
                <td>${c.idNumber || '—'}</td>
                <td>${c.email || '—'}</td>
                <td><span class="badge badge-brand">${c.totalBookings}</span></td>
                <td><code>${c.lastBooking}</code></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = html;
  }

  // --- COUPONS TAB ---
  renderCouponsTab() {
    const container = document.getElementById('adminTabContent');
    if (!container) return;

    const coupons = window.appStore.getCoupons();

    let html = `
      <div class="admin-panel-header">
        <h3 style="font-weight:800;">🏷️ إدارة الكوبونات والعروض الترويجية</h3>
        <button class="btn btn-primary" onclick="window.adminCtrl.openAddCouponModal()">+ إنشاء كود خصم</button>
      </div>

      <div class="deals-grid mt-3">
        ${coupons.map(c => `
          <div class="deal-card">
            <div>
              <div class="deal-header">
                <span class="deal-code-pill">${c.code}</span>
                <span class="badge badge-gold">${c.discountPercent ? `${c.discountPercent}% خصم` : `${c.discountFixed} ريال`}</span>
              </div>
              <p class="text-muted small mt-2">${c.descriptionAr || ''}</p>
              <div class="d-flex justify-content-between text-muted small mt-3">
                <span>📅 ينتهي: ${c.validUntil || 'دائم'}</span>
                <span>⏱️ الحد الأدنى: ${c.minRentalDays || 1} أيام</span>
              </div>
            </div>
            <div class="mt-3 text-end">
              <button class="btn btn-sm btn-outline-danger" onclick="window.adminCtrl.deleteCoupon('${c.code}')">حذف الكود</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    container.innerHTML = html;
  }

  openAddCouponModal() {
    const modalHtml = `
      <div class="modal-backdrop active" id="couponModal">
        <div class="modal-dialog animate-scale">
          <div class="modal-header">
            <h3>إنشاء كود خصم جديد</h3>
            <button class="close-btn" onclick="document.getElementById('couponModal').remove()">✕</button>
          </div>
          <div class="modal-body">
            <form onsubmit="window.adminCtrl.saveCouponForm(event)">
              <div class="form-group">
                <label>رمز الكود *</label>
                <input type="text" id="new_coupon_code" class="form-control" required placeholder="SUMMER2026" style="text-transform:uppercase;">
              </div>
              <div class="grid-2-col mt-2">
                <div class="form-group">
                  <label>نسبة الخصم (%)</label>
                  <input type="number" id="new_coupon_percent" class="form-control" placeholder="15" min="1" max="90">
                </div>
                <div class="form-group">
                  <label>أو خصم ثابت (ريال)</label>
                  <input type="number" id="new_coupon_fixed" class="form-control" placeholder="100" min="10">
                </div>
              </div>
              <div class="grid-2-col mt-2">
                <div class="form-group">
                  <label>الحد الأدنى لأيام الإيجار</label>
                  <input type="number" id="new_coupon_days" class="form-control" value="2" min="1">
                </div>
                <div class="form-group">
                  <label>تاريخ نهاية الصلاحية</label>
                  <input type="date" id="new_coupon_expiry" class="form-control" value="2026-12-31">
                </div>
              </div>
              <div class="form-group mt-2">
                <label>الوصف بالعربية</label>
                <input type="text" id="new_coupon_desc" class="form-control" placeholder="خصم ترويجي للموسم">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline" onclick="document.getElementById('couponModal').remove()">إلغاء</button>
                <button type="submit" class="btn btn-primary">تفعيل الكوبون</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    const container = document.getElementById('adminModalContainer');
    if (container) container.innerHTML = modalHtml;
  }

  saveCouponForm(e) {
    e.preventDefault();
    const code = document.getElementById('new_coupon_code').value.trim().toUpperCase();
    const percent = parseInt(document.getElementById('new_coupon_percent').value, 10);
    const fixed = parseInt(document.getElementById('new_coupon_fixed').value, 10);
    const minDays = parseInt(document.getElementById('new_coupon_days').value, 10);
    const expiry = document.getElementById('new_coupon_expiry').value;
    const desc = document.getElementById('new_coupon_desc').value.trim();

    const newCoupon = {
      code,
      discountPercent: percent || null,
      discountFixed: (!percent && fixed) ? fixed : null,
      validUntil: expiry,
      minRentalDays: minDays,
      descriptionAr: desc || `كود خصم ${code}`
    };

    window.appStore.addCoupon(newCoupon);
    const modal = document.getElementById('couponModal');
    if (modal) modal.remove();
    window.app.showToast('تمت إضافة الكوبون بنجاح!', 'success');
  }

  deleteCoupon(code) {
    if (confirm(`هل تريد حذف الكود ${code}؟`)) {
      window.appStore.deleteCoupon(code);
      window.app.showToast('تم حذف الكود', 'info');
    }
  }

  // --- REPORTS TAB ---
  renderReportsTab() {
    const container = document.getElementById('adminTabContent');
    if (!container) return;

    const cars = window.appStore.getCars();

    let html = `
      <div class="admin-panel-header">
        <h3 style="font-weight:800;">📊 التقارير المالية ومعدل استخدام الأسطول</h3>
        <button class="btn btn-outline" onclick="window.print()">🖨️ طباعة التقرير</button>
      </div>

      <div class="grid-2-col mt-3">
        <!-- SVG Revenue Chart (Clean light styling) -->
        <div class="card p-4">
          <h4 style="font-weight:700;">مؤشر الإيرادات الأسبوعية (ألف ريال)</h4>
          <div class="chart-container mt-3">
            ${this.generateRevenueChartSvg()}
          </div>
        </div>

        <!-- Category Breakdown -->
        <div class="card p-4">
          <h4 style="font-weight:700;">توزيع الأسطول حسب الفئات</h4>
          <div class="category-breakdown-list mt-3">
            ${['sedan', 'suv', 'luxury', 'economy', 'electric'].map(cat => {
              const count = cars.filter(c => c.category === cat).length;
              const pct = Math.round((count / cars.length) * 100) || 0;
              const labelMap = { sedan: 'سيدان', suv: 'دفع رباعي', luxury: 'فاخرة', economy: 'اقتصادية', electric: 'كهربائية' };
              return `
                <div class="cat-bar-item mb-3">
                  <div class="d-flex justify-content-between mb-1 small">
                    <strong>${labelMap[cat] || cat} (${count} سيارات)</strong>
                    <span class="text-muted">${pct}%</span>
                  </div>
                  <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${pct}%"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  // Pure SVG Line & Bar chart in clean light palette
  generateRevenueChartSvg() {
    return `
      <svg viewBox="0 0 500 200" class="svg-chart" style="width:100%; height:200px; overflow:visible;">
        <line x1="40" y1="20" x2="40" y2="160" stroke="#cbd5e1" stroke-width="1" />
        <line x1="40" y1="160" x2="480" y2="160" stroke="#cbd5e1" stroke-width="1" />
        
        <!-- Grid lines -->
        <line x1="40" y1="120" x2="480" y2="120" stroke="#f1f5f9" stroke-dasharray="4" />
        <line x1="40" y1="80" x2="480" y2="80" stroke="#f1f5f9" stroke-dasharray="4" />
        <line x1="40" y1="40" x2="480" y2="40" stroke="#f1f5f9" stroke-dasharray="4" />

        <!-- Bars (Obsidian & Emerald) -->
        <rect x="70" y="80" width="35" height="80" fill="#0f172a" rx="4" />
        <text x="87" y="180" fill="#64748b" font-size="11" text-anchor="middle">السبت</text>
        <text x="87" y="70" fill="#0f172a" font-weight="700" font-size="10" text-anchor="middle">3.2k</text>

        <rect x="135" y="60" width="35" height="100" fill="#0f172a" rx="4" />
        <text x="152" y="180" fill="#64748b" font-size="11" text-anchor="middle">الأحد</text>
        <text x="152" y="50" fill="#0f172a" font-weight="700" font-size="10" text-anchor="middle">4.8k</text>

        <rect x="200" y="45" width="35" height="115" fill="#0f172a" rx="4" />
        <text x="217" y="180" fill="#64748b" font-size="11" text-anchor="middle">الإثنين</text>
        <text x="217" y="35" fill="#0f172a" font-weight="700" font-size="10" text-anchor="middle">5.9k</text>

        <rect x="265" y="70" width="35" height="90" fill="#0f172a" rx="4" />
        <text x="282" y="180" fill="#64748b" font-size="11" text-anchor="middle">الثلاثاء</text>
        <text x="282" y="60" fill="#0f172a" font-weight="700" font-size="10" text-anchor="middle">4.1k</text>

        <rect x="330" y="30" width="35" height="130" fill="#0f172a" rx="4" />
        <text x="347" y="180" fill="#64748b" font-size="11" text-anchor="middle">الأربعاء</text>
        <text x="347" y="20" fill="#0f172a" font-weight="700" font-size="10" text-anchor="middle">7.4k</text>

        <rect x="395" y="15" width="35" height="145" fill="#16a34a" rx="4" />
        <text x="412" y="180" fill="#64748b" font-size="11" text-anchor="middle">الخميس</text>
        <text x="412" y="10" fill="#16a34a" font-weight="700" font-size="10" text-anchor="middle">9.2k</text>
      </svg>
    `;
  }
}

window.adminCtrl = new AdminController();
