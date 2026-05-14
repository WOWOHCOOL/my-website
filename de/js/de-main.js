/**
 * WOWOHCOOL.de — German Site Main JavaScript
 *
 * Handles: mobile menu, scroll reveal, inquiry modal (AJAX),
 *          dropdown menus, back to top, certificate marquee.
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
    let lastFocusedBeforeModal = null;
    let modalKeydownHandler = null;

    function getFocusableElements(container) {
        if (!container) return [];
        var selectors = [
            'a[href]',
            'input:not([disabled]):not([type="hidden"])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            'button:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ];
        return Array.from(container.querySelectorAll(selectors.join(',')));
    }

    if (inquiryModal && inquiryTriggers.length) {
        function openModal() {
            inquiryModal.classList.remove('hidden');
            inquiryModal.classList.add('flex');
            inquiryModal.setAttribute('role', 'dialog');
            inquiryModal.setAttribute('aria-modal', 'true');
            inquiryModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';

            lastFocusedBeforeModal = document.activeElement;

            var focusables = getFocusableElements(inquiryModal);
            if (focusables.length) focusables[0].focus();

            // Focus trap + Escape
            if (modalKeydownHandler) {
                document.removeEventListener('keydown', modalKeydownHandler);
            }
            modalKeydownHandler = function(e) {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    closeModal();
                    return;
                }
                if (e.key === 'Tab') {
                    var f = getFocusableElements(inquiryModal);
                    if (!f.length) { e.preventDefault(); return; }
                    var first = f[0], last = f[f.length - 1];
                    if (e.shiftKey && document.activeElement === first) {
                        e.preventDefault(); last.focus();
                    } else if (!e.shiftKey && document.activeElement === last) {
                        e.preventDefault(); first.focus();
                    }
                }
            };
            document.addEventListener('keydown', modalKeydownHandler);
        }

        function closeModal() {
            inquiryModal.classList.add('hidden');
            inquiryModal.classList.remove('flex');
            inquiryModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';

            if (modalKeydownHandler) {
                document.removeEventListener('keydown', modalKeydownHandler);
                modalKeydownHandler = null;
            }

            if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
                lastFocusedBeforeModal.focus();
            }
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
       4. AJAX Form Submission (all DE forms)
       ============================== */
    var deForms = document.querySelectorAll('form[action*="web3forms.com/submit"]');
    deForms.forEach(function(form) {
        if (form.dataset.submitReady) return;
        form.dataset.submitReady = 'true';

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            var submitBtn = form.querySelector('button[type="submit"]');
            if (!submitBtn || submitBtn.disabled) return;

            var redirectUrl = 'https://www.wowohcool.com/de/danke';
            var redirectInput = form.querySelector('input[name="redirect"]');
            if (redirectInput && redirectInput.value) {
                redirectUrl = redirectInput.value;
            }

            var originalText = submitBtn.textContent.trim();

            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
            submitBtn.textContent = 'Wird gesendet...';

            var formData = new FormData(form);
            var data = {};
            formData.forEach(function(value, key) { data[key] = value; });

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(function(res) { return res.json(); })
            .then(function(result) {
                if (result.success) {
                    form.reset();
                    // Replace form content with success message
                    var formInner = form.querySelector('.space-y-3, .space-y-4, .grid');
                    var target = formInner || form;
                    var successMsg = document.createElement('div');
                    successMsg.className = 'text-center py-8';
                    successMsg.innerHTML = '<div class="text-5xl mb-4 text-green-500">&#10004;</div>'
                        + '<h3 class="text-xl font-bold text-green-600 mb-2">Vielen Dank!</h3>'
                        + '<p class="text-slate-500">Ihre Anfrage wurde erfolgreich gesendet.<br>Wir antworten innerhalb von 24 Stunden.</p>'
                        + '<p class="text-xs text-slate-400 mt-4">Weiterleitung...</p>';
                    form.innerHTML = '';
                    form.appendChild(successMsg);

                    setTimeout(function() {
                        window.location.href = redirectUrl;
                    }, 2500);
                } else {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                    submitBtn.textContent = originalText;
                    showFormError(form, result.message || 'Fehler beim Senden. Bitte versuchen Sie es erneut.');
                }
            })
            .catch(function() {
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                submitBtn.textContent = originalText;
                showFormError(form, 'Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung.');
            });
        });
    });

    function showFormError(form, msg) {
        var existing = form.querySelector('.form-error-msg');
        if (existing) existing.remove();
        var err = document.createElement('div');
        err.className = 'form-error-msg bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3 mb-4';
        err.textContent = msg;
        form.insertBefore(err, form.firstChild);
        setTimeout(function() { if (err.parentNode) err.remove(); }, 8000);
    }

    /* ==============================
       5. Dropdown menu hover fix (touch devices)
       ============================== */
    var dropdowns = document.querySelectorAll('.group');
    if (window.innerWidth > 1023) {
        dropdowns.forEach(function(dd) {
            dd.addEventListener('mouseenter', function() {
                var content = dd.querySelector('.dropdown-content');
                if (content) {
                    content.style.opacity = '1';
                    content.style.visibility = 'visible';
                    content.style.transform = 'translateY(0)';
                }
            });
            dd.addEventListener('mouseleave', function() {
                var content = dd.querySelector('.dropdown-content');
                if (content) {
                    content.style.opacity = '0';
                    content.style.visibility = 'hidden';
                    content.style.transform = 'translateY(10px)';
                }
            });
        });
    }

    /* ==============================
       6. Back to Top
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
       7. Certificate Marquee Duplicate
       ============================== */
    var marqueeInner = document.querySelector('.cert-marquee-inner');
    if (marqueeInner) {
        var clone = marqueeInner.cloneNode(true);
        marqueeInner.parentNode.appendChild(clone);
    }

});
