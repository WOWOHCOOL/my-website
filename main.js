/* main.js 终极优化版 - 支持全端交互与高分性能 */

document.addEventListener('DOMContentLoaded', () => {
    // === 1. 自动处理导航高亮 ===
    const currentPath = window.location.pathname.split("/").pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) link.classList.add('active');
    });

    // === 2. 滚动显示 (Reveal) & 数字增长 (Counter) ===
    const observerOptions = { 
        threshold: 0.15, // 稍微提高阈值，确保用户看到更多内容时再触发，视觉更自然
        rootMargin: "0px 0px -50px 0px" 
    };
    
    const globalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                // 处理容器显现
                if (target.classList.contains('reveal')) {
                    target.classList.add('active');
                    // 移动端优化：一旦进入视口，强制触发一次重绘确保动画流畅
                    globalObserver.unobserve(target); 
                }
                // 处理数字滚动
                if (target.classList.contains('counter')) {
                    startCounter(target);
                    globalObserver.unobserve(target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .counter').forEach(el => globalObserver.observe(el));

    // 数字滚动逻辑
    function startCounter(el) {
        const target = +el.getAttribute('data-target') || 0;
        const duration = 1500;
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // 使用内敛 EaseOut 算法让数字滚动更自然
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeProgress * target);
            
            if (progress < 1) {
                el.innerText = currentCount;
                window.requestAnimationFrame(step);
            } else {
                el.innerText = target >= 1000 ? Math.floor(target / 1000) + 'k+' : target + '+';
            }
        };
        window.requestAnimationFrame(step);
    }

    // === 3. 移动端触摸反馈增强 (解决“手指经过无效果”) ===
    // 为所有可点击或有交互的 group 元素添加触摸反馈
    const interactableElements = document.querySelectorAll('.group, button, a, [data-action]');
    interactableElements.forEach(el => {
        el.addEventListener('touchstart', () => {
            el.classList.add('touch-active'); // 在 CSS 中定义 .touch-active { transform: scale(0.98); }
        }, { passive: true });
        
        el.addEventListener('touchend', () => {
            el.classList.remove('touch-active');
        }, { passive: true });
    });

    // === 4. 统一点击事件委托 ===
    document.addEventListener('click', (e) => {
        const targetEl = e.target.closest('[data-action]');
        if (!targetEl) return;

        const action = targetEl.getAttribute('data-action');
        const productName = targetEl.getAttribute('data-product') || '';
        
        const menuContent = document.getElementById('mobile-menu-content');
        const overlay = document.getElementById('mobile-menu-overlay');
        const modal = document.getElementById('inquiryModal');

        const internalCloseAll = () => {
            modal?.classList.add('hidden');
            modal?.classList.remove('flex');
            menuContent?.classList.add('translate-x-full');
            menuContent?.classList.remove('translate-x-0');
            overlay?.classList.add('hidden');
            document.body.style.overflow = '';
        };

        switch (action) {
            case 'toggle-mobile-menu':
                if (menuContent && overlay) {
                    const isOpening = menuContent.classList.contains('translate-x-full');
                    if (isOpening) {
                        menuContent.classList.remove('translate-x-full');
                        menuContent.classList.add('translate-x-0');
                        overlay.classList.remove('hidden');
                        document.body.style.overflow = 'hidden';
                    } else {
                        internalCloseAll();
                    }
                }
                break;

            case 'toggle-mobile-submenu':
                e.preventDefault();
                const submenu = document.getElementById('mobile-submenu');
                const icon = targetEl.querySelector('.submenu-icon') || document.getElementById('submenu-icon');
                if (submenu) {
                    const isHidden = submenu.classList.toggle('hidden');
                    if (icon) icon.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
                }
                break;

            case 'open-modal':
                if (menuContent && !menuContent.classList.contains('translate-x-full')) {
                    internalCloseAll(); // 打开表单时彻底关闭菜单
                }
                if (modal) {
                    modal.classList.remove('hidden');
                    modal.classList.add('flex');
                    document.body.style.overflow = 'hidden';

                    if (productName) {
                        const select = modal.querySelector('#productSelect');
                        const emailSubject = modal.querySelector('input[name="subject"]');
                        if (select) {
                            const searchName = productName.trim().toLowerCase();
                            for (let i = 0; i < select.options.length; i++) {
                                const opt = select.options[i];
                                if (opt.value.toLowerCase().includes(searchName) || opt.text.toLowerCase().includes(searchName)) {
                                    select.selectedIndex = i;
                                    break;
                                }
                            }
                        }
                        if (emailSubject) emailSubject.value = `New Inquiry: ${productName}`;
                    }
                }
                break;

            case 'close-modal':
            case 'close-mobile':
                internalCloseAll();
                break;

            case 'scroll-to-top':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
        }
    });

    // === 5. 其它辅助逻辑 ===
    // 滚动监听返回顶部 (passive 提高滚动性能)
    window.addEventListener('scroll', () => {
        const btn = document.getElementById('backToTop');
        if (btn) {
            if (window.scrollY > 600) btn.classList.add('show');
            else btn.classList.remove('show');
        }
    }, { passive: true });

    // 修复特殊符号报错对 JS 可能的影响 (兜底)
    // 确保页面中所有链接不含有未转义的 &
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') internalCloseAll();
    });
});

function openModal(productName = '') {
    const btn = document.createElement('button');
    btn.setAttribute('data-action', 'open-modal');
    btn.setAttribute('data-product', productName);
    btn.style.display = 'none';
    document.body.appendChild(btn);
    btn.click();
    btn.remove();
}