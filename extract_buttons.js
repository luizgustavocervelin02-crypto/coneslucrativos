const fs = require('fs');
const html = fs.readFileSync('old_index.html', 'utf8');

const regex = /<a[^>]+>/g;
let match;
while ((match = regex.exec(html)) !== null) {
    if (match[0].includes('Básico') || match[0].includes('Premium') || match[0].includes('QUERO O') || match[0].includes('bg-accent')) {
        console.log(match[0]);
    }
}
