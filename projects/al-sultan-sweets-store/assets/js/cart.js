/**
 * إدارة سلة المشتريات وقائمة المفضلة وكوبونات الخصم
 * Cart & Wishlist Store Manager
 */

const Cart = {
  // جلب عناصر السلة من التخزين المحلي
  getItems: function() {
    return JSON.parse(localStorage.getItem('sultan_cart')) || [];
  },

  // حفظ السلة
  saveItems: function(items) {
    localStorage.setItem('sultan_cart', JSON.stringify(items));
    this.updateCounters();
  },

  // إضافة منتج إلى السلة
  addItem: function(productId, weightOption = null, quantity = 1) {
    const product = SWEETS_DATA.find(p => p.id === productId);
    if (!product) return;

    const items = this.getItems();
    const selectedWeight = weightOption || product.weightOptions[0];
    const unitPrice = product.weightsPricing[selectedWeight] || product.price;

    const existingIndex = items.findIndex(item => item.id === productId && item.weight === selectedWeight);

    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        image: product.image,
        categoryName: product.categoryName,
        weight: selectedWeight,
        price: unitPrice,
        quantity: quantity
      });
    }

    this.saveItems(items);
    this.renderDrawer();
    if (typeof showToast === 'function') {
      showToast(`تمت إضافة "${product.name}" إلى السلة بنجاح 🍰`, 'success');
    }
  },

  // تحديث كمية منتج
  updateQuantity: function(index, newQty) {
    const items = this.getItems();
    if (newQty <= 0) {
      items.splice(index, 1);
    } else {
      items[index].quantity = newQty;
    }
    this.saveItems(items);
    this.renderDrawer();
    if (window.location.pathname.includes('cart.html') || window.location.pathname.includes('checkout.html')) {
      if (typeof renderCartPage === 'function') renderCartPage();
    }
  },

  // حذف منتج من السلة
  removeItem: function(index) {
    const items = this.getItems();
    items.splice(index, 1);
    this.saveItems(items);
    this.renderDrawer();
    if (typeof renderCartPage === 'function') renderCartPage();
    if (typeof showToast === 'function') {
      showToast('تم حذف المنتج من السلة', 'error');
    }
  },

  // تفريغ السلة كاملة
  clearCart: function() {
    localStorage.removeItem('sultan_cart');
    localStorage.removeItem('sultan_coupon');
    this.updateCounters();
    this.renderDrawer();
    if (typeof renderCartPage === 'function') renderCartPage();
  },

  // حساب المجموع الإجمالي والخصومات
  calculateTotals: function() {
    const items = this.getItems();
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // فحص الكوبون
    const couponCode = localStorage.getItem('sultan_coupon');
    let discount = 0;
    let couponInfo = null;

    if (couponCode && COUPONS[couponCode]) {
      couponInfo = COUPONS[couponCode];
      discount = (subtotal * couponInfo.discountPercent) / 100;
    }

    const subtotalAfterDiscount = subtotal - discount;
    const delivery = subtotal >= STORE_CONFIG.freeDeliveryThreshold || subtotal === 0 ? 0 : STORE_CONFIG.deliveryFee;
    const vat = subtotalAfterDiscount * STORE_CONFIG.vatRate;
    const grandTotal = subtotalAfterDiscount + delivery + vat;

    return {
      subtotal,
      discount,
      couponCode,
      couponInfo,
      delivery,
      vat,
      grandTotal,
      itemsCount: items.reduce((cnt, item) => cnt + item.quantity, 0)
    };
  },

  // تطبيق كود خصم
  applyCoupon: function(code) {
    const cleanCode = code.trim().toUpperCase();
    if (COUPONS[cleanCode]) {
      localStorage.setItem('sultan_coupon', cleanCode);
      if (typeof showToast === 'function') {
        showToast(`تم تطبيق الكود ${cleanCode} بنجاح! خصم ${COUPONS[cleanCode].discountPercent}% 🎉`, 'success');
      }
      this.renderDrawer();
      if (typeof renderCartPage === 'function') renderCartPage();
      return true;
    } else {
      if (typeof showToast === 'function') {
        showToast('كود الخصم غير صالح أو منتهي الصلاحية ❌', 'error');
      }
      return false;
    }
  },

  // إزالة كود الخصم
  removeCoupon: function() {
    localStorage.removeItem('sultan_coupon');
    if (typeof showToast === 'function') {
      showToast('تمت إزالة كود الخصم', 'info');
    }
    this.renderDrawer();
    if (typeof renderCartPage === 'function') renderCartPage();
  },

  // تحديث عدادات السلة والمفضلة في الهيدر
  updateCounters: function() {
    const totals = this.calculateTotals();
    const cartCountEls = document.querySelectorAll('.cart-count');
    cartCountEls.forEach(el => el.textContent = totals.itemsCount);

    const wishlist = Wishlist.getItems();
    const wishCountEls = document.querySelectorAll('.wishlist-count');
    wishCountEls.forEach(el => el.textContent = wishlist.length);
  },

  // رسم السلة الجانبية (Cart Drawer)
  renderDrawer: function() {
    const drawerBody = document.getElementById('cartDrawerBody');
    const drawerSubtotal = document.getElementById('drawerSubtotal');
    if (!drawerBody) return;

    const items = this.getItems();
    const totals = this.calculateTotals();

    if (items.length === 0) {
      drawerBody.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
          <i class="fas fa-shopping-basket" style="font-size: 3.5rem; color: #d0c7cb; margin-bottom: 16px;"></i>
          <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 8px;">سلتك فارغة حالياً</h4>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">استكشف تشكيلة حلوياتنا الشهية وأضف ما يعجبك!</p>
          <a href="shop.html" class="btn btn-primary" style="font-size: 0.9rem;">تصفح المتجر الآن</a>
        </div>
      `;
      if (drawerSubtotal) drawerSubtotal.textContent = `0 ${STORE_CONFIG.currency}`;
      return;
    }

    let html = '';
    items.forEach((item, index) => {
      html += `
        <div class="cart-item">
          <button class="remove-cart-item" onclick="Cart.removeItem(${index})" title="حذف">
            <i class="fas fa-times"></i>
          </button>
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-weight"><i class="fas fa-weight-hanging"></i> ${item.weight}</div>
            <div class="cart-item-bottom">
              <span class="cart-item-price">${(item.price * item.quantity).toFixed(2)} ${STORE_CONFIG.currency}</span>
              <div class="qty-controls">
                <button class="qty-btn" onclick="Cart.updateQuantity(${index}, ${item.quantity - 1})">-</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn" onclick="Cart.updateQuantity(${index}, ${item.quantity + 1})">+</button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    drawerBody.innerHTML = html;
    if (drawerSubtotal) {
      drawerSubtotal.textContent = `${totals.grandTotal.toFixed(2)} ${STORE_CONFIG.currency}`;
    }
  }
};

