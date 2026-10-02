function copiarTexto(id) {
    const elemento = document.getElementById(id);
    const textoParaCopiar = elemento?.dataset.copyText || elemento?.textContent || '';
    const texto = textoParaCopiar.trim();

    if (!texto || texto === 'Aguardando formatação das medicações...') {
        showToast('⚠️ Nenhuma medicação formatada para copiar');
        return;
    }

    const copiarComFallback = () => {
        const areaTemporaria = document.createElement('textarea');
        areaTemporaria.value = texto;
        areaTemporaria.setAttribute('readonly', '');
        areaTemporaria.style.position = 'fixed';
        areaTemporaria.style.opacity = '0';
        document.body.appendChild(areaTemporaria);
        areaTemporaria.select();
        const copiado = document.execCommand('copy');
        areaTemporaria.remove();
        if (!copiado) {
            throw new Error('Não foi possível copiar o texto.');
        }
    };

    const copia = navigator.clipboard?.writeText
        ? navigator.clipboard.writeText(texto).catch(copiarComFallback)
        : Promise.resolve().then(copiarComFallback);

    copia.then(() => {
        const corOriginal = elemento.style.backgroundColor;
        elemento.style.backgroundColor = '#d4edda';
        setTimeout(() => {
            elemento.style.backgroundColor = corOriginal;
        }, 300);
        showToast('✅ Medicações copiadas com sucesso!');
    }).catch(err => {
        console.error('Erro ao copiar: ', err);
        showToast('❌ Erro ao copiar medicações');
    });
}

function showToast(message) {
    // Cria um toast simples
    const toast = document.createElement('div');
    toast.className = 'toast-custom';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px; background-color: #495057;
        color: white; padding: 12px 20px; border-radius: 6px; z-index: 1000;
        font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: translateX(100%); transition: transform 0.3s ease;
    `;
    document.body.appendChild(toast);
    
    // Anima a entrada
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove após 3 segundos
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
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

function formatarMedicacao(nome, instrucoes) {
    const textoInstrucoes = instrucoes.toLowerCase();
    const quantidadeMatch = textoInstrucoes.match(/(\d+)\s?(?:cp|comprimidos?|comprimido)/);
    const quantidade = quantidadeMatch ? parseInt(quantidadeMatch[1], 10) : 1;
    let frequencia;

    if (/a cada semana/.test(textoInstrucoes)) {
        frequencia = `${quantidade}x/semana`;
    } else if (/no período da noite|à noite|de noite|noite/.test(textoInstrucoes)) {
        frequencia = `0-0-${quantidade}`;
    } else {
        const vezesMatch = textoInstrucoes.match(/(\d+)\s*vez(?:es)?\s*ao dia/);
        const vezes = vezesMatch ? parseInt(vezesMatch[1], 10) : 1;
        const padraoFrequencia = {
            1: [1, 0, 0],
            2: [1, 0, 1],
            3: [1, 1, 1],
            4: [1, 1, 1, 1]
        }[vezes] || [1, 0, 0];

        frequencia = padraoFrequencia.map(horario => horario * quantidade).join('-');
    }

    const nomeFormatado = nome
        .replace(/^\*+\s*/, '')
        .replace(/\s*-\s*Programa Farmácia Popular\s*/i, '')
        .replace(/\s*\([^)]*\)/g, '')
        .trim();

    return `${nomeFormatado} (${frequencia}) / `;
}

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (event) {
        const elementoCopiavel = event.target.closest('[data-copy]');
        if (elementoCopiavel) {
            copiarTexto(elementoCopiavel.id);
        }
    });

    document.getElementById('formatar').addEventListener('click', function () {
        let inputText = document.getElementById("inputMedicacoes").value.trim();
        if (!inputText) {
            showToast("⚠️ Insira a lista de medicações.");
            return;
        }

        // Feedback visual no botão
        const botao = this;
        const textoOriginal = botao.innerHTML;
        botao.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Formatando...';
        botao.disabled = true;

        // Simula um pequeno delay para mostrar o feedback
        setTimeout(() => {
            let resultado = [];

            // O IPM envia oito campos por medicação, separados por ponto e vírgula.
            if (inputText.includes(';')) {
                const campos = inputText.split(';').map(campo => campo.trim());

                for (let indice = 0; indice + 4 < campos.length; indice += 8) {
                    const nome = campos[indice + 3];
                    const instrucoes = campos[indice + 4];

                    if (nome && instrucoes) {
                        resultado.push(formatarMedicacao(nome, instrucoes));
                    }
                }
            } else {
                // Compatibilidade com o formato antigo, que usava uma medicação por linha.
                let linhas = inputText.split('\n').filter(linha => linha.trim());

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
            }

            // Restaura o botão
            botao.innerHTML = textoOriginal;
            botao.disabled = false;

            if (resultado.length > 0) {
                const textoResultado = resultado.join("");
                const elementoResultado = document.getElementById('resultado');
                elementoResultado.textContent = textoResultado;
                elementoResultado.dataset.copyText = textoResultado;
                elementoResultado.dataset.copy = 'true';
                showToast('✅ Medicações formatadas com sucesso!');
            } else {
                document.getElementById('resultado').textContent = "❌ Nenhuma medicação formatada. Verifique o formato de entrada.\n\nCertifique-se de que os dados estão separados por ponto e vírgula ou por linhas no formato antigo.";
                showToast('⚠️ Erro na formatação. Verifique o formato dos dados.');
            }
        }, 500);
    });
});
