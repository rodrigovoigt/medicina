// Função para aguardar carregamento robusto com múltiplas verificações

// Sites médicos confiáveis para filtrar a busca web
const trustedMedicalSites = [
    "pubmed.ncbi.nlm.nih.gov",
    "uptodate.com", 
    "cochrane.org",
    "portal.cfm.org.br",
    "scielo.br",
    "msdmanuals.com",
    "consultaremedios.com.br"
];

// Cache da consulta para evitar duplicação
let lastSearchQuery = '';

function waitForNavbarLoad(callback, maxAttempts = 20) {
    let attempts = 0;
    
    function checkNavbar() {
        attempts++;
        
        const navbarContainer = document.getElementById("navbar-placeholder");
        const hasContent = navbarContainer && navbarContainer.innerHTML.trim() !== '';
        const hasLinks = navbarContainer && navbarContainer.querySelectorAll("a[href]").length > 0;
        const hasImages = navbarContainer && navbarContainer.querySelectorAll("img").length > 0;
        const allImagesLoaded = navbarContainer ? 
            Array.from(navbarContainer.querySelectorAll("img")).every(img => img.complete || img.naturalWidth > 0) : 
            false;
        
        console.log(`Tentativa ${attempts}: conteúdo=${hasContent}, links=${hasLinks}, imagens=${hasImages}, todasCarregadas=${allImagesLoaded}`);
        
        // Verificar se tudo está carregado
        if (hasContent && hasLinks && hasImages && allImagesLoaded) {
            console.log('Navbar completamente carregada!');
            callback();
            return;
        }
        
        if (attempts < maxAttempts) {
            setTimeout(checkNavbar, 200); // Intervalo maior para dar tempo das imagens
        } else {
            console.log('Timeout na verificação da navbar, executando mesmo assim...');
            callback();
        }
    }
    
    checkNavbar();
}

