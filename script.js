/**
 * Conexão Saúde | Ipaussu - Script Interativo
 * Funcionalidades: Compartilhamento inteligente, Toast de feedback, Microinterações
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Conexão Saúde | Ipaussu iniciado com sucesso.");

  const toastElement = document.getElementById("toast");
  const btnCompartilhar = document.getElementById("btn-compartilhar");
  const btnWhatsapp = document.getElementById("btn-whatsapp");
  const botoesRedes = document.querySelectorAll(".botao-rede");

  let toastTimer = null;

  /**
   * Exibe uma notificação toast personalizada na tela
   * @param {string} mensagem - Texto da mensagem
   * @param {number} duracao - Tempo em ms (padrão: 3500ms)
   */
  function mostrarToast(mensagem, duracao = 3500) {
    if (!toastElement) return;

    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    toastElement.textContent = mensagem;
    toastElement.classList.add("ativo");

    toastTimer = setTimeout(() => {
      toastElement.classList.remove("ativo");
    }, duracao);
  }

  /**
   * Compartilhamento inteligente da página
   * Utiliza a Web Share API nativa em celulares (WhatsApp, Telegram, etc.)
   * com fallback automático para cópia de link na área de transferência.
   */
  if (btnCompartilhar) {
    btnCompartilhar.addEventListener("click", async () => {
      const shareData = {
        title: "Conexão Saúde | Ipaussu",
        text: "🏥 Conexão Saúde Ipaussu: Informações oficiais da Saúde de forma rápida, clara e transparente. Informação também é cuidado! 💙 Participe do grupo oficial:",
        url: window.location.href,
      };

      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData);
          mostrarToast("Obrigado por compartilhar a saúde de Ipaussu!");
        } catch (err) {
          if (err.name !== "AbortError") {
            copiarLinkFallback();
          }
        }
      } else {
        copiarLinkFallback();
      }
    });
  }

  /**
   * Fallback de cópia de link caso Web Share não esteja disponível
   */
  async function copiarLinkFallback() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(window.location.href);
      } else {
        // Fallback antigo para navegadores legados
        const textArea = document.createElement("textarea");
        textArea.value = window.location.href;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      mostrarToast(" Link copiado! Cole no WhatsApp para enviar aos amigos.");
    } catch (error) {
      mostrarToast("Compartilhe nosso link: " + window.location.href);
    }
  }

  /**
   * Feedback ao clicar no botão do WhatsApp
   */
  if (btnWhatsapp) {
    btnWhatsapp.addEventListener("click", (e) => {
      const href = btnWhatsapp.getAttribute("href");
      
      // Feedback visual
      mostrarToast("Conectando ao WhatsApp oficial...");

      // Se o usuário ainda não colocou o link definitivo do grupo
      if (href === "SEU_LINK_DO_WHATSAPP" || href === "https://chat.whatsapp.com/") {
        console.info(
          "Lembrete: Atualize o atributo 'href' do link #btn-whatsapp no index.html com o link real do grupo ou canal oficial da Secretaria."
        );
      }
    });
  }

  /**
   * Clique amigável nas redes sociais
   */
  botoesRedes.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const rede = btn.getAttribute("data-rede") || "Rede Social";
      console.log(`Acessando canal oficial: ${rede}`);
    });
  });
});