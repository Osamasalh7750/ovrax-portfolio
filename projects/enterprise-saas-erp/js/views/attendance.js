/**
 * Attendance & Leaves Management View (الحضور والإجازات)
 */

window.ERP = window.ERP || {};
window.ERP.views = window.ERP.views || {};

window.ERP.views.attendance = {
  render: function() {
    const summary = window.ERP.mockData.attendanceSummary;
    const leaves = window.ERP.mockData.leaves;

    return `
      <div class="page-header">
        <div class="page-header-info">
          <div class="page-breadcrumbs">
            <span>الرئيسية</span>
            <span>/</span>
            <span>الموارد البشرية</span>
            <span>/</span>
            <span style="color: var(--primary); font-weight: 600;">سجل الحضور والانضباط</span>
          </div>
          <div class="page-title-row">
            <h1 class="page-title">إدارة الحضور، الانصراف وطلبات الإجازات</h1>
            <span class="badge badge-success">نسبة حضور اليوم 96.2%</span>
          </div>
          <div class="page-description">تتبع البصمة الذكية الحية، التأخيرات، أرصدة الإجازات السنوية، واعتماد طلبات الغياب.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm" onclick="window.ERP.state.showToast('تم تسجيل بصمة الحضور الافتراضية بنجاح: 08:02 ص', 'success')">
            ${window.ERP.icons.get('check-circle', '', 16)}
            <span>تسجيل حضور تجريبي</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.ERP.state.showToast('تم فتح نموذج تقديم طلب إجازة جديد', 'info')">
            ${window.ERP.icons.get('plus', '', 16)}
            <span>تقديم طلب إجازة</span>
          </button>
        </div>
      </div>

      <!-- Attendance KPIs Strip -->
      <div class="kpi-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">إجمالي الكوادر المستهدفة اليوم</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #0f172a; margin: 0.25rem 0;">${summary.todayTotalStaff} <span style="font-size: 0.8rem; color: #64748b;">موظفاً</span></div>
          <div style="font-size: 0.75rem; color: #64748b;">عبر كافة الفروع الثلاثة</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">الحاضرون في الميدان والمكاتب</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #10b981; margin: 0.25rem 0;">${summary.presentCount} <span style="font-size: 0.8rem; color: #64748b;">موظفاً</span></div>
          <div style="font-size: 0.75rem; color: #10b981; font-weight: 700;">نسبة التزام مرتفعة</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">حالات التأخير الصباحي</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #f59e0b; margin: 0.25rem 0;">${summary.lateCount} <span style="font-size: 0.8rem; color: #64748b;">موظفين</span></div>
          <div style="font-size: 0.75rem; color: #64748b;">تم تسجيل إشعارات تلقائية</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">في إجازات رسمية معتمدة</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #2563eb; margin: 0.25rem 0;">${summary.onLeaveCount} <span style="font-size: 0.8rem; color: #64748b;">موظفين</span></div>
          <div style="font-size: 0.75rem; color: #64748b;">إجازات مجدولة مسبقاً</div>
        </div>
      </div>

      <!-- Pending Leave Requests Table -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            ${window.ERP.icons.get('clock', '', 18)}
            <span>طلبات الإجازات بانتظار الموافقة والاعتماد</span>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>كود الطلب</th>
                <th>الموظف</th>
                <th>نوع الإجازة المطلوبة</th>
                <th>تاريخ البداية</th>
                <th>تاريخ النهاية</th>
                <th>عدد الأيام</th>
                <th>المشرف المعتمد</th>
                <th>الحالة</th>
                <th>الإجراء</th>
              </tr>
            </thead>
            <tbody>
              ${leaves.map(lev => `
                <tr>
                  <td><span class="badge badge-neutral" style="font-weight: 700;">${lev.id}</span></td>
                  <td><strong style="color: #0f172a;">${lev.employee}</strong></td>
                  <td><span class="badge badge-neutral">${lev.type}</span></td>
                  <td>${lev.startDate}</td>
                  <td>${lev.endDate}</td>
                  <td><strong>${lev.days} أيام</strong></td>
                  <td>${lev.approvedBy}</td>
                  <td>
                    <span class="badge badge-${lev.status === 'approved' ? 'success' : 'warning'}">
                      ${lev.status === 'approved' ? 'معتمد' : 'قيد المراجعة'}
                    </span>
                  </td>
                  <td>
                    ${lev.status === 'pending' ? `
                      <div style="display: flex; gap: 0.35rem;">
                        <button class="btn btn-success btn-sm" onclick="window.ERP.state.showToast('تمت الموافقة على إجازة ${lev.employee}', 'success'); this.closest('tr').querySelector('.badge-warning').className = 'badge badge-success'; this.closest('tr').querySelector('.badge-success').innerText = 'معتمد'; this.parentElement.innerHTML = '<span style=\"color:#10b981; font-weight:700;\">تم الاعتماد</span>';">
                          موافقة
                        </button>
                        <button class="btn btn-danger-outline btn-sm" onclick="window.ERP.state.showToast('تم رفض الطلب', 'danger')">
                          رفض
                        </button>
                      </div>
                    ` : `
                      <span style="color: #10b981; font-size: 0.8rem; font-weight: 700;">تمت الموافقة مسبقاً</span>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
};
