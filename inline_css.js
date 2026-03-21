const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

const cssPath = path.join('assets', 'index-DZ5kqBA6.css');
if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // Replace the specific stylesheet link
    $('link[href="assets/index-DZ5kqBA6.css"]').replaceWith(`<style id="main-tailwind-inline">${cssContent}</style>`);

    fs.writeFileSync('index.html', $.html(), 'utf8');
    console.log("CSS inlined successfully!");
} else {
    console.log("CSS file not found!");
}
