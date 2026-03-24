const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const fixedA = html.match(/<a[^>]*class="[^"]*fixed[^"]*"[^>]*>([\s\S]*?)<\/a>/g);
if (fixedA) {
    console.log("--- FIXED A ---");
    fixedA.forEach((el, i) => console.log(`\n[${i}]`, el));
}

const fixedButton = html.match(/<button[^>]*class="[^"]*fixed[^"]*"[^>]*>([\s\S]*?)<\/button>/g);
if (fixedButton) {
    console.log("--- FIXED BUTTON ---");
    fixedButton.forEach((el, i) => console.log(`\n[${i}]`, el));
}
