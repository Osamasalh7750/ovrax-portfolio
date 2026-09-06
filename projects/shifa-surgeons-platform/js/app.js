/**
 * ShifaSurgeons Platform - Application Logic (app.js)
 * Standalone Single-Page Application Engine
 * Compatible with offline double-click file:// execution.
 */

// SVG Icons Registry for zero-dependency offline rendering
const SVG_ICONS = {
  heart: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  'heart-pulse': `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l1.5-3 2 6 1.5-3h6.28"/></svg>`,
  brain: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M12 5v13"/></svg>`,
  bone: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 10c.7-.7 1.69-1 2.5-1a2.5 2.5 0 1 1 0 5c-.79 0-1.8-.3-2.5-1L7 20c-.7.7-1.69 1-2.5 1a2.5 2.5 0 1 1 0-5c.79 0 1.8.3 2.5 1z"/><path d="m14 7 3-3"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  sparkles: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
  ear: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"/><path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  smile: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
  'trending-down': `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>`,
  'git-commit': `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><line x1="1.05" y1="12" x2="7" y2="12"/><line x1="17.01" y1="12" x2="22.96" y2="12"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  zap: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  crosshair: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>`,
  'refresh-cw': `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
  maximize: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`,
  award: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  hand: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>`,
  activity: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  'alert-triangle': `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  search: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  mapPin: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  check: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  star: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  user: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  printer: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
  close: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  graduation: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  trophy: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
  video: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`,
  clinic: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9h1"/><path d="M9 13h1"/><path d="M9 17h1"/></svg>`,
  clipboard: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`
};

// Application State
const AppState = {
  currentView: 'home',
  activeCategoryFilter: 'all',
  activeSurgeonFilter: 'all',
  surgeonSearchQuery: '',
  theme: localStorage.getItem('shifa_theme') || 'light',
  
  // Booking Stepper State
  bookingStep: 1,
  currentBooking: {
    surgeryId: '',
    surgeonId: '',
    consultType: 'clinic',
    date: '',
    time: '',
    patientName: '',
    patientPhone: '',
    patientAge: '',
    patientGender: 'male',
    medicalHistory: '',
    notes: '',
    referenceCode: '',
    createdAt: ''
  }
};

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRouter();
  renderSurgeries();
  renderSurgeons();
  populateDropdowns();
  updateBookingsBadge();
  initSearchPalette();
  initEventListeners();
});

// Theme Management
function initTheme() {
  document.documentElement.setAttribute('data-theme', AppState.theme);
  updateThemeButtonIcon();
}

function toggleTheme() {
  AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('shifa_theme', AppState.theme);
  document.documentElement.setAttribute('data-theme', AppState.theme);
  updateThemeButtonIcon();
  showToast(`تم التبديل إلى الوضع ${AppState.theme === 'dark' ? 'الليلي' : 'النهاري'}`, 'success');
}

function updateThemeButtonIcon() {
  const btn = document.getElementById('themeToggleBtn');
  if (!btn) return;
  btn.innerHTML = AppState.theme === 'dark' ? SVG_ICONS.sun : SVG_ICONS.moon;
  btn.setAttribute('title', AppState.theme === 'dark' ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي');
}

// Router & View Switcher
function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

function handleRoute() {
  const hash = window.location.hash.replace('#', '') || 'home';
  navigateTo(hash, false);
}

function navigateTo(viewId, updateHash = true) {
  const validViews = ['home', 'surgeries', 'surgeons', 'my-bookings', 'patient-guide', 'about'];
  const targetView = validViews.includes(viewId) ? viewId : 'home';
  AppState.currentView = targetView;

  // Update Page Views
  document.querySelectorAll('.page-view').forEach(view => {
    view.classList.remove('active');
  });
  const activePage = document.getElementById(`view-${targetView}`);
  if (activePage) {
    activePage.classList.add('active');
  }

  // Update Nav Links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-view') === targetView) {
      link.classList.add('active');
    }
  });

  // Actions specific to views
  if (targetView === 'my-bookings') {
    renderMyBookings();
  }

  if (updateHash) {
    window.location.hash = targetView;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================================================
// Surgeries Rendering (20 Categories)
// ==========================================================================
function renderSurgeries(filterCategory = 'all') {
  const containers = [
    document.getElementById('surgeriesGrid'),
    document.getElementById('allSurgeriesGrid')
  ].filter(Boolean);

  if (containers.length === 0) return;

  const filtered = filterCategory === 'all' 
    ? SURGERIES_DATA 
    : SURGERIES_DATA.filter(s => s.category === filterCategory);

  if (filtered.length === 0) {
    containers.forEach(c => {
      c.innerHTML = `<div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 2rem;">لا توجد عمليات مطابقة لهذا التصنيف</div>`;
    });
    return;
  }

  const html = filtered.map(s => {
    const iconSvg = SVG_ICONS[s.icon] || SVG_ICONS.activity;
    const proceduresHtml = s.commonProcedures.map(p => `<span class="procedure-tag">${p}</span>`).join('');

    return `
      <div class="surgery-card" data-category="${s.category}">
        <div class="surgery-card-header">
          <div class="surgery-icon-box">
            ${iconSvg}
          </div>
          <span class="surgery-badge">${s.category}</span>
        </div>
        
        <h3 class="surgery-title">${s.title}</h3>
        <span class="surgery-en-title">${s.enTitle}</span>
        <p class="surgery-description">${s.description}</p>

        <div class="surgery-meta-grid">
          <div class="surgery-meta-item">
            <span class="meta-label">متوسط المدة</span>
            <span class="meta-val">${s.duration}</span>
          </div>
          <div class="surgery-meta-item">
            <span class="meta-label">نسبة النجاح</span>
            <span class="meta-val text-gradient">${s.successRate}</span>
          </div>
          <div class="surgery-meta-item">
            <span class="meta-label">فترة التعافي</span>
            <span class="meta-val">${s.recoveryTime.split('/')[0]}</span>
          </div>
          <div class="surgery-meta-item">
            <span class="meta-label">التكلفة التقريبية</span>
            <span class="meta-val">${s.estimatedCost}</span>
          </div>
        </div>

        <div class="procedures-tag-list">
          ${proceduresHtml}
        </div>

        <div class="surgery-card-footer">
          <span class="surgeons-count-indicator">
            ${SVG_ICONS.user}
            3 جراحين معتمدين
          </span>
          <button class="btn-outline btn-sm" onclick="filterBySurgery('${s.id}')">
            عرض الجراحين (3)
          </button>
        </div>
      </div>
    `;
  }).join('');

  containers.forEach(c => {
    c.innerHTML = html;
  });
}

