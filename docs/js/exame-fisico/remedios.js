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

    // Formatador
    $(document).ready(function () {
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
                "dia": "1-0-0",
                "12/12h": "1-0-1",
                "8/8h": "1-1-1",
                "6/6h": "1-1-1-1",
                "24h": "1-0-0"
            };
    
            for (let i = 0; i < linhas.length; i += 6) {
                if (linhas.length >= i + 6) {
                    let nome = linhas[i + 1].replace(/MG/g, "mg"); // Nome com "mg" minúsculo
                    let quantidade = linhas[i + 2].split(",")[0]; // quantidade sem decimais
                    let horario = linhas[i + 3].toLowerCase(); // Horário
                    
                    let frequencia = "0-0-0"; // Padrão caso não encontre um horário reconhecido
                    Object.keys(padrao).forEach(h => {
                        if (horario.includes(h)) {
                            frequencia = padrao[h];
                        }
                    });
                    // ${quantidade}cp
                    resultado.push(`${nome} (${frequencia}) / `);
                }
            }
    
            if (resultado.length > 0) {
                $('#resultado').text(resultado.join("\n")).data('copyText', resultado.join("\n")).attr('data-copy', true);
            } else {
                $('#resultado').text("Nenhuma medicação formatada. Verifique o formato de entrada.");
            }
        });    
    });    

});