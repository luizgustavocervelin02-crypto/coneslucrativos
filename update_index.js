const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove Banner
const bannerRegex = /<div class="flex justify-center mb-1\.5 md:mb-4"><span class="inline-flex items-center gap-1 bg-highlight text-highlight-foreground px-2 md:px-4 py-1 md:py-2 rounded-full text-\[10px\] md:text-sm font-bold"><span class="text-xs">🔥<\/span>Páscoa e Dia das Mães incluídos<\/span><\/div>\s*/g;
html = html.replace(bannerRegex, '');

// 2. Update Headline & P tags
const h1Regex = /<h1 class="text-3xl md:text-5xl lg:text-6xl font-black text-center leading-\[1\.1\] md:leading-tight mb-1\.5 md:mb-4">\s*<span class="block text-lg md:text-2xl font-bold text-primary mb-1">🎀 SUPER PACK<\/span>\s*<span class="text-gradient-blue">Pare de Criar do Zero — Renove Seu Catálogo em Minutos<\/span>\s*<\/h1>\s*<p class="text-center text-base md:text-xl font-bold text-primary mb-1 md:mb-2">\+200 MOLDES PROFISSIONAIS\s*<span class="font-black underline">EDITÁVEIS NO CANVA<\/span> — PRONTOS PARA PÁSCOA E DIA DAS MÃES<\/p>/g;

const newH1 = `<h1 class="text-3xl md:text-5xl lg:text-6xl font-black text-center leading-[1.1] md:leading-tight mb-1.5 md:mb-3"><span class="block text-lg md:text-2xl font-bold text-primary mb-1">🎀 SUPER PACK</span>+200 moldes profissionais editáveis no <span class="text-gradient-blue">Canva</span></h1>`;
html = html.replace(h1Regex, newH1);

// Adjust margins for descriptions below headline
const pDescRegex = /<p class="text-center text-foreground font-semibold text-sm md:text-lg mb-4 md:mb-6 max-w-xl mx-auto leading-snug">/g;
html = html.replace(pDescRegex, `<p class="text-center text-foreground font-semibold text-sm md:text-lg mb-3 md:mb-4 max-w-xl mx-auto leading-snug">`);

const gridRegex = /<div class="grid md:grid-cols-2 gap-4 md:gap-6 items-center mb-4 md:mb-6">/g;
html = html.replace(gridRegex, `<div class="grid md:grid-cols-2 gap-4 md:gap-6 items-center mb-3 md:mb-4">`);

// 3. Reposition CTA
const ctaRegex = /<div class="flex flex-col items-center"><a href="#checkout" class="w-full md:w-auto bg-accent hover:bg-accent-hover text-accent-foreground font-bold text-base md:text-lg px-6 md:px-10 py-4 rounded-xl shadow-green transition-all duration-300 hover:scale-105 active:scale-100 flex items-center justify-center gap-2 animate-cta-pulse"><span>QUERO GARANTIR MEU SUPER PACK<\/span><span class="text-xl">👆<\/span><\/a><\/div>/;

let ctaMatch = html.match(ctaRegex);
if (ctaMatch) {
    html = html.replace(ctaRegex, '');

    // Insert it right above the benefits section
    const benefitsSectionRegex = /<div class="flex flex-wrap justify-center gap-1\.5 md:gap-2 mb-4 md:mb-6"><span class="bg-white\/90 backdrop-blur-sm px-2\.5 py-1 rounded-full text-xs md:text-sm font-medium shadow-soft">📄 PDF<\/span>/;

    // Add margin bottom to CTA container
    const newCta = ctaMatch[0].replace('class="flex flex-col items-center"', 'class="flex flex-col items-center mb-6 md:mb-8"');

    html = html.replace(benefitsSectionRegex, newCta + '\n' + '<div class="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-4 md:mb-6"><span class="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs md:text-sm font-medium shadow-soft">📄 PDF</span>');
}

// 4. Update Links
const mainLinkRegex = /https:\/\/ggcheckout\.com\.br\/checkout\/v5\/alN2TWv5XmGEUckIWBKZ/g;
html = html.replace(mainLinkRegex, 'https://pay.lowify.com.br/checkout.php?product_id=8wYvZg');

const popupLinkRegex = /https:\/\/ggcheckout\.com\.br\/checkout\/v5\/ObeVi2PTOSeSVsTv8q5N/g;
html = html.replace(popupLinkRegex, 'https://pay.lowify.com.br/go.php?offer=iptxflq');

// If there happen to be any other ggcheckout links (we didn't find them earlier anyway, but just in case)
// we don't know what they are, except these two. 
// If there is any hotmart link we could replace them too, but none were found earlier.

fs.writeFileSync('index.html', html, 'utf8');
console.log('Update finished.');
