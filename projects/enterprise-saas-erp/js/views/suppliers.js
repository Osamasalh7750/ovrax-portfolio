/**
 * Suppliers & Vendors Directory View (الموردون وسلاسل الإمداد)
 */

window.ERP = window.ERP || {};
window.ERP.views = window.ERP.views || {};

window.ERP.views.suppliers = {
  render: function() {
    const suppliers = window.ERP.mockData.suppliers;

    return `
      <div class="page-header">
        <div class="page-header-info">
          <div class="page-breadcrumbs">
            <span>الرئيسية</span>
            <span>/</span>
            <span>المشتريات وسلاسل الإمداد</span>
            <span>/</span>
            <span style="color: var(--primary); font-weight: 600;">سجل الموردين المعتمدين</span>
          </div>
          <div class="page-title-row">
            <h1 class="page-title">دليل الموردين وشركاء التوريد (Approved Vendors)</h1>
            <span class="badge badge-success">موردون معتمدون رسمياً</span>
          </div>
          <div class="page-description">إدارة كشوف حسابات الموردين، تصنيفات التوريد، التقييم السنوي، وشروط السداد المعتمدة.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm" onclick="window.ERP.state.setView('purchases')">
            ${window.ERP.icons.get('shopping-cart', '', 16)}
            <span>أوامر الشراء الحالية</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.ERP.state.showToast('تم فتح نافذة تسجيل وتأهيل مورد جديد', 'info')">
            ${window.ERP.icons.get('plus', '', 16)}
            <span>تأهيل مورد جديد</span>
          </button>
        </div>
      </div>

      <!-- Suppliers Table -->
      <div class="card">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>اسم المورد / الشركة</th>
                <th>تصنيف التوريد</th>
                <th>مسؤول التواصل</th>
                <th>رقم السجل التجاري (CR)</th>
                <th>الرصيد الدائن المستحق</th>
                <th>شروط السداد</th>
                <th>تقييم الجودة والالتزام</th>
                <th>الحالة</th>
                <th>الإجراء</th>
              </tr>
            </thead>
            <tbody>
              ${suppliers.map(sup => `
                <tr>
                  <td>
                    <strong style="color: #0f172a;">${sup.name}</strong>
                    <div style="font-size: 0.75rem; color: #64748b;" dir="ltr">${sup.email}</div>
                  </td>
                  <td><span class="badge badge-neutral">${sup.category}</span></td>
                  <td>
                    <div>${sup.contact}</div>
                    <div style="font-size: 0.75rem; color: #64748b;" dir="ltr">${sup.phone}</div>
                  </td>
                  <td><span class="badge badge-neutral">${sup.cr}</span></td>
                  <td><strong style="color: #ef4444;">${Number(sup.balance).toLocaleString()} ر.س</strong></td>
                  <td><span style="font-size: 0.8rem; color: #475569;">${sup.terms}</span></td>
                  <td>
                    <div style="display: flex; gap: 2px; color: #f59e0b;">
                      ${'★'.repeat(sup.rating)}${'☆'.repeat(5 - sup.rating)}
                    </div>
                  </td>
                  <td><span class="badge badge-success">مورد معتمد</span></td>
                  <td>
                    <button class="btn btn-outline btn-sm" onclick="window.ERP.state.showToast('عرض كشف حساب المورد ${sup.name}', 'info')">
                      كشف الحساب
                    </button>
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
