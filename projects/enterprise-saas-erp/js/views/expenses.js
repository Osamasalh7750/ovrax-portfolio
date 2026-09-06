/**
 * Expenses & Budgets Management View (المصروفات والميزانيات)
 */

window.ERP = window.ERP || {};
window.ERP.views = window.ERP.views || {};

window.ERP.views.expenses = {
  render: function() {
    const expenses = window.ERP.mockData.expenses;
    const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);

    return `
      <div class="page-header">
        <div class="page-header-info">
          <div class="page-breadcrumbs">
            <span>الرئيسية</span>
            <span>/</span>
            <span>الإدارة المالية والمحاسبة</span>
            <span>/</span>
            <span style="color: var(--primary); font-weight: 600;">سندات الصرف والمصروفات</span>
          </div>
          <div class="page-title-row">
            <h1 class="page-title">إدارة المصروفات التشغيلية والميزانيات</h1>
            <span class="badge badge-primary">تتبع مباشر للتدفقات الخارجة</span>
          </div>
          <div class="page-description">تسجيل سندات الصرف، مخصصات الرواتب، بنود الإيجار، وتكاليف البنية التحتية والتسويق.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm" onclick="window.ERP.state.setView('invoices')">
            ${window.ERP.icons.get('credit-card', '', 16)}
            <span>الفواتير والتحصيل</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.ERP.state.showToast('تم فتح سند صرف جديد', 'info')">
            ${window.ERP.icons.get('plus', '', 16)}
            <span>تسجيل سند صرف جديد</span>
          </button>
        </div>
      </div>

      <!-- Expense Categories Strip -->
      <div class="kpi-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">إجمالي الصرف المسجل هذا الشهر</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #ef4444; margin: 0.25rem 0;">${Number(totalExpenses).toLocaleString()} <span style="font-size: 0.8rem; color: #64748b;">ر.س</span></div>
          <div style="font-size: 0.75rem; color: #10b981; font-weight: 700;">ضمن الميزانية الشهرية المعتمدة</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">بند مسير الرواتب (أغسطس)</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #2563eb; margin: 0.25rem 0;">385,000 <span style="font-size: 0.8rem; color: #64748b;">ر.س</span></div>
          <div style="font-size: 0.75rem; color: #64748b;">72% من إجمالي الإنفاق</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">مصروفات التقنية والخوادم السحابية</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #0ea5e9; margin: 0.25rem 0;">48,500 <span style="font-size: 0.8rem; color: #64748b;">ر.س</span></div>
          <div style="font-size: 0.75rem; color: #64748b;">اشتراكات AWS, Azure & SaaS</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">أصول ومعدات جديدة للمشاريع</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #8b5cf6; margin: 0.25rem 0;">46,000 <span style="font-size: 0.8rem; color: #64748b;">ر.س</span></div>
          <div style="font-size: 0.75rem; color: #64748b;">حواسيب هندسية وأجهزة فحص</div>
        </div>
      </div>

      <!-- Expenses Table -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            ${window.ERP.icons.get('dollar-sign', '', 18)}
            <span>سجل سندات الصرف والمصروفات المعتمدة</span>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>رقم السند</th>
                <th>بيان المصروف</th>
                <th>التصنيف المالي</th>
                <th>المبلغ</th>
                <th>تاريخ الصرف</th>
                <th>طريقة الدفع</th>
                <th>الفرع المحمّل عليه</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              ${expenses.map(exp => `
                <tr>
                  <td><strong style="color: var(--primary);">${exp.id}</strong></td>
                  <td><strong style="color: #0f172a;">${exp.title}</strong></td>
                  <td><span class="badge badge-neutral">${exp.category}</span></td>
                  <td><strong style="color: #ef4444; font-size: 0.95rem;">${Number(exp.amount).toLocaleString()} ر.س</strong></td>
                  <td>${exp.date}</td>
                  <td>${exp.paymentMethod}</td>
                  <td>${exp.branch}</td>
                  <td><span class="badge badge-success">${exp.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
};
