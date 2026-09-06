/**
 * MAIN.JS - منصة حجوزات شاليهات وباقات حفلات الرياض الفاخرة
 * المطور والشريك التقني: مهندس برمجيات وذكاء اصطناعي أسامة صالح درهم راجح | OVRAX
 * واتساب / اتصال: +966568009474
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. القائمة المتنقلة للموبايل
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  // 2. الفلترة المزدوجة (المناسبة + مناطق الرياض)
  let activeOccasion = 'all';
  let activeZone = 'all';

  const occasionBtns = document.querySelectorAll('.tab-btn:not(.zone-btn)');
  const zoneBtns = document.querySelectorAll('.tab-btn.zone-btn');
  const packageCards = document.querySelectorAll('.package-card');

  function filterPackages() {
    packageCards.forEach(card => {
      const cardOccasion = card.getAttribute('data-category');
      const cardZone = card.getAttribute('data-zone');

      const matchOccasion = (activeOccasion === 'all' || cardOccasion === activeOccasion);
      const matchZone = (activeZone === 'all' || cardZone === activeZone);

      if (matchOccasion && matchZone) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.35s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (occasionBtns.length > 0) {
    occasionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        occasionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeOccasion = btn.getAttribute('data-category');
        filterPackages();
      });
    });
  }

  if (zoneBtns.length > 0) {
    zoneBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        zoneBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeZone = btn.getAttribute('data-zone');
        filterPackages();
      });
    });
  }

  // 3. المساعد الذكي التفاعلي بالذكاء الاصطناعي (Riyadh AI Matcher)
  const openAiModalBtns = document.querySelectorAll('.open-ai-modal');
  const aiModal = document.getElementById('aiMatcherModal');
  const closeAiModal = document.getElementById('closeAiModal');
  const aiOptions = document.querySelectorAll('.ai-option-btn');
  const aiResultBox = document.getElementById('aiResultBox');
  const aiQuestionsContainer = document.getElementById('aiQuestionsContainer');
  const restartAiBtn = document.getElementById('restartAiBtn');

  let aiAnswers = { occasion: '', zone: '', guests: '' };

  if (openAiModalBtns.length > 0 && aiModal) {
    openAiModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        aiModal.classList.add('active');
      });
    });
  }

  if (closeAiModal && aiModal) {
    closeAiModal.addEventListener('click', () => {
      aiModal.classList.remove('active');
    });
  }

  if (aiOptions.length > 0) {
    aiOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        const group = opt.getAttribute('data-group');
        const value = opt.getAttribute('data-value');

        // تحديد الخيار
        document.querySelectorAll(`.ai-option-btn[data-group="${group}"]`).forEach(b => b.classList.remove('selected'));
        opt.classList.add('selected');
        aiAnswers[group] = value;

        // التحقق من اكتمال الإجابات
        if (aiAnswers.occasion && aiAnswers.zone && aiAnswers.guests) {
          generateAiRecommendation();
        }
      });
    });
  }

  function generateAiRecommendation() {
    if (!aiResultBox || !aiQuestionsContainer) return;

    aiQuestionsContainer.style.display = 'none';
    aiResultBox.style.display = 'block';

    const recTitle = document.getElementById('aiRecTitle');
    const recLocation = document.getElementById('aiRecLocation');
    const recPrice = document.getElementById('aiRecPrice');
    const recPerk = document.getElementById('aiRecPerk');

    let title = 'باقة رويال الملكية للتخرج';
    let location = 'شاليهات النرجس VIP - شمال الرياض';
    let price = '2,800 ر.س';
    let perk = 'تجهيز ستيج ملكي، قوس بالونات هيليوم، إضاءات ليزر ومسبح خاص دافئ.';

    if (aiAnswers.zone === 'west') {
      title = 'باقة واحة الدرعية التاريخية';
      location = 'منتجعات وادي حنيفة والدرعية - غرب الرياض';
      price = '3,900 ر.س';
      perk = 'طابع تراثي ملكي فاخر، كوشة ورد طبيعي وممر مضيء على المسبح.';
    } else if (aiAnswers.zone === 'east') {
      title = 'باقة الثمامة لاكجري ريزورت';
      location = 'منتجع الثمامة والرمال - شرق الرياض';
      price = '2,200 ر.س';
      perk = 'جلسات خارجية رحبة، شاشات سينمائية ومؤثرات صوتية كاملة.';
    }

    if (recTitle) recTitle.textContent = title;
    if (recLocation) recLocation.textContent = location;
    if (recPrice) recPrice.textContent = price;
    if (recPerk) recPerk.textContent = perk;
  }

  if (restartAiBtn) {
    restartAiBtn.addEventListener('click', () => {
      aiAnswers = { occasion: '', zone: '', guests: '' };
      aiOptions.forEach(b => b.classList.remove('selected'));
      aiResultBox.style.display = 'none';
      aiQuestionsContainer.style.display = 'block';
    });
  }

  // 4. محاكي عبارات النيون الفوري (Live Neon Customizer)
  const neonInput = document.getElementById('neonTextInput');
  const neonDisplay = document.getElementById('neonStageText');

  if (neonInput && neonDisplay) {
    neonInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      neonDisplay.textContent = val ? val : 'مبروك التخرج سارة ✨';
    });
  }

  // 5. نافذة ملف المطور والشريك التقني (OVRAX & Osama Saleh Modal)
  const openDevModalBtns = document.querySelectorAll('.open-dev-modal');
  const devProfileModal = document.getElementById('devProfileModal');
  const closeDevModal = document.getElementById('closeDevModal');

  if (openDevModalBtns.length > 0 && devProfileModal) {
    openDevModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        devProfileModal.classList.add('active');
      });
    });
  }

  if (closeDevModal && devProfileModal) {
    closeDevModal.addEventListener('click', () => {
      devProfileModal.classList.remove('active');
    });
  }

  // 6. معرض الصور التفاعلي (تفاصيل العرض)
  const mainImage = document.getElementById('mainChaletImg');
  const thumbImages = document.querySelectorAll('.thumb-img');

  if (mainImage && thumbImages.length > 0) {
    thumbImages.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbImages.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        mainImage.style.opacity = '0.3';
        setTimeout(() => {
          mainImage.src = thumb.src;
          mainImage.style.opacity = '1';
        }, 150);
      });
    });
  }

  // 7. حاسبة الأسعار التفاعلية (تفاصيل العرض)
  const basePriceEl = document.getElementById('basePrice');
  const totalAmountEl = document.getElementById('totalAmount');
  const periodSelect = document.getElementById('periodSelect');
  const addonCheckboxes = document.querySelectorAll('.addon-checkbox');

  function calculateTotal() {
    if (!basePriceEl || !totalAmountEl) return;

    let base = 2800;
    let periodAdjustment = 0;

    if (periodSelect) {
      if (periodSelect.value === 'morning') periodAdjustment = -300;
      else if (periodSelect.value === 'evening') periodAdjustment = 0;
      else if (periodSelect.value === 'full') periodAdjustment = 900;
    }

    let addonsTotal = 0;
    if (addonCheckboxes) {
      addonCheckboxes.forEach(cb => {
        if (cb.checked) {
          addonsTotal += parseInt(cb.getAttribute('data-price') || 0, 10);
        }
      });
    }

    const grandTotal = base + periodAdjustment + addonsTotal;
    totalAmountEl.textContent = grandTotal.toLocaleString('ar-SA') + ' ر.س';

    const subtotalEl = document.getElementById('subtotalAmount');
    if (subtotalEl) {
      subtotalEl.textContent = (base + periodAdjustment).toLocaleString('ar-SA') + ' ر.س';
    }
  }

  if (periodSelect) periodSelect.addEventListener('change', calculateTotal);
  if (addonCheckboxes.length > 0) {
    addonCheckboxes.forEach(cb => cb.addEventListener('change', calculateTotal));
  }

  // 8. تأكيد وإرسال طلب الحجز + حفظه في LocalStorage
  const bookingForm = document.getElementById('bookingForm');
  const successModal = document.getElementById('successModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const bookingRefEl = document.getElementById('bookingReference');

  if (bookingForm && successModal) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const customerName = document.getElementById('custName')?.value || 'عميل تجريبي';
      const customerPhone = document.getElementById('custPhone')?.value || '0551122334';
      const bookingDate = document.getElementById('bookDate')?.value || '2026-09-18';
      const packageTitle = document.getElementById('packageTitle')?.textContent || 'باقة رويال الملكية (حفل تخرج)';
      const finalPrice = totalAmountEl ? totalAmountEl.textContent : '3,250 ر.س';
      const neonText = document.getElementById('neonTextInput')?.value || 'Class of 2026';

      const randomRef = 'RES-' + Math.floor(1000 + Math.random() * 9000);
      if (bookingRefEl) bookingRefEl.textContent = randomRef;

      const newBooking = {
        id: randomRef,
        customerName: customerName,
        phone: customerPhone,
        package: packageTitle,
        zone: 'شمال الرياض (حي النرجس)',
        date: bookingDate,
        amount: finalPrice,
        customText: neonText,
        status: 'pending',
        time: 'منذ قليل'
      };

      let existingBookings = JSON.parse(localStorage.getItem('chalet_bookings') || '[]');
      existingBookings.unshift(newBooking);
      localStorage.setItem('chalet_bookings', JSON.stringify(existingBookings));

      successModal.classList.add('active');
    });
  }

  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });
  }

  // إغلاق أي نافذة مودال بالنقر خارجها
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('active');
    }
  });
});
