/**
 * Contracts Management View (إدارة العقود والاتفاقيات)
 */

window.ERP = window.ERP || {};
window.ERP.views = window.ERP.views || {};

window.ERP.views.contracts = {
  render: function() {
    const contracts = window.ERP.mockData.contracts;
    const totalValue = contracts.reduce((s, c) => s + c.value, 0);
    const totalRemaining = contracts.reduce((s, c) => s + c.remaining, 0);

    return `
      <div class="page-header">
        <div class="page-header-info">
          <div class="page-breadcrumbs">
            <span>الرئيسية</span>
            <span>/</span>
            <span>الشؤون القانونية والعقود</span>
            <span>/</span>
            <span style="color: var(--primary); font-weight: 600;">سجل الاتفاقيات</span>
          </div>
          <div class="page-title-row">
            <h1 class="page-title">إدارة العقود والالتزامات القانونية</h1>
            <span class="badge badge-warning">تنبيهات انتهاء العقود مفعلة</span>
          </div>
          <div class="page-description">متابعة صلاحية عقود العملاء والموردين، جدولة الدفعات المستحقة، وتنبيهات التجديد المبكر.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm" onclick="window.ERP.state.setView('invoices')">
            ${window.ERP.icons.get('credit-card', '', 16)}
            <span>الفواتير المرتبطة بالعقود</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.ERP.state.showToast('تم فتح نموذج صياغة عقد جديد', 'info')">
            ${window.ERP.icons.get('plus', '', 16)}
            <span>تسجيل عقد جديد</span>
          </button>
        </div>
      </div>

      <!-- Critical Expiry Alert Banner -->
      <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 10px; padding: 1.25rem; margin-bottom: 1.5rem; display: flex; align-items: flex-start; gap: 1rem;">
        <div style="color: #d97706; margin-top: 2px;">
          ${window.ERP.icons.get('alert-triangle', '', 24)}
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 800; color: #92400e; font-size: 1rem; margin-bottom: 0.25rem;">
            تنبيه حرج: توجد عقود تشغيلية تقترب من موعد الانتهاء خلال أقل من 30 يوماً!
          </div>
          <p style="font-size: 0.86rem; color: #b45309; line-height: 1.45; margin-bottom: 0.75rem;">
            عقد الإشراف الكهروميكانيكي لبرج السحاب (ينتهي خلال 25 يوماً) وعقد إيجار مقر برج النخبة بالرياض (ينتهي خلال 28 يوماً). يرجى مراجعة ملحقات التجديد أو بدء التفاوض المالي فوراً لتجنب انقطاع الخدمات.
          </p>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-warning btn-sm" style="background: #d97706; color: white;" onclick="window.ERP.state.showToast('تم إرسال إشعار للمستشار القانوني لبدء إجراءات التجديد', 'success')">
              بدء إجراءات تجديد العقود
            </button>
          </div>
        </div>
      </div>

      <!-- Summary KPI Row -->
      <div class="kpi-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">إجمالي القيمة المالية للعقود السارية</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #2563eb; margin: 0.25rem 0;">${Number(totalValue).toLocaleString()} <span style="font-size: 0.8rem; color: #64748b;">ر.س</span></div>
          <div style="font-size: 0.75rem; color: #10b981; font-weight: 700;">4 عقود استراتيجية سارية</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">الدفعات المتبقية قيد التحصيل / السداد</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #0f172a; margin: 0.25rem 0;">${Number(totalRemaining).toLocaleString()} <span style="font-size: 0.8rem; color: #64748b;">ر.س</span></div>
          <div style="font-size: 0.75rem; color: #64748b;">موزعة على دفعات مجدولة</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">العقود المنتهية قريباً (30 يوماً)</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #f59e0b; margin: 0.25rem 0;">2 <span style="font-size: 0.8rem; color: #64748b;">عقود حرجة</span></div>
          <div style="font-size: 0.75rem; color: #d97706; font-weight: 700;">تتطلب اعتماد الإدارة التنفيذية</div>
        </div>
      </div>

      <!-- Contracts Table -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            ${window.ERP.icons.get('file-text', '', 18)}
            <span>سجل العقود والمستندات القانونية</span>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>رقم العقد</th>
                <th>مسمى العقد والاتفاقية</th>
                <th>الطرف الثاني</th>
                <th>نوع العقد</th>
                <th>تاريخ الانتهاء</th>
                <th>قيمة العقد</th>
                <th>المتبقي</th>
                <th>الحالة والتنبيه</th>
                <th>الإجراء</th>
              </tr>
            </thead>
            <tbody>
              ${contracts.map(cnt => `
                <tr style="${cnt.status === 'warning' ? 'background-color: #fffdf5;' : ''}">
                  <td><strong style="color: var(--primary);">${cnt.id}</strong></td>
                  <td>
                    <div style="font-weight: 800; color: #0f172a;">${cnt.title}</div>
                    <div style="font-size: 0.75rem; color: #64748b;">المشرف: ${cnt.manager}</div>
                  </td>
                  <td><strong>${cnt.party}</strong></td>
                  <td><span class="badge badge-neutral">${cnt.type}</span></td>
                  <td>
                    <div style="font-weight: 700; color: ${cnt.status === 'warning' ? '#b45309' : '#0f172a'};">${cnt.endDate}</div>
                    <div style="font-size: 0.72rem; color: #64748b;">متبقي ${cnt.expiresInDays} يوماً</div>
                  </td>
                  <td><strong style="color: #2563eb;">${Number(cnt.value).toLocaleString()} ر.س</strong></td>
                  <td><strong style="color: ${cnt.remaining > 0 ? '#ef4444' : '#10b981'};">${Number(cnt.remaining).toLocaleString()} ر.س</strong></td>
                  <td>
                    <span class="badge badge-${cnt.status === 'warning' ? 'warning' : 'success'}">
                      ${cnt.statusText}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-outline btn-sm" onclick="window.ERP.state.showToast('معاينة ملحقات وبنود العقد ${cnt.id}', 'info')">
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
