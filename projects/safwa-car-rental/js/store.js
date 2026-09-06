/**
 * Safwa Car Rental - State Manager & LocalStorage Persistence Store
 */

const STORAGE_KEYS = {
  CARS: 'safwa_cars_v2',
  BOOKINGS: 'safwa_bookings_v1',
  COUPONS: 'safwa_coupons_v1',
  FAVORITES: 'safwa_favorites_v1',
  USER_PROFILE: 'safwa_user_v1',
  CURRENT_SEARCH: 'safwa_search_v1',
  NOTIFICATIONS: 'safwa_notifications_v1',
  LANGUAGE: 'safwa_lang_v1'
};

class Store {
  constructor() {
    this.listeners = {};
    this.init();
  }

  init() {
    // Seed Cars if not already present or if stored list is old/smaller
    let storedCars = [];
    try {
      storedCars = JSON.parse(localStorage.getItem(STORAGE_KEYS.CARS)) || [];
    } catch {
      storedCars = [];
    }
    if (!storedCars || storedCars.length < 50) {
      if (typeof INITIAL_DATA !== 'undefined' && INITIAL_DATA.cars) {
        localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(INITIAL_DATA.cars));
      }
    }

    // Seed Bookings
    if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_DATA.initialBookings));
    }

    // Seed Coupons
    if (!localStorage.getItem(STORAGE_KEYS.COUPONS)) {
      localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(INITIAL_DATA.coupons));
    }

    // Seed User Profile
    if (!localStorage.getItem(STORAGE_KEYS.USER_PROFILE)) {
      const defaultUser = {
        name: 'عبدالرحمن الشهري',
        phone: '+966501234567',
        email: 'abdulrahman@example.com',
        idNumber: '1088492019',
        licenseNumber: 'DL-994821',
        age: 29
      };
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(defaultUser));
    }

    // Seed Favorites
    if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(['car-1', 'car-3']));
    }

    // Seed Initial Search State
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_SEARCH)) {
      const today = new Date();
      const returnDate = new Date();
      returnDate.setDate(today.getDate() + 3);

      const defaultSearch = {
        pickupLocationId: 'ruh-airport',
        returnLocationId: 'ruh-airport',
        pickupDate: this.formatDate(today),
        pickupTime: '10:00',
        returnDate: this.formatDate(returnDate),
        returnTime: '10:00',
        rentalDays: 3
      };
      localStorage.setItem(STORAGE_KEYS.CURRENT_SEARCH, JSON.stringify(defaultSearch));
    }

    // Seed Notifications
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      const initialNotifs = [
        {
          id: 'notif-1',
          titleAr: 'مرحباً بك في منصة الصفوة!',
          titleEn: 'Welcome to Safwa Car Rental!',
          messageAr: 'استمتع بخصم 15% على حجزك الأول باستخدام الكود SAFWA2026',
          messageEn: 'Enjoy 15% off your first reservation with code SAFWA2026',
          time: new Date().toISOString(),
          read: false,
          type: 'promo'
        },
        {
          id: 'notif-2',
          titleAr: 'تأكيد الحجز رقم SF-2026-9812',
          titleEn: 'Booking Confirmed SF-2026-9812',
          messageAr: 'سيارتك تويوتا كامري جاهزة للاستلام في مطار الملك خالد الدولي.',
          messageEn: 'Your Toyota Camry is scheduled for pickup at King Khalid Airport.',
          time: new Date(Date.now() - 3600000 * 20).toISOString(),
          read: true,
          type: 'booking'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(initialNotifs));
    }
  }

  formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // --- PubSub System ---
  subscribe(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    return () => {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    };
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => {
        try {
          cb(data);
        } catch (e) {
          console.error(`Error in subscriber for ${event}:`, e);
        }
      });
    }
  }

  // --- Cars CRUD ---
  getCars() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CARS)) || [];
    } catch {
      return INITIAL_DATA.cars;
    }
  }

  getCarById(id) {
    return this.getCars().find(c => c.id === id) || null;
  }

  saveCar(carData) {
    const cars = this.getCars();
    const index = cars.findIndex(c => c.id === carData.id);
    if (index >= 0) {
      cars[index] = { ...cars[index], ...carData };
    } else {
      carData.id = carData.id || 'car-' + Date.now();
      cars.unshift(carData);
    }
    localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(cars));
    this.emit('cars_updated', cars);
    return carData;
  }

  deleteCar(id) {
    let cars = this.getCars();
    cars = cars.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(cars));
    this.emit('cars_updated', cars);
  }

  updateCarStatus(id, newStatus) {
    const cars = this.getCars();
    const car = cars.find(c => c.id === id);
    if (car) {
      car.status = newStatus;
      localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(cars));
      this.emit('cars_updated', cars);
      return car;
    }
    return null;
  }

  // --- Branches & Static Config ---
  getBranches() {
    return INITIAL_DATA.branches;
  }

  getBranchById(id) {
    return INITIAL_DATA.branches.find(b => b.id === id) || INITIAL_DATA.branches[0];
  }

  getInsuranceTiers() {
    return INITIAL_DATA.insuranceTiers;
  }

  getInsuranceById(id) {
    return INITIAL_DATA.insuranceTiers.find(i => i.id === id) || INITIAL_DATA.insuranceTiers[0];
  }

  getAddOns() {
    return INITIAL_DATA.addOns;
  }

  // --- Search & Filter State ---
  getCurrentSearch() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_SEARCH)) || {};
    } catch {
      return {};
    }
  }

  saveCurrentSearch(searchParams) {
    const updated = { ...this.getCurrentSearch(), ...searchParams };
    localStorage.setItem(STORAGE_KEYS.CURRENT_SEARCH, JSON.stringify(updated));
    this.emit('search_updated', updated);
    return updated;
  }

  // --- Bookings CRUD ---
  getBookings() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS)) || [];
    } catch {
      return INITIAL_DATA.initialBookings;
    }
  }

  getBookingByNumber(bookingNumber) {
    return this.getBookings().find(b => b.bookingNumber === bookingNumber) || null;
  }

  addBooking(bookingData) {
    const bookings = this.getBookings();
    bookings.unshift(bookingData);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

    // Update car status to reserved or rented
    this.updateCarStatus(bookingData.carId, 'reserved');

    // Add notification
    this.addNotification({
      titleAr: `تم تأكيد حجزك رقم ${bookingData.bookingNumber}`,
      titleEn: `Reservation Confirmed #${bookingData.bookingNumber}`,
      messageAr: `تم استلام دفعتك بنجاح وحجز سيارتك (${bookingData.carName}). تفقد قسيمة الحجز.`,
      messageEn: `Payment received and car (${bookingData.carName}) reserved. Check your receipt.`,
      type: 'booking'
    });

    this.emit('bookings_updated', bookings);
    return bookingData;
  }

  updateBookingStatus(bookingNumber, newStatus, reason = '') {
    const bookings = this.getBookings();
    const b = bookings.find(item => item.bookingNumber === bookingNumber);
    if (b) {
      b.bookingStatus = newStatus;
      if (reason) b.statusChangeReason = reason;

      // Adjust car availability if booking is cancelled or completed
      if (newStatus === 'cancelled' || newStatus === 'completed') {
        this.updateCarStatus(b.carId, 'available');
      } else if (newStatus === 'active') {
        this.updateCarStatus(b.carId, 'rented');
      }

      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
      this.emit('bookings_updated', bookings);

      // Notification
      this.addNotification({
        titleAr: `تحديث حالة الحجز ${bookingNumber}`,
        titleEn: `Booking Status Update ${bookingNumber}`,
        messageAr: `أصبحت حالة حجزك الآن: ${this.getBookingStatusLabelAr(newStatus)}`,
        messageEn: `Your booking status is now: ${newStatus.toUpperCase()}`,
        type: 'status'
      });

      return b;
    }
    return null;
  }

  getBookingStatusLabelAr(status) {
    switch (status) {
      case 'pending': return 'قيد المراجعة';
      case 'confirmed': return 'مؤكد ومقبول';
      case 'active': return 'جاري الاستخدام / نشط';
      case 'completed': return 'مكتمل ومستلم';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  }

  // --- Coupons CRUD ---
  getCoupons() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.COUPONS)) || INITIAL_DATA.coupons;
    } catch {
      return INITIAL_DATA.coupons;
    }
  }

  addCoupon(coupon) {
    const coupons = this.getCoupons();
    coupons.unshift(coupon);
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
    this.emit('coupons_updated', coupons);
    return coupon;
  }

  deleteCoupon(code) {
    let coupons = this.getCoupons();
    coupons = coupons.filter(c => c.code.toUpperCase() !== code.toUpperCase());
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
    this.emit('coupons_updated', coupons);
  }

  validateCoupon(code, rentalDays = 1, baseAmount = 0) {
    if (!code) return { valid: false, messageAr: 'الرجاء إدخال رمز الكوبون', messageEn: 'Please enter a coupon code' };
    const cleanCode = code.trim().toUpperCase();
    const coupons = this.getCoupons();
    const coupon = coupons.find(c => c.code.toUpperCase() === cleanCode);

    if (!coupon) {
      return { valid: false, messageAr: 'رمز الكوبون غير صحيح أو غير موجود', messageEn: 'Invalid coupon code' };
    }

    if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
      return { valid: false, messageAr: 'عذراً، هذا الكوبون منتهي الصلاحية', messageEn: 'This coupon has expired' };
    }

    if (coupon.minRentalDays && rentalDays < coupon.minRentalDays) {
      return {
        valid: false,
        messageAr: `يتطلب هذا الكوبون حجز ${coupon.minRentalDays} أيام على الأقل`,
        messageEn: `This coupon requires a minimum of ${coupon.minRentalDays} rental days`
      };
    }

    let discount = 0;
    if (coupon.discountPercent) {
      discount = (baseAmount * coupon.discountPercent) / 100;
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else if (coupon.discountFixed) {
      discount = Math.min(coupon.discountFixed, baseAmount);
    }

    return {
      valid: true,
      coupon,
      discount: Math.round(discount * 100) / 100,
      messageAr: `تم تطبيق خصم الكوبون بنجاح!`,
      messageEn: `Coupon discount applied successfully!`
    };
  }

  // --- Favorites ---
  getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES)) || [];
    } catch {
      return [];
    }
  }

  isFavorite(carId) {
    return this.getFavorites().includes(carId);
  }

  toggleFavorite(carId) {
    let favs = this.getFavorites();
    const exists = favs.includes(carId);
    if (exists) {
      favs = favs.filter(id => id !== carId);
    } else {
      favs.push(carId);
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
    this.emit('favorites_updated', favs);
    return !exists;
  }

  // --- Notifications ---
  getNotifications() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) || [];
    } catch {
      return [];
    }
  }

  addNotification({ titleAr, titleEn, messageAr, messageEn, type = 'info' }) {
    const notifs = this.getNotifications();
    const item = {
      id: 'notif-' + Date.now(),
      titleAr,
      titleEn: titleEn || titleAr,
      messageAr,
      messageEn: messageEn || messageAr,
      time: new Date().toISOString(),
      read: false,
      type
    };
    notifs.unshift(item);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    this.emit('notifications_updated', notifs);
    return item;
  }

  markNotificationsRead() {
    const notifs = this.getNotifications();
    notifs.forEach(n => n.read = true);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    this.emit('notifications_updated', notifs);
  }

  // --- User Profile ---
  getUserProfile() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_PROFILE)) || {};
    } catch {
      return {};
    }
  }

  saveUserProfile(profile) {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    this.emit('user_updated', profile);
    return profile;
  }

  // Reset to factory seed (useful for testing)
  resetToDefaults() {
    localStorage.clear();
    this.init();
    window.location.reload();
  }
}

// Global Store Instance
if (typeof window !== 'undefined') {
  window.appStore = new Store();
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Store, STORAGE_KEYS };
}

