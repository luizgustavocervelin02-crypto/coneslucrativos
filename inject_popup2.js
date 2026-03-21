const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

// Remover o modal antigo 
$('#upsell-modal').remove();
// Remover o script antigo (o script que injetamos)
$('script').filter((i, el) => $(el).html() && $(el).html().includes('upsell-modal')).remove();
// Remover a tag style do fade in
$('style').filter((i, el) => $(el).html() && $(el).html().includes('fadeInUp')).remove();

const modalHtml = `
<style>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
<div id="upsell-modal" class="fixed inset-0 z-[100] flex justify-center items-center p-4 hidden" style="background-color: rgba(0,0,0,0.8); z-index: 99999;">
  <div class="bg-white p-6 relative w-full max-w-sm border-2 border-red-500 shadow-2xl animate-fade-in-up" style="border-radius: 2rem;">
    <!-- Fechar -->
    <button id="close-upsell" class="absolute flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer" style="top: 1rem; right: 1rem; width: 2rem; height: 2rem;">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg>
    </button>
    
    <!-- Badge -->
    <div class="absolute flex flex-col items-center" style="top: -1.5rem; left: 50%; transform: translateX(-50%);">
      <div class="bg-red-600 text-white font-black px-4 py-1.5 uppercase tracking-wide flex items-center gap-1" style="font-size: 13px; border-radius: 0.5rem 0.5rem 0.25rem 0.25rem;">
        🚨 ÚLTIMA CHANCE! 
      </div>
      <div class="text-2xl" style="margin-top: -0.5rem;">🔥</div>
    </div>

    <!-- Titulos -->
    <h2 class="font-black text-center leading-tight tracking-tight shadow-sm" style="color: #3b1b1b; font-size: 20px; margin-top: 1.5rem;">OFERTA FINAL! NÃO VAI SE REPETIR!</h2>
    <p class="text-gray-500 text-center font-bold leading-snug" style="font-size: 14px; margin-top: 0.5rem; margin-bottom: 1.25rem;">Só porque você chegou até aqui, liberamos o <span class="text-red-500 text-red-600">MENOR PREÇO</span> do Pack Premium!</p>

    <!-- Content Box -->
    <div class="text-center relative" style="background-color: #f6fbf7; border: 1px solid #d1e8d6; border-radius: 1.5rem; padding: 1rem;">
      <div class="absolute text-green-500" style="top: 1rem; left: 1rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-crown"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path><path d="M5 21h14"></path></svg>
      </div>
      <div class="absolute text-green-500" style="top: 1rem; right: 1rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
      </div>
      
      <h3 class="font-black leading-tight mb-3 mx-8 shadow-sm" style="font-size: 16px; color: #3b1b1b;">PACK PREMIUM COMPLETO</h3>
      
      <ul class="flex flex-col items-start mx-auto font-bold mb-4" style="color: #6b7280; font-size: 13px; gap: 0.375rem; max-width: max-content;">
        <li class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check w-4 h-4 text-white rounded-sm flex-shrink-0" style="background-color: #4ad38a; padding: 1px;"><path d="M20 6 9 17l-5-5"></path></svg>+200 Moldes em todos os formatos</li>
        <li class="flex items-center gap-1.5 ml-5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check w-4 h-4 text-white rounded-sm flex-shrink-0" style="background-color: #4ad38a; padding: 1px;"><path d="M20 6 9 17l-5-5"></path></svg>Editável no Canva</li>
        <li class="flex items-center gap-1.5 ml-5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check w-4 h-4 text-white rounded-sm flex-shrink-0" style="background-color: #4ad38a; padding: 1px;"><path d="M20 6 9 17l-5-5"></path></svg>Vídeo tutorial de uso</li>
        <li class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check w-4 h-4 text-white rounded-sm flex-shrink-0" style="background-color: #4ad38a; padding: 1px;"><path d="M20 6 9 17l-5-5"></path></svg>4 Bônus exclusivos grátis</li>
      </ul>
      
      <p class="text-gray-500 line-through font-bold text-sm mb-1">De R$ 37,00</p>
      
      <div class="flex items-baseline justify-center font-black leading-none mb-3 shadow-sm" style="color: #dc2626;">
        <span class="text-xl mr-1">R$</span>
        <span class="tracking-tighter" style="font-size: 54px;">19</span>
        <span class="text-xl">,90</span>
      </div>
      
      <p class="font-black text-xs" style="color: #e26941;">⚡ PREÇO MAIS BAIXO DE TODOS! ⚡</p>
    </div>

    <!-- Buttons -->
    <a href="https://ggcheckout.com.br/checkout/v5/ObeVi2PTOSeSVsTv8q5N" class="block w-full text-white text-center font-black text-lg py-4 shadow-lg transition-transform active:scale-95 animate-cta-pulse" style="background-color: #ef8f93; border-radius: 1.2rem; margin-top: 1.25rem; box-shadow: 0 10px 15px -3px rgba(239, 143, 147, 0.4);">
      SIM! QUERO POR R$19,90 🚀
    </a>
    
    <button id="cancel-upsell" class="block w-full text-center font-black mt-4 hover:underline" style="color: #737373; font-size: 13px;">
      Não, só quero o Básico de R$ 10,00
    </button>
  </div>
</div>
`;

$('body').append(modalHtml);

const scriptHtml = `
<script>
document.addEventListener('DOMContentLoaded', () => {
    const upsellModal = document.getElementById('upsell-modal');
    const closeUpsell = document.getElementById('close-upsell');
    const cancelUpsell = document.getElementById('cancel-upsell');
    
    // Identificar os botões de plano Básico
    const basicBtns = document.querySelectorAll('a');
    basicBtns.forEach(btn => {
        if(btn.textContent.includes('QUERO O PACK BÁSICO')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // Tailwind "hidden" usually has display: none so inline class removal works
                upsellModal.classList.remove('hidden');
                upsellModal.style.display = 'flex';
            });
        }
    });
    
    // Fechar modal no X
    closeUpsell.addEventListener('click', () => {
        upsellModal.classList.add('hidden');
        upsellModal.style.display = 'none';
    });
    
    // Clicou em "Não", prossegue para check do básico
    cancelUpsell.addEventListener('click', () => {
        // Envia para Checkout Basico
        alert('Aqui entra o link do Checkout Básico de R$ 10,00! Passe-me o link para eu atualizar seu código!!');
        upsellModal.classList.add('hidden');
        upsellModal.style.display = 'none';
    });
});
</script>
`;
$('body').append(scriptHtml);

fs.writeFileSync(indexPath, $.html(), 'utf8');
console.log("-> Upsell popup injected successfully with inline styles");
