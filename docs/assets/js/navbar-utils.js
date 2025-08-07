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
                            } else {
                                console.log('fixNavbarLinks não encontrada, aguardando...');
                                let attempts = 0;
                                const checkFunction = () => {
                                    attempts++;
                                    if (typeof fixNavbarLinks === 'function') {
                                        console.log('fixNavbarLinks encontrada após', attempts, 'tentativas');
                                        fixNavbarLinks();
                                    } else if (attempts < 30) {
                                        setTimeout(checkFunction, 100);
                                    } else {
                                        console.error('fixNavbarLinks não foi carregada após múltiplas tentativas');
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
window.initializeNavbar = initializeNavbar;
