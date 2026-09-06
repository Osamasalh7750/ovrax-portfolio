/**
 * Reports & Analytics View (التقارير والتحليلات المؤسسية)
 */

window.ERP = window.ERP || {};
window.ERP.views = window.ERP.views || {};

window.ERP.views.reports = {
  currentTab: 'financial',

  render: function() {
    return `
      <div class="page-header">
        <div class="page-header-info">
          <div class="page-breadcrumbs">
            <span>الرئيسية</span>
            <span>/</span>
            <span>ذكاء الأعمال BI</span>
            <span>/</span>
            <span style="color: var(--primary); font-weight: 600;">التقارير المالية والتشغيلية</span>
          </div>
          <div class="page-title-row">
            <h1 class="page-title">التقارير والتحليلات التنفيذية الشاملة</h1>
            <span class="badge badge-success">بيانات مالية مدققة</span>
          </div>
          <div class="page-description">استخراج القوائم المالية، التدفق النقدي، هوامش الربحية، ومؤشرات كفاءة المشاريع والموارد.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm" onclick="window.print()">
            ${window.ERP.icons.get('printer', '', 16)}
            <span>طباعة التقرير</span>
          </button>
          <button class="btn btn-outline btn-sm" onclick="window.ERP.state.showToast('جاري تصدير التقرير المالي إلى ملف Excel (.xlsx)...', 'success')">
            ${window.ERP.icons.get('download', '', 16)}
            <span>تصدير Excel</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.ERP.state.showToast('جاري توليد نسخة التقرير بصيغة PDF عالية الدقة...', 'success')">
            ${window.ERP.icons.get('download', '', 16)}
            <span>تصدير PDF رسمي</span>
          </button>
        </div>
      </div>

      <!-- Filter Controls Bar -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-body" style="padding: 1rem 1.25rem;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; align-items: flex-end;">
            <div>
              <label class="form-label">الفترة الزمنية للتقرير</label>
              <select class="form-select">
                <option>الربع الثالث 2026 (حتى تاريخه)</option>
                <option>النصف الأول 2026 (H1)</option>
                <option>السنة المالية كاملة 2025</option>
              </select>
            </div>
            <div>
              <label class="form-label">تصفية حسب الفرع</label>
              <select class="form-select">
                <option>كافة الفروع الموحدة (Consolidated)</option>
                <option>المقر الرئيسي - الرياض</option>
                <option>فرع جدة للأعمال</option>
                <option>فرع المنطقة الشرقية - الخبر</option>
              </select>
            </div>
            <div>
              <label class="form-label">نوع التقرير</label>
              <select class="form-select">
                <option>الأرباح والخسائر (Income Statement)</option>
                <option>قائمة التدفق النقدي (Cash Flow)</option>
                <option>ربحية المشاريع والعقود</option>
              </select>
            </div>
            <div>
              <button class="btn btn-primary" style="width: 100%;" onclick="window.ERP.state.showToast('تم تحديث وتوليد مؤشرات التقرير بنجاح', 'success')">
                توليد التقرير
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Financial Statement Summary Table (P&L) -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div class="card-title">
            ${window.ERP.icons.get('bar-chart-2', '', 18)}
            <span>بيان الأرباح والخسائر التقديري (P&L Income Statement)</span>
          </div>
          <span class="badge badge-primary">العملة: ريال سعودي (SAR)</span>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>البند المالي</th>
                <th>الربع الأول Q1</th>
                <th>الربع الثاني Q2</th>
                <th>الربع الثالث Q3 (حتى تاريخه)</th>
                <th>الإجمالي المتراكم</th>
                <th>نسبة النمو YoY</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style="color: #0f172a;">إجمالي إيرادات المبيعات والخدمات</strong></td>
                <td>3,450,000 ر.س</td>
                <td>4,120,000 ر.س</td>
                <td><strong style="color: #2563eb;">4,850,000 ر.س</strong></td>
                <td><strong>12,420,000 ر.س</strong></td>
                <td><span class="badge badge-success">+18.4%</span></td>
              </tr>
              <tr>
                <td style="padding-right: 2rem; color: #64748b;">- تكلفة المبيعات المباشرة (COGS)</td>
                <td>(1,200,000 ر.س)</td>
                <td>(1,350,000 ر.س)</td>
                <td>(1,520,000 ر.س)</td>
                <td>(4,070,000 ر.س)</td>
                <td><span class="badge badge-neutral">+8.2%</span></td>
              </tr>
              <tr style="background: #f8fafc;">
                <td><strong>إجمالي الربح (Gross Profit)</strong></td>
                <td><strong>2,250,000 ر.س</strong></td>
                <td><strong>2,770,000 ر.س</strong></td>
                <td><strong style="color: #10b981;">3,330,000 ر.س</strong></td>
                <td><strong>8,350,000 ر.س</strong></td>
                <td><span class="badge badge-success">+24.1%</span></td>
              </tr>
              <tr>
                <td style="padding-right: 2rem; color: #64748b;">- المصروفات العمومية والإدارية (SG&A)</td>
                <td>(320,000 ر.س)</td>
                <td>(350,000 ر.س)</td>
                <td>(385,000 ر.س)</td>
                <td>(1,055,000 ر.س)</td>
                <td><span class="badge badge-neutral">+4.0%</span></td>
              </tr>
              <tr>
                <td style="padding-right: 2rem; color: #64748b;">- المصروفات التسويقية والتقنية</td>
                <td>(75,000 ر.س)</td>
                <td>(82,000 ر.س)</td>
                <td>(83,500 ر.س)</td>
                <td>(240,500 ر.س)</td>
                <td><span class="badge badge-neutral">+2.1%</span></td>
              </tr>
              <tr style="background: #eff6ff; font-size: 1rem;">
                <td><strong style="color: #2563eb;">صافي الربح التشغيلي قبل الضريبة (Net Profit)</strong></td>
                <td><strong style="color: #2563eb;">1,855,000 ر.س</strong></td>
                <td><strong style="color: #2563eb;">2,338,000 ر.س</strong></td>
                <td><strong style="color: #10b981; font-size: 1.1rem;">2,861,500 ر.س</strong></td>
                <td><strong style="color: #10b981; font-size: 1.1rem;">7,054,500 ر.س</strong></td>
                <td><span class="badge badge-success">+28.5%</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Project Profitability Analysis -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            ${window.ERP.icons.get('briefcase', '', 18)}
            <span>تحليل ربحية المشاريع النشطة (Project Profit Margin)</span>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>المشروع</th>
                <th>العميل</th>
                <th>قيمة العقد</th>
                <th>المصروف الفعلي</th>
                <th>الربح المحقق التقديري</th>
                <th>هامش الربح %</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              ${window.ERP.mockData.projects.map(p => {
                const profit = p.revenue - p.spent;
                const margin = ((profit / p.revenue) * 100).toFixed(1);
                return `
                  <tr>
                    <td><strong>${p.title}</strong></td>
                    <td>${p.client}</td>
                    <td><strong>${Number(p.revenue).toLocaleString()} ر.س</strong></td>
                    <td><span style="color: #ef4444;">${Number(p.spent).toLocaleString()} ر.س</span></td>
                    <td><strong style="color: #10b981;">${Number(profit).toLocaleString()} ر.س</strong></td>
                    <td><span class="badge badge-success">${margin}%</span></td>
                    <td><span class="badge badge-neutral">${p.statusText}</span></td>
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
