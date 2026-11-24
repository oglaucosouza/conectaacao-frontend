const { createApp } = Vue;

createApp({
  data() {
    return {
      nomeAplicacao: "ConectaAção",
      mensagem: "Conheça as iniciativas e ações de apoio à comunidade.",
      contador: 0,
      menuAberto: false,

      agradecer: false,

      doacoes: 0,

      itens: [
        { id: 1, nome: "Cestas básicas", prioridade: "alta", ok: false },
        { id: 2, nome: "Material escolar", prioridade: "média", ok: false },
        { id: 3, nome: "Roupas infantis", prioridade: "média", ok: false },
      ],
    };
  },
}).mount("#app");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then(() => {
        console.log("Service Worker registrado com sucesso.");
      })
      .catch((erro) => {
        console.error("Erro ao registrar o Service Worker:", erro);
      });
  });
}
