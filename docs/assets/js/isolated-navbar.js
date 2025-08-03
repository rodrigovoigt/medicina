// CSS para navbar isolada - aplica em páginas com CSS conflitante
function applyIsolatedNavbar() {
    const style = document.createElement('style');
    style.innerHTML = `
        /* Isolamento da navbar - resetar estilos que podem interferir */
        .navbar-isolated {
            all: initial;
            font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #212529;
            text-align: left;
            background-color: #fff;
            width: 100%;
            display: block;
            position: relative;
            z-index: 1050;
        }

        /* Reaplica os estilos Bootstrap necessários apenas para a navbar */
        .navbar-isolated * {
            box-sizing: border-box;
        }

        .navbar-isolated .navbar {
            background-color: #00a66c !important;
            padding: 0.5rem 1rem;
            position: relative;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
        }

        .navbar-isolated .container-fluid {
            width: 100%;
            padding-right: var(--bs-gutter-x, 0.75rem);
            padding-left: var(--bs-gutter-x, 0.75rem);
            margin-right: auto;
            margin-left: auto;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
        }

        .navbar-isolated .navbar-brand {
            display: inline-block;
            padding-top: 0.3125rem;
            padding-bottom: 0.3125rem;
            margin-right: 1rem;
            font-size: 1.1rem;
            line-height: inherit;
            white-space: nowrap;
            text-decoration: none;
            color: white !important;
        }

        .navbar-isolated .navbar-nav {
            display: flex;
            flex-direction: row;
            padding-left: 0;
            margin-bottom: 0;
            list-style: none;
            align-items: center;
        }

        .navbar-isolated .nav-item {
            list-style: none;
        }

        .navbar-isolated .nav-link {
            display: block;
            padding: 0.5rem 0.75rem;
            color: white !important;
            text-decoration: none;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
            border: 0;
            background: none;
            font-size: 0.95rem;
        }

        .navbar-isolated .nav-link:hover {
            color: rgba(255,255,255,0.75) !important;
        }

        .navbar-isolated .dropdown-toggle::after {
            display: inline-block;
            margin-left: 0.255em;
            vertical-align: 0.255em;
            content: "";
            border-top: 0.3em solid;
            border-right: 0.3em solid transparent;
            border-bottom: 0;
            border-left: 0.3em solid transparent;
        }

        .navbar-isolated .dropdown {
            position: relative;
        }

        .navbar-isolated .dropdown-menu {
            position: absolute;
            top: 100%;
            z-index: 1000;
            display: none;
            min-width: 10rem;
            padding: 0.5rem 0;
            margin: 0.125rem 0 0;
            font-size: 1rem;
            color: #212529;
            text-align: left;
            list-style: none;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid rgba(0,0,0,0.15);
            border-radius: 0.375rem;
            box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
        }

        .navbar-isolated .dropdown-menu.show {
            display: block;
        }

        .navbar-isolated .dropdown-item {
            display: block;
            width: 100%;
            padding: 0.25rem 1rem;
            clear: both;
            font-weight: 400;
            color: #212529;
            text-align: inherit;
            text-decoration: none;
            white-space: nowrap;
            background-color: transparent;
            border: 0;
            cursor: pointer;
        }

        .navbar-isolated .dropdown-item:hover,
        .navbar-isolated .dropdown-item:focus {
            color: #1e2125;
            background-color: #e9ecef;
        }

        .navbar-isolated .btn {
            display: inline-block;
            font-weight: 400;
            line-height: 1.5;
            color: #212529;
            text-align: center;
            text-decoration: none;
            vertical-align: middle;
            cursor: pointer;
            border: 1px solid transparent;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            border-radius: 0.375rem;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }

        .navbar-isolated .btn-outline-light {
            color: #f8f9fa;
            border-color: rgba(255,255,255,0.3);
            border-width: 2px;
        }

        .navbar-isolated .btn-outline-light:hover {
            color: #000;
            background-color: rgba(255,255,255,0.1);
            border-color: white;
        }

        .navbar-isolated .navbar-toggler {
            padding: 0.25rem 0.75rem;
            font-size: 1.25rem;
            line-height: 1;
            background-color: transparent;
            border: 1px solid transparent;
            border-radius: 0.375rem;
            transition: box-shadow 0.15s ease-in-out;
            color: white;
            border-color: rgba(255,255,255,0.1);
        }

        .navbar-isolated .navbar-toggler:focus {
            text-decoration: none;
            outline: 0;
            box-shadow: 0 0 0 0.25rem;
        }

        .navbar-isolated .navbar-toggler-icon {
            display: inline-block;
            width: 1.5em;
            height: 1.5em;
            vertical-align: middle;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100%;
        }

        /* Offcanvas específico para navbar isolada */
        .navbar-isolated .offcanvas {
            position: fixed;
            bottom: 0;
            z-index: 1045;
            display: flex;
            flex-direction: column;
            max-width: 100%;
            visibility: hidden;
            background-color: #fff;
            background-clip: padding-box;
            outline: 0;
            transition: transform 0.3s ease-in-out;
        }

        .navbar-isolated .offcanvas.show {
            visibility: visible;
        }

        .navbar-isolated .offcanvas-start {
            top: 0;
            left: 0;
            width: 400px;
            border-right: 1px solid rgba(0,0,0,0.2);
            transform: translateX(-100%);
        }

        .navbar-isolated .offcanvas-start.show {
            transform: none;
        }

        .navbar-isolated .offcanvas-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 1rem;
            background-color: #00a66c;
            color: white;
        }

        .navbar-isolated .offcanvas-title {
            margin-bottom: 0;
            color: white;
            font-size: 1.25rem;
        }

        .navbar-isolated .offcanvas-body {
            flex-grow: 1;
            padding: 1rem 1rem;
            overflow-y: auto;
            background-color: #f8f9fa;
        }

        .navbar-isolated .offcanvas-body .nav-link {
            color: #333 !important;
            padding: 8px 15px;
            border-radius: 5px;
            margin-bottom: 5px;
            transition: all 0.3s ease;
        }

        .navbar-isolated .offcanvas-body .nav-link:hover {
            background-color: #00a66c !important;
            color: white !important;
        }

        .navbar-isolated .offcanvas-body .dropdown-menu {
            background-color: #f8f9fa;
            border: none;
            box-shadow: none;
            margin-left: 15px;
            position: static;
            display: block;
        }

        .navbar-isolated .offcanvas-body .dropdown-item {
            color: #666;
            padding: 5px 15px;
            font-size: 0.9rem;
        }

        .navbar-isolated .offcanvas-body .dropdown-item:hover {
            background-color: #e9ecef;
            color: #333;
        }

        .navbar-isolated .btn-close {
            box-sizing: content-box;
            width: 1em;
            height: 1em;
            padding: 0.25em 0.25em;
            color: #000;
            background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='m.235.757 14.014 14.009a.7.7 0 1 0 .99-.99L1.224.766a.7.7 0 1 0-.99.99z'/%3e%3cpath d='m14.267.766L.253 14.756a.7.7 0 1 0 .99.99L15.257 1.756a.7.7 0 1 0-.99-.99z'/%3e%3c/svg%3e") center/1em auto no-repeat;
            border: 0;
            border-radius: 0.375rem;
            opacity: 0.5;
            filter: invert(1);
        }

        .navbar-isolated .btn-close:hover {
            opacity: 0.75;
        }

        /* Accordion específico para navbar isolada */
        .navbar-isolated .accordion {
            --bs-accordion-color: #212529;
            --bs-accordion-bg: #fff;
            --bs-accordion-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease;
            --bs-accordion-border-color: var(--bs-border-color);
            --bs-accordion-border-width: 1px;
            --bs-accordion-border-radius: 0.375rem;
            --bs-accordion-inner-border-radius: calc(0.375rem - 1px);
            --bs-accordion-btn-padding-x: 1.25rem;
            --bs-accordion-btn-padding-y: 1rem;
            --bs-accordion-btn-color: var(--bs-body-color);
            --bs-accordion-btn-bg: var(--bs-accordion-bg);
            --bs-accordion-btn-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
            --bs-accordion-btn-icon-width: 1.25rem;
            --bs-accordion-btn-icon-transform: rotate(-180deg);
            --bs-accordion-btn-icon-transition: transform 0.2s ease-in-out;
            --bs-accordion-btn-active-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%2300a66c'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
            --bs-accordion-btn-focus-border-color: #00a66c;
            --bs-accordion-btn-focus-box-shadow: none;
            --bs-accordion-body-padding-x: 1.25rem;
            --bs-accordion-body-padding-y: 1rem;
            --bs-accordion-active-color: #00a66c;
            --bs-accordion-active-bg: #e8f5e8;
        }

        .navbar-isolated .accordion-button {
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
            padding: var(--bs-accordion-btn-padding-y) var(--bs-accordion-btn-padding-x);
            font-size: 1rem;
            color: var(--bs-accordion-btn-color);
            text-align: left;
            background-color: var(--bs-accordion-btn-bg);
            border: 0;
            border-radius: 0;
            overflow-anchor: none;
            transition: var(--bs-accordion-transition);
        }

        .navbar-isolated .accordion-button:not(.collapsed) {
            color: var(--bs-accordion-active-color);
            background-color: var(--bs-accordion-active-bg);
            box-shadow: inset 0 calc(-1 * var(--bs-accordion-border-width)) 0 var(--bs-accordion-border-color);
        }

        .navbar-isolated .accordion-button:not(.collapsed)::after {
            background-image: var(--bs-accordion-btn-active-icon);
            transform: var(--bs-accordion-btn-icon-transform);
        }

        .navbar-isolated .accordion-button::after {
            flex-shrink: 0;
            width: var(--bs-accordion-btn-icon-width);
            height: var(--bs-accordion-btn-icon-width);
            margin-left: auto;
            content: "";
            background-image: var(--bs-accordion-btn-icon);
            background-repeat: no-repeat;
            background-size: var(--bs-accordion-btn-icon-width);
            transition: var(--bs-accordion-btn-icon-transition);
        }

        .navbar-isolated .accordion-button:hover {
            z-index: 2;
        }

        .navbar-isolated .accordion-button:focus {
            z-index: 3;
            border-color: var(--bs-accordion-btn-focus-border-color);
            outline: 0;
            box-shadow: var(--bs-accordion-btn-focus-box-shadow);
        }

        /* Links do accordion no offcanvas - cores corretas */
        .navbar-isolated .accordion-body a {
            color: #000 !important;
            transition: color 0.2s ease;
            text-decoration: none;
            display: block;
            padding: 5px 15px;
            border-radius: 5px;
            margin-bottom: 5px;
        }

        .navbar-isolated .accordion-body a:hover {
            color: white !important;
            text-decoration: none;
            background-color: #00a66c !important;
        }

        /* Garantir que imagens funcionem */
        .navbar-isolated img {
            vertical-align: middle;
            max-width: 100%;
            height: auto;
        }

        /* Responsive */
        @media (max-width: 991.98px) {
            .navbar-isolated .navbar-nav {
                display: none;
            }
        }

        @media (min-width: 992px) {
            .navbar-isolated .navbar-toggler {
                display: none;
            }
        }

        .navbar-isolated .accordion-header {
            margin-bottom: 0;
        }

        .navbar-isolated .accordion-item {
            color: var(--bs-accordion-color);
            background-color: var(--bs-accordion-bg);
            border: var(--bs-accordion-border-width) solid var(--bs-accordion-border-color);
        }

        .navbar-isolated .accordion-item:first-of-type {
            border-top-left-radius: var(--bs-accordion-border-radius);
            border-top-right-radius: var(--bs-accordion-border-radius);
        }

        .navbar-isolated .accordion-item:first-of-type .accordion-button {
            border-top-left-radius: var(--bs-accordion-inner-border-radius);
            border-top-right-radius: var(--bs-accordion-inner-border-radius);
        }

        .navbar-isolated .accordion-item:not(:first-of-type) {
            border-top: 0;
        }

        .navbar-isolated .accordion-item:last-of-type {
            border-bottom-right-radius: var(--bs-accordion-border-radius);
            border-bottom-left-radius: var(--bs-accordion-border-radius);
        }

        .navbar-isolated .accordion-item:last-of-type .accordion-button.collapsed {
            border-bottom-right-radius: var(--bs-accordion-inner-border-radius);
            border-bottom-left-radius: var(--bs-accordion-inner-border-radius);
        }

        .navbar-isolated .accordion-item:last-of-type .accordion-collapse {
            border-bottom-right-radius: var(--bs-accordion-border-radius);
            border-bottom-left-radius: var(--bs-accordion-border-radius);
        }

        .navbar-isolated .accordion-body {
            padding: var(--bs-accordion-body-padding-y) var(--bs-accordion-body-padding-x);
        }

        .navbar-isolated .accordion-flush .accordion-collapse {
            border-width: 0;
        }

        .navbar-isolated .accordion-flush .accordion-item {
            border-right: 0;
            border-left: 0;
            border-radius: 0;
        }

        .navbar-isolated .accordion-flush .accordion-item:first-child {
            border-top: 0;
        }

        .navbar-isolated .accordion-flush .accordion-item:last-child {
            border-bottom: 0;
        }

        .navbar-isolated .accordion-flush .accordion-item .accordion-button {
            border-radius: 0;
        }

        .navbar-isolated .accordion-flush .accordion-item .accordion-button,
        .navbar-isolated .accordion-flush .accordion-item .accordion-button.collapsed {
            border-radius: 0;
        }

        .navbar-isolated .collapse:not(.show) {
            display: none;
        }

        .navbar-isolated .collapsing {
            height: 0;
            overflow: hidden;
            transition: height 0.35s ease;
        }
    `;
    document.head.appendChild(style);
}

