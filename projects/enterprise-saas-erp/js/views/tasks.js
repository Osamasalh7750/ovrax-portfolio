/**
 * Tasks Management View (Kanban Board - إدارة المهام)
 */

window.ERP = window.ERP || {};
window.ERP.views = window.ERP.views || {};

window.ERP.views.tasks = {
  columns: [
    { key: 'new', title: 'مهام جديدة', color: '#64748b' },
    { key: 'in_progress', title: 'قيد التنفيذ', color: '#2563eb' },
    { key: 'review', title: 'مراجعة وتدقيق', color: '#f59e0b' },
    { key: 'completed', title: 'مكتملة ومسلمة', color: '#10b981' }
  ],

  render: function() {
    const tasks = window.ERP.mockData.tasks;

    return `
      <div class="page-header">
        <div class="page-header-info">
          <div class="page-breadcrumbs">
            <span>الرئيسية</span>
            <span>/</span>
            <span>إدارة العمليات</span>
            <span>/</span>
            <span style="color: var(--primary); font-weight: 600;">لوحة كانبان</span>
          </div>
          <div class="page-title-row">
            <h1 class="page-title">لوحة متابعة وإنجاز المهام (Kanban Board)</h1>
            <span class="badge badge-primary">${tasks.length} مهام نشطة</span>
          </div>
          <div class="page-description">تتبع مراحل تنفيذ المهام، المواعيد النهائية، الفرق المسند إليها، وقوائم الفحص Checklist.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm" onclick="window.ERP.state.setView('projects')">
            ${window.ERP.icons.get('briefcase', '', 16)}
            <span>المشاريع المرتبطة</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.ERP.promptNewTask()">
            ${window.ERP.icons.get('plus', '', 16)}
            <span>إضافة مهمة جديدة</span>
          </button>
        </div>
      </div>

      <!-- Kanban Toolbar -->
      <div class="card" style="margin-bottom: 1.25rem;">
        <div class="card-body" style="padding: 0.85rem 1.25rem;">
          <div class="table-toolbar" style="margin-bottom: 0;">
            <div class="table-search">
              <div class="input-with-icon">
                <span class="input-icon">${window.ERP.icons.get('search', '', 15)}</span>
                <input type="text" class="form-control form-control-sm" placeholder="تصفية المهام بالعنوان أو المسؤول..." oninput="window.ERP.filterTasks(this.value)">
              </div>
            </div>
            <div class="table-filters">
              <span style="font-size: 0.8rem; color: #64748b; font-weight: 600;">تصفية حسب الأولوية:</span>
              <button class="btn btn-outline btn-sm" onclick="window.ERP.state.showToast('عرض كافة الأولويات', 'info')">الكل</button>
              <button class="btn btn-danger-outline btn-sm" onclick="window.ERP.state.showToast('تصفية المهام العاجلة فقط', 'warning')">عاجل جداً</button>
              <button class="btn btn-outline btn-sm" onclick="window.ERP.state.showToast('تصفية مهام المشاريع الكبرى', 'info')">مهام المشاريع</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Kanban Columns Container -->
      <div class="kanban-board">
        ${this.columns.map(col => {
          const colTasks = tasks.filter(t => t.column === col.key);
          return `
            <div class="kanban-column">
              <div class="kanban-column-header">
                <div class="kanban-column-title">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background-color: ${col.color}; display: inline-block;"></span>
                  <span>${col.title}</span>
                </div>
                <span class="badge badge-neutral">${colTasks.length}</span>
              </div>
              <div class="kanban-cards-list">
                ${colTasks.map(task => `
                  <div class="kanban-card">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem;">
                      <span class="badge badge-${task.priority === 'urgent' ? 'danger' : (task.priority === 'high' ? 'warning' : 'neutral')}" style="font-size: 0.68rem;">
                        ${task.priorityText}
                      </span>
                      <div class="dropdown">
                        <button style="background: none; border: none; cursor: pointer; color: #94a3b8;" onclick="window.ERP.moveTaskForward('${task.id}')" title="نقل إلى المرحلة التالية">
                          ${window.ERP.icons.get('chevron-left', '', 14)}
                        </button>
                      </div>
                    </div>
                    <div class="kanban-card-title">${task.title}</div>
                    <div class="kanban-card-desc">${task.description}</div>
                    
                    <div style="font-size: 0.75rem; font-weight: 600; color: #2563eb; margin-bottom: 0.5rem;">
                      ${task.project}
                    </div>

                    <div class="kanban-card-meta">
                      <div style="display: flex; align-items: center; gap: 0.35rem;">
                        <span class="avatar avatar-sm" style="width: 22px; height: 22px; font-size: 0.65rem;">${task.avatar}</span>
                        <span>${task.assignee}</span>
                      </div>
                      <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.72rem;">
                        <span style="color: ${task.priority === 'urgent' ? '#ef4444' : '#64748b'}; font-weight: 600;">
                          ${task.dueDate}
                        </span>
                        <span class="badge badge-neutral" style="font-size: 0.65rem;">
                          ${task.checklist.done}/${task.checklist.total}
                        </span>
                      </div>
                    </div>
                  </div>
                `).join('')}

                ${colTasks.length === 0 ? `
                  <div style="text-align: center; padding: 2rem 1rem; color: #94a3b8; font-size: 0.82rem;">
                    لا توجد مهام في هذه المرحلة
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
};
