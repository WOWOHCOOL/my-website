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
                // 处理容器闪现 (Reveal)
                if (entry.target.classList.contains('reveal')) {
                    entry.target.classList.add('active');
                    // 触发后停止观察，提升性能
                    globalObserver.unobserve(entry.target); 
                }
                // 处理数字滚动 (Counter)
                if (entry.target.classList.contains('counter')) {
                    startCounter(entry.target);
                    globalObserver.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    // 绑定观察器
    document.querySelectorAll('.reveal, .counter').forEach(el => globalObserver.observe(el));

    // 数字滚动逻辑 - 强制整数，无小数点
    function startCounter(el) {
        const target = +el.getAttribute('data-target') || 0;
        let count = 0;
        const duration = 1500; // 动画持续1.5秒
        const startTime = performance.now();
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            count = Math.floor(progress * target);
            
            if (progress < 1) {
                el.innerText = count;
                requestAnimationFrame(update);
            } else {
                // 最终显示逻辑
                if (target >= 1000) {
                    el.innerText = Math.floor(target / 1000) + 'k+';
                } else {
                    el.innerText = target + '+';
                }
            }
        };
        requestAnimationFrame(update);
    }

    // 3. 事件委托：处理所有点击交互
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;

        const action = target.getAttribute('data-action');
        const productName = target.getAttribute('data-product') || '';

        // --- 统一询价弹窗控制 ---
        if (action === 'open-modal') {
            const modal = document.getElementById('inquiryModal');
            if (!modal) return;

            // 显示弹窗
            modal.classList.remove('hidden');
            modal.classList.add('flex');

            // 执行产品预选与邮件主题同步 (整合了原 openModal 的逻辑)
            const select = modal.querySelector('#productSelect');
            const emailSubject = modal.querySelector('input[name="subject"]');

            if (select) {
                if (productName) {
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
                    // 如果下拉框没匹配到，也可以直接强制设值（防止 data-product 写错）
                    if (!matched) select.value = productName; 

                    if (emailSubject) emailSubject.value = `New Inquiry: ${productName}`;
                } else {
                    select.selectedIndex = 0;
                    if (emailSubject) emailSubject.value = "General Inquiry from Website";
                }
            }
        }

        if (action === 'close-modal') {
            const modal = document.getElementById('inquiryModal');
            if (modal) modal.classList.replace('flex', 'hidden');
        }

        // ... 移动端菜单控制、返回顶部等代码保持不变 ...
    });
});

// 为了兼容 HTML 中可能存在的 onclick="openModal('...')"，保留此包装函数，但内部调用逻辑统一
function openModal(productName = '') {
    // 模拟点击一个带有 data-product 的虚拟元素来触发上面的统一逻辑
    const mockEvent = {
        target: {
            closest: () => ({
                getAttribute: (attr) => attr === 'data-action' ? 'open-modal' : productName
            })
        }
    };
    // 或者简单点，直接手动触发
    const btn = document.createElement('button');
    btn.setAttribute('data-action', 'open-modal');
    btn.setAttribute('data-product', productName);
    document.body.appendChild(btn);
    btn.click();
    btn.remove();
}