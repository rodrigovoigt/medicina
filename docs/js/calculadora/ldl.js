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

    // Calculadora de Colesterol LDL
    $('#calcular').click(function () {
        let colesterolTotal = parseFloat($('#colesterolTotal').val());
        let colesterolHDL = parseFloat($('#colesterolHDL').val());
        let triglicerideos = parseFloat($('#triglicerideos').val());

        if (isNaN(colesterolTotal) || isNaN(colesterolHDL) || isNaN(triglicerideos)) {
            alert('Preencha todos os campos corretamente!');
            return;
        }

        let ldl = colesterolTotal - colesterolHDL - triglicerideos / 5;
        let resultadoLDL = "Colesterol LDL: " + ldl.toFixed(2);

        $('#resultado').text(resultadoLDL).data('copyText', resultadoLDL).attr('data-copy', true);
    });

});