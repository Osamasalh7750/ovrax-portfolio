/* ==========================================================================
   APP.JS - التطبيق الرئيسي، البحث المتقدم، اللغات (عربي/إنجليزي)،
   نظام الإشعارات الذكي، الدردشة المباشرة، وبطاقات الدعوة الإلكترونية
   ========================================================================== */

(function () {
  'use strict';

  // 1. نظام دعم اللغات (Multi-language Dictionary: AR / EN)
  let currentLang = 'ar';

  const translations = {
    ar: {
      brandTitle: 'أثير للمناسبات VIP',
      brandSubtitle: 'شاليهات فاخرة وتنظيم فعاليات',
      navHome: 'الرئيسية',
      nav3D: 'استعراض 3D',
      navVenues: 'الشاليهات والقاعات',
      navChecklist: 'تجهيزات القاعة',
      navCustom: 'تصميم مخصص',
      navCalculator: 'حاسبة الأسعار والتقويم',
      navReviews: 'آراء العملاء',
      navAdmin: 'لوحة الإدارة',
      btnDirectBook: 'احجز الآن بضغطة زر',
      btnExplore3D: 'استكشف بـ 3D',
      searchTitle: 'ابحث عن شاليهك أو قاعتك المثالية',
      supportOnline: 'متصل الآن للمساعدة',
      msgPlaceholder: 'اكتب استفسارك هنا لمناقشة التفاصيل...'
    },
    en: {
      brandTitle: 'Atheer Events VIP',
      brandSubtitle: 'Luxury Chalets & Event Venues',
      navHome: 'Home',
      nav3D: '3D Showcase',
      navVenues: 'Venues & Chalets',
      navChecklist: 'Venue Amenities',
      navCustom: 'Custom Request',
      navCalculator: 'Pricing & Calendar',
      navReviews: 'Testimonials',
      navAdmin: 'Admin Panel',
      btnDirectBook: '1-Click Direct Booking',
      btnExplore3D: 'Explore in 3D',
      searchTitle: 'Find Your Perfect Venue & Chalet',
      supportOnline: 'Online now for assistance',
      msgPlaceholder: 'Type your inquiry here to discuss details...'
    }
  };

  window.toggleLanguage = function () {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    const langBtn = document.getElementById('lang-switch-btn');
    if (langBtn) {
      langBtn.innerHTML = currentLang === 'ar' ? '<i class="fa-solid fa-globe"></i> English' : '<i class="fa-solid fa-globe"></i> العربية';
    }

    // تحديث النصوص المعلمة بـ data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[currentLang] && translations[currentLang][key]) {
        el.textContent = translations[currentLang][key];
      }
    });

    window.showAppNotification(currentLang === 'ar' ? 'تم تحويل اللغة إلى العربية' : 'Switched to English language', 'info');
  };

  // 2. نظام الإشعارات الذكي وتنبيهات الشاشة (Smart Notifications)
  const notificationsLog = [
    { title: 'عرض خاص', text: 'خصم 15% على حجوزات حفلات التخرج لشهر سبتمبر', time: 'منذ 10 دقائق', unread: true },
    { title: 'توافر جديد', text: 'تم فتح حجز نهاية الأسبوع لشاليه الفخامة VIP بالدرعية', time: 'منذ ساعة', unread: true },
    { title: 'تأكيد الحجوزات', text: 'تم تحديث تقويم التوافر اللحظي لجميع القاعات بدقة', time: 'منذ ساعتين', unread: false }
  ];

  window.toggleNotificationsDropdown = function () {
    const dropdown = document.getElementById('notifications-dropdown');
    if (!dropdown) return;
    dropdown.classList.toggle('active');

    // تصفير شارة غير المقروء
    const badge = document.getElementById('notif-unread-badge');
    if (badge) badge.style.display = 'none';
  };

  window.showAppNotification = function (message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `app-toast toast-${type}`;
    
    let icon = 'fa-circle-info';
    if (type === 'success') icon = 'fa-circle-check';
    if (type === 'warning') icon = 'fa-triangle-exclamation';

    toast.innerHTML = `
      <i class="fa-solid ${icon}"></i>
      <span>${message}</span>
      <button onclick="this.parentElement.remove()" style="background:none;border:none;color:inherit;cursor:pointer;margin-right:auto;">&times;</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.4s ease forwards';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  };

  // 3. البحث والفلترة المتقدمة للشاليهات والقاعات
  window.filterVenues = function () {
    const searchArea = document.getElementById('filter-area')?.value || 'all';
    const searchType = document.getElementById('filter-type')?.value || 'all';
    const searchGuests = parseInt(document.getElementById('filter-guests')?.value || '1000', 10);
    const searchKeyword = (document.getElementById('filter-keyword')?.value || '').toLowerCase().trim();

    const venueCards = document.querySelectorAll('.venue-card');
    let visibleCount = 0;

    venueCards.forEach(card => {
      const area = card.dataset.area || '';
      const type = card.dataset.type || '';
      const maxGuests = parseInt(card.dataset.capacity || '0', 10);
      const title = (card.querySelector('.venue-title')?.textContent || '').toLowerCase();

      let matchArea = searchArea === 'all' || area === searchArea;
      let matchType = searchType === 'all' || type.includes(searchType);
      let matchGuests = maxGuests >= searchGuests;
      let matchKeyword = searchKeyword === '' || title.includes(searchKeyword);

      if (matchArea && matchType && matchGuests && matchKeyword) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const resultsCountEl = document.getElementById('filter-results-count');
    if (resultsCountEl) {
      resultsCountEl.textContent = `تم العثور على ${visibleCount} شاليه وقاعة متاحة`;
    }
  };

  // 4. أداة الدردشة المباشرة للدعم الفني التفاعلي (Live Chat Widget)
  window.toggleLiveChat = function () {
    const chatWin = document.getElementById('live-chat-window');
    if (chatWin) chatWin.classList.toggle('active');
  };

  window.sendChatMessage = function (e) {
    if (e) e.preventDefault();
    const input = document.getElementById('chat-input-text');
    const msgContainer = document.getElementById('chat-messages-container');
    if (!input || !msgContainer || !input.value.trim()) return;

    const userText = input.value.trim();
    input.value = '';

    // إضافة رسالة العميل
    const userMsgEl = document.createElement('div');
    userMsgEl.className = 'chat-msg user';
    userMsgEl.textContent = userText;
    msgContainer.appendChild(userMsgEl);
    msgContainer.scrollTop = msgContainer.scrollHeight;

    // رد المنسق الذكي الفوري
    setTimeout(() => {
      const botMsgEl = document.createElement('div');
      botMsgEl.className = 'chat-msg bot';
      botMsgEl.innerHTML = generateBotReply(userText);
      msgContainer.appendChild(botMsgEl);
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }, 800);
  };

  function generateBotReply(query) {
    const q = query.toLowerCase();
    if (q.includes('سعر') || q.includes('تكلفة') || q.includes('كم')) {
      return 'أهلاً بك! يتم احتساب السعر تلقائياً بناءً على نوع الحفل وعدد الحضور المخطط له عبر <a href="#calculator" style="color:var(--champagne-primary);font-weight:bold;text-decoration:underline;">حاسبة الأسعار</a> في الصفحة.';
    } else if (q.includes('تاريخ') || q.includes('محجوز') || q.includes('متاح') || q.includes('موعد')) {
      return 'يمكنك تفقد التواريخ المحجوزة والمتاحة بدقة لحظة بلحظة عبر تقويم التوافر الفوري بالأعلى، الأيام الملونة بالأحمر محجوزة مسبقاً.';
    } else if (q.includes('ديكور') || q.includes('كوشة') || q.includes('ورد') || q.includes('تصميم جديد')) {
      return 'بالتأكيد! نوفر استوديو تصميم مخصص يتيح لك طلب أي ثيم أو كوشة أو توزيعات خاصة حسب رغبتك بالكامل وسنقوم بتجهيزها لك.';
    } else if (q.includes('صوت') || q.includes('تكييف') || q.includes('بوفيه') || q.includes('طعام')) {
      return 'جميع شاليهاتنا وقاعاتنا مجهزة بأنظمة صوت محيطية دي جي احترافية، تكييف مركزي متطور، وبوفيهات طعام ومشروبات ملكية.';
    } else {
      return 'سعيدون بتواصلك معنا! منسق الحفلات جاهز لمناقشة كافة التجهيزات معك فوراً، هل تود تأكيد حجز تاريخ محدد أو إضافة تجهيزات خاصة؟';
    }
  }

  // 5. بطاقة الدعوة الإلكترونية الذكية (Digital Invitation RSVP)
  window.openInvitationModal = function () {
    const modal = document.getElementById('invitation-modal');
    if (!modal) return;
    
    const guestInput = document.getElementById('invitation-guest-name');
    const guestName = guestInput?.value || 'الضيف الكريم';
    const s = window.BookingState || {};

    const nameDisplay = document.getElementById('invite-card-guest');
    const venueDisplay = document.getElementById('invite-card-venue');
    const dateDisplay = document.getElementById('invite-card-date');

    if (nameDisplay) nameDisplay.textContent = guestName;
    if (venueDisplay) venueDisplay.textContent = s.venueName || 'شاليه وقصر الفخامة VIP';
    if (dateDisplay) dateDisplay.textContent = s.selectedDate || '15 سبتمبر 2026';

    modal.classList.add('active');
  };

  window.closeInvitationModal = function () {
    const modal = document.getElementById('invitation-modal');
    if (modal) modal.classList.remove('active');
  };

  // 6. المساعد الذكي لاقتراح الثيمات بالذكاء الاصطناعي (AI Event Theme Recommender)
  window.suggestAITheme = function () {
    const themes = [
      {
        id: 'royal-gold',
        name: 'الذهبي والأبيض الملكي',
        lighting: 'sunset',
        desc: 'ثيم فاخر كلاسيكي مستوحى من قصور الرياض مع ورود بيضاء وأضواء ذهبية هادئة تناسب حفلات الزفاف والملكة.'
      },
      {
        id: 'blush-rose',
        name: 'الوردي الباستيل والروز',
        lighting: 'sunset',
        desc: 'ثيم شاعري أنيق يدمج زهور البيبي روز الطبيعية مع أقمشة حريرية باستيل ناعمة، مثالي للخطوبة والحفلات الخاصة.'
      },
      {
        id: 'sage-green',
        name: 'الأخضر السيج والطبيعة البوهيمية',
        lighting: 'day',
        desc: 'ثيم مستوحى من واحات الدرعية والعمارية مع نباتات البامبو والأوكالبتوس المريحة للعين لجلسات النهار والغروب.'
      },
      {
        id: 'lavender-dream',
        name: 'اللافندر والبنفسجي الملكي',
        lighting: 'night',
        desc: 'ثيم ساحر مستوحى من زهور الخزامى النجدية مع إضاءات فيري لايتس خافتة لسهرات احتفالية استثنائية.'
      }
    ];

    const pick = themes[Math.floor(Math.random() * themes.length)];

    // تفعيل الثيم في الواجهة
    document.querySelectorAll('.theme-option-card').forEach(card => {
      card.classList.toggle('selected', card.dataset.theme === pick.id);
    });

    if (window.BookingState) {
      window.BookingState.customDecorTheme = pick.id;
    }

    // تفعيل الإضاءة المناسبة في عارض الـ 3D
    if (window.set3DLightingMode) {
      window.set3DLightingMode(pick.lighting);
    }

    window.showAppNotification(`✨ ذكاء اصطناعي: تم اختيار [${pick.name}] وتحديث إضاءة الـ 3D!`, 'success');
  };

  // 7. نظام إضافة التقييمات التفاعلي
  window.handleReviewSubmit = function (e) {
    e.preventDefault();
    const name = document.getElementById('rev-name')?.value || 'ضيف أثير الكريم';
    const eventType = document.getElementById('rev-event')?.value || 'مناسبة خاصة';
    const stars = parseInt(document.getElementById('rev-stars')?.value || '5', 10);
    const comment = document.getElementById('rev-comment')?.value || '';

    const newReview = { name, eventType, stars, comment, date: 'الآن' };

    let reviews = JSON.parse(localStorage.getItem('user_reviews') || '[]');
    reviews.unshift(newReview);
    localStorage.setItem('user_reviews', JSON.stringify(reviews));

    appendReviewToGrid(newReview);

    document.getElementById('add-review-modal')?.classList.remove('active');
    document.getElementById('new-review-form')?.reset();

    window.showAppNotification('شكراً لمشاركتنا تجربتك وتقييمك للحفل! 🎉', 'success');
  };

  function appendReviewToGrid(r) {
    const grid = document.getElementById('testimonials-grid-container');
    if (!grid) return;

    const card = document.createElement('div');
    card.className = 'review-card';

    let starsHtml = '';
    for (let i = 0; i < r.stars; i++) starsHtml += '<i class="fa-solid fa-star"></i>';

    const initials = r.name.split(' ').map(n => n[0]).join('.').slice(0, 3);

    card.innerHTML = `
      <div class="review-user-info">
        <div class="review-avatar">${initials || 'ضيف'}</div>
        <div>
          <strong style="display:block; font-size: 0.98rem; color:var(--text-dark);">${r.name}</strong>
          <small style="color:var(--text-muted);">${r.eventType} (${r.date})</small>
        </div>
      </div>
      <div class="review-stars">${starsHtml}</div>
      <p style="font-size: 0.92rem; color:var(--text-body); line-height: 1.7;">"${r.comment}"</p>
    `;

    grid.prepend(card);
  }

  function loadUserReviews() {
    const saved = localStorage.getItem('user_reviews');
    if (saved) {
      try {
        const list = JSON.parse(saved);
        list.forEach(r => appendReviewToGrid(r));
      } catch (e) {}
    }
  }

  // تهيئة عامة
  document.addEventListener('DOMContentLoaded', () => {
    // أحداث البحث
    const filterInputs = ['filter-area', 'filter-type', 'filter-guests', 'filter-keyword'];
    filterInputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', window.filterVenues);
    });

    // أحداث نموذج الدردشة
    const chatForm = document.getElementById('live-chat-form');
    if (chatForm) chatForm.addEventListener('submit', window.sendChatMessage);

    // تحميل تقييمات المستخدمين المحفوظة
    loadUserReviews();
  });

})();

