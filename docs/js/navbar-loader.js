// Função para corrigir links da navbar dinamicamente
function fixNavbarLinks() {
    // Detectar se estamos no GitHub Pages ou Live Server
    const isGithub = location.hostname.includes("github.io");
    const currentPath = location.pathname;
    
    // Detectar se estamos em uma subpasta
    const isInSubfolder = currentPath.includes("/calculadora/") || 
                         currentPath.includes("/exame-fisico/") || 
                         currentPath.includes("/pediatria/");
    
    console.log('Corrigindo navbar - Subpasta:', isInSubfolder, 'Path:', currentPath);
    
    // Corrigir apenas os links e imagens dentro da navbar
    const navbarContainer = document.getElementById("navbar-placeholder");
    if (navbarContainer) {
        // Corrigir links
        const links = navbarContainer.querySelectorAll("a[href]");
        links.forEach(link => {
            const originalHref = link.getAttribute("href");
            if (originalHref && !originalHref.startsWith("http") && !originalHref.startsWith("#")) {
                let correctedHref = originalHref;
                
                // Se estivermos em uma subpasta e o link NÃO começa com "../"
                if (isInSubfolder && !originalHref.startsWith("../")) {
                    correctedHref = "../" + originalHref;
                }
                // Se estivermos na raiz e o link começa com "../", remover
                else if (!isInSubfolder && originalHref.startsWith("../")) {
                    correctedHref = originalHref.substring(3);
                }
                
                // Só alterar se realmente mudou
                if (correctedHref !== originalHref) {
                    link.setAttribute("href", correctedHref);
                    console.log('Link corrigido:', originalHref, '->', correctedHref);
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
                }
                // Se estivermos na raiz e a imagem começa com "../", remover
                else if (!isInSubfolder && originalSrc.startsWith("../")) {
                    correctedSrc = originalSrc.substring(3);
                }
                
                // Sempre corrigir o src, mesmo que seja igual (força reload)
                if (isInSubfolder || correctedSrc !== originalSrc) {
                    console.log('Corrigindo imagem:', originalSrc, '->', correctedSrc);
                    
                    // Limpar src temporariamente e depois definir o correto (força reload)
                    img.removeAttribute("src");
                    
                    // Aguardar um momento e então definir o src correto
                    setTimeout(() => {
                        img.setAttribute("src", correctedSrc);
                        console.log('Imagem src definido:', correctedSrc);
                        
                        // Verificar se a imagem carregou
                        img.onload = function() {
                            console.log('✅ Imagem carregada com sucesso:', correctedSrc);
                        };
                        img.onerror = function() {
                            console.error('❌ Erro ao carregar imagem:', correctedSrc);
                            // Tentar novamente após um delay
                            setTimeout(() => {
                                img.setAttribute("src", correctedSrc + "?t=" + Date.now());
                            }, 100);
                        };
                    }, 50);
                }
            }
        });
    }
}