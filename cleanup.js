const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove WhatsApp Floating Button
html = html.replace(/<a[^>]*href=["'][^"']*whatsapp[^"']*["'][^>]*class=["'][^"']*fixed[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, '');

// 2. Remove Yellow Clock Button (fixed div containing clock icon)
html = html.replace(/<div class="fixed bottom-20 md:bottom-6 left-2 md:left-4 z-40 animate-slide-up">[\s\S]*?<div class="w-9 h-9 bg-white\/20 rounded-full flex items-center justify-center text-lg flex-shrink-0">⏰<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div><\/div>/gi, '');
// Alternatively more robust for the yellow button wrapper:
html = html.replace(/<div class="fixed bottom-20 md:bottom-6 left-2 md:left-4 z-40 animate-slide-up"><div class="bg-highlight text-highlight-foreground rounded-xl shadow-medium py-2\.5 px-3 flex items-center gap-2\.5 max-w-\[260px\]"><div class="w-9 h-9 bg-white\/20 rounded-full flex items-center justify-center text-lg flex-shrink-0">⏰<\/div><div class="flex flex-col"><span class="text-\[10px\] font-bold uppercase tracking-wider opacity-80">Oferta Exclusiva<\/span><span class="text-xs font-black leading-tight">Acaba em breve!<\/span><\/div><\/div><\/div>/g, '');

// 3. Remove any other Instagram links
html = html.replace(/<a[^>]*href=["'][^"']*instagram\.com[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, '');

// 4. Remove all remaining WA links entirely
html = html.replace(/<a[^>]*href=["'][^"']*whatsapp[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, '');

// 5. Clean up WhatsApp text mentions
// Text replacements
html = html.replace(/Receba no WhatsApp e E-mail/gi, 'Receba no E-mail');
html = html.replace(/WhatsApp e E-mail/gi, 'E-mail');
html = html.replace(/no WhatsApp em segundos/gi, 'no E-mail em segundos');
html = html.replace(/<p class="text-background\/50 text-xs mt-2">📲 Receba no WhatsApp instantaneamente<\/p>/gi, '');
html = html.replace(/<p class="text-background\/50 text-\[10px\] text-center mt-2">Produto 100% digital\. Acesso enviado via WhatsApp após pagamento\. Sem frete\.<\/p>/gi, '<p class="text-background/50 text-[10px] text-center mt-2">Produto 100% digital. Acesso enviado via E-mail após pagamento. Sem frete.</p>');
html = html.replace(/<p class="text-muted-foreground text-sm md:text-base mb-5">Tem alguma dúvida sobre o Pack de Cones de Coração\? Fale diretamente conosco pelo WhatsApp\. Respondemos rapidinho!<\/p>/gi, '');

// Remove trailing orphaned svgs if any
html = html.replace(/<\/svg>Receba no E-mail/gi, '</svg> Receba no E-mail');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Cleanup script finished.');
