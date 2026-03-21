const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

const modalHtml = `
<div id="upsell-modal" class="fixed inset-0 z-[100] bg-black/80 hidden flex justify-center items-center p-4">
  <div class="bg-white rounded-[2rem] p-6 relative w-full max-w-sm border-2 border-red-500 shadow-2xl animate-fade-in-up">
    <!-- Botão Fechar -->
    <button id="close-upsell" class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg>
    </button>
    
    <!-- Badge Superior -->
    <div class="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
      <div class="bg-red-600 text-white font-black text-[13px] px-4 py-1.5 rounded-t-xl rounded-b sm uppercase tracking-wide flex items-center gap-1">
        🚨 ÚLTIMA CHANCE! 
      </div>
      <div class="text-2xl -mt-2">🔥</div>
    </div>

    <!-- Títulos -->
    <h2 class="text-[#3b1b1b] font-black text-[22px] text-center leading-tight mt-6 tracking-tight">OFERTA FINAL! NÃO VAI SE REPETIR!</h2>
    <p class="text-gray-500 text-[15px] text-center font-bold mt-2 mb-5 leading-snug">Só porque você chegou até aqui, liberamos o <span class="text-red-500">MENOR PREÇO</span> do Pack Premium!</p>

    <!-- Box Conteúdo -->
    <div class="bg-[#f2f8f4] border border-[#d1e8d6] rounded-[1.5rem] p-4 text-center relative">
      <!-- Icones de Canto -->
      <div class="absolute top-4 left-4 text-green-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-crown"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path><path d="M5 21h14"></path></svg>
      </div>
      <div class="absolute top-4 right-4 text-green-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
      </div>
      
      <h3 class="font-black text-[17px] text-[#3b1b1b] leading-tight mb-3 mx-8">PACK PREMIUM COMPLETO</h3>
      
      <ul class="flex flex-col gap-1.5 items-start max-w-fit mx-auto text-[13px] text-gray-500 font-bold mb-4">
        <li class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check w-4 h-4 text-white bg-[#4ad38a] rounded-sm p-[1px] flex-shrink-0"><path d="M20 6 9 17l-5-5"></path></svg>+200 Moldes em todos os formatos</li>
        <li class="flex items-center gap-1.5 ml-5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check w-4 h-4 text-white bg-[#4ad38a] rounded-sm p-[1px] flex-shrink-0"><path d="M20 6 9 17l-5-5"></path></svg>Editável no Canva</li>
        <li class="flex items-center gap-1.5 ml-5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check w-4 h-4 text-white bg-[#4ad38a] rounded-sm p-[1px] flex-shrink-0"><path d="M20 6 9 17l-5-5"></path></svg>Vídeo tutorial de uso</li>
        <li class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check w-4 h-4 text-white bg-[#4ad38a] rounded-sm p-[1px] flex-shrink-0"><path d="M20 6 9 17l-5-5"></path></svg>4 Bônus exclusivos grátis</li>
      </ul>
      
      <p class="text-gray-400 line-through font-bold text-sm mb-1">De R$ 37,00</p>
      
      <div class="flex items-baseline justify-center font-black text-[#dc2626] leading-none mb-3">
        <span class="text-xl mr-1">R$</span>
        <span class="text-[54px] tracking-tighter">19</span>
        <span class="text-xl">,90</span>
      </div>
      
      <p class="text-[#e26941] font-black text-xs">⚡ PREÇO MAIS BAIXO DE TODOS! ⚡</p>
    </div>

    <!-- CTA Principal -->
    <a href="https://ggcheckout.com.br/checkout/v5/ObeVi2PTOSeSVsTv8q5N" class="block w-full bg-[#ef8f93] text-white text-center font-black text-lg py-4 rounded-[1.2rem] mt-5 shadow-lg shadow-red-200 transition-transform active:scale-95 animate-cta-pulse">
      SIM! QUERO POR R$19,90 🚀
    </a>
    
    <!-- CTA Secundário (Basic) -->
    <button id="cancel-upsell" class="block w-full text-center text-[#737373] text-[13px] font-black mt-4 hover:underline">
      Não, só quero o Básico de R$ 10,00
    </button>
  </div>
</div>

<style>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
`;

// Append modal to body
$('body').append(modalHtml);

// Add JavaScript logic
const scriptHtml = `
<script>
document.addEventListener('DOMContentLoaded', () => {
    const upsellModal = document.getElementById('upsell-modal');
    const closeUpsell = document.getElementById('close-upsell');
    const cancelUpsell = document.getElementById('cancel-upsell');
    
    // Identificar os botões de plano Básico pelo texto/link apontando para '#checkout'
    const basicBtns = document.querySelectorAll('a');
    basicBtns.forEach(btn => {
        if(btn.textContent.includes('QUERO O PACK BÁSICO')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                upsellModal.classList.remove('hidden');
            });
        }
    });
    
    // Fechar modal no X
    closeUpsell.addEventListener('click', () => {
        upsellModal.classList.add('hidden');
    });
    
    // Clicou em "Não quero" (vai ter que preencher o link, por ora só fecha ou avisa)
    cancelUpsell.addEventListener('click', () => {
        // Redirecione ou insira ação aqui
        alert('Aqui entra o link do Checkout Básico de R$ 10,00! Fale com o desenvolvedor.');
        upsellModal.classList.add('hidden');
    });
});
</script>
`;
$('body').append(scriptHtml);

fs.writeFileSync(indexPath, $.html(), 'utf8');
console.log("-> Upsell popup injected successfully into index.html");
