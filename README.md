# Landing page — 282 Atividades Ilustradas de Geografia

Página estática (HTML + CSS + JS, sem build). Para publicar, envie a pasta inteira para qualquer hospedagem estática (Netlify, Vercel, Hostinger, GitHub Pages etc.).

```
index.html        → página (7 dobras)
css/styles.css    → estilos (mobile-first)
js/config.js      → LINKS DE CHECKOUT e DEPOIMENTOS  ← edite aqui
js/main.js        → liga os botões aos links e preenche os depoimentos
assets/img/       → imagens/mockups
```

## 1. Links de checkout

Edite `js/config.js`:

| Variável | Botões |
|---|---|
| `URL_CHECKOUT_COMPLETO` | "QUERO O PLANO COMPLETO + 5 BÔNUS!" (o botão do topo, "QUERO MINHAS 282 ATIVIDADES!", é âncora e rola até o card do Plano Completo) |
| `URL_CHECKOUT_BASICO` | "QUERO O PLANO BÁSICO!" |
| `URL_CHECKOUT_DESCONTO` | "SIM! QUERO O COMPLETO COM DESCONTO!" |

O botão "QUERO O PLANO BÁSICO!" do card **não vai direto ao checkout**: ele abre o popup da Oferta Especial de Desconto, onde a pessoa escolhe entre "SIM! QUERO O COMPLETO COM DESCONTO!" (→ `URL_CHECKOUT_DESCONTO`) e "QUERO O PLANO BÁSICO!" (→ `URL_CHECKOUT_BASICO`). Sem JavaScript, o botão segue direto para o checkout do Básico.

Enquanto uma variável estiver vazia, o botão rola até a seção de planos e um aviso aparece no console. Parâmetros da URL (UTMs etc.) são repassados automaticamente ao checkout.

## 2. Depoimentos

Em `js/config.js` → `DEPOIMENTOS`, preencha `nome`, `texto` e `print` (caminho da imagem) **apenas com depoimentos reais**. Sem dados, o card mostra só um placeholder visual.

## 3. Imagens

Salve os arquivos em `assets/img/` com estes nomes. Enquanto um arquivo não existir, a página exibe uma ilustração decorativa no lugar, sem quebrar o layout.

| Arquivo | Onde aparece | Tamanho sugerido |
|---|---|---|
| `hero.webp` | Dobra 1 — mockup principal (capa + páginas), fundo transparente | 848×578 (ideal: 1700×1156 para telas retina) |
| `folhas/folha-01.webp` … `folha-09.webp` | Carrossel infinito de folhas (Dobra 2, abaixo do título "Chega de perder horas…"). Para ter mais ou menos folhas, copie ou apague um `<li class="sheet">` no `index.html` | 450×637 (A4) |
| `1.webp` | Bônus 01 — Planner Semanal de Aulas | 557×371 (3:2) |
| `2.webp` | Bônus 02 — Bingos de Estados e Capitais | 557×371 (3:2) |
| `3.webp` | Bônus 03 — Quebra-Cabeças de Mapas | 558×372 (3:2) |
| `4.webp` | Bônus 04 — Dominós Geográficos | 558×372 (3:2) |
| `5.webp` | Bônus 05 — Caças ao Tesouro Geográfico | 558×372 (3:2) |
| `depoimento-1.webp` … `-3.webp` | Prints dos depoimentos (definidos no config) | 800×1000 |

Use WebP (ou PNG/JPG, trocando a extensão no `index.html`) e mantenha as proporções para evitar recortes. O selo de garantia (Dobra 6) é um SVG embutido; para trocar por imagem, veja o comentário no `index.html`.
