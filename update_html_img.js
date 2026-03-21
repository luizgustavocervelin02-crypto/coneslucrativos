const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

const oldImg = 'assets/hero-mockup-200-Cbt4LmTE.webp';
const newImg = 'assets/hero-mockup-optimized.webp';

// Update preload tag
$('link[rel="preload"][as="image"]').each((i, el) => {
    if ($(el).attr('href') === oldImg) {
        $(el).attr('href', newImg);
    }
});

// Enforce image as absolute first child of <head> just to be 100% sure
const preloadTag = $('link[rel="preload"][as="image"][href="' + newImg + '"]');
if (preloadTag.length) {
    if (preloadTag.index() !== 0) {
        // Move to top
        $('head').prepend(preloadTag);
    }
} else {
    // Inject it if missing
    $('head').prepend(`<link rel="preload" as="image" href="${newImg}" fetchpriority="high">`);
}

// Update image tag
$('img').each((i, el) => {
    if ($(el).attr('src') === oldImg) {
        $(el).attr('src', newImg);
        $(el).attr('width', '600');
        $(el).attr('height', '437');
        // Double ensure standard properties
        $(el).attr('loading', 'eager');
        $(el).attr('fetchpriority', 'high');
        $(el).attr('decoding', 'sync'); // Render immediately
    }
});

fs.writeFileSync('index.html', $.html(), 'utf8');
console.log("Image updated in HTML successfully!");
