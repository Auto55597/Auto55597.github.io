/**
 * layer.AI Portal JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

    // Smooth scroll สำหรับ Navigation Links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (navbarHeight + 20);

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                if (this.parentElement.classList.contains('sidebar-group') || this.closest('.docs-sidebar')) {
                    document.querySelectorAll('.docs-sidebar a').forEach(navLink => {
                        navLink.style.color = 'var(--text-muted)';
                        navLink.style.fontWeight = '400';
                    });
                    this.style.color = 'var(--secondary)';
                    this.style.fontWeight = '600';
                }
            }
        });
    });

    // Scroll Spy สำหรับ Sidebar
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const sidebarLink = document.querySelector(`.docs-sidebar a[href="#${id}"]`);

                if (sidebarLink) {
                    document.querySelectorAll('.docs-sidebar a').forEach(link => {
                        link.style.color = 'var(--text-muted)';
                        link.style.borderLeft = 'none';
                        link.style.paddingLeft = '0';
                    });

                    sidebarLink.style.color = 'var(--secondary)';
                    sidebarLink.style.borderLeft = '2px solid var(--secondary)';
                    sidebarLink.style.paddingLeft = '10px';
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.docs-content article').forEach(article => {
        observer.observe(article);
    });
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.nextElementSibling.innerText;
            navigator.clipboard.writeText(code);

            btn.innerText = 'Copied';
            setTimeout(() => btn.innerText = 'Copy', 1500);
        });
    });

});