document.addEventListener('DOMContentLoaded', () => {
    // === 1. 自动处理导航高亮 ===
    const currentPath = window.location.pathname.split("/").pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) link.classList.add('active');
    });

    // === 2. 滚动显示 (Reveal) & 数字增长 (Counter) ===
    const observerOptions = { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // 提前一点触发，体验更顺滑
    };
    
    const globalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 处理容器显现
                if (entry.target.classList.contains('reveal')) {
                    entry.target.classList.add('active');
                    globalObserver.unobserve(entry.target); 
                }
                // 处理数字滚动
                if (entry.target.classList.contains('counter')) {
                    startCounter(entry.target);
                    globalObserver.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    // 初始化观察器 (确保在页面加载后立即扫描)
    document.querySelectorAll('.reveal, .counter').forEach(el => globalObserver.observe(el));

    // 数字滚动逻辑
    function startCounter(el) {
        const target = +el.getAttribute('data-target') || 0;
        const duration = 1500;
        const startTime = performance.now();
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const count = Math.floor(progress * target);
            if (progress < 1) {
                el.innerText = count;
                requestAnimationFrame(update);
            } else {
                el.innerText = target >= 1000 ? Math.floor(target / 1000) + 'k+' : target + '+';
            }
        };
        requestAnimationFrame(update);
    }

    // === 3. 统一点击事件委托 (核心交互区) ===
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;

        const action = target.getAttribute('data-action');
        const productName = target.getAttribute('data-product') || '';

        // --- 移动端主菜单 (针对点击消失的修复) ---
        if (action === 'toggle-mobile-menu') {
            const menuContent = document.getElementById('mobile-menu-content');
            const overlay = document.getElementById('mobile-menu-overlay');
            if (menuContent && overlay) {
                const isHidden = menuContent.classList.contains('translate-x-full');
                if (isHidden) {
                    menuContent.classList.replace('translate-x-full', 'translate-x-0');
                    overlay.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                } else {
                    menuContent.classList.replace('translate-x-0', 'translate-x-full');
                    overlay.classList.add('hidden');
                    document.body.style.overflow = '';
                }
            }
        }

        // --- 移动端子菜单 (针对不反应/旋转的修复) ---
        if (action === 'toggle-mobile-submenu') {
            e.preventDefault();
            const submenu = document.getElementById('mobile-submenu');
            const icon = target.querySelector('.submenu-icon') || document.getElementById('submenu-icon');
            if (submenu) {
                const isHidden = submenu.classList.toggle('hidden');
                if (icon) icon.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        }

        // --- 询价弹窗控制 (整合自动填单逻辑) ---
        if (action === 'open-modal') {
            const modal = document.getElementById('inquiryModal');
            if (modal) {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                document.body.style.overflow = 'hidden';

                // 自动预选产品
                if (productName) {
                    const select = modal.querySelector('#productSelect');
                    const emailSubject = modal.querySelector('input[name="subject"]');
                    
                    if (select) {
                        let matched = false;
                        const searchName = productName.trim().toLowerCase();
                        for (let i = 0; i < select.options.length; i++) {
                            const opt = select.options[i];
                            if (opt.value.toLowerCase().includes(searchName) || opt.text.toLowerCase().includes(searchName)) {
                                select.selectedIndex = i;
                                matched = true;
                                break;
                            }
                        }
                        // 如果下拉框没匹配到型号，直接填入值
                        if (!matched) select.value = productName;
                    }
                    if (emailSubject) emailSubject.value = `New Inquiry: ${productName}`;
                }
            }
        }

        // --- 关闭所有 (弹窗/菜单) ---
        if (action === 'close-modal' || action === 'close-mobile') {
            document.getElementById('inquiryModal')?.classList.replace('flex', 'hidden');
            document.getElementById('mobile-menu-content')?.classList.replace('translate-x-0', 'translate-x-full');
            document.getElementById('mobile-menu-overlay')?.classList.add('hidden');
            document.body.style.overflow = '';
        }

        // --- 返回顶部 ---
        if (action === 'scroll-to-top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // === 4. 其它辅助逻辑 ===
    window.addEventListener('scroll', () => {
        const btn = document.getElementById('backToTop');
        if (btn) {
            if (window.scrollY > 600) btn.classList.add('show');
            else btn.classList.remove('show');
        }
    }, { passive: true });
});

/**
 * 兼容旧版的全局调用函数
 */
function openModal(productName = '') {
    const btn = document.createElement('button');
    btn.setAttribute('data-action', 'open-modal');
    btn.setAttribute('data-product', productName);
    btn.style.display = 'none';
    document.body.appendChild(btn);
    btn.click();
    btn.remove();
}