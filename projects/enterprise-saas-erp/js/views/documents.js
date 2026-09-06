/**
 * Documents & File Management View (الوثائق وإدارة الملفات)
 */

window.ERP = window.ERP || {};
window.ERP.views = window.ERP.views || {};

window.ERP.views.documents = {
  render: function() {
    const docs = window.ERP.mockData.documents;

    return `
      <div class="page-header">
        <div class="page-header-info">
          <div class="page-breadcrumbs">
            <span>الرئيسية</span>
            <span>/</span>
            <span>الأرشيف المؤسسي</span>
            <span>/</span>
            <span style="color: var(--primary); font-weight: 600;">مركز إدارة الملفات</span>
          </div>
          <div class="page-title-row">
            <h1 class="page-title">إدارة الوثائق والملفات والمستندات (DMS)</h1>
            <span class="badge badge-primary">تخزين سحابي مشفر</span>
          </div>
          <div class="page-description">شجرة مجلدات الشركة، حفظ رخص العمل، المخططات الهندسية، العقود الموقعة، والسياسات.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm" onclick="window.ERP.state.showToast('تم تحديث مزامنة الأرشيف السحابي', 'info')">
            ${window.ERP.icons.get('download', '', 16)}
            <span>مزامنة المستندات</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.ERP.state.showToast('تم فتح نافذة رفع ملف جديد', 'info')">
            ${window.ERP.icons.get('plus', '', 16)}
            <span>رفع وثيقة جديدة</span>
          </button>
        </div>
      </div>

      <!-- Main Document Tree & Files Layout -->
      <div style="display: grid; grid-template-columns: 240px 1fr; gap: 1.25rem;">
        <!-- Folder Tree Sidebar -->
        <div class="card" style="padding: 1rem;">
          <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 0.75rem; color: #0f172a;">مجلدات المؤسسة</div>
          <div style="display: flex; flex-direction: column; gap: 0.35rem;">
            <div class="dropdown-item active" style="border-radius: 6px; font-weight: 700;">
              ${window.ERP.icons.get('folder', '', 16)}
              <span>كافة الملفات</span>
            </div>
            <div class="dropdown-item" style="border-radius: 6px;" onclick="window.ERP.state.showToast('تصفية مجلد: المستندات القانونية', 'info')">
              ${window.ERP.icons.get('folder', '', 16)}
              <span>المستندات القانونية</span>
            </div>
            <div class="dropdown-item" style="border-radius: 6px;" onclick="window.ERP.state.showToast('تصفية مجلد: المالية والفواتير', 'info')">
              ${window.ERP.icons.get('folder', '', 16)}
              <span>المالية والفواتير</span>
            </div>
            <div class="dropdown-item" style="border-radius: 6px;" onclick="window.ERP.state.showToast('تصفية مجلد: المشاريع الهندسية', 'info')">
              ${window.ERP.icons.get('folder', '', 16)}
              <span>المشاريع الهندسية</span>
            </div>
            <div class="dropdown-item" style="border-radius: 6px;" onclick="window.ERP.state.showToast('تصفية مجلد: الموارد البشرية', 'info')">
              ${window.ERP.icons.get('folder', '', 16)}
              <span>الموارد البشرية</span>
            </div>
            <div class="dropdown-item" style="border-radius: 6px;" onclick="window.ERP.state.showToast('تصفية مجلد: العقود والاتفاقيات', 'info')">
              ${window.ERP.icons.get('folder', '', 16)}
              <span>العقود والاتفاقيات</span>
            </div>
          </div>
        </div>

        <!-- Files List Table -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              ${window.ERP.icons.get('file-text', '', 18)}
              <span>الملفات المرفوعة حديثاً (${docs.length})</span>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>اسم المستند</th>
                  <th>المجلد</th>
                  <th>حجم الملف</th>
                  <th>تاريخ الرفع</th>
                  <th>قام بالرفع</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                ${docs.map(doc => `
                  <tr>
                    <td>
                      <div style="display: flex; align-items: center; gap: 0.65rem;">
                        <span style="color: var(--primary);">${window.ERP.icons.get('file-text', '', 20)}</span>
                        <strong style="color: #0f172a;">${doc.name}</strong>
                      </div>
                    </td>
                    <td><span class="badge badge-neutral">${doc.folder}</span></td>
                    <td>${doc.size}</td>
                    <td>${doc.updatedAt}</td>
                    <td><strong>${doc.uploader}</strong></td>
                    <td>
                      <div style="display: flex; gap: 0.35rem;">
                        <button class="btn btn-outline btn-sm" onclick="window.ERP.state.showToast('معاينة المستند: ${doc.name}', 'info')">
                          ${window.ERP.icons.get('eye', '', 14)}
                          <span>معاينة</span>
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="window.ERP.state.showToast('بدء تنزيل الملف المشفّر...', 'success')">
                          ${window.ERP.icons.get('download', '', 14)}
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
};
