/**
 * WOWOHCOOL.de — German Site Main JavaScript
 *
 * Lightweight JS for German-specific interactions.
 * Shared functionality (analytics, etc.) from ../main.js is reused.
 */

document.addEventListener('DOMContentLoaded', function() {

    /* ==============================
       1. Mobile Menu
       ============================== */
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');

    if (menuBtn && mobileMenu && mobileOverlay) {
        function openMenu() {
            mobileMenu.classList.remove('translate-x-full');
            mobileOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
        function closeMenu() {
            mobileMenu.classList.add('translate-x-full');
            mobileOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
        menuBtn.addEventListener('click', openMenu);
        if (menuClose) menuClose.addEventListener('click', closeMenu);
        mobileOverlay.addEventListener('click', closeMenu);
        document.querySelectorAll('#mobile-menu a').forEach(function(link) {
            link.addEventListener('click', closeMenu);
        });
    }

    /* ==============================
       2. Scroll Reveal Animations
       ============================== */
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(function(el) {
        revealObserver.observe(el);
    });

    /* ==============================
       3. Inquiry Modal
       ============================== */
    const inquiryModal = document.getElementById('inquiryModal');
    const inquiryTriggers = document.querySelectorAll('[data-trigger="inquiry"]');
    const modalClose = document.getElementById('inquiryModalClose');

    if (inquiryModal && inquiryTriggers.length) {
        function openModal() {
            inquiryModal.classList.remove('hidden');
            inquiryModal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        }
        function closeModal() {
            inquiryModal.classList.add('hidden');
            inquiryModal.classList.remove('flex');
            document.body.style.overflow = '';
        }
        inquiryTriggers.forEach(function(t) {
            t.addEventListener('click', openModal);
        });
        if (modalClose) modalClose.addEventListener('click', closeModal);
        inquiryModal.addEventListener('click', function(e) {
            if (e.target === inquiryModal) closeModal();
        });
    }

    /* ==============================
       4. Dropdown menu hover fix (touch devices)
       ============================== */
    const dropdowns = document.querySelectorAll('.group');
    if (window.innerWidth > 1023) {
        dropdowns.forEach(function(dd) {
            dd.addEventListener('mouseenter', function() {
                const content = dd.querySelector('.dropdown-content');
                if (content) {
                    content.style.opacity = '1';
                    content.style.visibility = 'visible';
                    content.style.transform = 'translateY(0)';
                }
            });
            dd.addEventListener('mouseleave', function() {
                const content = dd.querySelector('.dropdown-content');
                if (content) {
                    content.style.opacity = '0';
                    content.style.visibility = 'hidden';
                    content.style.transform = 'translateY(10px)';
                }
            });
        });
    }

    /* ==============================
       5. Back to Top
       ============================== */
    var backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.classList.remove('show');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ==============================
       6. Certificate Marquee Duplicate
       ============================== */
    const marqueeInner = document.querySelector('.cert-marquee-inner');
    if (marqueeInner) {
        const clone = marqueeInner.cloneNode(true);
        marqueeInner.parentNode.appendChild(clone);
    }

});
