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
    event.preventDefault();
    let query = document.getElementById("searchQuery").value.trim();
    if (!query) {
        alert("Digite algo para buscar.");
        return;
    }
    let searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}+site:msdmanuals.com+OR+site:consultaremedios.com.br+OR+site:pedb.com.br`;
    window.open(searchUrl, "_blank");
}

$(document).ready(function () {
    $(document).on('click', '[data-copy]', function () {
        copiarTexto($(this).attr('id'));
    });

    $('#formatar').click(function () {
        let inputText = document.getElementById("inputMedicacoes").value.trim();
        if (!inputText) {
            alert("Insira a lista de medicações.");
            return;
        }

        let linhas = inputText.split(/\t+|\s{2,}/);
        let resultado = [];

        let padrao = {
            "manhã": "1-0-0",
            "tarde": "0-1-0",
            "noite": "0-0-1",
            "à noite": "0-0-1",
            "de noite": "0-0-1",
            "dia": "1-0-0",
            "12/12h": "1-0-1",
            "12 em 12 horas": "1-0-1",
            "8/8h": "1-1-1",
            "8 em 8 horas": "1-1-1",
            "6/6h": "1-1-1-1",
            "6 em 6 horas": "1-1-1-1",
            "24h": "1-0-0",
            "3x ao dia": "1-1-1",
            "4x ao dia": "1-1-1-1",
            "duas vezes ao dia": "1-0-1",
            "de manhã e à noite": "1-0-1",
            "de manhã e de noite": "1-0-1",
            "de manhã e à tarde": "1-1-0",
            "de manhã e de tarde": "1-1-0",
            "de tarde e à noite": "0-1-1",
            "de tarde e à noite": "0-1-1",
            "30 min antes do caf": "1-0-0"
        };

        for (let i = 0; i < linhas.length; i += 6) {
            if (linhas.length >= i + 6) {
                let nome = linhas[i + 1].replace(/MG/g, "mg"); // Nome com "mg" minúsculo
                let quantidadeTexto = linhas[i + 3].toLowerCase(); // Captura a descrição da dose
                let quantidadeMatch = quantidadeTexto.match(/(\d+)\s?(cp|comprimidos?)/); // Extrai a quantidade

                let quantidade = quantidadeMatch ? parseInt(quantidadeMatch[1]) : 1; // Padrão 1 caso não encontre
                
                let frequenciaBase = "0-0-0"; // Padrão
                Object.keys(padrao).forEach(h => {
                    if (quantidadeTexto.includes(h)) {
                        frequenciaBase = padrao[h];
                    }
                });

                // Multiplica a quantidade pelo padrão encontrado
                let frequencia = frequenciaBase.split('-').map(num => num * quantidade).join('-');

                resultado.push(`${nome} (${frequencia}) / `);
            }
        }

        if (resultado.length > 0) {
            $('#resultado').text(resultado.join("")).data('copyText', resultado.join("")).attr('data-copy', true);
        } else {
            $('#resultado').text("Nenhuma medicação formatada. Verifique o formato de entrada.");
        }
    });
});
