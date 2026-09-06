/* ==========================================================================
   BOOKING-ENGINE.JS - محرك الحجوزات الذكي، حاسبة الأسعار الديناميكية،
   تقويم التوافر الفوري، استوديو الديكور المخصص، وبوابة الدفع الإلكتروني
   ========================================================================== */

(function () {
  'use strict';

  // الحالة العامة للحجز (Booking State)
  window.BookingState = {
    selectedVenueId: 'v1',
    venueName: 'شاليه وقصر الفخامة VIP (الدرعية)',
    basePrice: 3800,
    eventType: 'wedding', // wedding, engagement, graduation, birthday, corporate
    eventTypeMultiplier: 1500,
    guestCount: 80,
    guestPricePerHead: 45, // ريال لكل ضيف للضيافة الأساسية والمقاعد
    slot: 'evening', // morning, evening, fullday
    slotMultiplier: 1.0, // morning: 0.8, evening: 1.0, fullday: 1.5
    selectedDate: '2026-09-15',
    amenities: {
      soundSystem: true,
      ac: true,
      openBuffet: false,
      koshaFlowers: true,
      laserSmoke: false,
      hospitalityStaff: true
    },
    customDecorTheme: 'royal-gold',
    customNotes: '',
    paymentMethod: 'mada',
    subtotal: 0,
    vat: 0,
    deposit: 1000,
    total: 0
  };

  // قائمة الأيام المحجوزة مسبقاً لشهر سبتمبر 2026 (Occupied Dates)
  const occupiedDates = [
    '2026-09-02', '2026-09-05', '2026-09-08', '2026-09-11',
    '2026-09-12', '2026-09-18', '2026-09-19', '2026-09-25'
  ];

  // تسعيرة الخدمات الإضافية
  const amenityPrices = {
    soundSystem: 650,
    ac: 0, // مشمول مجاناً
    openBuffet: 2800,
    koshaFlowers: 1400,
    laserSmoke: 550,
    hospitalityStaff: 800
  };

  // معامِلات الفعاليات
  const eventTypesData = {
    wedding: { name: 'حفل زفاف ملكي', extra: 1500, desc: 'تجهيزات كوشة خاصة، ممر العروس، إضاءة متابعة' },
    engagement: { name: 'حفل خطوبة وملكة', extra: 1000, desc: 'طاولات استقبال فاخرة، زينة مدخل، خلفيات تصوير' },
    graduation: { name: 'حفل تخرج وتفوق', extra: 700, desc: 'مسرح تكريم، شاشة عرض، بوابات بالونات' },
    birthday: { name: 'عيد ميلاد وسهرة خاصة', extra: 500, desc: 'ديكورات ثيم مخصصة، إضاءات حفلات هادئة' },
    corporate: { name: 'لقاء عمل واجتماع VIP', extra: 900, desc: 'شاشات عرض بروجيكتور، ضيافة قهوة مختصة' }
  };

  // 1. حساب السعر الديناميكي
  window.calculateDynamicPrice = function () {
    const s = window.BookingState;
    
    // السعر الأساسي بحسب الفترة
    let slotFactor = 1.0;
    if (s.slot === 'morning') slotFactor = 0.8;
    else if (s.slot === 'fullday') slotFactor = 1.6;
    
    const venueAdjustedBase = s.basePrice * slotFactor;

    // تكلفة نوع الفعالية
    const eventExtra = eventTypesData[s.eventType] ? eventTypesData[s.eventType].extra : 500;
    
    // تكلفة الحضور (ضيافة، تجهيز طاولات، مقاعد)
    const guestsCost = s.guestCount * s.guestPricePerHead;

    // تكلفة الخدمات الإضافية المختارة
    let amenitiesTotal = 0;
    for (const [key, isSelected] of Object.entries(s.amenities)) {
      if (isSelected && amenityPrices[key]) {
        amenitiesTotal += amenityPrices[key];
      }
    }

    // تكلفة الأصناف والمنتجات المختارة من متجر التجهيزات (21 صنفاً)
    const catalogExtras = s.catalogExtrasTotal || 0;

    // مجموع ما قبل الضريبة
    s.subtotal = venueAdjustedBase + eventExtra + guestsCost + amenitiesTotal + catalogExtras;
    // ضريبة القيمة المضافة 15%
    s.vat = Math.round(s.subtotal * 0.15);
    // التأمين المسترد
    s.deposit = 1000;
    // المجموع النهائي المطلوب سداده
    s.total = s.subtotal + s.vat + s.deposit;

    // تحديث الواجهة التفاعلية
    updateReceiptUI();
  };

  // 2. تحديث عناصر الفاتورة التفاعلية على الشاشة
  function updateReceiptUI() {
    const s = window.BookingState;

    const elSubtotal = document.getElementById('calc-subtotal');
    const elVat = document.getElementById('calc-vat');
    const elDeposit = document.getElementById('calc-deposit');
    const elTotal = document.getElementById('calc-total');
    const elGuestCountText = document.getElementById('guest-count-display');
    const elTamaraInstallment = document.getElementById('tamara-installment-amt');

    if (elSubtotal) elSubtotal.textContent = s.subtotal.toLocaleString('ar-SA') + ' ر.س';
    if (elVat) elVat.textContent = s.vat.toLocaleString('ar-SA') + ' ر.س';
    if (elDeposit) elDeposit.textContent = s.deposit.toLocaleString('ar-SA') + ' ر.س';
    if (elTotal) elTotal.textContent = s.total.toLocaleString('ar-SA') + ' ر.س';
    if (elGuestCountText) elGuestCountText.textContent = s.guestCount + ' ضيف';
    if (elTamaraInstallment) {
      const perMonth = Math.round(s.total / 4);
      elTamaraInstallment.textContent = perMonth.toLocaleString('ar-SA') + ' ر.س';
    }

    // تحديث تفاصيل الفعالية في الملخص
    const elEventBadge = document.getElementById('receipt-event-badge');
    if (elEventBadge && eventTypesData[s.eventType]) {
      elEventBadge.textContent = eventTypesData[s.eventType].name;
    }

    // تحديث قيمة إضافات متجر التجهيزات
    const elCatalogRow = document.getElementById('calc-catalog-extras-row');
    const elCatalogVal = document.getElementById('calc-catalog-extras-val');
    if (elCatalogRow && elCatalogVal) {
      const extras = s.catalogExtrasTotal || 0;
      if (extras > 0) {
        elCatalogRow.style.display = 'flex';
        elCatalogVal.textContent = extras.toLocaleString('ar-SA') + ' ر.س';
      } else {
        elCatalogRow.style.display = 'none';
      }
    }
  }

  // 3. بناء التقويم التفاعلي ومعرفة القاعات المحجوزة مسبقاً
  window.renderAvailabilityCalendar = function (year = 2026, month = 9) {
    const calendarGrid = document.getElementById('calendar-days-grid');
    if (!calendarGrid) return;

    calendarGrid.innerHTML = '';

    // حساب عدد أيام الشهر وأول يوم
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayIndex = new Date(year, month - 1, 1).getDay(); // 0=Sunday, etc.

    // تعبئة الفراغات الأولى
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'cal-day empty';
      calendarGrid.appendChild(emptyCell);
    }

    // تعبئة أيام الشهر
    for (let day = 1; day <= daysInMonth; day++) {
      const dayStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayCell = document.createElement('div');
      dayCell.className = 'cal-day';
      dayCell.textContent = day;

      // فحص هل اليوم محجوز مسبقاً
      if (occupiedDates.includes(dayStr)) {
        dayCell.classList.add('booked');
        dayCell.title = 'محجوز مسبقاً - غير متاح';
      } else {
        dayCell.classList.add('available');
        if (dayStr === window.BookingState.selectedDate) {
          dayCell.classList.add('selected');
        }

        dayCell.addEventListener('click', () => {
          document.querySelectorAll('.cal-day.selected').forEach(el => el.classList.remove('selected'));
          dayCell.classList.add('selected');
          window.BookingState.selectedDate = dayStr;
          
          const dateNotice = document.getElementById('selected-date-preview');
          if (dateNotice) {
            dateNotice.textContent = `تاريخ الحجز المختار: ${dayStr} (متاح ومؤكد)`;
          }

          if (window.showAppNotification) {
            window.showAppNotification(`تم اختيار التاريخ: ${dayStr}`, 'success');
          }
        });
      }

      calendarGrid.appendChild(dayCell);
    }
  };

  // 4. تهيئة أحداث الحاسبة والحجز
  function initBookingControls() {
    // شريط تمرير عدد الضيوف
    const guestSlider = document.getElementById('guest-range-slider');
    if (guestSlider) {
      guestSlider.addEventListener('input', (e) => {
        window.BookingState.guestCount = parseInt(e.target.value, 10);
        window.calculateDynamicPrice();
      });
    }

    // نوع الفعالية
    const eventTypeSelect = document.getElementById('event-type-select');
    if (eventTypeSelect) {
      eventTypeSelect.addEventListener('change', (e) => {
        window.BookingState.eventType = e.target.value;
        window.calculateDynamicPrice();
      });
    }

    // اختيار الفترة (صباحي / مسائي / يوم كامل)
    document.querySelectorAll('.slot-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        window.BookingState.slot = e.currentTarget.dataset.slot;
        window.calculateDynamicPrice();
      });
    });

    // مربعات الخدمات الإضافية
    document.querySelectorAll('.amenity-checkbox').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const amenityKey = e.target.dataset.amenity;
        if (amenityKey && window.BookingState.amenities.hasOwnProperty(amenityKey)) {
          window.BookingState.amenities[amenityKey] = e.target.checked;
          window.calculateDynamicPrice();
        }
      });
    });

    // اختيار ثيم الديكور المخصص
    document.querySelectorAll('.theme-option-card').forEach(card => {
      card.addEventListener('click', (e) => {
        document.querySelectorAll('.theme-option-card').forEach(c => c.classList.remove('selected'));
        e.currentTarget.classList.add('selected');
        window.BookingState.customDecorTheme = e.currentTarget.dataset.theme;
        if (window.showAppNotification) {
          window.showAppNotification('تم اختيار ثيم الديكور: ' + e.currentTarget.dataset.themename, 'info');
        }
      });
    });

    // زر الحجز المباشر وفتح بوابة الدفع
    const directBookBtn = document.getElementById('btn-open-checkout');
    if (directBookBtn) {
      directBookBtn.addEventListener('click', () => {
        openPaymentModal();
      });
    }

    // بطاقات طرق الدفع
    document.querySelectorAll('.payment-method-card').forEach(card => {
      card.addEventListener('click', (e) => {
        document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');
        window.BookingState.paymentMethod = e.currentTarget.dataset.method;
        
        // إظهار أو إخفاء حقول بطاقة الائتمان
        const cardFields = document.getElementById('card-input-fields');
        const applePayBox = document.getElementById('apple-pay-box');
        if (cardFields && applePayBox) {
          if (e.currentTarget.dataset.method === 'applepay') {
            cardFields.style.display = 'none';
            applePayBox.style.display = 'block';
          } else {
            cardFields.style.display = 'block';
            applePayBox.style.display = 'none';
          }
        }
      });
    });

    // نموذج تأكيد الدفع
    const paymentForm = document.getElementById('payment-checkout-form');
    if (paymentForm) {
      paymentForm.addEventListener('submit', handlePaymentSubmit);
    }
  }

  // 5. نافذة بوابة الدفع الإلكتروني
  function openPaymentModal() {
    const modal = document.getElementById('payment-modal');
    if (!modal) return;

    // تحديث المبلغ النهائي في زر الدفع
    const payBtnAmount = document.getElementById('pay-now-btn-amount');
    if (payBtnAmount) {
      payBtnAmount.textContent = window.BookingState.total.toLocaleString('ar-SA') + ' ر.س';
    }

    modal.classList.add('active');
  }

  window.closePaymentModal = function () {
    const modal = document.getElementById('payment-modal');
    if (modal) modal.classList.remove('active');
  };

  // 6. معالجة الدفع وتوليد الحجز والإشعار الفوري
  function handlePaymentSubmit(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('btn-confirm-payment');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري تأكيد الدفع عبر البنك...';
    }

    // محاكاة الاتصال الآمن مع بوابة الدفع الإلكتروني
    setTimeout(() => {
      // رقم مرجعي للحجز
      const bookingRef = 'ATH-' + Math.floor(100000 + Math.random() * 900000);
      const clientName = document.getElementById('card-holder-name')?.value || 'ضيف أثير VIP';
      const clientPhone = document.getElementById('client-phone-input')?.value || '0568009474';

      const bookingRecord = {
        ref: bookingRef,
        createdAt: new Date().toISOString(),
        clientName: clientName,
        clientPhone: clientPhone,
        venueName: window.BookingState.venueName,
        eventType: eventTypesData[window.BookingState.eventType]?.name || 'حفل خاص',
        date: window.BookingState.selectedDate,
        slot: window.BookingState.slot === 'evening' ? 'فترة مسائية (5 م - 2 ص)' : (window.BookingState.slot === 'morning' ? 'فترة صباحية (9 ص - 3 م)' : 'يوم كامل 24 ساعة'),
        guestCount: window.BookingState.guestCount,
        subtotal: window.BookingState.subtotal,
        vat: window.BookingState.vat,
        deposit: window.BookingState.deposit,
        total: window.BookingState.total,
        status: 'مؤكد والفعالية قيد التنسيق',
        step: 2, // 1: تم الحجز، 2: جاري التنسيق، 3: تجهيز الديكور، 4: جاهز للاستقبال، 5: مكتمل
        paymentMethod: window.BookingState.paymentMethod
      };

      // حفظ الحجز في localStorage للاستخدام في الفاتورة ولوحة الإدارة
      localStorage.setItem('latest_booking', JSON.stringify(bookingRecord));
      
      // إضافة الحجز إلى قائمة حجوزات الإدارة
      let allBookings = JSON.parse(localStorage.getItem('all_bookings') || '[]');
      allBookings.unshift(bookingRecord);
      localStorage.setItem('all_bookings', JSON.stringify(allBookings));

      // إغلاق نافذة الدفع
      window.closePaymentModal();

      // تشغيل تأثير الاحتفال (Confetti)
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      // إظهار نافذة التأكيد الفوري الشاملة
      showConfirmationModal(bookingRecord);

      // إشعار فوري
      if (window.showAppNotification) {
        window.showAppNotification(`🎉 تم تأكيد حجزك بنجاح برقم مرجعي: ${bookingRef}`, 'success');
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-lock"></i> إتمام الدفع الآمن';
      }
    }, 1500);
  }

  // 7. نافذة تأكيد الحجز والتقرير الختامي الفوري
  function showConfirmationModal(booking) {
    const modal = document.getElementById('confirmation-modal');
    if (!modal) {
      alert(`تم تأكيد حجزك بنجاح!\nالرقم المرجعي: ${booking.ref}\nالقاعة: ${booking.venueName}\nالتاريخ: ${booking.date}`);
      window.location.href = 'invoice.html';
      return;
    }

    const refEl = document.getElementById('conf-booking-ref');
    const venueEl = document.getElementById('conf-venue-name');
    const dateEl = document.getElementById('conf-date');
    const totalEl = document.getElementById('conf-total');

    if (refEl) refEl.textContent = booking.ref;
    if (venueEl) venueEl.textContent = booking.venueName;
    if (dateEl) dateEl.textContent = `${booking.date} (${booking.slot})`;
    if (totalEl) totalEl.textContent = booking.total.toLocaleString('ar-SA') + ' ر.س';

    modal.classList.add('active');
  }

  window.closeConfirmationModal = function () {
    const modal = document.getElementById('confirmation-modal');
    if (modal) modal.classList.remove('active');
  };

  // تهيئة عند اكتمال الصفحة
  document.addEventListener('DOMContentLoaded', () => {
    window.renderAvailabilityCalendar(2026, 9);
    initBookingControls();
    window.calculateDynamicPrice();
  });

})();
