/**
 * Reactive Application State & UI Dispatcher
 */

window.ERP = window.ERP || {};

window.ERP.state = {
  currentView: 'dashboard',
  currentCompanyId: 'comp-1',
  currentBranchId: 'branch-101',
  currentUserId: 'usr-1',
  activeDrawerEntity: null,
  activeModal: null,
  activeFilter: 'all',
  searchQuery: '',
  isSidebarCollapsed: false,
  isMobileSidebarOpen: false,

  // Listeners
  subscribers: [],

  subscribe: function(callback) {
    this.subscribers.push(callback);
  },

  notify: function() {
    this.subscribers.forEach(cb => cb(this));
  },

  // View Navigation
  setView: function(viewKey, entityData) {
    this.currentView = viewKey;
    if (entityData) {
      this.activeDrawerEntity = entityData;
    }
    // Close any open mobile drawer
    this.isMobileSidebarOpen = false;
    this.notify();
  },

  // Set Company & Branch
  setCompany: function(companyId) {
    this.currentCompanyId = companyId;
    const comp = window.ERP.mockData.companies.find(c => c.id === companyId);
    if (comp && comp.branches.length > 0) {
      this.currentBranchId = comp.branches[0].id;
    }
    this.showToast('تم التبديل إلى: ' + (comp ? comp.name : ''), 'success');
    this.notify();
  },

  setBranch: function(branchId) {
    this.currentBranchId = branchId;
    const comp = this.getCurrentCompany();
    const branch = comp ? comp.branches.find(b => b.id === branchId) : null;
    this.showToast('تم التبديل إلى: ' + (branch ? branch.name : ''), 'success');
    this.notify();
  },

  setUserPersona: function(userId) {
    this.currentUserId = userId;
    const user = window.ERP.mockData.users.find(u => u.id === userId);
    this.showToast('تم تغيير المستخدم التجريبي إلى: ' + (user ? user.name : ''), 'info');
    this.notify();
  },

  // Getters
  getCurrentCompany: function() {
    return window.ERP.mockData.companies.find(c => c.id === this.currentCompanyId) || window.ERP.mockData.companies[0];
  },

  getCurrentBranch: function() {
    const comp = this.getCurrentCompany();
    return (comp && comp.branches.find(b => b.id === this.currentBranchId)) || (comp && comp.branches[0]);
  },

  getCurrentUser: function() {
    return window.ERP.mockData.users.find(u => u.id === this.currentUserId) || window.ERP.mockData.users[0];
  },

  // Modals management
  openModal: function(modalId, context) {
    this.activeModal = { id: modalId, context: context || null };
    const overlay = document.getElementById('app-modal-overlay');
    const container = document.getElementById('modal-content-slot');
    if (overlay && container) {
      container.innerHTML = window.ERP.components.renderModalContent(modalId, context);
      overlay.classList.add('active');
    }
  },

  closeModal: function() {
    this.activeModal = null;
    const overlay = document.getElementById('app-modal-overlay');
    if (overlay) overlay.classList.remove('active');
  },

  // Drawer / Slide-Over details
  openDrawer: function(type, data) {
    this.activeDrawerEntity = { type, data };
    const overlay = document.getElementById('app-drawer-overlay');
    const container = document.getElementById('drawer-content-slot');
    if (overlay && container) {
      container.innerHTML = window.ERP.components.renderDrawerContent(type, data);
      overlay.classList.add('active');
    }
  },

  closeDrawer: function() {
    this.activeDrawerEntity = null;
    const overlay = document.getElementById('app-drawer-overlay');
    if (overlay) overlay.classList.remove('active');
  },

  // Toast Notification System
  showToast: function(message, type) {
    type = type || 'info';
    let stack = document.getElementById('toast-stack');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'toast-stack';
      stack.className = 'toast-stack';
      document.body.appendChild(stack);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconName = 'check-circle';
    if (type === 'danger') iconName = 'alert-triangle';
    if (type === 'warning') iconName = 'clock';

    toast.innerHTML = `
      <div style="color: inherit; display: flex; align-items: center;">
        ${window.ERP.icons.get(iconName, '', 20)}
      </div>
      <div style="flex: 1; font-size: 0.88rem; font-weight: 600; color: #0f172a;">${message}</div>
      <button style="background: none; border: none; cursor: pointer; color: #94a3b8;" onclick="this.parentElement.remove()">
        ${window.ERP.icons.get('x', '', 16)}
      </button>
    `;

    stack.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }
    }, 4000);
  },

  // Action Helpers to mutate mock data live
  addEmployee: function(newEmp) {
    window.ERP.mockData.employees.unshift(newEmp);
    this.closeModal();
    this.showToast('تمت إضافة الموظف الجديد بنجاح', 'success');
    this.notify();
  },

  addClient: function(newClient) {
    window.ERP.mockData.clients.unshift(newClient);
    this.closeModal();
    this.showToast('تمت إضافة العميل الجديد بنجاح', 'success');
    this.notify();
  },

  addProject: function(newPrj) {
    window.ERP.mockData.projects.unshift(newPrj);
    this.closeModal();
    this.showToast('تم إنشاء المشروع بنجاح', 'success');
    this.notify();
  },

  addInvoice: function(newInv) {
    window.ERP.mockData.invoices.unshift(newInv);
    this.closeModal();
    this.showToast('تم إصدار الفاتورة وتجهيزها بنجاح', 'success');
    this.notify();
  },

  addTask: function(newTask) {
    window.ERP.mockData.tasks.unshift(newTask);
    this.closeModal();
    this.showToast('تمت إضافة المهمة إلى لوحة المهام', 'success');
    this.notify();
  },

  approveRequest: function(reqId) {
    const item = window.ERP.mockData.approvals.find(a => a.id === reqId);
    if (item) {
      item.status = 'approved';
      item.currentStage = 'معتمد نهائياً';
      item.stageIndex = item.stages.length;
      this.showToast(`تم اعتماد الطلب ${reqId} بنجاح`, 'success');
      this.notify();
    }
  },

  rejectRequest: function(reqId) {
    const item = window.ERP.mockData.approvals.find(a => a.id === reqId);
    if (item) {
      item.status = 'rejected';
      item.currentStage = 'مرفوض';
      this.showToast(`تم رفض الطلب ${reqId}`, 'danger');
      this.notify();
    }
  }
};
