// Nome do cache com versão
const CACHE_NAME = 'app-cache-v1';  // A versão facilita o controle de atualizações
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/package-lock.json',
  '/package.json',
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Adiciona todos os arquivos ao cache
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativação do Service Worker (Limpeza de caches antigos)
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME]; // Pode adicionar novos caches se necessário
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            // Limpar caches antigos
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Retorna a resposta em cache se disponível, caso contrário, realiza a requisição
      return cachedResponse || fetch(event.request).then((response) => {
        // Caso a resposta seja bem-sucedida, adiciona ao cache
        if (event.request.url.startsWith('http') && response.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
          });
        }
        return response;
      });
    })
  );
});
