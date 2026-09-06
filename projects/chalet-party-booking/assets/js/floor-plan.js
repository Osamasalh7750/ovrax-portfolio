/* ==========================================================================
   FLOOR-PLAN.JS - مخطط الجلوس وتوزيع طاولات المعازيم التفاعلي
   ========================================================================== */

(function () {
  'use strict';

  const defaultTables = [
    { id: 1, name: 'طاولة VIP رقم 1', type: 'vip', seats: 10, assigned: 'عائلة العريس الكريمة', x: 25, y: 35 },
    { id: 2, name: 'طاولة VIP رقم 2', type: 'vip', seats: 10, assigned: 'عائلة العروس الكريمة', x: 75, y: 35 },
    { id: 3, name: 'طاولة ضيافة 3', type: 'standard', seats: 10, assigned: 'كبار الضيوف والوجهاء', x: 20, y: 60 },
    { id: 4, name: 'طاولة ضيافة 4', type: 'standard', seats: 10, assigned: 'صديقات وأقارب العروس', x: 50, y: 55 },
    { id: 5, name: 'طاولة ضيافة 5', type: 'standard', seats: 10, assigned: 'أصدقاء وزملاء العمل', x: 80, y: 60 },
    { id: 6, name: 'طاولة ضيافة 6', type: 'standard', seats: 10, assigned: 'الضيوف الكرام', x: 25, y: 85 },
    { id: 7, name: 'طاولة ضيافة 7', type: 'standard', seats: 10, assigned: 'الضيوف الكرام', x: 50, y: 80 },
    { id: 8, name: 'طاولة ضيافة 8', type: 'standard', seats: 10, assigned: 'الضيوف الكرام', x: 75, y: 85 }
  ];

  window.openSeatingPlanModal = function () {
    const modal = document.getElementById('floor-plan-modal');
    if (!modal) return;

    renderFloorPlanGrid();
    modal.classList.add('active');
  };

  window.closeSeatingPlanModal = function () {
    const modal = document.getElementById('floor-plan-modal');
    if (modal) modal.classList.remove('active');
  };

  function renderFloorPlanGrid() {
    const container = document.getElementById('floor-plan-schematic');
    if (!container) return;

    container.innerHTML = `
      <!-- منطقة مسرح الكوشة والممشى -->
      <div style="position:absolute; top:15px; left:50%; transform:translateX(-50%); width:220px; background:var(--champagne-gradient); color:#fff; text-align:center; padding:10px 16px; border-radius:12px; font-weight:800; box-shadow:var(--shadow-gold);">
        <i class="fa-solid fa-crown"></i> مسرح وكوشة العروس الملكية VIP
      </div>

      <div style="position:absolute; top:65px; left:50%; transform:translateX(-50%); width:32px; height:180px; background:rgba(201,154,76,0.18); border:1px dashed var(--champagne-primary); border-radius:6px; display:flex; align-items:center; justify-content:center;">
        <span style="writing-mode:vertical-rl; font-size:0.75rem; font-weight:700; color:var(--champagne-primary); letter-spacing:2px;">ممشى الزفة الملكي</span>
      </div>

      <!-- منطقة البوفيه المفتوح -->
      <div style="position:absolute; bottom:15px; right:20px; background:var(--bg-surface-soft); border:1.5px solid var(--border-gold); padding:8px 16px; border-radius:10px; font-size:0.82rem; font-weight:700; color:var(--text-dark);">
        <i class="fa-solid fa-utensils" style="color:var(--champagne-primary);"></i> منطقة البوفيه والضيافة
      </div>

      <!-- منطقة الصوت والدي جي -->
      <div style="position:absolute; bottom:15px; left:20px; background:var(--bg-surface-soft); border:1.5px solid var(--border-gold); padding:8px 16px; border-radius:10px; font-size:0.82rem; font-weight:700; color:var(--text-dark);">
        <i class="fa-solid fa-music" style="color:var(--champagne-primary);"></i> كابينة الدي جي والصوتيات
      </div>
    `;

    // رسم الطاولات
    defaultTables.forEach(t => {
      const tableEl = document.createElement('div');
      tableEl.className = 'floor-table-node';
      tableEl.style.position = 'absolute';
      tableEl.style.left = `${t.x}%`;
      tableEl.style.top = `${t.y}%`;
      tableEl.style.transform = 'translate(-50%, -50%)';
      tableEl.style.width = '70px';
      tableEl.style.height = '70px';
      tableEl.style.borderRadius = '50%';
      tableEl.style.background = t.type === 'vip' ? 'var(--champagne-soft)' : '#ffffff';
      tableEl.style.border = t.type === 'vip' ? '2.5px solid var(--champagne-primary)' : '1.5px solid var(--border-light)';
      tableEl.style.boxShadow = 'var(--shadow-card)';
      tableEl.style.display = 'flex';
      tableEl.style.flexDirection = 'column';
      tableEl.style.alignItems = 'center';
      tableEl.style.justifyContent = 'center';
      tableEl.style.cursor = 'pointer';
      tableEl.style.transition = 'all 0.2s ease';

      tableEl.innerHTML = `
        <strong style="font-size:0.75rem; color:var(--text-dark);">${t.id}</strong>
        <small style="font-size:0.65rem; color:var(--text-muted);">${t.seats} مقاعد</small>
      `;

      tableEl.addEventListener('click', () => {
        document.querySelectorAll('.floor-table-node').forEach(n => n.style.borderColor = '');
        tableEl.style.borderColor = '#10b981';
        showTableDetails(t);
      });

      container.appendChild(tableEl);
    });
  }

  function showTableDetails(t) {
    const box = document.getElementById('floor-table-info-box');
    if (!box) return;

    box.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <h4 style="font-size:1.05rem; font-weight:800; color:var(--text-dark);">${t.name} (${t.type === 'vip' ? 'طاولة VIP كبار الشخصيات' : 'طاولة ضيافة'})</h4>
        <span class="badge-pastel ${t.type === 'vip' ? 'badge-champagne' : 'badge-sage'}">${t.seats} مقاعد</span>
      </div>
      <div style="font-size:0.88rem; color:var(--text-muted); margin-bottom:12px;">
        المجموعة المخصصة: <strong style="color:var(--text-dark);">${t.assigned}</strong>
      </div>
      <div style="display:flex; gap:8px;">
        <input type="text" id="edit-table-assigned" value="${t.assigned}" placeholder="اكتب اسم العائلة أو المجموعة..." style="flex:1; padding:8px 12px; border-radius:var(--radius-md); border:1px solid var(--border-light); font-size:0.85rem;">
        <button type="button" class="btn btn-champagne" style="padding:8px 16px; font-size:0.85rem;" onclick="saveTableAssignment(${t.id})">
          حفظ التخصيص
        </button>
      </div>
    `;
    box.style.display = 'block';
  }

  window.saveTableAssignment = function (tableId) {
    const input = document.getElementById('edit-table-assigned');
    const table = defaultTables.find(t => t.id === tableId);
    if (input && table) {
      table.assigned = input.value.trim() || 'الضيوف الكرام';
      if (window.showAppNotification) {
        window.showAppNotification(`تم تحديث تخصيص طاولة رقم ${tableId} بنجاح!`, 'success');
      }
      showTableDetails(table);
    }
  };

})();
