const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all fixed elements
const fixedElements = html.match(/<div[^>]*class="[^"]*fixed[^"]*"[^>]*>([\s\S]*?)<\/div>(?=\s*<|$)/g);
if (fixedElements) {
    console.log("--- FIXED DIVS ---");
    fixedElements.forEach((el, i) => console.log(`\n[${i}]`, el.substring(0, 500) + '...'));
}

const waLinksNodes = html.match(/<a[^>]*href=['"][^'"]*whatsapp[^'"]*['"][^>]*>([\s\S]*?)<\/a>/gi);
if (waLinksNodes) {
    console.log("\n--- WA LINKS NODES ---");
    waLinksNodes.forEach((el, i) => console.log(`\n[${i}]`, el.substring(0, 500) + '...'));
}

const instaLinksNodes = html.match(/<a[^>]*href=['"][^'"]*instagram[^'"]*['"][^>]*>([\s\S]*?)<\/a>/gi);
if (instaLinksNodes) {
    console.log("\n--- INSTAGRAM LINKS NODES ---");
    instaLinksNodes.forEach((el, i) => console.log(`\n[${i}]`, el.substring(0, 500) + '...'));
}
