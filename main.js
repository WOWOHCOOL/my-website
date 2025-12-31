document.addEventListener('DOMContentLoaded', () => {
    // 1. 自动处理导航高亮
    const currentPath = window.location.pathname.split("/").pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) link.classList.add('active');
    });

    // 2. 滚动显示 (Reveal) & 数字增长 (Counter)
    const observerOptions = { threshold: 0.15 };
    
    const globalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 处理容器闪现
                if (entry.target.classList.contains('reveal')) {
                    entry.target.classList.add('active');
                }
                // 处理数字滚动
                if (entry.target.classList.contains('counter')) {
                    startCounter(entry.target);
                    globalObserver.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);
	// 在 document.addEventListener('click', (e) => { ... }) 内部添加：
if (action === 'toggle-mobile-submenu') {
    const submenu = document.getElementById('mobile-submenu');
    const icon = document.getElementById('submenu-icon');
    if (submenu) {
        const isHidden = submenu.classList.toggle('hidden');
        // 旋转箭头图标
        if (icon) icon.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
    }
}

    document.querySelectorAll('.reveal, .counter').forEach(el => globalObserver.observe(el));

    // 数字滚动逻辑 - 已移除小数点
    function startCounter(el) {
        const target = +el.getAttribute('data-target') || 0;
        let count = 0;
        const speed = target / 50; // 控制滚动速度
        
        const update = () => {
            count += speed;
            if (count < target) {
                el.innerText = Math.floor(count); // 滚动过程中保持整数
                requestAnimationFrame(update);
            } else {
                // 最终显示：如果超过 1000，显示为 5k+ 格式（无小数点）
                if (target >= 1000) {
                    el.innerText = Math.floor(target / 1000) + 'k+';
                } else {
                    el.innerText = target + '+';
                }
            }
        };
        update();
    }

    // 3. 事件委托处理所有点击交互
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;

        const action = target.getAttribute('data-action');
        const product = target.getAttribute('data-product') || '';

        // 询价弹窗控制
        if (action === 'open-modal') {
            const modal = document.getElementById('inquiryModal');
            if (modal) {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                if (product) {
                    const select = modal.querySelector('#productSelect');
                    if (select) select.value = product;
                }
            }
        }
        if (action === 'close-modal') {
            document.getElementById('inquiryModal')?.classList.replace('flex', 'hidden');
        }

        // 移动端菜单控制
        if (action === 'toggle-mobile-menu') {
            document.getElementById('mobile-menu-content')?.classList.toggle('translate-x-full');
            document.getElementById('mobile-menu-overlay')?.classList.toggle('hidden');
        }
        if (action === 'close-mobile') {
            document.getElementById('mobile-menu-content')?.classList.add('translate-x-full');
            document.getElementById('mobile-menu-overlay')?.classList.add('hidden');
        }

        // 返回顶部
        if (action === 'scroll-to-top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // 4. 返回顶部按钮显示逻辑
    window.addEventListener('scroll', () => {
        const btn = document.getElementById('backToTop');
        if (btn) {
            if (window.scrollY > 600) btn.classList.add('show');
            else btn.classList.remove('show');
        }
    }, { passive: true });
});