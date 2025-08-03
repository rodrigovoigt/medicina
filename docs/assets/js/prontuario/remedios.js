function copiarTexto(id) {
    let textoParaCopiar = $('#' + id).data('copyText') || $('#' + id).text();
    if (textoParaCopiar.trim() && textoParaCopiar.trim() !== "Aguardando formatação das medicações...") {
        navigator.clipboard.writeText(textoParaCopiar.trim()).then(() => {
            // Feedback visual melhorado
            const elemento = $('#' + id);
            const corOriginal = elemento.css('background-color');
            elemento.css('background-color', '#d4edda');
            setTimeout(() => {
                elemento.css('background-color', corOriginal);
            }, 300);
            
            // Toast notification (opcional)
            showToast('✅ Medicações copiadas com sucesso!');
        }).catch(err => {
            console.error('Erro ao copiar: ', err);
            showToast('❌ Erro ao copiar medicações');
        });
    } else {
        showToast('⚠️ Nenhuma medicação formatada para copiar');
    }
}

function showToast(message) {
    // Cria um toast simples
    const toast = $(`
        <div class="toast-custom" style="
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #495057;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 1000;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        ">${message}</div>
    `);
    
    $('body').append(toast);
    
    // Anima a entrada
    setTimeout(() => {
        toast.css('transform', 'translateX(0)');
    }, 100);
    
    // Remove após 3 segundos
    setTimeout(() => {
        toast.css('transform', 'translateX(100%)');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
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
            showToast("⚠️ Insira a lista de medicações.");
            return;
        }

        // Feedback visual no botão
        const botao = $(this);
        const textoOriginal = botao.html();
        botao.html('<span class="spinner-border spinner-border-sm me-2" role="status"></span>Formatando...');
        botao.prop('disabled', true);

        // Simula um pequeno delay para mostrar o feedback
        setTimeout(() => {
            // Dividir por linhas primeiro
            let linhas = inputText.split('\n').filter(linha => linha.trim());
            let resultado = [];

            let padrao = {
                "ao dia": "1-0-0",
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

            // Processar cada linha como uma medicação
            for (let linha of linhas) {
                // Primeiro tentar dividir por espaços únicos para capturar todas as partes
                let partes = linha.split(/\s+/).filter(parte => parte.trim());
                
                if (partes.length >= 6) {
                    // Reconstroir o nome e as instruções baseado nas posições
                    let codigo = partes[0]; // Ex: "1649"
                    let nomeBase = partes[1]; // Ex: "Anlodipino"
                    let dosagem = partes[2] + " " + partes[3]; // Ex: "10 MG"
                    let quantidade = partes[4]; // Ex: "30,000"
                    
                    // As instruções começam na posição 5 e podem ter várias palavras
                    let instrucoes = "";
                    let indexInstrucoes = 5;
                    
                    // Capturar "Tomar 01 cp ao dia" ou similar
                    while (indexInstrucoes < partes.length && !partes[indexInstrucoes].toLowerCase().includes("oral")) {
                        instrucoes += partes[indexInstrucoes] + " ";
                        indexInstrucoes++;
                    }
                    
                    instrucoes = instrucoes.trim().toLowerCase();
                    let nome = (nomeBase + " " + dosagem).replace(/MG/g, "mg");
                    
                    // Extrair quantidade de comprimidos das instruções
                    let quantidadeMatch = instrucoes.match(/(\d+)\s?(cp|comprimidos?|comprimido)/);
                    let quantidadeCP = quantidadeMatch ? parseInt(quantidadeMatch[1]) : 1;
                    
                    // Encontrar padrão de frequência
                    let frequenciaBase = "1-0-0"; // Padrão para "ao dia"
                    Object.keys(padrao).forEach(chave => {
                        if (instrucoes.includes(chave)) {
                            frequenciaBase = padrao[chave];
                        }
                    });

                    // Multiplica a quantidade pelo padrão encontrado
                    let frequencia = frequenciaBase.split('-').map(num => parseInt(num) * quantidadeCP).join('-');

                    resultado.push(`${nome} (${frequencia}) / `);
                }
            }

            // Restaura o botão
            botao.html(textoOriginal);
            botao.prop('disabled', false);

            if (resultado.length > 0) {
                const textoResultado = resultado.join("");
                $('#resultado').text(textoResultado).data('copyText', textoResultado).attr('data-copy', true);
                showToast('✅ Medicações formatadas com sucesso!');
            } else {
                $('#resultado').text("❌ Nenhuma medicação formatada. Verifique o formato de entrada.\n\nCertifique-se de que os dados estão separados por tabs ou espaços duplos.");
                showToast('⚠️ Erro na formatação. Verifique o formato dos dados.');
            }
        }, 500);
    });
});
