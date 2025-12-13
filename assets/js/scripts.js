document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
    1. SELETORES GLOBAIS E INICIALIZAÇÃO
    ========================================= */
    /* Captura elementos principais para manipulação dinâmica */
    const header = document.querySelector('header');
    const bgGlobal = document.getElementById('bg-global');
    const sections = document.querySelectorAll('.slide');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    /* =========================================
    2. OBSERVADOR DE INTERSEÇÃO - TROCA DE TEMA E MENU ATIVO
    ========================================= */
    /* IntersectionObserver detecta seção visível e altera fundo + menu ativo */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                /* Troca cor de fundo global conforme tema da seção */
                if (entry.target.classList.contains('dark-theme')) {
                    bgGlobal.classList.add('bg-dark');
                    bgGlobal.classList.remove('bg-light');
                } else {
                    bgGlobal.classList.add('bg-light');
                    bgGlobal.classList.remove('bg-dark');
                }

                /* Ativa link do menu correspondente à seção visível */
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 }); /* Threshold 50%: ativa quando metade da seção está visível */

    /* =========================================
    NAVBAR SCROLL FOLLOW - Portfolio → Contato (Transição Natural)
    ========================================= */
    /* Navbar "sobe" suavemente conforme final do Portfolio entra na viewport */
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

    /* Listeners passivos para performance 60fps */
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });

    sections.forEach(s => observer.observe(s));

    /* =========================================
    3. DADOS DOS PROJETOS (Para Modais)
    ========================================= */
    /* Objeto com conteúdo dos 3 projetos exibido nos modais */
    const projectContent = {
        "green-ai": {
            title: "Green AI & Soberania Digital",
            tags: "Pesquisa | Edge Computing | LLM Optimization",
            desc: `
                <p>Estamos vivendo a lua de mel da IA Generativa, mas os custos operacionais de inferência estão sendo ignorados. Minha pesquisa atual foca na Viabilidade Econômica de LLMs. Investigo técnicas de otimização (como Quantização e Poda) para rodar modelos de linguagem em infraestrutura local (Edge Computing), reduzindo drasticamente o consumo de energia e a latência.</p>
                <p>O objetivo é estratégico: garantir a Soberania Digital. Ao mover a inteligência para a borda (on-device), eliminamos a dependência de APIs estrangeiras instáveis e protegemos a privacidade dos dados sensíveis, provando que a IA pode ser, ao mesmo tempo, 'Verde' e financeiramente sustentável.</p>
            `
        },
        "baco-uno": {
            title: "O Paradoxo da Escolha (BACO)",
            tags: "Startup | Sistema de Recomendação | Economia Comportamental",
            desc: `
                <p>Em 2019, fundei a BACO com uma tese central: o excesso de dados não estruturados gera ansiedade, não decisões (O Paradoxo da Escolha). Enquanto o mercado focava em volume, desenhei a arquitetura de um Sistema de Recomendação Híbrido que utilizava dados psicográficos para 'curar' experiências, atuando como um filtro de ruído para o usuário final.</p>
                <p>O projeto, finalista em concursos de inovação, foi meu laboratório de Human-in-the-Loop. Aprendi na prática a estruturar pipelines de dados qualitativos e a validar modelos de negócio SaaS. Essa experiência moldou minha visão atual sobre Agentes de IA: a função da tecnologia deve ser reduzir a carga cognitiva humana, entregando precisão em vez de alucinação.</p>
            `
        },
        "d4r": {
            title: "Consultoria Data-Driven (D4R)",
            tags: "Business Intelligence | Transformação Digital | Automação",
            desc: `
                <p>Como cofundador da D4R em Portugal, atuei na linha de frente da digitalização de empresas tradicionais. Minha missão era preparar o terreno cultural e técnico para a tecnologia. Implementei rotinas de Business Intelligence e automações de processos que permitiram a gestores tomarem decisões baseadas em evidências (P&L e Fluxo de Caixa), e não apenas em intuição.</p>
                <p>Este case prova minha capacidade de traduzir 'tecnês' para resultados de negócio. Ao estruturar a governança de dados e otimizar operações ineficientes, criei as bases necessárias para que esses negócios pudessem escalar, demonstrando que a transformação digital real começa na estratégia e nos processos, antes de chegar ao software.</p>
            `
        }
    };

    /* =========================================
    4. LÓGICA DO MODAL INTERATIVO
    ========================================= */
    
    /* Seletores dos elementos do modal */
    const modal = document.getElementById('project-modal');
    const mTitle = document.getElementById('modal-title');
    const mTags = document.getElementById('modal-tags');
    const mDesc = document.getElementById('modal-desc');
    const closeBtn = document.querySelector('.modal-close');
    const cards = document.querySelectorAll('.card'); /* Todos os cards do portfólio */

    /* Função para abrir modal com dados do projeto clicado */
    function openModal(projectId) {
        const data = projectContent[projectId];
        
        if(!data) return; /* Proteção se projeto não existir */

        /* Preenche conteúdo dinamicamente */
        mTitle.textContent = data.title;
        mTags.textContent = data.tags;
        mDesc.innerHTML = data.desc; /* innerHTML para HTML nos parágrafos */

        modal.classList.add('active'); /* Animação CSS */
    }

    /* Função para fechar modal */
    function closeModal() {
        modal.classList.remove('active');
    }

    /* Event listeners para cada card */
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openModal(projectId);
        });
    });

    /* Fechamento do modal: botão X, clique no fundo ou ESC */
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(); /* Clique fora do conteúdo */
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal(); /* Tecla ESC */
    });

    /* =========================================
    5. FORMULÁRIO CONTATO - VALIDAÇÃO + SIMULAÇÃO ENVIO
    ========================================= */
    /* Validação client-side obrigatória pela atividade + simulação de backend */
    
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.createElement('div');
    formSuccess.className = 'form-success';
    formSuccess.innerHTML = '✅ Mensagem enviada com sucesso! Em breve entrarei em contato.';
    formSuccess.style.display = 'none';
    
    /* Insere mensagem de sucesso dinamicamente após botão submit */
    const submitBtn = contactForm.querySelector('.btn-submit');
    submitBtn.insertAdjacentElement('afterend', formSuccess);

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); /* Impede envio real do form */
        
        /* Captura e valida campos */
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        /* Validações obrigatórias (requisito da atividade) */
        if (!name) {
            alert('Por favor, preencha o campo Nome.');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; /* Regex simples para email */
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }
        
        if (!message || message.length < 10) {
            alert('Por favor, escreva uma mensagem com pelo menos 10 caracteres.');
            return;
        }
        
        /* Simula sucesso: limpa form + mostra confirmação */
        contactForm.reset();
        formSuccess.style.display = 'block';
        
        setTimeout(() => {
            formSuccess.style.display = 'none';
        }, 5000); /* Auto-esconde após 5s */
        
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});
