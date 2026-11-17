/* ============================================================
   ANJOLA BOOK EXPOSURE — Main JavaScript
   Amazon Book Marketing Strategist Website
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    // ========================================================
    // 1. ENABLE JS ANIMATIONS
    //    Adds .js-ready to <body> so CSS can activate
    //    fade-in animations. Without JS, content stays visible.
    // ========================================================
    document.body.classList.add("js-ready");


    // ========================================================
    // 2. INTERSECTION OBSERVER — Fade-In Animations
    //    Watches all .fade-in elements and adds .visible
    //    when they scroll into the viewport.
    // ========================================================
    const fadeElements = document.querySelectorAll(".fade-in");

    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target); // animate only once
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        fadeElements.forEach(function (el) {
            fadeObserver.observe(el);
        });
    }


    // ========================================================
    // 3. COUNTER ANIMATION
    //    Counts up from 0 to the value in data-target
    //    when the element scrolls into view.
    // ========================================================
    const counters = document.querySelectorAll(".counter");

    function animateCounter(el) {
        const target = parseInt(el.getAttribute("data-target"), 10);
        if (isNaN(target)) return;

        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic for smooth deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });
    }


    // ========================================================
    // 4. FAQ ACCORDION
    //    Toggles .open on .faq-answer and updates
    //    aria-expanded on the question button.
    // ========================================================
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {
        question.addEventListener("click", function () {
            const answer = this.nextElementSibling;
            const isOpen = answer.classList.contains("open");

            // Close all other open FAQs (optional: remove this block for multi-open)
            document.querySelectorAll(".faq-answer.open").forEach(function (openAnswer) {
                openAnswer.classList.remove("open");
                openAnswer.previousElementSibling.setAttribute("aria-expanded", "false");
                openAnswer.previousElementSibling.classList.remove("active");
            });

            // Toggle current FAQ
            if (!isOpen) {
                answer.classList.add("open");
                this.setAttribute("aria-expanded", "true");
                this.classList.add("active");
            }
        });
    });


    // ========================================================
    // 5. HAMBURGER MOBILE MENU
    //    Toggles .open on .nav-links and .nav-overlay
    //    for the responsive mobile navigation.
    // ========================================================
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    const navOverlay = document.getElementById("navOverlay");

    function toggleMobileMenu() {
        if (!navLinks) return;
        const isOpen = navLinks.classList.contains("open");

        navLinks.classList.toggle("open");
        if (hamburger) hamburger.classList.toggle("active");
        if (navOverlay) navOverlay.classList.toggle("active");

        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? "" : "hidden";
    }

    function closeMobileMenu() {
        if (!navLinks) return;
        navLinks.classList.remove("open");
        if (hamburger) hamburger.classList.remove("active");
        if (navOverlay) navOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (hamburger) {
        hamburger.addEventListener("click", toggleMobileMenu);
    }

    if (navOverlay) {
        navOverlay.addEventListener("click", closeMobileMenu);
    }

    // Close menu when a nav link is clicked
    if (navLinks) {
        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMobileMenu);
        });
    }


    // ========================================================
    // 6. NAVBAR SCROLL EFFECT
    //    Adds .scrolled class to navbar when user scrolls
    //    past 50px for sticky background and shadow.
    // ========================================================
    const navbar = document.getElementById("navbar");

    function handleNavbarScroll() {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleNavbarScroll, { passive: true });
    handleNavbarScroll(); // run once on load


    // ========================================================
    // 7. SCROLL-TO-TOP BUTTON
    //    Shows .scroll-top button when scrolled past 300px,
    //    smooth-scrolls to top on click.
    // ========================================================
    const scrollTopBtn = document.getElementById("scrollTop");

    function handleScrollTopVisibility() {
        if (!scrollTopBtn) return;
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("visible");
        } else {
            scrollTopBtn.classList.remove("visible");
        }
    }

    window.addEventListener("scroll", handleScrollTopVisibility, { passive: true });
    handleScrollTopVisibility(); // run once on load

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    // ========================================================
    // 8. SKILL BAR ANIMATION
    //    Fills .skill-fill elements to their data-width
    //    percentage when they scroll into view.
    // ========================================================
    const skillBars = document.querySelectorAll(".skill-fill");

    if (skillBars.length > 0) {
        const skillObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        const targetWidth = entry.target.getAttribute("data-width");
                        if (targetWidth) {
                            entry.target.style.width = targetWidth;
                        }
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        skillBars.forEach(function (bar) {
            skillObserver.observe(bar);
        });
    }


    // ========================================================
    // 9. SMOOTH SCROLL FOR ANCHOR LINKS
    //    Handles in-page anchor links (e.g., #contact-form)
    //    with smooth scrolling and offset for fixed navbar.
    // ========================================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    // ========================================================
    // 10. ACTIVE NAV LINK HIGHLIGHTING
    //     Highlights the current page link in the navbar
    //     based on the current URL path.
    // ========================================================
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const allNavLinks = document.querySelectorAll(".nav-links a");

    allNavLinks.forEach(function (link) {
        const href = link.getAttribute("href");
        if (href === currentPage) {
            link.classList.add("active");
        }
    });


    // ========================================================
    // 11. FORM SUBMISSION FEEDBACK (Enhancement)
    //     Adds a brief visual feedback on form submit.
    // ========================================================
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function () {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
            }
        });
    }


    // ========================================================
    // 12. ANNOUNCEMENT BAR DISMISS (Optional Enhancement)
    //     Allows closing the announcement bar if a close
    //     button is added in the future.
    // ========================================================
    const announcementClose = document.querySelector(".announcement-close");
    const announcementBar = document.querySelector(".announcement-bar");

    if (announcementClose && announcementBar) {
        announcementClose.addEventListener("click", function () {
            announcementBar.style.display = "none";
        });
    }

});