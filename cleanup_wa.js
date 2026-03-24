const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Catch any remaining WhatsApp mentions
html = html.replace(/Receba no WhatsApp/gi, 'Receba no E-mail');
html = html.replace(/whatsapp/gi, 'E-mail');

fs.writeFileSync('index.html', html, 'utf8');