// Função para corrigir links da navbar dinamicamente
function fixNavbarLinks() {
    // Detectar se estamos no GitHub Pages ou Live Server
    const isGithub = location.hostname.includes("github.io");
    const currentPath = location.pathname;
    
    // Detectar em qual subpasta estamos
    const isInCalculadoras = currentPath.includes("/calculadoras/");
    const isInProntuario = currentPath.includes("/prontuario/");
    const isInPediatria = currentPath.includes("/pediatria/");
    const isInCondutas = currentPath.includes("/condutas/");
    const isInExtras = currentPath.includes("/extras/");
    const isInQualEspecialidade = currentPath.includes("/qual-especialidade/");
    const isInSubfolder = isInCalculadoras || isInProntuario || isInPediatria || isInCondutas || isInExtras || isInQualEspecialidade;
    
    console.log('Corrigindo navbar - Path:', currentPath);
    console.log('Em calculadoras:', isInCalculadoras, 'Em prontuario:', isInProntuario, 'Em pediatria:', isInPediatria, 'Em condutas:', isInCondutas, 'Em extras:', isInExtras, 'Em qual-especialidade:', isInQualEspecialidade);
    
    const navbarContainer = document.getElementById("navbar-placeholder");
    if (!navbarContainer) {
        console.log('Navbar container não encontrado');
        return;
    }
    
    // Corrigir apenas os links e imagens dentro da navbar
    if (navbarContainer) {
        // Corrigir links
        const links = navbarContainer.querySelectorAll("a[href]");
        
        links.forEach(link => {
            const originalHref = link.getAttribute("href");
            if (originalHref && !originalHref.startsWith("http") && !originalHref.startsWith("#")) {
                let correctedHref = originalHref;
                
                // Caso especial: se estamos em calculadoras e o link é para outra calculadora
                if (isInCalculadoras && originalHref.startsWith("calculadoras/")) {
                    // Remove o "calculadoras/" porque já estamos na pasta
                    correctedHref = originalHref.substring(13); // Remove "calculadoras/"
                    console.log('Link calculadoras corrigido:', originalHref, '->', correctedHref);
                }
                // Caso especial: se estamos em prontuario e o link é para outra página de prontuario
                else if (isInProntuario && originalHref.startsWith("prontuario/")) {
                    correctedHref = originalHref.substring(11); // Remove "prontuario/"
                    console.log('Link prontuario corrigido:', originalHref, '->', correctedHref);
                }
                // Caso especial: se estamos em condutas e o link é para outra página de condutas
                else if (isInCondutas && originalHref.startsWith("condutas/")) {
                    correctedHref = originalHref.substring(9); // Remove "condutas/"
                    console.log('Link condutas corrigido:', originalHref, '->', correctedHref);
                }
                // Caso especial: se estamos em extras e o link é para outra página de extras
                else if (isInExtras && originalHref.startsWith("extras/")) {
                    correctedHref = originalHref.substring(7); // Remove "extras/"
                    console.log('Link extras corrigido:', originalHref, '->', correctedHref);
                }
                // Caso especial: se estamos em qual-especialidade e o link é para outra página de qual-especialidade
                else if (isInQualEspecialidade && originalHref.startsWith("qual-especialidade/")) {
                    correctedHref = originalHref.substring(19); // Remove "qual-especialidade/"
                    console.log('Link qual-especialidade corrigido:', originalHref, '->', correctedHref);
                }
                // Caso especial: Home (index.html) sempre deve apontar para a raiz
                else if (originalHref === "index.html" && isInSubfolder) {
                    correctedHref = "../index.html";
                    console.log('Link Home corrigido:', originalHref, '->', correctedHref);
                }
                // Se estivermos em uma subpasta e o link contém uma pasta mas NÃO começa com "../"
                else if (isInSubfolder && originalHref.includes("/") && !originalHref.startsWith("../")) {
                    correctedHref = "../" + originalHref;
                    console.log('Link subpasta corrigido:', originalHref, '->', correctedHref);
                }
                // Se estivermos na raiz e o link começa com "../", remover
                else if (!isInSubfolder && originalHref.startsWith("../")) {
                    correctedHref = originalHref.substring(3);
                    console.log('Link raiz corrigido:', originalHref, '->', correctedHref);
                }
                
                // Só alterar se realmente mudou
                if (correctedHref !== originalHref) {
                    link.setAttribute("href", correctedHref);
                }
            }
        });
        
        // Corrigir imagens (especialmente a logo)
        const images = navbarContainer.querySelectorAll("img[src]");
        images.forEach(img => {
            const originalSrc = img.getAttribute("src");
            if (originalSrc && !originalSrc.startsWith("http") && !originalSrc.startsWith("data:")) {
                let correctedSrc = originalSrc;
                
                // Se estivermos em uma subpasta e a imagem NÃO começa com "../"
                if (isInSubfolder && !originalSrc.startsWith("../")) {
                    correctedSrc = "../" + originalSrc;
                    console.log('Imagem corrigida:', originalSrc, '->', correctedSrc);
                }
                // Se estivermos na raiz e a imagem começa com "../", remover
                else if (!isInSubfolder && originalSrc.startsWith("../")) {
                    correctedSrc = originalSrc.substring(3);
                    console.log('Imagem raiz corrigida:', originalSrc, '->', correctedSrc);
                }
                
                // Só alterar se realmente mudou
                if (correctedSrc !== originalSrc) {
                    img.setAttribute("src", correctedSrc);
                }
            }
        });
    }
    
    // Garantir que as funcionalidades de busca funcionem
    ensureSearchFunctionality();
    
    // Garantir que as funções globais de busca estejam disponíveis
    setupGlobalSearchFunctions();
    
    // Sobrescrever funções locais com as globais (para compatibilidade)
    overrideLocalFunctions();
}

