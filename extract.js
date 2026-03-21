const fs = require('fs');
const html = fs.readFileSync('old_index.html', 'utf8');

// Use regex to find all href attributes
const regex = /href="([^"]+)"/g;
let match;
while ((match = regex.exec(html)) !== null) {
    const url = match[1];
    // filter out css and local assets
    if (!url.includes('.css') && !url.includes('.webp') && !url.includes('.js') && !url.includes('#checkout') && url.includes('http')) {
        console.log(url);
    }
}
