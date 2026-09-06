/**
 * Master Enterprise ERP Orchestrator & Event Controller
 */

window.ERP = window.ERP || {};

window.ERP.app = {
  init: function() {
    this.render();

    // Subscribe to state changes for seamless reactive UI updates
    window.ERP.state.subscribe(() => {
      this.render();
    });

    // Close open dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-menu.active').forEach(m => m.classList.remove('active'));
      }
    });

    console.log('Enterprise ERP SaaS Platform initialized successfully.');
  },

  render: function() {
    const headerSlot = document.getElementById('header-slot');
    const sidebarSlot = document.getElementById('sidebar-slot');
    const mainSlot = document.getElementById('main-view-slot');

    if (headerSlot) {
      headerSlot.innerHTML = window.ERP.components.renderHeader();
    }
    if (sidebarSlot) {
      sidebarSlot.innerHTML = window.ERP.components.renderSidebar();
    }

    if (mainSlot) {
      const viewKey = window.ERP.state.currentView;
      const viewModule = window.ERP.views[viewKey] || window.ERP.views.dashboard;

      mainSlot.innerHTML = viewModule.render ? viewModule.render() : `<div class="card p-4">قيد الإنشاء</div>`;

      if (typeof viewModule.afterRender === 'function') {
        setTimeout(() => viewModule.afterRender(), 50);
      }
    }
  }
};

// Global UI Action Handlers
window.ERP.toggleSidebar = function() {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    const sidebar = document.querySelector('.app-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar && backdrop) {
      const isOpen = sidebar.classList.toggle('mobile-open');
      backdrop.classList.toggle('active', isOpen);
    }
  } else {
    document.body.classList.toggle('sidebar-collapsed');
    window.ERP.state.isSidebarCollapsed = document.body.classList.contains('sidebar-collapsed');
  }
};