// Garantir funcionalidade de busca em todas as páginas
function ensureSearchFunctionality() {
    // Aguardar um pouco para garantir que os elementos existam
    const searchInput = document.getElementById('buscarInterno');
    const suggestions = document.getElementById('searchSuggestions');
    
    if (!searchInput || !suggestions) {
        console.log('Elementos de busca não encontrados ainda, tentando novamente...');
        setTimeout(ensureSearchFunctionality, 100);
        return;
    }
    
    // Verificar se as funções de busca já existem
    if (typeof window.filterSuggestions === 'function' && typeof window.navigateToPage === 'function') {
        console.log('Funcionalidades de busca já existem');
        return; // Já existem, não fazer nada
    }
    
    console.log('Adicionando funcionalidades de busca...');
    
    // Lista de páginas para busca
    const sitePages = [
        { title: "Quiz de Especialidades", url: "qual-especialidade/index.html", category: "Quiz", keywords: ["quiz", "especialidade", "médica", "gamificado", "neural"] },
        { title: "IMC", url: "calculadoras/imc.html", category: "Calculadora", keywords: ["imc", "peso", "massa", "corporal", "obesidade"] },
        { title: "TFG", url: "calculadoras/tfg.html", category: "Calculadora", keywords: ["tfg", "filtração", "glomerular", "rim", "creatinina"] },
        { title: "Risco Cardiovascular", url: "calculadoras/risco-coronariano.html", category: "Calculadora", keywords: ["risco", "cardiovascular", "coronário", "coração"] },
        { title: "Colesterol LDL", url: "calculadoras/ldl.html", category: "Calculadora", keywords: ["colesterol", "ldl", "lipídio"] },
        { title: "Carga Tabágica", url: "calculadoras/carga-tabagica.html", category: "Calculadora", keywords: ["carga", "tabágica", "cigarro", "fumo"] },
        { title: "Data Provável do Parto", url: "calculadoras/dpp.html", category: "Calculadora", keywords: ["dpp", "parto", "gravidez", "gestação"] },
        { title: "Idade Gestacional", url: "calculadoras/idade-gestacional.html", category: "Calculadora", keywords: ["idade", "gestacional", "gravidez"] },
        { title: "Parkland", url: "calculadoras/parkland.html", category: "Calculadora", keywords: ["parkland", "queimadura", "ressuscitação"] },
        { title: "Consulta Geral", url: "prontuario/consulta-geral.html", category: "Prontuário", keywords: ["consulta", "geral", "exame", "físico"] },
        { title: "Formatar Medicações", url: "prontuario/remedios.html", category: "Prontuário", keywords: ["medicação", "remédio", "ipm", "formatar"] },
        { title: "Modelos de Laudos", url: "prontuario/radiologia-laudos.html", category: "Prontuário", keywords: ["laudo", "radiologia", "raio-x"] },
        { title: "Guia de Prescrição", url: "condutas/index.html", category: "Prontuário", keywords: ["prescrição", "medicação", "condutas"] },
        { title: "Sistema de Pediatria", url: "pediatria/ajuda-pediatria.html", category: "Pediatria", keywords: ["pediatria", "criança", "pediátrico"] },
        { title: "Agradecimentos", url: "extras/agradecimentos.html", category: "Geral", keywords: ["agradecimentos", "créditos", "colaboradores"] },
        { title: "PedBook", url: "https://www.pedb.com.br/", category: "Externa", keywords: ["pedbook", "pediatria", "site", "externo"] },
        { title: "Banco de Questões", url: "https://rodrigovoigt.github.io/PythonHTML-Questoes-Comentadas/", category: "Externa", keywords: ["questões", "prova", "residência"] }
    ];
    
    // Definir função de busca global
    window.filterSuggestions = function() {
        const query = document.getElementById('buscarInterno').value.toLowerCase().trim();
        const suggestions = document.getElementById('searchSuggestions');
        
        if (query.length < 2) {
            suggestions.innerHTML = '';
            suggestions.style.display = 'none';
            return;
        }
        
        const filteredPages = sitePages.filter(page => {
            return page.title.toLowerCase().includes(query) ||
                   page.category.toLowerCase().includes(query) ||
                   page.keywords.some(keyword => keyword.includes(query));
        });
        
        if (filteredPages.length === 0) {
            suggestions.innerHTML = '<li class="list-group-item text-muted text-center py-3">Nenhum resultado encontrado</li>';
        } else {
            suggestions.innerHTML = filteredPages.slice(0, 6).map(page => {
                let badgeColor = 'secondary';
                let badgeText = page.category;
                switch(page.category) {
                    case 'Quiz': badgeColor = 'dark'; break;
                    case 'Calculadora': badgeColor = 'primary'; break;
                    case 'Prontuário': badgeColor = 'success'; break;
                    case 'Pediatria': badgeColor = 'info'; break;
                    case 'Geral': badgeColor = 'danger'; break;
                    case 'Externa': badgeColor = 'warning'; badgeText = 'Externo'; break;
                }
                
                return `<li class="list-group-item list-group-item-action" onclick="navigateToPage('${page.url}')" style="cursor: pointer;">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="flex-grow-1 text-truncate me-2">
                            <div class="d-flex align-items-center gap-2 mb-1">
                                <strong class="text-dark text-truncate">${page.title}</strong>
                                <span class="badge bg-${badgeColor} text-white flex-shrink-0">${badgeText}</span>
                            </div>
                            <small class="text-muted text-truncate d-block">
                                ${page.keywords.slice(0, 3).join(' • ')}
                            </small>
                        </div>
                    </div>
                </li>`;
            }).join('');
        }
        
        suggestions.style.display = 'block';
    };
    
    // Definir função de navegação global
    window.navigateToPage = function(url) {
        if (url.startsWith('http')) {
            window.open(url, '_blank');
        } else {
            // Usar a mesma lógica de detecção de pasta
            const currentPath = window.location.pathname;
            const isInCalculadoras = currentPath.includes("/calculadoras/");
            const isInProntuario = currentPath.includes("/prontuario/");
            const isInPediatria = currentPath.includes("/pediatria/");
            const isInCondutas = currentPath.includes("/condutas/");
            const isInExtras = currentPath.includes("/extras/");
            const isInQualEspecialidade = currentPath.includes("/qual-especialidade/");
            const isInSubfolder = isInCalculadoras || isInProntuario || isInPediatria || isInCondutas || isInExtras || isInQualEspecialidade;
            
            let finalUrl = url;
            
            // Aplicar correções de caminho
            if (isInCalculadoras && url.startsWith("calculadoras/")) {
                finalUrl = url.substring(13);
            } else if (isInProntuario && url.startsWith("prontuario/")) {
                finalUrl = url.substring(11);
            } else if (isInCondutas && url.startsWith("condutas/")) {
                finalUrl = url.substring(9);
            } else if (isInExtras && url.startsWith("extras/")) {
                finalUrl = url.substring(7);
            } else if (isInQualEspecialidade && url.startsWith("qual-especialidade/")) {
                finalUrl = url.substring(19);
            } else if (isInSubfolder && !url.startsWith("../")) {
                finalUrl = "../" + url;
            } else if (!isInSubfolder && url.startsWith("../")) {
                finalUrl = url.substring(3);
            }
            
            window.location.href = finalUrl;
        }
        document.getElementById('searchSuggestions').style.display = 'none';
        document.getElementById('buscarInterno').value = '';
    };
    
    // Adicionar event listeners com múltiplas tentativas
    let attempts = 0;
    const maxAttempts = 10;
    
    function addEventListeners() {
        attempts++;
        const searchInput = document.getElementById('buscarInterno');
        const suggestions = document.getElementById('searchSuggestions');
        
        if (!searchInput || !suggestions) {
            if (attempts < maxAttempts) {
                console.log(`Tentativa ${attempts}: Elementos não encontrados ainda, tentando novamente...`);
                setTimeout(addEventListeners, 200);
            } else {
                console.log('Máximo de tentativas atingido para adicionar event listeners');
            }
            return;
        }
        
        if (searchInput && !searchInput.hasAttribute('data-listeners-added')) {
            searchInput.setAttribute('data-listeners-added', 'true');
            
            // Fechar sugestões ao clicar fora
            document.addEventListener('click', function(event) {
                const searchContainer = event.target.closest('.position-relative');
                if (!searchContainer && suggestions) {
                    suggestions.style.display = 'none';
                }
            });

            // Navegação por teclado
            searchInput.addEventListener('keydown', function(event) {
                if (!suggestions) return;
                
                const items = suggestions.querySelectorAll('.list-group-item-action');
                
                if (event.key === 'Enter' && items.length > 0) {
                    event.preventDefault();
                    items[0].click();
                } else if (event.key === 'Escape') {
                    suggestions.style.display = 'none';
                }
            });
            
            console.log('Event listeners de busca adicionados com sucesso');
        } else {
            console.log('Event listeners já foram adicionados ou elemento não encontrado');
        }
    }
    
    // Iniciar tentativas de adicionar event listeners
    addEventListeners();
}

