// Função para corrigir links da navbar dinamicamente
function fixNavbarLinks() {
    // Detectar se estamos no GitHub Pages ou Live Server
    const isGithub = location.hostname.includes("github.io");
    const currentPath = location.pathname;
    
    // Detectar em qual subpasta estamos
    const isInCalculadoras = currentPath.includes("/calculadoras/");
    const isInProntuario = currentPath.includes("/prontuario/");
    const isInPediatria = currentPath.includes("/pediatria/");
    const isInSubfolder = isInCalculadoras || isInProntuario || isInPediatria;
    
    console.log('Corrigindo navbar - Path:', currentPath);
    console.log('Em calculadoras:', isInCalculadoras, 'Em prontuario:', isInProntuario, 'Em pediatria:', isInPediatria);
    
    // Corrigir apenas os links e imagens dentro da navbar
    const navbarContainer = document.getElementById("navbar-placeholder");
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
                // Se estivermos em uma subpasta e o link NÃO começa com "../"
                else if (isInSubfolder && !originalHref.startsWith("../")) {
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
}