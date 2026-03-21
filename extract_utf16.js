const fs = require('fs');
const html = fs.readFileSync('old_index.html', 'utf16le');

const regex = /href="([^"]+)"/g;
let match;
while ((match = regex.exec(html)) !== null) {
    const url = match[1];
    if (url.includes('http') && !url.includes('.css') && !url.includes('.js')) {
        console.log(url);
    }
}
