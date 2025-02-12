function copiarTexto(id) {
    let textoParaCopiar = $('#' + id).data('copyText') || $('#' + id).text();

    if (textoParaCopiar.trim()) {
        navigator.clipboard.writeText(textoParaCopiar.trim()).then(() => {
            alert('Texto copiado com sucesso!');
        }).catch(err => {
            console.error('Erro ao copiar: ', err);
        });
    }
}

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

$(document).ready(function () {

    // Evento de clique para copiar qualquer texto dinâmico
    $(document).on('click', '[data-copy]', function () {
        copiarTexto($(this).attr('id'));
    });

    // Calculadora de Carga Tabágica
    $('#calcular').click(function () {
        let cigarrosPorDia = parseFloat($('#cigarrosPorDia').val());
        let anosFumando = parseFloat($('#anosFumando').val());
    
        if (isNaN(cigarrosPorDia) || isNaN(anosFumando) || cigarrosPorDia <= 0 || anosFumando <= 0) {
            alert('Preencha todos os campos corretamente!');
            return;
        }
    
        let cargaTabagica = (cigarrosPorDia / 20) * anosFumando;
        let resultadoCarga = `Carga Tabágica: ${cargaTabagica.toFixed(2)} maços-ano`;
    
        $('#resultado').text(resultadoCarga).data('copyText', resultadoCarga).attr('data-copy', true);
    });

});