/**
 * Lightweight Standalone SVG Charts Engine
 * 100% Vector Crisp, zero-dependency, works offline and locally on file:///
 */

window.ERP = window.ERP || {};

window.ERP.charts = {
  // Financial Performance Multi-Line / Area Chart
  renderFinancialChart: function(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const months = ['مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس'];
    const revenues = [420, 510, 480, 620, 590, 710]; // In thousands SAR
    const expenses = [280, 310, 290, 340, 330, 360];
    const profits  = [140, 200, 190, 280, 260, 350];

    const width = 700;
    const height = 240;
    const padding = { top: 25, right: 35, bottom: 35, left: 55 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const maxVal = 800;

    const getX = (i) => padding.left + (i / (months.length - 1)) * chartW;
    const getY = (val) => padding.top + chartH - (val / maxVal) * chartH;

    // Build SVG Path
    const makePath = (arr) => arr.map((v, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)},${getY(v)}`).join(' ');
    const makeArea = (arr) => `${makePath(arr)} L ${getX(arr.length - 1)},${padding.top + chartH} L ${padding.left},${padding.top + chartH} Z`;

    let gridLines = '';
    for (let step = 0; step <= maxVal; step += 200) {
      const y = getY(step);
      gridLines += `
        <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,3"/>
        <text x="${padding.left - 10}" y="${y + 4}" text-anchor="end" font-size="10" fill="#64748b" font-family="inherit">${step}k</text>
      `;
    }

    let xLabels = '';
    months.forEach((m, i) => {
      const x = getX(i);
      xLabels += `<text x="${x}" y="${height - 10}" text-anchor="middle" font-size="11" font-weight="600" fill="#475569" font-family="inherit">${m}</text>`;
    });

    // Revenue dots
    let dots = '';
    revenues.forEach((v, i) => {
      dots += `<circle cx="${getX(i)}" cy="${getY(v)}" r="4" fill="#ffffff" stroke="#2563eb" stroke-width="2.5" />`;
    });
    expenses.forEach((v, i) => {
      dots += `<circle cx="${getX(i)}" cy="${getY(v)}" r="4" fill="#ffffff" stroke="#ef4444" stroke-width="2.5" />`;
    });
    profits.forEach((v, i) => {
      dots += `<circle cx="${getX(i)}" cy="${getY(v)}" r="4" fill="#ffffff" stroke="#10b981" stroke-width="2.5" />`;
    });

    el.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" class="chart-svg" style="width: 100%; height: auto;">
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2563eb" stop-opacity="0.18"/>
            <stop offset="100%" stop-color="#2563eb" stop-opacity="0.0"/>
          </linearGradient>
          <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.15"/>
            <stop offset="100%" stop-color="#10b981" stop-opacity="0.0"/>
          </linearGradient>
        </defs>

        <!-- Grid Lines -->
        ${gridLines}

        <!-- Areas -->
        <path d="${makeArea(revenues)}" fill="url(#revGrad)" />
        <path d="${makeArea(profits)}" fill="url(#profitGrad)" />

        <!-- Lines -->
        <path d="${makePath(revenues)}" fill="none" stroke="#2563eb" stroke-width="2.8" stroke-linecap="round" />
        <path d="${makePath(expenses)}" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4,3" />
        <path d="${makePath(profits)}" fill="none" stroke="#10b981" stroke-width="2.8" stroke-linecap="round" />

        <!-- Points -->
        ${dots}

        <!-- X Axis Labels -->
        ${xLabels}
      </svg>
    `;
  },

  // Project Completion Bar Chart
  renderProjectBarChart: function(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const data = [
      { name: 'مستشفيات الأمل', planned: 100, actual: 74, color: '#2563eb' },
      { name: 'برج السحاب', planned: 100, actual: 68, color: '#0ea5e9' },
      { name: 'أكاديمية المعرفة', planned: 100, actual: 92, color: '#10b981' },
      { name: 'البنية اللوجستية', planned: 100, actual: 26, color: '#f59e0b' }
    ];

    let barsHtml = '';
    data.forEach(item => {
      barsHtml += `
        <div style="margin-bottom: 1.1rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem; font-size: 0.85rem;">
            <span style="font-weight: 700; color: #1e293b;">${item.name}</span>
            <span style="font-weight: 800; color: ${item.color};">${item.actual}%</span>
          </div>
          <div style="background-color: #f1f5f9; height: 10px; border-radius: 999px; overflow: hidden; position: relative;">
            <div style="background-color: ${item.color}; width: ${item.actual}%; height: 100%; border-radius: 999px; transition: width 0.6s ease;"></div>
          </div>
        </div>
      `;
    });

    el.innerHTML = barsHtml;
  },

  // Donut Chart for Expense Categories
  renderExpensesDonut: function(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const items = [
      { label: 'الرواتب والأجور', percent: 62, color: '#2563eb', value: '385,000 ر.س' },
      { label: 'البنية السحابية والتقنية', percent: 14, color: '#0ea5e9', value: '48,500 ر.س' },
      { label: 'الأصول والمعدات', percent: 12, color: '#8b5cf6', value: '46,000 ر.س' },
      { label: 'التسويق والإعلانات', percent: 7, color: '#f59e0b', value: '35,000 ر.س' },
      { label: 'التشغيل والصيانة', percent: 5, color: '#10b981', value: '18,400 ر.س' }
    ];

    let offset = 0;
    const circumference = 2 * Math.PI * 38; // r=38 -> ~238.76

    let segments = '';
    items.forEach(it => {
      const strokeDash = (it.percent / 100) * circumference;
      const strokeOffset = -offset;
      offset += strokeDash;

      segments += `
        <circle cx="50" cy="50" r="38" fill="transparent"
          stroke="${it.color}" stroke-width="15"
          stroke-dasharray="${strokeDash} ${circumference}"
          stroke-dashoffset="${strokeOffset}"
          stroke-linecap="round"
        />
      `;
    });

    let legendHtml = '';
    items.forEach(it => {
      legendHtml += `
        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; padding: 0.35rem 0; border-bottom: 1px dashed #f1f5f9;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background-color: ${it.color}; display: inline-block;"></span>
            <span style="color: #334155; font-weight: 600;">${it.label}</span>
          </div>
          <div style="display: flex; gap: 0.6rem; align-items: center;">
            <span style="font-weight: 700; color: #0f172a;">${it.value}</span>
            <span style="color: #64748b; font-size: 0.75rem;">(${it.percent}%)</span>
          </div>
        </div>
      `;
    });

    el.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
        <div style="position: relative; width: 140px; height: 140px; flex-shrink: 0; margin: 0 auto;">
          <svg viewBox="0 0 100 100" style="transform: rotate(-90deg); width: 100%; height: 100%;">
            ${segments}
          </svg>
          <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
            <span style="font-size: 0.7rem; color: #64748b; font-weight: 600;">إجمالي الصرف</span>
            <span style="font-size: 1rem; font-weight: 800; color: #0f172a;">532,900</span>
            <span style="font-size: 0.65rem; color: #64748b;">ر.س</span>
          </div>
        </div>
        <div style="flex: 1; min-width: 220px;">
          ${legendHtml}
        </div>
      </div>
    `;
  },

  // Sparkline generator helper
  getSparklineSvg: function(values, color, width, height) {
    width = width || 80;
    height = height || 24;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = (max - min) || 1;

    const points = values.map((v, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 6) - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

    return `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
        <polyline points="${points}" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }
};
