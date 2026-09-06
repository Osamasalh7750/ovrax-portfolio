/* ==========================================================================
   OVRAX MAIN SCRIPT
   Navigation, Typing Effect, Audio Synthesizer, Stats Counter & Tilt
   ========================================================================== */

// Typing Effect in Hero
const titlesToType = [
  "مهندس ذكاء اصطناعي توليدي (GenAI)",
  "مطور ومصمم نظم شاملة (Full-Stack)",
  "خبير أتمتة الحملات الإعلانية و APIs",
  "مهندس شبكات وبنية تحتية سحابية"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 90;
const deleteSpeed = 40;
const pauseDelay = 1800;

function typeWriter() {
  const elem = document.getElementById('typedText');
  if (!elem) return;

  const currentText = titlesToType[titleIndex];

  if (!isDeleting) {
    elem.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeWriter, pauseDelay);
      return;
    }
  } else {
    elem.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titlesToType.length;
      setTimeout(typeWriter, 400);
      return;
    }
  }

  setTimeout(typeWriter, isDeleting ? deleteSpeed : typeSpeed);
}

// Stats Counter on Scroll
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-number');
  if (!stats.length) return;

  let hasRun = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasRun) {
        hasRun = true;
        stats.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
          let count = 0;
          const duration = 2000;
          const stepTime = Math.max(Math.floor(duration / target), 30);
          
          const timer = setInterval(() => {
            count += Math.ceil(target / (duration / stepTime));
            if (count >= target) {
              stat.textContent = target;
              clearInterval(timer);
            } else {
              stat.textContent = count;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.5 });

  const heroSection = document.getElementById('hero');
  if (heroSection) observer.observe(heroSection);
}

// Navbar Scroll Effect & Scrollspy
function initNavbarScroll() {
  const header = document.getElementById('mainHeader');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('navMenu');
  const links = document.querySelectorAll('.nav-link');

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('active');
    btn.classList.toggle('active');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      btn.classList.remove('active');
    });
  });
}

// Futuristic Sound Synth (Web Audio API)
let soundEnabled = true;
let audioCtx = null;

function playFuturisticClick(freq = 660, duration = 0.08) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // audio context might be blocked by browser policy
  }
}

function initSoundToggle() {
  const toggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      soundIcon.className = 'fas fa-volume-up';
      showToast("تم تفعيل المؤثرات الصوتية السيبرانية", "info");
      playFuturisticClick(880, 0.1);
    } else {
      soundIcon.className = 'fas fa-volume-mute';
      showToast("تم كتم المؤثرات الصوتية", "info");
    }
  });

  // Attach sound click to interactive buttons
  document.querySelectorAll('.cyber-btn, .filter-btn, .prompt-chip, .btn-demo, .btn-buy, .option-card').forEach(elem => {
    elem.addEventListener('click', () => playFuturisticClick(580, 0.06));
  });
}

// 3D Card Tilt Effect (Vanilla implementation)
function initTiltEffect() {
  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

// Toast Notifications Helper
function showToast(message, type = "info") {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icon = type === 'success' ? 'fa-check-circle text-cyan' 
             : type === 'error' ? 'fa-exclamation-circle text-amber' 
             : 'fa-info-circle text-cyan';

  toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  typeWriter();
  initStatsCounter();
  initNavbarScroll();
  initMobileMenu();
  initSoundToggle();
  initTiltEffect();
});

// ==================== VISITOR COUNTER ====================
function updateVisitorCount() {
  const counterElem = document.getElementById('visitorCountDisplay');
  if (!counterElem) return;

  const namespace = "ovrax_osama_saleh_portfolio";
  const key = "visits";

  // محاولة الاتصال بالخادم عبر تقنية متوافقة مع المتصفحات المحلية
  const script = document.createElement('script');
  script.src = `https://api.counterapi.dev/v1/${namespace}/${key}/up?callback=handleCounterResponse`;
  
  // دالة استقبال النتيجة
  window.handleCounterResponse = function(data) {
    if (data && data.count) {
      animateCounter(counterElem, data.count);
    } else {
      fallbackLocalCounter(counterElem);
    }
  };

  // في حال تعذر الاتصال أو كان الجهاز بدون إنترنت
  script.onerror = function() {
    fallbackLocalCounter(counterElem);
  };

  document.body.appendChild(script);
}

function fallbackLocalCounter(elem) {
  let localVisits = parseInt(localStorage.getItem('ovrax_local_visits') || '1420', 10) + 1;
  localStorage.setItem('ovrax_local_visits', localVisits);
  animateCounter(elem, localVisits);
}

function animateCounter(elem, target) {
  let count = 0;
  const step = Math.max(1, Math.floor(target / 30));
  const timer = setInterval(() => {
    count += step;
    if (count >= target) {
      elem.textContent = Number(target).toLocaleString();
      clearInterval(timer);
    } else {
      elem.textContent = Number(count).toLocaleString();
    }
  }, 25);
}

document.addEventListener('DOMContentLoaded', updateVisitorCount);