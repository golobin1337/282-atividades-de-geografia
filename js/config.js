/**
 * CONFIGURAÇÃO DA PÁGINA
 * ------------------------------------------------------------
 * Cole aqui os links reais de checkout. Enquanto um link estiver
 * vazio, os botões correspondentes rolam até a seção de planos
 * (nunca apontam para uma URL fictícia) e um aviso aparece no
 * console do navegador.
 *
 * Botões → variáveis:
 *   "QUERO MINHAS 282 ATIVIDADES!"        → URL_CHECKOUT_COMPLETO
 *   "QUERO O PLANO BÁSICO!"               → URL_CHECKOUT_BASICO
 *   "QUERO O PLANO COMPLETO + 5 BÔNUS!"   → URL_CHECKOUT_COMPLETO
 *   "SIM! QUERO O COMPLETO COM DESCONTO!" → URL_CHECKOUT_DESCONTO
 *
 * Parâmetros da URL da página (ex.: ?utm_source=...) são repassados
 * automaticamente para o checkout.
 */
window.SITE_CONFIG = {
  URL_CHECKOUT_BASICO: "",
  URL_CHECKOUT_COMPLETO: "",
  URL_CHECKOUT_DESCONTO: "",

  /**
   * RODAPÉ
   * marca       → nome exibido no rodapé (vazio = nome do produto)
   * email       → e-mail de suporte, ex.: "contato@seudominio.com.br"
   * termos      → URL da página de Termos de Uso
   * privacidade → URL da Política de Privacidade
   * Campos vazios não aparecem na página.
   */
  RODAPE: {
    marca: "",
    email: "",
    termos: "",
    privacidade: ""
  },

  /**
   * DEPOIMENTOS (Dobra 3)
   * Preencha somente com depoimentos reais e autorizados.
   * Enquanto os campos estiverem vazios, o card mostra apenas
   * um placeholder visual (nada de texto falso é publicado).
   *
   * nome  → nome da professora
   * texto → depoimento (sem aspas; elas são adicionadas automaticamente)
   * print → caminho da imagem do print, ex.: "assets/img/depoimento-1.webp"
   */
  DEPOIMENTOS: [
    // [Nome da professora 1]
    // "[Inserir depoimento real sobre economia de tempo no planejamento.]"
    { nome: "", texto: "", print: "" },

    // [Nome da professora 2]
    // "[Inserir depoimento real sobre participação dos alunos nas atividades.]"
    { nome: "", texto: "", print: "" },

    // [Nome da professora 3]
    // "[Inserir depoimento real sobre facilidade para imprimir e aplicar.]"
    { nome: "", texto: "", print: "" }
  ]
};
