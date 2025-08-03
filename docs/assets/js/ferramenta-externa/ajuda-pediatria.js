function pesquisar(event) {
    event.preventDefault(); // Impede o envio do formulário

    let query = document.getElementById("searchQuery").value.trim();

    if (!query) {
        alert("Digite algo para buscar.");
        return;
    }

    let searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}+site:msdmanuals.com+OR+site:consultaremedios.com.br+OR+site:pedb.com.br`;

    window.open(searchUrl, "_blank"); // Abre em uma nova aba
}

document.addEventListener("DOMContentLoaded", function() {
    function pesquisarAjudaPediatria(event) {
        event.preventDefault(); // Impede o envio do formulário

        let query = document.getElementById("pesquisarAjudaPediatria").value.trim();

        if (!query) {
            alert("Digite algo para buscar.");
            return;
        }

        let searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}+site:pedb.com.br`;

        window.open(searchUrl, "_blank"); // Abre em uma nova aba
    }
    
    // Agora a função deve ser reconhecida
    const searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", pesquisarAjudaPediatria);
});
