/**
 * Users, Roles & Permissions Matrix View (المستخدمون والصلاحيات)
 */

window.ERP = window.ERP || {};
window.ERP.views = window.ERP.views || {};

window.ERP.views.users = {
  selectedRoleKey: 'finance_manager',

  render: function() {
    const users = window.ERP.mockData.users;
    const roles = window.ERP.mockData.roles;
    const modules = window.ERP.mockData.permissionModules;
    const currentRole = roles.find(r => r.key === this.selectedRoleKey) || roles[0];

    return `
      <div class="page-header">
        <div class="page-header-info">
          <div class="page-breadcrumbs">
            <span>الرئيسية</span>
            <span>/</span>
            <span>الأمن والحوكمة</span>
            <span>/</span>
            <span style="color: var(--primary); font-weight: 600;">إدارة الصلاحيات RBAC</span>
          </div>
          <div class="page-title-row">
            <h1 class="page-title">إدارة المستخدمين، الأدوار ومصفوفة الصلاحيات</h1>
            <span class="badge badge-primary">حماية وصلاحيات مخصصة</span>
          </div>
          <div class="page-description">تحديد صلاحيات الوصول الدقيقة (عرض، إضافة، تعديل، حذف، واعتماد) لكل دور وظيفي.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm" onclick="window.ERP.state.showToast('تم حفظ وتطبيق تحديثات مصفوفة الصلاحيات بنجاح', 'success')">
            ${window.ERP.icons.get('check-circle', '', 16)}
            <span>حفظ الصلاحيات</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.ERP.state.showToast('تم فتح نافذة إنشاء حساب مستخدم جديد', 'info')">
            ${window.ERP.icons.get('user-plus', '', 16)}
            <span>إضافة مستخدم جديد</span>
          </button>
        </div>
      </div>

      <!-- Users Table Section -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-header">
          <div class="card-title">
            ${window.ERP.icons.get('users', '', 18)}
            <span>حسابات المستخدمين النشطة في النظام</span>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>المستخدم</th>
                <th>البريد الإلكتروني</th>
                <th>الدور الوظيفي المعتمد</th>
                <th>الإدارة</th>
                <th>الفرع</th>
                <th>الحالة</th>
                <th>محاكاة الدخول بهذا الحساب</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(u => `
                <tr>
                  <td>
                    <div class="cell-avatar">
                      <div class="avatar avatar-sm">${u.avatar}</div>
                      <strong>${u.name}</strong>
                    </div>
                  </td>
                  <td>${u.email}</td>
                  <td><span class="badge badge-primary">${u.role}</span></td>
                  <td>${u.department}</td>
                  <td>${u.branch}</td>
                  <td><span class="badge badge-success">مفعل</span></td>
                  <td>
                    <button class="btn ${u.id === window.ERP.state.currentUserId ? 'btn-secondary' : 'btn-outline'} btn-sm" onclick="window.ERP.state.setUserPersona('${u.id}')">
                      ${u.id === window.ERP.state.currentUserId ? 'الحساب الحالي' : 'تبديل لهذا الحساب'}
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Granular Permission Matrix -->
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">
              ${window.ERP.icons.get('shield', '', 18)}
              <span>مصفوفة الصلاحيات الدقيقة (Granular Permissions Matrix)</span>
            </div>
            <div class="card-subtitle">تعديل الصلاحيات الممنوحة للدور المحدد حالياً</div>
          </div>
          <!-- Role Selector Tabs -->
          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
            ${roles.map(r => `
              <button class="btn ${r.key === this.selectedRoleKey ? 'btn-primary' : 'btn-outline'} btn-sm" onclick="window.ERP.views.users.selectedRoleKey = '${r.key}'; window.ERP.state.notify();">
                ${r.name}
              </button>
            `).join('')}
          </div>
        </div>

        <div style="background: #f8fafc; padding: 0.85rem 1.25rem; border-bottom: 1px solid #e2e8f0;">
          <strong style="color: #0f172a;">الدور المحدد: ${currentRole.name}</strong>
          <span style="color: #64748b; font-size: 0.84rem; margin-right: 0.5rem;">— ${currentRole.desc}</span>
        </div>

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th style="width: 35%;">الوحدة البرمجية / الشاشة</th>
                <th style="text-align: center;">عرض (View)</th>
                <th style="text-align: center;">إضافة (Create)</th>
                <th style="text-align: center;">تعديل (Edit)</th>
                <th style="text-align: center;">حذف (Delete)</th>
                <th style="text-align: center;">اعتماد (Approve)</th>
              </tr>
            </thead>
            <tbody>
              ${modules.map((m, idx) => {
                const isSuper = currentRole.key === 'super_admin';
                const isChecked = isSuper || (idx % 2 === 0) || (currentRole.key === 'ceo');
                return `
                  <tr>
                    <td>
                      <strong style="color: #0f172a;">${m.name}</strong>
                    </td>
                    <td style="text-align: center;">
                      <input type="checkbox" ${isSuper || isChecked ? 'checked' : ''} ${isSuper ? 'disabled' : ''} onchange="window.ERP.state.showToast('تم تحديث صلاحية العرض في: ${m.name}', 'info')">
                    </td>
                    <td style="text-align: center;">
                      <input type="checkbox" ${isSuper || (isChecked && idx % 3 !== 0) ? 'checked' : ''} ${isSuper ? 'disabled' : ''} onchange="window.ERP.state.showToast('تم تحديث صلاحية الإضافة في: ${m.name}', 'info')">
                    </td>
                    <td style="text-align: center;">
                      <input type="checkbox" ${isSuper || (isChecked && idx % 2 === 0) ? 'checked' : ''} ${isSuper ? 'disabled' : ''} onchange="window.ERP.state.showToast('تم تحديث صلاحية التعديل في: ${m.name}', 'info')">
                    </td>
                    <td style="text-align: center;">
                      <input type="checkbox" ${isSuper ? 'checked disabled' : ''} onchange="window.ERP.state.showToast('تم تحديث صلاحية الحذف في: ${m.name}', 'warning')">
                    </td>
                    <td style="text-align: center;">
                      <input type="checkbox" ${isSuper || currentRole.key === 'ceo' || currentRole.key === 'finance_manager' ? 'checked' : ''} ${isSuper ? 'disabled' : ''} onchange="window.ERP.state.showToast('تم تحديث صلاحية الاعتماد في: ${m.name}', 'info')">
                    </td>
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