// Função principal para carregar a navbar com carregamento robusto
function loadNavbar() {
    console.log('Iniciando carregamento da navbar...');
    
    // Detectar caminho correto da navbar
    const currentPath = location.pathname;
    const isInSubfolder = currentPath.includes("/calculadoras/") || 
                          currentPath.includes("/prontuario/") || 
                          currentPath.includes("/pediatria/") || 
                          currentPath.includes("/condutas/") || 
                          currentPath.includes("/extras/") ||
                          currentPath.includes("/qual-especialidade/");
    
    const navbarPath = isInSubfolder ? '../navbar.html' : 'navbar.html';
    
    console.log('Caminho da navbar:', navbarPath);
    
    // Carregar navbar via fetch
    fetch(navbarPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            console.log('Navbar HTML carregada, inserindo no DOM...');
            document.getElementById("navbar-placeholder").innerHTML = data;
            
            // Usar o sistema robusto de espera
            waitForNavbarLoad(() => {
                console.log('Executando correção da navbar...');
                try {
                    fixNavbarLinks();
                    console.log('fixNavbarLinks executado com sucesso');
                    
                    // Garantir que a funcionalidade de busca funcione
                    ensureSearchFunctionality();
                    
                    // Verificar se existe callback navbarLoaded (do navbar.html)
                    if (typeof window.navbarLoaded === 'function') {
                        window.navbarLoaded();
                    }
                    
                } catch (error) {
                    console.error('Erro ao executar fixNavbarLinks:', error);
                }
            });
        })
        .catch(error => {
            console.error('Erro ao carregar navbar:', error);
            console.error('Tentando caminho alternativo...');
            
            // Tentar caminho alternativo
            const alternativePath = isInSubfolder ? 'navbar.html' : '../navbar.html';
            fetch(alternativePath)
                .then(res => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.text();
                })
                .then(data => {
                    console.log('Navbar carregada com caminho alternativo');
                    document.getElementById("navbar-placeholder").innerHTML = data;
                    
                    waitForNavbarLoad(() => {
                        fixNavbarLinks();
                        ensureSearchFunctionality();
                        if (typeof window.navbarLoaded === 'function') {
                            window.navbarLoaded();
                        }
                    });
                })
                .catch(altError => {
                    console.error('Erro também no caminho alternativo:', altError);
                    console.log('Tentando múltiplos caminhos...');
                    
                    // Lista de possíveis caminhos
                    const possiblePaths = [
                        './navbar.html',
                        '../navbar.html',
                        '../../navbar.html',
                        './docs/navbar.html',
                        '../docs/navbar.html'
                    ];
                    
                    let pathIndex = 0;
                    
                    function tryNextPath() {
                        if (pathIndex >= possiblePaths.length) {
                            console.error('Todos os caminhos falharam para carregar a navbar');
                            return;
                        }
                        
                        const testPath = possiblePaths[pathIndex++];
                        console.log(`Tentando caminho ${pathIndex}/${possiblePaths.length}: ${testPath}`);
                        
                        fetch(testPath)
                            .then(res => {
                                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                                return res.text();
                            })
                            .then(data => {
                                console.log(`Sucesso com caminho: ${testPath}`);
                                document.getElementById("navbar-placeholder").innerHTML = data;
                                
                                waitForNavbarLoad(() => {
                                    fixNavbarLinks();
                                    ensureSearchFunctionality();
                                    if (typeof window.navbarLoaded === 'function') {
                                        window.navbarLoaded();
                                    }
                                });
                            })
                            .catch(() => {
                                tryNextPath();
                            });
                    }
                    
                    tryNextPath();
                });
        });
}

