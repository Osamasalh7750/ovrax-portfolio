/**
 * Sales & Catalog View (المبيعات، المنتجات وعروض الأسعار)
 */

window.ERP = window.ERP || {};
window.ERP.views = window.ERP.views || {};

window.ERP.views.sales = {
  render: function() {
    const products = window.ERP.mockData.products;
    const quotes = window.ERP.mockData.quotes;

    return `
      <div class="page-header">
        <div class="page-header-info">
          <div class="page-breadcrumbs">
            <span>الرئيسية</span>
            <span>/</span>
            <span>المبيعات وتطوير الأعمال</span>
            <span>/</span>
            <span style="color: var(--primary); font-weight: 600;">الكتالوج والعروض</span>
          </div>
          <div class="page-title-row">
            <h1 class="page-title">إدارة المبيعات، المنتجات وعروض الأسعار</h1>
            <span class="badge badge-primary">عروض أسعار معتمدة</span>
          </div>
          <div class="page-description">كتالوج المنتجات والخدمات السحابية والهندسية، إنشاء عروض الأسعار، وأوامر البيع.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm" onclick="window.ERP.state.setView('crm')">
            ${window.ERP.icons.get('users', '', 16)}
            <span>سجل العملاء CRM</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.ERP.state.showToast('تم فتح نموذج إنشاء عرض سعر جديد', 'info')">
            ${window.ERP.icons.get('plus', '', 16)}
            <span>إنشاء عرض سعر جديد</span>
          </button>
        </div>
      </div>

      <!-- Quotations Table Section -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div class="card-title">
            ${window.ERP.icons.get('file-text', '', 18)}
            <span>عروض الأسعار الحديثة (Quotations)</span>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>رقم العرض</th>
                <th>العميل المستهدف</th>
                <th>تاريخ العرض</th>
                <th>صالح حتى</th>
                <th>المبلغ قبل الضريبة</th>
                <th>الضريبة 15%</th>
                <th>الإجمالي النهائي</th>
                <th>الحالة</th>
                <th>مسؤول المبيعات</th>
                <th>الإجراء</th>
              </tr>
            </thead>
            <tbody>
              ${quotes.map(q => `
                <tr>
                  <td><strong style="color: var(--primary);">${q.id}</strong></td>
                  <td><strong>${q.client}</strong></td>
                  <td>${q.date}</td>
                  <td>${q.validUntil}</td>
                  <td>${Number(q.subtotal).toLocaleString()} ر.س</td>
                  <td>${Number(q.vat).toLocaleString()} ر.س</td>
                  <td><strong style="color: #059669;">${Number(q.total).toLocaleString()} ر.س</strong></td>
                  <td>
                    <span class="badge badge-${q.status === 'مقبول' ? 'success' : (q.status === 'قيد الانتظار' ? 'warning' : 'neutral')}">
                      ${q.status}
                    </span>
                  </td>
                  <td><span class="badge badge-neutral">${q.createdBy}</span></td>
                  <td>
                    <button class="btn btn-outline btn-sm" onclick="window.ERP.state.openModal('new-invoice'); window.ERP.state.showToast('تحويل عرض السعر إلى فاتورة معتمدة', 'success')">
                      تحويل لفاتورة
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Products & Services Catalog -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            ${window.ERP.icons.get('shopping-bag', '', 18)}
            <span>دليل المنتجات والخدمات (Products & Services Catalog)</span>
          </div>
          <button class="btn btn-outline btn-sm" onclick="window.ERP.state.showToast('تم فتح نافذة إضافة منتج جديد', 'info')">
            ${window.ERP.icons.get('plus', '', 14)}
            <span>إضافة صنف للكتالوج</span>
          </button>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>كود الصنف (SKU)</th>
                <th>اسم المنتج / الخدمة</th>
                <th>النوع والتصنيف</th>
                <th>سعر البيع للعميل</th>
                <th>التكلفة التقديرية</th>
                <th>هامش الربح</th>
                <th>الكمية المتاحة</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              ${products.map(p => {
                const margin = (((p.price - p.cost) / p.price) * 100).toFixed(1);
                return `
                  <tr>
                    <td><span class="badge badge-neutral" style="font-weight: 700;">${p.code}</span></td>
                    <td><strong style="color: #0f172a;">${p.name}</strong></td>
                    <td>${p.type} • <span style="font-size: 0.75rem; color: #64748b;">${p.category}</span></td>
                    <td><strong style="color: #2563eb;">${Number(p.price).toLocaleString()} ر.س</strong></td>
                    <td>${Number(p.cost).toLocaleString()} ر.س</td>
                    <td><span class="badge badge-success">+${margin}%</span></td>
                    <td><strong>${p.stock}</strong></td>
                    <td><span class="badge badge-success">متاح للبيع</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
};
