document.addEventListener('DOMContentLoaded', async () => {
    await window.i18n.init();

    
    /* =========================================
    1. GLOBAL SELECTORS AND INITIALIZATION
    ========================================= */
    /* Capture main elements for dynamic manipulation */
    const header = document.querySelector('header');
    const bgGlobal = document.getElementById('bg-global');
    const sections = document.querySelectorAll('.slide');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    /* =========================================
    2. INTERSECTION OBSERVER - THEME SWITCH & ACTIVE MENU
    ========================================= */
    /* IntersectionObserver detects visible section and changes background + active menu */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                /* Switch global background color based on section theme */
                if (entry.target.classList.contains('dark-theme')) {
                    bgGlobal.classList.add('bg-dark');
                    bgGlobal.classList.remove('bg-light');
                } else {
                    bgGlobal.classList.add('bg-light');
                    bgGlobal.classList.remove('bg-dark');
                }

                /* Activate corresponding menu link for visible section */
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 }); /* Threshold 50%: triggers when half of the section is visible */

    /* =========================================
    NAVBAR SCROLL FOLLOW - Portfolio → Contact (Natural Transition)
    ========================================= */
    /* Navbar "moves up" smoothly as end of Portfolio enters viewport */
    const navbar = document.querySelector('header');
    const portfolioSection = document.getElementById('projects');
    let ticking = false;

    function updateNavbarPosition() {
        const rect = portfolioSection.getBoundingClientRect();
        const portfolioBottom = rect.bottom;
        const viewportHeight = window.innerHeight;
        const navbarHeight = navbar.offsetHeight;
        
        let progress = 0;
        if (portfolioBottom < viewportHeight) {
            const overflow = viewportHeight - portfolioBottom;
            progress = Math.max(0, Math.min(1, overflow / viewportHeight));
        }
        
        const fromBottom = 40;
        const toTop = 20;
        const moveDistance = viewportHeight - navbarHeight - fromBottom - toTop;
        
        navbar.style.transform = `translateY(-${progress * moveDistance}px)`;
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbarPosition);
            ticking = true;
        }
    }

    /* Passive listeners for 60fps performance */
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });

    sections.forEach(s => observer.observe(s));

    /* =========================================
    3. PROJECT DATA (For Modals)
    ========================================= */
    /* Object with content for the 3 projects displayed in modals */
    const getProjectContent = () => ({
        "green-ai": {
            title: window.i18n.getText("modal.green.title"),
            tags: window.i18n.getText("modal.green.tags"),
            desc: window.i18n.getText("modal.green.desc")
        },
        "baco-uno": {
            title: window.i18n.getText("modal.baco.title"),
            tags: window.i18n.getText("modal.baco.tags"),
            desc: window.i18n.getText("modal.baco.desc")
        },
        "d4r": {
            title: window.i18n.getText("modal.d4r.title"),
            tags: window.i18n.getText("modal.d4r.tags"),
            desc: window.i18n.getText("modal.d4r.desc")
        }
    });
    
    // Update currently open modal when language changes
    window.addEventListener('languageChanged', () => {
        if (modal.classList.contains('active')) {
            const activeProjectId = modal.getAttribute('data-active-project');
            if (activeProjectId) openModal(activeProjectId);
        }
    });

    /* =========================================
    4. INTERACTIVE MODAL LOGIC
    ========================================= */
    
    /* Selectors for modal elements */
    const modal = document.getElementById('project-modal');
    const mTitle = document.getElementById('modal-title');
    const mTags = document.getElementById('modal-tags');
    const mDesc = document.getElementById('modal-desc');
    const closeBtn = document.querySelector('.modal-close');
    const cards = document.querySelectorAll('.card'); /* All portfolio cards */

    /* Function to open modal with clicked project data */
    function openModal(projectId) {
        const data = getProjectContent()[projectId];
        modal.setAttribute('data-active-project', projectId);
        
        if(!data) return; /* Protection if project doesn't exist */

        /* Dynamically populate content */
        mTitle.textContent = data.title;
        mTags.textContent = data.tags;
        mDesc.innerHTML = data.desc; /* innerHTML for HTML in paragraphs */

        modal.classList.add('active'); /* CSS Animation */
    }

    /* Function to close modal */
    function closeModal() {
        modal.classList.remove('active');
    }

    /* Event listeners for each card */
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openModal(projectId);
        });
    });

    /* Modal closing: X button, background click, or ESC */
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(); /* Click outside content */
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal(); /* ESC Key */
    });

    /* =========================================
    5. CONTACT FORM - VALIDATION + FORMSPREE SUBMISSION
    ========================================= */
    /* Client-side validation + Formspree backend integration */
    
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.createElement('div');
    formSuccess.className = 'form-success';
    formSuccess.innerHTML = '✅ Mensagem enviada com sucesso! Em breve entrarei em contato.';
    formSuccess.style.display = 'none';
    
    /* Inserts success message dynamically after submit button */
    const submitBtn = contactForm.querySelector('.btn-submit');
    submitBtn.insertAdjacentElement('afterend', formSuccess);

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); /* Prevent default form submission */
        
        /* Capture and validate fields */
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        /* Required validations */
        if (!name) {
            alert(window.i18n.getText('form.alert.name'));
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; /* Simple regex for email */
        if (!emailRegex.test(email)) {
            alert(window.i18n.getText('form.alert.email'));
            return;
        }
        
        if (!message || message.length < 10) {
            alert(window.i18n.getText('form.alert.message'));
            return;
        }
        
        /* Submit via Fetch to Formspree */
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        const formData = new FormData(contactForm);
        
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            
            if (response.ok) {
                contactForm.reset();
                formSuccess.innerHTML = window.i18n.getText("form.success");
                formSuccess.style.display = 'block';
                formSuccess.style.backgroundColor = '#4CAF50';
                
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000); /* Auto-hide after 5s */
                
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert("Oops! There was a problem submitting your form");
                    }
                })
            }
        }).catch(error => {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            alert("Oops! There was a problem submitting your form");
        });
    });
});
