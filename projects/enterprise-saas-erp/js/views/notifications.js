/**
 * Notifications Center View (مركز الإشعارات والتنبيهات)
 */

window.ERP = window.ERP || {};
window.ERP.views = window.ERP.views || {};

window.ERP.views.notifications = {
  currentTab: 'all',

  render: function() {
    const notifications = window.ERP.mockData.notifications;
    let filtered = notifications;
    if (this.currentTab === 'unread') {
      filtered = notifications.filter(n => n.unread);
    } else if (this.currentTab === 'critical') {
      filtered = notifications.filter(n => n.type === 'danger' || n.type === 'warning');
    }

    return `
      <div class="page-header">
        <div class="page-header-info">
          <div class="page-breadcrumbs">
            <span>الرئيسية</span>
            <span>/</span>
            <span>مركز الاتصال</span>
            <span>/</span>
            <span style="color: var(--primary); font-weight: 600;">سجل الإشعارات الموحد</span>
          </div>
          <div class="page-title-row">
            <h1 class="page-title">مركز الإشعارات والتنبيهات الذكية</h1>
            <span class="badge badge-primary">${notifications.filter(n => n.unread).length} غير مقروء</span>
          </div>
          <div class="page-description">تنبيهات فورية بالفواتير المستحقة، انتهاء العقود، مهام المشاريع، ومسارات الموافقات.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm" onclick="window.ERP.mockData.notifications.forEach(n => n.unread = false); window.ERP.state.showToast('تم تحديد كافة الإشعارات كمقروءة', 'success'); window.ERP.state.notify();">
            ${window.ERP.icons.get('check-circle', '', 16)}
            <span>تحديد الكل كمقروء</span>
          </button>
        </div>
      </div>

      <!-- Notifications Tabs -->
      <div class="tabs-nav">
        <button class="tab-btn ${this.currentTab === 'all' ? 'active' : ''}" onclick="window.ERP.views.notifications.currentTab = 'all'; window.ERP.state.notify();">
          كافة الإشعارات (${notifications.length})
        </button>
        <button class="tab-btn ${this.currentTab === 'unread' ? 'active' : ''}" onclick="window.ERP.views.notifications.currentTab = 'unread'; window.ERP.state.notify();">
          غير مقروءة (${notifications.filter(n => n.unread).length})
        </button>
        <button class="tab-btn ${this.currentTab === 'critical' ? 'active' : ''}" onclick="window.ERP.views.notifications.currentTab = 'critical'; window.ERP.state.notify();">
          التنبيهات الحرجة (${notifications.filter(n => n.type === 'danger' || n.type === 'warning').length})
        </button>
      </div>

      <!-- Notifications List -->
      <div class="card">
        <div style="display: flex; flex-direction: column;">
          ${filtered.map(n => `
            <div class="notification-item ${n.unread ? 'unread' : ''}" style="padding: 1.25rem;" onclick="window.ERP.state.setView('${n.linkView}')">
              <div class="notification-icon-box" style="width: 44px; height: 44px; background: ${n.type === 'danger' ? '#fef2f2' : (n.type === 'warning' ? '#fffbeb' : '#eff6ff')}; color: ${n.type === 'danger' ? '#ef4444' : (n.type === 'warning' ? '#f59e0b' : '#2563eb')};">
                ${window.ERP.icons.get(n.icon, '', 22)}
              </div>
              <div class="notification-details" style="margin-right: 0.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                  <span style="font-weight: 800; font-size: 0.95rem; color: #0f172a;">${n.title}</span>
                  <span class="notification-time">${n.time}</span>
                </div>
                <div style="font-size: 0.88rem; color: #475569; line-height: 1.45; margin-bottom: 0.5rem;">
                  ${n.text}
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span class="badge badge-${n.type === 'danger' ? 'danger' : (n.type === 'warning' ? 'warning' : 'primary')}" style="font-size: 0.72rem;">
                    الانتقال للشاشة المحددة
                  </span>
                  ${n.unread ? '<span class="status-dot" style="background-color: #2563eb;"></span>' : ''}
                </div>
              </div>
            </div>
          `).join('')}

          ${filtered.length === 0 ? `
            <div class="empty-state">
              <div class="empty-state-icon">
                ${window.ERP.icons.get('bell', '', 28)}
              </div>
              <div class="empty-state-title">لا توجد إشعارات حالياً</div>
              <div class="empty-state-text">صندوق التنبيهات فارغ في هذا التصنيف.</div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
};
