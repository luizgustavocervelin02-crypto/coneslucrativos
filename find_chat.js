const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const m = html.match(/tawk|crisp|intercom|chat|suporte|widget/gi);
if (m) console.log("Chat mentions:", [...new Set(m)]);

// Also check all script sources
const scripts = html.match(/<script[^>]*src=["']([^"']+)["'][^>]*>/gi);
if (scripts) {
    scripts.forEach(s => console.log(s));
}
