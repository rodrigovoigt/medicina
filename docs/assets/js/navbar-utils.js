// Utilitários para carregamento da navbar
function createNavbarLoader(navbarPath = "../navbar.html") {
    return function loadNavbar() {
        console.log('Iniciando carregamento da navbar...');
        
        // Definir callback para quando a navbar for carregada
        window.navbarLoaded = function() {
            console.log('Navbar carregada - callback executado');
            setTimeout(() => {
                if (typeof fixNavbarLinks === 'function') {
                    console.log('Executando fixNavbarLinks via callback');
                    fixNavbarLinks();
                }
            }, 50);
        };
        
        fetch(navbarPath)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.text();
            })
            .then(data => {
                const placeholder = document.getElementById("navbar-placeholder");
                if (placeholder) {
                    placeholder.innerHTML = data;
                    console.log('Navbar HTML carregado');
                    
                    // Aguardar imagens e outros recursos carregarem
                    setTimeout(() => {
                        console.log('Verificando imagens carregadas...');
                        const images = placeholder.querySelectorAll('img');
                        let imagesLoaded = 0;
                        let totalImages = images.length;
                        
                        if (totalImages === 0) {
                            // Sem imagens, pode prosseguir
                            executeFixNavbar();
                        } else {
                            images.forEach(img => {
                                if (img.complete) {
                                    imagesLoaded++;
                                } else {
                                    img.onload = img.onerror = () => {
                                        imagesLoaded++;
                                        if (imagesLoaded === totalImages) {
                                            executeFixNavbar();
                                        }
                                    };
                                }
                                
                                if (imagesLoaded === totalImages) {
                                    executeFixNavbar();
                                }
                            });
                        }
                        
                        function executeFixNavbar() {
                            console.log('Tentando executar fixNavbarLinks...');
                            if (typeof fixNavbarLinks === 'function') {
                                fixNavbarLinks();
                                
                                // Garantir que as funções globais de busca estejam disponíveis
                                if (typeof setupGlobalSearchFunctions === 'function') {
                                    setupGlobalSearchFunctions();
                                    console.log('✅ Funções globais de busca configuradas via navbar-utils');
                                } else {
                                    console.log('setupGlobalSearchFunctions não encontrada - configurando fallback');
                                    setupMedicalSearchFallback();
                                }
                                
                                // Garantir que as funcionalidades de busca funcionem
                                if (typeof ensureSearchFunctionality === 'function') {
                                    ensureSearchFunctionality();
                                    console.log('✅ Funcionalidades de busca garantidas via navbar-utils');
                                }
                            } else {
                                console.log('fixNavbarLinks não encontrada, aguardando...');
                                let attempts = 0;
                                const checkFunction = () => {
                                    attempts++;
                                    if (typeof fixNavbarLinks === 'function') {
                                        console.log('fixNavbarLinks encontrada após', attempts, 'tentativas');
                                        fixNavbarLinks();
                                        
                                        // Configurar funções globais após carregamento
                                        if (typeof setupGlobalSearchFunctions === 'function') {
                                            setupGlobalSearchFunctions();
                                        } else {
                                            console.log('setupGlobalSearchFunctions não encontrada - configurando fallback');
                                            setupMedicalSearchFallback();
                                        }
                                        if (typeof ensureSearchFunctionality === 'function') {
                                            ensureSearchFunctionality();
                                        }
                                    } else if (attempts < 30) {
                                        setTimeout(checkFunction, 100);
                                    } else {
                                        console.error('fixNavbarLinks não foi carregada após múltiplas tentativas');
                                        // Aplicar fallback para busca médica
                                        setupMedicalSearchFallback();
                                    }
                                };
                                setTimeout(checkFunction, 100);
                            }
                        }
                    }, 100);
                } else {
                    console.error('navbar-placeholder não encontrado');
                }
            })
            .catch(error => {
                console.error('Erro ao carregar navbar:', error);
                // Tentar novamente após um delay
                setTimeout(loadNavbar, 2000);
            });
    };
}

// Função para inicializar o carregamento da navbar
function initializeNavbar(navbarPath = "../navbar.html") {
    const loadNavbar = createNavbarLoader(navbarPath);
    
    // Iniciar carregamento quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadNavbar);
    } else {
        // Se o DOM já está pronto, executar imediatamente
        loadNavbar();
    }
}

// Exportar funções para uso global
window.createNavbarLoader = createNavbarLoader;

// Função de fallback para garantir funcionalidade de busca médica
function setupMedicalSearchFallback() {
    console.log('🚀 Configurando fallback para busca médica');
    
    // Sites médicos confiáveis
    const trustedMedicalSites = [
        'pubmed.ncbi.nlm.nih.gov',
        'uptodate.com',
        'cochrane.org',
        'portal.cfm.org.br',
        'scielo.br',
        'msdmanuals.com',
        'consultaremedios.com.br'
    ];
    
    let lastWebSearchQuery = '';
    
    // Função para adicionar filtro de sites médicos
    window.addMedicalSiteFilter = function(event) {
        console.log('🔍 Função addMedicalSiteFilter chamada via fallback');
        
        const searchInput = document.getElementById('webSearch');
        const query = searchInput ? searchInput.value.trim() : '';
        
        if (query) {
            // Evitar processamento duplicado
            if (lastWebSearchQuery === query) {
                return true; // Permite o submit normalmente
            }
            lastWebSearchQuery = query;
            
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
            
            // Adicionar filtro de sites confiáveis à consulta
            const siteFilter = `(${trustedMedicalSites.map(site => `site:${site}`).join(' OR ')})`;
            hiddenInput.value = `${query} ${siteFilter}`;
            
            form.appendChild(hiddenInput);
            
            // Limpar o campo visível para não mostrar a consulta complexa
            searchInput.name = 'q_visible';
            
            console.log('🔍 Busca externa com filtro aplicado (fallback):', hiddenInput.value);
            
            // Feedback visual simples
            showSearchFeedbackFallback();
        } else {
            // Se não há consulta, previne o submit
            event.preventDefault();
            if (searchInput) {
                searchInput.focus();
            }
            showToastFallback('⚠️ Digite algo para buscar');
        }
    };
    
    // Feedback visual simples
    function showSearchFeedbackFallback() {
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
    
    // Toast simples para fallback
    function showToastFallback(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #495057;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 1000;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Animar entrada
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover após 3 segundos
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    console.log('✅ Fallback de busca médica configurado');
}
window.initializeNavbar = initializeNavbar;
