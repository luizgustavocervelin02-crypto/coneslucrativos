const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const matches = [...html.matchAll(/<a[^>]*href=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/a>/g)];
matches.forEach(m => {
    if (!m[1].startsWith('#')) {
        console.log(m[1] + ' -> ' + m[2].replace(/<[^>]+>/g, '').trim().substring(0, 50).replace(/\s+/g, ' '));
    }
});
