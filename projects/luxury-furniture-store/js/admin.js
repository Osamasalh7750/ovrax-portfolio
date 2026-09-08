/**
 * منطق لوحة تحكم إدارة المتجر (Store Admin Dashboard)
 * تتيح إضافة وتعديل وحذف المنتجات، إدارة ومتابعة الطلبات، وحساب الإحصائيات
 */

window.adminDashboard = {
  activeTab: 'products',
  editingProductId: null,

  init() {
    this.setupTabs();
    this.refreshAll();
    this.setupFormListeners();
  },

  refreshAll() {
    this.updateKPIs();
    this.renderProductsTable();
    this.renderOrdersTable();
  },

  // ==========================================
  // حساب مؤشرات الأداء والإحصائيات (KPIs)
  // ==========================================
  updateKPIs() {
    const products = getStoredProducts();
    const orders = getStoredOrders();

    // إجمالي المبيعات من الطلبات المسجلة
    const totalSales = orders.reduce((sum, ord) => {
      if (ord.status !== 'ملغي') {
        return sum + (ord.total || 0);
      }
      return sum;
    }, 0);

    // عدد المنتجات منخفضة المخزون (أقل من 8 قطع)
    const lowStockCount = products.filter(p => (p.inStock || 0) <= 7).length;

    const salesElem = document.getElementById('kpiTotalSales');
    const ordersElem = document.getElementById('kpiTotalOrders');
    const productsElem = document.getElementById('kpiTotalProducts');
    const stockElem = document.getElementById('kpiLowStock');

    if (salesElem) salesElem.textContent = `${totalSales.toLocaleString('ar-SA')} ر.س`;
    if (ordersElem) ordersElem.textContent = `${orders.length} طلب`;
    if (productsElem) productsElem.textContent = `${products.length} قطعة`;
    if (stockElem) stockElem.textContent = `${lowStockCount} منتجات`;
  },

  // ==========================================
  // إدارة تبويبات لوحة التحكم
  // ==========================================
  setupTabs() {
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        this.switchTab(targetTab);
      });
    });
  },

  switchTab(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll('.admin-tab-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-tab') === tabId);
    });
    document.querySelectorAll('.admin-tab-panel').forEach(p => {
      p.classList.toggle('active', p.id === `adminPanel_${tabId}`);
    });
  },

  // ==========================================
  // جدول إدارة المنتجات (Products Table)
  // ==========================================
  renderProductsTable(filterQuery = '') {
    const tbody = document.getElementById('adminProductsTableBody');
    if (!tbody) return;

    let products = getStoredProducts();

    if (filterQuery.trim() !== '') {
      const q = filterQuery.toLowerCase().trim();
      products = products.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.id.toString().includes(q)
      );
    }

    if (products.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 40px; color: var(--text-muted);">لا توجد منتجات مطابقة لشرط البحث</td></tr>`;
      return;
    }

    tbody.innerHTML = products.map(product => {
      const img = (product.images && product.images.length > 0) ? product.images[0] : window.FALLBACK_IMAGE;
      const stock = product.inStock || 0;
      let stockClass = 'stock-in';
      let stockLabel = `${stock} قطعة متوفرة`;
      if (stock === 0) {
        stockClass = 'stock-out';
        stockLabel = 'نفذ المخزون';
      } else if (stock <= 7) {
        stockClass = 'stock-low';
        stockLabel = `منخفض (${stock})`;
      }

      return `
        <tr>
          <td><span style="font-weight: 700; color: var(--text-muted);">#${product.id}</span></td>
          <td>
            <div class="admin-prod-cell">
              <img src="${img}" alt="${product.title}" class="admin-prod-thumb" onerror="this.onerror=null; this.src=window.FALLBACK_IMAGE;">
              <div>
                <strong style="display:block; font-size: 0.94rem;">${product.title}</strong>
                <span style="font-size: 0.78rem; color: var(--text-muted);">${product.dimensions ? product.dimensions.split('|')[0] : ''}</span>
              </div>
            </div>
          </td>
          <td><span style="background: #F1F5F9; padding: 4px 10px; border-radius: 6px; font-weight: 600; font-size: 0.84rem;">${product.categoryName}</span></td>
          <td>
            <strong style="color: var(--dark-charcoal); font-size: 1rem;">${product.price.toLocaleString('ar-SA')} ر.س</strong>
            ${product.oldPrice ? `<br><small style="color: var(--text-light); text-decoration: line-through;">${product.oldPrice.toLocaleString('ar-SA')} ر.س</small>` : ''}
          </td>
          <td><span class="stock-status-pill ${stockClass}">${stockLabel}</span></td>
          <td>
            <div class="admin-action-btns">
              <button class="btn-table-action btn-table-edit" title="تعديل بيانات المنتج" onclick="adminDashboard.openEditProductModal(${product.id})">
                <i class="fas fa-pen"></i>
              </button>
              <button class="btn-table-action btn-table-del" title="حذف المنتج" onclick="adminDashboard.deleteProduct(${product.id})">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  // ==========================================
  // جدول إدارة الطلبات (Orders Table)
  // ==========================================
  renderOrdersTable() {
    const tbody = document.getElementById('adminOrdersTableBody');
    if (!tbody) return;

    const orders = getStoredOrders();

    if (orders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 40px; color: var(--text-muted);">لا توجد أي طلبات مسجلة حتى الآن</td></tr>`;
      return;
    }

    tbody.innerHTML = orders.map(order => {
      let statusColor = '#2563EB'; // أزرق
      if (order.status === 'تم التسليم') statusColor = '#059669';
      else if (order.status === 'قيد التوصيل') statusColor = '#D97706';
      else if (order.status === 'ملغي') statusColor = '#DC2626';

      const itemsSummary = (order.items || []).map(i => `${i.title} (${i.quantity})`).join(', ');

      return `
        <tr>
          <td><strong style="color: var(--dark-charcoal);">${order.id}</strong></td>
          <td>
            <div>
              <strong>${order.customerName}</strong>
              <div style="font-size: 0.8rem; color: var(--text-muted); direction: ltr; text-align: right;">${order.phone}</div>
              <small style="color: var(--text-light);">${order.city} - ${order.address}</small>
            </div>
          </td>
          <td style="max-width: 250px;">
            <div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${itemsSummary}">
              ${itemsSummary}
            </div>
            ${order.freeInstallation ? '<span style="font-size: 0.72rem; color: #16A34A; font-weight:700;"><i class="fas fa-tools"></i> طلب تركيب مجاني</span>' : ''}
          </td>
          <td><strong>${(order.total || 0).toLocaleString('ar-SA')} ر.س</strong></td>
          <td><span style="font-size: 0.82rem; color: var(--text-muted);">${order.paymentMethod || 'الدفع عند الاستلام'}</span></td>
          <td>
            <select class="custom-select" style="padding: 5px 8px; font-size: 0.82rem; font-weight: 700; border-color: ${statusColor}; color: ${statusColor};" 
                    onchange="adminDashboard.updateOrderStatus('${order.id}', this.value)">
              <option value="قيد المراجعة" ${order.status === 'قيد المراجعة' ? 'selected' : ''}>قيد المراجعة</option>
              <option value="جاري التجهيز" ${order.status === 'جاري التجهيز' ? 'selected' : ''}>جاري التجهيز</option>
              <option value="قيد التوصيل" ${order.status === 'قيد التوصيل' ? 'selected' : ''}>قيد التوصيل</option>
              <option value="تم التسليم" ${order.status === 'تم التسليم' ? 'selected' : ''}>تم التسليم</option>
              <option value="ملغي" ${order.status === 'ملغي' ? 'selected' : ''}>ملغي</option>
            </select>
          </td>
          <td><small style="color: var(--text-light);">${order.date || ''}</small></td>
        </tr>
      `;
    }).join('');
  },

  updateOrderStatus(orderId, newStatus) {
    let orders = getStoredOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index > -1) {
      orders[index].status = newStatus;
      saveStoredOrders(orders);
      this.updateKPIs();
      showToast(`تم تحديث حالة الطلب ${orderId} إلى: "${newStatus}"`, 'success');
    }
  },

  // ==========================================
  // إضافة وتعديل المنتجات (Product CRUD)
  // ==========================================
  openAddProductModal() {
    this.editingProductId = null;
    const form = document.getElementById('adminProductForm');
    if (form) form.reset();

    document.getElementById('adminModalTitle').textContent = 'إضافة قطعة أثاث جديدة للمتجر';
    const modal = document.getElementById('adminProductModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  openEditProductModal(productId) {
    const products = getStoredProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    this.editingProductId = productId;
    document.getElementById('adminModalTitle').textContent = `تعديل قطعة الأثاث: #${product.id}`;

    document.getElementById('adminProdTitle').value = product.title || '';
    document.getElementById('adminProdCategory').value = product.category || 'living-room';
    document.getElementById('adminProdPrice').value = product.price || '';
    document.getElementById('adminProdOldPrice').value = product.oldPrice || '';
    document.getElementById('adminProdStock').value = product.inStock || 10;
    document.getElementById('adminProdImage').value = (product.images && product.images.length > 0) ? product.images[0] : '';
    document.getElementById('adminProdDimensions').value = product.dimensions || '';
    document.getElementById('adminProdMaterial').value = product.material || '';
    document.getElementById('adminProdDesc').value = product.description || '';

    const modal = document.getElementById('adminProductModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeProductModal() {
    const modal = document.getElementById('adminProductModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
    this.editingProductId = null;
  },

  handleProductSubmit(e) {
    e.preventDefault();
    let products = getStoredProducts();

    const title = document.getElementById('adminProdTitle').value.trim();
    const category = document.getElementById('adminProdCategory').value;
    const price = parseFloat(document.getElementById('adminProdPrice').value);
    const oldPriceVal = document.getElementById('adminProdOldPrice').value;
    const oldPrice = oldPriceVal ? parseFloat(oldPriceVal) : null;
    const inStock = parseInt(document.getElementById('adminProdStock').value) || 10;
    const image = document.getElementById('adminProdImage').value.trim() || window.FALLBACK_IMAGE;
    const dimensions = document.getElementById('adminProdDimensions').value.trim();
    const material = document.getElementById('adminProdMaterial').value.trim();
    const desc = document.getElementById('adminProdDesc').value.trim();

    // الحصول على اسم القسم بالعربية
    const categoryObj = window.CATEGORIES.find(c => c.id === category);
    const categoryName = categoryObj ? categoryObj.name : 'أثاث منزلي';

    if (this.editingProductId) {
      // تعديل منتج موجود
      const idx = products.findIndex(p => p.id === this.editingProductId);
      if (idx > -1) {
        products[idx] = {
          ...products[idx],
          title: title,
          category: category,
          categoryName: categoryName,
          price: price,
          oldPrice: oldPrice,
          inStock: inStock,
          images: [image, ...(products[idx].images ? products[idx].images.slice(1) : [])],
          dimensions: dimensions,
          material: material,
          description: desc
        };
        saveStoredProducts(products);
        showToast(`تم حفظ التعديلات على "${title}" بنجاح`, 'success');
      }
    } else {
      // إضافة منتج جديد
      const maxId = products.reduce((max, p) => Math.max(max, p.id || 0), 0);
      const newProduct = {
        id: maxId + 1,
        title: title,
        category: category,
        categoryName: categoryName,
        price: price,
        oldPrice: oldPrice,
        rating: 5.0,
        reviewsCount: 1,
        images: [image],
        description: desc,
        dimensions: dimensions,
        material: material,
        colors: [
          { name: "اللون القياسي", hex: "#C5A880" }
        ],
        badges: ["توصيل مجاني", "تركيب مجاني", "منتج جديد"],
        features: [
          "توصيل مجاني حتى باب المنزل",
          "تركيب وتجميع مجاني بأيدي فنيين محترفين",
          "ضمان شامل لمدة 5 سنوات"
        ],
        inStock: inStock,
        isFeatured: false,
        isNew: true
      };

      products.unshift(newProduct);
      saveStoredProducts(products);
      showToast(`تمت إضافة المنتج الجديد "${title}" بنجاح إلى المتجر`, 'success');
    }

    this.closeProductModal();
    this.refreshAll();
    renderProducts(); // تحديث واجهة المتجر أيضاً
  },

  deleteProduct(productId) {
    const products = getStoredProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (confirm(`هل أنت متأكد من حذف المنتج: "${product.title}"؟`)) {
      const updated = products.filter(p => p.id !== productId);
      saveStoredProducts(updated);
      this.refreshAll();
      renderProducts();
      showToast('تم حذف المنتج من المتجر بنجاح', 'info');
    }
  },

  // ==========================================
  // إعدادات وتصفير وتصدير البيانات
  // ==========================================
  resetToDefaultData() {
    if (confirm('تنبيه: هل تريد بالتأكيد إعادة ضبط المتجر إلى الـ 50 منتج الافتراضية؟ سيتم مسح أي منتجات مضافة يدوياً.')) {
      saveStoredProducts(window.INITIAL_PRODUCTS);
      this.refreshAll();
      renderProducts();
      showToast('تمت استعادة الـ 50 منتج الافتراضية بنجاح', 'success');
    }
  },

  clearOrders() {
    if (confirm('هل أنت متأكد من مسح جميع سجلات الطلبات القديمة؟')) {
      saveStoredOrders([]);
      this.refreshAll();
      showToast('تم مسح سجل الطلبات بنجاح', 'info');
    }
  },

  exportStoreData() {
    const data = {
      exportedAt: new Date().toISOString(),
      products: getStoredProducts(),
      orders: getStoredOrders()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `furniture-store-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('تم تصدير نسخة احتياطية من بيانات المتجر بصيغة JSON', 'success');
  },

  setupFormListeners() {
    const form = document.getElementById('adminProductForm');
    if (form) {
      form.addEventListener('submit', (e) => this.handleProductSubmit(e));
    }

    const searchInput = document.getElementById('adminProductSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.renderProductsTable(e.target.value);
      });
    }
  }
};

// تهيئة لوحة التحكم عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  if (window.adminDashboard) {
    window.adminDashboard.init();
  }
});
