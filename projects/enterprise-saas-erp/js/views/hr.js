/**
 * Human Resources & Employees Management View (الموظفون والموارد البشرية)
 */

window.ERP = window.ERP || {};
window.ERP.views = window.ERP.views || {};

window.ERP.views.hr = {
  currentDisplayMode: 'table', // 'table' or 'grid'

  render: function() {
    const employees = window.ERP.mockData.employees;
    const departments = window.ERP.mockData.departments;
    const totalPayroll = employees.reduce((sum, e) => sum + e.salary, 0);

    let contentHtml = '';
    if (this.currentDisplayMode === 'table') {
      contentHtml = `
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>كود الموظف</th>
                <th>الموظف</th>
                <th>القسم</th>
                <th>المسمى الوظيفي</th>
                <th>الفرع</th>
                <th>الراتب الأساسي</th>
                <th>تاريخ التعيين</th>
                <th>تقييم الأداء</th>
                <th>الحالة</th>
                <th>الإجراء</th>
              </tr>
            </thead>
            <tbody>
              ${employees.map(emp => `
                <tr>
                  <td><span class="badge badge-neutral">${emp.code}</span></td>
                  <td>
                    <div class="cell-avatar">
                      <div class="avatar">${emp.avatar}</div>
                      <div>
                        <div style="font-weight: 700; color: #0f172a;">${emp.name}</div>
                        <div style="font-size: 0.75rem; color: #64748b;">${emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>${emp.department}</td>
                  <td><strong>${emp.position}</strong></td>
                  <td>${emp.branch.split(' - ')[1] || emp.branch}</td>
                  <td><strong style="color: #2563eb;">${Number(emp.salary).toLocaleString()} ر.س</strong></td>
                  <td>${emp.joinDate}</td>
                  <td><span class="badge badge-success">${emp.performanceRating}</span></td>
                  <td><span class="badge badge-success">على رأس العمل</span></td>
                  <td>
                    <div style="display: flex; gap: 0.35rem;">
                      <button class="btn btn-outline btn-sm" onclick="window.ERP.state.openDrawer('client', { name: '${emp.name}', type: '${emp.position}', contactPerson: '${emp.department}', phone: '${emp.phone}', email: '${emp.email}', city: '${emp.branch}', contractValue: ${emp.salary * 12}, paidTotal: ${emp.salary * 6}, dueTotal: 0, pipelineStage: 'موظف مثبت', notes: 'الرقم الوظيفي: ${emp.code} - الهوية الوطنية: ${emp.nationalId} - رصيد الإجازات: ${emp.leavesBalance} يوماً' })">
                        ${window.ERP.icons.get('eye', '', 14)}
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else {
      // Grid Cards Mode
      contentHtml = `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem;">
          ${employees.map(emp => `
            <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                  <div class="avatar avatar-lg">${emp.avatar}</div>
                  <span class="badge badge-success">نشط</span>
                </div>
                <div style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-bottom: 0.2rem;">${emp.name}</div>
                <div style="font-size: 0.82rem; font-weight: 600; color: var(--primary); margin-bottom: 0.4rem;">${emp.position}</div>
                <div style="font-size: 0.78rem; color: #64748b; margin-bottom: 0.75rem;">${emp.department} • ${emp.branch}</div>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.6rem; font-size: 0.8rem; margin-bottom: 1rem;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                    <span style="color: #64748b;">الراتب الأساسي:</span>
                    <strong style="color: #2563eb;">${Number(emp.salary).toLocaleString()} ر.س</strong>
                  </div>
                  <div style="display: flex; justify-content: space-between;">
                    <span style="color: #64748b;">رصيد الإجازات:</span>
                    <strong>${emp.leavesBalance} يوماً</strong>
                  </div>
                </div>
              </div>
              <div style="display: flex; gap: 0.5rem; border-top: 1px solid #e2e8f0; padding-top: 0.75rem;">
                <button class="btn btn-outline btn-sm" style="flex: 1;" onclick="window.ERP.state.openDrawer('client', { name: '${emp.name}', type: '${emp.position}', contactPerson: '${emp.department}', phone: '${emp.phone}', email: '${emp.email}', city: '${emp.branch}', contractValue: ${emp.salary * 12}, paidTotal: ${emp.salary * 6}, dueTotal: 0, pipelineStage: 'موظف مثبت', notes: 'الرقم الوظيفي: ${emp.code} - الهوية الوطنية: ${emp.nationalId} - رصيد الإجازات: ${emp.leavesBalance} يوماً' })">الملف الوظيفي</button>
                <button class="btn btn-primary btn-sm" onclick="window.ERP.state.showToast('تم إرسال إشعار اتصال إلى ${emp.name}', 'info')">
                  ${window.ERP.icons.get('mail', '', 14)}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    return `
      <div class="page-header">
        <div class="page-header-info">
          <div class="page-breadcrumbs">
            <span>الرئيسية</span>
            <span>/</span>
            <span>الموارد البشرية</span>
            <span>/</span>
            <span style="color: var(--primary); font-weight: 600;">سجل الموظفين والكوادر</span>
          </div>
          <div class="page-title-row">
            <h1 class="page-title">إدارة الموظفين ورأس المال البشري</h1>
            <span class="badge badge-primary">${employees.length} موظف مسجل</span>
          </div>
          <div class="page-description">متابعة ملفات الكوادر، الأقسام، الرواتب، الأداء، والتوزيع الجغرافي عبر الفروع.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm" onclick="window.ERP.state.setView('attendance')">
            ${window.ERP.icons.get('clock', '', 16)}
            <span>سجل الحضور والإجازات</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.ERP.state.openModal('new-employee')">
            ${window.ERP.icons.get('user-plus', '', 16)}
            <span>إضافة موظف جديد</span>
          </button>
        </div>
      </div>

      <!-- HR Summary Cards -->
      <div class="kpi-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">إجمالي الكوادر المسجلة</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #0f172a; margin: 0.25rem 0;">148 <span style="font-size: 0.8rem; color: #64748b;">موظف</span></div>
          <div style="font-size: 0.75rem; color: #10b981; font-weight: 700;">+8 تم تعيينهم هذا الربع</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">مسير الرواتب الشهري المباشر</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #2563eb; margin: 0.25rem 0;">${Number(totalPayroll).toLocaleString()} <span style="font-size: 0.8rem; color: #64748b;">ر.س</span></div>
          <div style="font-size: 0.75rem; color: #64748b;">متوافق مع حماية الأجور WPS</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">متوسط تقييم الأداء العام</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #10b981; margin: 0.25rem 0;">94.2%</div>
          <div style="font-size: 0.75rem; color: #10b981; font-weight: 700;">أداء ممتاز واستقرار وظيفي</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">الموظفون في إجازات حالياً</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #f59e0b; margin: 0.25rem 0;">5 <span style="font-size: 0.8rem; color: #64748b;">موظفين</span></div>
          <div style="font-size: 0.75rem; color: #64748b;">3 سنوية • 2 اضطرارية</div>
        </div>
      </div>

      <!-- Filter & View Switcher Toolbar -->
      <div class="card" style="margin-bottom: 1.25rem;">
        <div class="card-body" style="padding: 0.85rem 1.25rem;">
          <div class="table-toolbar" style="margin-bottom: 0;">
            <div class="table-search">
              <div class="input-with-icon">
                <span class="input-icon">${window.ERP.icons.get('search', '', 15)}</span>
                <input type="text" class="form-control" placeholder="بحث بالاسم، القسم، أو المسمى الوظيفي..." oninput="window.ERP.filterEmployees(this.value)">
              </div>
            </div>
            <div class="table-filters">
              <select class="form-select" style="width: auto; font-size: 0.85rem;" onchange="window.ERP.state.showToast('تم تطبيق فلتر الإدارة', 'info')">
                <option value="">كافة الأقسام والإدارات</option>
                ${departments.map(d => `<option value="${d.id}">${d.name}</option>`).join('')}
              </select>
              <div class="btn-group" style="display: flex; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
                <button class="btn ${this.currentDisplayMode === 'table' ? 'btn-primary' : 'btn-outline'} btn-sm" style="border-radius: 0; border: none;" onclick="window.ERP.views.hr.currentDisplayMode = 'table'; window.ERP.state.notify();">
                  ${window.ERP.icons.get('list', '', 16)}
                  <span>جدول</span>
                </button>
                <button class="btn ${this.currentDisplayMode === 'grid' ? 'btn-primary' : 'btn-outline'} btn-sm" style="border-radius: 0; border: none;" onclick="window.ERP.views.hr.currentDisplayMode = 'grid'; window.ERP.state.notify();">
                  ${window.ERP.icons.get('grid', '', 16)}
                  <span>بطاقات</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Employees Content -->
      <div class="card">
        ${contentHtml}
      </div>
    `;
  }
};
