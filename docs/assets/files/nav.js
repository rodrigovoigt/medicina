document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("navbar-container").innerHTML = `
        <div class="container-fluid">
            <a class="navbar-brand" href="/index.html">
                <img style="width: 70px" src="/assets/img/icon.png" alt="Logo" /> DocGO!
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" href="/index.html">Home</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Calculadoras
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/calculadora/risco-coronariano.html">Calculadora de Risco de Dez Anos</a></li>
                            <li><a class="dropdown-item" href="/calculadora/ldl.html">Calculadora de Colesterol LDL</a></li>
                            <li><a class="dropdown-item" href="/calculadora/tfg.html">Estimativa da Taxa de Filtração Glomerular (TFG)</a></li>
                            <li><a class="dropdown-item" href="/calculadora/imc.html">Índice de Massa Corporal</a></li>
                            <li><a class="dropdown-item" href="/calculadora/carga-tabagica.html">Carga Tabágica</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Exame físico
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="/prontuario/consulta-geral.html">Consulta Geral</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="/exame-fisico/exame-fisico-abdomen.html">Exame Físico do Abdômen</a></li>
                            <li><a class="dropdown-item" href="/exame-fisico/exame-fisico-cardiovascular.html">Exame Físico Cardiovascular</a></li>
                            <li><a class="dropdown-item" href="/exame-fisico/exame-fisico-ginecologico.html">Exame Físico Ginecológico</a></li>
                            <li><a class="dropdown-item" href="/exame-fisico/exame-fisico-mamas.html">Exame Físico das Mamas</a></li>
                            <li><a class="dropdown-item" href="/exame-fisico/exame-fisico-musculoesqueletico.html">Exame Físico Musculoesquelético</a></li>
                            <li><a class="dropdown-item" href="/exame-fisico/exame-fisico-nasal.html">Exame Físico Nasal</a></li>
                            <li><a class="dropdown-item" href="/exame-fisico/exame-fisico-neurologico.html">Exame Físico Neurológico</a></li>
                            <li><a class="dropdown-item" href="/exame-fisico/exame-fisico-oral.html">Exame Físico Oral (Boca e Orofaringe)</a></li>
                            <li><a class="dropdown-item" href="/exame-fisico/exame-fisico-otologico.html">Exame Físico Otológico (Ouvido)</a></li>
                            <li><a class="dropdown-item" href="/exame-fisico/exame-fisico-pele-faneros.html">Exame Físico da Pele e Fâneros</a></li>
                            <li><a class="dropdown-item" href="/exame-fisico/exame-fisico-pulmonar.html">Exame Físico do Sistema Respiratório</a></li>
                        </ul>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    `;
});
