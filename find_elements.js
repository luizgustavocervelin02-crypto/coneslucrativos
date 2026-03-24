const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

console.log("--- WhatsApp Links ---");
const waLinks = html.match(/<a[^>]*href=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/a>/g);
if (waLinks) {
    waLinks.forEach(link => {
        if (link.toLowerCase().includes('whatsapp')) {
            console.log(link.substring(0, 300) + '...\n');
        }
    });
}

console.log("--- Instagram Links ---");
if (waLinks) {
    waLinks.forEach(link => {
        if (link.toLowerCase().includes('instagram')) {
            console.log(link.substring(0, 300) + '...\n');
        }
    });
}

console.log("--- Clock/Urgency Buttons ---");
// Look for clock icon or yellow background classes
const yellowBtns = html.match(/<[^>]+bg-yellow[^>]+>([\s\S]*?)<\/[a-zA-Z]+>/g);
if (yellowBtns) {
    yellowBtns.forEach(b => console.log(b.substring(0, 200) + '...\n'));
}

console.log("--- Floating Elements ---");
// Look for fixed or absolute positioned elements at the bottom
const fixedElements = html.match(/<div[^>]*(fixed|absolute)[^>]*bottom[^>]*>([\s\S]{0,500})/g);
if (fixedElements) {
    fixedElements.forEach(el => console.log(el + '...\n'));
}
