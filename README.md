# Henrique Teixeira — Personal Website

## Professional Data Scientist Portfolio

This repository contains my **personal online portfolio**. The site was created using **vanilla HTML5, CSS3, and JavaScript** (without frameworks), and is published on **GitHub Pages**.

### 🔗 **Links**
- **Live Site:** [https://iketx.github.io/henrique-teixeira/](https://iketx.github.io/henrique-teixeira/)
- **GitHub Repository:** [https://github.com/Iketx/henrique-teixeira](https://github.com/Iketx/henrique-teixeira)

## 🛠️ **Tech Stack**
- **HTML5**: Semantic structure with anchor sections for single-page navigation.
- **CSS3**: Responsive layouts (Flexbox/Grid), smooth animations, CSS variables, mix-blend-mode, and transitions.
- **JavaScript (Vanilla)**: IntersectionObserver (active navigation + theme switching), form validation, interactive modals, scroll-follow navbar, and i18n system.

**Built with pride using vanilla HTML, CSS, and JavaScript.**

## 📁 **Project Structure**
```
SITE_PORTFOLIO/
├── index.html          # Single page with 5 sections (Hero + 4 core sections)
├── assets/
│   ├── css/
│   │   └── styles.css  # Styles organized by section
│   ├── js/
│   │   ├── lang/       # i18n language files
│   │   ├── i18n.js     # i18n logic module
│   │   └── scripts.js  # Core JS logic
│   └── [images/icons]  # Visual assets (photo, tech logos)
└── README.md           # This documentation
```

## ✨ **Features**

### 1. **Single-Page Navigation (Anchors)**
- Responsive fixed menu (bottom → top smooth transition during Portfolio → Contact scroll).
- **IntersectionObserver**: Activates corresponding link + automatically switches light/dark theme.

### 2. **Core Sections**
- **Hero**: Impactful presentation with responsive typography.
- **About Me**: Photo + biographical text (split-layout grid).
- **Education**: Academic background + tech stack (SVG icons).
- **Portfolio**: 3 interactive cards with modals (details via JS).
- **Contact**: Validated form + social links.

### 3. **JavaScript Interactions**
- **Form Validation**: Name, e-mail (regex), message (>10 chars).
- **Formspree Integration**: Contact form connected to Formspree API for real submissions.
- **Portfolio Modals**: Click on card → modal with dynamic content.
- **Animated Navbar**: Scroll-follow 60fps (requestAnimationFrame).
- **i18n System**: English and Portuguese language support with localStorage persistence.

### 4. **Responsiveness**
- Mobile-first: Flexible grid, responsive scaling, vertical stack on small screens.
- Full breakpoints (480px, 768px, 1024px, 1440px+).

## 🚀 **How to Run Locally**
1. Clone the repository:
   ```bash
   git clone https://github.com/Iketx/henrique-teixeira.git
   cd henrique-teixeira
   ```
2. Open `index.html` in your browser:
   ```bash
   xdg-open index.html  # Linux
   open index.html      # macOS
   start index.html     # Windows
   # or drag and drop into the browser
   ```

### Formspree setup
To make the contact form work for you:
1. Sign up at [Formspree](https://formspree.io/)
2. Create a new form
3. Replace `YOUR_FORM_ID` in `index.html` with your Formspree form ID.

## 📱 **Section Walkthrough**

1. **Hero/About Me**
2. **Education**
3. **Portfolio** (cards + modal)
4. **Contact** (validated form)

---

Henrique Teixeira  
[LinkedIn](https://www.linkedin.com/in/henrique-teixeira-data-science) | [GitHub](https://github.com/Iketx)