// Função para carregar navbar isolada
function loadIsolatedNavbar(pathToNavbar = '../../navbar.html') {
    console.log('Iniciando carregamento da navbar isolada...');
    
    // Aplicar CSS
    applyIsolatedNavbar();
    
    // Função para aguardar que o navbar-loader.js carregue
    function waitForNavbarLoader(callback) {
        if (window.fixNavbarLinks && typeof window.fixNavbarLinks === 'function') {
            callback();
        } else {
            setTimeout(() => waitForNavbarLoader(callback), 100);
        }
    }
    
    // Carregar Bootstrap JS se não estiver carregado
    if (!window.bootstrap) {
        console.log('Carregando Bootstrap JS...');
        const bootstrapScript = document.createElement('script');
        bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js';
        bootstrapScript.integrity = 'sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4';
        bootstrapScript.crossOrigin = 'anonymous';
        document.head.appendChild(bootstrapScript);
    }
    
    // Carregar navbar-loader.js se não estiver carregado
    if (!window.fixNavbarLinks) {
        console.log('Carregando navbar-loader.js...');
        const navbarScript = document.createElement('script');
        navbarScript.src = '../../js/navbar-loader.js';
        navbarScript.defer = true;
        navbarScript.onload = function() {
            console.log('navbar-loader.js carregado com sucesso');
        };
        navbarScript.onerror = function() {
            console.error('Erro ao carregar navbar-loader.js');
        };
        document.head.appendChild(navbarScript);
    }
    
    // Carregar navbar
    console.log('Fazendo fetch da navbar:', pathToNavbar);
    fetch(pathToNavbar)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            }
            return res.text();
        })
        .then(data => {
            console.log('Navbar HTML carregada, inserindo no DOM...');
            document.getElementById("navbar-placeholder").innerHTML = data;
            
            // Aguardar scripts carregarem e DOM processar
            setTimeout(() => {
                console.log('Aguardando navbar-loader.js...');
                waitForNavbarLoader(() => {
                    console.log('Executando correção da navbar isolada...');
                    try {
                        fixNavbarLinks();
                        console.log('fixNavbarLinks executado com sucesso');
                        
                        // Verificação adicional para garantir que as imagens carreguem
                        setTimeout(() => {
                            const logoImg = document.querySelector('#navbar-placeholder img[alt*="Logo"]');
                            if (logoImg && !logoImg.complete) {
                                console.log('Forçando reload da logo...');
                                const currentSrc = logoImg.src;
                                logoImg.src = '';
                                logoImg.src = currentSrc;
                            }
                        }, 100);
                        
                        // Garantir que a funcionalidade de busca funcione
                        ensureSearchFunctionality();
                        
                    } catch (error) {
                        console.error('Erro ao executar fixNavbarLinks:', error);
                    }
                });
            }, 500);
        })
        .catch(error => {
            console.error('Erro ao carregar navbar:', error);
            console.error('Tentando caminho alternativo...');
            
            // Tentar caminho alternativo
            const alternativePath = '../navbar.html';
            fetch(alternativePath)
                .then(res => res.text())
                .then(data => {
                    console.log('Navbar carregada com caminho alternativo');
                    document.getElementById("navbar-placeholder").innerHTML = data;
                    setTimeout(() => {
                        waitForNavbarLoader(() => {
                            fixNavbarLinks();
                            ensureSearchFunctionality();
                        });
                    }, 500);
                })
                .catch(altError => {
                    console.error('Erro mesmo com caminho alternativo:', altError);
                });
        });
}

