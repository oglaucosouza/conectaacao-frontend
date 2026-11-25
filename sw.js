const CACHE_NAME = "conectaacao-v3";

const ARQUIVOS = [
  "./",
  "./index.html",
  "./main.js",
  "./img/campanha-doacoes.jpg",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./vue.global.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(ARQUIVOS))
      .then(() => console.log("Arquivos armazenados em cache com sucesso."))
      .catch((erro) => {
        console.error("Erro ao armazenar arquivos em cache:", erro);
        throw erro;
      }),
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((nomes) => {
      return Promise.all(
        nomes
          .filter((nome) => nome !== CACHE_NAME)
          .map((nome) => caches.delete(nome)),
      );
    }),
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches
      .match(event.request, { ignoreSearch: true })
      .then((respostaEmCache) => {
        return respostaEmCache || fetch(event.request);
      }),
  );
});
