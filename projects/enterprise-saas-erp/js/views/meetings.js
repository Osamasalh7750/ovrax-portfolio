/**
 * Meetings & Minutes Management View (الاجتماعات والمحاضر)
 */

window.ERP = window.ERP || {};
window.ERP.views = window.ERP.views || {};

window.ERP.views.meetings = {
  render: function() {
    const meetings = window.ERP.mockData.meetings;

    return `
      <div class="page-header">
        <div class="page-header-info">
          <div class="page-breadcrumbs">
            <span>الرئيسية</span>
            <span>/</span>
            <span>التنسيق الداخلي</span>
            <span>/</span>
            <span style="color: var(--primary); font-weight: 600;">جدول الاجتماعات</span>
          </div>
          <div class="page-title-row">
            <h1 class="page-title">إدارة الاجتماعات، المحاضر والقرارات</h1>
            <span class="badge badge-primary">ربط القرارات بالمهام تلقائياً</span>
          </div>
          <div class="page-description">جدولة الاجتماعات التنفيذية، توثيق المحاضر، وإسناد المهام الناتجة تلقائياً إلى المسؤولين.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm" onclick="window.ERP.state.setView('tasks')">
            ${window.ERP.icons.get('check-square', '', 16)}
            <span>المهام الناتجة عن الاجتماعات</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.ERP.state.showToast('تم فتح نافذة جدولة اجتماع تنفيذي جديد', 'info')">
            ${window.ERP.icons.get('plus', '', 16)}
            <span>جدولة اجتماع جديد</span>
          </button>
        </div>
      </div>

      <!-- Meetings List -->
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        ${meetings.map(m => `
          <div class="card">
            <div class="card-header">
              <div>
                <div style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.25rem;">${m.title}</div>
                <div style="font-size: 0.82rem; color: #64748b;">
                  رئيس الاجتماع: <strong style="color: #334155;">${m.chair}</strong> • الموعد: <strong>${m.date} (${m.time})</strong>
                </div>
              </div>
              <span class="badge badge-primary">مجدول ومؤكد</span>
            </div>
            <div class="card-body">
              <div style="display: grid; grid-template-columns: 2fr 1.2fr; gap: 1.5rem;">
                <div>
                  <div style="font-weight: 700; font-size: 0.88rem; margin-bottom: 0.4rem; color: #0f172a;">جدول الأعمال والقرارات المطروحة:</div>
                  <p style="font-size: 0.86rem; color: #475569; line-height: 1.5; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.85rem;">
                    ${m.agenda}
                  </p>
                  <div style="margin-top: 0.75rem; font-size: 0.82rem; color: #64748b;">
                    المكان: <strong style="color: #334155;">${m.location}</strong>
                  </div>
                </div>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem;">
                  <div style="font-weight: 700; font-size: 0.85rem; margin-bottom: 0.5rem; color: #0f172a;">قائمة الحضور المدعوين:</div>
                  <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                    ${m.attendees.map(att => `
                      <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem;">
                        <span class="avatar avatar-sm" style="width: 24px; height: 24px; font-size: 0.65rem;">${att.charAt(att.indexOf('.') + 2 || 0)}</span>
                        <span>${att}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer" style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 0.8rem; color: #64748b;">ينتج عن الاجتماع مهام يتم إنشاؤها تلقائياً على لوحة Kanban</span>
              <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-outline btn-sm" onclick="window.ERP.state.showToast('فتح محضر الاجتماع وتدوين الملاحظات', 'info')">تدوين المحضر</button>
                <button class="btn btn-primary btn-sm" onclick="window.ERP.state.showToast('الانضمام للاجتماع الافتراضي عبر Teams...', 'success')">الانضمام للغرفة</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
};
