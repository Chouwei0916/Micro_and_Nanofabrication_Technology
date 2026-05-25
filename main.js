/**
 * main.js — Tab路由、KPI数字动画、UI交互
 */

// ============================================================
// Tab 切换
// ============================================================
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // 从URL hash恢复Tab
    const hash = window.location.hash.replace('#', '');
    const defaultTab = hash && document.getElementById(`tab-${hash}`) ? hash : 'overview';

    function switchTab(tabId) {
        tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
        tabContents.forEach(c => c.classList.toggle('active', c.id === `tab-${tabId}`));
        window.location.hash = tabId;
        initChartsForTab(tabId);
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // 初始加载
    switchTab(defaultTab);

    // 浏览器前进/后退
    window.addEventListener('hashchange', function() {
        const newHash = window.location.hash.replace('#', '');
        if (newHash && document.getElementById(`tab-${newHash}`)) {
            switchTab(newHash);
        }
    });
}

// ============================================================
// KPI 数字滚动动画
// ============================================================
function animateKPIs() {
    const kpiElements = document.querySelectorAll('.kpi-value');
    if (kpiElements.length === 0) return;

    kpiElements.forEach(el => {
        if (!el.dataset.target) return; // 跳过无 data-target 的静态文本卡片
        const target = parseFloat(el.dataset.target);
        const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
        const unit = el.dataset.unit || '';
        const duration = 1200;
        const startTime = performance.now();

        function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            const current = target * eased;

            if (decimals > 0) {
                el.textContent = current.toFixed(decimals) + unit;
            } else {
                el.textContent = Math.round(current) + unit;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = (decimals > 0 ? target.toFixed(decimals) : target) + unit;
            }
        }

        requestAnimationFrame(update);
    });
}

// ============================================================
// 参考文献筛选
// ============================================================
function initRefFilter() {
    const filterBtns = document.querySelectorAll('.ref-filter-btn');
    const refItems = document.querySelectorAll('.ref-item');

    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const cat = this.dataset.cat;

            refItems.forEach(item => {
                if (cat === '全部' || item.dataset.cat === cat) {
                    item.style.display = '';
                    item.style.animation = 'fadeIn 0.3s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ============================================================
// 回到顶部
// ============================================================
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > window.innerHeight) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================================
// 导出PDF
// ============================================================
function initExportPDF() {
    const btn = document.getElementById('btn-export');
    if (!btn) return;

    btn.addEventListener('click', function() {
        // 导出前展开所有折叠面板
        const allDetails = document.querySelectorAll('details');
        const wasOpen = [];
        allDetails.forEach(d => { wasOpen.push(d.open); d.open = true; });
        window.print();
        // 恢复
        allDetails.forEach((d, i) => { d.open = wasOpen[i]; });
    });
}

// ============================================================
// 启动
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    animateKPIs();
    initRefFilter();
    initBackToTop();
    initExportPDF();
});
