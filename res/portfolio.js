"use strict";

import Theme    from './theme.js';
import Projects from './projects.js';
import Social   from './social.js';

/**
 * Portfolio
 * @class
 * @property {object} theme    
 * @property {object} projects 
 * @property {object} social   
 * @author Yacine Allal <safarAllal2024@gmail.com>
 */
class Portfolio {

    // Class Properties
    theme    = {};
    projects = {};
    social   = {};

    /**
     * Constructor
     * @constructor
     */
    constructor() {

        this.theme    = new Theme();
        this.projects = new Projects();
        this.social   = new Social();

        document.getElementById('about_me').style.marginLeft = '0';

        const adr = str.split('').reverse().join('');
        document.getElementById('em' + 'ail').href = 'mai' + 'lto' + ':' + adr;
        document.getElementById('sp' + 'am').innerText = adr;
    }
}

export default Portfolio;