// Garantir que as funções globais estejam sempre disponíveis
function setupGlobalSearchFunctions() {
    // Garantir que addMedicalSiteFilter esteja no escopo global
    if (typeof window.addMedicalSiteFilter !== 'function') {
        window.addMedicalSiteFilter = addMedicalSiteFilter;
    }
    
    // Garantir que showToastMessage esteja no escopo global
    if (typeof window.showToastMessage !== 'function') {
        window.showToastMessage = showToastMessage;
    }
    
    // ALIAS para compatibilidade - showToast aponta para showToastMessage
    if (typeof window.showToast !== 'function') {
        window.showToast = showToastMessage;
    }
    
    // Exportar array de sites médicos
    if (typeof window.trustedMedicalSites === 'undefined') {
        window.trustedMedicalSites = trustedMedicalSites;
    }
    
    console.log('✅ Funções globais de busca configuradas');
    console.log('📋 Sites médicos disponíveis:', trustedMedicalSites.length);
}

// Sobrescrever funções locais que podem existir nas páginas
function overrideLocalFunctions() {
    // Força showToast global em todas as páginas (substituindo versões locais)
    window.showToast = showToastMessage;
    
    // Se existir jQuery, também disponibilizar via jQuery
    if (typeof $ !== 'undefined') {
        $.showToast = showToastMessage;
    }
    
    // Interceptar e substituir console.log de debug para mostrar que a global está ativa
    const originalLog = console.log;
    let hasLoggedGlobalToast = false;
    
    // Verificar se houve conflito de função e notificar
    setTimeout(() => {
        if (!hasLoggedGlobalToast) {
            console.log('🌐 Toast global ativo - substituindo versões locais');
            hasLoggedGlobalToast = true;
        }
    }, 1000);
    
    console.log('🔄 Override de funções locais aplicado');
}

