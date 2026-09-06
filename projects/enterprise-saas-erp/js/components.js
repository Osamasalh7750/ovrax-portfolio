/**
 * Core UI Components Generator (Header, Sidebar, Modals, Drawers)
 */

window.ERP = window.ERP || {};

window.ERP.components = {
  // Navigation Menu Structure (23 Enterprise Sections)
  navItems: [
    { section: 'الرئيسية والقيادة' },
    { key: 'dashboard', label: 'لوحة التحكم الرئيسية', icon: 'layout-dashboard', badge: null },
    { key: 'companies', label: 'إدارة الشركة والفروع', icon: 'building', badge: '3 فروع' },
    
    { section: 'العمليات والمشاريع' },
    { key: 'projects', label: 'المشاريع والمحافظ', icon: 'briefcase', badge: '4 نشطة' },
    { key: 'tasks', label: 'إدارة المهام (Kanban)', icon: 'check-square', badge: '7' },
    { key: 'contracts', label: 'العقود والاتفاقيات', icon: 'file-text', badge: 'تنبيه' },
    
    { section: 'العلاقات والمبيعات' },
    { key: 'crm', label: 'إدارة العملاء CRM', icon: 'users', badge: null },
    { key: 'sales', label: 'المبيعات وعروض الأسعار', icon: 'shopping-bag', badge: null },
    { key: 'purchases', label: 'المشتريات والتوريد', icon: 'shopping-cart', badge: 'طلب جديد' },
    { key: 'suppliers', label: 'الموردون وسلاسل الإمداد', icon: 'layers', badge: null },
    
    { section: 'المالية والمحاسبة' },
    { key: 'invoices', label: 'الفواتير والمدفوعات', icon: 'credit-card', badge: 'مستحق' },
    { key: 'expenses', label: 'المصروفات والميزانيات', icon: 'dollar-sign', badge: null },
    { key: 'inventory', label: 'المخزون والأصول الثابتة', icon: 'package', badge: null },
    
    { section: 'رأس المال البشري' },
    { key: 'hr', label: 'الموظفون وشؤون العمل', icon: 'user-check', badge: null },
    { key: 'attendance', label: 'الحضور والإجازات', icon: 'clock', badge: '96%' },
    
    { section: 'التنسيق والاتصال' },
    { key: 'documents', label: 'الوثائق وإدارة الملفات', icon: 'folder', badge: null },
    { key: 'meetings', label: 'الاجتماعات والمحاضر', icon: 'video', badge: 'اليوم' },
    { key: 'notifications', label: 'مركز التنبيهات والإشعار', icon: 'bell', badge: '3' },
    
    { section: 'الحوكمة والتحليلات' },
    { key: 'reports', label: 'التقارير والتحليلات', icon: 'bar-chart-2', badge: null },
    { key: 'approvals', label: 'مسارات الاعتماد والموافقات', icon: 'check-circle', badge: '2 معلق' },
    { key: 'users', label: 'المستخدمون والصلاحيات', icon: 'shield', badge: null },
    { key: 'settings', label: 'إعدادات النظام والتهيئة', icon: 'settings', badge: null }
  ],

  // Render Top Header
  renderHeader: function() {
    const activeCompany = window.ERP.state.getCurrentCompany();
    const activeBranch = window.ERP.state.getCurrentBranch();
    const activeUser = window.ERP.state.getCurrentUser();
    const unreadCount = window.ERP.mockData.notifications.filter(n => n.unread).length;

    return `
      <div class="app-header">
        <div class="header-start">
          <button class="sidebar-toggle-btn" title="تبديل القائمة الجانبية" onclick="window.ERP.toggleSidebar()">
            ${window.ERP.icons.get('menu', '', 18)}
          </button>

          <!-- Company / Branch Selector Pill -->
          <div class="dropdown">
            <button class="btn btn-outline btn-sm" style="display: flex; align-items: center; gap: 0.5rem; background: #f8fafc; border-color: #e2e8f0;" onclick="window.ERP.toggleDropdown('branch-dropdown')">
              <span style="color: var(--primary);">${window.ERP.icons.get('building', '', 15)}</span>
              <span style="font-weight: 700; color: #1e293b;">${activeCompany.name.split(' ')[0]} - ${activeBranch.name.split(' - ')[1] || activeBranch.name}</span>
              ${window.ERP.icons.get('chevron-down', '', 14)}
            </button>
            <div id="branch-dropdown" class="dropdown-menu" style="min-width: 280px; padding: 0.5rem;">
              <div style="font-size: 0.72rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; padding: 0.35rem 0.5rem;">تبديل الفرع النشط</div>
              ${activeCompany.branches.map(b => `
                <div class="dropdown-item ${b.id === activeBranch.id ? 'active' : ''}" style="border-radius: 6px; font-weight: ${b.id === activeBranch.id ? '700' : '500'}; display: flex; justify-content: space-between;" onclick="window.ERP.state.setBranch('${b.id}')">
                  <span>${b.name}</span>
                  <span style="font-size: 0.75rem; color: #64748b;">${b.staffCount} موظف</span>
                </div>
              `).join('')}
              <div class="dropdown-divider"></div>
              <div style="font-size: 0.72rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; padding: 0.35rem 0.5rem;">تبديل الشركة</div>
              ${window.ERP.mockData.companies.map(c => `
                <div class="dropdown-item" style="border-radius: 6px;" onclick="window.ERP.state.setCompany('${c.id}')">
                  <div style="display: flex; flex-direction: column;">
                    <span style="font-weight: 700; color: #0f172a;">${c.name}</span>
                    <span style="font-size: 0.7rem; color: #64748b;">${c.branches.length} فروع • ${c.employeesCount} موظف</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Global Search Input -->
          <div class="header-search">
            <div class="input-with-icon">
              <span class="input-icon">${window.ERP.icons.get('search', '', 16)}</span>
              <input type="text" class="form-control" placeholder="بحث شامل (موظف، مشروع، عميل، فاتورة)..." oninput="window.ERP.handleGlobalSearch(this.value)">
            </div>
          </div>
        </div>

        <div class="header-end">
          <!-- Quick Add Button -->
          <button class="btn btn-primary btn-sm" onclick="window.ERP.state.openModal('quick-add')">
            ${window.ERP.icons.get('plus', '', 16)}
            <span>إضافة سريع</span>
          </button>

          <!-- Notifications Icon -->
          <div class="dropdown">
            <button class="header-action-btn" title="الإشعارات" onclick="window.ERP.toggleDropdown('notifications-dropdown')">
              ${window.ERP.icons.get('bell', '', 18)}
              ${unreadCount > 0 ? '<span class="notification-badge-dot"></span>' : ''}
            </button>
            <div id="notifications-dropdown" class="dropdown-menu" style="width: 320px; max-height: 420px; overflow-y: auto; left: 0;">
              <div style="padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: 700; font-size: 0.9rem;">مركز الإشعارات</span>
                <span class="badge badge-primary">${unreadCount} غير مقروء</span>
              </div>
              <div style="display: flex; flex-direction: column;">
                ${window.ERP.mockData.notifications.map(n => `
                  <div class="notification-item ${n.unread ? 'unread' : ''}" onclick="window.ERP.state.setView('${n.linkView}')">
                    <div class="notification-icon-box" style="background: ${n.type === 'danger' ? '#fef2f2' : (n.type === 'warning' ? '#fffbeb' : '#eff6ff')}; color: ${n.type === 'danger' ? '#ef4444' : (n.type === 'warning' ? '#f59e0b' : '#2563eb')};">
                      ${window.ERP.icons.get(n.icon, '', 16)}
                    </div>
                    <div class="notification-details">
                      <div class="notification-title">${n.title}</div>
                      <div class="notification-text">${n.text}</div>
                      <div class="notification-time">${n.time}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
              <div style="padding: 0.6rem; text-align: center; border-top: 1px solid #e2e8f0;">
                <a href="javascript:void(0)" style="font-size: 0.8rem; font-weight: 700; color: var(--primary); text-decoration: none;" onclick="window.ERP.state.setView('notifications')">عرض جميع الإشعارات</a>
              </div>
            </div>
          </div>

          <!-- User Profile Dropdown / Persona Switcher -->
          <div class="dropdown">
            <button class="header-user-btn" onclick="window.ERP.toggleDropdown('user-dropdown')">
              <div class="avatar avatar-sm">${activeUser.avatar}</div>
              <div style="display: flex; flex-direction: column; text-align: right;">
                <span class="header-user-name">${activeUser.name}</span>
                <span style="font-size: 0.7rem; color: #64748b;">${activeUser.role.split('/')[0]}</span>
              </div>
              ${window.ERP.icons.get('chevron-down', '', 14)}
            </button>
            <div id="user-dropdown" class="dropdown-menu" style="min-width: 240px; padding: 0.5rem; left: 0;">
              <div style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; margin-bottom: 0.4rem;">
                <div style="font-weight: 700; font-size: 0.9rem; color: #0f172a;">${activeUser.name}</div>
                <div style="font-size: 0.78rem; color: #64748b;">${activeUser.email}</div>
                <div class="badge badge-info" style="margin-top: 0.35rem;">${activeUser.role}</div>
              </div>
              <div style="font-size: 0.72rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; padding: 0.25rem 0.5rem;">تبديل الحساب التجريبي</div>
              ${window.ERP.mockData.users.map(u => `
                <div class="dropdown-item ${u.id === activeUser.id ? 'active' : ''}" style="border-radius: 6px; font-size: 0.82rem;" onclick="window.ERP.state.setUserPersona('${u.id}')">
                  <span class="avatar avatar-sm" style="width: 22px; height: 22px; font-size: 0.65rem;">${u.avatar}</span>
                  <div style="display: flex; flex-direction: column;">
                    <span style="font-weight: 600;">${u.name}</span>
                    <span style="font-size: 0.68rem; color: #64748b;">${u.role.split('/')[0]}</span>
                  </div>
                </div>
              `).join('')}
              <div class="dropdown-divider"></div>
              <div class="dropdown-item" onclick="window.ERP.state.setView('settings')">
                ${window.ERP.icons.get('settings', '', 16)}
                <span>إعدادات الحساب</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Render Sidebar
  renderSidebar: function() {
    const currentView = window.ERP.state.currentView;
    const activeCompany = window.ERP.state.getCurrentCompany();
    const activeBranch = window.ERP.state.getCurrentBranch();
    const activeUser = window.ERP.state.getCurrentUser();

    let navHtml = '';
    this.navItems.forEach(item => {
      if (item.section) {
        navHtml += `<div class="nav-section-title">${item.section}</div>`;
      } else {
        const isActive = currentView === item.key;
        navHtml += `
          <a class="nav-link ${isActive ? 'active' : ''}" onclick="window.ERP.state.setView('${item.key}')" title="${item.label}">
            <span class="nav-icon">${window.ERP.icons.get(item.icon, '', 18)}</span>
            <span class="nav-label">${item.label}</span>
            ${item.badge ? `<span class="nav-badge ${isActive ? 'badge-primary' : 'badge-neutral'}">${item.badge}</span>` : ''}
          </a>
        `;
      }
    });

    return `
      <aside class="app-sidebar">
        <!-- Logo -->
        <div class="sidebar-header">
          <div class="brand-logo-wrap" onclick="window.ERP.state.setView('dashboard')">
            <div class="brand-logo-icon">ع</div>
            <div class="brand-text">
              <span class="brand-name">منصة العاصمة</span>
              <span class="brand-badge">SaaS Enterprise ERP</span>
            </div>
          </div>
        </div>

        <!-- Active Company Display -->
        <div class="sidebar-company-box" onclick="window.ERP.state.setView('companies')">
          <div class="sidebar-company-info">
            <div class="sidebar-company-icon">
              ${window.ERP.icons.get('building', '', 16)}
            </div>
            <div class="sidebar-company-names">
              <span class="company-active-title">${activeCompany.name}</span>
              <span class="branch-active-subtitle">${activeBranch.name}</span>
            </div>
          </div>
          <span class="arrow-icon" style="color: #94a3b8;">${window.ERP.icons.get('chevron-down', '', 14)}</span>
        </div>

        <!-- Navigation Scroll Area -->
        <nav class="sidebar-nav">
          ${navHtml}
        </nav>

        <!-- Sidebar Footer -->
        <div class="sidebar-footer">
          <div class="user-snippet" onclick="window.ERP.state.setView('users')">
            <div class="avatar avatar-sm">${activeUser.avatar}</div>
            <div class="user-snippet-details">
              <div class="user-snippet-name">${activeUser.name}</div>
              <div class="user-snippet-role">${activeUser.department}</div>
            </div>
            <span style="color: #94a3b8;">${window.ERP.icons.get('settings', '', 16)}</span>
          </div>
        </div>
      </aside>
    `;
  },

  // Modal Content Router
  renderModalContent: function(modalId, context) {
    if (modalId === 'quick-add') {
      return `
        <div class="modal-dialog">
          <div class="modal-header">
            <div class="modal-title">
              ${window.ERP.icons.get('plus', '', 20)}
              <span>إضافة سريعة إلى النظام</span>
            </div>
            <button class="modal-close-btn" onclick="window.ERP.state.closeModal()">${window.ERP.icons.get('x', '', 18)}</button>
          </div>
          <div class="modal-body" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
            <div class="card" style="padding: 1rem; cursor: pointer; border-color: #e2e8f0; transition: all 0.2s;" onclick="window.ERP.state.openModal('new-employee')">
              <div style="color: var(--primary); margin-bottom: 0.5rem;">${window.ERP.icons.get('user-plus', '', 24)}</div>
              <div style="font-weight: 700; margin-bottom: 0.2rem;">موظف جديد</div>
              <div style="font-size: 0.78rem; color: #64748b;">إضافة موظف إلى مسير الموارد البشرية</div>
            </div>
            <div class="card" style="padding: 1rem; cursor: pointer; border-color: #e2e8f0; transition: all 0.2s;" onclick="window.ERP.state.openModal('new-client')">
              <div style="color: #0ea5e9; margin-bottom: 0.5rem;">${window.ERP.icons.get('users', '', 24)}</div>
              <div style="font-weight: 700; margin-bottom: 0.2rem;">عميل جديد CRM</div>
              <div style="font-size: 0.78rem; color: #64748b;">تسجيل حساب عميل أو فرصة مبيعات</div>
            </div>
            <div class="card" style="padding: 1rem; cursor: pointer; border-color: #e2e8f0; transition: all 0.2s;" onclick="window.ERP.state.openModal('new-project')">
              <div style="color: #10b981; margin-bottom: 0.5rem;">${window.ERP.icons.get('briefcase', '', 24)}</div>
              <div style="font-weight: 700; margin-bottom: 0.2rem;">مشروع هندسي</div>
              <div style="font-size: 0.78rem; color: #64748b;">بدء مشروع وتخصيص ميزانية وفريق</div>
            </div>
            <div class="card" style="padding: 1rem; cursor: pointer; border-color: #e2e8f0; transition: all 0.2s;" onclick="window.ERP.state.openModal('new-invoice')">
              <div style="color: #8b5cf6; margin-bottom: 0.5rem;">${window.ERP.icons.get('credit-card', '', 24)}</div>
              <div style="font-weight: 700; margin-bottom: 0.2rem;">فاتورة ضريبية</div>
              <div style="font-size: 0.78rem; color: #64748b;">إصدار فاتورة إلكترونية لعميل</div>
            </div>
            <div class="card" style="padding: 1rem; cursor: pointer; border-color: #e2e8f0; transition: all 0.2s;" onclick="window.ERP.state.openModal('new-task')">
              <div style="color: #f59e0b; margin-bottom: 0.5rem;">${window.ERP.icons.get('check-square', '', 24)}</div>
              <div style="font-weight: 700; margin-bottom: 0.2rem;">مهمة جديدة</div>
              <div style="font-size: 0.78rem; color: #64748b;">إسناد مهمة للوحة كانبان</div>
            </div>
            <div class="card" style="padding: 1rem; cursor: pointer; border-color: #e2e8f0; transition: all 0.2s;" onclick="window.ERP.state.openModal('new-expense')">
              <div style="color: #ef4444; margin-bottom: 0.5rem;">${window.ERP.icons.get('dollar-sign', '', 24)}</div>
              <div style="font-weight: 700; margin-bottom: 0.2rem;">تسجيل مصروف</div>
              <div style="font-size: 0.78rem; color: #64748b;">سند صرف مالي أو عهدة</div>
            </div>
          </div>
        </div>
      `;
    }

    if (modalId === 'new-employee') {
      return `
        <div class="modal-dialog modal-lg">
          <div class="modal-header">
            <div class="modal-title">
              ${window.ERP.icons.get('user-plus', '', 20)}
              <span>إضافة موظف جديد إلى المنظومة</span>
            </div>
            <button class="modal-close-btn" onclick="window.ERP.state.closeModal()">${window.ERP.icons.get('x', '', 18)}</button>
          </div>
          <form onsubmit="event.preventDefault(); window.ERP.handleCreateEmployee(this);">
            <div class="modal-body">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label"><span class="required">*</span>الاسم الكامل للموظف</label>
                  <input type="text" name="name" class="form-control" required placeholder="مثال: م. سعود بن عبدالعزيز المقرن">
                </div>
                <div class="form-group">
                  <label class="form-label"><span class="required">*</span>المسمى الوظيفي</label>
                  <input type="text" name="position" class="form-control" required placeholder="مثال: مهندس شبكات وبنية تحتية">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label"><span class="required">*</span>القسم / الإدارة</label>
                  <select name="department" class="form-select" required>
                    ${window.ERP.mockData.departments.map(d => `<option value="${d.name}">${d.name}</option>`).join('')}
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label"><span class="required">*</span>فرع العمل</label>
                  <select name="branch" class="form-select" required>
                    ${window.ERP.state.getCurrentCompany().branches.map(b => `<option value="${b.name}">${b.name}</option>`).join('')}
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label"><span class="required">*</span>الراتب الأساسي (ر.س)</label>
                  <input type="number" name="salary" class="form-control" required value="18000">
                </div>
                <div class="form-group">
                  <label class="form-label"><span class="required">*</span>البريد الإلكتروني المؤسسي</label>
                  <input type="email" name="email" class="form-control" required placeholder="s.almoqren@al-asima.sa">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label"><span class="required">*</span>رقم الجوال</label>
                  <input type="tel" name="phone" class="form-control" required value="+966 50 ">
                </div>
                <div class="form-group">
                  <label class="form-label"><span class="required">*</span>تاريخ التوظيف والمباشرة</label>
                  <input type="date" name="joinDate" class="form-control" required value="2026-09-01">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline" onclick="window.ERP.state.closeModal()">إلغاء</button>
              <button type="submit" class="btn btn-primary">حفظ الموظف وتعيين الصلاحيات</button>
            </div>
          </form>
        </div>
      `;
    }

    if (modalId === 'new-client') {
      return `
        <div class="modal-dialog modal-lg">
          <div class="modal-header">
            <div class="modal-title">
              ${window.ERP.icons.get('users', '', 20)}
              <span>تسجيل عميل جديد في منظومة CRM</span>
            </div>
            <button class="modal-close-btn" onclick="window.ERP.state.closeModal()">${window.ERP.icons.get('x', '', 18)}</button>
          </div>
          <form onsubmit="event.preventDefault(); window.ERP.handleCreateClient(this);">
            <div class="modal-body">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label"><span class="required">*</span>اسم الشركة أو المؤسسة</label>
                  <input type="text" name="name" class="form-control" required placeholder="مثال: شركة التطوير الحديث للخدمات الطبية">
                </div>
                <div class="form-group">
                  <label class="form-label"><span class="required">*</span>نوع المنشأة / القطاع</label>
                  <input type="text" name="type" class="form-control" required placeholder="رعاية صحية، عقارات، مقاولات...">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label"><span class="required">*</span>الشخص المسؤول للتواصل</label>
                  <input type="text" name="contactPerson" class="form-control" required placeholder="أ. فهد الراجحي">
                </div>
                <div class="form-group">
                  <label class="form-label"><span class="required">*</span>المدينة</label>
                  <input type="text" name="city" class="form-control" required value="الرياض">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label"><span class="required">*</span>البريد الإلكتروني</label>
                  <input type="email" name="email" class="form-control" required placeholder="contact@company.sa">
                </div>
                <div class="form-group">
                  <label class="form-label"><span class="required">*</span>رقم الهاتف</label>
                  <input type="tel" name="phone" class="form-control" required value="+966 11 ">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">القيمة التقديرية للتعاقد (ر.س)</label>
                  <input type="number" name="contractValue" class="form-control" value="500000">
                </div>
                <div class="form-group">
                  <label class="form-label">مدير الحساب المسؤول</label>
                  <select name="accountManager" class="form-select">
                    <option value="أ. عمر التميمي">أ. عمر التميمي</option>
                    <option value="أ. ريان الدوسري">أ. ريان الدوسري</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline" onclick="window.ERP.state.closeModal()">إلغاء</button>
              <button type="submit" class="btn btn-primary">حفظ العميل وفتح الملف</button>
            </div>
          </form>
        </div>
      `;
    }

    if (modalId === 'new-invoice') {
      return `
        <div class="modal-dialog modal-lg">
          <div class="modal-header">
            <div class="modal-title">
              ${window.ERP.icons.get('credit-card', '', 20)}
              <span>إنشاء فاتورة ضريبية إلكترونية جديدة</span>
            </div>
            <button class="modal-close-btn" onclick="window.ERP.state.closeModal()">${window.ERP.icons.get('x', '', 18)}</button>
          </div>
          <form onsubmit="event.preventDefault(); window.ERP.handleCreateInvoice(this);">
            <div class="modal-body">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label"><span class="required">*</span>العميل</label>
                  <select name="client" class="form-select" required>
                    ${window.ERP.mockData.clients.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label"><span class="required">*</span>المشروع المرتبط</label>
                  <select name="project" class="form-select">
                    <option value="عام - بدون مشروع محدد">عام - بدون مشروع محدد</option>
                    ${window.ERP.mockData.projects.map(p => `<option value="${p.title}">${p.title}</option>`).join('')}
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label"><span class="required">*</span>المبلغ قبل الضريبة (ر.س)</label>
                  <input type="number" id="inv-amount-input" name="amount" class="form-control" required value="100000" oninput="window.ERP.calcVat(this.value)">
                </div>
                <div class="form-group">
                  <label class="form-label">ضريبة القيمة المضافة 15% (ر.س)</label>
                  <input type="number" id="inv-vat-input" name="vat" class="form-control" readonly value="15000">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">تاريخ الإصدار</label>
                  <input type="date" name="issueDate" class="form-control" required value="2026-09-06">
                </div>
                <div class="form-group">
                  <label class="form-label">تاريخ الاستحقاق</label>
                  <input type="date" name="dueDate" class="form-control" required value="2026-10-06">
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">بيان الأعمال والخدمات</label>
                <textarea name="notes" class="form-control" rows="3" placeholder="تفاصيل الدفعة أو المنتجات الموردة..."></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline" onclick="window.ERP.state.closeModal()">إلغاء</button>
              <button type="submit" class="btn btn-primary">إصدار الفاتورة واعتمادها</button>
            </div>
          </form>
        </div>
      `;
    }

    if (modalId === 'invoice-preview') {
      const inv = context || window.ERP.mockData.invoices[0];
      const comp = window.ERP.state.getCurrentCompany();
      return `
        <div class="modal-dialog modal-xl">
          <div class="modal-header">
            <div class="modal-title">
              ${window.ERP.icons.get('file-text', '', 20)}
              <span>معاينة الفاتورة الضريبية الرسمية #${inv.id}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <button class="btn btn-outline btn-sm" onclick="window.print()">
                ${window.ERP.icons.get('printer', '', 16)}
                <span>طباعة الفاتورة</span>
              </button>
              <button class="modal-close-btn" onclick="window.ERP.state.closeModal()">${window.ERP.icons.get('x', '', 18)}</button>
            </div>
          </div>
          <div class="modal-body" style="background-color: #f8fafc; padding: 2rem;">
            <div class="invoice-preview-card">
              <!-- Invoice Header -->
              <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 1.5rem;">
                <div>
                  <div style="font-size: 1.4rem; font-weight: 800; color: #0f172a;">${comp.name}</div>
                  <div style="font-size: 0.82rem; color: #64748b;">${comp.address}</div>
                  <div style="font-size: 0.82rem; color: #64748b;">السجل التجاري: ${comp.crNumber} • الرقم الضريبي: ${comp.vatNumber}</div>
                </div>
                <div style="text-align: left; display: flex; flex-direction: column; align-items: flex-end;">
                  <div class="badge badge-primary" style="font-size: 0.9rem; padding: 0.4rem 0.8rem; margin-bottom: 0.5rem;">فاتورة ضريبية إلكترونية</div>
                  <div style="font-size: 1.1rem; font-weight: 800; color: #2563eb;">#${inv.id}</div>
                  <div style="font-size: 0.8rem; color: #64748b;">تاريخ الإصدار: ${inv.issueDate}</div>
                  <div style="font-size: 0.8rem; color: #ef4444; font-weight: 600;">الاستحقاق: ${inv.dueDate}</div>
                </div>
              </div>

              <!-- Bill To & QR Code Mock -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; background: #f8fafc; padding: 1.25rem; border-radius: 8px;">
                <div>
                  <span style="font-size: 0.75rem; color: #64748b; font-weight: 700; text-transform: uppercase;">فاتورة إلى العميل:</span>
                  <div style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-top: 0.25rem;">${inv.client}</div>
                  <div style="font-size: 0.85rem; color: #475569; margin-top: 0.2rem;">المشروع: ${inv.project || 'اتفاقية خدمات عامة'}</div>
                </div>
                <!-- Simulated ZATCA QR Code -->
                <div style="width: 80px; height: 80px; background: #0f172a; border-radius: 6px; padding: 6px; display: flex; align-items: center; justify-content: center; color: white;">
                  <div style="width: 100%; height: 100%; border: 2px dashed white; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 700; text-align: center;">
                    ZATCA<br>QR Code
                  </div>
                </div>
              </div>

              <!-- Line Items Table -->
              <table class="table" style="margin-bottom: 1.5rem;">
                <thead>
                  <tr>
                    <th>البند / الوصف</th>
                    <th>الكمية</th>
                    <th>سعر الوحدة</th>
                    <th>نسبة الضريبة</th>
                    <th>المجموع قبل الضريبة</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div style="font-weight: 700;">${inv.notes || 'خدمات وحلول رقمية معتمدة وفق التعاقد'}</div>
                      <div style="font-size: 0.78rem; color: #64748b;">توريد وتطبيق مع الدعم الفني</div>
                    </td>
                    <td>1</td>
                    <td>${Number(inv.amount).toLocaleString()} ر.س</td>
                    <td>15%</td>
                    <td style="font-weight: 700;">${Number(inv.amount).toLocaleString()} ر.س</td>
                  </tr>
                </tbody>
              </table>

              <!-- Totals Box -->
              <div style="display: flex; justify-content: flex-end;">
                <div style="width: 320px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.88rem;">
                    <span style="color: #64748b;">المجموع الخاضع للضريبة:</span>
                    <span style="font-weight: 700;">${Number(inv.amount).toLocaleString()} ر.س</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.88rem;">
                    <span style="color: #64748b;">ضريبة القيمة المضافة (15%):</span>
                    <span style="font-weight: 700; color: #2563eb;">${Number(inv.vat).toLocaleString()} ر.س</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; border-top: 2px solid #e2e8f0; padding-top: 0.75rem; font-size: 1.15rem; font-weight: 800; color: #0f172a;">
                    <span>الإجمالي المستحق:</span>
                    <span style="color: #10b981;">${Number(inv.total).toLocaleString()} ر.س</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return '';
  },

  // Detail Drawer Content Generator
  renderDrawerContent: function(type, data) {
    if (type === 'client') {
      return `
        <div class="drawer">
          <div class="drawer-header">
            <div>
              <div style="font-size: 1.2rem; font-weight: 800; color: #0f172a;">${data.name}</div>
              <div style="font-size: 0.82rem; color: #64748b;">${data.type} • ${data.city}</div>
            </div>
            <button class="modal-close-btn" onclick="window.ERP.state.closeDrawer()">${window.ERP.icons.get('x', '', 18)}</button>
          </div>
          <div class="drawer-body">
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin-bottom: 1.5rem;">
              <div class="card" style="padding: 0.75rem; text-align: center;">
                <div style="font-size: 0.72rem; color: #64748b;">قيمة التعاقد</div>
                <div style="font-size: 1.1rem; font-weight: 800; color: #2563eb;">${Number(data.contractValue).toLocaleString()}</div>
                <div style="font-size: 0.65rem; color: #64748b;">ر.س</div>
              </div>
              <div class="card" style="padding: 0.75rem; text-align: center;">
                <div style="font-size: 0.72rem; color: #64748b;">المسدد</div>
                <div style="font-size: 1.1rem; font-weight: 800; color: #10b981;">${Number(data.paidTotal).toLocaleString()}</div>
                <div style="font-size: 0.65rem; color: #64748b;">ر.س</div>
              </div>
              <div class="card" style="padding: 0.75rem; text-align: center;">
                <div style="font-size: 0.72rem; color: #64748b;">المستحق</div>
                <div style="font-size: 1.1rem; font-weight: 800; color: #ef4444;">${Number(data.dueTotal).toLocaleString()}</div>
                <div style="font-size: 0.65rem; color: #64748b;">ر.س</div>
              </div>
            </div>

            <!-- Tabs in Drawer -->
            <div class="tabs-nav">
              <button class="tab-btn active">نظرة عامة</button>
              <button class="tab-btn">المشاريع (${data.activeProjects})</button>
              <button class="tab-btn">الفواتير</button>
              <button class="tab-btn">سجل التواصل</button>
            </div>

            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <div class="card" style="padding: 1rem;">
                <div style="font-weight: 700; margin-bottom: 0.75rem;">بيانات الاتصال والتواصل</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.86rem;">
                  <div><span style="color: #64748b;">المسؤول:</span> <strong style="margin-right: 0.25rem;">${data.contactPerson}</strong></div>
                  <div><span style="color: #64748b;">المدينة:</span> <strong style="margin-right: 0.25rem;">${data.city}</strong></div>
                  <div><span style="color: #64748b;">الهاتف:</span> <span dir="ltr" style="font-weight: 600;">${data.phone}</span></div>
                  <div><span style="color: #64748b;">البريد:</span> <span style="font-weight: 600;">${data.email}</span></div>
                  <div><span style="color: #64748b;">مدير الحساب:</span> <strong>${data.accountManager}</strong></div>
                  <div><span style="color: #64748b;">مرحلة الـ CRM:</span> <span class="badge badge-success">${data.pipelineStage}</span></div>
                </div>
              </div>

              <div class="card" style="padding: 1rem;">
                <div style="font-weight: 700; margin-bottom: 0.5rem;">ملاحظات ونظرة عامة</div>
                <p style="font-size: 0.86rem; line-height: 1.5;">${data.notes}</p>
              </div>

              <div style="display: flex; gap: 0.75rem;">
                <button class="btn btn-primary btn-sm" onclick="window.ERP.state.openModal('new-invoice'); window.ERP.state.closeDrawer();">إصدار فاتورة للعميل</button>
                <button class="btn btn-outline btn-sm">إرسال بريد رسمي</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (type === 'project') {
      return `
        <div class="drawer">
          <div class="drawer-header">
            <div>
              <div style="font-size: 1.2rem; font-weight: 800; color: #0f172a;">${data.title}</div>
              <div style="font-size: 0.82rem; color: #64748b;">كود: ${data.code} • مدير المشروع: ${data.manager}</div>
            </div>
            <button class="modal-close-btn" onclick="window.ERP.state.closeDrawer()">${window.ERP.icons.get('x', '', 18)}</button>
          </div>
          <div class="drawer-body">
            <!-- Progress Box -->
            <div class="card" style="padding: 1.25rem; margin-bottom: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span style="font-weight: 700;">نسبة الإنجاز الكلية للمشروع</span>
                <span style="font-size: 1.2rem; font-weight: 800; color: #2563eb;">${data.progress}%</span>
              </div>
              <div style="background: #f1f5f9; height: 10px; border-radius: 999px; overflow: hidden; margin-bottom: 1rem;">
                <div style="background: #2563eb; width: ${data.progress}%; height: 100%; border-radius: 999px;"></div>
              </div>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 0.75rem;">
                <div>
                  <div style="font-size: 0.72rem; color: #64748b;">الميزانية المعتمدة</div>
                  <div style="font-weight: 700; color: #0f172a;">${Number(data.budget).toLocaleString()} ر.س</div>
                </div>
                <div>
                  <div style="font-size: 0.72rem; color: #64748b;">المصروف الفعلي</div>
                  <div style="font-weight: 700; color: #ef4444;">${Number(data.spent).toLocaleString()} ر.س</div>
                </div>
                <div>
                  <div style="font-size: 0.72rem; color: #64748b;">الإيراد المتوقع</div>
                  <div style="font-weight: 700; color: #10b981;">${Number(data.revenue).toLocaleString()} ر.س</div>
                </div>
              </div>
            </div>

            <div class="card" style="padding: 1rem; margin-bottom: 1rem;">
              <div style="font-weight: 700; margin-bottom: 0.5rem;">الوصف ونطاق العمل</div>
              <p style="font-size: 0.86rem; color: #475569;">${data.description}</p>
            </div>

            <div class="card" style="padding: 1rem;">
              <div style="font-weight: 700; margin-bottom: 0.75rem;">تفاصيل الجدول الزمني والفريق</div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.86rem;">
                <div><span style="color: #64748b;">العميل:</span> <strong>${data.client}</strong></div>
                <div><span style="color: #64748b;">حجم الفريق:</span> <strong>${data.teamCount} مهندسين وكوادر</strong></div>
                <div><span style="color: #64748b;">تاريخ البداية:</span> <span>${data.startDate}</span></div>
                <div><span style="color: #64748b;">تاريخ التسليم:</span> <span>${data.endDate}</span></div>
                <div><span style="color: #64748b;">المهام المنجزة:</span> <span class="badge badge-success">${data.tasksCompleted} من ${data.tasksTotal}</span></div>
                <div><span style="color: #64748b;">الأولوية:</span> <span class="badge badge-warning">${data.priority}</span></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return '';
  }
};
