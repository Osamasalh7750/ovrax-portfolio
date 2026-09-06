/**
 * Purchases & Procurement Management View (المشتريات والتوريد)
 */

window.ERP = window.ERP || {};
window.ERP.views = window.ERP.views || {};

window.ERP.views.purchases = {
  render: function() {
    const purchases = window.ERP.mockData.purchases;

    return `
      <div class="page-header">
        <div class="page-header-info">
          <div class="page-breadcrumbs">
            <span>الرئيسية</span>
            <span>/</span>
            <span>سلاسل الإمداد</span>
            <span>/</span>
            <span style="color: var(--primary); font-weight: 600;">أوامر الشراء والتوريد</span>
          </div>
          <div class="page-title-row">
            <h1 class="page-title">إدارة المشتريات وأوامر الشراء (Procurement & PO)</h1>
            <span class="badge badge-primary">سلسلة توريد مؤتمتة</span>
          </div>
          <div class="page-description">دورة الشراء المؤسسية: طلب احتياج → اعتماد مالي → أمر شراء PO → استلام مستودعي → صرف الفاتورة.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm" onclick="window.ERP.state.setView('suppliers')">
            ${window.ERP.icons.get('layers', '', 16)}
            <span>دليل الموردين المعتمدين</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.ERP.state.showToast('تم فتح نموذج طلب شراء جديد (Purchase Requisition)', 'info')">
            ${window.ERP.icons.get('plus', '', 16)}
            <span>إنشاء طلب شراء PR</span>
          </button>
        </div>
      </div>

      <!-- Procurement Workflow Steps Strip -->
      <div class="card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
        <div style="font-size: 0.88rem; font-weight: 700; color: #0f172a; margin-bottom: 0.75rem;">
          مسار اعتماد دورة المشتريات (Procurement Approval Chain)
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <span class="badge badge-success">1. طلب شراء PR</span>
            ${window.ERP.icons.get('chevron-left', '', 14)}
          </div>
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <span class="badge badge-primary">2. موافقة المدير المالي</span>
            ${window.ERP.icons.get('chevron-left', '', 14)}
          </div>
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <span class="badge badge-primary">3. إصدار أمر شراء PO</span>
            ${window.ERP.icons.get('chevron-left', '', 14)}
          </div>
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <span class="badge badge-warning">4. محضر فحص واستلام</span>
            ${window.ERP.icons.get('chevron-left', '', 14)}
          </div>
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <span class="badge badge-neutral">5. مطابقة الفاتورة وسند الصرف</span>
          </div>
        </div>
      </div>

      <!-- Purchase Orders Table -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            ${window.ERP.icons.get('shopping-cart', '', 18)}
            <span>أوامر الشراء المعتمدة (Purchase Orders)</span>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>رقم أمر الشراء</th>
                <th>المورد المعتمد</th>
                <th>طلب الاحتياج (PR)</th>
                <th>التاريخ</th>
                <th>المبلغ الصافي</th>
                <th>الضريبة 15%</th>
                <th>الإجمالي</th>
                <th>الفرع المستلم</th>
                <th>الحالة</th>
                <th>الإجراء</th>
              </tr>
            </thead>
            <tbody>
              ${purchases.map(po => `
                <tr>
                  <td><strong style="color: var(--primary);">${po.id}</strong></td>
                  <td><strong>${po.supplier}</strong></td>
                  <td><span class="badge badge-neutral">${po.prNumber}</span></td>
                  <td>${po.date}</td>
                  <td>${Number(po.amount).toLocaleString()} ر.س</td>
                  <td>${Number(po.vat).toLocaleString()} ر.س</td>
                  <td><strong style="color: #ef4444;">${Number(po.total).toLocaleString()} ر.س</strong></td>
                  <td>${po.branch}</td>
                  <td>
                    <span class="badge badge-${po.status === 'مستلم ومعتمد' ? 'success' : (po.status === 'بانتظار الشحن' ? 'info' : 'warning')}">
                      ${po.status}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-outline btn-sm" onclick="window.ERP.state.showToast('معاينة مستند أمر الشراء ${po.id}', 'info')">
                      ${window.ERP.icons.get('eye', '', 14)}
                      <span>التفاصيل</span>
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
