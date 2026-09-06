/**
 * Safwa Car Rental - Internationalization (i18n) Engine
 * Arabic (Default - RTL) & English (LTR)
 */

const TRANSLATIONS = {
  ar: {
    site_title: 'الصفوة لتأجير السيارات | منصة الحجز الفوري في المملكة',
    tagline: 'تجربة قيادة فاخرة بأسعار شفافة وحجز فوري في جميع مدن ومطارات المملكة',
    nav_home: 'الرئيسية',
    nav_cars: 'السيارات',
    nav_categories: 'أنواع السيارات',
    nav_offers: 'العروض',
    nav_how_it_works: 'كيف تحجز؟',
    nav_why_us: 'لماذا تختارنا؟',
    nav_reviews: 'تقييمات العملاء',
    nav_faq: 'الأسئلة الشائعة',
    nav_contact: 'تواصل معنا',
    nav_login: 'تسجيل الدخول',
    nav_register: 'إنشاء حساب',
    nav_my_account: 'حسابي',
    nav_admin: 'لوحة الإدارة',
    call_support: 'الدعم الموحد 24/7',
    
    // Hero Search
    hero_badge: '✨ منصة تأجير السيارات الفاخرة الأولى بالمملكة',
    hero_title: 'احجز سيارتك المثالية بسهولة',
    hero_desc: 'اختر سيارتك، حدد موعد الاستلام والتسليم، واحصل على أفضل تجربة تأجير بأسعار واضحة وتأمين شامل بدون رسوم خفية.',
    search_pickup_location: 'موقع الاستلام',
    search_return_location: 'موقع التسليم',
    search_same_location: 'التسليم في نفس موقع الاستلام',
    search_pickup_date: 'تاريخ الاستلام',
    search_pickup_time: 'وقت الاستلام',
    search_return_date: 'تاريخ التسليم',
    search_return_time: 'وقت التسليم',
    search_btn: 'ابحث عن السيارات',
    rental_duration_days: 'مدة الإيجار: {days} أيام',

    // Car Categories Section
    section_categories_title: 'أنواع وفئات السيارات',
    section_categories_subtitle: 'اختر الفئة التي تلائم أسلوب رحلتك من أسطولنا الحديث',
    cat_economy: 'اقتصادية',
    cat_sedan: 'سيدان',
    cat_suv: 'SUV ودفع رباعي',
    cat_family: 'عائلية',
    cat_luxury: 'فاخرة',
    cat_sports: 'رياضية',

    // Featured Cars
    section_featured_title: 'السيارات المميزة',
    section_featured_subtitle: 'سيارات فاخرة وحديثة معقمة وجاهزة للاستلام الفوري',

    // Why Choose Us
    section_why_title: 'لماذا تختار الصفوة؟',
    section_why_subtitle: 'نقدم معايير استثنائية تجعل رحلتك سلسة ومريحة',
    why_1_title: 'سيارات حديثة 2025 - 2026',
    why_1_desc: 'أسطول كامل من أحدث الموديلات العالمية يخضع لفحص دوري شامل وتعقيم مستمر.',
    why_2_title: 'أسعار شفافة 100%',
    why_2_desc: 'لا رسوم خفية ولا تكاليف مفاجئة عند الاستلام؛ السعر يشمل الضريبة وكافة التفاصيل.',
    why_3_title: 'تأمين واضح ومرن',
    why_3_desc: 'باقات تأمينية تلائم احتياجك مع خيار الإعفاء التام من نسبة التحمل (0 ريال).',
    why_4_title: 'حجز فوري في دقيقتين',
    why_4_desc: 'إجراءات رقمية بالكامل بدون انتظار؛ احجز واستلم مفتاحك في المطار فور وصولك.',
    why_5_title: 'دعم العملاء على مدار 24/7',
    why_5_desc: 'فريق خدمة عملاء ومساعدة على الطريق متواجد على مدار الساعة لخدمتك.',
    why_6_title: 'مواقع استلام متعددة',
    why_6_desc: 'فروع في جميع صالات مطارات المملكة الرئيسية ومراكز المدن مع إمكانية التسليم بفرع مختلف.',

    // Current Offers
    section_offers_title: 'العروض الحالية والخصومات',
    section_offers_subtitle: 'استفد من كوبونات الخصم الحصرية عند إتمام حجزك اليوم',

    // How to Book
    section_how_title: 'كيف تحجز سيارتك؟',
    section_how_subtitle: 'أربع خطوات بسيطة وسريعة تفصلك عن قيادة سيارتك المفضلة',
    step_num_1_title: '1. اختر السيارة',
    step_num_1_desc: 'تصفح أسطولنا المتنوع وقارن بين المواصفات والأسعار لاختيار الأنسب لك.',
    step_num_2_title: '2. حدد التاريخ والموقع',
    step_num_2_desc: 'اختر فرع الاستلام والتسليم ومواعيد رحلتك لحساب التكلفة بدقة.',
    step_num_3_title: '3. أدخل بياناتك',
    step_num_3_desc: 'أدخل معلومات الهوية ورخصة القيادة لإصدار التفويض الإلكتروني المعتمد.',
    step_num_4_title: '4. ادفع واستلم السيارة',
    step_num_4_desc: 'ادفع بأمان عبر مدى أو البطاقة واستلم سيارتك جاهزة ونظيفة فوراً.',

    // Testimonials
    section_reviews_title: 'تقييمات وآراء العملاء',
    section_reviews_subtitle: 'نفخر بثقة آلاف العملاء في جميع مدن ومطارات المملكة',

    // Filters
    filter_all: 'الكل',
    filter_category: 'فئة السيارة',
    filter_price: 'السعر اليومي (ريال)',
    filter_transmission: 'ناقل الحركة',
    filter_seats: 'عدد المقاعد',
    filter_fuel: 'نوع الوقود',
    filter_brand: 'الشركة المصنعة',
    filter_sort: 'ترتيب حسب',
    sort_featured: 'الأكثر طلباً',
    sort_price_asc: 'الأقل سعراً',
    sort_price_desc: 'الأعلى سعراً',
    sort_rating: 'الأحدث والأعلى تقييماً',
    clear_filters: 'إعادة ضبط الفلاتر',
    showing_results: 'عرض {count} سيارة متاحة',

    // Car Cards
    per_day: 'ريال / يوم',
    total_period: 'الإجمالي لـ {days} أيام:',
    security_deposit: 'التأمين المسترد:',
    sar: 'ريال',
    sar_short: 'ر.س',
    seats_label: 'مقاعد',
    doors_label: 'أبواب',
    luggage_label: 'حقائب',
    automatic: 'أوتوماتيك',
    manual: 'يدوي',
    btn_details: 'تفاصيل السيارة',
    btn_book_now: 'احجز الآن',
    btn_view_fleet: 'مشاهدة الأسطول كاملاً',
    badge_available: 'متاحة',
    badge_reserved: 'محجوزة',
    badge_rented: 'مؤجرة',
    badge_maintenance: 'صيانة',

    // Details Page
    details_title: 'المواصفات الكاملة والتجهيزات',
    specs_year: 'سنة الموديل:',
    specs_engine: 'المحرك والقوة:',
    specs_fuel_economy: 'معدل استهلاك الوقود:',
    specs_transmission: 'ناقل الحركة:',
    specs_mileage_limit: 'الكيلومترات اليومية المشمولة:',
    specs_extra_km: 'سعر الكيلومتر الإضافي:',
    specs_features: 'التجهيزات والمزايا:',
    rental_terms_title: 'شروط واستحقاق الاستئجار:',
    fuel_policy_title: 'سياسة الوقود:',
    fuel_policy_desc: 'استلام ممتلئ - تسليم ممتلئ (Full-to-Full) بدون رسوم خفية.',
    cancellation_policy_title: 'سياسة الإلغاء والاسترداد:',
    cancellation_policy_desc: 'إلغاء مجاني 100% مع استرداد فوري حتى 24 ساعة قبل موعد الاستلام.',

    // Booking Wizard Steps
    step_1: '1. السيارة',
    step_2: '2. التاريخ والموقع',
    step_3: '3. الإضافات والتأمين',
    step_4: '4. بيانات العميل',
    step_5: '5. مراجعة الحجز',
    step_6: '6. الدفع والتأكيد',

    // Pricing Breakdown
    pricing_breakdown_title: 'تفصيل السعر والشفافية المالية',
    base_rent_rate: 'سعر الإيجار الأساسي ({days} أيام × {rate} ريال):',
    diff_branch_fee: 'رسوم تسليم بفرع مختلف:',
    insurance_fee: 'باقة التأمين المختارة ({name}):',
    addons_total: 'الإضافات:',
    coupon_discount: 'خصم الكوبون:',
    subtotal: 'المجموع قبل الضريبة:',
    vat_label: 'الضريبة (15% VAT):',
    net_payable_now: 'الإجمالي النهائي المطلوب دفعه:',
    refundable_deposit_notice: 'مبلغ التأمين المسترد (حجز مؤقت):',
    deposit_clarification: 'مبلغ التأمين يفَك حجزه تلقائياً فور إعادة السيارة سالمة خلال 3-7 أيام عمل.',

    // Confirmation
    booking_success_title: 'تم تأكيد حجزك بنجاح!',
    booking_ref_label: 'رقم الحجز:',
    btn_print_receipt: 'تحميل الفاتورة (PDF)',
    btn_my_bookings: 'عرض الحجز في حسابي',
    btn_home: 'العودة للرئيسية',

    // Customer Portal
    account_title: 'لوحة حساب العميل',
    tab_active_bookings: 'الحجوزات الحالية',
    tab_past_bookings: 'الحجوزات السابقة',
    tab_cancelled_bookings: 'الحجوزات الملغاة',
    tab_favorites: 'السيارات المفضلة',
    tab_profile: 'البيانات الشخصية',
    no_bookings_yet: 'لا توجد حجوزات في هذا القسم حالياً.',
    btn_cancel_booking: 'إلغاء الحجز',
    btn_view_receipt: 'عرض الفاتورة والإيصال',

    // Admin
    admin_title: 'لوحة تحكم الإدارة - منصة الصفوة',
    admin_subtitle: 'إدارة الأسطول، الحجوزات، العملاء، الأسعار، والكوبونات والتقارير'
  },

  en: {
    site_title: 'Safwa Car Rental | Premium Car Booking Platform in KSA',
    tagline: 'Premium car rental with transparent pricing & instant booking across Saudi Arabia',
    nav_home: 'Home',
    nav_cars: 'Fleet',
    nav_categories: 'Car Types',
    nav_offers: 'Deals',
    nav_how_it_works: 'How to Book',
    nav_why_us: 'Why Us',
    nav_reviews: 'Reviews',
    nav_faq: 'FAQs',
    nav_contact: 'Contact Us',
    nav_login: 'Sign In',
    nav_register: 'Register',
    nav_my_account: 'My Account',
    nav_admin: 'Admin Portal',
    call_support: '24/7 Hotline',
    
    // Hero Search
    hero_badge: '✨ Premier Luxury Car Rental Platform in KSA',
    hero_title: 'Rent Your Perfect Car with Ease',
    hero_desc: 'Select your vehicle, choose pickup & return times, and experience seamless car rental with transparent pricing and full insurance.',
    search_pickup_location: 'Pickup Location',
    search_return_location: 'Return Location',
    search_same_location: 'Return car to same location',
    search_pickup_date: 'Pickup Date',
    search_pickup_time: 'Pickup Time',
    search_return_date: 'Return Date',
    search_return_time: 'Return Time',
    search_btn: 'Search Cars',
    rental_duration_days: 'Rental Duration: {days} Days',

    // Car Categories Section
    section_categories_title: 'Car Categories & Body Types',
    section_categories_subtitle: 'Choose the ideal vehicle class that matches your journey',
    cat_economy: 'Economy',
    cat_sedan: 'Sedan',
    cat_suv: 'SUV & 4x4',
    cat_family: 'Family',
    cat_luxury: 'Luxury',
    cat_sports: 'Sports',

    // Featured Cars
    section_featured_title: 'Featured Fleet',
    section_featured_subtitle: 'Pristine, inspected, and sanitized vehicles ready for instant handover',

    // Why Choose Us
    section_why_title: 'Why Choose Safwa?',
    section_why_subtitle: 'We set the highest benchmarks to ensure your journey is comfortable',
    why_1_title: 'Latest 2025 - 2026 Fleet',
    why_1_desc: 'All vehicles are modern, regularly serviced, and thoroughly sanitized.',
    why_2_title: '100% Transparent Pricing',
    why_2_desc: 'Zero hidden fees. Tax, rental duration, and insurance are crystal clear.',
    why_3_title: 'Clear & Flexible Insurance',
    why_3_desc: 'Comprehensive coverage options with an available zero-deductible plan (0 SAR).',
    why_4_title: 'Book in 2 Minutes',
    why_4_desc: 'Seamless digital flow. Land at the airport and pick up your keys without waiting.',
    why_5_title: '24/7 Customer Support',
    why_5_desc: 'Around-the-clock roadside assistance and customer service across Saudi Arabia.',
    why_6_title: 'Multiple Pickup Branches',
    why_6_desc: 'Located at major airport terminals and city hubs with inter-city drop-off support.',

    // Current Offers
    section_offers_title: 'Current Deals & Coupons',
    section_offers_subtitle: 'Take advantage of our exclusive promotional codes when booking today',

    // How to Book
    section_how_title: 'How It Works',
    section_how_subtitle: 'Four simple and swift steps from selection to driving away',
    step_num_1_title: '1. Select Your Car',
    step_num_1_desc: 'Browse our diverse fleet and compare specs and pricing to find the best fit.',
    step_num_2_title: '2. Choose Date & Location',
    step_num_2_desc: 'Set your pickup/return branches and schedule to view itemized pricing.',
    step_num_3_title: '3. Enter Your Details',
    step_num_3_desc: 'Provide your ID/Iqama and driver details for official digital contract issuance.',
    step_num_4_title: '4. Pay & Drive Away',
    step_num_4_desc: 'Pay securely using Mada or Cards and collect your vehicle on arrival.',

    // Testimonials
    section_reviews_title: 'Customer Testimonials',
    section_reviews_subtitle: 'Trusted by thousands of business travelers and families across KSA',

    // Filters
    filter_all: 'All',
    filter_category: 'Category',
    filter_price: 'Daily Rate (SAR)',
    filter_transmission: 'Transmission',
    filter_seats: 'Seats',
    filter_fuel: 'Fuel Type',
    filter_brand: 'Brand',
    filter_sort: 'Sort By',
    sort_featured: 'Most Popular',
    sort_price_asc: 'Lowest Price',
    sort_price_desc: 'Highest Price',
    sort_rating: 'Top Rated',
    clear_filters: 'Reset Filters',
    showing_results: 'Showing {count} available vehicles',

    // Car Cards
    per_day: 'SAR / Day',
    total_period: 'Total for {days} Days:',
    security_deposit: 'Deposit:',
    sar: 'SAR',
    sar_short: 'SAR',
    seats_label: 'Seats',
    doors_label: 'Doors',
    luggage_label: 'Luggage',
    automatic: 'Automatic',
    manual: 'Manual',
    btn_details: 'Details',
    btn_book_now: 'Book Now',
    btn_view_fleet: 'View Full Fleet',
    badge_available: 'Available',
    badge_reserved: 'Reserved',
    badge_rented: 'Rented',
    badge_maintenance: 'Maintenance',

    // Details Page
    details_title: 'Full Vehicle Specifications & Amenities',
    specs_year: 'Model Year:',
    specs_engine: 'Engine & Output:',
    specs_fuel_economy: 'Fuel Efficiency:',
    specs_transmission: 'Transmission:',
    specs_mileage_limit: 'Included Daily Km:',
    specs_extra_km: 'Extra Km Charge:',
    specs_features: 'Amenities & Equipment:',
    rental_terms_title: 'Rental Terms & Eligibility:',
    fuel_policy_title: 'Fuel Policy:',
    fuel_policy_desc: 'Full-to-Full policy with zero hidden fees.',
    cancellation_policy_title: 'Cancellation & Refund:',
    cancellation_policy_desc: '100% Free cancellation with instant refund up to 24h before pickup.',

    // Booking Wizard Steps
    step_1: '1. Vehicle',
    step_2: '2. Dates & Location',
    step_3: '3. Protection & Add-ons',
    step_4: '4. Driver Details',
    step_5: '5. Review Order',
    step_6: '6. Payment',

    // Pricing Breakdown
    pricing_breakdown_title: 'Itemized Pricing & Transparency',
    base_rent_rate: 'Base Car Rental ({days} Days × {rate} SAR):',
    diff_branch_fee: 'Inter-Branch Drop-off Charge:',
    insurance_fee: 'Protection Plan ({name}):',
    addons_total: 'Selected Add-ons:',
    coupon_discount: 'Promotional Discount:',
    subtotal: 'Subtotal Before Tax:',
    vat_label: 'Value Added Tax (15% VAT):',
    net_payable_now: 'Net Total Payable Now:',
    refundable_deposit_notice: 'Refundable Security Deposit (Hold):',
    deposit_clarification: 'The security deposit is a temporary pre-auth hold released immediately upon return in 3-7 business days.',

    // Confirmation
    booking_success_title: 'Booking Confirmed Successfully!',
    booking_ref_label: 'Booking Ref:',
    btn_print_receipt: 'Download Invoice (PDF)',
    btn_my_bookings: 'View in My Account',
    btn_home: 'Return to Home',

    // Customer Portal
    account_title: 'Customer Dashboard',
    tab_active_bookings: 'Active Bookings',
    tab_past_bookings: 'Past Bookings',
    tab_cancelled_bookings: 'Cancelled Bookings',
    tab_favorites: 'Favorite Cars',
    tab_profile: 'Profile Details',
    no_bookings_yet: 'No bookings found in this section.',
    btn_cancel_booking: 'Cancel Booking',
    btn_view_receipt: 'View Invoice',

    // Admin
    admin_title: 'Safwa Admin Operations Dashboard',
    admin_subtitle: 'Fleet management, bookings, clients, pricing, coupons, and reports'
  }
};

