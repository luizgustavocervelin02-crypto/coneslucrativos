const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

// 1. LIMPAR STYLES INJETADOS DE EXTENSÕES
$('style').each((i, el) => {
    const css = $(el).html() || '';
    if (
        css.includes('sonner-toaster') ||
        css.includes('m-force-lead') ||
        css.includes('rocket-popup') ||
        css.includes('wa-update') ||
        css.includes('vimeo_tool') ||
        css.includes('wa-leads-root') ||
        css.includes('more-tools') ||
        css.includes('el-icon-close') ||
        css.includes('dialog-pop-data') ||
        css.includes('m-drainage-root')
    ) {
        $(el).remove();
    }
});

// Remove empty styles
$('style[data-emotion="css"]').remove();

// 2. LIMPAR DIVS DO FIM DO BODY
$('#newsvd_popupMenu').remove();
$('#newsvdPrice').remove();
$('.wa-leads-root').remove();
$('#vimeo_tool').remove();
$('#vtPopupMenu').remove();
$('.rocket-popup-root').remove();

// 3. FONTES GOOGLE ASSÍNCRONAS
$('link[rel="stylesheet"]').each((i, el) => {
    const href = $(el).attr('href');
    if (href && href.includes('fonts.googleapis.com')) {
        // Change to async strategy
        $(el).attr('media', 'print');
        $(el).attr('onload', "this.media='all'");
    }
});

// 4. DUPLICATAS DE SCRIPTS E LIMPEZA
// The head has an inline script adding utmify, an async script, and maybe bare script.
// Let's remove ANY src tag for utmify that ALREADY isn't the primary one.
let utmifyCount = 0;
$('script[src*="pixel.js"]').each((i, el) => {
    utmifyCount++;
    if (utmifyCount > 1) {
        $(el).remove();
    } else {
        $(el).attr('async', 'true');
        $(el).attr('defer', 'defer');
    }
});

let fbCount = 0;
$('script[src*="fbevents.js"]').each((i, el) => {
    fbCount++;
    if (fbCount > 1) {
        $(el).remove();
    } else {
        $(el).attr('async', 'true');
        $(el).attr('defer', 'defer');
    }
});

// Salvar
fs.writeFileSync('index.html', $.html(), 'utf8');
console.log("-> LCP Optimization applied successfully!");