window.ERP.closeMobileSidebar = function() {
  const sidebar = document.querySelector('.app-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (sidebar) sidebar.classList.remove('mobile-open');
  if (backdrop) backdrop.classList.remove('active');
};

window.ERP.toggleDropdown = function(dropdownId) {
  event.stopPropagation();
  const menu = document.getElementById(dropdownId);
  const wasOpen = menu ? menu.classList.contains('active') : false;
  
  // Close other open menus
  document.querySelectorAll('.dropdown-menu.active').forEach(m => m.classList.remove('active'));
  
  if (menu && !wasOpen) {
    menu.classList.add('active');
  }
};

window.ERP.calcVat = function(val) {
  const num = parseFloat(val) || 0;
  const vatInput = document.getElementById('inv-vat-input');
  if (vatInput) {
    vatInput.value = (num * 0.15).toFixed(2);
  }
};

window.ERP.handleCreateEmployee = function(form) {
  const data = new FormData(form);
  const newEmp = {
    id: 'emp-' + (window.ERP.mockData.employees.length + 10),
    code: 'EMP-' + (1000 + window.ERP.mockData.employees.length + 1),
    name: data.get('name'),
    avatar: data.get('name').charAt(0),
    position: data.get('position'),
    department: data.get('department'),
    branch: data.get('branch'),
    salary: parseFloat(data.get('salary')) || 15000,
    joinDate: data.get('joinDate') || '2026-09-06',
    status: 'active',
    email: data.get('email'),
    phone: data.get('phone'),
    nationalId: '10' + Math.floor(10000000 + Math.random() * 90000000),
    leavesBalance: 21,
    performanceRating: '95%'
  };
  window.ERP.state.addEmployee(newEmp);
};

window.ERP.handleCreateClient = function(form) {
  const data = new FormData(form);
  const newClient = {
    id: 'cli-' + (window.ERP.mockData.clients.length + 1),
    name: data.get('name'),
    type: data.get('type') || 'مؤسسي',
    contactPerson: data.get('contactPerson'),
    email: data.get('email'),
    phone: data.get('phone'),
    city: data.get('city') || 'الرياض',
    status: 'active',
    accountManager: data.get('accountManager') || 'أ. عمر التميمي',
    contractValue: parseFloat(data.get('contractValue')) || 500000,
    activeProjects: 1,
    paidTotal: 0,
    dueTotal: parseFloat(data.get('contractValue')) || 500000,
    rating: 5,
    pipelineStage: 'عقد جديد',
    notes: 'تمت إضافة العميل حديثاً عبر لوحة الإدخال السريع.'
  };
  window.ERP.state.addClient(newClient);
};

window.ERP.handleCreateInvoice = function(form) {
  const data = new FormData(form);
  const amount = parseFloat(data.get('amount')) || 100000;
  const vat = amount * 0.15;
  const newInv = {
    id: 'INV-2026-00' + (86 + window.ERP.mockData.invoices.length),
    client: data.get('client'),
    project: data.get('project'),
    issueDate: data.get('issueDate') || '2026-09-06',
    dueDate: data.get('dueDate') || '2026-10-06',
    amount: amount,
    vat: vat,
    total: amount + vat,
    status: 'sent',
    statusText: 'مستحقة قريباً',
    notes: data.get('notes') || 'توريد وخدمات معتمدة'
  };
  window.ERP.state.addInvoice(newInv);
};

window.ERP.promptNewTask = function() {
  const title = prompt('أدخل عنوان المهمة الجديدة:', 'مراجعة المخططات الفنية للمشروع');
  if (title && title.trim()) {
    const newTask = {
      id: 'tsk-' + (window.ERP.mockData.tasks.length + 201),
      title: title.trim(),
      description: 'مهمة مستحدثة من لوحة العمل التنفيذية.',
      column: 'new',
      priority: 'high',
      priorityText: 'مرتفعة',
      project: 'الإدارة التنفيذية للمشاريع',
      assignee: window.ERP.state.getCurrentUser().name,
      avatar: window.ERP.state.getCurrentUser().avatar,
      dueDate: '2026-09-18',
      checklist: { done: 0, total: 2 },
      commentsCount: 0
    };
    window.ERP.state.addTask(newTask);
  }
};

window.ERP.moveTaskForward = function(taskId) {
  const task = window.ERP.mockData.tasks.find(t => t.id === taskId);
  if (!task) return;
  const stages = ['new', 'in_progress', 'review', 'completed'];
  const currentIndex = stages.indexOf(task.column);
  if (currentIndex < stages.length - 1) {
    task.column = stages[currentIndex + 1];
    window.ERP.state.showToast(`تم نقل المهمة إلى: ${stages[currentIndex + 1]}`, 'success');
    window.ERP.state.notify();
  } else {
    window.ERP.state.showToast('المهمة مكتملة بالفعل!', 'info');
  }
};

window.ERP.filterEmployees = function(query) {
  const rows = document.querySelectorAll('.table tbody tr');
  rows.forEach(r => {
    const text = r.innerText.toLowerCase();
    r.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
  });
};

window.ERP.filterTasks = function(query) {
  const cards = document.querySelectorAll('.kanban-card');
  cards.forEach(c => {
    const text = c.innerText.toLowerCase();
    c.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
  });
};

window.ERP.handleGlobalSearch = function(query) {
  if (!query || query.trim().length < 2) return;
  const q = query.trim().toLowerCase();
  
  // Search in clients, projects, employees, invoices
  const clientMatch = window.ERP.mockData.clients.find(c => c.name.toLowerCase().includes(q));
  const prjMatch = window.ERP.mockData.projects.find(p => p.title.toLowerCase().includes(q));
  const empMatch = window.ERP.mockData.employees.find(e => e.name.toLowerCase().includes(q));

  if (clientMatch) {
    window.ERP.state.showToast(`تم العثور على العميل: ${clientMatch.name}`, 'info');
    window.ERP.state.setView('crm');
  } else if (prjMatch) {
    window.ERP.state.showToast(`تم العثور على المشروع: ${prjMatch.title}`, 'info');
    window.ERP.state.setView('projects');
  } else if (empMatch) {
    window.ERP.state.showToast(`تم العثور على الموظف: ${empMatch.name}`, 'info');
    window.ERP.state.setView('hr');
  }
};

// Bootstrap when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  window.ERP.app.init();
});