class I18n {
  constructor() {
    this.currentLang = localStorage.getItem('safwa_lang_v1') || 'ar';
  }

  getLang() {
    return this.currentLang;
  }

  isRTL() {
    return this.currentLang === 'ar';
  }

  setLang(lang) {
    if (lang !== 'ar' && lang !== 'en') return;
    this.currentLang = lang;
    localStorage.setItem('safwa_lang_v1', lang);
    this.applyToDOM();
    if (window.appStore) {
      window.appStore.emit('language_changed', lang);
    }
  }

  toggleLang() {
    this.setLang(this.currentLang === 'ar' ? 'en' : 'ar');
  }

  t(key, replacements = {}) {
    const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ar;
    let text = dict[key] || TRANSLATIONS.ar[key] || key;
    for (const [k, v] of Object.entries(replacements)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    }
    return text;
  }

  applyToDOM() {
    document.documentElement.lang = this.currentLang;
    document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        el.textContent = this.t(key);
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) {
        el.setAttribute('placeholder', this.t(key));
      }
    });

    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      langBtn.innerHTML = this.currentLang === 'ar' 
        ? '<span class="flag-icon">🇬🇧</span> English' 
        : '<span class="flag-icon">🇸🇦</span> العربية';
    }
  }
}

window.i18n = new I18n();