function filterCategory(category, buttonElement) {
  AppState.activeCategoryFilter = category;
  document.querySelectorAll('.filter-tab-btn').forEach(btn => {
    if (btn.textContent.includes(category) || (category === 'all' && (btn.textContent.includes('كافة') || btn.textContent.includes('جميع')))) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  renderSurgeries(category);
}

// Shortcut from surgery card to surgeons page
function filterBySurgery(surgeryId) {
  navigateTo('surgeons');
  const dropdown = document.getElementById('surgeonSurgerySelect');
  if (dropdown) {
    dropdown.value = surgeryId;
    AppState.activeSurgeonFilter = surgeryId;
    renderSurgeons();
  }
}

// ==========================================================================
// Surgeons Rendering (60 Doctors - 3 per surgery)
// ==========================================================================
function renderSurgeons() {
  const container = document.getElementById('surgeonsGrid');
  const counterEl = document.getElementById('surgeonsCountDisplay');
  if (!container) return;

  const surgeryFilter = AppState.activeSurgeonFilter;
  const searchQuery = AppState.surgeonSearchQuery.trim().toLowerCase();

  let filtered = SURGEONS_DATA;

  // Filter by Surgery
  if (surgeryFilter && surgeryFilter !== 'all') {
    filtered = filtered.filter(doc => doc.surgeryId === surgeryFilter);
  }

  // Filter by Search Query
  if (searchQuery) {
    filtered = filtered.filter(doc => {
      return doc.name.toLowerCase().includes(searchQuery) ||
             doc.title.toLowerCase().includes(searchQuery) ||
             doc.hospital.toLowerCase().includes(searchQuery) ||
             doc.city.toLowerCase().includes(searchQuery) ||
             doc.procedures.some(p => p.toLowerCase().includes(searchQuery));
    });
  }

  if (counterEl) {
    counterEl.textContent = `عرض (${filtered.length}) جراح استشاري متاح`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-bookings-box" style="grid-column: 1/-1;">
        <div class="empty-icon-wrap">${SVG_ICONS.search}</div>
        <h3>لم يتم العثور على أي جراح مطابق</h3>
        <p>يرجى تجربة تغيير معايير البحث أو اختيار تخصص جراحي آخر</p>
        <button class="btn-primary" style="margin-top: 1rem;" onclick="resetSurgeonFilters()">إعادة ضبط البحث</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(doc => {
    const surgery = SURGERIES_MAP[doc.surgeryId] || { title: 'جراحة متخصصة' };
    const studyHighlight = doc.studies[0] || '';
    const achievementHighlight = doc.achievements[0] || '';

    return `
      <div class="surgeon-card" id="card-${doc.id}">
        <div class="surgeon-top">
          <div class="surgeon-avatar-wrap">
            <img class="surgeon-avatar" src="${doc.avatar}" alt="${doc.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'">
            <span class="verified-badge" title="جراح معتمد وموثق">${SVG_ICONS.check}</span>
          </div>
          <div class="surgeon-headline">
            <span class="surgeon-surgery-tag">${surgery.title}</span>
            <h3 class="surgeon-name">${doc.name}</h3>
            <p class="surgeon-title">${doc.title}</p>
            <span class="surgeon-hospital">
              ${SVG_ICONS.mapPin}
              ${doc.hospital} - ${doc.city}
            </span>
          </div>
        </div>

        <div class="surgeon-stats-row">
          <div class="surgeon-stat-col">
            <span class="surgeon-stat-val">${doc.experienceYears} عاماً</span>
            <span class="surgeon-stat-lbl">سنوات الخبرة</span>
          </div>
          <div class="surgeon-stat-col">
            <span class="surgeon-stat-val highlight">${doc.successRate}</span>
            <span class="surgeon-stat-lbl">نسبة النجاح</span>
          </div>
          <div class="surgeon-stat-col">
            <span class="surgeon-stat-val">⭐ ${doc.rating}</span>
            <span class="surgeon-stat-lbl">(${doc.reviewCount} تقييم)</span>
          </div>
        </div>

        <div class="surgeon-preview-box">
          <div class="preview-item">
            ${SVG_ICONS.graduation}
            <span><strong>الشهادات:</strong> ${studyHighlight}</span>
          </div>
          <div class="preview-item achievement">
            ${SVG_ICONS.trophy}
            <span><strong>أبرز نجاح:</strong> ${achievementHighlight}</span>
          </div>
        </div>

        <div class="surgeon-card-footer">
          <div class="consultation-fee-box">
            <span class="fee-label">رسوم الاستشارة</span>
            <span class="fee-amount">${doc.consultationFee} ر.س</span>
          </div>
          <button class="btn-outline btn-sm" onclick="openSurgeonModal('${doc.id}')">
            الملف الطبي
          </button>
          <button class="btn-primary btn-sm" onclick="startBooking('${doc.id}', '${doc.surgeryId}')">
            احجز موعد
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function resetSurgeonFilters() {
  AppState.activeSurgeonFilter = 'all';
  AppState.surgeonSearchQuery = '';
  const searchInput = document.getElementById('surgeonSearchInput');
  const select = document.getElementById('surgeonSurgerySelect');
  if (searchInput) searchInput.value = '';
  if (select) select.value = 'all';
  renderSurgeons();
}

function populateDropdowns() {
  // Hero Surgery Select
  const heroSelect = document.getElementById('heroCategorySelect');
  if (heroSelect) {
    heroSelect.innerHTML = `<option value="all">جميع التخصصات الجراحية (20)</option>` +
      SURGERIES_DATA.map(s => `<option value="${s.id}">${s.title}</option>`).join('');
  }

  // Surgeons Directory Select
  const surgeonSelect = document.getElementById('surgeonSurgerySelect');
  if (surgeonSelect) {
    surgeonSelect.innerHTML = `<option value="all">جميع التخصصات (20 عملية)</option>` +
      SURGERIES_DATA.map(s => `<option value="${s.id}">${s.title}</option>`).join('');
  }

  // Booking Modal Surgery Select
  const bookingSurgerySelect = document.getElementById('bookingSurgerySelect');
  if (bookingSurgerySelect) {
    bookingSurgerySelect.innerHTML = `<option value="">-- اختر نوع العملية الجراحية --</option>` +
      SURGERIES_DATA.map(s => `<option value="${s.id}">${s.title}</option>`).join('');
  }
}

// ==========================================================================
// Doctor Profile Modal (Full Detail View)
// ==========================================================================
function openSurgeonModal(surgeonId) {
  const doc = SURGEONS_MAP[surgeonId];
  if (!doc) return;

  const surgery = SURGERIES_MAP[doc.surgeryId] || { title: 'جراحة عامة' };
  const modal = document.getElementById('doctorProfileModal');
  const body = document.getElementById('doctorProfileModalBody');
  if (!modal || !body) return;

  const studiesHtml = doc.studies.map(study => `
    <div class="study-item">
      ${SVG_ICONS.graduation}
      <div>${study}</div>
    </div>
  `).join('');

  const achievementsHtml = doc.achievements.map(ach => `
    <div class="achievement-item">
      ${SVG_ICONS.trophy}
      <div>${ach}</div>
    </div>
  `).join('');

  const proceduresHtml = doc.procedures.map(proc => `
    <span class="procedure-tag" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;">${proc}</span>
  `).join('');

  const reviewsHtml = doc.reviews.map(rev => `
    <div class="patient-review-card">
      <div class="review-author-row">
        <span class="review-author">${rev.patient}</span>
        <span class="review-stars">★★★★★ (${rev.date})</span>
      </div>
      <p class="review-text">${rev.comment}</p>
    </div>
  `).join('');

  body.innerHTML = `
    <div class="doc-profile-header">
      <img class="doc-profile-avatar" src="${doc.avatar}" alt="${doc.name}" onerror="this.src='https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'">
      <div class="doc-profile-meta">
        <span class="surgeon-surgery-tag">${surgery.title}</span>
        <h2>${doc.name}</h2>
        <p class="title">${doc.title}</p>
        <p class="hospital">${SVG_ICONS.mapPin} ${doc.hospital} - ${doc.city}</p>
      </div>
    </div>

    <div class="surgeon-stats-row" style="margin-bottom: 1.75rem;">
      <div class="surgeon-stat-col">
        <span class="surgeon-stat-val">${doc.experienceYears} عاماً</span>
        <span class="surgeon-stat-lbl">الخبرة السريرية</span>
      </div>
      <div class="surgeon-stat-col">
        <span class="surgeon-stat-val highlight">${doc.successRate}</span>
        <span class="surgeon-stat-lbl">نسبة نجاح العمليات</span>
      </div>
      <div class="surgeon-stat-col">
        <span class="surgeon-stat-val">${doc.surgeryCount}</span>
        <span class="surgeon-stat-lbl">إجمالي العمليات</span>
      </div>
      <div class="surgeon-stat-col">
        <span class="surgeon-stat-val">⭐ ${doc.rating}</span>
        <span class="surgeon-stat-lbl">(${doc.reviewCount} تقييم)</span>
      </div>
    </div>

    <h3 class="profile-section-title">${SVG_ICONS.user} نبذة تعريفية وفلسفة الرعاية</h3>
    <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.75rem;">
      ${doc.bio}
    </p>

    <h3 class="profile-section-title">${SVG_ICONS.graduation} الشهادات والدراسات الأكاديمية والزمالات</h3>
    <div class="studies-list">
      ${studiesHtml}
    </div>

    <h3 class="profile-section-title">${SVG_ICONS.trophy} النجاحات والإنجازات والأرقام القياسية</h3>
    <div class="achievements-list">
      ${achievementsHtml}
    </div>

    <h3 class="profile-section-title">${SVG_ICONS.activity} أبرز العمليات التي يجريها الجراح</h3>
    <div class="procedures-tag-list" style="margin-bottom: 1.75rem;">
      ${proceduresHtml}
    </div>

    <h3 class="profile-section-title">${SVG_ICONS.star} تقييمات وآراء المرضى الموثقة</h3>
    <div class="reviews-carousel">
      ${reviewsHtml}
    </div>
  `;

  // Set action button in modal footer
  const actionBtn = document.getElementById('doctorModalBookBtn');
  if (actionBtn) {
    actionBtn.onclick = () => {
      closeModal('doctorProfileModal');
      startBooking(doc.id, doc.surgeryId);
    };
  }

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('show');
  }
  document.body.style.overflow = 'auto';
}

// ==========================================================================
// Interactive Booking Flow (5-Step Stepper)
// ==========================================================================
function startBooking(surgeonId = '', surgeryId = '') {
  AppState.bookingStep = 1;
  AppState.currentBooking = {
    surgeryId: surgeryId,
    surgeonId: surgeonId,
    consultType: 'clinic',
    date: '',
    time: '',
    patientName: '',
    patientPhone: '',
    patientAge: '',
    patientGender: 'male',
    medicalHistory: '',
    notes: '',
    referenceCode: '',
    createdAt: ''
  };

  const modal = document.getElementById('bookingModal');
  if (!modal) return;

  renderBookingStep(1);
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function renderBookingStep(stepNumber) {
  AppState.bookingStep = stepNumber;

  // Update Stepper Visual Indicators
  for (let i = 1; i <= 5; i++) {
    const indicator = document.getElementById(`step-ind-${i}`);
    if (indicator) {
      indicator.classList.remove('active', 'completed');
      if (i === stepNumber) {
        indicator.classList.add('active');
      } else if (i < stepNumber) {
        indicator.classList.add('completed');
      }
    }

    // Toggle content container
    const content = document.getElementById(`bookingStep${i}`);
    if (content) {
      content.classList.remove('active');
      if (i === stepNumber) content.classList.add('active');
    }
  }

  // Update Modal Footer Buttons
  const prevBtn = document.getElementById('bookingPrevBtn');
  const nextBtn = document.getElementById('bookingNextBtn');
  const printBtn = document.getElementById('bookingPrintBtn');
  const finishBtn = document.getElementById('bookingFinishBtn');

  if (printBtn) printBtn.style.display = (stepNumber === 5) ? 'inline-flex' : 'none';
  if (finishBtn) finishBtn.style.display = (stepNumber === 5) ? 'inline-flex' : 'none';

  if (stepNumber === 1) {
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) {
      nextBtn.style.display = 'inline-flex';
      nextBtn.textContent = 'المتابعة للخطوة التالية';
    }
    setupStep1();
  } else if (stepNumber === 2) {
    if (prevBtn) prevBtn.style.display = 'inline-flex';
    if (nextBtn) {
      nextBtn.style.display = 'inline-flex';
      nextBtn.textContent = 'المتابعة لاختيار الموعد';
    }
    setupStep2();
  } else if (stepNumber === 3) {
    if (prevBtn) prevBtn.style.display = 'inline-flex';
    if (nextBtn) {
      nextBtn.style.display = 'inline-flex';
      nextBtn.textContent = 'المتابعة لبيانات المريض';
    }
    setupStep3();
  } else if (stepNumber === 4) {
    if (prevBtn) prevBtn.style.display = 'inline-flex';
    if (nextBtn) {
      nextBtn.style.display = 'inline-flex';
      nextBtn.textContent = 'تأكيد الحجز وإصدار التذكرة';
    }
    setupStep4();
  } else if (stepNumber === 5) {
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    setupStep5();
  }
}

// Step 1: Select Surgery & Surgeon
function setupStep1() {
  const surgerySelect = document.getElementById('bookingSurgerySelect');
  const surgeonSelect = document.getElementById('bookingSurgeonSelect');
  const previewBox = document.getElementById('bookingSurgeonPreview');

  if (surgerySelect) {
    surgerySelect.value = AppState.currentBooking.surgeryId || '';
    surgerySelect.onchange = () => {
      AppState.currentBooking.surgeryId = surgerySelect.value;
      updateBookingSurgeonsOptions();
    };
  }

  updateBookingSurgeonsOptions();

  if (surgeonSelect) {
    surgeonSelect.onchange = () => {
      AppState.currentBooking.surgeonId = surgeonSelect.value;
      updateSurgeonPreviewBox();
    };
  }
}

function updateBookingSurgeonsOptions() {
  const surgeonSelect = document.getElementById('bookingSurgeonSelect');
  if (!surgeonSelect) return;

  const currentSurgeryId = AppState.currentBooking.surgeryId;
  if (!currentSurgeryId) {
    surgeonSelect.innerHTML = `<option value="">-- يرجى اختيار نوع العملية أولاً --</option>`;
    surgeonSelect.disabled = true;
    updateSurgeonPreviewBox();
    return;
  }

  const eligibleSurgeons = SURGEONS_DATA.filter(doc => doc.surgeryId === currentSurgeryId);
  surgeonSelect.disabled = false;
  surgeonSelect.innerHTML = `<option value="">-- اختر الجراح المتخصص (${eligibleSurgeons.length} متاح) --</option>` +
    eligibleSurgeons.map(doc => `<option value="${doc.id}">${doc.name} - ${doc.hospital}</option>`).join('');

  if (AppState.currentBooking.surgeonId) {
    surgeonSelect.value = AppState.currentBooking.surgeonId;
  }
  updateSurgeonPreviewBox();
}

function updateSurgeonPreviewBox() {
  const previewBox = document.getElementById('bookingSurgeonPreview');
  if (!previewBox) return;

  const doc = SURGEONS_MAP[AppState.currentBooking.surgeonId];
  if (!doc) {
    previewBox.innerHTML = '';
    return;
  }

  previewBox.innerHTML = `
    <div style="display: flex; gap: 1rem; align-items: center; background: var(--bg-surface-alt); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-top: 1rem;">
      <img src="${doc.avatar}" style="width: 60px; height: 60px; border-radius: var(--radius-md); object-fit: cover;">
      <div>
        <h4 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.2rem;">${doc.name}</h4>
        <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 0.25rem;">${doc.title}</p>
        <span style="font-size: 0.8rem; color: var(--accent); font-weight: 700;">رسوم الكشف: ${doc.consultationFee} ر.س | نسبة النجاح: ${doc.successRate}</span>
      </div>
    </div>
  `;
}

// Step 2: Consultation Type
function setupStep2() {
  document.querySelectorAll('.consult-type-card').forEach(card => {
    card.onclick = () => {
      document.querySelectorAll('.consult-type-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      AppState.currentBooking.consultType = card.getAttribute('data-type');
    };
  });
}

// Step 3: Date & Time Picker
function setupStep3() {
  const dateInput = document.getElementById('bookingDateInput');
  const slotsContainer = document.getElementById('bookingTimeSlotsGrid');
  const doc = SURGEONS_MAP[AppState.currentBooking.surgeonId];

  // Set min date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];
  if (dateInput) {
    dateInput.min = minDateStr;
    if (!dateInput.value) {
      dateInput.value = minDateStr;
      AppState.currentBooking.date = minDateStr;
    }
    dateInput.onchange = () => {
      AppState.currentBooking.date = dateInput.value;
    };
  }

  // Render Time Slots
  if (slotsContainer && doc) {
    slotsContainer.innerHTML = doc.timeSlots.map((slot, index) => `
      <button type="button" class="time-slot-btn ${index === 0 ? 'selected' : ''}" data-slot="${slot}">
        ${slot}
      </button>
    `).join('');

    AppState.currentBooking.time = doc.timeSlots[0];

    document.querySelectorAll('.time-slot-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        AppState.currentBooking.time = btn.getAttribute('data-slot');
      };
    });
  }
}

// Step 4: Patient Info Form
function setupStep4() {
  // Inputs bindings
  const nameInput = document.getElementById('patientNameInput');
  const phoneInput = document.getElementById('patientPhoneInput');
  const ageInput = document.getElementById('patientAgeInput');
  const genderInput = document.getElementById('patientGenderSelect');
  const notesInput = document.getElementById('patientNotesInput');

  if (nameInput) nameInput.value = AppState.currentBooking.patientName || '';
  if (phoneInput) phoneInput.value = AppState.currentBooking.patientPhone || '';
  if (ageInput) ageInput.value = AppState.currentBooking.patientAge || '';
  if (genderInput) genderInput.value = AppState.currentBooking.patientGender || 'male';
  if (notesInput) notesInput.value = AppState.currentBooking.notes || '';
}

// Step 5: Booking Confirmation & Ticket Slip
function setupStep5() {
  const doc = SURGEONS_MAP[AppState.currentBooking.surgeonId];
  const surgery = SURGERIES_MAP[AppState.currentBooking.surgeryId];
  const ticketContainer = document.getElementById('bookingTicketSlip');
  if (!ticketContainer || !doc || !surgery) return;

  // Generate Reference Code if not generated
  if (!AppState.currentBooking.referenceCode) {
    const randCode = Math.floor(100000 + Math.random() * 900000);
    AppState.currentBooking.referenceCode = `SHIFA-${randCode}`;
    AppState.currentBooking.createdAt = new Date().toLocaleString('ar-SA');

    // Save to LocalStorage
    saveBookingToStorage(AppState.currentBooking);
    updateBookingsBadge();
    showToast('تم تأكيد حجزك بنجاح وحفظ التذكرة الطبية!', 'success');
  }

  const consultTypeLabels = {
    clinic: 'كشف حضوري بالعيادة',
    preop: 'تقييم شامل ما قبل الجراحة',
    video: 'استشارة طبية عن بعد (فيديو)'
  };

  ticketContainer.innerHTML = `
    <div class="ticket-header">
      <div>
        <span class="ticket-badge">حجز جراحي مؤكد</span>
        <h3 style="font-size: 1.35rem; font-weight: 800; margin-top: 0.5rem;">منصة شفاء لجراحة اليوم الواحد والمستشفيات المعتمدة</h3>
      </div>
      <div style="text-align: left;">
        <span style="font-size: 0.78rem; color: var(--text-muted); display: block;">رقم الحجز المرجعي</span>
        <span class="ticket-ref-code">${AppState.currentBooking.referenceCode}</span>
      </div>
    </div>

    <div class="ticket-grid">
      <div class="ticket-field">
        <span class="ticket-field-label">اسم المريض</span>
        <span class="ticket-field-value">${AppState.currentBooking.patientName}</span>
      </div>
      <div class="ticket-field">
        <span class="ticket-field-label">رقم الجوال</span>
        <span class="ticket-field-value" dir="ltr" style="text-align: right;">${AppState.currentBooking.patientPhone}</span>
      </div>
      <div class="ticket-field">
        <span class="ticket-field-label">الجراح الاستشاري</span>
        <span class="ticket-field-value">${doc.name}</span>
      </div>
      <div class="ticket-field">
        <span class="ticket-field-label">التخصص / نوع العملية</span>
        <span class="ticket-field-value">${surgery.title}</span>
      </div>
      <div class="ticket-field">
        <span class="ticket-field-label">المستشفى / المركز</span>
        <span class="ticket-field-value">${doc.hospital}</span>
      </div>
      <div class="ticket-field">
        <span class="ticket-field-label">نوع الموعد</span>
        <span class="ticket-field-value">${consultTypeLabels[AppState.currentBooking.consultType] || 'كشف عيادة'}</span>
      </div>
      <div class="ticket-field">
        <span class="ticket-field-label">تاريخ الموعد</span>
        <span class="ticket-field-value">${AppState.currentBooking.date}</span>
      </div>
      <div class="ticket-field">
        <span class="ticket-field-label">وقت الموعد</span>
        <span class="ticket-field-value">${AppState.currentBooking.time}</span>
      </div>
    </div>

    <div class="ticket-barcode-sim">
      <div class="barcode-lines"></div>
      <span style="font-family: monospace; font-size: 0.85rem; color: var(--text-muted);">${AppState.currentBooking.referenceCode}</span>
    </div>
  `;
}

// Stepper Validation & Progression
function nextBookingStep() {
  const currentStep = AppState.bookingStep;

  if (currentStep === 1) {
    if (!AppState.currentBooking.surgeryId) {
      showToast('يرجى اختيار نوع العملية الجراحية أولاً', 'error');
      return;
    }
    if (!AppState.currentBooking.surgeonId) {
      showToast('يرجى اختيار الجراح المتخصص', 'error');
      return;
    }
    renderBookingStep(2);
  } else if (currentStep === 2) {
    renderBookingStep(3);
  } else if (currentStep === 3) {
    const dateInput = document.getElementById('bookingDateInput');
    if (!dateInput || !dateInput.value) {
      showToast('يرجى تحديد تاريخ الكشف', 'error');
      return;
    }
    AppState.currentBooking.date = dateInput.value;
    if (!AppState.currentBooking.time) {
      showToast('يرجى تحديد وقت الموعد', 'error');
      return;
    }
    renderBookingStep(4);
  } else if (currentStep === 4) {
    const nameInput = document.getElementById('patientNameInput');
    const phoneInput = document.getElementById('patientPhoneInput');
    const ageInput = document.getElementById('patientAgeInput');
    const genderInput = document.getElementById('patientGenderSelect');
    const notesInput = document.getElementById('patientNotesInput');

    if (!nameInput.value.trim()) {
      showToast('يرجى كتابة الاسم الثلاثي للمريض', 'error');
      nameInput.focus();
      return;
    }
    if (!phoneInput.value.trim() || phoneInput.value.trim().length < 9) {
      showToast('يرجى كتابة رقم جوال صحيح للتواصل والتأكيد', 'error');
      phoneInput.focus();
      return;
    }

    AppState.currentBooking.patientName = nameInput.value.trim();
    AppState.currentBooking.patientPhone = phoneInput.value.trim();
    AppState.currentBooking.patientAge = ageInput.value.trim();
    AppState.currentBooking.patientGender = genderInput.value;
    AppState.currentBooking.notes = notesInput.value.trim();

    renderBookingStep(5);
  }
}

function prevBookingStep() {
  if (AppState.bookingStep > 1) {
    renderBookingStep(AppState.bookingStep - 1);
  }
}

// ==========================================================================
// LocalStorage Bookings Manager (حجوزاتي)
// ==========================================================================
function getStoredBookings() {
  try {
    const data = localStorage.getItem('shifa_bookings');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading bookings:', e);
    return [];
  }
}

function saveBookingToStorage(booking) {
  const existing = getStoredBookings();
  existing.unshift(booking);
  localStorage.setItem('shifa_bookings', JSON.stringify(existing));
}

function updateBookingsBadge() {
  const count = getStoredBookings().length;
  const badge = document.getElementById('bookingsCountBadge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  }
}

function renderMyBookings() {
  const container = document.getElementById('myBookingsList');
  if (!container) return;

  const bookings = getStoredBookings();
  if (bookings.length === 0) {
    container.innerHTML = `
      <div class="empty-bookings-box">
        <div class="empty-icon-wrap">${SVG_ICONS.calendar}</div>
        <h3>لا توجد أي حجوزات مسجلة حتى الآن</h3>
        <p>يمكنك تصفح كبار الجراحين أو العمليات الجراحية وحجز موعدك الأول بسهولة</p>
        <button class="btn-primary" style="margin-top: 1.25rem;" onclick="navigateTo('surgeries')">
          تصفح العمليات الجراحية
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = bookings.map((b, index) => {
    const doc = SURGEONS_MAP[b.surgeonId] || { name: 'جراح استشاري', hospital: 'المستشفى المعتمد', avatar: '' };
    const surgery = SURGERIES_MAP[b.surgeryId] || { title: 'عملية جراحية' };

    return `
      <div class="booking-item-card">
        <div class="booking-details-box">
          <img class="booking-doc-img" src="${doc.avatar}" alt="${doc.name}" onerror="this.src='https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80'">
          <div class="booking-item-info">
            <span class="surgery-badge" style="font-size: 0.72rem;">${surgery.title}</span>
            <h4>${doc.name}</h4>
            <div style="margin-top: 0.35rem;">
              <span class="booking-meta-pill">${SVG_ICONS.calendar} ${b.date}</span>
              <span class="booking-meta-pill">${SVG_ICONS.clock} ${b.time}</span>
              <span class="booking-meta-pill">${SVG_ICONS.mapPin} ${doc.hospital}</span>
            </div>
            <div style="margin-top: 0.4rem; font-size: 0.82rem; color: var(--text-muted);">
              المريض: <strong>${b.patientName}</strong> | رقم الحجز: <code>${b.referenceCode}</code>
            </div>
          </div>
        </div>

        <div class="booking-actions-group">
          <button class="btn-outline btn-sm" onclick="printBookingTicket('${b.referenceCode}')">
            ${SVG_ICONS.printer} طباعة التذكرة
          </button>
          <button class="btn-icon" title="إلغاء الموعد" onclick="cancelBooking(${index})">
            ${SVG_ICONS.trash}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function cancelBooking(index) {
  if (!confirm('هل أنت متأكد من رغبتك في إلغاء هذا الموعد الطبي؟')) return;
  const bookings = getStoredBookings();
  bookings.splice(index, 1);
  localStorage.setItem('shifa_bookings', JSON.stringify(bookings));
  renderMyBookings();
  updateBookingsBadge();
  showToast('تم إلغاء الموعد بنجاح', 'success');
}

function printBookingTicket(referenceCode) {
  const bookings = getStoredBookings();
  const booking = bookings.find(b => b.referenceCode === referenceCode);
  if (!booking) return;

  AppState.currentBooking = booking;
  startBooking(booking.surgeonId, booking.surgeryId);
  renderBookingStep(5);
  setTimeout(() => {
    window.print();
  }, 400);
}

// ==========================================================================
// Quick Search Palette (Ctrl + K)
// ==========================================================================
function initSearchPalette() {
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearchModal();
    }
  });

  const searchInput = document.getElementById('paletteSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      runPaletteSearch(e.target.value.trim());
    });
  }
}

function openSearchModal() {
  const modal = document.getElementById('quickSearchModal');
  const input = document.getElementById('paletteSearchInput');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    if (input) {
      input.value = '';
      input.focus();
      runPaletteSearch('');
    }
  }
}

function runPaletteSearch(query) {
  const resultsContainer = document.getElementById('paletteSearchResults');
  if (!resultsContainer) return;

  if (!query) {
    // Show top surgeries and surgeons
    resultsContainer.innerHTML = `
      <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.5rem;">التخصصات الجراحية المقترحة:</div>
      ${SURGERIES_DATA.slice(0, 4).map(s => `
        <div class="quick-search-item" onclick="closeModal('quickSearchModal'); filterBySurgery('${s.id}')">
          <div class="surgery-icon-box" style="width: 38px; height: 38px;">${SVG_ICONS[s.icon] || SVG_ICONS.activity}</div>
          <div class="quick-search-item-info">
            <span class="quick-search-item-title">${s.title}</span>
            <span class="quick-search-item-sub">${s.category} - 3 جراحين معتمدين</span>
          </div>
        </div>
      `).join('')}
    `;
    return;
  }

  const q = query.toLowerCase();
  const matchedSurgeries = SURGERIES_DATA.filter(s => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
  const matchedSurgeons = SURGEONS_DATA.filter(doc => doc.name.toLowerCase().includes(q) || doc.title.toLowerCase().includes(q) || doc.hospital.toLowerCase().includes(q));

  if (matchedSurgeries.length === 0 && matchedSurgeons.length === 0) {
    resultsContainer.innerHTML = `<div style="padding: 2rem; text-align: center; color: var(--text-muted);">لا توجد نتائج مطابقة لـ "${query}"</div>`;
    return;
  }

  let html = '';
  if (matchedSurgeries.length > 0) {
    html += `<div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin: 0.5rem 0;">العمليات الجراحية المطابقة (${matchedSurgeries.length}):</div>`;
    html += matchedSurgeries.slice(0, 4).map(s => `
      <div class="quick-search-item" onclick="closeModal('quickSearchModal'); filterBySurgery('${s.id}')">
        <div class="surgery-icon-box" style="width: 38px; height: 38px;">${SVG_ICONS[s.icon] || SVG_ICONS.activity}</div>
        <div class="quick-search-item-info">
          <span class="quick-search-item-title">${s.title}</span>
          <span class="quick-search-item-sub">${s.category} - نسبة نجاح: ${s.successRate}</span>
        </div>
      </div>
    `).join('');
  }

  if (matchedSurgeons.length > 0) {
    html += `<div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin: 0.75rem 0 0.5rem;">الجراحون المطابقون (${matchedSurgeons.length}):</div>`;
    html += matchedSurgeons.slice(0, 6).map(doc => `
      <div class="quick-search-item" onclick="closeModal('quickSearchModal'); openSurgeonModal('${doc.id}')">
        <img src="${doc.avatar}" style="width: 38px; height: 38px; border-radius: var(--radius-md); object-fit: cover;">
        <div class="quick-search-item-info">
          <span class="quick-search-item-title">${doc.name}</span>
          <span class="quick-search-item-sub">${doc.title} - ${doc.hospital}</span>
        </div>
      </div>
    `).join('');
  }

  resultsContainer.innerHTML = html;
}

// ==========================================================================
// Toast Notification Utility
// ==========================================================================
function showToast(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    ${type === 'success' ? SVG_ICONS.check : SVG_ICONS['alert-triangle']}
    <span>${message}</span>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ==========================================================================
// General Event Listeners
// ==========================================================================
function initEventListeners() {
  // Theme Toggle Button
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) themeBtn.onclick = toggleTheme;

  // Header Search Button
  const searchBtn = document.getElementById('headerSearchBtn');
  if (searchBtn) searchBtn.onclick = openSearchModal;

  // Hero Search Inputs
  const heroSearchInput = document.getElementById('heroSearchInput');
  const heroCategorySelect = document.getElementById('heroCategorySelect');
  const heroSearchBtn = document.getElementById('heroSearchBtn');

  if (heroSearchBtn) {
    heroSearchBtn.onclick = () => {
      const q = heroSearchInput ? heroSearchInput.value.trim() : '';
      const cat = heroCategorySelect ? heroCategorySelect.value : 'all';

      navigateTo('surgeons');
      const docInput = document.getElementById('surgeonSearchInput');
      const docSelect = document.getElementById('surgeonSurgerySelect');

      if (docInput) docInput.value = q;
      if (docSelect) docSelect.value = cat;

      AppState.surgeonSearchQuery = q;
      AppState.activeSurgeonFilter = cat;
      renderSurgeons();
    };
  }

  // Surgeon Search Bar on Directory Page
  const surgeonSearchInput = document.getElementById('surgeonSearchInput');
  if (surgeonSearchInput) {
    surgeonSearchInput.addEventListener('input', (e) => {
      AppState.surgeonSearchQuery = e.target.value;
      renderSurgeons();
    });
  }

  const surgeonSurgerySelect = document.getElementById('surgeonSurgerySelect');
  if (surgeonSurgerySelect) {
    surgeonSurgerySelect.addEventListener('change', (e) => {
      AppState.activeSurgeonFilter = e.target.value;
      renderSurgeons();
    });
  }

  // Modal Backdrop Close Clicks
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('show');
        document.body.style.overflow = 'auto';
      }
    });
  });
}
