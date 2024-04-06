"use strict";

/**
 * Theme Manager
 * @class
 * @property {array} light    
 * @property {array} dark     
 * @property {string} accent  
 * @property {string} theme   
 * @property {string} hero    
 * @property {object} storage 
 * @author Yacine Allal 
 */
class Theme {

    // Class Properties
    light   = [];
    dark    = [];
    accent  = '';
    theme   = 'light';
    hero    = 'light';
    storage = {};

    /**
     * Constructor
     * @constructor
     */
    constructor() {

        this.storage = window.localStorage;

        this.accent = this.getStyleProperty('color-accent');

        const styles = [
            'color-background',
            'color-main-text',
            'color-hero-text',
            'shadow-main-box',
            'shadow-main-title',
            'shadow-main-link',
            'shadow-hero-link'
        ];

        this.restore = document.getElementById('clear_settings');

        styles.forEach(value => {
            this.light[value] = this.getStyleProperty(value);
            this.dark[value]  = this.getStyleProperty('dark-' + value);
        });

        if (this.storage.hasOwnProperty('port_settings')) {
            
            const saved = JSON.parse(this.storage.getItem('port_settings'));
            this.accent = saved.accent;
            this.theme  = saved.theme;
            this.hero   = saved.hero;

            this.setStyleProperty('color-accent', this.accent);
            this.setStyleProperty('color-scheme', this.theme);
            this.restore.style.display = 'inline-block';

            if (this.hero === 'dark') {
                this.setHeroColors(this.dark);
            } else {
                this.setHeroColors(this.light);
            }

            if (this.theme === 'dark') {
                this.setStyleProperty('dark-mode', '1');
                this.changeMode(this.dark);
            } else {
                this.setStyleProperty('dark-mode', '0');
                this.changeMode(this.light);
            }
        } else {
            
            const isDark = parseInt(this.getStyleProperty('dark-mode'));
            if (isDark) {
                this.theme = 'dark';
                this.setStyleProperty('color-scheme', 'dark');
                this.changeMode(this.dark);
            }
        }

        this.setStyleProperty('transition-all',   this.getStyleProperty('enable-all'));
        this.setStyleProperty('transition-bg',    this.getStyleProperty('enable-bg'));
        this.setStyleProperty('transition-color', this.getStyleProperty('enable-color'));
        this.setStyleProperty('transition-fill',  this.getStyleProperty('enable-fill'));

        const accent = document.getElementById('accent_color');
        accent.value = this.getStyleProperty('color-accent');
        document.getElementById('color_picker').addEventListener('click', () => {
            accent.click();
        });

        accent.addEventListener('change', (e) => {
            const newColor = e.target.value;
            const rawColor = newColor.replace('#', '');
            this.accent = newColor;
            this.setStyleProperty('color-accent', newColor);
            if (parseInt(rawColor, 16) > 0xffffff / 2) {
                this.hero = 'dark';
                this.setHeroColors(this.dark);
            } else {
                this.hero = 'light';
                this.setHeroColors(this.light);
            }
            this.save();
        });

        document.getElementById('theme_picker').addEventListener('click', () => {
            const dark = parseInt(this.getStyleProperty('dark-mode'));
            if (dark) {
                this.theme = 'light';
                this.setStyleProperty('dark-mode', '0');
                this.setStyleProperty('color-scheme', 'light');
                this.changeMode(this.light);
            } else {
                this.theme = 'dark';
                this.setStyleProperty('dark-mode', '1');
                this.setStyleProperty('color-scheme', 'dark');
                this.changeMode(this.dark);
            }
            this.save();
        });

        this.restore.addEventListener('click', () => {
            this.storage.removeItem('port_settings');
            location.reload();
        });
    }

    /**
     * Get CSS Property
     * @param   {string} prop 
     * @returns {string}
     */
    getStyleProperty(prop) {
        const property = (prop === 'color-scheme') ? prop : '--' + prop;
        return getComputedStyle(document.documentElement).getPropertyValue(property).trim();
    }

    /**
     * Set CSS Property
     * @param {string} prop  
     * @param {string} value 
     */
    setStyleProperty(prop, value) {
        const property = (prop === 'color-scheme') ? prop : '--' + prop;
        document.documentElement.style.setProperty(property, value);
    }

    /**
     * Change Hero Section CSS
     * @param {array} colors 
     */
    setHeroColors(colors) {
        this.setStyleProperty('color-hero-text',  colors['color-hero-text']);
        this.setStyleProperty('shadow-hero-link', colors['shadow-hero-link']);
        this.setStyleProperty('glow-hero-link',   colors['glow-hero-link']);
    }

    /**
     * Change Light/Dark Mode
     * @param {object} colors 
     */
    changeMode(colors) {
        for (let index in colors) {
            if ((index !== 'color-hero-text') && (index !== 'shadow-hero-link')) {
                this.setStyleProperty(index, colors[index]);
            }
        }
    }

    save() {
        this.storage.setItem('port_settings', JSON.stringify({
            accent : this.accent,
            theme  : this.theme,
            hero   : this.hero
        }));
        this.restore.style.display = 'inline-block';
    }
}

export default Theme;