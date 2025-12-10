document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. SELETORES GERAIS & SETUP
    // =========================================
    const header = document.querySelector('header');
    const bgGlobal = document.getElementById('bg-global');
    const sections = document.querySelectorAll('.slide');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // =========================================
    // 2. TROCA DE FUNDO E MENU ATIVO
    // =========================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Lógica de Cor do Fundo
                if (entry.target.classList.contains('dark-theme')) {
                    bgGlobal.classList.add('bg-dark');
                    bgGlobal.classList.remove('bg-light');
                } else {
                    bgGlobal.classList.add('bg-light');
                    bgGlobal.classList.remove('bg-dark');
                }

                // Lógica do Menu Ativo (Sublinhado/Caixa)
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    // Verifica se o href do link combina com o ID da seção
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 }); // Ativa quando 50% da seção estiver visível

    sections.forEach(s => observer.observe(s));

    // =========================================
    // 3. CONTEÚDO DOS MODAIS
    // =========================================
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

    // =========================================
    // 4. LÓGICA DO MODAL
    // =========================================
    
    // Selecionar os elementos do Modal no HTML
    const modal = document.getElementById('project-modal');
    const mTitle = document.getElementById('modal-title');
    const mTags = document.getElementById('modal-tags');
    const mDesc = document.getElementById('modal-desc');
    const closeBtn = document.querySelector('.modal-close');
    const cards = document.querySelectorAll('.card'); // Seleciona todos os cards

    // Função para ABRIR o modal
    function openModal(projectId) {
        const data = projectContent[projectId];
        
        // Se não achar o projeto, para por aqui
        if(!data) return;

        // Preenche o modal com os dados
        mTitle.textContent = data.title;
        mTags.textContent = data.tags;
        mDesc.innerHTML = data.desc; // Usa innerHTML para processar as tags <p>

        // Mostra o modal adicionando a classe .active
        modal.classList.add('active');
    }

    // Função para FECHAR o modal
    function closeModal() {
        modal.classList.remove('active');
    }

    // Adiciona o evento de CLIQUE em cada card
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Pega o valor do atributo 'data-project' do card clicado
            const projectId = card.getAttribute('data-project');
            openModal(projectId);
        });
    });

    // Eventos para fechar o modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Fechar clicando no fundo escuro
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Fechar apertando ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

});