/* ==========================================================================
   ADMIN.JS - إدارة الفعاليات وتتبع مسارها خطوة بخطوة لحظة بلحظة
   ========================================================================== */

(function () {
  'use strict';

  // نماذج الحجوزات الأولية إذا لم تكن مخزنة مسبقاً
  const defaultBookings = [
    {
      ref: 'ATH-924102',
      clientName: 'أ. فيصل بن فهد آل سعود',
      clientPhone: '0555123456',
      venueName: 'شاليه وقصر الفخامة VIP (الدرعية)',
      eventType: 'حفل زفاف ملكي',
      date: '2026-09-08',
      slot: 'فترة مسائية (5 م - 2 ص)',
      guestCount: 150,
      total: 18500,
      step: 3, // 1: حجز، 2: تنسيق، 3: تجهيز، 4: جاهز، 5: مكتمل
      status: 'تجهيز الديكور والصوتيات'
    },
    {
      ref: 'ATH-817290',
      clientName: 'د. سارة المنصور',
      clientPhone: '0544987654',
      venueName: 'منتجع الأرياف البانورامي (العمارية)',
      eventType: 'حفل تخرج وتفوق',
      date: '2026-09-12',
      slot: 'فترة مسائية (5 م - 2 ص)',
      guestCount: 75,
      total: 9400,
      step: 2,
      status: 'جاري التنسيق مع العميل'
    },
    {
      ref: 'ATH-763911',
      clientName: 'م. خالد الدوسري',
      clientPhone: '0568009474',
      venueName: 'شاليه اللؤلؤة والواحة الملكية (شمال الرياض)',
      eventType: 'لقاء عمل واجتماع VIP',
      date: '2026-09-05',
      slot: 'يوم كامل 24 ساعة',
      guestCount: 40,
      total: 6200,
      step: 4,
      status: 'جاهز للاستقبال والضيافة'
    }
  ];

  let bookings = [];

  function loadBookings() {
    const saved = localStorage.getItem('all_bookings');
    if (saved) {
      try {
        bookings = JSON.parse(saved);
      } catch (e) {
        bookings = defaultBookings;
      }
    } else {
      bookings = defaultBookings;
      localStorage.setItem('all_bookings', JSON.stringify(bookings));
    }

    renderPipelineTracker();
    renderBookingsTable();
    updateDashboardMetrics();
  }

  // 1. تحديث بطاقات الإحصائيات
  function updateDashboardMetrics() {
    const totalCount = bookings.length;
    let totalRevenue = 0;
    let activeNow = 0;

    bookings.forEach(b => {
      totalRevenue += (b.total || 0);
      if (b.step >= 2 && b.step <= 4) activeNow++;
    });

    const elTotal = document.getElementById('metric-total-bookings');
    const elRev = document.getElementById('metric-total-revenue');
    const elActive = document.getElementById('metric-active-events');

    if (elTotal) elTotal.textContent = totalCount;
    if (elRev) elRev.textContent = totalRevenue.toLocaleString('ar-SA') + ' ر.س';
    if (elActive) elActive.textContent = activeNow;
  }

  // 2. بناء مسار تتبع الفعالية الأولى (Live Event Pipeline)
  function renderPipelineTracker() {
    const container = document.getElementById('live-pipeline-cards');
    if (!container) return;

    container.innerHTML = '';

    // نأخذ الفعاليات القريبة أو النشطة
    const activeEvents = bookings.slice(0, 2);

    activeEvents.forEach((event, idx) => {
      const card = document.createElement('div');
      card.className = 'event-tracker-card';

      const stepsNames = [
        'تم استلام الحجز',
        'جاري التنسيق',
        'تجهيز الديكور والصوتيات',
        'جاهز للاستقبال',
        'الفعالية جارية ومكتملة'
      ];

      let stepsHtml = '';
      stepsNames.forEach((name, stepIdx) => {
        const stepNum = stepIdx + 1;
        let stateClass = '';
        if (event.step > stepNum) stateClass = 'completed';
        else if (event.step === stepNum) stateClass = 'active';

        stepsHtml += `
          <div class="step-item ${stateClass}">
            <div class="step-circle">${event.step > stepNum ? '<i class="fa-solid fa-check"></i>' : stepNum}</div>
            <div class="step-label">${name}</div>
          </div>
        `;
      });

      card.innerHTML = `
        <div class="tracker-title-row">
          <div>
            <span class="badge-pastel badge-champagne" style="margin-bottom:6px;"><i class="fa-solid fa-gem"></i> ${event.eventType}</span>
            <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-dark);">${event.venueName}</h3>
            <p style="font-size:0.85rem; color:var(--text-muted);"><i class="fa-solid fa-user"></i> العميل: ${event.clientName} | <i class="fa-solid fa-calendar"></i> الموعد: ${event.date}</p>
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            <button class="btn btn-outline-gold" style="padding:6px 14px; font-size:0.85rem;" onclick="advanceEventStep('${event.ref}')">
              <i class="fa-solid fa-forward-step"></i> تقدم للمرحلة التالية
            </button>
            <a href="https://wa.me/966${event.clientPhone ? event.clientPhone.replace(/^0/, '') : '568009474'}?text=${encodeURIComponent('مرحباً بك! نتواصل معك من إدارة أثير بخصوص تجهيزات مناسبتكم رقم ' + event.ref)}" target="_blank" class="btn btn-champagne" style="padding:6px 14px; font-size:0.85rem; background:#25d366; border:none;">
              <i class="fa-brands fa-whatsapp"></i> تواصل مع العميل
            </a>
          </div>
        </div>

        <div class="stepper-progress">
          ${stepsHtml}
        </div>
      `;

      container.appendChild(card);
    });
  }

  // 3. تقديم مرحلة الفعالية خطوة للأمام
  window.advanceEventStep = function (ref) {
    const ev = bookings.find(b => b.ref === ref);
    if (!ev) return;

    if (ev.step < 5) {
      ev.step++;
      const statuses = [
        'تم الحجز',
        'جاري التنسيق مع العميل',
        'تجهيز الديكور والصوتيات',
        'جاهز للاستقبال والضيافة',
        'الفعالية مكتملة بنجاح'
      ];
      ev.status = statuses[ev.step - 1];

      localStorage.setItem('all_bookings', JSON.stringify(bookings));
      renderPipelineTracker();
      renderBookingsTable();
      updateDashboardMetrics();

      alert(`🎉 تم تحديث حالة الفعالية [${ref}] إلى: ${ev.status}`);
    } else {
      alert('الفعالية مكتملة بالكامل!');
    }
  };

  // 4. جدول الحجوزات
  function renderBookingsTable() {
    const tbody = document.getElementById('admin-bookings-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    bookings.forEach(b => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="color:var(--champagne-primary);">${b.ref}</strong></td>
        <td><strong>${b.clientName}</strong><br><small style="color:var(--text-muted);">${b.clientPhone}</small></td>
        <td>${b.venueName}</td>
        <td><span class="badge-pastel badge-blush">${b.eventType}</span></td>
        <td>${b.date}<br><small style="color:var(--text-muted);">${b.slot}</small></td>
        <td>${b.guestCount} ضيف</td>
        <td><strong>${(b.total || 0).toLocaleString('ar-SA')} ر.س</strong></td>
        <td><span class="badge-pastel badge-sage">${b.status}</span></td>
        <td>
          <a href="invoice.html" onclick="localStorage.setItem('latest_booking', JSON.stringify(${JSON.stringify(b).replace(/"/g, '&quot;')}))" class="btn btn-soft" style="padding:4px 10px; font-size:0.8rem;" title="عرض الفاتورة والتقرير">
            <i class="fa-solid fa-file-invoice"></i> الفاتورة
          </a>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // تصفية الحجوزات في الجدول
  window.filterAdminTable = function (keyword) {
    const k = keyword.toLowerCase().trim();
    const rows = document.querySelectorAll('#admin-bookings-tbody tr');
    rows.forEach(r => {
      const text = r.textContent.toLowerCase();
      r.style.display = text.includes(k) ? '' : 'none';
    });
  };

  document.addEventListener('DOMContentLoaded', loadBookings);

})();
