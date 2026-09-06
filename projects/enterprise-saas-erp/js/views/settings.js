/**
 * System Settings & Configuration View (إعدادات النظام والتهيئة)
 */

window.ERP = window.ERP || {};
window.ERP.views = window.ERP.views || {};

window.ERP.views.settings = {
  render: function() {
    const s = window.ERP.mockData.settings;
    const comp = window.ERP.state.getCurrentCompany();

    return `
      <div class="page-header">
        <div class="page-header-info">
          <div class="page-breadcrumbs">
            <span>الرئيسية</span>
            <span>/</span>
            <span>التحكم بالنظام</span>
            <span>/</span>
            <span style="color: var(--primary); font-weight: 600;">الإعدادات العامة</span>
          </div>
          <div class="page-title-row">
            <h1 class="page-title">إعدادات النظام، الضرائب والنسخ الاحتياطي</h1>
            <span class="badge badge-primary">إصدار ${s.version}</span>
          </div>
          <div class="page-description">تهيئة المتغيرات الأساسية للمنصة، ربط هيئة الزكاة والضريبة، وإدارة النسخ الاحتياطية.</div>
        </div>
        <div class="page-actions">
          <button class="btn btn-outline btn-sm" onclick="window.ERP.state.showToast('تم تنزيل نسخة احتياطية مشفرة كاملة للنظام', 'success')">
            ${window.ERP.icons.get('download', '', 16)}
            <span>تحميل نسخة احتياطية Backup</span>
          </button>
          <button class="btn btn-primary btn-sm" onclick="window.ERP.state.showToast('تم حفظ كافة إعدادات المنظومة بنجاح', 'success')">
            ${window.ERP.icons.get('check', '', 16)}
            <span>حفظ التغييرات</span>
          </button>
        </div>
      </div>

      <!-- Settings Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 1.5rem;">
        <!-- General Organization Configuration -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              ${window.ERP.icons.get('building', '', 18)}
              <span>إعدادات الهوية والمنشأة</span>
            </div>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">اسم المنظومة المعروض</label>
              <input type="text" class="form-control" value="${comp.name}">
            </div>
            <div class="form-group">
              <label class="form-label">العملة الافتراضية للمعاملات</label>
              <input type="text" class="form-control" value="${s.defaultCurrency}">
            </div>
            <div class="form-group">
              <label class="form-label">المنطقة الزمنية الرسمية</label>
              <input type="text" class="form-control" value="${s.timezone}">
            </div>
            <div class="form-check">
              <input type="checkbox" id="wps-check" checked>
              <label for="wps-check">تفعيل الربط التلقائي مع نظام حماية الأجور (WPS / منصة مدد)</label>
            </div>
          </div>
        </div>

        <!-- Tax & E-Invoicing ZATCA Settings -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              ${window.ERP.icons.get('credit-card', '', 18)}
              <span>الفوترة الإلكترونية والضرائب (ZATCA)</span>
            </div>
            <span class="badge badge-success">ربط نشط</span>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">نسبة ضريبة القيمة المضافة (VAT)</label>
              <input type="text" class="form-control" value="15%">
            </div>
            <div class="form-group">
              <label class="form-label">مرحلة الفوترة بهيئة الزكاة والضريبة والجمارك</label>
              <input type="text" class="form-control" value="${s.zatcaEInvoicePhase}" readonly style="background: #f8fafc;">
            </div>
            <div class="form-group">
              <label class="form-label">شهادة التشفير والتوقيع الرقمي (CSID)</label>
              <input type="text" class="form-control" value="CSID-RSA-2048-ACTIVE-VERIFIED" readonly style="background: #f8fafc; font-family: monospace;">
            </div>
            <div class="form-check">
              <input type="checkbox" id="zatca-auto" checked>
              <label for="zatca-auto">إرسال وتضمين الفاتورة تلقائياً لمنصة فاتورة (ZATCA Platform)</label>
            </div>
          </div>
        </div>

        <!-- Security & Access Policy -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              ${window.ERP.icons.get('shield', '', 18)}
              <span>أمن النظام والتحقق الثنائي</span>
            </div>
          </div>
          <div class="card-body">
            <div class="form-check" style="margin-bottom: 0.75rem;">
              <input type="checkbox" id="2fa-enforce" checked>
              <label for="2fa-enforce">إلزام جميع الموظفين بالتحقق الثنائي OTP عبر تطبيق الجوال</label>
            </div>
            <div class="form-check" style="margin-bottom: 0.75rem;">
              <input type="checkbox" id="audit-log-check" checked>
              <label for="audit-log-check">تسجيل كافة الحركات والعمليات المالية في سجل التدقيق غير القابل للتعديل</label>
            </div>
            <div class="form-group" style="margin-top: 1rem;">
              <label class="form-label">مهلة انتهاء الجلسة عند عدم النشاط (دقيقة)</label>
              <input type="number" class="form-control" value="30">
            </div>
          </div>
        </div>

        <!-- Backups & Maintenance -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              ${window.ERP.icons.get('download', '', 18)}
              <span>النسخ الاحتياطي التلقائي والتعافي</span>
            </div>
          </div>
          <div class="card-body">
            <div class="form-check" style="margin-bottom: 0.75rem;">
              <input type="checkbox" id="auto-backup-daily" checked>
              <label for="auto-backup-daily">جدولة نسخ احتياطي سحابي يومي مشفر الساعة 03:00 ص</label>
            </div>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.85rem; font-size: 0.84rem; margin-bottom: 1rem;">
              <div>آخر نسخة احتياطية ناجحة: <strong>اليوم الساعة 03:00 ص</strong></div>
              <div style="color: #64748b; font-size: 0.75rem;">حجم البيانات: 142.8 MB • التشفير: AES-256</div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-outline btn-sm" onclick="window.ERP.state.showToast('جاري استعادة فحص سلامة النسخ السحابية...', 'info')">فحص السلامة</button>
              <button class="btn btn-secondary btn-sm" onclick="window.ERP.state.showToast('تم أخذ نقطة حفظ snapshot لحظية', 'success')">إنشاء نسخة الآن</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
