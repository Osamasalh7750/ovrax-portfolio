/**
 * Approvals Workflow View (مسارات الاعتماد والموافقات)
 */

window.ERP = window.ERP || {};
window.ERP.views = window.ERP.views || {};

window.ERP.views.approvals = {
  render: function() {
    const approvals = window.ERP.mockData.approvals;

    return `
      <div class="page-header">
        <div class="page-header-info">
          <div class="page-breadcrumbs">
            <span>الرئيسية</span>
            <span>/</span>
            <span>الحوكمة المؤسسية</span>
            <span>/</span>
            <span style="color: var(--primary); font-weight: 600;">سير الموافقات</span>
          </div>
          <div class="page-title-row">
            <h1 class="page-title">إدارة مسارات الاعتماد والموافقات (Approval Workflows)</h1>
            <span class="badge badge-warning">${approvals.filter(a => a.status === 'pending').length} بانتظار الإجراء</span>
          </div>
          <div class="page-description">سلسلة الاعتماد متعددة المستويات: صاحب الطلب → مدير الإدارة → المدير المالي → الرئيس التنفيذي.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm" onclick="window.ERP.state.showToast('تم تحديث قائمة الطلبات اللحظية', 'info')">
            ${window.ERP.icons.get('check-circle', '', 16)}
            <span>تحديث الطلبات</span>
          </button>
        </div>
      </div>

      <!-- Approvals List -->
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        ${approvals.map(app => `
          <div class="card">
            <div class="card-header">
              <div>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                  <span class="badge badge-neutral" style="font-weight: 700;">${app.id}</span>
                  <span style="font-size: 1.1rem; font-weight: 800; color: #0f172a;">${app.title}</span>
                </div>
                <div style="font-size: 0.82rem; color: #64748b;">
                  مقدم الطلب: <strong style="color: #334155;">${app.requester}</strong> (${app.department}) • تاريخ الطلب: <strong>${app.date}</strong> • النوع: <span class="badge badge-neutral">${app.type}</span>
                </div>
              </div>
              <div>
                <span class="badge badge-${app.status === 'approved' ? 'success' : (app.status === 'rejected' ? 'danger' : 'warning')}" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;">
                  ${app.status === 'approved' ? 'معتمد نهائياً' : (app.status === 'rejected' ? 'مرفوض' : app.currentStage)}
                </span>
              </div>
            </div>
            <div class="card-body">
              <div style="margin-bottom: 1rem;">
                <div style="font-size: 0.82rem; font-weight: 700; color: #64748b; margin-bottom: 0.5rem;">مسار ومراحل الاعتماد:</div>
                <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
                  ${app.stages.map((stg, idx) => `
                    <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; ${idx < app.stageIndex ? 'color: #059669; font-weight: 700;' : (idx === app.stageIndex ? 'color: #d97706; font-weight: 700;' : 'color: #94a3b8;')}">
                      <span style="width: 22px; height: 22px; border-radius: 50%; background: ${idx < app.stageIndex ? '#ecfdf5' : (idx === app.stageIndex ? '#fffbeb' : '#f1f5f9')}; border: 1px solid ${idx < app.stageIndex ? '#a7f3d0' : (idx === app.stageIndex ? '#fde68a' : '#cbd5e1')}; display: inline-flex; align-items: center; justify-content: center; font-size: 0.75rem;">
                        ${idx < app.stageIndex ? '✓' : (idx + 1)}
                      </span>
                      <span>${stg}</span>
                      ${idx < app.stages.length - 1 ? window.ERP.icons.get('chevron-left', '', 14) : ''}
                    </div>
                  `).join('')}
                </div>
              </div>

              ${app.amount > 0 ? `
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.75rem 1rem; display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.88rem; color: #475569;">القيمة المالية المطلوب اعتماد صرفها:</span>
                  <span style="font-size: 1.2rem; font-weight: 800; color: #ef4444;">${Number(app.amount).toLocaleString()} ر.س</span>
                </div>
              ` : ''}
            </div>
            
            ${app.status === 'pending' ? `
              <div class="card-footer" style="display: flex; justify-content: flex-end; gap: 0.75rem;">
                <button class="btn btn-danger-outline btn-sm" onclick="window.ERP.state.rejectRequest('${app.id}')">
                  ${window.ERP.icons.get('x', '', 14)}
                  <span>رفض الطلب</span>
                </button>
                <button class="btn btn-success btn-sm" onclick="window.ERP.state.approveRequest('${app.id}')">
                  ${window.ERP.icons.get('check', '', 14)}
                  <span>اعتماد وموافقة</span>
                </button>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }
};
