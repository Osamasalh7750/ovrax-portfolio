/**
 * CRM & Customer Relationship Management View (العملاء وإدارة العلاقات)
 */

window.ERP = window.ERP || {};
window.ERP.views = window.ERP.views || {};

window.ERP.views.crm = {
  render: function() {
    const clients = window.ERP.mockData.clients;
    const totalContractValue = clients.reduce((sum, c) => sum + c.contractValue, 0);
    const totalDue = clients.reduce((sum, c) => sum + c.dueTotal, 0);

    return `
      <div class="page-header">
        <div class="page-header-info">
          <div class="page-breadcrumbs">
            <span>الرئيسية</span>
            <span>/</span>
            <span>المبيعات والعملاء</span>
            <span>/</span>
            <span style="color: var(--primary); font-weight: 600;">منظومة CRM 360°</span>
          </div>
          <div class="page-title-row">
            <h1 class="page-title">إدارة علاقات العملاء (CRM Pipeline)</h1>
            <span class="badge badge-success">دورة البيع والتحصيل المتكاملة</span>
          </div>
          <div class="page-description">تتبع مسار العملاء المحتملين، الفرص البيعية، العقود المبرمة، والفواتير والتحصيلات.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm" onclick="window.ERP.state.setView('sales')">
            ${window.ERP.icons.get('shopping-bag', '', 16)}
            <span>عروض الأسعار والكتالوج</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.ERP.state.openModal('new-client')">
            ${window.ERP.icons.get('plus', '', 16)}
            <span>إضافة عميل جديد</span>
          </button>
        </div>
      </div>

      <!-- CRM Pipeline Stages Bar -->
      <div class="card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
        <div style="font-size: 0.88rem; font-weight: 700; color: #0f172a; margin-bottom: 0.85rem;">
          مراحل دورة العميل المؤسسية (Customer Lifecycle Pipeline)
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.75rem;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem; text-align: center; border-top: 3px solid #64748b;">
            <div style="font-size: 0.75rem; color: #64748b; font-weight: 700;">1. عميل محتمل Lead</div>
            <div style="font-size: 1.2rem; font-weight: 800; color: #0f172a; margin: 0.2rem 0;">4</div>
            <div style="font-size: 0.7rem; color: #64748b;">استفسارات واردة</div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem; text-align: center; border-top: 3px solid #0ea5e9;">
            <div style="font-size: 0.75rem; color: #0ea5e9; font-weight: 700;">2. تواصل وتأهيل</div>
            <div style="font-size: 1.2rem; font-weight: 800; color: #0f172a; margin: 0.2rem 0;">3</div>
            <div style="font-size: 0.7rem; color: #64748b;">جلسات استكشافية</div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem; text-align: center; border-top: 3px solid #8b5cf6;">
            <div style="font-size: 0.75rem; color: #8b5cf6; font-weight: 700;">3. عرض سعر مقدم</div>
            <div style="font-size: 1.2rem; font-weight: 800; color: #0f172a; margin: 0.2rem 0;">2</div>
            <div style="font-size: 0.7rem; color: #64748b;">1.25M ر.س</div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem; text-align: center; border-top: 3px solid #f59e0b;">
            <div style="font-size: 0.75rem; color: #f59e0b; font-weight: 700;">4. تفاوض نهائي</div>
            <div style="font-size: 1.2rem; font-weight: 800; color: #0f172a; margin: 0.2rem 0;">1</div>
            <div style="font-size: 0.7rem; color: #64748b;">مراجعة البنود</div>
          </div>
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 0.75rem; text-align: center; border-top: 3px solid #2563eb;">
            <div style="font-size: 0.75rem; color: #2563eb; font-weight: 700;">5. عقد ساري ومشاريع</div>
            <div style="font-size: 1.2rem; font-weight: 800; color: #2563eb; margin: 0.2rem 0;">5</div>
            <div style="font-size: 0.7rem; color: #2563eb; font-weight: 600;">13.4M ر.س محفظة</div>
          </div>
        </div>
      </div>

      <!-- CRM Financial Metrics Cards -->
      <div class="kpi-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">إجمالي محفظة التعاقدات الحالية</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #2563eb; margin: 0.25rem 0;">${Number(totalContractValue).toLocaleString()} <span style="font-size: 0.8rem; color: #64748b;">ر.س</span></div>
          <div style="font-size: 0.75rem; color: #10b981; font-weight: 700;">مشاريع وعقود استراتيجية</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">الذمم المدينة المستحقة (غير المحصلة)</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #ef4444; margin: 0.25rem 0;">${Number(totalDue).toLocaleString()} <span style="font-size: 0.8rem; color: #64748b;">ر.س</span></div>
          <div style="font-size: 0.75rem; color: #ef4444; font-weight: 600;">تتطلب متابعة فريق التحصيل</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">معدل تحويل الصفقات (Win Rate)</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #10b981; margin: 0.25rem 0;">76.8%</div>
          <div style="font-size: 0.75rem; color: #10b981; font-weight: 700;">+5.4% عن مستهدف الربع</div>
        </div>
      </div>

      <!-- Clients Directory Table -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            ${window.ERP.icons.get('users', '', 18)}
            <span>دليل حسابات العملاء المسجلين (${clients.length})</span>
          </div>
          <div class="table-search" style="min-width: 240px;">
            <div class="input-with-icon">
              <span class="input-icon">${window.ERP.icons.get('search', '', 14)}</span>
              <input type="text" class="form-control form-control-sm" placeholder="بحث بالاسم أو المدينة...">
            </div>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>اسم العميل / المنشأة</th>
                <th>المسؤول والاتصال</th>
                <th>القطاع والمدينة</th>
                <th>المرحلة (Pipeline)</th>
                <th>قيمة التعاقد</th>
                <th>المسدد</th>
                <th>المستحق الحالي</th>
                <th>مدير الحساب</th>
                <th>الإجراء</th>
              </tr>
            </thead>
            <tbody>
              ${clients.map(cli => `
                <tr>
                  <td>
                    <div style="font-weight: 800; color: #0f172a;">${cli.name}</div>
                    <div style="font-size: 0.75rem; color: #64748b;">${cli.activeProjects} مشاريع نشطة</div>
                  </td>
                  <td>
                    <div style="font-weight: 600;">${cli.contactPerson}</div>
                    <div style="font-size: 0.75rem; color: #64748b;" dir="ltr">${cli.phone}</div>
                  </td>
                  <td>
                    <div>${cli.type}</div>
                    <span class="badge badge-neutral" style="font-size: 0.7rem;">${cli.city}</span>
                  </td>
                  <td>
                    <span class="badge badge-${cli.pipelineStage === 'عقد ساري' ? 'success' : 'warning'}">
                      ${cli.pipelineStage}
                    </span>
                  </td>
                  <td><strong style="color: #2563eb;">${Number(cli.contractValue).toLocaleString()} ر.س</strong></td>
                  <td><strong style="color: #10b981;">${Number(cli.paidTotal).toLocaleString()} ر.س</strong></td>
                  <td>
                    <strong style="color: ${cli.dueTotal > 0 ? '#ef4444' : '#64748b'};">
                      ${Number(cli.dueTotal).toLocaleString()} ر.س
                    </strong>
                  </td>
                  <td><span class="badge badge-neutral">${cli.accountManager}</span></td>
                  <td>
                    <button class="btn btn-outline btn-sm" onclick="window.ERP.state.openDrawer('client', ${JSON.stringify(cli).replace(/"/g, '&quot;')})">
                      ${window.ERP.icons.get('eye', '', 14)}
                      <span>عرض 360°</span>
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
