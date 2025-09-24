const CACHE_NAME = 'docgo-pwa-v1.0.0';
const STATIC_CACHE = 'docgo-static-v1.0.0';
const DYNAMIC_CACHE = 'docgo-dynamic-v1.0.0';

// Arquivos críticos para funcionamento offline
const STATIC_ASSETS = [
  '/',
  '/calculadoras/ldl.html',
  '/calculadoras/imc.html',
  '/calculadoras/dpp.html',
  '/calculadoras/idade-gestacional.html',
  '/calculadoras/carga-tabagica.html',
  '/calculadoras/parkland.html',
  '/calculadoras/risco-coronariano.html',
  '/calculadoras/tfg.html',
  '/prontuario/consulta-geral.html',
  '/prontuario/condutas.html',
  '/prontuario/remedios.html',
  '/assets/css/navbar-fix.css',
  '/assets/img/favicon.ico',
  '/assets/img/icon.png',
  '/assets/js/navbar-loader.js',
  '/assets/js/main.js',
  '/assets/js/navbar-utils.js',
  '/navbar.html',
  // CDN essenciais cacheados localmente
  'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js'
];

// Arquivos JavaScript das calculadoras
const CALCULATOR_JS = [
  '/assets/js/calculadoras/ldl.js',
  '/assets/js/calculadoras/imc.js',
  '/assets/js/calculadoras/dpp.js',
  '/assets/js/calculadoras/idade-gestacional.js',
  '/assets/js/calculadoras/carga-tabagica.js',
  '/assets/js/calculadoras/parkland.js',
  '/assets/js/calculadoras/risco-coronariano.js',
  '/assets/js/calculadoras/tfg.js',
  '/assets/js/prontuario/consulta-geral.js',
  '/assets/js/prontuario/condutas.js'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Service Worker instalado');
  
  event.waitUntil(
    Promise.all([
      // Cache estático (arquivos essenciais)
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[SW] Cachando arquivos estáticos...');
        return cache.addAll(STATIC_ASSETS);
      }),
      
      // Cache dinâmico (calculadoras JS)
      caches.open(DYNAMIC_CACHE).then((cache) => {
        console.log('[SW] Cachando arquivos das calculadoras...');
        return cache.addAll(CALCULATOR_JS);
      })
    ]).then(() => {
      console.log('[SW] Todos os arquivos cachados com sucesso');
      // Força a ativação imediata
      return self.skipWaiting();
    })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Service Worker ativado');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Remove caches antigos
          if (cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE && 
              cacheName !== CACHE_NAME) {
            console.log('[SW] Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Limpeza de cache concluída');
      // Toma controle imediato de todas as páginas
      return self.clients.claim();
    })
  );
});

// Interceptação de requisições (estratégia Cache First + Network Fallback)
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Ignora requisições não HTTP/HTTPS
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // Estratégia para arquivos estáticos
  if (STATIC_ASSETS.some(asset => request.url.includes(asset.replace(/^\//, '')))) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }
  
  // Estratégia para JavaScript das calculadoras
  if (CALCULATOR_JS.some(js => request.url.includes(js.replace(/^\//, '')))) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }
  
  // Para páginas HTML - Cache First com Network Fallback
  if (request.headers.get('accept').includes('text/html')) {
    event.respondWith(cacheFirstWithNetworkFallback(request));
    return;
  }
  
  // Para outros recursos - Network First
  event.respondWith(networkFirstStrategy(request));
});

// Estratégia Cache First (para recursos estáticos)
async function cacheFirstStrategy(request) {
  try {
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('[SW] Servindo do cache:', request.url);
      
      // Atualiza em background (stale-while-revalidate)
      fetch(request).then(response => {
        if (response && response.status === 200) {
          cache.put(request, response.clone());
        }
      }).catch(() => {
        // Falha silenciosa para atualização em background
      });
      
      return cachedResponse;
    }
    
    // Se não está no cache, busca na rede
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    console.log('[SW] Erro na estratégia Cache First:', error);
    
    // Fallback para offline
    if (request.headers.get('accept').includes('text/html')) {
      return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>DocGO! - Offline</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 50px;
              background-color: #a3a3a3;
            }
            .offline-container {
              background: white;
              padding: 30px;
              border-radius: 10px;
              max-width: 500px;
              margin: 0 auto;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
          </style>
        </head>
        <body>
          <div class="offline-container">
            <h2>🏥 DocGO! - Modo Offline</h2>
            <p>Você está offline. Algumas funcionalidades podem estar limitadas.</p>
            <p>As calculadoras básicas ainda funcionam!</p>
            <button onclick="window.location.reload()">Tentar Novamente</button>
          </div>
        </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

// Estratégia Cache First com Network Fallback (para HTML)
async function cacheFirstWithNetworkFallback(request) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('[SW] HTML servido do cache:', request.url);
      return cachedResponse;
    }
    
    // Tenta buscar da rede
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    console.log('[SW] Falha na rede, tentando cache:', error);
    
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    return cachedResponse || cacheFirstStrategy(request);
  }
}

// Estratégia Network First (para APIs e recursos dinâmicos)
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    console.log('[SW] Erro na rede, tentando cache:', error);
    
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    return cachedResponse || new Response('Offline', { 
      status: 503, 
      statusText: 'Service Unavailable' 
    });
  }
}

// Notificações push (para futuras atualizações)
self.addEventListener('push', (event) => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: '/assets/img/icon.png',
      badge: '/assets/img/favicon.ico',
      vibrate: [200, 100, 200],
      tag: 'docgo-notification'
    };
    
    event.waitUntil(
      self.registration.showNotification('DocGO! Update', options)
    );
  }
});

// Background sync (para futuras funcionalidades offline)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('[SW] Background sync executado');
  }
});

console.log('[SW] Service Worker carregado e pronto!');