// --- إدارة قائمة المفضلة (Wishlist) ---
const Wishlist = {
  getItems: function() {
    return JSON.parse(localStorage.getItem('sultan_wishlist')) || [];
  },

  toggleItem: function(productId) {
    let items = this.getItems();
    const index = items.indexOf(productId);
    const product = SWEETS_DATA.find(p => p.id === productId);

    if (index > -1) {
      items.splice(index, 1);
      if (typeof showToast === 'function') {
        showToast(`تمت إزالة "${product ? product.name : ''}" من المفضلة`, 'error');
      }
    } else {
      items.push(productId);
      if (typeof showToast === 'function') {
        showToast(`تمت إضافة "${product ? product.name : ''}" إلى المفضلة ❤️`, 'success');
      }
    }

    localStorage.setItem('sultan_wishlist', JSON.stringify(items));
    Cart.updateCounters();
    
    // تحديث أيقونات القلب النشطة
    document.querySelectorAll(`[data-fav-id="${productId}"]`).forEach(btn => {
      btn.classList.toggle('active', items.includes(productId));
    });

    if (window.location.pathname.includes('wishlist.html') && typeof renderWishlistPage === 'function') {
      renderWishlistPage();
    }
  },

  hasItem: function(productId) {
    return this.getItems().includes(productId);
  }
};

// تهيئة أولية
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateCounters();
  Cart.renderDrawer();
});
