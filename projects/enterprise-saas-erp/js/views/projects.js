/**
 * Projects Management View (إدارة المشاريع والمحافظ)
 */

window.ERP = window.ERP || {};
window.ERP.views = window.ERP.views || {};

window.ERP.views.projects = {
  render: function() {
    const projects = window.ERP.mockData.projects;
    const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
    const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
    const totalRevenue = projects.reduce((s, p) => s + p.revenue, 0);

    return `
      <div class="page-header">
        <div class="page-header-info">
          <div class="page-breadcrumbs">
            <span>الرئيسية</span>
            <span>/</span>
            <span>العمليات الهندسية</span>
            <span>/</span>
            <span style="color: var(--primary); font-weight: 600;">محفظة المشاريع</span>
          </div>
          <div class="page-title-row">
            <h1 class="page-title">إدارة المشاريع الهندسية والتقنية (PMO)</h1>
            <span class="badge badge-primary">${projects.length} مشاريع نشطة</span>
          </div>
          <div class="page-description">متابعة نسب الإنجاز الميداني، ميزانيات المشاريع، الصرف الفعلي، والفرق الهندسية المكلفة.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm" onclick="window.ERP.state.setView('tasks')">
            ${window.ERP.icons.get('check-square', '', 16)}
            <span>لوحة المهام المرتبطة</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.ERP.state.showToast('جاري فتح نموذج إنشاء مشروع جديد...', 'info'); window.ERP.state.openDrawer('project', window.ERP.mockData.projects[0]);">
            ${window.ERP.icons.get('plus', '', 16)}
            <span>إنشاء مشروع جديد</span>
          </button>
        </div>
      </div>

      <!-- Financial Portfolio Metrics -->
      <div class="kpi-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">إجمالي ميزانيات المحفظة المعتمدة</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #0f172a; margin: 0.25rem 0;">${Number(totalBudget).toLocaleString()} <span style="font-size: 0.8rem; color: #64748b;">ر.س</span></div>
          <div style="font-size: 0.75rem; color: #2563eb; font-weight: 600;">4 مشاريع كبرى قيد التشغيل</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">المصروف الفعلي حتى تاريخه</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #ef4444; margin: 0.25rem 0;">${Number(totalSpent).toLocaleString()} <span style="font-size: 0.8rem; color: #64748b;">ر.س</span></div>
          <div style="font-size: 0.75rem; color: #10b981; font-weight: 700;">ضمن النطاق التقديري الآمن (62.8%)</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">الإيرادات التعاقدية المتوقعة</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #10b981; margin: 0.25rem 0;">${Number(totalRevenue).toLocaleString()} <span style="font-size: 0.8rem; color: #64748b;">ر.س</span></div>
          <div style="font-size: 0.75rem; color: #10b981; font-weight: 700;">هامش ربحية متوقع +8.1M ر.س</div>
        </div>
        <div class="card" style="padding: 1rem;">
          <div class="text-muted" style="font-size: 0.8rem; font-weight: 600;">المهام المنجزة عبر المشاريع</div>
          <div style="font-size: 1.6rem; font-weight: 800; color: #2563eb; margin: 0.25rem 0;">77 / 123</div>
          <div style="font-size: 0.75rem; color: #64748b;">نسبة اكتمال المهام 62.6%</div>
        </div>
      </div>

      <!-- Projects Grid Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 1.25rem;">
        ${projects.map(prj => `
          <div class="card" style="padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                <span class="badge badge-neutral" style="font-weight: 700;">${prj.code}</span>
                <span class="badge badge-${prj.status === 'review' ? 'success' : 'primary'}">${prj.statusText}</span>
              </div>
              <h3 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 0.4rem; line-height: 1.4;">${prj.title}</h3>
              <div style="font-size: 0.84rem; color: #64748b; margin-bottom: 0.85rem;">العميل: <strong style="color: #334155;">${prj.client}</strong></div>

              <!-- Progress Bar -->
              <div style="margin-bottom: 1.15rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.35rem;">
                  <span style="font-weight: 600; color: #475569;">نسبة الإنجاز الميداني</span>
                  <span style="font-weight: 800; color: #2563eb;">${prj.progress}%</span>
                </div>
                <div style="background: #f1f5f9; height: 8px; border-radius: 999px; overflow: hidden;">
                  <div style="background: #2563eb; width: ${prj.progress}%; height: 100%; border-radius: 999px;"></div>
                </div>
              </div>

              <!-- Budget Stats Strip -->
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem; display: grid; grid-template-columns: 1fr 1fr 1fr; text-align: center; gap: 0.25rem; margin-bottom: 1rem;">
                <div>
                  <div style="font-size: 0.7rem; color: #64748b;">الميزانية</div>
                  <div style="font-size: 0.85rem; font-weight: 700; color: #0f172a;">${(prj.budget / 1000).toLocaleString()}k</div>
                </div>
                <div>
                  <div style="font-size: 0.7rem; color: #64748b;">المصروف</div>
                  <div style="font-size: 0.85rem; font-weight: 700; color: #ef4444;">${(prj.spent / 1000).toLocaleString()}k</div>
                </div>
                <div>
                  <div style="font-size: 0.7rem; color: #64748b;">الإيراد</div>
                  <div style="font-size: 0.85rem; font-weight: 700; color: #10b981;">${(prj.revenue / 1000).toLocaleString()}k</div>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: #64748b; margin-bottom: 0.5rem;">
                <div>مدير المشروع: <strong style="color: #334155;">${prj.manager}</strong></div>
                <div>فريق العمل: <span class="badge badge-neutral">${prj.teamCount} مهندسين</span></div>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem; border-top: 1px solid #e2e8f0; padding-top: 0.85rem; margin-top: 0.5rem;">
              <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="window.ERP.state.openDrawer('project', ${JSON.stringify(prj).replace(/"/g, '&quot;')})">
                ${window.ERP.icons.get('eye', '', 14)}
                <span>تفاصيل المشروع والمهام</span>
              </button>
              <button class="btn btn-outline btn-sm" onclick="window.ERP.state.setView('tasks')">
                ${window.ERP.icons.get('check-square', '', 14)}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
};
