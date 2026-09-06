/**
 * Safwa Car Rental - Booking Engine, Transparent Calculation, Checkout Wizard & Payment Simulator
 */

class BookingEngine {
  constructor() {
    this.currentStep = 1;
    this.bookingState = {
      car: null,
      rentalDays: 3,
      pickupBranchId: 'ruh-airport',
      returnBranchId: 'ruh-airport',
      pickupDate: '',
      pickupTime: '10:00',
      returnDate: '',
      returnTime: '10:00',
      selectedInsuranceId: 'basic',
      selectedAddOns: [],
      appliedCoupon: null,
      couponDiscount: 0,
      customer: {},
      paymentMethod: 'mada',
      pricing: {}
    };
  }

  // Calculate pricing breakdown with 100% transparency
  calculatePricing(params = {}) {
    const car = params.car || this.bookingState.car;
    if (!car) return null;

    const days = Math.max(1, params.rentalDays || this.bookingState.rentalDays || 1);
    const pickupId = params.pickupBranchId || this.bookingState.pickupBranchId;
    const returnId = params.returnBranchId || this.bookingState.returnBranchId;
    const insuranceId = params.selectedInsuranceId || this.bookingState.selectedInsuranceId || 'basic';
    const selectedAddOns = params.selectedAddOns || this.bookingState.selectedAddOns || [];
    const couponCode = params.couponCode !== undefined ? params.couponCode : (this.bookingState.appliedCoupon?.code || null);

    // 1. Base car rent
    const baseDailyPrice = car.dailyPrice;
    let baseTotal = baseDailyPrice * days;

    // Apply weekly discount if 7+ days
    let durationDiscount = 0;
    if (days >= 7 && car.weeklyDiscount) {
      durationDiscount = Math.round((baseTotal * car.weeklyDiscount) / 100);
      baseTotal -= durationDiscount;
    }

    // 2. Inter-branch drop-off fee
    let interBranchFee = 0;
    if (pickupId && returnId && pickupId !== returnId) {
      interBranchFee = 150; // Standard inter-branch logistics fee
    }

    // 3. Insurance
    const insurance = window.appStore.getInsuranceById(insuranceId);
    const insuranceCost = (insurance ? insurance.pricePerDay : 0) * days;

    // 4. Add-ons
    const allAddOns = window.appStore.getAddOns();
    let addOnsCost = 0;
    const addOnsDetails = [];
    selectedAddOns.forEach(addonId => {
      const item = allAddOns.find(a => a.id === addonId);
      if (item) {
        const itemTotal = item.pricePerDay * days;
        addOnsCost += itemTotal;
        addOnsDetails.push({
          id: item.id,
          nameAr: item.nameAr,
          nameEn: item.nameEn,
          dailyPrice: item.pricePerDay,
          totalPrice: itemTotal
        });
      }
    });

    // 5. Subtotal before coupon & tax
    const grossSubtotal = baseTotal + interBranchFee + insuranceCost + addOnsCost;

    // 6. Coupon Discount
    let couponDiscount = 0;
    let couponObj = null;
    if (couponCode) {
      const validation = window.appStore.validateCoupon(couponCode, days, grossSubtotal);
      if (validation.valid) {
        couponDiscount = validation.discount;
        couponObj = validation.coupon;
      }
    }

    const netSubtotal = Math.max(0, grossSubtotal - couponDiscount);

    // 7. Value Added Tax (VAT 15% in KSA)
    const vatRate = 0.15;
    const vatAmount = Math.round((netSubtotal * vatRate) * 100) / 100;

    // 8. Net payable now
    const finalPaidAmount = Math.round((netSubtotal + vatAmount) * 100) / 100;

    // 9. Refundable Security Deposit
    const refundableDeposit = car.deposit || 1000;

    const pricingResult = {
      rentalDays: days,
      baseDailyPrice,
      durationDiscount,
      baseTotal,
      interBranchFee,
      insurance,
      insuranceCost,
      addOnsCost,
      addOnsDetails,
      grossSubtotal,
      couponDiscount,
      couponObj,
      netSubtotal,
      vatRate,
      vatAmount,
      finalPaidAmount,
      refundableDeposit
    };

    this.bookingState.pricing = pricingResult;
    return pricingResult;
  }

