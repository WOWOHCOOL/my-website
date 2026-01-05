/* main.js 优化版 */

document.addEventListener('DOMContentLoaded', () => {
    // === 1. 自动处理导航高亮 ===
    const currentPath = window.location.pathname.split("/").pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) link.classList.add('active');
    });

    // === 2. 滚动显示 (Reveal) & 数字增长 (Counter) ===
    const observerOptions = { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" 
    };
    
    const globalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                // 处理容器显现
                if (target.classList.contains('reveal')) {
                    target.classList.add('active');
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

    // 数字滚动逻辑 (优化性能与显示格式)
    function startCounter(el) {
        const target = +el.getAttribute('data-target') || 0;
        const duration = 1500;
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentCount = Math.floor(progress * target);
            
            if (progress < 1) {
                el.innerText = currentCount;
                window.requestAnimationFrame(step);
            } else {
                // 最终格式化显示
                el.innerText = target >= 1000 ? Math.floor(target / 1000) + 'k+' : target + '+';
            }
        };
        window.requestAnimationFrame(step);
    }

    // === 3. 统一点击事件委托 ===
    document.addEventListener('click', (e) => {
        const targetEl = e.target.closest('[data-action]');
        if (!targetEl) return;

        const action = targetEl.getAttribute('data-action');
        const productName = targetEl.getAttribute('data-product') || '';
        
        const menuContent = document.getElementById('mobile-menu-content');
        const overlay = document.getElementById('mobile-menu-overlay');
        const modal = document.getElementById('inquiryModal');

        // 统一关闭函数（复用逻辑）
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
                // 优化：打开表单时先强制关闭移动端菜单，防止遮挡
                if (menuContent && !menuContent.classList.contains('translate-x-full')) {
                    menuContent.classList.add('translate-x-full');
                    menuContent.classList.remove('translate-x-0');
                    overlay?.classList.add('hidden');
                }

                if (modal) {
                    modal.classList.remove('hidden');
                    modal.classList.add('flex');
                    document.body.style.overflow = 'hidden';

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
                            if (!matched) select.value = productName;
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

    // === 4. 其它辅助逻辑 ===
    // 滚动监听返回顶部按钮 (使用 passive 提高滚动性能)
    window.addEventListener('scroll', () => {
        const btn = document.getElementById('backToTop');
        if (btn) {
            if (window.scrollY > 600) btn.classList.add('show');
            else btn.classList.remove('show');
        }
    }, { passive: true });

    // 处理键盘 ESC 关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('[data-action="close-modal"], [data-action="close-mobile"]')[0]?.click();
        }
    });
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