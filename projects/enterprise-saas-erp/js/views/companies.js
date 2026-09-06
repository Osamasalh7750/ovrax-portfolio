/**
 * Company & Branches Management View (إدارة الشركة والفروع)
 */

window.ERP = window.ERP || {};
window.ERP.views = window.ERP.views || {};

window.ERP.views.companies = {
  render: function() {
    const comp = window.ERP.state.getCurrentCompany();
    const branch = window.ERP.state.getCurrentBranch();

    return `
      <div class="page-header">
        <div class="page-header-info">
          <div class="page-breadcrumbs">
            <span>الرئيسية</span>
            <span>/</span>
            <span>إدارة الكيان المؤسسي</span>
            <span>/</span>
            <span style="color: var(--primary); font-weight: 600;">بيانات الشركة والفروع</span>
          </div>
          <div class="page-title-row">
            <h1 class="page-title">ملف الشركة والفروع المؤسسية</h1>
            <span class="badge badge-primary">متعدد الفروع (Multi-Branch)</span>
          </div>
          <div class="page-description">إدارة الهوية القانونية، السجل التجاري، الأرقام الضريبية، ميزانيات الفروع، ومسؤولي الإدارات.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm" onclick="window.ERP.state.showToast('تم تحديث البيانات الضريبية من هيئة الزكاة والضريبة بنجاح', 'success')">
            ${window.ERP.icons.get('check-circle', '', 16)}
            <span>تحقق ZATCA</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.ERP.state.showToast('ميزة إضافة فرع جديد متاحة في لوحة التحكم الإدارية', 'info')">
            ${window.ERP.icons.get('plus', '', 16)}
            <span>إضافة فرع جديد</span>
          </button>
        </div>
      </div>

      <!-- Legal Company Info Card -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div class="card-title">
            ${window.ERP.icons.get('building', '', 20)}
            <span>البيانات الرسمية والقانونية للكيان</span>
          </div>
          <span class="badge badge-success">حساب موثق رسمي</span>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
            <div>
              <span class="text-muted" style="font-size: 0.8rem;">الاسم التجاري الكامل:</span>
              <div style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-top: 0.2rem;">${comp.legalName}</div>
            </div>
            <div>
              <span class="text-muted" style="font-size: 0.8rem;">رقم السجل التجاري (CR):</span>
              <div style="font-size: 1.05rem; font-weight: 700; color: #2563eb; margin-top: 0.2rem;">${comp.crNumber}</div>
            </div>
            <div>
              <span class="text-muted" style="font-size: 0.8rem;">الرقم الضريبي الموحد (VAT):</span>
              <div style="font-size: 1.05rem; font-weight: 700; color: #0f172a; margin-top: 0.2rem;">${comp.vatNumber}</div>
            </div>
            <div>
              <span class="text-muted" style="font-size: 0.8rem;">العملة الأساسية والسنة المالية:</span>
              <div style="font-size: 1rem; font-weight: 700; color: #0f172a; margin-top: 0.2rem;">${comp.currency} (ريال سعودي) • تبدأ من 1 يناير</div>
            </div>
            <div>
              <span class="text-muted" style="font-size: 0.8rem;">العنوان الوطني والمقر الرئيسي:</span>
              <div style="font-size: 0.95rem; font-weight: 600; color: #334155; margin-top: 0.2rem;">${comp.address}</div>
            </div>
            <div>
              <span class="text-muted" style="font-size: 0.8rem;">بيانات التواصل الموحدة:</span>
              <div style="font-size: 0.95rem; font-weight: 600; color: #334155; margin-top: 0.2rem;" dir="ltr">${comp.phone} • ${comp.email}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Branches Section -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div class="card-title">
            ${window.ERP.icons.get('map-pin', '', 20)}
            <span>الفروع والمقرات الإقليمية المعتمدة (${comp.branches.length})</span>
          </div>
          <span style="font-size: 0.85rem; color: #64748b;">الفرع النشط حالياً في الواجهة: <strong style="color: var(--primary);">${branch.name}</strong></span>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>اسم الفرع</th>
                <th>المدينة والموقع</th>
                <th>مدير الفرع</th>
                <th>عدد الكوادر</th>
                <th>الميزانية التشغيلية السنوية</th>
                <th>رقم الهاتف</th>
                <th>الإجراء</th>
              </tr>
            </thead>
            <tbody>
              ${comp.branches.map(b => `
                <tr style="${b.id === branch.id ? 'background-color: #eff6ff;' : ''}">
                  <td>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      <span class="avatar avatar-sm" style="background: ${b.id === branch.id ? '#2563eb' : '#f1f5f9'}; color: ${b.id === branch.id ? '#ffffff' : '#475569'};">
                        ${b.city.charAt(0)}
                      </span>
                      <div>
                        <div style="font-weight: 700; color: #0f172a;">${b.name}</div>
                        ${b.id === branch.id ? '<span class="badge badge-primary" style="font-size: 0.65rem;">الفرع المحدد حالياً</span>' : ''}
                      </div>
                    </div>
                  </td>
                  <td>${b.city}</td>
                  <td><strong>${b.manager}</strong></td>
                  <td><span class="badge badge-neutral">${b.staffCount} موظف</span></td>
                  <td><strong style="color: #059669;">${Number(b.budget).toLocaleString()} ر.س</strong></td>
                  <td dir="ltr" style="text-align: right;">${b.phone}</td>
                  <td>
                    <button class="btn ${b.id === branch.id ? 'btn-secondary' : 'btn-outline'} btn-sm" onclick="window.ERP.state.setBranch('${b.id}')">
                      ${b.id === branch.id ? 'محدد حالياً' : 'تحديد هذا الفرع'}
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Departments Directory -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            ${window.ERP.icons.get('layers', '', 20)}
            <span>الهيكل التنظيمي والأقسام الرئيسية (${window.ERP.mockData.departments.length})</span>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>كود الإدارة</th>
                <th>اسم الإدارة / القسم</th>
                <th>رئيس الإدارة</th>
                <th>عدد الموظفين</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              ${window.ERP.mockData.departments.map(d => `
                <tr>
                  <td><span class="badge badge-neutral" style="font-weight: 700;">${d.code}</span></td>
                  <td><strong style="color: #0f172a;">${d.name}</strong></td>
                  <td>${d.head}</td>
                  <td>${d.count} موظفين</td>
                  <td><span class="badge badge-success">نشطة ومفعلة</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
};