  // Open booking modal for a specific vehicle
  startBooking(carId) {
    const car = window.appStore.getCarById(carId);
    if (!car) {
      window.app.showToast('عذراً، تعذر العثور على بيانات السيارة', 'error');
      return;
    }

    if (car.status !== 'available') {
      window.app.showToast(window.i18n.isRTL() ? 'هذه السيارة غير متاحة للحجز حالياً' : 'This car is not currently available for booking', 'warning');
      return;
    }

    // Load current search parameters
    const search = window.appStore.getCurrentSearch();
    const user = window.appStore.getUserProfile();

    this.bookingState = {
      car,
      rentalDays: search.rentalDays || 3,
      pickupBranchId: search.pickupLocationId || 'ruh-airport',
      returnBranchId: search.returnLocationId || 'ruh-airport',
      pickupDate: search.pickupDate || this.getFutureDateStr(0),
      pickupTime: search.pickupTime || '10:00',
      returnDate: search.returnDate || this.getFutureDateStr(3),
      returnTime: search.returnTime || '10:00',
      selectedInsuranceId: 'comprehensive', // default to comprehensive
      selectedAddOns: [],
      appliedCoupon: null,
      couponDiscount: 0,
      customer: {
        name: user.name || '',
        phone: user.phone || '+9665',
        idNumber: user.idNumber || '',
        email: user.email || '',
        licenseNumber: user.licenseNumber || '',
        age: user.age || 28,
        notes: ''
      },
      paymentMethod: 'mada',
      pricing: {}
    };

    this.calculatePricing();
    this.currentStep = 1;
    this.renderModal();
    const modal = document.getElementById('bookingModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
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

  closeModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  goToStep(step) {
    if (step < 1 || step > 6) return;
    
    // Step validation
    if (step > this.currentStep) {
      if (this.currentStep === 3) {
        if (!this.validateStep3()) return;
      }
    }

    this.currentStep = step;
    this.renderModal();
  }

  validateStep3() {
    const nameInput = document.getElementById('cust_name');
    const phoneInput = document.getElementById('cust_phone');
    const idInput = document.getElementById('cust_id');
    const emailInput = document.getElementById('cust_email');
    const ageInput = document.getElementById('cust_age');
    const licenseInput = document.getElementById('cust_license');

    const isRtl = window.i18n.isRTL();

    if (!nameInput?.value.trim()) {
      window.app.showToast(isRtl ? 'الرجاء إدخال الاسم الكامل' : 'Please enter full name', 'warning');
      nameInput?.focus();
      return false;
    }
    if (!phoneInput?.value.trim() || phoneInput.value.length < 9) {
      window.app.showToast(isRtl ? 'الرجاء إدخال رقم هاتف صحيح' : 'Please enter valid phone number', 'warning');
      phoneInput?.focus();
      return false;
    }
    if (!idInput?.value.trim()) {
      window.app.showToast(isRtl ? 'الرجاء إدخال رقم الهوية أو الإقامة' : 'Please enter ID or Iqama number', 'warning');
      idInput?.focus();
      return false;
    }

    // Save into state
    this.bookingState.customer = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      idNumber: idInput.value.trim(),
      email: emailInput?.value.trim() || '',
      licenseNumber: licenseInput?.value.trim() || '',
      age: parseInt(ageInput?.value || 25, 10),
      notes: document.getElementById('cust_notes')?.value.trim() || ''
    };

    // Save to user store for convenience
    window.appStore.saveUserProfile(this.bookingState.customer);
    return true;
  }

  renderModal() {
    const content = document.getElementById('bookingModalContent');
    if (!content) return;

    const isRtl = window.i18n.isRTL();
    const t = (k, r) => window.i18n.t(k, r);
    const pricing = this.calculatePricing();
    const car = this.bookingState.car;
    const branches = window.appStore.getBranches();
    const pickupBranch = branches.find(b => b.id === this.bookingState.pickupBranchId) || branches[0];
    const returnBranch = branches.find(b => b.id === this.bookingState.returnBranchId) || branches[0];

    // Stepper header HTML
    const steps = [
      { num: 1, label: t('step_1') },
      { num: 2, label: t('step_2') },
      { num: 3, label: t('step_3') },
      { num: 4, label: t('step_4') },
      { num: 5, label: t('step_5') },
      { num: 6, label: t('step_6') }
    ];

    let stepperHtml = `
      <div class="booking-stepper">
        ${steps.map(s => `
          <div class="stepper-item ${this.currentStep === s.num ? 'active' : ''} ${this.currentStep > s.num ? 'completed' : ''}">
            <div class="step-circle">${this.currentStep > s.num ? '✓' : s.num}</div>
            <div class="step-title">${s.label}</div>
          </div>
        `).join('')}
      </div>
    `;

    // Step Body HTML
    let stepBodyHtml = '';

    // --- STEP 1: CAR & TRIP SUMMARY ---
    if (this.currentStep === 1) {
      stepBodyHtml = `
        <div class="step-panel animate-fade">
          <div class="car-summary-header">
            <img src="${car.imageUrl}" alt="${car.name}" class="step-car-img" onerror="this.src='assets/car-placeholder.svg'">
            <div class="car-info">
              <span class="badge badge-brand">${car.brand}</span>
              <h3>${isRtl ? car.name : car.nameEn} <span class="text-muted">(${car.modelYear})</span></h3>
              <div class="quick-specs-row">
                <span>💺 ${car.seats} ${t('seats_label')}</span>
                <span>⚙️ ${isRtl ? car.transmissionAr : car.transmissionEn}</span>
                <span>⛽ ${isRtl ? car.fuelType : car.fuelTypeEn}</span>
                <span>🧳 ${car.luggage} ${t('luggage_label')}</span>
              </div>
              <div class="price-highlight">
                <span class="num">${car.dailyPrice}</span> ${t('per_day')}
              </div>
            </div>
          </div>

          <div class="card bg-surface trip-details-card mt-3">
            <h4 class="card-title">📍 ${isRtl ? 'تفاصيل ومواعيد الرحلة' : 'Trip Locations & Schedule'}</h4>
            <div class="grid-2-col">
              <div class="form-group">
                <label>${t('search_pickup_location')}</label>
                <select id="step1_pickup" class="form-control" onchange="window.bookingEngine.updateBranch('pickup', this.value)">
                  ${branches.map(b => `<option value="${b.id}" ${b.id === this.bookingState.pickupBranchId ? 'selected' : ''}>${isRtl ? b.nameAr : b.nameEn}</option>`).join('')}
                </select>
              </div>
              <div class="form-group">
                <label>${t('search_return_location')}</label>
                <select id="step1_return" class="form-control" onchange="window.bookingEngine.updateBranch('return', this.value)">
                  ${branches.map(b => `<option value="${b.id}" ${b.id === this.bookingState.returnBranchId ? 'selected' : ''}>${isRtl ? b.nameAr : b.nameEn}</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="grid-2-col">
              <div class="form-group">
                <label>${t('search_pickup_date')}</label>
                <input type="date" id="step1_pdate" class="form-control" value="${this.bookingState.pickupDate}" onchange="window.bookingEngine.updateDates()">
              </div>
              <div class="form-group">
                <label>${t('search_return_date')}</label>
                <input type="date" id="step1_rdate" class="form-control" value="${this.bookingState.returnDate}" onchange="window.bookingEngine.updateDates()">
              </div>
            </div>
            <div class="trip-duration-alert">
              <span>⏱️ ${t('rental_duration_days', { days: this.bookingState.rentalDays })}</span>
              ${this.bookingState.rentalDays >= 7 ? `<span class="badge badge-success">${isRtl ? 'خصم خاص للحجز الأسبوعي مشمول!' : 'Weekly discount applied!'}</span>` : ''}
            </div>
          </div>

          <div class="step-footer">
            <button class="btn btn-outline" onclick="window.bookingEngine.closeModal()">${t('btn_close')}</button>
            <button class="btn btn-primary" onclick="window.bookingEngine.goToStep(2)">${isRtl ? 'التالي: باقات الحماية والإضافات ←' : 'Next: Protection & Add-ons →'}</button>
          </div>
        </div>
      `;
    }

    // --- STEP 2: PROTECTION & ADD-ONS ---
    else if (this.currentStep === 2) {
      const tiers = window.appStore.getInsuranceTiers();
      const addons = window.appStore.getAddOns();

      stepBodyHtml = `
        <div class="step-panel animate-fade">
          <div class="section-subhead">
            <h3>🛡️ ${t('protection_title')}</h3>
            <p class="text-muted">${t('protection_desc')}</p>
          </div>

          <div class="insurance-options-grid">
            ${tiers.map(tier => `
              <div class="insurance-card ${tier.id === this.bookingState.selectedInsuranceId ? 'selected' : ''}" onclick="window.bookingEngine.selectInsurance('${tier.id}')">
                <div class="insurance-header">
                  <input type="radio" name="ins_tier" ${tier.id === this.bookingState.selectedInsuranceId ? 'checked' : ''}>
                  <div>
                    <h4 class="ins-title">${isRtl ? tier.nameAr : tier.nameEn}</h4>
                    ${tier.badgeAr ? `<span class="badge badge-gold">${isRtl ? tier.badgeAr : tier.badgeEn}</span>` : ''}
                  </div>
                  <div class="ins-price">
                    ${tier.pricePerDay === 0 ? `<span class="free">${isRtl ? 'مشمول مجاناً' : 'Included Free'}</span>` : `<span class="val">+${tier.pricePerDay}</span> ${t('sar_short')}/يوم`}
                  </div>
                </div>
                <div class="ins-deductible">
                  <strong>${t('deductible_label')}</strong>
                  <span class="highlight ${tier.deductible === 0 ? 'text-success' : ''}">${tier.deductible === 0 ? t('deductible_zero') : `${tier.deductible} ${t('sar')}`}</span>
                </div>
                <p class="ins-desc">${isRtl ? tier.descriptionAr : tier.descriptionEn}</p>
                <ul class="ins-features">
                  ${(isRtl ? tier.featuresAr : tier.featuresEn).map(f => `<li>✓ ${f}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>

          <div class="section-subhead mt-4">
            <h3>🧰 ${t('addons_title')}</h3>
            <p class="text-muted">${t('addons_desc')}</p>
          </div>

          <div class="addons-list-grid">
            ${addons.map(addon => {
              const checked = this.bookingState.selectedAddOns.includes(addon.id);
              return `
                <div class="addon-card ${checked ? 'selected' : ''}" onclick="window.bookingEngine.toggleAddOn('${addon.id}')">
                  <div class="addon-left">
                    <input type="checkbox" ${checked ? 'checked' : ''} onclick="event.stopPropagation(); window.bookingEngine.toggleAddOn('${addon.id}')">
                    <div class="addon-text">
                      <strong>${isRtl ? addon.nameAr : addon.nameEn}</strong>
                      <p>${isRtl ? addon.descriptionAr : (addon.descriptionEn || addon.nameEn)}</p>
                    </div>
                  </div>
                  <div class="addon-price">
                    <span class="price-val">+${addon.pricePerDay}</span> ${t('sar_short')}/يوم
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="step-footer">
            <button class="btn btn-outline" onclick="window.bookingEngine.goToStep(1)">${isRtl ? 'السابق' : 'Previous'}</button>
            <button class="btn btn-primary" onclick="window.bookingEngine.goToStep(3)">${isRtl ? 'التالي: بيانات المستأجر ←' : 'Next: Driver Details →'}</button>
          </div>
        </div>
      `;
    }

    // --- STEP 3: CUSTOMER & DRIVER INFO ---
    else if (this.currentStep === 3) {
      const c = this.bookingState.customer;
      stepBodyHtml = `
        <div class="step-panel animate-fade">
          <div class="section-subhead">
            <h3>👤 ${t('driver_info_title')}</h3>
            <p class="text-muted">${isRtl ? 'تستخدم هذه البيانات لإصدار التفويض الإلكتروني الرسمي (أبشر) وعقد الإيجار الموحد' : 'Used for official electronic driving authorization & unified rental contract'}</p>
          </div>

          <div class="card bg-surface p-4">
            <div class="grid-2-col">
              <div class="form-group">
                <label>${t('driver_name')} *</label>
                <input type="text" id="cust_name" class="form-control" value="${c.name || ''}" placeholder="${isRtl ? 'الاسم الثلاثي أو الرباعي' : 'Full legal name'}">
              </div>
              <div class="form-group">
                <label>${t('driver_phone')} *</label>
                <input type="tel" id="cust_phone" class="form-control" value="${c.phone || '+966'}" placeholder="+9665xxxxxxxx">
              </div>
            </div>

            <div class="grid-2-col">
              <div class="form-group">
                <label>${t('driver_id')} *</label>
                <input type="text" id="cust_id" class="form-control" value="${c.idNumber || ''}" placeholder="10xxxxxxxx / 20xxxxxxxx">
              </div>
              <div class="form-group">
                <label>${t('driver_email')} *</label>
                <input type="email" id="cust_email" class="form-control" value="${c.email || ''}" placeholder="name@example.com">
              </div>
            </div>

            <div class="grid-2-col">
              <div class="form-group">
                <label>${t('driver_license')} *</label>
                <input type="text" id="cust_license" class="form-control" value="${c.licenseNumber || ''}" placeholder="DL-xxxxxx">
              </div>
              <div class="form-group">
                <label>${t('driver_age')} *</label>
                <input type="number" id="cust_age" class="form-control" value="${c.age || 28}" min="21" max="80">
              </div>
            </div>

            <div class="form-group">
              <label>${t('driver_notes')}</label>
              <textarea id="cust_notes" class="form-control" rows="2" placeholder="${isRtl ? 'مثل: رقم الرحلة الجوية، أو طلب استلام محدد' : 'e.g. Flight arrival number, special requests'}">${c.notes || ''}</textarea>
            </div>
          </div>

          <div class="step-footer">
            <button class="btn btn-outline" onclick="window.bookingEngine.goToStep(2)">${isRtl ? 'السابق' : 'Previous'}</button>
            <button class="btn btn-primary" onclick="window.bookingEngine.goToStep(4)">${isRtl ? 'التالي: مراجعة الأسعار والكوبونات ←' : 'Next: Invoice Review & Coupons →'}</button>
          </div>
        </div>
      `;
    }

    // --- STEP 4: INVOICE BREAKDOWN & COUPONS ---
    else if (this.currentStep === 4) {
      stepBodyHtml = `
        <div class="step-panel animate-fade">
          <div class="section-subhead">
            <h3>🧾 ${t('pricing_breakdown_title')}</h3>
            <p class="text-muted">${isRtl ? 'تفصيل شفاف وشامل لكافة التكاليف بدون أي بنود مستترة' : 'Completely itemized breakdown with full financial clarity'}</p>
          </div>

          <div class="invoice-review-box">
            <div class="invoice-row">
              <span>${t('base_rent_rate', { days: pricing.rentalDays, rate: pricing.baseDailyPrice })}</span>
              <strong>${pricing.baseTotal} ${t('sar')}</strong>
            </div>

            ${pricing.durationDiscount > 0 ? `
              <div class="invoice-row text-success">
                <span>خصم الحجز الطويل (${car.weeklyDiscount}%):</span>
                <strong>-${pricing.durationDiscount} ${t('sar')}</strong>
              </div>
            ` : ''}

            ${pricing.interBranchFee > 0 ? `
              <div class="invoice-row">
                <span>${t('diff_branch_fee')}</span>
                <strong>+${pricing.interBranchFee} ${t('sar')}</strong>
              </div>
            ` : ''}

            <div class="invoice-row">
              <span>${t('insurance_fee', { name: isRtl ? pricing.insurance.nameAr : pricing.insurance.nameEn })}</span>
              <strong>+${pricing.insuranceCost} ${t('sar')}</strong>
            </div>

            ${pricing.addOnsDetails.length > 0 ? pricing.addOnsDetails.map(a => `
              <div class="invoice-row sub-row">
                <span>+ ${isRtl ? a.nameAr : a.nameEn} (${pricing.rentalDays} أيام):</span>
                <span>+${a.totalPrice} ${t('sar')}</span>
              </div>
            `).join('') : ''}

            <!-- Coupon Box -->
            <div class="coupon-input-group mt-3">
              <input type="text" id="coupon_input_code" class="form-control" placeholder="${t('coupon_placeholder')}" value="${this.bookingState.appliedCoupon?.code || ''}">
              <button class="btn btn-secondary" onclick="window.bookingEngine.applyCouponCode()">${t('apply_coupon')}</button>
            </div>

            ${pricing.couponDiscount > 0 ? `
              <div class="invoice-row text-success mt-2">
                <span>🏷️ ${t('coupon_discount')} (${pricing.couponObj.code}):</span>
                <strong>-${pricing.couponDiscount} ${t('sar')}</strong>
              </div>
            ` : ''}

            <hr class="invoice-divider">

            <div class="invoice-row text-muted">
              <span>${t('subtotal')}</span>
              <span>${pricing.netSubtotal} ${t('sar')}</span>
            </div>

            <div class="invoice-row text-muted">
              <span>${t('vat_label')}</span>
              <span>${pricing.vatAmount} ${t('sar')}</span>
            </div>

            <div class="invoice-row total-payable-row">
              <span class="label">${t('net_payable_now')}</span>
              <span class="value">${pricing.finalPaidAmount} ${t('sar')}</span>
            </div>

            <div class="deposit-notice-box mt-3">
              <div class="deposit-title">
                <span>🔒 ${t('refundable_deposit_notice')}</span>
                <strong>${pricing.refundableDeposit} ${t('sar')}</strong>
              </div>
              <p class="deposit-text">${t('deposit_clarification')}</p>
            </div>
          </div>

          <div class="step-footer">
            <button class="btn btn-outline" onclick="window.bookingEngine.goToStep(3)">${isRtl ? 'السابق' : 'Previous'}</button>
            <button class="btn btn-primary" onclick="window.bookingEngine.goToStep(5)">${isRtl ? 'التالي: صفحة الدفع الآمن ←' : 'Next: Secure Checkout →'}</button>
          </div>
        </div>
      `;
    }

    // --- STEP 5: PAYMENT GATEWAY SIMULATOR ---
    else if (this.currentStep === 5) {
      stepBodyHtml = `
        <div class="step-panel animate-fade">
          <div class="section-subhead">
            <h3>💳 ${t('payment_methods_title')}</h3>
            <p class="text-muted">${isRtl ? 'اختر الطريقة المفضلة لديك لإتمام الحجز الفوري الآمن' : 'Select your preferred method for instant secured booking'}</p>
          </div>

          <div class="payment-tabs-grid">
            <div class="pay-option ${this.bookingState.paymentMethod === 'mada' ? 'active' : ''}" onclick="window.bookingEngine.selectPaymentMethod('mada')">
              <span class="pay-icon">💳</span>
              <strong>${t('pay_mada')}</strong>
              <small class="text-muted">${isRtl ? 'مدى السعودية' : 'Saudi Mada'}</small>
            </div>
            <div class="pay-option ${this.bookingState.paymentMethod === 'apple-pay' ? 'active' : ''}" onclick="window.bookingEngine.selectPaymentMethod('apple-pay')">
              <span class="pay-icon">🍏</span>
              <strong>${t('pay_apple')}</strong>
              <small class="text-muted">${isRtl ? 'دفع بنقرة واحدة' : 'One-Click Pay'}</small>
            </div>
            <div class="pay-option ${this.bookingState.paymentMethod === 'card' ? 'active' : ''}" onclick="window.bookingEngine.selectPaymentMethod('card')">
              <span class="pay-icon">💳</span>
              <strong>${t('pay_card')}</strong>
              <small class="text-muted">Visa / Mastercard</small>
            </div>
            <div class="pay-option ${this.bookingState.paymentMethod === 'stc-pay' ? 'active' : ''}" onclick="window.bookingEngine.selectPaymentMethod('stc-pay')">
              <span class="pay-icon">📱</span>
              <strong>${t('pay_stc')}</strong>
              <small class="text-muted">${isRtl ? 'المحفظة الرقمية' : 'Digital Wallet'}</small>
            </div>
            <div class="pay-option ${this.bookingState.paymentMethod === 'branch' ? 'active' : ''}" onclick="window.bookingEngine.selectPaymentMethod('branch')">
              <span class="pay-icon">🏢</span>
              <strong>${t('pay_branch')}</strong>
              <small class="text-muted">${isRtl ? 'نقداً أو شبكة' : 'Cash or POS'}</small>
            </div>
          </div>

          ${(this.bookingState.paymentMethod === 'mada' || this.bookingState.paymentMethod === 'card') ? `
            <div class="card-simulator-box mt-4">
              <!-- Interactive Visual Card -->
              <div class="visual-card">
                <div class="card-chip"></div>
                <div class="card-brand">${this.bookingState.paymentMethod === 'mada' ? 'MADA' : 'VISA'}</div>
                <div class="card-display-number" id="cardDisplayNumber">•••• •••• •••• ••••</div>
                <div class="card-display-bottom">
                  <div>
                    <small>CARD HOLDER</small>
                    <div id="cardDisplayHolder">${(this.bookingState.customer.name || 'AHMED AL-OTAIBI').toUpperCase()}</div>
                  </div>
                  <div>
                    <small>EXPIRES</small>
                    <div id="cardDisplayExpiry">MM/YY</div>
                  </div>
                </div>
              </div>

              <!-- Card Input Form -->
              <div class="card-inputs mt-3">
                <div class="form-group">
                  <label>${t('card_number')}</label>
                  <input type="text" id="pay_card_num" class="form-control" placeholder="4847 •••• •••• 1234" maxlength="19" oninput="window.bookingEngine.formatCardInput(this)">
                </div>
                <div class="grid-2-col">
                  <div class="form-group">
                    <label>${t('card_expiry')}</label>
                    <input type="text" id="pay_card_exp" class="form-control" placeholder="08/28" maxlength="5" oninput="window.bookingEngine.formatExpiryInput(this)">
                  </div>
                  <div class="form-group">
                    <label>${t('card_cvv')}</label>
                    <input type="password" id="pay_card_cvv" class="form-control" placeholder="•••" maxlength="4">
                  </div>
                </div>
              </div>
            </div>
          ` : this.bookingState.paymentMethod === 'apple-pay' ? `
            <div class="apple-pay-box text-center p-4">
              <div class="apple-logo-badge"> Pay</div>
              <p>${isRtl ? 'جاهز للدفع الفوري عبر المحفظة البيومترية' : 'Ready for instant biometric checkout'}</p>
              <div class="amount-badge">${pricing.finalPaidAmount} ${t('sar')}</div>
            </div>
          ` : this.bookingState.paymentMethod === 'stc-pay' ? `
            <div class="stc-pay-box p-4">
              <div class="form-group">
                <label>${isRtl ? 'رقم جوال حساب STC Pay' : 'STC Pay Mobile Number'}</label>
                <input type="tel" class="form-control" value="${this.bookingState.customer.phone || '+9665'}" placeholder="+9665xxxxxxxx">
              </div>
              <p class="text-muted small">${isRtl ? 'ستصلك رسالة تأكيد الخصم المباشر على تطبيق STC Pay الخاص بك.' : 'A direct debit confirmation prompt will appear in your STC Pay app.'}</p>
            </div>
          ` : `
            <div class="branch-pay-box p-4 text-center">
              <div class="pay-icon">🏢</div>
              <h4>${isRtl ? 'الدفع عند استلام السيارة في الفرع' : 'Pay at branch counter on vehicle handover'}</h4>
              <p class="text-muted">${isRtl ? 'سيتم حجز السيارة وتأكيد طلبك فوراً، وتدفع المبلغ عند التوقيع واستلام المفتاح.' : 'Your car is reserved immediately, you pay upon signing and receiving the keys.'}</p>
            </div>
          `}

          <div class="step-footer">
            <button class="btn btn-outline" onclick="window.bookingEngine.goToStep(4)">${isRtl ? 'السابق' : 'Previous'}</button>
            <button class="btn btn-success btn-large" onclick="window.bookingEngine.processPayment()">
              🔒 ${t('btn_pay_now', { amount: pricing.finalPaidAmount })}
            </button>
          </div>
        </div>
      `;
    }

    // --- STEP 6: CONFIRMATION & DIGITAL RECEIPT ---
    else if (this.currentStep === 6) {
      const b = this.lastCreatedBooking;
      if (!b) {
        stepBodyHtml = `<div class="p-4 text-center">جاري المعالجة...</div>`;
      } else {
        stepBodyHtml = `
          <div class="step-panel animate-fade text-center">
            <div class="success-icon-badge">🎉 ✓</div>
            <h2 class="text-success">${t('booking_success_title')}</h2>
            <div class="booking-ref-banner">
              <span>${t('booking_ref_label')}</span>
              <strong class="ref-code">${b.bookingNumber}</strong>
            </div>

            <!-- Printable Receipt Area -->
            <div class="receipt-card-container text-start" id="printableReceipt">
              <div class="receipt-header">
                <div>
                  <h3 class="receipt-logo">🚗 منصة الصفوة Safwa</h3>
                  <small>شركة الصفوة لتأجير السيارات - المملكة العربية السعودية</small><br>
                  <small>الرقم الضريبي: 30098241500003</small>
                </div>
                <div class="qr-placeholder">
                  ${this.generateMockQR(b.bookingNumber)}
                </div>
              </div>

              <div class="receipt-grid mt-3">
                <div><strong>السيارة:</strong> ${b.carName}</div>
                <div><strong>المستأجر:</strong> ${b.customerName}</div>
                <div><strong>الهوية / الإقامة:</strong> ${b.customerIdNumber}</div>
                <div><strong>الجوال:</strong> ${b.customerPhone}</div>
                <div><strong>فرع الاستلام:</strong> ${b.pickupLocationName}</div>
                <div><strong>فرع التسليم:</strong> ${b.returnLocationName}</div>
                <div><strong>تاريخ الاستلام:</strong> ${b.pickupDate} (${b.pickupTime})</div>
                <div><strong>تاريخ التسليم:</strong> ${b.returnDate} (${b.returnTime})</div>
                <div><strong>مدة الإيجار:</strong> ${b.rentalDays} أيام</div>
                <div><strong>باقة التأمين:</strong> ${b.insuranceName}</div>
              </div>

              <hr class="receipt-divider">

              <div class="receipt-financials">
                <div class="fin-row"><span>أجرة الإيجار الأساسية:</span> <span>${b.baseTotal} ريال</span></div>
                ${b.discountAmount > 0 ? `<div class="fin-row text-success"><span>خصم الكوبون (${b.appliedCoupon}):</span> <span>-${b.discountAmount} ريال</span></div>` : ''}
                <div class="fin-row"><span>تكلفة التأمين الإضافي:</span> <span>${b.insuranceCostTotal} ريال</span></div>
                <div class="fin-row"><span>تكلفة الإضافات:</span> <span>${b.addOnsCostTotal} ريال</span></div>
                <div class="fin-row"><span>ضريبة القيمة المضافة (15%):</span> <span>${b.vatAmount} ريال</span></div>
                <div class="fin-row grand-total"><span>المبلغ الإجمالي المدفوع:</span> <span>${b.finalPaidAmount} ريال</span></div>
                <div class="fin-row deposit-row"><span>مبلغ التأمين المسترد (حجز):</span> <span>${b.refundableDeposit} ريال</span></div>
              </div>

              <div class="receipt-footer mt-3">
                <small>شكراً لتعاملكم معنا. للاستفسار أو المساعدة اتصل على 920088990 أو تواصل عبر واتساب.</small>
              </div>
            </div>

            <div class="confirmation-actions mt-4">
              <button class="btn btn-primary" onclick="window.bookingEngine.printReceipt()">🖨️ ${t('btn_print_receipt')}</button>
              <button class="btn btn-outline" onclick="window.bookingEngine.viewInAccount()">${t('btn_my_bookings')}</button>
              <button class="btn btn-secondary" onclick="window.bookingEngine.closeModal()">${t('btn_home')}</button>
            </div>
          </div>
        `;
      }
    }

    content.innerHTML = stepperHtml + stepBodyHtml;
  }

  // Branch updates from Step 1
  updateBranch(type, branchId) {
    if (type === 'pickup') this.bookingState.pickupBranchId = branchId;
    if (type === 'return') this.bookingState.returnBranchId = branchId;
    this.calculatePricing();
    this.renderModal();
  }

  updateDates() {
    const pInput = document.getElementById('step1_pdate');
    const rInput = document.getElementById('step1_rdate');
    if (pInput && rInput) {
      const p = new Date(pInput.value);
      const r = new Date(rInput.value);
      if (r <= p) {
        window.app.showToast(window.i18n.isRTL() ? 'يجب أن يكون تاريخ التسليم بعد تاريخ الاستلام' : 'Return date must be after pickup date', 'warning');
        return;
      }
      const diffTime = Math.abs(r - p);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      this.bookingState.pickupDate = pInput.value;
      this.bookingState.returnDate = rInput.value;
      this.bookingState.rentalDays = diffDays;
      this.calculatePricing();
      this.renderModal();
    }
  }

  // Insurance selection
  selectInsurance(tierId) {
    this.bookingState.selectedInsuranceId = tierId;
    this.calculatePricing();
    this.renderModal();
  }

  // Add-on toggle
  toggleAddOn(addonId) {
    const arr = this.bookingState.selectedAddOns;
    const index = arr.indexOf(addonId);
    if (index >= 0) {
      arr.splice(index, 1);
    } else {
      arr.push(addonId);
    }
    this.calculatePricing();
    this.renderModal();
  }

  // Apply promo code
  applyCouponCode() {
    const input = document.getElementById('coupon_input_code');
    const code = input ? input.value.trim() : '';
    if (!code) {
      window.app.showToast(window.i18n.isRTL() ? 'الرجاء كتابة رمز الكوبون' : 'Please type a coupon code', 'warning');
      return;
    }

    const val = window.appStore.validateCoupon(code, this.bookingState.rentalDays, this.bookingState.pricing.grossSubtotal);
    if (!val.valid) {
      window.app.showToast(window.i18n.isRTL() ? val.messageAr : val.messageEn, 'error');
      return;
    }

    this.bookingState.appliedCoupon = val.coupon;
    this.bookingState.couponDiscount = val.discount;
    window.app.showToast(window.i18n.isRTL() ? val.messageAr : val.messageEn, 'success');
    this.calculatePricing({ couponCode: code });
    this.renderModal();
  }

  // Payment method selection
  selectPaymentMethod(method) {
    this.bookingState.paymentMethod = method;
    this.renderModal();
  }

  // Card formatting helpers
  formatCardInput(input) {
    let val = input.value.replace(/\D/g, '').substring(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    input.value = formatted;
    const display = document.getElementById('cardDisplayNumber');
    if (display) display.textContent = formatted || '•••• •••• •••• ••••';
  }

  formatExpiryInput(input) {
    let val = input.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 3) {
      val = val.substring(0, 2) + '/' + val.substring(2);
    }
    input.value = val;
    const display = document.getElementById('cardDisplayExpiry');
    if (display) display.textContent = val || 'MM/YY';
  }

  // Process payment simulation with 3D Secure OTP
  processPayment() {
    // If credit card or mada, simulate OTP modal
    if (this.bookingState.paymentMethod === 'mada' || this.bookingState.paymentMethod === 'card') {
      const cardNum = document.getElementById('pay_card_num')?.value.trim();
      if (!cardNum || cardNum.length < 15) {
        window.app.showToast(window.i18n.isRTL() ? 'الرجاء إدخال رقم بطاقة صحيح' : 'Please enter valid card number', 'warning');
        return;
      }
      this.showOtpModal();
    } else {
      // Direct completion for Apple Pay, STC Pay, Branch
      this.finalizeReservation();
    }
  }

  showOtpModal() {
    const otpCode = '1234';
    const isRtl = window.i18n.isRTL();
    const modalHtml = `
      <div class="otp-dialog-overlay active" id="otpDialogOverlay">
        <div class="otp-dialog animate-scale">
          <div class="otp-header">
            <span class="shield-icon">🛡️</span>
            <h4>${window.i18n.t('otp_title')}</h4>
          </div>
          <p class="text-muted small">${window.i18n.t('otp_desc')}</p>
          <div class="otp-test-hint">
            <strong>رمز التحقق التجريبي هو: <span class="badge badge-gold">1234</span></strong>
          </div>
          <div class="form-group mt-3">
            <input type="text" id="otp_input_code" class="form-control text-center otp-input" placeholder="1234" maxlength="4" autofocus>
          </div>
          <div class="otp-actions mt-3">
            <button class="btn btn-outline" onclick="window.bookingEngine.closeOtpModal()">${window.i18n.t('btn_close')}</button>
            <button class="btn btn-primary" onclick="window.bookingEngine.verifyOtp()">${window.i18n.t('otp_confirm_btn')}</button>
          </div>
        </div>
      </div>
    `;

    const container = document.getElementById('otpModalContainer');
    if (container) {
      container.innerHTML = modalHtml;
    }
  }

  closeOtpModal() {
    const el = document.getElementById('otpDialogOverlay');
    if (el) el.remove();
  }

  verifyOtp() {
    const input = document.getElementById('otp_input_code');
    if (input && input.value.trim() === '1234') {
      this.closeOtpModal();
      this.finalizeReservation();
    } else {
      window.app.showToast(window.i18n.isRTL() ? 'رمز التحقق غير صحيح، أدخل 1234' : 'Incorrect code, please enter 1234', 'error');
    }
  }

  // Finalize booking creation and save to store
  finalizeReservation() {
    const p = this.bookingState.pricing;
    const c = this.bookingState.customer;
    const car = this.bookingState.car;
    const branches = window.appStore.getBranches();
    const pBranch = branches.find(b => b.id === this.bookingState.pickupBranchId) || branches[0];
    const rBranch = branches.find(b => b.id === this.bookingState.returnBranchId) || branches[0];

    // Generate random 4-digit reference
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const bookingNumber = `SF-2026-${randomNum}`;

    const newBooking = {
      bookingNumber,
      carId: car.id,
      carName: `${car.name} (${car.modelYear})`,
      carNameEn: `${car.nameEn} (${car.modelYear})`,
      customerName: c.name,
      customerPhone: c.phone,
      customerIdNumber: c.idNumber,
      customerEmail: c.email,
      pickupLocationId: pBranch.id,
      pickupLocationName: window.i18n.isRTL() ? pBranch.nameAr : pBranch.nameEn,
      returnLocationId: rBranch.id,
      returnLocationName: window.i18n.isRTL() ? rBranch.nameAr : rBranch.nameEn,
      pickupDate: this.bookingState.pickupDate,
      pickupTime: this.bookingState.pickupTime,
      returnDate: this.bookingState.returnDate,
      returnTime: this.bookingState.returnTime,
      rentalDays: p.rentalDays,
      baseDailyPrice: p.baseDailyPrice,
      baseTotal: p.baseTotal,
      selectedInsurance: p.insurance.id,
      insuranceCostTotal: p.insuranceCost,
      insuranceName: window.i18n.isRTL() ? p.insurance.nameAr : p.insurance.nameEn,
      selectedAddOns: this.bookingState.selectedAddOns,
      addOnsCostTotal: p.addOnsCost,
      appliedCoupon: this.bookingState.appliedCoupon?.code || null,
      discountAmount: p.couponDiscount,
      subtotalBeforeTax: p.netSubtotal,
      vatRate: p.vatRate,
      vatAmount: p.vatAmount,
      finalPaidAmount: p.finalPaidAmount,
      refundableDeposit: p.refundableDeposit,
      paymentMethod: this.bookingState.paymentMethod,
      paymentStatus: this.bookingState.paymentMethod === 'branch' ? 'branch_pending' : 'paid',
      bookingStatus: 'confirmed',
      createdAt: new Date().toISOString(),
      notes: c.notes || ''
    };

    this.lastCreatedBooking = window.appStore.addBooking(newBooking);
    this.goToStep(6);
  }

  // Printable receipt
  printReceipt() {
    window.print();
  }

  viewInAccount() {
    this.closeModal();
    window.location.hash = '#my-account';
    window.app.switchView('account');
  }

  // Generate SVG mock QR Code
  generateMockQR(text) {
    return `
      <svg width="90" height="90" viewBox="0 0 100 100" style="background:#fff; padding:4px; border-radius:6px; border:1px solid #ddd;">
        <rect x="10" y="10" width="25" height="25" fill="#000" />
        <rect x="15" y="15" width="15" height="15" fill="#fff" />
        <rect x="18" y="18" width="9" height="9" fill="#000" />
        <rect x="65" y="10" width="25" height="25" fill="#000" />
        <rect x="70" y="15" width="15" height="15" fill="#fff" />
        <rect x="73" y="18" width="9" height="9" fill="#000" />
        <rect x="10" y="65" width="25" height="25" fill="#000" />
        <rect x="15" y="70" width="15" height="15" fill="#fff" />
        <rect x="18" y="73" width="9" height="9" fill="#000" />
        <circle cx="50" cy="50" r="5" fill="#000" />
        <rect x="42" y="15" width="6" height="18" fill="#000" />
        <rect x="52" y="25" width="6" height="10" fill="#000" />
        <rect x="15" y="42" width="20" height="6" fill="#000" />
        <rect x="65" y="45" width="25" height="8" fill="#000" />
        <rect x="45" y="65" width="12" height="20" fill="#000" />
        <rect x="65" y="68" width="18" height="18" fill="#000" />
      </svg>
    `;
  }
}

// Global BookingEngine instance
window.bookingEngine = new BookingEngine();
