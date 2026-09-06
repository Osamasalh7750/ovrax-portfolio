/* ==========================================================================
   OVRAX ORDER FORM & REAL-TIME ESTIMATOR
   Interactive Quote Calculator, Multi-Channel WhatsApp & Email Dispatcher
   ========================================================================== */

function initQuoteCalculator() {
  const form = document.getElementById('projectOrderForm');
  if (!form) return;

  const projectTypeRadios = form.querySelectorAll('input[name="projectType"]');
  const featureCheckboxes = form.querySelectorAll('input[name="features"]');
  const timelineSelect = document.getElementById('projectTimeline');
  const waBtn = document.getElementById('sendWhatsAppOrderBtn');
  
  // Option Card visual toggle
  projectTypeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.option-card').forEach(card => card.classList.remove('active'));
      if (radio.checked) {
        radio.closest('.option-card').classList.add('active');
      }
      calculateEstimate();
    });
  });

  featureCheckboxes.forEach(cb => cb.addEventListener('change', calculateEstimate));
  if (timelineSelect) timelineSelect.addEventListener('change', calculateEstimate);

  // Initial Calculation
  calculateEstimate();

  // WhatsApp Button Click
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const data = collectFormData();
      if (!validateEssentialInputs(data)) return;

      const waMessage = formatWhatsAppMessage(data);
      const waUrl = `https://wa.me/966553074762?text=${encodeURIComponent(waMessage)}`;
      
      celebrateAction();
      if (typeof showToast === 'function') {
        showToast("جاري توجيهك إلى محادثة WhatsApp مع المهندس أسامة...", "success");
      }
      window.open(waUrl, '_blank');
    });
  }

  // Form Submit (Email)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = collectFormData();
    if (!validateEssentialInputs(data)) return;

    const emailSubject = `طلب مشروع جديد: ${data.projectTypeName} - من ${data.clientName}`;
    const emailBody = formatEmailBody(data);
    const mailtoUrl = `mailto:osamasalh7750@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    celebrateAction();
    if (typeof showToast === 'function') {
      showToast("تم تجهيز الطلب! جاري فتح البريد الإلكتروني للإرسال...", "success");
    }
    window.location.href = mailtoUrl;
  });
}

function calculateEstimate() {
  const form = document.getElementById('projectOrderForm');
  if (!form) return;

  const costDisplay = document.getElementById('estimatedCostDisplay');
  const timeDisplay = document.getElementById('estimatedTimeDisplay');

  // Base Prices by Project Type
  const basePrices = {
    'ai-system': { min: 1400, max: 2800, weeks: '3 - 5 أسابيع' },
    'web-ecommerce': { min: 900, max: 2000, weeks: '2 - 4 أسابيع' },
    'pos-erp': { min: 1200, max: 2600, weeks: '3 - 5 أسابيع' },
    'ad-automation': { min: 1000, max: 2200, weeks: '2 - 4 أسابيع' },
    'custom-fullstack': { min: 1500, max: 3500, weeks: '4 - 7 أسابيع' },
    'network-infrastructure': { min: 800, max: 1800, weeks: '2 - 3 أسابيع' }
  };

  const selectedType = form.querySelector('input[name="projectType"]:checked')?.value || 'ai-system';
  let minCost = basePrices[selectedType].min;
  let maxCost = basePrices[selectedType].max;
  let timeEst = basePrices[selectedType].weeks;

  // Additional Features
  const checkedFeatures = form.querySelectorAll('input[name="features"]:checked');
  const extraCostPerFeature = 150;
  const totalFeatureCost = checkedFeatures.length * extraCostPerFeature;

  minCost += totalFeatureCost;
  maxCost += totalFeatureCost + 200;

  // Timeline Multiplier
  const timeline = document.getElementById('projectTimeline')?.value;
  if (timeline === 'urgent') {
    minCost = Math.round(minCost * 1.25);
    maxCost = Math.round(maxCost * 1.25);
    timeEst = '7 - 14 يوم (تسليم عاجل)';
  } else if (timeline === 'flexible') {
    minCost = Math.round(minCost * 0.95);
    maxCost = Math.round(maxCost * 0.95);
    timeEst = '1 - 2 شهر (تسليم مرن)';
  }

  if (costDisplay) costDisplay.textContent = `$${minCost.toLocaleString()} - $${maxCost.toLocaleString()}`;
  if (timeDisplay) timeDisplay.textContent = timeEst;
}

function collectFormData() {
  const form = document.getElementById('projectOrderForm');
  const selectedType = form.querySelector('input[name="projectType"]:checked')?.value || '';
  
  const typeNames = {
    'ai-system': 'نظام أو تطبيق ذكاء اصطناعي (AI & LLMs)',
    'web-ecommerce': 'متجر إلكتروني / موقع تجاري',
    'pos-erp': 'منظومة إدارة شركات / POS & ERP',
    'ad-automation': 'نظام أتمتة إعلانات وتسويق',
    'custom-fullstack': 'برمجية مخصصة (Custom Full-Stack)',
    'network-infrastructure': 'هندسة شبكات وأمن معلومات'
  };

  const features = Array.from(form.querySelectorAll('input[name="features"]:checked')).map(cb => {
    return cb.closest('.feature-chip').querySelector('.chip-box').textContent.trim();
  });

  const timelineSelect = document.getElementById('projectTimeline');
  const timelineText = timelineSelect.options[timelineSelect.selectedIndex].text;

  return {
    projectType: selectedType,
    projectTypeName: typeNames[selectedType] || selectedType,
    features: features,
    clientName: document.getElementById('clientName')?.value.trim() || '',
    clientPhone: document.getElementById('clientPhone')?.value.trim() || '',
    clientEmail: document.getElementById('clientEmail')?.value.trim() || '',
    timeline: timelineText,
    description: document.getElementById('projectDescription')?.value.trim() || '',
    costEstimate: document.getElementById('estimatedCostDisplay')?.textContent || ''
  };
}

function validateEssentialInputs(data) {
  if (!data.clientName) {
    if (typeof showToast === 'function') showToast("يرجى إدخال اسمك أو اسم شركتك", "error");
    document.getElementById('clientName')?.focus();
    return false;
  }
  if (!data.clientPhone) {
    if (typeof showToast === 'function') showToast("يرجى إدخال رقم الهاتف أو الواتساب", "error");
    document.getElementById('clientPhone')?.focus();
    return false;
  }
  if (!data.description) {
    if (typeof showToast === 'function') showToast("يرجى كتابة وصف موجز لفكرة مشروعك", "error");
    document.getElementById('projectDescription')?.focus();
    return false;
  }
  return true;
}

function formatWhatsAppMessage(data) {
  return `*طلب مشروع برمجي جديد عبر منصة OVRAX* 🚀\n\n` +
    `👤 *اسم العميل / الشركة:* ${data.clientName}\n` +
    `📱 *رقم التواصل:* ${data.clientPhone}\n` +
    `📧 *البريد:* ${data.clientEmail || 'غير محدد'}\n\n` +
    `📌 *نوع المشروع:* ${data.projectTypeName}\n` +
    `⏱️ *الجدول الزمني المرغوب:* ${data.timeline}\n` +
    `💰 *التقدير المالي المبدئي:* ${data.costEstimate}\n\n` +
    `✨ *الميزات المطلوبة:*\n${data.features.map(f => `  • ${f}`).join('\n')}\n\n` +
    `📝 *تفاصيل المتطلبات:*\n${data.description}\n\n` +
    `_تم إرسال هذا الطلب عبر بوابة OVRAX الرسمية للمهندس أسامة صالح_`;
}

function formatEmailBody(data) {
  return `طلب مشروع جديد عبر بوابة OVRAX\n\n` +
    `بيانات العميل:\n` +
    `- الاسم: ${data.clientName}\n` +
    `- الهاتف / الواتساب: ${data.clientPhone}\n` +
    `- البريد الإلكتروني: ${data.clientEmail}\n\n` +
    `مواصفات المشروع:\n` +
    `- نوع المشروع: ${data.projectTypeName}\n` +
    `- الإطار الزمني: ${data.timeline}\n` +
    `- التقدير المالي: ${data.costEstimate}\n\n` +
    `الميزات والملحقات المطلوبة:\n` +
    `${data.features.map(f => `* ${f}`).join('\n')}\n\n` +
    `تفاصيل الفكرة والمتطلبات:\n` +
    `${data.description}\n`;
}

document.addEventListener('DOMContentLoaded', initQuoteCalculator);
