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

    //Calculadora Parkland
    $('#calcular').click(function () {
        let quantidadeMl = parseFloat($('#quantidadeMl').val());
        let peso = parseFloat($('#peso').val());
        let scq = parseFloat($('#scq').val());
        
        if (isNaN(quantidadeMl) || isNaN(peso) || isNaN(scq) || quantidadeMl <= 0 || peso <= 0 || scq <= 0 || scq > 100) {
            $('#resultado').html("<div class='alert alert-danger'>Por favor, insira valores válidos.</div>");
            return;
        }
        
        let volumeTotal = quantidadeMl * peso * scq;
        let volume8h = volumeTotal / 2;
        let volume16h = volume8h;
        let volume4h = volume8h / 2;
        
        let resultadoTexto = `Volume total: ${volumeTotal.toFixed(2)} mL\n` +
                             `Primeiras 8h: ${volume8h.toFixed(2)} mL\n` +
                             `Primeiras 4h: ${volume4h.toFixed(2)} mL\n` +
                             `Próximas 16h: ${volume16h.toFixed(2)} mL`;
        
        let resultadoComQuebras = resultadoTexto.replace(/\n/g, '<br>');
        $('#resultado').html(resultadoComQuebras).data('copyText', resultadoTexto).attr('data-copy', true);
    });

});