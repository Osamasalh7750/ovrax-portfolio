/**
 * Invoices & Billing Management View (الفواتير والمدفوعات)
 */

window.ERP = window.ERP || {};
window.ERP.views = window.ERP.views || {};

window.ERP.views.invoices = {
  currentTab: 'all',

  render: function() {
    const invoices = window.ERP.mockData.invoices;
    const totalInvoiced = invoices.reduce((s, i) => s + i.total, 0);
    const totalPaid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0);
    const totalOverdue = invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.total, 0);

    let filteredInvoices = invoices;
    if (this.currentTab === 'due') {
      filteredInvoices = invoices.filter(i => i.status === 'overdue' || i.status === 'sent');
    } else if (this.currentTab === 'paid') {
      filteredInvoices = invoices.filter(i => i.status === 'paid' || i.status === 'partially_paid');
    } else if (this.currentTab === 'draft') {
      filteredInvoices = invoices.filter(i => i.status === 'draft');
    }

    return `
      <div class="page-header">
        <div class="page-header-info">
          <div class="page-breadcrumbs">
            <span>الرئيسية</span>
            <span>/</span>
            <span>الإدارة المالية والمحاسبة</span>
            <span>/</span>
            <span style="color: var(--primary); font-weight: 600;">الفوترة الإلكترونية</span>
          </div>
          <div class="page-title-row">
            <h1 class="page-title">إدارة الفواتير والتحصيل الإلكتروني (ZATCA Phase-2)</h1>
            <span class="badge badge-success">متوافق مع هيئة الزكاة والضريبة</span>
          </div>
          <div class="page-description">إصدار الفواتير الضريبية المشفرة، تتبع المدفوعات والتحصيل، ومعاينة كشوف الحساب.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm" onclick="window.ERP.state.setView('expenses')">
            ${window.ERP.icons.get('dollar-sign', '', 16)}
            <span>سندات الصرف والمصروفات</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.ERP.state.openModal('new-invoice')">
            ${window.ERP.icons.get('plus', '', 16)}
            <span>إصدار فاتورة جديدة</span>
          </button>
        </div>
      </div>

      <!-- Financial Billing KPI Cards -->
      <div class="kpi-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">إجمالي الفواتير الصادرة</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #2563eb; margin: 0.25rem 0;">${Number(totalInvoiced).toLocaleString()} <span style="font-size: 0.8rem; color: #64748b;">ر.س</span></div>
          <div style="font-size: 0.75rem; color: #64748b;">شاملة ضريبة القيمة المضافة 15%</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">المبالغ المحصلة والمودعة</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #10b981; margin: 0.25rem 0;">${Number(totalPaid).toLocaleString()} <span style="font-size: 0.8rem; color: #64748b;">ر.س</span></div>
          <div style="font-size: 0.75rem; color: #10b981; font-weight: 700;">تحويلات بنكية معتمدة</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">فواتير متأخرة تجاوزت الاستحقاق</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #ef4444; margin: 0.25rem 0;">${Number(totalOverdue).toLocaleString()} <span style="font-size: 0.8rem; color: #64748b;">ر.س</span></div>
          <div style="font-size: 0.75rem; color: #ef4444; font-weight: 700;">فاتورة مستشفيات الأمل (مستحقة)</div>
        </div>
      </div>

      <!-- Invoices Filter Tabs -->
      <div class="tabs-nav">
        <button class="tab-btn ${this.currentTab === 'all' ? 'active' : ''}" onclick="window.ERP.views.invoices.currentTab = 'all'; window.ERP.state.notify();">
          كافة الفواتير (${invoices.length})
        </button>
        <button class="tab-btn ${this.currentTab === 'due' ? 'active' : ''}" onclick="window.ERP.views.invoices.currentTab = 'due'; window.ERP.state.notify();">
          مستحقة ومتأخرة (${invoices.filter(i => i.status === 'overdue' || i.status === 'sent').length})
        </button>
        <button class="tab-btn ${this.currentTab === 'paid' ? 'active' : ''}" onclick="window.ERP.views.invoices.currentTab = 'paid'; window.ERP.state.notify();">
          مسددة (${invoices.filter(i => i.status === 'paid' || i.status === 'partially_paid').length})
        </button>
        <button class="tab-btn ${this.currentTab === 'draft' ? 'active' : ''}" onclick="window.ERP.views.invoices.currentTab = 'draft'; window.ERP.state.notify();">
          مسودات (${invoices.filter(i => i.status === 'draft').length})
        </button>
      </div>

      <!-- Invoices List Table -->
      <div class="card">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>رقم الفاتورة</th>
                <th>العميل</th>
                <th>المشروع المرفق</th>
                <th>تاريخ الإصدار</th>
                <th>تاريخ الاستحقاق</th>
                <th>المبلغ قبل الضريبة</th>
                <th>الضريبة 15%</th>
                <th>الإجمالي النهائي</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              ${filteredInvoices.map(inv => `
                <tr>
                  <td><strong style="color: var(--primary);">#${inv.id}</strong></td>
                  <td><strong style="color: #0f172a;">${inv.client}</strong></td>
                  <td><span class="badge badge-neutral">${inv.project || 'اتفاقية عامة'}</span></td>
                  <td>${inv.issueDate}</td>
                  <td><span style="color: ${inv.status === 'overdue' ? '#ef4444' : '#64748b'}; font-weight: ${inv.status === 'overdue' ? '700' : 'normal'};">${inv.dueDate}</span></td>
                  <td>${Number(inv.amount).toLocaleString()} ر.س</td>
                  <td><span style="color: #2563eb;">${Number(inv.vat).toLocaleString()} ر.س</span></td>
                  <td><strong style="color: #0f172a; font-size: 0.95rem;">${Number(inv.total).toLocaleString()} ر.س</strong></td>
                  <td>
                    <span class="badge badge-${inv.status === 'paid' ? 'success' : (inv.status === 'overdue' ? 'danger' : (inv.status === 'draft' ? 'neutral' : 'warning'))}">
                      ${inv.statusText}
                    </span>
                  </td>
                  <td>
                    <div style="display: flex; gap: 0.35rem;">
                      <button class="btn btn-outline btn-sm" onclick="window.ERP.state.openModal('invoice-preview', ${JSON.stringify(inv).replace(/"/g, '&quot;')})" title="معاينة وطباعة">
                        ${window.ERP.icons.get('printer', '', 14)}
                        <span>معاينة</span>
                      </button>
                      <button class="btn btn-outline btn-sm" onclick="window.ERP.state.showToast('تم إرسال رابط الفاتورة للعميل عبر البريد والرسائل القصيرة', 'success')" title="إرسال للعميل">
                        ${window.ERP.icons.get('mail', '', 14)}
                      </button>
                    </div>
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
