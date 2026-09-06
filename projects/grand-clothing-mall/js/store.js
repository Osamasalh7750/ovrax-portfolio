/**
 * Grand Clothing Mall - Store & State Management
 * Works seamlessly offline and with file:/// protocol
 */

(function () {
  'use strict';

  // Defensive LocalStorage Helper
  const storage = {
    get: function (key, fallback) {
      try {
        const val = localStorage.getItem('GCM_' + key);
        return val ? JSON.parse(val) : fallback;
      } catch (e) {
        console.warn('LocalStorage unavailable, using fallback', e);
        return fallback;
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem('GCM_' + key, JSON.stringify(value));
      } catch (e) {
        console.warn('LocalStorage save failed', e);
      }
    }
  };

  const Store = {
    // Cart State
    cart: storage.get('cart', []),
    coupon: storage.get('coupon', null),
    deliveryMethod: storage.get('deliveryMethod', 'pickup'), // 'pickup' | 'delivery'

    // Wishlist State
    wishlist: storage.get('wishlist', []),

    // Orders History
    orders: storage.get('orders', []),
    lastOrder: storage.get('lastOrder', null),

    // Active Catalog Filter State
    filters: {
      category: 'all',
      search: '',
      country: 'all',
      factory: 'all',
      minPrice: 0,
      maxPrice: 3000,
      size: 'all',
      color: 'all',
      badge: 'all',
      floor: 'all',
      sortBy: 'featured', // 'featured', 'price-asc', 'price-desc', 'rating', 'newest'
      viewMode: 'grid'    // 'grid' | 'list'
    },

    // Listeners for UI reactivity
    listeners: [],

    subscribe: function (fn) {
      this.listeners.push(fn);
    },

    notify: function (type, data) {
      this.listeners.forEach(fn => fn(type, data));
    },

    // ---------------- CART METHODS ----------------
    addToCart: function (product, size, color, quantity) {
      if (!product) return;
      quantity = parseInt(quantity, 10) || 1;
      size = size || (product.sizes && product.sizes[0]) || 'Standard';
      color = color || (product.colors && product.colors[0].name) || 'Default';

      const existingIndex = this.cart.findIndex(
        item => item.productId === product.id && item.size === size && item.color === color
      );

      if (existingIndex > -1) {
        this.cart[existingIndex].quantity += quantity;
      } else {
        this.cart.push({
          itemId: 'item_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
          productId: product.id,
          product: product,
          size: size,
          color: color,
          quantity: quantity,
          price: product.price
        });
      }

      this.saveCart();
      this.notify('cart_updated', { cart: this.cart, addedProduct: product });
      return true;
    },

    updateCartQuantity: function (itemId, newQty) {
      const item = this.cart.find(i => i.itemId === itemId);
      if (!item) return;

      if (newQty <= 0) {
        this.removeFromCart(itemId);
      } else {
        item.quantity = parseInt(newQty, 10);
        this.saveCart();
        this.notify('cart_updated', { cart: this.cart });
      }
    },

    removeFromCart: function (itemId) {
      this.cart = this.cart.filter(i => i.itemId !== itemId);
      this.saveCart();
      this.notify('cart_updated', { cart: this.cart });
    },

    clearCart: function () {
      this.cart = [];
      this.coupon = null;
      this.saveCart();
      this.notify('cart_updated', { cart: this.cart });
    },

    saveCart: function () {
      storage.set('cart', this.cart);
      storage.set('coupon', this.coupon);
      storage.set('deliveryMethod', this.deliveryMethod);
    },

    getCartCount: function () {
      return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    getCartTotals: function () {
      const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      let discountAmount = 0;
      if (this.coupon) {
        if (this.coupon.type === 'percent') {
          discountAmount = (subtotal * this.coupon.value) / 100;
        } else if (this.coupon.type === 'fixed') {
          discountAmount = this.coupon.value;
        }
      }
      if (discountAmount > subtotal) discountAmount = subtotal;

      const discountedSubtotal = subtotal - discountAmount;
      const vat = discountedSubtotal * 0.15; // 15% VAT in KSA
      const shippingFee = (this.deliveryMethod === 'delivery' && subtotal > 0) ? (subtotal >= 500 ? 0 : 35) : 0;
      const total = discountedSubtotal + vat + shippingFee;

      return {
        subtotal: Math.round(subtotal),
        discount: Math.round(discountAmount),
        vat: Math.round(vat * 100) / 100,
        shipping: shippingFee,
        total: Math.round(total * 100) / 100,
        itemsCount: this.getCartCount()
      };
    },

    applyCoupon: function (code) {
      const cleanCode = (code || '').trim().toUpperCase();
      const validCoupons = {
        'MALL10': { code: 'MALL10', type: 'percent', value: 10, label: 'خصم 10% بمناسبة افتتاح المول' },
        'ELEGANCE20': { code: 'ELEGANCE20', type: 'percent', value: 20, label: 'خصم 20% لعملاء النخبة' },
        'FREE': { code: 'FREE', type: 'fixed', value: 50, label: 'قسيمة مشتريات بقيمة 50 ريال' }
      };

      if (validCoupons[cleanCode]) {
        this.coupon = validCoupons[cleanCode];
        this.saveCart();
        this.notify('coupon_applied', { coupon: this.coupon });
        return { success: true, message: `تم تطبيق الكوبون بنجاح: ${this.coupon.label}` };
      } else {
        return { success: false, message: 'رمز الكوبون غير صحيح أو منتهي الصلاحية. جرّب MALL10 أو ELEGANCE20' };
      }
    },

    removeCoupon: function () {
      this.coupon = null;
      this.saveCart();
      this.notify('coupon_removed');
    },

    setDeliveryMethod: function (method) {
      this.deliveryMethod = method === 'delivery' ? 'delivery' : 'pickup';
      this.saveCart();
      this.notify('delivery_method_changed', { method: this.deliveryMethod });
    },

    // ---------------- WISHLIST METHODS ----------------
    toggleWishlist: function (productId) {
      const index = this.wishlist.indexOf(productId);
      let isAdded = false;
      if (index > -1) {
        this.wishlist.splice(index, 1);
      } else {
        this.wishlist.push(productId);
        isAdded = true;
      }
      storage.set('wishlist', this.wishlist);
      this.notify('wishlist_updated', { wishlist: this.wishlist, productId, isAdded });
      return isAdded;
    },

    isInWishlist: function (productId) {
      return this.wishlist.indexOf(productId) > -1;
    },

    getWishlistProducts: function () {
      const all = (window.MALL_DATA && window.MALL_DATA.products) || [];
      return all.filter(p => this.wishlist.indexOf(p.id) > -1);
    },

    // ---------------- CHECKOUT & ORDERS ----------------
    createOrder: function (orderData) {
      const totals = this.getCartTotals();
      const orderNumber = 'GCM-' + Math.floor(100000 + Math.random() * 900000);
      const newOrder = {
        orderNumber: orderNumber,
        createdAt: new Date().toISOString(),
        customer: orderData.customer,
        deliveryMethod: this.deliveryMethod,
        paymentMethod: orderData.paymentMethod || 'mada',
        pickupStore: orderData.pickupStore || 'الاستلام من البوتيك الرئيسي - الطابق الأول',
        address: orderData.address || '',
        items: [...this.cart],
        totals: totals,
        coupon: this.coupon ? { ...this.coupon } : null,
        status: 'مؤكد وجاهز للتجهيز'
      };

      this.orders.unshift(newOrder);
      this.lastOrder = newOrder;
      storage.set('orders', this.orders);
      storage.set('lastOrder', this.lastOrder);

      // Clear current cart after order
      this.clearCart();
      this.notify('order_created', { order: newOrder });
      return newOrder;
    },

    // ---------------- CATALOG FILTERING ----------------
    setFilter: function (key, value) {
      this.filters[key] = value;
      this.notify('filters_changed', { filters: this.filters });
    },

    resetFilters: function () {
      this.filters = {
        category: 'all',
        search: '',
        country: 'all',
        factory: 'all',
        minPrice: 0,
        maxPrice: 3000,
        size: 'all',
        color: 'all',
        badge: 'all',
        floor: 'all',
        sortBy: 'featured',
        viewMode: this.filters.viewMode || 'grid'
      };
      this.notify('filters_changed', { filters: this.filters });
    },

    getFilteredProducts: function () {
      const all = (window.MALL_DATA && window.MALL_DATA.products) || [];
      const f = this.filters;

      return all.filter(item => {
        // Category Filter
        if (f.category !== 'all' && item.category !== f.category) {
          return false;
        }

        // Country of Origin Filter
        if (f.country !== 'all' && item.factory.country !== f.country) {
          return false;
        }

        // Factory Name Filter
        if (f.factory !== 'all' && item.factory.name !== f.factory) {
          return false;
        }

        // Price Filter
        if (item.price < f.minPrice || item.price > f.maxPrice) {
          return false;
        }

        // Size Filter
        if (f.size !== 'all') {
          if (!item.sizes || !item.sizes.includes(f.size)) {
            return false;
          }
        }

        // Badge Filter
        if (f.badge !== 'all') {
          if (item.badge !== f.badge) return false;
        }

        // Search Query
        if (f.search && f.search.trim() !== '') {
          const query = f.search.trim().toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(query);
          const matchDesc = item.description.toLowerCase().includes(query);
          const matchFactory = item.factory.name.toLowerCase().includes(query);
          const matchCountry = item.factory.country.toLowerCase().includes(query);
          const matchCity = item.factory.city.toLowerCase().includes(query);
          const matchFabric = item.fabric.toLowerCase().includes(query);
          const matchStore = item.mallStore.storeName.toLowerCase().includes(query);
          if (!matchTitle && !matchDesc && !matchFactory && !matchCountry && !matchCity && !matchFabric && !matchStore) {
            return false;
          }
        }

        return true;
      }).sort((a, b) => {
        if (f.sortBy === 'price-asc') return a.price - b.price;
        if (f.sortBy === 'price-desc') return b.price - a.price;
        if (f.sortBy === 'rating') return b.rating - a.rating;
        if (f.sortBy === 'newest') return (b.reviewsCount || 0) - (a.reviewsCount || 0);
        return 0; // Default featured
      });
    }
  };

  // Expose to window
  window.MallStore = Store;
})();
