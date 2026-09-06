/**
 * منصة مَنار التعليمية - محرك التطبيق الرئيسي (app.js)
 * تطبيق متكامل خفيف وسريع يعمل 100% بالنقر المزدوج (file:///) بدون خادم
 */

(function() {
  "use strict";

  // الحالة العامة للتطبيق
  var AppState = {
    currentView: "home",
    selectedStage: "all",
    selectedSubject: "all",
    searchQuery: "",
    activeLesson: null,
    activeTeacher: null,
    activeCourse: null,
    activeBook: null,
    activeBookPage: 0,
    activeVideoCourse: null,
    activeVideoEpisodeIdx: 0,
    isVideoPlaying: false,
    videoPlaybackSpeed: 1
  };

  // أيقونات SVG مدمجة فائقة الدقة لضمان العمل التام بدون إنترنت
  var ICONS = {
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    star: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
    calendar: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>',
    clock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
    mapPin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    home: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
    globe: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
    book: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
    play: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',
    pause: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>',
    award: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>',
    user: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
    close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    school: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>'
  };

  // تهيئة التطبيق عند اكتمال تحميل الصفحة
  window.addEventListener("DOMContentLoaded", function() {
    initNavigation();
    initStageFilters();
    initSearch();
    renderCurrentView();
    updateStudentHeaderBadge();

    // استجابة لتغيرات الـ Hash في الرابط (e.g. #lessons, #teachers)
    window.addEventListener("hashchange", function() {
      var hash = window.location.hash.replace("#", "") || "home";
      switchView(hash);
    });

    // قراءة الـ Hash الأولي
    if (window.location.hash) {
      var initialHash = window.location.hash.replace("#", "");
      if (["home", "lessons", "teachers", "courses", "library", "videos", "dashboard"].indexOf(initialHash) !== -1) {
        switchView(initialHash);
      }
    }
  });

  // تحديث شارة ملف الطالب في أعلى الصفحة
  function updateStudentHeaderBadge() {
    var user = ManarStorage.getUserProfile();
    var nameEl = document.getElementById("header-student-name");
    var avatarEl = document.getElementById("header-student-avatar");
    if (nameEl) nameEl.textContent = user.name;
    if (avatarEl) avatarEl.textContent = user.name.charAt(0);
  }

  // إدارة شريط التنقل
  function initNavigation() {
    var navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(function(link) {
      link.addEventListener("click", function(e) {
        e.preventDefault();
        var targetView = this.getAttribute("data-view");
        switchView(targetView);
        window.location.hash = targetView;
      });
    });

    var brandLogo = document.querySelector(".brand-logo");
    if (brandLogo) {
      brandLogo.addEventListener("click", function(e) {
        e.preventDefault();
        switchView("home");
        window.location.hash = "home";
      });
    }

    var profileBtn = document.getElementById("btn-open-profile");
    if (profileBtn) {
      profileBtn.addEventListener("click", function() {
        switchView("dashboard");
        window.location.hash = "dashboard";
      });
    }
  }

  // تبديل الشاشات
  function switchView(viewName) {
    AppState.currentView = viewName;

    // تحديث الأزرار النشطة في النافبار
    var navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(function(link) {
      if (link.getAttribute("data-view") === viewName) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    renderCurrentView();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // إدارة تصفية المراحل الدراسية
  function initStageFilters() {
    var stageBtns = document.querySelectorAll(".stage-tab-btn");
    stageBtns.forEach(function(btn) {
      btn.addEventListener("click", function() {
        stageBtns.forEach(function(b) { b.classList.remove("active"); });
        this.classList.add("active");
        AppState.selectedStage = this.getAttribute("data-stage");
        renderCurrentView();
      });
    });
  }

  // إدارة البحث النصي اللحظي
  function initSearch() {
    var searchInput = document.getElementById("global-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", function(e) {
        AppState.searchQuery = e.target.value.trim().toLowerCase();
        renderCurrentView();
      });
    }
  }

  // التوجيه والعرض حسب الشاشة الحالية
  function renderCurrentView() {
    var container = document.getElementById("view-container");
    if (!container) return;

    switch (AppState.currentView) {
      case "home":
        renderHomeView(container);
        break;
      case "lessons":
        renderLessonsView(container);
        break;
      case "teachers":
        renderTeachersView(container);
        break;
      case "courses":
        renderCoursesView(container);
        break;
      case "library":
        renderLibraryView(container);
        break;
      case "videos":
        renderVideosView(container);
        break;
      case "dashboard":
        renderDashboardView(container);
        break;
      default:
        renderHomeView(container);
    }
  }

  /* =========================================================================
   * 1. واجهة الصفحة الرئيسية (Home View)
   * ========================================================================= */
  function renderHomeView(container) {
    var html = `
      <!-- البنر التعريفي الأكاديمي الرصين -->
      <section class="hero-academic-panel">
        <div class="hero-text-content">
          <div class="hero-badge-tag">
            ${ICONS.award}
            <span>منصة معتمدة لطلاب التعليم العام</span>
          </div>
          <h1 class="hero-title">منصة «مَنار» العلمية لطلاب المدارس</h1>
          <p class="hero-description">
            بيئة دراسية أصيلة تجمع شروحات المناهج المبسطة، وتوفر نخبة المعلمين الخصوصيين للحجز الحضوري في منزلك أو عبر الفصول الافتراضية، مع دورات المدارس المعتمدة والمكتبة العملية الرقمية.
          </p>
          <div class="hero-quick-features">
            <div class="quick-feature-item">
              ${ICONS.check}
              <span>حجز مدرسين بالمنزل أو أونلاين</span>
            </div>
            <div class="quick-feature-item">
              ${ICONS.check}
              <span>دورات وشراكات مع كبرى المدارس</span>
            </div>
            <div class="quick-feature-item">
              ${ICONS.check}
              <span>مكتبة مذكرات وتجارب معملية وقارئ مدمج</span>
            </div>
          </div>
        </div>

        <div class="hero-stats-box">
          <div class="stat-item">
            <span class="stat-number">12,000+</span>
            <span class="stat-label">طالب ومستفيد</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">100%</span>
            <span class="stat-label">مطابقة للمناهج المدرسية</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">4.9 ★</span>
            <span class="stat-label">تقييم أولياء الأمور</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">حضوري وأونلاين</span>
            <span class="stat-label">مرونة كاملة في اللقاء</span>
          </div>
        </div>
      </section>

      <!-- تصفية المراحل السريعة -->
      ${renderStageFilterBar()}

      <!-- قسم شروحات الدروس المختارة -->
      <section class="home-section mb-5">
        <div class="section-header-block">
          <div class="section-title-group">
            <h2>شروحات الدروس التفاعلية</h2>
            <p>تبسيط المفاهيم الصعبة بطرق منطقية وأمثلة حياتية واختبارات قياس فهم سريعة</p>
          </div>
          <button class="btn-view-all" onclick="ManarApp.switchView('lessons')">
            عرض كل الدروس (${ManarData.lessons.length}) &larr;
          </button>
        </div>
        <div class="grid-layout-3">
          ${filterLessons().slice(0, 3).map(renderLessonCard).join("")}
        </div>
      </section>

      <!-- قسم نخبة المعلمين والحجز الحضوري والأونلاين -->
      <section class="home-section mb-5">
        <div class="section-header-block">
          <div class="section-title-group">
            <h2>حجز المعلمين المتخصصين</h2>
            <p>احجز معلماً متميزاً: أونلاين عبر القاعات الافتراضية، أو زيارة حضورية لمنزل الطالب، أو في مكان هادئ متفق عليه</p>
          </div>
          <button class="btn-view-all" onclick="ManarApp.switchView('teachers')">
            دليل المعلمين الكامل &larr;
          </button>
        </div>
        <div class="grid-layout-3">
          ${filterTeachers().slice(0, 3).map(renderTeacherCard).join("")}
        </div>
      </section>

      <!-- قسم دورات المدارس الشريكة -->
      <section class="home-section mb-5">
        <div class="section-header-block">
          <div class="section-title-group">
            <h2>دورات ومعسكرات المدارس المعتمدة</h2>
            <p>برامج متخصصة تقام بالتعاون الرسمي مع كبرى المدارس النموذجية ومراكز الموهوبين</p>
          </div>
          <button class="btn-view-all" onclick="ManarApp.switchView('courses')">
            جميع الدورات المتاحة &larr;
          </button>
        </div>
        <div class="grid-layout-2">
          ${filterCourses().slice(0, 2).map(renderCourseCard).join("")}
        </div>
      </section>

      <!-- قسم الكتب والمكتبة العملية -->
      <section class="home-section mb-5">
        <div class="section-header-block">
          <div class="section-title-group">
            <h2>كتب المناهج والمكتبة العملية</h2>
            <p>كتب دراسية رسمية، مذكرات تفوق، أوراق عمل وتجارب علمية مع قارئ إلكتروني مدمج</p>
          </div>
          <button class="btn-view-all" onclick="ManarApp.switchView('library')">
            تصفح المكتبة &larr;
          </button>
        </div>
        <div class="grid-layout-4">
          ${filterLibrary().slice(0, 4).map(renderLibraryCard).join("")}
        </div>
      </section>
    `;

    container.innerHTML = html;
  }

  /* =========================================================================
   * 2. واجهة شروحات الدروس (Lessons View)
   * ========================================================================= */
  function renderLessonsView(container) {
    var lessons = filterLessons();
    var html = `
      <div class="section-header-block">
        <div class="section-title-group">
          <h2>شروحات الدروس والمناهج</h2>
          <p>شرح مبسط، أمثلة توضيحية خطوة بخطوة، واختبارات تفاعلية ذاتية التصحيح</p>
        </div>
      </div>

      ${renderStageFilterBar()}

      <!-- شريط فلترة المواد -->
      ${renderSubjectFilterBar()}

      ${lessons.length === 0 ? renderEmptyState("لم نجد دروساً تطابق خيارات البحث الحالية.") : `
        <div class="grid-layout-3">
          ${lessons.map(renderLessonCard).join("")}
        </div>
      `}
    `;
    container.innerHTML = html;
  }

  /* =========================================================================
   * 3. واجهة حجز المدرسين (Teachers View)
   * ========================================================================= */
  function renderTeachersView(container) {
    var teachers = filterTeachers();
    var html = `
      <div class="section-header-block">
        <div class="section-title-group">
          <h2>حجز المعلمين الخصوصيين (حضوري وأونلاين)</h2>
          <p>اختر المعلم المناسب وحدد طريقة الدرس: أونلاين، أو في منزلك، أو في قاعة/مكان متفق عليه</p>
        </div>
      </div>

      <!-- تنبيه إرشادي عن طرق التدريس -->
      <div class="callout-box mb-4">
        <strong>خيارات مرنة ومريحة:</strong>
        تتيح المنصة إما لقاءات تفاعلية عبر الإنترنت، أو حضور المعلم إلى منزل الطالب في الأحياء المحددة، أو اللقاء في أماكن دراسية هادئة ومعتمدة مثل المكتبات العامة والمراكز الثقافية.
      </div>

      ${renderStageFilterBar()}

      ${teachers.length === 0 ? renderEmptyState("لم نجد معلمين مطابقين للبحث.") : `
        <div class="grid-layout-3">
          ${teachers.map(renderTeacherCard).join("")}
        </div>
      `}
    `;
    container.innerHTML = html;
  }

  /* =========================================================================
   * 4. واجهة دورات المدارس الشريكة (Courses View)
   * ========================================================================= */
  function renderCoursesView(container) {
    var courses = filterCourses();
    var html = `
      <div class="section-header-block">
        <div class="section-title-group">
          <h2>دورات المدارس المعتمدة والشريكة</h2>
          <p>دورات تقوية، معسكرات تحصيلي وقدرات، وورش STEM بالتعاون مع أرقى المدارس ومراكز الموهبة</p>
        </div>
      </div>

      <!-- قائمة المدارس الشريكة في المنصة -->
      <div class="section-sub-block mb-4">
        <h4 style="font-size: 1rem; color: var(--academic-blue); margin-bottom: 12px; font-weight: 700;">المدارس والمجمعات الشريكة في المنصة:</h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          ${ManarData.partnerSchools.map(function(s) {
            return `
              <div style="background: var(--bg-card); border: 1px solid var(--border-light); padding: 10px 14px; border-radius: var(--radius-sm); font-size: 0.85rem; display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--academic-green);">${ICONS.school}</span>
                <strong>${s.name}</strong>
                <span style="color: var(--ink-muted); font-size: 0.78rem;">(${s.city})</span>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      ${renderStageFilterBar()}

      ${courses.length === 0 ? renderEmptyState("لا توجد دورات مطابقة للمعايير المختارة.") : `
        <div class="grid-layout-2">
          ${courses.map(renderCourseCard).join("")}
        </div>
      `}
    `;
    container.innerHTML = html;
  }

  /* =========================================================================
   * 5. واجهة المكتبة العملية والكتب (Library View)
   * ========================================================================= */
  function renderLibraryView(container) {
    var books = filterLibrary();
    var html = `
      <div class="section-header-block">
        <div class="section-title-group">
          <h2>المكتبة العلمية وقارئ الكتب المدرسية المدمج</h2>
          <p>كتب المناهج الرسمية، مذكرات تفوق، أوراق عمل نموذجية ودليل التجارب المعملية التفاعلية</p>
        </div>
      </div>

      ${renderStageFilterBar()}

      ${books.length === 0 ? renderEmptyState("لم نجد مراجع أو كتب مطابقة.") : `
        <div class="grid-layout-4">
          ${books.map(renderLibraryCard).join("")}
        </div>
      `}
    `;
    container.innerHTML = html;
  }

  /* =========================================================================
   * 6. واجهة فيديوهات الكورسات (Videos View)
   * ========================================================================= */
  function renderVideosView(container) {
    var courses = ManarData.videoCourses;
    if (AppState.searchQuery) {
      courses = courses.filter(function(c) {
        return c.title.toLowerCase().indexOf(AppState.searchQuery) !== -1 ||
               c.instructor.toLowerCase().indexOf(AppState.searchQuery) !== -1;
      });
    }

    var html = `
      <div class="section-header-block">
        <div class="section-title-group">
          <h2>فيديوهات الكورسات والشروحات المصورة</h2>
          <p>مشغل فيديو تفاعلي مدمج مع سبورة افتراضية، دفتر ملاحظات حي، واختبارات قصيرة بعد كل حلقة</p>
        </div>
      </div>

      <div class="grid-layout-3">
        ${courses.map(renderVideoCourseCard).join("")}
      </div>
    `;
    container.innerHTML = html;
  }

  /* =========================================================================
   * 7. واجهة لوحة تحكم الطالب (Dashboard View)
   * ========================================================================= */
  function renderDashboardView(container) {
    var user = ManarStorage.getUserProfile();
    var bookings = ManarStorage.getBookings();
    var regs = ManarStorage.getRegistrations();
    var bookmarks = ManarStorage.getBookmarks();

    var html = `
      <!-- بطاقة تعريف الطالب -->
      <div class="hero-academic-panel mb-4" style="padding: 26px 30px;">
        <div style="display: flex; align-items: center; gap: 20px;">
          <div class="teacher-avatar" style="width: 72px; height: 72px; font-size: 1.8rem; background-color: var(--academic-blue);">
            ${user.name.charAt(0)}
          </div>
          <div>
            <span class="hero-badge-tag">${user.grade}</span>
            <h2 style="font-size: 1.45rem; color: var(--academic-blue); margin: 4px 0;">${user.name}</h2>
            <p style="font-size: 0.88rem; color: var(--ink-muted);">
              ${user.school} • ${user.city} • هاتف: ${user.phone}
            </p>
          </div>
        </div>
        <div>
          <button class="btn-secondary" onclick="ManarApp.openEditProfileModal()">
            ${ICONS.user} تعديل الملف الدراسي
          </button>
        </div>
      </div>

      <!-- إحصائيات سريعة في لوحة التحكم -->
      <div class="dashboard-summary-grid">
        <div class="dash-stat-card">
          <div class="dash-icon-box blue">${ICONS.calendar}</div>
          <div class="dash-stat-info">
            <h4>${bookings.length}</h4>
            <span>حصة مع المعلمين</span>
          </div>
        </div>
        <div class="dash-stat-card">
          <div class="dash-icon-box green">${ICONS.school}</div>
          <div class="dash-stat-info">
            <h4>${regs.length}</h4>
            <span>دورة مدرسية مسجلة</span>
          </div>
        </div>
        <div class="dash-stat-card">
          <div class="dash-icon-box amber">${ICONS.book}</div>
          <div class="dash-stat-info">
            <h4>${bookmarks.length}</h4>
            <span>عنصر في المفضلة</span>
          </div>
        </div>
      </div>

      <!-- جدول الحجوزات مع المعلمين -->
      <div class="section-header-block">
        <div class="section-title-group">
          <h2>حجوزات المعلمين القادمة</h2>
          <p>الحصص المجدولة بنوعيها: أونلاين وحضورياً بالمنزل أو في الأماكن المختارة</p>
        </div>
        <button class="btn-primary" onclick="ManarApp.switchView('teachers')">
          + حجز حصة جديدة
        </button>
      </div>

      ${bookings.length === 0 ? '<p style="color: var(--ink-muted); margin-bottom: 30px;">لا توجد حجوزات مجدولة حالياً.</p>' : `
        <div class="table-responsive-wrapper">
          <table class="custom-table">
            <thead>
              <tr>
                <th>رقم الحجز</th>
                <th>المعلم والمادة</th>
                <th>طريقة الحصة</th>
                <th>الموعد والتوقيت</th>
                <th>المكان / الرابط</th>
                <th>الحالة</th>
                <th>الإجراء</th>
              </tr>
            </thead>
            <tbody>
              ${bookings.map(function(b) {
                return `
                  <tr>
                    <td><strong>#${b.id}</strong></td>
                    <td>
                      <div style="font-weight: 600; color: var(--ink-primary);">${b.teacherName}</div>
                      <div style="font-size: 0.78rem; color: var(--ink-muted);">${b.subject}</div>
                    </td>
                    <td>
                      <span class="mode-pill ${b.mode === 'online' ? 'online' : (b.mode === 'in_person_home' ? 'home' : 'location')}">
                        ${b.modeLabel || (b.mode === 'online' ? 'أونلاين' : 'حضوري')}
                      </span>
                    </td>
                    <td>
                      <div style="font-size: 0.85rem;">${b.day}</div>
                      <div style="font-size: 0.78rem; color: var(--ink-muted);">${b.timeSlot}</div>
                    </td>
                    <td style="font-size: 0.84rem;">${b.location || 'منزل الطالب'}</td>
                    <td><span style="color: var(--academic-green); font-weight: 600;">${b.status}</span></td>
                    <td>
                      <button class="btn-secondary" style="padding: 4px 8px; font-size: 0.78rem; color: var(--academic-rose);" onclick="ManarApp.cancelBooking('${b.id}')">
                        إلغاء الموعد
                      </button>
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      `}

      <!-- جدول الدورات المدرسية المسجل بها -->
      <div class="section-header-block mt-5">
        <div class="section-title-group">
          <h2>الدورات والمعسكرات المسجل بها</h2>
          <p>البرامج المعتمدة بالتعاون مع المدارس الشريكة</p>
        </div>
        <button class="btn-secondary" onclick="ManarApp.switchView('courses')">
          استكشاف دورات أخرى
        </button>
      </div>

      ${regs.length === 0 ? '<p style="color: var(--ink-muted);">لم تسجل في أي دورة مدرسية بعد.</p>' : `
        <div class="table-responsive-wrapper">
          <table class="custom-table">
            <thead>
              <tr>
                <th>كود التسجيل</th>
                <th>اسم الدورة</th>
                <th>المدرسة الشريكة</th>
                <th>الصيغة</th>
                <th>الرسوم</th>
                <th>حالة المقعد</th>
              </tr>
            </thead>
            <tbody>
              ${regs.map(function(r) {
                return `
                  <tr>
                    <td><strong>#${r.id}</strong></td>
                    <td style="font-weight: 600; color: var(--ink-primary);">${r.courseTitle}</td>
                    <td>${r.schoolName}</td>
                    <td><span class="meta-tag">${r.format || 'مدمج'}</span></td>
                    <td><strong>${r.price} ر.س</strong></td>
                    <td><span style="color: var(--academic-green); font-weight: 600;">${r.status}</span></td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      `}
    `;

    container.innerHTML = html;
  }

  /* =========================================================================
   * المساعدات والتصفية (Helpers & Render Cards)
   * ========================================================================= */

  // شريط فلترة المراحل الدراسية
  function renderStageFilterBar() {
    return `
      <div class="stage-selector-bar">
        <div class="stage-tabs">
          ${ManarData.stages.map(function(stg) {
            var activeClass = AppState.selectedStage === stg.id ? "active" : "";
            return `
              <button class="stage-tab-btn ${activeClass}" data-stage="${stg.id}" onclick="ManarApp.selectStage('${stg.id}')">
                ${stg.name}
              </button>
            `;
          }).join("")}
        </div>
        <div class="search-field-wrapper">
          <span class="search-icon-pos">🔍</span>
          <input type="text" id="global-search-input" placeholder="ابحث عن درس، معلم، كتاب، أو دورة..." value="${AppState.searchQuery}" oninput="ManarApp.onSearchInput(this.value)">
        </div>
      </div>
    `;
  }

  // شريط فلترة المواد الدراسية
  function renderSubjectFilterBar() {
    return `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
        ${ManarData.subjects.map(function(sub) {
          var isSel = AppState.selectedSubject === sub.id;
          return `
            <button class="stage-tab-btn ${isSel ? 'active' : ''}" style="border: 1px solid var(--border-medium);" onclick="ManarApp.selectSubject('${sub.id}')">
              ${sub.name}
            </button>
          `;
        }).join("")}
      </div>
    `;
  }

  function renderEmptyState(message) {
    return `
      <div style="background-color: var(--bg-card); border: 1px dashed var(--border-medium); border-radius: var(--radius-md); padding: 48px 24px; text-align: center; color: var(--ink-muted); margin: 30px 0;">
        <div style="font-size: 2.2rem; margin-bottom: 12px; opacity: 0.5;">📖</div>
        <h4 style="color: var(--ink-primary); font-size: 1.15rem; margin-bottom: 6px;">لا توجد نتائج متوفرة</h4>
        <p style="font-size: 0.9rem;">${message}</p>
        <button class="btn-secondary" style="margin-top: 16px;" onclick="ManarApp.resetFilters()">
          إعادة ضبط التصفية والبحث
        </button>
      </div>
    `;
  }

  // فلترة الدروس
  function filterLessons() {
    return ManarData.lessons.filter(function(item) {
      var matchStage = AppState.selectedStage === "all" || item.stage === AppState.selectedStage;
      var matchSubject = AppState.selectedSubject === "all" || item.subject === AppState.selectedSubject;
      var matchSearch = !AppState.searchQuery ||
        item.title.toLowerCase().indexOf(AppState.searchQuery) !== -1 ||
        item.summary.toLowerCase().indexOf(AppState.searchQuery) !== -1 ||
        item.grade.toLowerCase().indexOf(AppState.searchQuery) !== -1;
      return matchStage && matchSubject && matchSearch;
    });
  }

  // فلترة المعلمين
  function filterTeachers() {
    return ManarData.teachers.filter(function(item) {
      var matchStage = AppState.selectedStage === "all";
      if (!matchStage) {
        var stageObj = ManarData.stages.find(function(s) { return s.id === AppState.selectedStage; });
        if (stageObj) {
          matchStage = item.stages.some(function(st) { return st.indexOf(stageObj.name.replace("المرحلة ", "")) !== -1; });
        }
      }
      var matchSearch = !AppState.searchQuery ||
        item.name.toLowerCase().indexOf(AppState.searchQuery) !== -1 ||
        item.title.toLowerCase().indexOf(AppState.searchQuery) !== -1 ||
        item.subjects.join(" ").toLowerCase().indexOf(AppState.searchQuery) !== -1 ||
        item.coverageAreas.join(" ").toLowerCase().indexOf(AppState.searchQuery) !== -1;
      return matchStage && matchSearch;
    });
  }

  // فلترة الدورات المدرسية
  function filterCourses() {
    return ManarData.schoolCourses.filter(function(item) {
      var matchStage = AppState.selectedStage === "all";
      if (!matchStage) {
        var stageObj = ManarData.stages.find(function(s) { return s.id === AppState.selectedStage; });
        if (stageObj) {
          matchStage = item.stage.indexOf(stageObj.name.replace("المرحلة ", "")) !== -1;
        }
      }
      var matchSearch = !AppState.searchQuery ||
        item.title.toLowerCase().indexOf(AppState.searchQuery) !== -1 ||
        item.schoolName.toLowerCase().indexOf(AppState.searchQuery) !== -1 ||
        item.teacherName.toLowerCase().indexOf(AppState.searchQuery) !== -1;
      return matchStage && matchSearch;
    });
  }

  // فلترة المكتبة
  function filterLibrary() {
    return ManarData.library.filter(function(item) {
      var matchStage = AppState.selectedStage === "all" || item.stage === AppState.selectedStage;
      var matchSubject = AppState.selectedSubject === "all" || item.subject === AppState.selectedSubject;
      var matchSearch = !AppState.searchQuery ||
        item.title.toLowerCase().indexOf(AppState.searchQuery) !== -1 ||
        item.author.toLowerCase().indexOf(AppState.searchQuery) !== -1 ||
        item.typeName.toLowerCase().indexOf(AppState.searchQuery) !== -1;
      return matchStage && matchSubject && matchSearch;
    });
  }

  // رسم بطاقة درس
  function renderLessonCard(lesson) {
    return `
      <div class="lesson-card">
        <div>
          <div class="card-top-meta">
            <span class="subject-badge">${lesson.subjectName}</span>
            <span class="reading-time-pill">${ICONS.clock} ${lesson.readTime}</span>
          </div>
          <h3 class="lesson-card-title">${lesson.title}</h3>
          <p class="lesson-card-desc">${lesson.summary}</p>
        </div>
        <div class="card-footer-action">
          <span class="grade-label">${lesson.grade}</span>
          <button class="btn-primary" onclick="ManarApp.openLessonModal('${lesson.id}')">
            ابدأ قراءة الشرح &larr;
          </button>
        </div>
      </div>
    `;
  }

  // رسم بطاقة معلم
  function renderTeacherCard(teacher) {
    return `
      <div class="teacher-card">
        <div class="teacher-header">
          <div class="teacher-avatar" style="background-color: ${teacher.avatarBg};">
            ${teacher.name.charAt(0)}
          </div>
          <div class="teacher-info-primary">
            <h3 class="teacher-name">${teacher.name}</h3>
            <p class="teacher-title">${teacher.title}</p>
            <div class="rating-badge">
              ${ICONS.star}
              <span>${teacher.rating} (${teacher.reviewsCount} تقييم)</span>
            </div>
          </div>
        </div>

        <p class="teacher-bio-snippet">${teacher.bio}</p>

        <!-- وسوم طرق الحجز المتاحة -->
        <div class="modes-available-block">
          <span class="modes-label">طرق التدريس المتاحة:</span>
          <div class="modes-pills">
            ${teacher.modes.online ? `<span class="mode-pill online">${ICONS.globe} أونلاين</span>` : ''}
            ${teacher.modes.inPersonHome ? `<span class="mode-pill home">${ICONS.home} حضوري بالمنزل</span>` : ''}
            ${teacher.modes.inPersonLocation ? `<span class="mode-pill location">${ICONS.mapPin} مكان متفق عليه</span>` : ''}
          </div>
        </div>

        <div class="teacher-card-bottom">
          <div class="price-box">
            <span class="price-amount">${teacher.hourlyRate} ر.س</span>
            <span class="price-unit">للساعة التعليمية</span>
          </div>
          <button class="btn-primary" onclick="ManarApp.openBookingModal('${teacher.id}')">
            ${ICONS.calendar} احجز موعداً
          </button>
        </div>
      </div>
    `;
  }

  // رسم بطاقة دورة مدرسة
  function renderCourseCard(course) {
    var fillPercent = Math.round(((course.seatsTotal - course.seatsLeft) / course.seatsTotal) * 100);
    return `
      <div class="course-card">
        <div>
          <div class="school-partner-header">
            <div class="school-crest-badge">${ICONS.school}</div>
            <div class="school-title-text">${course.schoolName}</div>
          </div>
          <h3 class="course-title">${course.title}</h3>
          
          <div class="course-meta-tags">
            <span class="meta-tag">${course.grade}</span>
            <span class="meta-tag">${course.duration}</span>
            <span class="meta-tag">${course.format}</span>
          </div>

          <p class="course-description">${course.description}</p>

          <div class="course-seats-bar">
            <div class="seats-info">
              <span>المقاعد المتبقية: <strong>${course.seatsLeft}</strong> من أصل ${course.seatsTotal}</span>
              <span>تبدأ: ${course.startDate}</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${fillPercent}%;"></div>
            </div>
          </div>
        </div>

        <div class="card-footer-action">
          <div class="price-box">
            <span class="price-amount">${course.price} ر.س</span>
            ${course.originalPrice ? `<span style="text-decoration: line-through; color: var(--ink-muted); font-size: 0.78rem;">${course.originalPrice} ر.س</span>` : ''}
          </div>
          <button class="btn-outline-green" onclick="ManarApp.openCourseRegModal('${course.id}')">
            ${ICONS.check} التسجيل في الدورة
          </button>
        </div>
      </div>
    `;
  }

  // رسم بطاقة مكتبة
  function renderLibraryCard(book) {
    return `
      <div class="library-card">
        <div>
          <div class="book-visual-spine">
            <div class="book-icon-large">${ICONS.book}</div>
            <span class="book-spine-pages">${book.pagesCount} صفحة • ${book.fileSize}</span>
          </div>
          <span class="subject-badge mb-2">${book.typeName}</span>
          <h3 class="book-title" style="margin-top: 8px;">${book.title}</h3>
          <p class="book-author">${book.author}</p>
        </div>
        <div class="book-actions-group">
          <button class="btn-primary" style="font-size: 0.82rem; padding: 6px 10px;" onclick="ManarApp.openReaderModal('${book.id}')">
            تصفح وقراءة
          </button>
          <button class="btn-secondary" style="font-size: 0.82rem; padding: 6px 10px;" onclick="ManarApp.downloadBookMock('${book.id}')">
            تحميل PDF
          </button>
        </div>
      </div>
    `;
  }

  // رسم بطاقة فيديو
  function renderVideoCourseCard(course) {
    return `
      <div class="video-card">
        <div class="video-thumbnail-sim" onclick="ManarApp.openVideoPlayerModal('${course.id}', 0)">
          <div class="play-button-overlay">${ICONS.play}</div>
          <span class="video-duration-tag">${course.totalDuration}</span>
        </div>
        <div class="video-card-body">
          <span class="subject-badge" style="width: fit-content; margin-bottom: 8px;">${course.subjectName}</span>
          <h3 class="video-card-title">${course.title}</h3>
          <p class="video-instructor">المعلم: ${course.instructor} • ${course.totalVideos} حلقات</p>
          <p style="font-size: 0.86rem; color: var(--ink-secondary); line-height: 1.6; margin-bottom: 14px; flex-grow: 1;">
            ${course.description}
          </p>
          <button class="btn-primary" style="width: 100%;" onclick="ManarApp.openVideoPlayerModal('${course.id}', 0)">
            ${ICONS.play} تشغيل ومتابعة الحلقات
          </button>
        </div>
      </div>
    `;
  }

  /* =========================================================================
   * النوافذ المنبثقة التفاعلية (Interactive Modals)
   * ========================================================================= */

  // 1. نافذة قراءة وشرح الدرس (Lesson Explanation Modal)
  function openLessonModal(lessonId) {
    var lesson = ManarData.lessons.find(function(l) { return l.id === lessonId; });
    if (!lesson) return;
    AppState.activeLesson = lesson;

    var modal = document.getElementById("general-modal");
    var titleEl = document.getElementById("general-modal-title");
    var subEl = document.getElementById("general-modal-subtitle");
    var bodyEl = document.getElementById("general-modal-body");
    var footerEl = document.getElementById("general-modal-footer");

    titleEl.textContent = lesson.title;
    subEl.textContent = lesson.subjectName + " • " + lesson.grade + " • " + lesson.readTime;

    var sectionsHtml = lesson.content.sections.map(function(sec) {
      return `
        <div style="margin-bottom: 22px;">
          <h4 style="font-size: 1.15rem; color: var(--academic-blue); margin-bottom: 8px; font-weight: 700;">${sec.title}</h4>
          <p style="font-size: 0.96rem; color: var(--ink-secondary); line-height: 1.85;">${sec.body}</p>
        </div>
      `;
    }).join("");

    var quiz = lesson.content.quiz;
    var quizHtml = `
      <div style="background-color: var(--bg-canvas); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 20px; margin-top: 26px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px; color: var(--academic-amber); font-weight: 700;">
          <span>🎯 سؤال سريع لاختبار استيعابك للدرس:</span>
        </div>
        <p style="font-weight: 600; font-size: 1rem; color: var(--ink-primary); margin-bottom: 14px;">${quiz.question}</p>
        <div style="display: flex; flex-direction: column; gap: 8px;" id="lesson-quiz-options">
          ${quiz.options.map(function(opt, idx) {
            return `
              <button class="stage-tab-btn" style="text-align: right; justify-content: flex-start; border: 1px solid var(--border-medium); background: #FFFFFF;" onclick="ManarApp.submitLessonQuizAnswer(${idx})">
                ${idx + 1}. ${opt}
              </button>
            `;
          }).join("")}
        </div>
        <div id="lesson-quiz-feedback" style="margin-top: 14px; display: none;"></div>
      </div>
    `;

    bodyEl.innerHTML = `
      <div style="font-size: 1rem; line-height: 1.9; color: var(--ink-primary);">
        <p style="font-size: 1.05rem; color: var(--ink-secondary); margin-bottom: 22px; font-weight: 500; border-right: 4px solid var(--academic-blue); padding-right: 14px;">
          ${lesson.content.intro}
        </p>

        ${sectionsHtml}

        <div class="note-box">
          <strong>💡 ${lesson.content.practicalTip}</strong>
        </div>

        ${quizHtml}
      </div>
    `;

    footerEl.innerHTML = `
      <button class="btn-secondary" onclick="ManarApp.closeModal('general-modal')">إغلاق</button>
      <button class="btn-primary" onclick="ManarApp.bookmarkItem('${lesson.id}'); ManarApp.showToast('تم حفظ الدرس في مفضلتك الدراسية!');">
        ⭐ حفظ في المفضلة
      </button>
    `;

    modal.classList.add("active");
  }

  function submitLessonQuizAnswer(chosenIdx) {
    if (!AppState.activeLesson) return;
    var quiz = AppState.activeLesson.content.quiz;
    var feedbackEl = document.getElementById("lesson-quiz-feedback");
    var optBtns = document.querySelectorAll("#lesson-quiz-options button");
    if (!feedbackEl) return;

    optBtns.forEach(function(b, idx) {
      if (idx === quiz.correctIndex) {
        b.style.borderColor = "var(--academic-green)";
        b.style.backgroundColor = "var(--academic-green-light)";
      } else if (idx === chosenIdx) {
        b.style.borderColor = "var(--academic-rose)";
        b.style.backgroundColor = "var(--academic-rose-light)";
      }
    });

    feedbackEl.style.display = "block";
    if (chosenIdx === quiz.correctIndex) {
      feedbackEl.innerHTML = `
        <div style="color: var(--academic-green); font-weight: 700;">
          ✓ أحسنت! إجابة ممتازة وصحيحة.
          <p style="font-size: 0.88rem; font-weight: normal; margin-top: 4px; color: var(--ink-secondary);">${quiz.explanation}</p>
        </div>
      `;
      ManarStorage.saveQuizResult(AppState.activeLesson.id, 100);
    } else {
      feedbackEl.innerHTML = `
        <div style="color: var(--academic-rose); font-weight: 700;">
          ✕ إجابة غير دقيقة، حاول مرة أخرى!
          <p style="font-size: 0.88rem; font-weight: normal; margin-top: 4px; color: var(--ink-secondary);">${quiz.explanation}</p>
        </div>
      `;
    }
  }

  // 2. نافذة حجز المعلم التفاعلية (Teacher Booking Modal)
  function openBookingModal(teacherId) {
    var teacher = ManarData.teachers.find(function(t) { return t.id === teacherId; });
    if (!teacher) return;
    AppState.activeTeacher = teacher;

    var modal = document.getElementById("general-modal");
    var titleEl = document.getElementById("general-modal-title");
    var subEl = document.getElementById("general-modal-subtitle");
    var bodyEl = document.getElementById("general-modal-body");
    var footerEl = document.getElementById("general-modal-footer");

    var user = ManarStorage.getUserProfile();

    titleEl.textContent = "حجز حصة تعليمية مع " + teacher.name;
    subEl.textContent = teacher.title + " • الرسوم: " + teacher.hourlyRate + " ر.س / ساعة";

    bodyEl.innerHTML = `
      <form id="teacher-booking-form" onsubmit="event.preventDefault(); ManarApp.confirmTeacherBooking();">
        <!-- خطوة 1: اختيار طريقة اللقاء والدرس -->
        <div class="form-group-block">
          <label class="form-label">1. اختر طريقة انعقاد الحصة التعليمية:</label>
          <div class="teaching-mode-selector">
            ${teacher.modes.online ? `
              <div class="mode-radio-card selected" id="mode-opt-online" onclick="ManarApp.selectBookingMode('online')">
                ${ICONS.globe}
                <div class="mode-card-title">أونلاين (عن بعد)</div>
                <div class="mode-card-sub">فصل تفاعلي ذكي بالمنصة</div>
              </div>
            ` : ''}
            ${teacher.modes.inPersonHome ? `
              <div class="mode-radio-card" id="mode-opt-home" onclick="ManarApp.selectBookingMode('in_person_home')">
                ${ICONS.home}
                <div class="mode-card-title">حضوري بمنزل الطالب</div>
                <div class="mode-card-sub">يأتي المعلم لمنزلكم</div>
              </div>
            ` : ''}
            ${teacher.modes.inPersonLocation ? `
              <div class="mode-radio-card" id="mode-opt-location" onclick="ManarApp.selectBookingMode('in_person_location')">
                ${ICONS.mapPin}
                <div class="mode-card-title">مكان متفق عليه</div>
                <div class="mode-card-sub">مكتبة أو قاعة هادئة</div>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- حقل المكان الديناميكي -->
        <div class="form-group-block" id="booking-location-group" style="display: none;">
          <label class="form-label" id="booking-location-label">العنوان أو اسم المكان المتفق عليه:</label>
          <input type="text" id="booking-location-input" class="form-control-input" placeholder="مثال: حي الملقا، شارع الأمير نايف، عمارة 4" value="${user.city} - حي النرجس">
          <small style="color: var(--ink-muted); display: block; margin-top: 4px;">
            الأحياء المدعومة للحضور: ${teacher.coverageAreas.join("، ")}
          </small>
        </div>

        <!-- خطوة 2: اختيار الموعد المتاح -->
        <div class="form-group-block">
          <label class="form-label">2. اختر اليوم والتوقيت المناسب من جدول المعلم:</label>
          <div class="slots-grid" id="booking-slots-container">
            ${teacher.availableSlots.map(function(s, idx) {
              return `
                <div class="slot-radio-pill ${idx === 0 ? 'selected' : ''}" onclick="ManarApp.selectTimeSlot(this, '${s.day}', '${s.time}')">
                  <div style="font-weight: 700;">${s.day}</div>
                  <div style="font-size: 0.78rem; opacity: 0.85;">${s.time}</div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- خطوة 3: بيانات الطالب والملاحظات -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <div class="form-group-block">
            <label class="form-label">اسم الطالب الكامل:</label>
            <input type="text" id="bkg-student-name" class="form-control-input" value="${user.name}" required>
          </div>
          <div class="form-group-block">
            <label class="form-label">رقم الهاتف للتواصل وتأكيد الحجز:</label>
            <input type="tel" id="bkg-student-phone" class="form-control-input" value="${user.phone}" required>
          </div>
        </div>

        <div class="form-group-block">
          <label class="form-label">ملاحظات أو مواضيع محددة ترغب في تركيز المعلم عليها:</label>
          <textarea id="bkg-student-notes" class="form-control-textarea" rows="2" placeholder="مثال: نريد التركيز على حل مسائل قوانين الحركة والتحضير للاختبار الشهري القادم"></textarea>
        </div>
      </form>
    `;

    footerEl.innerHTML = `
      <button class="btn-secondary" onclick="ManarApp.closeModal('general-modal')">إلغاء</button>
      <button class="btn-primary" onclick="ManarApp.confirmTeacherBooking()">
        تأكيد حجز الحصة (${teacher.hourlyRate} ر.س)
      </button>
    `;

    // الحالة المبدئية للحجز
    AppState.bookingDraft = {
      mode: teacher.modes.online ? "online" : "in_person_home",
      day: teacher.availableSlots[0].day,
      timeSlot: teacher.availableSlots[0].time
    };

    modal.classList.add("active");
  }

  function selectBookingMode(mode) {
    if (!AppState.bookingDraft) AppState.bookingDraft = {};
    AppState.bookingDraft.mode = mode;

    var cards = document.querySelectorAll(".mode-radio-card");
    cards.forEach(function(c) { c.classList.remove("selected"); });

    var target = document.getElementById("mode-opt-" + (mode === "online" ? "online" : (mode === "in_person_home" ? "home" : "location")));
    if (target) target.classList.add("selected");

    var locGroup = document.getElementById("booking-location-group");
    var locLabel = document.getElementById("booking-location-label");
    var locInput = document.getElementById("booking-location-input");

    if (mode === "online") {
      locGroup.style.display = "none";
    } else if (mode === "in_person_home") {
      locGroup.style.display = "block";
      locLabel.textContent = "عنوان منزل الطالب بالتفصيل (الحي، الشارع، المعلم البارز):";
      locInput.placeholder = "مثال: الرياض - حي الملقا، شارع وادي حنيفة، فيلا 12";
    } else if (mode === "in_person_location") {
      locGroup.style.display = "block";
      locLabel.textContent = "المكان الهادئ المتفق عليه (مكتبة، مركز ثقافي، مقهى دراسي):";
      if (AppState.activeTeacher && AppState.activeTeacher.mutualPlaces && AppState.activeTeacher.mutualPlaces.length > 0) {
        locInput.value = AppState.activeTeacher.mutualPlaces[0];
      } else {
        locInput.placeholder = "مثال: مكتبة الملك فهد الوطنية - قاعة الباحثين";
      }
    }
  }

  function selectTimeSlot(el, day, time) {
    if (!AppState.bookingDraft) AppState.bookingDraft = {};
    AppState.bookingDraft.day = day;
    AppState.bookingDraft.timeSlot = time;

    var pills = document.querySelectorAll(".slot-radio-pill");
    pills.forEach(function(p) { p.classList.remove("selected"); });
    el.classList.add("selected");
  }

  function confirmTeacherBooking() {
    var teacher = AppState.activeTeacher;
    if (!teacher) return;

    var nameInput = document.getElementById("bkg-student-name");
    var phoneInput = document.getElementById("bkg-student-phone");
    var notesInput = document.getElementById("bkg-student-notes");
    var locInput = document.getElementById("booking-location-input");

    var mode = AppState.bookingDraft.mode;
    var modeLabel = "أونلاين (قاعة افتراضية)";
    var locationStr = "رابط القاعة الافتراضية بالمنصة";

    if (mode === "in_person_home") {
      modeLabel = "حضوري - منزل الطالب";
      locationStr = locInput ? locInput.value.trim() : "منزل الطالب";
    } else if (mode === "in_person_location") {
      modeLabel = "حضوري - مكان متفق عليه";
      locationStr = locInput ? locInput.value.trim() : "مكان متفق عليه";
    }

    var newBooking = ManarStorage.addBooking({
      teacherId: teacher.id,
      teacherName: teacher.name,
      teacherAvatarBg: teacher.avatarBg,
      subject: teacher.subjects.join("، "),
      mode: mode,
      modeLabel: modeLabel,
      location: locationStr,
      day: AppState.bookingDraft.day,
      timeSlot: AppState.bookingDraft.timeSlot,
      studentName: nameInput ? nameInput.value.trim() : "طالب منار",
      studentGrade: "المرحلة المدرسية",
      phone: phoneInput ? phoneInput.value.trim() : "",
      hourlyRate: teacher.hourlyRate,
      notes: notesInput ? notesInput.value.trim() : ""
    });

    closeModal("general-modal");
    showToast("تم تأكيد حجز الحصة بنجاح! رقم الحجز: #" + newBooking.id, "success");
    
    // إذا كان المستخدم في لوحة التحكم يتم تحديثها فوراً
    if (AppState.currentView === "dashboard") {
      renderDashboardView(document.getElementById("view-container"));
    }
  }

  function cancelBooking(bookingId) {
    if (confirm("هل أنت متأكد من رغبتك في إلغاء هذا الموعد التعليمي؟")) {
      ManarStorage.cancelBooking(bookingId);
      showToast("تم إلغاء الموعد.");
      if (AppState.currentView === "dashboard") {
        renderDashboardView(document.getElementById("view-container"));
      }
    }
  }

  // 3. نافذة التسجيل في دورات المدارس الشريكة (Course Registration Modal)
  function openCourseRegModal(courseId) {
    var course = ManarData.schoolCourses.find(function(c) { return c.id === courseId; });
    if (!course) return;
    AppState.activeCourse = course;

    var modal = document.getElementById("general-modal");
    var titleEl = document.getElementById("general-modal-title");
    var subEl = document.getElementById("general-modal-subtitle");
    var bodyEl = document.getElementById("general-modal-body");
    var footerEl = document.getElementById("general-modal-footer");

    var user = ManarStorage.getUserProfile();

    titleEl.textContent = "التسجيل في: " + course.title;
    subEl.textContent = course.schoolName + " • " + course.badge;

    var syllabusHtml = course.syllabus.map(function(item) {
      return `
        <li style="margin-bottom: 6px; font-size: 0.9rem; color: var(--ink-secondary);">${item}</li>
      `;
    }).join("");

    bodyEl.innerHTML = `
      <div style="margin-bottom: 20px;">
        <div class="callout-box">
          <strong>معلومات الالتحاق بالدورة المدرسية:</strong>
          <ul style="margin-top: 8px; padding-right: 20px; font-size: 0.88rem;">
            <li>المدرسة الشريكة المشرفة: <strong>${course.schoolName}</strong></li>
            <li>المعلم والمشرف: <strong>${course.teacherName}</strong></li>
            <li>المواعيد: <strong>${course.schedule}</strong></li>
            <li>تاريخ الانطلاق: <strong>${course.startDate}</strong></li>
            <li>طبيعة الدورة: <strong>${course.format}</strong></li>
          </ul>
        </div>

        <h4 style="font-size: 1rem; color: var(--academic-blue); margin-bottom: 8px; font-weight: 700;">محاور وخطة البرنامج:</h4>
        <ul style="padding-right: 24px; margin-bottom: 20px;">${syllabusHtml}</ul>

        <h4 style="font-size: 1rem; color: var(--academic-blue); margin-bottom: 8px; font-weight: 700;">بيانات تأكيد التسجيل:</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group-block">
            <label class="form-label">اسم الطالب:</label>
            <input type="text" id="reg-student-name" class="form-control-input" value="${user.name}" required>
          </div>
          <div class="form-group-block">
            <label class="form-label">رقم الهاتف:</label>
            <input type="tel" id="reg-student-phone" class="form-control-input" value="${user.phone}" required>
          </div>
        </div>
      </div>
    `;

    footerEl.innerHTML = `
      <button class="btn-secondary" onclick="ManarApp.closeModal('general-modal')">إلغاء</button>
      <button class="btn-primary" onclick="ManarApp.confirmCourseRegistration()">
        تأكيد التسجيل وإصدار المقعد (${course.price} ر.س)
      </button>
    `;

    modal.classList.add("active");
  }

  function confirmCourseRegistration() {
    var course = AppState.activeCourse;
    if (!course) return;

    var nameInput = document.getElementById("reg-student-name");
    var phoneInput = document.getElementById("reg-student-phone");

    var newReg = ManarStorage.addRegistration({
      courseId: course.id,
      courseTitle: course.title,
      schoolName: course.schoolName,
      teacherName: course.teacherName,
      price: course.price,
      format: course.format,
      studentName: nameInput ? nameInput.value.trim() : "طالب منار",
      phone: phoneInput ? phoneInput.value.trim() : ""
    });

    closeModal("general-modal");
    showToast("تم تسجيلك بنجاح في الدورة المدرسية! كود القبول: #" + newReg.id, "success");

    if (AppState.currentView === "dashboard") {
      renderDashboardView(document.getElementById("view-container"));
    }
  }

  // 4. قارئ الكتب والمذكرات الرقمي المدمج (In-App Book Reader Modal)
  function openReaderModal(bookId) {
    var book = ManarData.library.find(function(b) { return b.id === bookId; });
    if (!book) return;
    AppState.activeBook = book;
    AppState.activeBookPage = 0;

    var modal = document.getElementById("reader-modal");
    var titleEl = document.getElementById("reader-modal-title");
    titleEl.textContent = book.title;

    renderReaderContent();
    modal.classList.add("active");
  }

  function renderReaderContent() {
    var book = AppState.activeBook;
    var pageIdx = AppState.activeBookPage;
    var sidebarEl = document.getElementById("reader-sidebar-toc");
    var sheetEl = document.getElementById("reader-paper-content");
    var pageNumEl = document.getElementById("reader-current-page-num");

    if (!book || !book.readerPages || book.readerPages.length === 0) {
      sheetEl.innerHTML = "<p>المحتوى الرقمي قيد التجهيز لهذا الكتاب.</p>";
      return;
    }

    var currPage = book.readerPages[pageIdx];

    // قائمة الفهرس
    sidebarEl.innerHTML = `
      <h4>فهرس الموضوعات:</h4>
      <ul class="toc-list">
        ${book.readerPages.map(function(p, idx) {
          return `
            <li class="toc-item ${idx === pageIdx ? 'active' : ''}" onclick="ManarApp.jumpToReaderPage(${idx})">
              صفحة ${idx + 1}: ${p.title}
            </li>
          `;
        }).join("")}
      </ul>
      <div style="margin-top: 24px; padding-top: 14px; border-top: 1px solid var(--border-light);">
        <h4 style="font-size: 0.85rem; margin-bottom: 8px;">ملاحظاتي على هذه الصفحة:</h4>
        <textarea id="reader-page-note" class="form-control-textarea" rows="4" placeholder="اكتب ملاحظة دراسية..." oninput="ManarApp.savePageNote('${book.id}_p${pageIdx}', this.value)">${ManarStorage.getNotes(book.id + '_p' + pageIdx)}</textarea>
      </div>
    `;

    // ورقة القراءة
    sheetEl.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-light); padding-bottom: 8px; margin-bottom: 18px; font-size: 0.82rem; color: var(--ink-muted);">
        <span>${book.subjectName} • ${book.stageName}</span>
        <span>صفحة ${pageIdx + 1} من ${book.readerPages.length}</span>
      </div>
      <div>
        ${currPage.content}
      </div>
    `;

    if (pageNumEl) {
      pageNumEl.textContent = (pageIdx + 1) + " / " + book.readerPages.length;
    }
  }

  function nextReaderPage() {
    if (!AppState.activeBook) return;
    if (AppState.activeBookPage < AppState.activeBook.readerPages.length - 1) {
      AppState.activeBookPage++;
      renderReaderContent();
    }
  }

  function prevReaderPage() {
    if (!AppState.activeBook) return;
    if (AppState.activeBookPage > 0) {
      AppState.activeBookPage--;
      renderReaderContent();
    }
  }

  function jumpToReaderPage(idx) {
    AppState.activeBookPage = idx;
    renderReaderContent();
  }

  function savePageNote(key, text) {
    ManarStorage.saveNote(key, text);
  }

  function downloadBookMock(bookId) {
    var book = ManarData.library.find(function(b) { return b.id === bookId; });
    showToast("جاري إعداد وتحميل «" + (book ? book.title : "الكتاب") + "» بصيغة PDF...");
  }

  // 5. مشغل الفيديو التفاعلي المتقدم (Video Course Player)
  function openVideoPlayerModal(courseId, episodeIdx) {
    var course = ManarData.videoCourses.find(function(c) { return c.id === courseId; });
    if (!course) return;
    AppState.activeVideoCourse = course;
    AppState.activeVideoEpisodeIdx = episodeIdx || 0;
    AppState.isVideoPlaying = true;

    var modal = document.getElementById("video-player-modal");
    var titleEl = document.getElementById("video-player-modal-title");
    titleEl.textContent = course.title + " - " + course.instructor;

    renderVideoPlayerContent();
    modal.classList.add("active");
  }

  function renderVideoPlayerContent() {
    var course = AppState.activeVideoCourse;
    var epIdx = AppState.activeVideoEpisodeIdx;
    var ep = course.episodes[epIdx];

    var boardTitle = document.getElementById("sim-board-title");
    var boardTag = document.getElementById("sim-board-tag");
    var playlistEl = document.getElementById("video-episodes-playlist");
    var takeawaysEl = document.getElementById("video-takeaways-container");
    var notebookEl = document.getElementById("video-student-notebook");
    var quizContainer = document.getElementById("video-quiz-container");
    var playPauseBtn = document.getElementById("vid-play-pause-btn");

    if (boardTitle) boardTitle.textContent = ep.title;
    if (boardTag) boardTag.textContent = course.subjectName + " | الحلقة " + (epIdx + 1) + " (" + ep.duration + ")";

    if (playPauseBtn) {
      playPauseBtn.innerHTML = AppState.isVideoPlaying ? (ICONS.pause + " إيقاف مؤقت") : (ICONS.play + " تشغيل");
    }

    // رسم قائمة الحلقات
    if (playlistEl) {
      playlistEl.innerHTML = course.episodes.map(function(item, idx) {
        return `
          <div style="padding: 10px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-light); margin-bottom: 8px; cursor: pointer; background: ${idx === epIdx ? 'var(--academic-blue-light)' : 'var(--bg-card)'}; display: flex; justify-content: space-between; align-items: center;" onclick="ManarApp.changeVideoEpisode(${idx})">
            <div>
              <div style="font-weight: 600; font-size: 0.88rem; color: var(--ink-primary);">${item.title}</div>
              <div style="font-size: 0.76rem; color: var(--ink-muted);">${item.summary}</div>
            </div>
            <span style="font-size: 0.78rem; font-weight: 600; color: var(--academic-blue);">${item.duration}</span>
          </div>
        `;
      }).join("");
    }

    // المفاهيم المستفادة
    if (takeawaysEl) {
      takeawaysEl.innerHTML = `
        <h4 style="font-size: 0.95rem; color: var(--academic-blue); margin-bottom: 10px; font-weight: 700;">أهم نقاط الدرس:</h4>
        <ul style="padding-right: 20px; font-size: 0.88rem; line-height: 1.8;">
          ${ep.keyPoints.map(function(kp) { return `<li style="margin-bottom: 6px;">${kp}</li>`; }).join("")}
        </ul>
      `;
    }

    // دفتر الملاحظات
    if (notebookEl) {
      notebookEl.value = ManarStorage.getNotes(course.id + "_" + ep.id);
    }

    // اختبار الحلقة السريع
    if (quizContainer) {
      var q = ep.quizQuestion;
      quizContainer.innerHTML = `
        <div style="background-color: var(--bg-canvas); border: 1px solid var(--border-medium); border-radius: var(--radius-sm); padding: 14px;">
          <h5 style="font-size: 0.9rem; color: var(--academic-amber); margin-bottom: 8px;">سؤال تثبيت الفهم:</h5>
          <p style="font-size: 0.88rem; font-weight: 600; margin-bottom: 10px;">${q.q}</p>
          <div style="display: flex; flex-direction: column; gap: 6px;" id="vid-quiz-opts">
            ${q.options.map(function(opt, oIdx) {
              return `
                <button class="stage-tab-btn" style="border: 1px solid var(--border-medium); background: white; text-align: right; justify-content: flex-start; font-size: 0.84rem; padding: 6px 10px;" onclick="ManarApp.answerVideoQuiz(${oIdx}, ${q.correct}, '${q.note}')">
                  ${opt}
                </button>
              `;
            }).join("")}
          </div>
          <div id="vid-quiz-result" style="margin-top: 10px; font-size: 0.84rem;"></div>
        </div>
      `;
    }
  }

  function toggleVideoPlay() {
    AppState.isVideoPlaying = !AppState.isVideoPlaying;
    var playPauseBtn = document.getElementById("vid-play-pause-btn");
    if (playPauseBtn) {
      playPauseBtn.innerHTML = AppState.isVideoPlaying ? (ICONS.pause + " إيقاف مؤقت") : (ICONS.play + " تشغيل");
    }
  }

  function changeVideoEpisode(idx) {
    AppState.activeVideoEpisodeIdx = idx;
    AppState.isVideoPlaying = true;
    renderVideoPlayerContent();
  }

  function answerVideoQuiz(chosen, correct, note) {
    var resultEl = document.getElementById("vid-quiz-result");
    var optBtns = document.querySelectorAll("#vid-quiz-opts button");
    if (!resultEl) return;

    optBtns.forEach(function(b, idx) {
      if (idx === correct) {
        b.style.backgroundColor = "var(--academic-green-light)";
        b.style.borderColor = "var(--academic-green)";
      } else if (idx === chosen) {
        b.style.backgroundColor = "var(--academic-rose-light)";
        b.style.borderColor = "var(--academic-rose)";
      }
    });

    if (chosen === correct) {
      resultEl.innerHTML = `<span style="color: var(--academic-green); font-weight: 700;">✓ إجابة صحيحة! ${note}</span>`;
    } else {
      resultEl.innerHTML = `<span style="color: var(--academic-rose); font-weight: 700;">✕ خطأ، الإجابة الصحيحة هي الأولى: ${note}</span>`;
    }
  }

  function saveVideoNotebook(text) {
    if (!AppState.activeVideoCourse) return;
    var ep = AppState.activeVideoCourse.episodes[AppState.activeVideoEpisodeIdx];
    ManarStorage.saveNote(AppState.activeVideoCourse.id + "_" + ep.id, text);
  }

  function switchVideoSidebarTab(tabName) {
    var tabs = document.querySelectorAll(".vid-tab-btn");
    tabs.forEach(function(t) { t.classList.remove("active"); });

    var targetBtn = document.getElementById("btn-vidtab-" + tabName);
    if (targetBtn) targetBtn.classList.add("active");

    var contents = ["playlist", "takeaways", "notes", "quiz"];
    contents.forEach(function(c) {
      var el = document.getElementById("vidtab-content-" + c);
      if (el) el.style.display = (c === tabName ? "block" : "none");
    });
  }

  // 6. نافذة تعديل الملف الشخصي للطالب
  function openEditProfileModal() {
    var user = ManarStorage.getUserProfile();
    var modal = document.getElementById("general-modal");
    var titleEl = document.getElementById("general-modal-title");
    var subEl = document.getElementById("general-modal-subtitle");
    var bodyEl = document.getElementById("general-modal-body");
    var footerEl = document.getElementById("general-modal-footer");

    titleEl.textContent = "تعديل الملف الدراسي للطالب";
    subEl.textContent = "بيانات الطالب المسجلة في منصة منار";

    bodyEl.innerHTML = `
      <form id="profile-edit-form" onsubmit="event.preventDefault(); ManarApp.saveProfileData();">
        <div class="form-group-block">
          <label class="form-label">الاسم الكامل للطالب:</label>
          <input type="text" id="prof-name" class="form-control-input" value="${user.name}" required>
        </div>
        <div class="form-group-block">
          <label class="form-label">المرحلة والصف الدراسي:</label>
          <select id="prof-grade" class="form-control-select">
            <option ${user.grade.indexOf("الثاني الثانوي") !== -1 ? 'selected' : ''}>الصف الثاني الثانوي (مسار علمي)</option>
            <option ${user.grade.indexOf("الأول الثانوي") !== -1 ? 'selected' : ''}>الصف الأول الثانوي (مسار مشترك)</option>
            <option ${user.grade.indexOf("الثالث الثانوي") !== -1 ? 'selected' : ''}>الصف الثالث الثانوي (مسارات تخصصية)</option>
            <option ${user.grade.indexOf("المتوسط") !== -1 ? 'selected' : ''}>المرحلة المتوسطة</option>
            <option ${user.grade.indexOf("الابتدائي") !== -1 ? 'selected' : ''}>المرحلة الابتدائية</option>
          </select>
        </div>
        <div class="form-group-block">
          <label class="form-label">المدرسة الحالية:</label>
          <input type="text" id="prof-school" class="form-control-input" value="${user.school}" required>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <div class="form-group-block">
            <label class="form-label">المدينة:</label>
            <input type="text" id="prof-city" class="form-control-input" value="${user.city}" required>
          </div>
          <div class="form-group-block">
            <label class="form-label">رقم الهاتف:</label>
            <input type="tel" id="prof-phone" class="form-control-input" value="${user.phone}" required>
          </div>
        </div>
      </form>
    `;

    footerEl.innerHTML = `
      <button class="btn-secondary" onclick="ManarApp.closeModal('general-modal')">إلغاء</button>
      <button class="btn-primary" onclick="ManarApp.saveProfileData()">حفظ التعديلات</button>
    `;

    modal.classList.add("active");
  }

  function saveProfileData() {
    var name = document.getElementById("prof-name").value.trim();
    var grade = document.getElementById("prof-grade").value;
    var school = document.getElementById("prof-school").value.trim();
    var city = document.getElementById("prof-city").value.trim();
    var phone = document.getElementById("prof-phone").value.trim();

    ManarStorage.updateUserProfile({
      name: name,
      grade: grade,
      school: school,
      city: city,
      phone: phone
    });

    closeModal("general-modal");
    updateStudentHeaderBadge();
    showToast("تم تحديث الملف الدراسي بنجاح!", "success");

    if (AppState.currentView === "dashboard") {
      renderDashboardView(document.getElementById("view-container"));
    }
  }

  // إغلاق أي نافذة منبثقة
  function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("active");
    }
  }

  // إظهار إشعار Toast
  function showToast(message, type) {
    var toast = document.getElementById("global-toast");
    if (!toast) return;

    toast.textContent = message;
    toast.className = "toast-notice" + (type === "success" ? " success" : "");
    toast.classList.add("show");

    setTimeout(function() {
      toast.classList.remove("show");
    }, 3500);
  }

  function bookmarkItem(id) {
    ManarStorage.toggleBookmark(id);
  }

  function selectStage(stageId) {
    AppState.selectedStage = stageId;
    renderCurrentView();
  }

  function selectSubject(subId) {
    AppState.selectedSubject = subId;
    renderCurrentView();
  }

  function onSearchInput(val) {
    AppState.searchQuery = val.trim().toLowerCase();
    renderCurrentView();
  }

  function resetFilters() {
    AppState.selectedStage = "all";
    AppState.selectedSubject = "all";
    AppState.searchQuery = "";
    var searchInput = document.getElementById("global-search-input");
    if (searchInput) searchInput.value = "";
    renderCurrentView();
  }

  // تصدير واجهة المنصة للنافذة العامة
  window.ManarApp = {
    switchView: switchView,
    selectStage: selectStage,
    selectSubject: selectSubject,
    onSearchInput: onSearchInput,
    resetFilters: resetFilters,
    openLessonModal: openLessonModal,
    submitLessonQuizAnswer: submitLessonQuizAnswer,
    openBookingModal: openBookingModal,
    selectBookingMode: selectBookingMode,
    selectTimeSlot: selectTimeSlot,
    confirmTeacherBooking: confirmTeacherBooking,
    cancelBooking: cancelBooking,
    openCourseRegModal: openCourseRegModal,
    confirmCourseRegistration: confirmCourseRegistration,
    openReaderModal: openReaderModal,
    nextReaderPage: nextReaderPage,
    prevReaderPage: prevReaderPage,
    jumpToReaderPage: jumpToReaderPage,
    savePageNote: savePageNote,
    downloadBookMock: downloadBookMock,
    openVideoPlayerModal: openVideoPlayerModal,
    toggleVideoPlay: toggleVideoPlay,
    changeVideoEpisode: changeVideoEpisode,
    answerVideoQuiz: answerVideoQuiz,
    saveVideoNotebook: saveVideoNotebook,
    switchVideoSidebarTab: switchVideoSidebarTab,
    openEditProfileModal: openEditProfileModal,
    saveProfileData: saveProfileData,
    closeModal: closeModal,
    showToast: showToast,
    bookmarkItem: bookmarkItem
  };

})();