// Função para corrigir links da navbar baseado na página atual
function fixNavbarLinks() {
    const currentPath = window.location.pathname;
    const navbar = document.querySelector('nav');
    
    if (!navbar) return;
    
    // Detectar se estamos em uma subpasta
    const pathParts = currentPath.split('/').filter(part => part && part !== 'index.html');
    const isInSubfolder = pathParts.length > 1 || (pathParts.length === 1 && !currentPath.endsWith('index.html'));
    
    if (isInSubfolder) {
        // Contar níveis de profundidade
        const levels = pathParts.length - 1;
        const prefix = '../'.repeat(levels);
        
        // Corrigir todos os links relativos na navbar
        const links = navbar.querySelectorAll('a[href]:not([href^="http"]):not([href^="#"]):not([href^="javascript"])');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (!href.startsWith('../') && !href.startsWith('/')) {
                link.setAttribute('href', prefix + href);
            }
        });
        
        // Corrigir ação dos formulários
        const forms = navbar.querySelectorAll('form[action]:not([action^="http"])');
        forms.forEach(form => {
            const action = form.getAttribute('action');
            if (action && !action.startsWith('../') && !action.startsWith('/')) {
                form.setAttribute('action', prefix + action);
            }
        });
    }
}

// Garantir funcionalidade de busca em todas as páginas
function ensureSearchFunctionality() {
    // Verificar se as funções de busca já existem
    if (typeof window.filterSuggestions === 'function' && typeof window.navigateToPage === 'function') {
        return; // Já existem, não fazer nada
    }
    
    console.log('Criando funcionalidades de busca para navbar isolada...');
    
    // Lista de páginas para busca (simplificada para funcionar isoladamente)
    const sitePages = [
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
            // Detectar caminho atual e ajustar URL
            const currentPath = window.location.pathname;
            let finalUrl = url;
            
            const pathParts = currentPath.split('/').filter(part => part && part !== 'index.html');
            const isInSubfolder = pathParts.length > 1 || (pathParts.length === 1 && !currentPath.endsWith('index.html'));
            
            if (isInSubfolder) {
                const levels = pathParts.length - 1;
                finalUrl = '../'.repeat(levels) + url;
            }
            
            window.location.href = finalUrl;
        }
        document.getElementById('searchSuggestions').style.display = 'none';
        document.getElementById('buscarInterno').value = '';
    };
    
    // Adicionar event listeners se ainda não existirem
    setTimeout(() => {
        const searchInput = document.getElementById('buscarInterno');
        const suggestions = document.getElementById('searchSuggestions');
        
        if (searchInput && !searchInput.hasAttribute('data-listeners-added')) {
            // Marcar que os listeners foram adicionados
            searchInput.setAttribute('data-listeners-added', 'true');
            
            // Event listener para fechar sugestões ao clicar fora
            document.addEventListener('click', function(event) {
                const searchContainer = event.target.closest('.position-relative');
                if (!searchContainer && suggestions) {
                    suggestions.style.display = 'none';
                }
            });

            // Event listener para navegação por teclado
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
        }
    }, 100);
}
