/**
 * الوظائف العامة للموقع، التنسيقات التفاعلية، الوضع الليلي، والإشعارات
 * General App Engine
 */

// نظام الإشعارات المنبثقة (Toast Alerts)
function showToast(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icon = type === 'success' ? 'fa-check-circle' : (type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle');
  toast.innerHTML = `<i class="fas ${icon}" style="font-size: 1.2rem;"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// التحكم في السلة الجانبية (Cart Drawer Toggle)
function toggleCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartDrawerOverlay');
  if (drawer && overlay) {
    drawer.classList.toggle('active');
    overlay.classList.toggle('active');
  }
}

// التبديل بين الوضع الليلي والنهاري (Dark / Light Theme)
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('sultan_theme', newTheme);

  const themeIcon = document.getElementById('themeToggleIcon');
  const themeText = document.getElementById('themeToggleText');
  if (themeIcon) {
    themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
  if (themeText) {
    themeText.textContent = newTheme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي';
  }
}

// مؤقت العد التنازلي للعرض اليومي
function initCountdown() {
  const hoursEl = document.getElementById('countHours');
  const minsEl = document.getElementById('countMins');
  const secsEl = document.getElementById('countSecs');
  if (!hoursEl || !minsEl || !secsEl) return;

  // نهاية اليوم
  function updateTimer() {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const diff = endOfDay - now;
    if (diff <= 0) return;

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// الاشتراك بالنشرة البريدية
function handleNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  if (input && input.value) {
    showToast('شكراً لاشتراكك! ستحصل على كود خصم 15% على بريدك 💌', 'success');
    input.value = '';
  }
}

// القائمة المتنقلة في الجوال
function toggleMobileMenu() {
  const nav = document.querySelector('.nav-links');
  if (nav) nav.classList.toggle('active');
}

// التهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  // استرجاع الثيم المفضل
  const savedTheme = localStorage.getItem('sultan_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const themeIcon = document.getElementById('themeToggleIcon');
  const themeText = document.getElementById('themeToggleText');
  if (themeIcon) themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  if (themeText) themeText.textContent = savedTheme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي';

  initCountdown();

  // إغلاق المودال عند النقر خارج المحتوى
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('active');
    }
  });
});
