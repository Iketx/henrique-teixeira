const i18n = {
    currentLang: localStorage.getItem('siteLang') || (navigator.language.startsWith('pt') ? 'pt' : 'en'),
    translations: {},

    async init() {
        await this.loadTranslations('pt');
        await this.loadTranslations('en');
        this.setLanguage(this.currentLang);
    },

    async loadTranslations(lang) {
        try {
            const response = await fetch(`assets/js/lang/${lang}.json`);
            this.translations[lang] = await response.json();
        } catch (error) {
            console.error(`Error loading ${lang} translations:`, error);
        }
    },

    setLanguage(lang) {
        if (!this.translations[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('siteLang', lang);
        
        // Update document lang
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en-US';

        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.translations[lang][key];
            if (translation) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.type === 'submit') {
                        el.value = translation;
                    } else if (el.placeholder !== undefined) {
                        el.placeholder = translation;
                    }
                } else if (el.tagName === 'BUTTON' && el.type === 'submit') {
                    el.textContent = translation;
                } else {
                    el.innerHTML = translation;
                }
            }
        });
        
        // Update active state in switcher if exists
        const ptBtn = document.getElementById('lang-pt');
        const enBtn = document.getElementById('lang-en');
        if (ptBtn && enBtn) {
            ptBtn.classList.toggle('active', lang === 'pt');
            enBtn.classList.toggle('active', lang === 'en');
        }
        
        // Dispatch custom event to notify other scripts (like scripts.js for the modal)
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    },

    getText(key) {
        return this.translations[this.currentLang]?.[key] || key;
    }
};

window.i18n = i18n;
