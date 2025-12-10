document.addEventListener('DOMContentLoaded', () => {
    // --- SELETORES GERAIS ---
    const header = document.querySelector('header');
    const portfolioSection = document.getElementById('Portfolio');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const bgGlobal = document.getElementById('bg-global');

    // =========================================
    // 1. LÓGICA DE COR DO FUNDO (BG CHANGE)
    // =========================================
    const bgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se a seção for escura, ativa classe escura no fundo global
                if (entry.target.classList.contains('escuro')) {
                    bgGlobal.classList.remove('fundo-ativo-claro');
                    bgGlobal.classList.add('fundo-ativo-escuro');
                } 
                // Se a seção for clara, ativa classe clara no fundo global
                else {
                    bgGlobal.classList.remove('fundo-ativo-escuro');
                    bgGlobal.classList.add('fundo-ativo-claro');
                }
            }
        });
    }, { threshold: 0.5 }); // Troca quando 50% da seção estiver na tela

    sections.forEach(section => bgObserver.observe(section));


    // =========================================
    // 2. LÓGICA DE MOVIMENTO DA NAVBAR
    // =========================================
    function updateNavbarPosition() {
        if (!portfolioSection || !header) return;

        const headerHeight = header.offsetHeight;
        const portRect = portfolioSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const margin = 40;

        // Onde a navbar deve estar (Baseado no fundo do Portfólio)
        let targetTop = portRect.bottom - headerHeight - margin;

        // Limites da tela
        const maxTop = windowHeight - headerHeight - margin; // Fundo da tela
        const minTop = margin; // Topo da tela

        // Clamp (Mantém o valor entre o Mínimo e o Máximo)
        const finalTop = Math.max(minTop, Math.min(targetTop, maxTop));

        // Aplica o estilo
        header.style.top = `${finalTop}px`;
        header.style.bottom = 'auto'; 
    }

    // LISTENER DE SCROLL ROBUSTO
    // Adicionamos listeners tanto no window quanto no documento para garantir
    window.addEventListener('scroll', () => requestAnimationFrame(updateNavbarPosition), { capture: true });
    window.addEventListener('resize', updateNavbarPosition);
    
    // Inicia a posição correta
    updateNavbarPosition();


    // =========================================
    // 3. LÓGICA DE LINK ATIVO (MENU HIGHLIGHT)
    // =========================================
    const activeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href && href.substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => activeObserver.observe(section));
});