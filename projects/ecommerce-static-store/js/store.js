/**
 * إدارة الحالة والتخزين المحلي (State & LocalStorage Manager)
 * متوافق بالكامل مع تشغيل file:// دون أي خوادم
 */

const Store = {
    KEYS: {
        PRODUCTS: 'elite_store_products',
        CATEGORIES: 'elite_store_categories',
        ORDERS: 'elite_store_orders',
        COUPONS: 'elite_store_coupons',
        SETTINGS: 'elite_store_settings',
        CART: 'elite_store_cart',
        WISHLIST: 'elite_store_wishlist',
        THEME: 'elite_store_theme'
    },

    init() {
        if (!localStorage.getItem(this.KEYS.PRODUCTS)) {
            localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
        }
        if (!localStorage.getItem(this.KEYS.CATEGORIES)) {
            localStorage.setItem(this.KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
        }
        if (!localStorage.getItem(this.KEYS.ORDERS)) {
            localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(DEFAULT_ORDERS));
        }
        if (!localStorage.getItem(this.KEYS.COUPONS)) {
            localStorage.setItem(this.KEYS.COUPONS, JSON.stringify(DEFAULT_COUPONS));
        }
        if (!localStorage.getItem(this.KEYS.SETTINGS)) {
            localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
        }
        if (!localStorage.getItem(this.KEYS.CART)) {
            localStorage.setItem(this.KEYS.CART, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.KEYS.WISHLIST)) {
            localStorage.setItem(this.KEYS.WISHLIST, JSON.stringify([]));
        }
    },

    getProducts() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.PRODUCTS)) || [];
        } catch(e) {
            return DEFAULT_PRODUCTS;
        }
    },

    getProductById(id) {
        if (!id) return null;
        return this.getProducts().find(p => p.id === id);
    },

    saveProducts(products) {
        localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(products));
        window.dispatchEvent(new CustomEvent('products-updated'));
    },

    addProduct(productData) {
        const products = this.getProducts();
        const newProduct = Object.assign({
            id: 'prod-' + Date.now(),
            rating: 5.0,
            reviewsCount: 1,
            badge: productData.badge || 'جديد',
            featured: Boolean(productData.featured)
        }, productData);
        products.unshift(newProduct);
        this.saveProducts(products);
        return newProduct;
    },

    updateProduct(id, updatedData) {
        const products = this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = Object.assign({}, products[index], updatedData);
            this.saveProducts(products);
            return products[index];
        }
        return null;
    },

    deleteProduct(id) {
        let products = this.getProducts();
        products = products.filter(p => p.id !== id);
        this.saveProducts(products);
        this.removeFromCart(id);
    },

    getCategories() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.CATEGORIES)) || DEFAULT_CATEGORIES;
        } catch(e) {
            return DEFAULT_CATEGORIES;
        }
    },

    addCategory(catData) {
        const categories = this.getCategories();
        const newCat = Object.assign({
            id: 'cat-' + Date.now()
        }, catData);
        categories.push(newCat);
        localStorage.setItem(this.KEYS.CATEGORIES, JSON.stringify(categories));
        return newCat;
    },

    deleteCategory(catId) {
        let categories = this.getCategories();
        categories = categories.filter(c => c.id !== catId);
        localStorage.setItem(this.KEYS.CATEGORIES, JSON.stringify(categories));
    },

    getOrders() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.ORDERS)) || [];
        } catch(e) {
            return DEFAULT_ORDERS;
        }
    },

    getOrderById(id) {
        if (!id) return null;
        return this.getOrders().find(o => o.id.toLowerCase() === id.trim().toLowerCase());
    },

    getOrdersByPhone(phone) {
        if (!phone) return [];
        const cleaned = phone.replace(/\s+/g, '');
        return this.getOrders().filter(o => o.customer && o.customer.phone && o.customer.phone.replace(/\s+/g, '').includes(cleaned));
    },

    addOrder(orderData) {
        const orders = this.getOrders();
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const newOrder = Object.assign({
            id: 'ORD-' + randomNum,
            date: new Date().toISOString(),
            status: 'pending'
        }, orderData);
        orders.unshift(newOrder);
        localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(orders));

        const products = this.getProducts();
        orderData.items.forEach(item => {
            const prod = products.find(p => p.id === item.id);
            if (prod && prod.stock > 0) {
                prod.stock = Math.max(0, prod.stock - item.quantity);
            }
        });
        this.saveProducts(products);

        return newOrder;
    },

    updateOrderStatus(orderId, newStatus) {
        const orders = this.getOrders();
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
            localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(orders));
            return order;
        }
        return null;
    },

    getCoupons() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.COUPONS)) || DEFAULT_COUPONS;
        } catch(e) {
            return DEFAULT_COUPONS;
        }
    },

    addCoupon(coupon) {
        const coupons = this.getCoupons();
        coupons.push(coupon);
        localStorage.setItem(this.KEYS.COUPONS, JSON.stringify(coupons));
        return coupon;
    },

    deleteCoupon(code) {
        let coupons = this.getCoupons();
        coupons = coupons.filter(c => c.code !== code);
        localStorage.setItem(this.KEYS.COUPONS, JSON.stringify(coupons));
    },

    validateCoupon(code, subtotal) {
        if (!code) return { valid: false, message: 'يرجى إدخال كود الخصم' };
        const cleanCode = code.trim().toUpperCase();
        const coupon = this.getCoupons().find(c => c.code.toUpperCase() === cleanCode && c.active);
        
        if (!coupon) {
            return { valid: false, message: 'كود الخصم غير صالح أو منتهي الصلاحية' };
        }
        if (subtotal < coupon.minSpend) {
            return { valid: false, message: 'الحد الأدنى لاستخدام هذا الكوبون هو ' + coupon.minSpend + ' ر.س' };
        }
        const discountAmount = (subtotal * coupon.discountPercent) / 100;
        return {
            valid: true,
            coupon,
            discountAmount,
            message: 'تم تطبيق الخصم (' + coupon.discountPercent + '%) بنجاح!'
        };
    },

    getCart() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.CART)) || [];
        } catch(e) {
            return [];
        }
    },

    saveCart(cart) {
        localStorage.setItem(this.KEYS.CART, JSON.stringify(cart));
        window.dispatchEvent(new CustomEvent('cart-updated', { detail: { cart } }));
    },

    addToCart(productId, quantity, options) {
        quantity = quantity || 1;
        options = options || {};
        const cart = this.getCart();
        const product = this.getProductById(productId);
        if (!product) return { success: false, message: 'المنتج غير متوفر' };

        const existingItem = cart.find(item => item.productId === productId);
        if (existingItem) {
            const newQty = existingItem.quantity + quantity;
            if (newQty > product.stock) {
                return { success: false, message: 'عذراً، أقصى كمية متاحة في المخزون هي ' + product.stock };
            }
            existingItem.quantity = newQty;
        } else {
            if (quantity > product.stock) {
                return { success: false, message: 'عذراً، الكمية المتوفرة في المخزون هي ' + product.stock };
            }
            cart.push(Object.assign({
                productId,
                quantity,
                addedAt: Date.now()
            }, options));
        }
        this.saveCart(cart);
        return { success: true, message: 'تمت إضافة ' + product.name + ' إلى السلة بنجاح' };
    },

    updateCartQuantity(productId, quantity) {
        let cart = this.getCart();
        const product = this.getProductById(productId);
        if (!product) return;

        if (quantity <= 0) {
            this.removeFromCart(productId);
            return;
        }

        const item = cart.find(i => i.productId === productId);
        if (item) {
            item.quantity = Math.min(quantity, product.stock);
            this.saveCart(cart);
        }
    },

    removeFromCart(productId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.productId !== productId);
        this.saveCart(cart);
    },

    clearCart() {
        this.saveCart([]);
    },

    getCartCount() {
        return this.getCart().reduce((sum, item) => sum + item.quantity, 0);
    },

    calculateTotals(appliedCouponCode) {
        appliedCouponCode = appliedCouponCode || '';
        const cart = this.getCart();
        const products = this.getProducts();
        const settings = this.getSettings();

        let subtotal = 0;
        const detailedItems = [];

        cart.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                const itemTotal = product.price * item.quantity;
                subtotal += itemTotal;
                detailedItems.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    oldPrice: product.oldPrice,
                    image: product.image,
                    quantity: item.quantity,
                    total: itemTotal
                });
            }
        });

        let discount = 0;
        let couponInfo = null;
        if (appliedCouponCode) {
            const val = this.validateCoupon(appliedCouponCode, subtotal);
            if (val.valid) {
                discount = val.discountAmount;
                couponInfo = val.coupon;
            }
        }

        const shipping = (subtotal >= settings.freeShippingThreshold || subtotal === 0) ? 0 : settings.standardShippingCost;
        const taxableAmount = Math.max(0, subtotal - discount);
        const tax = (taxableAmount * (settings.taxRate / 100));
        const grandTotal = taxableAmount + shipping + tax;

        return {
            items: detailedItems,
            subtotal,
            discount,
            couponInfo,
            shipping,
            tax,
            grandTotal,
            isFreeShipping: shipping === 0 && subtotal > 0,
            freeShippingThreshold: settings.freeShippingThreshold
        };
    },

    getWishlist() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.WISHLIST)) || [];
        } catch(e) {
            return [];
        }
    },

    toggleWishlist(productId) {
        let list = this.getWishlist();
        const exists = list.includes(productId);
        if (exists) {
            list = list.filter(id => id !== productId);
        } else {
            list.push(productId);
        }
        localStorage.setItem(this.KEYS.WISHLIST, JSON.stringify(list));
        window.dispatchEvent(new CustomEvent('wishlist-updated', { detail: { list } }));
        return !exists;
    },

    isInWishlist(productId) {
        return this.getWishlist().includes(productId);
    },

    getSettings() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.SETTINGS)) || DEFAULT_SETTINGS;
        } catch(e) {
            return DEFAULT_SETTINGS;
        }
    },

    updateSettings(newSettings) {
        const current = this.getSettings();
        const updated = Object.assign({}, current, newSettings);
        localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(updated));
        return updated;
    },

    getAnalytics() {
        const orders = this.getOrders();
        const products = this.getProducts();

        let totalRevenue = 0;
        let completedOrders = 0;
        let pendingOrders = 0;

        orders.forEach(ord => {
            if (ord.status !== 'cancelled') {
                totalRevenue += (ord.total || 0);
            }
            if (ord.status === 'delivered') completedOrders++;
            if (ord.status === 'pending') pendingOrders++;
        });

        const lowStockProducts = products.filter(p => p.stock <= 5);
        const outOfStockCount = products.filter(p => p.stock === 0).length;

        const chartData = [
            { day: 'السبت', sales: 3200 },
            { day: 'الأحد', sales: 4850 },
            { day: 'الإثنين', sales: 2900 },
            { day: 'الثلاثاء', sales: 6100 },
            { day: 'الأربعاء', sales: 5400 },
            { day: 'الخميس', sales: 7800 },
            { day: 'الجمعة', sales: 9200 }
        ];

        return {
            totalRevenue: Math.round(totalRevenue),
            ordersCount: orders.length,
            completedOrders,
            pendingOrders,
            productsCount: products.length,
            lowStockCount: lowStockProducts.length,
            lowStockProducts,
            outOfStockCount,
            chartData
        };
    },

    exportAllData() {
        const dump = {
            version: '2.0',
            exportedAt: new Date().toISOString(),
            products: this.getProducts(),
            categories: this.getCategories(),
            orders: this.getOrders(),
            coupons: this.getCoupons(),
            settings: this.getSettings()
        };
        return JSON.stringify(dump, null, 2);
    },

    importAllData(jsonStr) {
        try {
            const data = JSON.parse(jsonStr);
            if (data.products && Array.isArray(data.products)) {
                localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(data.products));
            }
            if (data.categories && Array.isArray(data.categories)) {
                localStorage.setItem(this.KEYS.CATEGORIES, JSON.stringify(data.categories));
            }
            if (data.orders && Array.isArray(data.orders)) {
                localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(data.orders));
            }
            if (data.coupons && Array.isArray(data.coupons)) {
                localStorage.setItem(this.KEYS.COUPONS, JSON.stringify(data.coupons));
            }
            if (data.settings && typeof data.settings === 'object') {
                localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(data.settings));
            }
            return { success: true, message: 'تم استيراد كافة البيانات بنجاح!' };
        } catch(e) {
            return { success: false, message: 'خطأ في معالجة ملف البيانات: تنسيق غير صحيح.' };
        }
    },

    resetToDefault() {
        localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
        localStorage.setItem(this.KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
        localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(DEFAULT_ORDERS));
        localStorage.setItem(this.KEYS.COUPONS, JSON.stringify(DEFAULT_COUPONS));
        localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
        localStorage.setItem(this.KEYS.CART, JSON.stringify([]));
        localStorage.setItem(this.KEYS.WISHLIST, JSON.stringify([]));
    }
};

Store.init();
