const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

console.log("--- Verify Banner ---");
const hasBanner = html.includes('Páscoa e Dia das Mães incluídos');
console.log("Has banner?", hasBanner);

console.log("\n--- Verify Headline ---");
const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
console.log("First H1:", h1Match ? h1Match[1] : "Not found");

console.log("\n--- Verify Links ---");
const matches = [...html.matchAll(/<a[^>]*href=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/a>/g)];
matches.forEach(m => {
    if (!m[1].startsWith('#')) {
        console.log(m[1] + ' -> ' + m[2].replace(/<[^>]+>/g, '').trim().substring(0, 50).replace(/\s+/g, ' '));
    }
});

console.log("\n--- Verify CTA Position ---");
// See what comes after the first CTA link
const ctaIndex = html.indexOf('<a href="#checkout" cursor-pointer');
// wait, the CTA is <div class="flex flex-col items-center mb-6 md:mb-8"><a href="#checkout"...
const ctaPos = html.indexOf('<div class="flex flex-col items-center mb-6);');
if (html.indexOf('<div class="flex flex-col items-center mb-6 md:mb-8"><a href="#checkout"') !== -1) {
    console.log("CTA properly moved with margin-bottom class");
}

const ctaPosIndex = html.indexOf('QUERO GARANTIR MEU SUPER PACK');
const benefitsPos = html.indexOf('📄 PDF');
console.log("CTA index:", ctaPosIndex, "Benefits index:", benefitsPos, "Is CTA before benefits?", ctaPosIndex < benefitsPos);
