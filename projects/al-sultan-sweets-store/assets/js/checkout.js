/**
 * صفحة إتمام الطلب، إرسال الطلب عبر واتساب، وتوليد الفاتورة
 * Checkout & Order Dispatch Engine
 */

function renderCheckoutSummary() {
  const items = Cart.getItems();
  const totals = Cart.calculateTotals();
  const checkoutItemsList = document.getElementById('checkoutItemsList');
  
  if (checkoutItemsList) {
    if (items.length === 0) {
      checkoutItemsList.innerHTML = `<p style="color: var(--text-muted); text-align: center;">لا توجد أصناف في السلة للطلب.</p>`;
    } else {
      checkoutItemsList.innerHTML = items.map(item => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border-color);">
          <div>
            <h5 style="font-size: 0.95rem; font-weight: 700;">${item.name} (${item.quantity}×)</h5>
            <small style="color: var(--text-muted);">${item.weight}</small>
          </div>
          <span style="font-weight: 800; color: var(--primary);">${(item.price * item.quantity).toFixed(2)} ${STORE_CONFIG.currency}</span>
        </div>
      `).join('');
    }
  }

  // تحديث القيم الرقمية
  const subtotalEl = document.getElementById('chkSubtotal');
  const discountEl = document.getElementById('chkDiscount');
  const deliveryEl = document.getElementById('chkDelivery');
  const vatEl = document.getElementById('chkVat');
  const grandTotalEl = document.getElementById('chkGrandTotal');

  if (subtotalEl) subtotalEl.textContent = `${totals.subtotal.toFixed(2)} ${STORE_CONFIG.currency}`;
  if (discountEl) discountEl.textContent = `-${totals.discount.toFixed(2)} ${STORE_CONFIG.currency}`;
  if (deliveryEl) deliveryEl.textContent = totals.delivery === 0 ? 'مجاني 🎉' : `${totals.delivery.toFixed(2)} ${STORE_CONFIG.currency}`;
  if (vatEl) vatEl.textContent = `${totals.vat.toFixed(2)} ${STORE_CONFIG.currency}`;
  if (grandTotalEl) grandTotalEl.textContent = `${totals.grandTotal.toFixed(2)} ${STORE_CONFIG.currency}`;
}

// إنشاء رسالة الواتساب الرسمية وتوجيه المستخدم
function processWhatsAppOrder() {
  const items = Cart.getItems();
  if (items.length === 0) {
    showToast('السلة فارغة! أضف بعض الحلويات أولاً', 'error');
    return;
  }

  const name = document.getElementById('custName')?.value.trim() || 'عميل كريم';
  const phone = document.getElementById('custPhone')?.value.trim() || 'غير محدد';
  const city = document.getElementById('custCity')?.value.trim() || 'الرياض';
  const address = document.getElementById('custAddress')?.value.trim() || 'توصيل للمنزل';
  const notes = document.getElementById('custNotes')?.value.trim() || 'لا توجد ملاحظات خاصة';
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'الدفع عند الاستلام';

  const totals = Cart.calculateTotals();
  const orderNum = 'SLT-' + Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleDateString('ar-SA');

  let text = `👑 *طلب جديد من متجر حلويات السلطان الفاخرة* 👑\n`;
  text += `━━━━━━━━━━━━━━━━━━━\n`;
  text += `📦 *رقم الطلب:* #${orderNum}\n`;
  text += `📅 *التاريخ:* ${orderDate}\n\n`;
  
  text += `👤 *بيانات العميل:*\n`;
  text += `▫️ *الاسم:* ${name}\n`;
  text += `▫️ *الهاتف:* ${phone}\n`;
  text += `▫️ *المدينة:* ${city}\n`;
  text += `▫️ *العنوان:* ${address}\n`;
  text += `▫️ *طريقة الدفع:* ${paymentMethod}\n`;
  if (notes !== 'لا توجد ملاحظات خاصة') {
    text += `▫️ *ملاحظات:* ${notes}\n`;
  }
  text += `\n🛍️ *تفاصيل الطلب:*\n`;

  items.forEach((item, idx) => {
    text += `${idx + 1}. *${item.name}*\n`;
    text += `   الحجم: ${item.weight} | الكمية: ${item.quantity} | السعر: ${(item.price * item.quantity).toFixed(2)} ${STORE_CONFIG.currency}\n`;
  });

  text += `\n━━━━━━━━━━━━━━━━━━━\n`;
  text += `💰 *المجموع الفرعي:* ${totals.subtotal.toFixed(2)} ${STORE_CONFIG.currency}\n`;
  if (totals.discount > 0) {
    text += `🎁 *الخصم (${totals.couponCode}):* -${totals.discount.toFixed(2)} ${STORE_CONFIG.currency}\n`;
  }
  text += `🚚 *رسوم التوصيل:* ${totals.delivery === 0 ? 'مجاني' : totals.delivery + ' ' + STORE_CONFIG.currency}\n`;
  text += `🧾 *ضريبة القيمة المضافة (15%):* ${totals.vat.toFixed(2)} ${STORE_CONFIG.currency}\n`;
  text += `⭐️ *الإجمالي النهائي:* *${totals.grandTotal.toFixed(2)} ${STORE_CONFIG.currency}*\n`;
  text += `━━━━━━━━━━━━━━━━━━━\n`;
  text += `شكراً لاختياركم حلويات السلطان! نتطلع لخدمتكم بأشهى مذاق. ✨`;

  const waUrl = `https://wa.me/${STORE_CONFIG.whatsappFormatted}?text=${encodeURIComponent(text)}`;
  
  // فتح الواتساب
  window.open(waUrl, '_blank');

  // إظهار نافذة تأكيد الطلب والفاتورة
  showOrderSuccessModal(orderNum, name, totals);
}

// تأكيد الطلب وتوليد الفاتورة المطبوعة
function processDirectOrder(e) {
  if (e) e.preventDefault();
  const items = Cart.getItems();
  if (items.length === 0) {
    showToast('السلة فارغة! أضف بعض الحلويات أولاً', 'error');
    return;
  }

  const name = document.getElementById('custName')?.value.trim();
  const phone = document.getElementById('custPhone')?.value.trim();
  const address = document.getElementById('custAddress')?.value.trim();

  if (!name || !phone || !address) {
    showToast('يرجى ملء كافة الحقول الأساسية (الاسم، الجوال، العنوان)', 'error');
    return;
  }

  const totals = Cart.calculateTotals();
  const orderNum = 'SLT-' + Math.floor(100000 + Math.random() * 900000);
  showOrderSuccessModal(orderNum, name, totals);
}

function showOrderSuccessModal(orderNum, customerName, totals) {
  const modal = document.getElementById('orderSuccessModal');
  if (!modal) return;

  const invoiceItems = Cart.getItems().map(item => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name} <small>(${item.weight})</small></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: left;">${(item.price * item.quantity).toFixed(2)} ${STORE_CONFIG.currency}</td>
    </tr>
  `).join('');

  modal.innerHTML = `
    <div class="modal-content" style="max-width: 600px; padding: 30px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="width: 70px; height: 70px; background: rgba(45, 138, 78, 0.15); color: var(--pistachio); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 16px;">
          <i class="fas fa-check"></i>
        </div>
        <h2 style="color: var(--primary-dark); font-size: 1.6rem; font-weight: 800;">تم استلام طلبك بنجاح!</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem;">شكراً لك يا <strong>${customerName}</strong>، جاري تجهيز حلوياتك الفاخرة بحب وإتقان.</p>
      </div>

      <div id="printableInvoice" style="background: #fff; border: 1px dashed var(--gold); border-radius: var(--radius-md); padding: 20px; margin-bottom: 20px; color: #333;">
        <div style="display: flex; justify-content: space-between; border-bottom: 2px solid var(--gold); padding-bottom: 12px; margin-bottom: 12px;">
          <div>
            <h3 style="color: var(--primary); font-size: 1.1rem; font-weight: 800;">حلويات السلطان الفاخرة</h3>
            <small style="color: #666;">فاتورة ضريبية مبسطة</small>
          </div>
          <div style="text-align: left;">
            <strong style="color: #333;">#${orderNum}</strong><br>
            <small style="color: #666;">${new Date().toLocaleDateString('ar-SA')}</small>
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; margin-bottom: 14px;">
          <thead>
            <tr style="background: #faf6f0;">
              <th style="padding: 8px; text-align: right;">الصنف</th>
              <th style="padding: 8px; text-align: center;">الكمية</th>
              <th style="padding: 8px; text-align: left;">المجموع</th>
            </tr>
          </thead>
          <tbody>
            ${invoiceItems}
          </tbody>
        </table>

        <div style="border-top: 1px solid #eee; padding-top: 10px; font-size: 0.9rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>المجموع الفرعي:</span>
            <span>${totals.subtotal.toFixed(2)} ${STORE_CONFIG.currency}</span>
          </div>
          ${totals.discount > 0 ? `
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px; color: var(--pistachio);">
              <span>خصم الكوبون (${totals.couponCode}):</span>
              <span>-${totals.discount.toFixed(2)} ${STORE_CONFIG.currency}</span>
            </div>
          ` : ''}
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>التوصيل:</span>
            <span>${totals.delivery === 0 ? 'مجاني' : totals.delivery + ' ' + STORE_CONFIG.currency}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span>ضريبة القيمة المضافة (15%):</span>
            <span>${totals.vat.toFixed(2)} ${STORE_CONFIG.currency}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 1.1rem; color: var(--primary); border-top: 2px solid var(--primary); padding-top: 6px;">
            <span>الإجمالي المستحق:</span>
            <span>${totals.grandTotal.toFixed(2)} ${STORE_CONFIG.currency}</span>
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <button class="btn btn-outline" style="flex: 1;" onclick="window.print()">
          <i class="fas fa-print"></i> طباعة الفاتورة
        </button>
        <button class="btn btn-primary" style="flex: 1;" onclick="Cart.clearCart(); window.location.href='index.html'">
          <i class="fas fa-home"></i> العودة للرئيسية
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  renderCheckoutSummary();
});
