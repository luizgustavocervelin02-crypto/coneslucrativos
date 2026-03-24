const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Match all hrefs
const hrefMatches = html.match(/href=["'](https?:\/\/[^"']+)["']/g);
console.log("--- HREFs ---");
if (hrefMatches) {
    const unique = [...new Set(hrefMatches.map(m => m.replace(/href=["']|["']/g, '')))];
    unique.forEach(l => console.log(l));
} else {
    console.log("No href URLs found");
}

// Match all action forms if any
const actionMatches = html.match(/action=["'](https?:\/\/[^"']+)["']/g);
console.log("\n--- Actions ---");
if (actionMatches) {
    const unique = [...new Set(actionMatches.map(m => m.replace(/action=["']|["']/g, '')))];
    unique.forEach(l => console.log(l));
}

// Match URL in window.location or similar
console.log("\n--- JS redirects/URLs ---");
const jsMatches = html.match(/(?:window\.location(?:\.href)?\s*=|window\.open\()\s*["']([^"']+)["']/g);
if (jsMatches) {
    const unique = [...new Set(jsMatches)];
    unique.forEach(l => console.log(l));
}
