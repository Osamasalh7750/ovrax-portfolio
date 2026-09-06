/**
 * Inventory & Fixed Assets Management View (المخزون والأصول الثابتة)
 */

window.ERP = window.ERP || {};
window.ERP.views = window.ERP.views || {};

window.ERP.views.inventory = {
  render: function() {
    const inventory = window.ERP.mockData.inventory;
    const assets = window.ERP.mockData.assets;
    const totalAssetsValue = assets.reduce((s, a) => s + a.currentValue, 0);

    return `
      <div class="page-header">
        <div class="page-header-info">
          <div class="page-breadcrumbs">
            <span>الرئيسية</span>
            <span>/</span>
            <span>الأصول والمستودعات</span>
            <span>/</span>
            <span style="color: var(--primary); font-weight: 600;">المخزون والأصول المؤسسية</span>
          </div>
          <div class="page-title-row">
            <h1 class="page-title">إدارة المخزون، المستودعات والأصول الثابتة</h1>
            <span class="badge badge-primary">جرد إلكتروني دائم</span>
          </div>
          <div class="page-description">تتبع أرصدة المستودعات، تنبيهات حد الطلب، وسجل الأصول الثابتة ومواقعها ومسؤولي العهد.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm" onclick="window.ERP.state.showToast('تمت مطابقة الجرد المخزني مع القيود المحاسبية', 'success')">
            ${window.ERP.icons.get('check-circle', '', 16)}
            <span>تسوية الجرد</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.ERP.state.showToast('تم فتح نافذة تسجيل أصل أو صنف مستودعي جديد', 'info')">
            ${window.ERP.icons.get('plus', '', 16)}
            <span>إضافة أصل / صنف</span>
          </button>
        </div>
      </div>

      <!-- Inventory Summary KPIs -->
      <div class="kpi-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">القيمة الدفترية الحالية للأصول الثابتة</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #2563eb; margin: 0.25rem 0;">${Number(totalAssetsValue).toLocaleString()} <span style="font-size: 0.8rem; color: #64748b;">ر.س</span></div>
          <div style="font-size: 0.75rem; color: #64748b;">بعد احتساب مخصص الإهلاك المحاسبي</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">عدد المستودعات النشطة</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #0f172a; margin: 0.25rem 0;">2 <span style="font-size: 0.8rem; color: #64748b;">مستودعات رئيسية</span></div>
          <div style="font-size: 0.75rem; color: #10b981; font-weight: 700;">مستودع الرياض ومستودع جدة اللوجستي</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">تنبيهات انخفاض المخزون (حد الطلب)</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #f59e0b; margin: 0.25rem 0;">1 <span style="font-size: 0.8rem; color: #64748b;">صنف حرج</span></div>
          <div style="font-size: 0.75rem; color: #d97706; font-weight: 700;">كابلات ألياف ضوئية (أقل من حد الطلب)</div>
        </div>
      </div>

      <!-- Warehouse Inventory Table -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div class="card-title">
            ${window.ERP.icons.get('package', '', 18)}
            <span>الأصناف والمخزون في المستودعات (Inventory Stock)</span>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>كود الصنف</th>
                <th>اسم الصنف والمواصفة</th>
                <th>التصنيف</th>
                <th>المستودع والموقع</th>
                <th>الكمية المتوفرة</th>
                <th>حد الطلب الأدنى</th>
                <th>سعر التكلفة للوحدة</th>
                <th>حالة الرصيد</th>
              </tr>
            </thead>
            <tbody>
              ${inventory.map(item => `
                <tr style="${item.qty < item.reorderLevel ? 'background-color: #fffdf5;' : ''}">
                  <td><span class="badge badge-neutral" style="font-weight: 700;">${item.code}</span></td>
                  <td><strong style="color: #0f172a;">${item.name}</strong></td>
                  <td>${item.category}</td>
                  <td>${item.warehouse}</td>
                  <td><strong style="font-size: 1rem; color: ${item.qty < item.reorderLevel ? '#ef4444' : '#0f172a'};">${item.qty}</strong></td>
                  <td><span class="badge badge-neutral">${item.reorderLevel}</span></td>
                  <td>${Number(item.unitPrice).toLocaleString()} ر.س</td>
                  <td>
                    <span class="badge badge-${item.qty < item.reorderLevel ? 'warning' : 'success'}">
                      ${item.status}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Fixed Assets Table -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            ${window.ERP.icons.get('briefcase', '', 18)}
            <span>سجل الأصول الثابتة والمعدات (Fixed Assets Registry)</span>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>كود الأصل</th>
                <th>اسم الأصل والمعدّة</th>
                <th>التصنيف</th>
                <th>تاريخ الشراء</th>
                <th>تكلفة الاقتناء الأصلية</th>
                <th>القيمة الدفترية الحالية</th>
                <th>مسؤول العهدة</th>
                <th>الموقع الحالي</th>
                <th>الحالة التشغيلية</th>
              </tr>
            </thead>
            <tbody>
              ${assets.map(ast => `
                <tr>
                  <td><span class="badge badge-neutral" style="font-weight: 700;">${ast.code}</span></td>
                  <td><strong style="color: #0f172a;">${ast.name}</strong></td>
                  <td><span class="badge badge-neutral">${ast.category}</span></td>
                  <td>${ast.purchaseDate}</td>
                  <td>${Number(ast.cost).toLocaleString()} ر.س</td>
                  <td><strong style="color: #2563eb;">${Number(ast.currentValue).toLocaleString()} ر.س</strong></td>
                  <td><strong>${ast.custodian}</strong></td>
                  <td>${ast.location}</td>
                  <td><span class="badge badge-success">${ast.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
};
