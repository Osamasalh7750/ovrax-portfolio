/**
 * Executive Dashboard View (لوحة التحكم الرئيسية)
 */

window.ERP = window.ERP || {};
window.ERP.views = window.ERP.views || {};

window.ERP.views.dashboard = {
  render: function() {
    const comp = window.ERP.state.getCurrentCompany();
    const branch = window.ERP.state.getCurrentBranch();

    return `
      <!-- Page Header -->
      <div class="page-header">
        <div class="page-header-info">
          <div class="page-breadcrumbs">
            <span>الرئيسية</span>
            <span>/</span>
            <span>لوحة التحكم التنفيذية</span>
            <span>/</span>
            <span style="color: var(--primary); font-weight: 600;">${branch.name}</span>
          </div>
          <div class="page-title-row">
            <h1 class="page-title">لوحة التحكم والمؤشرات الرئيسية</h1>
            <span class="badge badge-success">مباشر • الربع الثالث 2026</span>
          </div>
          <div class="page-description">متابعة الأداء المالي، تدفقات السيولة، تقدم المشاريع الهندسية، وحالة المبيعات والعقود.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm" onclick="window.ERP.state.setView('reports')">
            ${window.ERP.icons.get('bar-chart-2', '', 16)}
            <span>التقارير التحليلية</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.ERP.state.openModal('quick-add')">
            ${window.ERP.icons.get('plus', '', 16)}
            <span>إجراء سريع</span>
          </button>
        </div>
      </div>

      <!-- KPI Stat Cards Row -->
      <div class="kpi-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <!-- Card 1: Total Revenue -->
        <div class="kpi-card">
          <div class="kpi-top">
            <span class="kpi-title">إجمالي المبيعات والإيرادات</span>
            <div class="kpi-icon" style="background: #eff6ff; color: #2563eb;">
              ${window.ERP.icons.get('dollar-sign', '', 20)}
            </div>
          </div>
          <div class="kpi-value">4,850,000 <span style="font-size: 0.9rem; font-weight: 600; color: #64748b;">ر.س</span></div>
          <div class="kpi-bottom">
            <span class="kpi-trend positive">
              ${window.ERP.icons.get('trending-up', '', 14)} +14.2%
            </span>
            <span class="kpi-period">مقارنة بالشهر السابق</span>
          </div>
        </div>

        <!-- Card 2: Total Expenses -->
        <div class="kpi-card">
          <div class="kpi-top">
            <span class="kpi-title">إجمالي المصروفات والتشغيل</span>
            <div class="kpi-icon" style="background: #fef2f2; color: #ef4444;">
              ${window.ERP.icons.get('credit-card', '', 20)}
            </div>
          </div>
          <div class="kpi-value">1,920,000 <span style="font-size: 0.9rem; font-weight: 600; color: #64748b;">ر.س</span></div>
          <div class="kpi-bottom">
            <span class="kpi-trend positive" style="color: #10b981;">
              ${window.ERP.icons.get('trending-down', '', 14)} -3.8%
            </span>
            <span class="kpi-period">انخفاض في تكلفة التشغيل</span>
          </div>
        </div>

        <!-- Card 3: Net Profit -->
        <div class="kpi-card">
          <div class="kpi-top">
            <span class="kpi-title">صافي الأرباح التشغيلية</span>
            <div class="kpi-icon" style="background: #ecfdf5; color: #10b981;">
              ${window.ERP.icons.get('trending-up', '', 20)}
            </div>
          </div>
          <div class="kpi-value">2,930,000 <span style="font-size: 0.9rem; font-weight: 600; color: #64748b;">ر.س</span></div>
          <div class="kpi-bottom">
            <span class="kpi-trend positive">
              ${window.ERP.icons.get('trending-up', '', 14)} +22.5%
            </span>
            <span class="kpi-period">هامش ربح صافي 60.4%</span>
          </div>
        </div>

        <!-- Card 4: Due Invoices -->
        <div class="kpi-card">
          <div class="kpi-top">
            <span class="kpi-title">الفواتير المستحقة والتحصيل</span>
            <div class="kpi-icon" style="background: #fffbeb; color: #f59e0b;">
              ${window.ERP.icons.get('alert-triangle', '', 20)}
            </div>
          </div>
          <div class="kpi-value">1,137,500 <span style="font-size: 0.9rem; font-weight: 600; color: #64748b;">ر.س</span></div>
          <div class="kpi-bottom">
            <span class="badge badge-warning" style="font-size: 0.72rem;">3 فواتير مستحقة</span>
            <span class="kpi-period">فاتورة متأخرة 6 أيام</span>
          </div>
        </div>

        <!-- Card 5: Active Projects -->
        <div class="kpi-card">
          <div class="kpi-top">
            <span class="kpi-title">المشاريع النشطة</span>
            <div class="kpi-icon" style="background: #f5f3ff; color: #8b5cf6;">
              ${window.ERP.icons.get('briefcase', '', 20)}
            </div>
          </div>
          <div class="kpi-value">4 <span style="font-size: 0.9rem; font-weight: 600; color: #64748b;">مشاريع كبرى</span></div>
          <div class="kpi-bottom">
            <span style="font-weight: 700; color: #2563eb;">متوسط الإنجاز: 68%</span>
            <span class="kpi-period">وفق الجدول الزمني</span>
          </div>
        </div>

        <!-- Card 6: Staff & Attendance -->
        <div class="kpi-card">
          <div class="kpi-top">
            <span class="kpi-title">الموظفون ونسبة الحضور</span>
            <div class="kpi-icon" style="background: #f0fdf4; color: #16a34a;">
              ${window.ERP.icons.get('users', '', 20)}
            </div>
          </div>
          <div class="kpi-value">${comp.employeesCount} <span style="font-size: 0.9rem; font-weight: 600; color: #64748b;">موظفاً</span></div>
          <div class="kpi-bottom">
            <span class="badge badge-success">نسبة حضور اليوم 96.2%</span>
            <span class="kpi-period">5 في إجازة معتمدة</span>
          </div>
        </div>
      </div>

      <!-- Main Charts Section -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1.25rem; margin-bottom: 1.5rem;">
        <!-- Financial Trend Multi-Line Chart -->
        <div class="chart-card">
          <div class="chart-header">
            <div>
              <div class="card-title">
                ${window.ERP.icons.get('bar-chart-2', '', 18)}
                <span>حركة التدفق المالي (المبيعات مقابل المصروفات والأرباح)</span>
              </div>
              <div class="card-subtitle">البيانات الإجمالية لآخر 6 أشهر بآلاف الريالات السعودية (SAR)</div>
            </div>
            <div class="chart-legend">
              <div class="legend-item">
                <span class="legend-color" style="background: #2563eb;"></span>
                <span>المبيعات</span>
              </div>
              <div class="legend-item">
                <span class="legend-color" style="background: #ef4444;"></span>
                <span>المصروفات</span>
              </div>
              <div class="legend-item">
                <span class="legend-color" style="background: #10b981;"></span>
                <span>صافي الأرباح</span>
              </div>
            </div>
          </div>
          <div id="dashboard-financial-chart" class="chart-svg-container"></div>
        </div>

        <!-- Expense Distribution Donut -->
        <div class="chart-card">
          <div class="chart-header">
            <div>
              <div class="card-title">
                ${window.ERP.icons.get('pie-chart', '', 18)}
                <span>توزيع المصروفات التشغيلية</span>
              </div>
              <div class="card-subtitle">تصنيف الصرف لشهر أغسطس 2026</div>
            </div>
          </div>
          <div id="dashboard-expenses-donut" style="padding-top: 0.5rem;"></div>
        </div>
      </div>

      <!-- Second Row: Projects Progress & Pending Approvals & Alerts -->
      <div style="display: grid; grid-template-columns: 1.2fr 1.8fr; gap: 1.25rem; margin-bottom: 1.5rem;">
        <!-- Projects Progress Card -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              ${window.ERP.icons.get('briefcase', '', 18)}
              <span>نسب إنجاز المشاريع الحالية</span>
            </div>
            <button class="btn btn-outline btn-sm" onclick="window.ERP.state.setView('projects')">عرض الكل</button>
          </div>
          <div class="card-body">
            <div id="dashboard-project-bars"></div>
          </div>
        </div>

        <!-- Recent Financial Transactions Table -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              ${window.ERP.icons.get('file-text', '', 18)}
              <span>آخر العمليات والفواتير الصادرة</span>
            </div>
            <button class="btn btn-outline btn-sm" onclick="window.ERP.state.setView('invoices')">كافة الفواتير</button>
          </div>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>رقم الفاتورة</th>
                  <th>العميل</th>
                  <th>المبلغ</th>
                  <th>تاريخ الاستحقاق</th>
                  <th>الحالة</th>
                  <th>إجراء</th>
                </tr>
              </thead>
              <tbody>
                ${window.ERP.mockData.invoices.slice(0, 4).map(inv => `
                  <tr>
                    <td><strong style="color: var(--primary);">#${inv.id}</strong></td>
                    <td>${inv.client}</td>
                    <td><strong>${Number(inv.total).toLocaleString()} ر.س</strong></td>
                    <td><span style="color: ${inv.status === 'overdue' ? '#ef4444' : '#64748b'};">${inv.dueDate}</span></td>
                    <td>
                      <span class="badge badge-${inv.status === 'paid' ? 'success' : (inv.status === 'overdue' ? 'danger' : 'warning')}">
                        ${inv.statusText}
                      </span>
                    </td>
                    <td>
                      <button class="btn btn-outline btn-sm" onclick="window.ERP.state.openModal('invoice-preview', ${JSON.stringify(inv).replace(/"/g, '&quot;')})">
                        ${window.ERP.icons.get('eye', '', 14)}
                        <span>معاينة</span>
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Third Row: Urgent Tasks & Approvals & Contracts Alerts -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem;">
        <!-- Urgent Tasks -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              ${window.ERP.icons.get('check-square', '', 18)}
              <span>المهام العاجلة المطلوب إنجازها</span>
            </div>
            <button class="btn btn-outline btn-sm" onclick="window.ERP.state.setView('tasks')">لوحة المهام</button>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 0.75rem; padding: 1rem;">
            ${window.ERP.mockData.tasks.filter(t => t.priority === 'urgent' || t.priority === 'high').slice(0, 3).map(t => `
              <div style="padding: 0.75rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: 700; font-size: 0.88rem; margin-bottom: 0.2rem;">${t.title}</div>
                  <div style="font-size: 0.75rem; color: #64748b;">${t.assignee} • استحقاق: ${t.dueDate}</div>
                </div>
                <span class="badge badge-${t.priority === 'urgent' ? 'danger' : 'warning'}">${t.priorityText}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Pending Approvals -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              ${window.ERP.icons.get('check-circle', '', 18)}
              <span>طلبات الاعتماد بانتظار الموافقة</span>
            </div>
            <button class="btn btn-outline btn-sm" onclick="window.ERP.state.setView('approvals')">سير الموافقات</button>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 0.75rem; padding: 1rem;">
            ${window.ERP.mockData.approvals.filter(a => a.status === 'pending').map(a => `
              <div style="padding: 0.75rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: 700; font-size: 0.88rem; margin-bottom: 0.2rem;">${a.title}</div>
                  <div style="font-size: 0.75rem; color: #64748b;">المقدم: ${a.requester} (${a.department}) ${a.amount ? '• ' + a.amount.toLocaleString() + ' ر.س' : ''}</div>
                </div>
                <div style="display: flex; gap: 0.35rem;">
                  <button class="btn btn-success btn-sm" onclick="window.ERP.state.approveRequest('${a.id}')">اعتماد</button>
                  <button class="btn btn-danger-outline btn-sm" onclick="window.ERP.state.rejectRequest('${a.id}')">رفض</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Contracts Near Expiry Alerts -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              ${window.ERP.icons.get('alert-triangle', '', 18)}
              <span>تنبيهات العقود السنوية</span>
            </div>
            <button class="btn btn-outline btn-sm" onclick="window.ERP.state.setView('contracts')">كافة العقود</button>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 0.75rem; padding: 1rem;">
            ${window.ERP.mockData.contracts.filter(c => c.status === 'warning').map(c => `
              <div style="padding: 0.75rem; background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; display: flex; align-items: flex-start; gap: 0.65rem;">
                <span style="color: #f59e0b; margin-top: 2px;">${window.ERP.icons.get('alert-triangle', '', 18)}</span>
                <div>
                  <div style="font-weight: 700; font-size: 0.88rem; color: #92400e; margin-bottom: 0.15rem;">${c.title}</div>
                  <div style="font-size: 0.78rem; color: #b45309;">ينتهي خلال <strong>${c.expiresInDays} يوماً</strong> (${c.endDate}) - قيمة: ${c.value.toLocaleString()} ر.س</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  afterRender: function() {
    // Mount the SVG charts cleanly
    window.ERP.charts.renderFinancialChart('dashboard-financial-chart');
    window.ERP.charts.renderExpensesDonut('dashboard-expenses-donut');
    window.ERP.charts.renderProjectBarChart('dashboard-project-bars');
  }
};