// Função global para adicionar filtro de sites médicos à busca web
function addMedicalSiteFilter(event) {
    const searchInput = document.getElementById('webSearch');
    const query = searchInput ? searchInput.value.trim() : '';
    
    if (query) {
        // Evitar processamento duplicado
        if (lastSearchQuery === query) {
            return true; // Permite o submit normalmente
        }
        lastSearchQuery = query;
        
        // Criar um input hidden com a consulta filtrada
        const form = event.target;
        
        // Remove input hidden anterior se existir
        const existingHidden = form.querySelector('input[name="q"][type="hidden"]');
        if (existingHidden) {
            existingHidden.remove();
        }
        
        // Criar novo input hidden com a consulta filtrada
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'q';
        
        // Adicionar filtro de sites confiáveis à consulta usando sintaxe otimizada
        const siteFilter = `(${trustedMedicalSites.map(site => `site:${site}`).join(' OR ')})`;
        hiddenInput.value = `${query} ${siteFilter}`;
        
        form.appendChild(hiddenInput);
        
        // Limpar o campo visível para não mostrar a consulta complexa
        searchInput.name = 'q_visible';
        
        console.log('🔍 Busca externa com filtro aplicado:', hiddenInput.value);
        
        // Feedback visual da busca
        showSearchFeedback();
    } else {
        // Se não há consulta, previne o submit
        event.preventDefault();
        if (searchInput) {
            searchInput.focus();
        }
        showToastMessage('⚠️ Digite algo para buscar', 'warning');
    }
}

// Função para mostrar feedback da busca externa
function showSearchFeedback() {
    const button = document.querySelector('button[title*="sites médicos"]');
    if (button) {
        const originalContent = button.innerHTML;
        
        button.innerHTML = '<small>✅</small>';
        button.style.background = 'rgba(40, 167, 69, 0.2)';
        
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.style.background = '';
        }, 1500);
    }
}

// Função genérica para mostrar mensagens toast (compatível com showToast local)
function showToastMessage(message, type = 'info') {
    // Detectar se message é apenas string (formato antigo) ou com tipo
    let toastMessage = message;
    let toastType = type;
    
    // Auto-detectar tipo baseado em emojis/símbolos no message
    if (typeof message === 'string') {
        if (message.includes('✅') || message.includes('sucesso')) {
            toastType = 'success';
        } else if (message.includes('❌') || message.includes('erro') || message.includes('Erro')) {
            toastType = 'error';
        } else if (message.includes('⚠️') || message.includes('aviso')) {
            toastType = 'warning';
        }
    }
    
    // Cores baseadas no tipo
    let backgroundColor, textColor;
    switch(toastType) {
        case 'success':
            backgroundColor = '#28a745';
            textColor = 'white';
            break;
        case 'error':
            backgroundColor = '#dc3545';
            textColor = 'white';
            break;
        case 'warning':
            backgroundColor = '#ffc107';
            textColor = '#000';
            break;
        default:
            backgroundColor = '#495057';
            textColor = 'white';
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast-custom';
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${backgroundColor};
        color: ${textColor};
        padding: 12px 20px;
        border-radius: 6px;
        z-index: 1000;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    toast.textContent = toastMessage;
    
    document.body.appendChild(toast);
    
    // Anima a entrada
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove após 3 segundos
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Executar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
} else {
    loadNavbar();
}