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

    // 3. 事件委托：处理所有点击交互 (核心修正区)
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;

        const action = target.getAttribute('data-action');
        const product = target.getAttribute('data-product') || '';

        // --- 移动端子菜单切换 (修正后的位置) ---
        if (action === 'toggle-mobile-submenu') {
            const submenu = document.getElementById('mobile-submenu');
            const icon = document.getElementById('submenu-icon');
            if (submenu) {
                const isHidden = submenu.classList.toggle('hidden');
                // 旋转箭头图标 (确保你的图标ID正确)
                if (icon) icon.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        }

        // --- 询价弹窗控制 ---
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

        // --- 移动端主菜单控制 ---
        if (action === 'toggle-mobile-menu') {
            document.getElementById('mobile-menu-content')?.classList.toggle('translate-x-full');
            document.getElementById('mobile-menu-overlay')?.classList.toggle('hidden');
        }
        if (action === 'close-mobile') {
            document.getElementById('mobile-menu-content')?.classList.add('translate-x-full');
            document.getElementById('mobile-menu-overlay')?.classList.add('hidden');
        }

        // --- 返回顶部 ---
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

function openModal(productName = '') {
  const modal = document.getElementById('inquiryModal');
  const main = document.getElementById('main-content') || document.querySelector('main');
  if (!modal) return;

  // --- 优化后的产品预选逻辑 (保持 100% 兼容) ---
  const select = modal.querySelector('#productSelect');
  // 这里的 ID 建议与 HTML 里的隐藏域 ID 对应，若 HTML 里没有此 ID，该行会自动跳过不报错
  const emailSubject = modal.querySelector('input[name="subject"]'); 

  if (select) {
    if (productName) {
      let matched = false;
      const searchName = productName.trim().toLowerCase();
      
      // 循环匹配：支持 Value 匹配或 Text 模糊匹配
      for (let i = 0; i < select.options.length; i++) {
        const option = select.options[i];
        const optValue = option.value.toLowerCase();
        const optText = option.text.toLowerCase();

        // 只要选项的值或文字包含点击的产品名，就选中
        if (optValue.includes(searchName) || optText.includes(searchName)) {
          select.selectedIndex = i;
          matched = true;
          break;
        }
      }

      // 同步更新 Web3Forms 的邮件主题
      if (emailSubject) {
        emailSubject.value = `New Inquiry: ${productName}`;
      }
    } else {
      // 如果没有传参，重置为第一项（General Inquiry）
      select.selectedIndex = 0;
      if (emailSubject) emailSubject.value = "General Inquiry from Website";
    }
  }
  // --- 预选逻辑结束 ---