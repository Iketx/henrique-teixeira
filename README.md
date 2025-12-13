# Portfólio Pessoal - Henrique Daniel Abreu Teixeira

## 📋 **Atividade Prática: Fundamentos da Programação Web**

**Disciplina:** Fundamentos da Programação Web  
**Aluno:** Henrique Daniel Abreu Teixeira (RA: 5284197)  
**Data:** Dezembro/2025  

Este repositório contém meu **portfólio pessoal online**, desenvolvido conforme os requisitos da atividade prática da disciplina. O site foi criado utilizando **apenas HTML5, CSS3 e JavaScript puro** (sem frameworks), e está publicado no **GitHub Pages**.

### 🔗 **Links Obrigatórios**
- **Site Publicado:** [https://iketx.github.io/henrique-teixeira/](https://iketx.github.io/henrique-teixeira/)
- **Repositório GitHub:** [https://github.com/Iketx/henrique-teixeira](https://github.com/Iketx/henrique-teixeira)

## 🛠️ **Tecnologias Utilizadas**
- **HTML5**: Estrutura semântica com seções âncora para navegação single-page.
- **CSS3**: Layouts responsivos (Flexbox/Grid), animações suaves, variáveis CSS, mix-blend-mode e transições.
- **JavaScript (Vanilla)**: IntersectionObserver (navegação ativa + troca de tema), validação de formulário, modais interativos, scroll-follow da navbar.

**Proibições respeitadas:** Sem Bootstrap, jQuery, React ou qualquer framework/biblioteca.

## 📁 **Estrutura do Projeto**
```
SITE_PORTFOLIO/
├── index.html          # Página única com 5 seções (Hero + 4 obrigatórias)
├── assets/
│   ├── css/
│   │   └── styles.css  # Estilos comentados e organizados por seção
│   ├── js/
│   │   └── scripts.js  # Lógica JS didática e comentada
│   └── [imagens/ícones] # Assets visuais (foto, logos tech)
└── README.md           # Esta documentação
```

## ✨ **Funcionalidades Implementadas**

### 1. **Navegação Single-Page (Âncoras)**
- Menu fixo responsivo (bottom → top suave na transição Portfolio → Contato).
- **IntersectionObserver**: Ativa link correspondente + troca tema claro/escuro automaticamente.

### 2. **Seções Obrigatórias**
- **Hero**: Apresentação impactante com tipografia VH responsiva.
- **Sobre Mim**: Foto + texto biográfico (split-layout grid).
- **Formação**: Formação acadêmica + stack tech (ícones SVG).
- **Portfólio**: 3 cards interativos com modais (detalhes via JS).
- **Contato**: Formulário validado + links sociais.

### 3. **JavaScript Obrigatório**
- **Validação Formulário**: Nome, e-mail (regex), mensagem (>10 chars).
- **Simulação Envio**: Limpa campos + alerta verde (5s).
- **Modais Portfólio**: Clique em card → modal com conteúdo dinâmico.
- **Navbar Animada**: Scroll-follow 60fps (requestAnimationFrame).

### 4. **Responsividade**
- Mobile-first: Grid flexível, fontes VW/VH, stack vertical em telas pequenas.
- Testado em desktop/tablet/smartphone.

## 🚀 **Como Executar Localmente**
1. Clone o repositório:
   ```
   git clone https://github.com/Iketx/henrique-teixeira.git
   cd henrique-teixeira
   ```
2. Abra `index.html` no navegador:
   ```
   xdg-open index.html  # Linux
   # ou arraste para o navegador
   ```

## 📱 **Demonstração das Seções**

1. **Hero/Sobre Mim**
2. **Formação**
3. **Portfólio** (cards + modal)
4. **Contato** (formulário validado)


## 📚 **Conceitos Aprendidos e Aplicados**
- **CSS Grid/Flexbox**: Layouts complexos sem frameworks.
- **IntersectionObserver API**: Detecção eficiente de visibilidade.
- **Custom Properties**: Manutenção fácil de temas.
- **Performance**: RAF + passive listeners (60fps scroll).
- **Acessibilidade**: Labels, alt texts, foco keyboard.

**Obrigado pela avaliação!**  
Henrique Teixeira  
[LinkedIn](https://www.linkedin.com/in/henrique-teixeira-data-science) | [GitHub](https://github.com/Iketx)
