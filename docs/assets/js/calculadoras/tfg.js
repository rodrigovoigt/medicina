function copiarTexto(id) {
    let textoParaCopiar = $('#' + id).data('copyText') || $('#' + id).text();

    if (textoParaCopiar.trim()) {
        navigator.clipboard.writeText(textoParaCopiar.trim()).then(() => {
            // Feedback visual melhorado
            const elemento = $('#' + id);
            const corOriginal = elemento.css('background-color');
            elemento.css('background-color', '#d4edda');
            setTimeout(() => {
                elemento.css('background-color', corOriginal);
            }, 300);
            
            // Toast notification
            showToast('✅ Resultado copiado com sucesso!');
        }).catch(err => {
            console.error('Erro ao copiar: ', err);
            showToast('❌ Erro ao copiar resultado');
        });
    } else {
        showToast('⚠️ Nenhum resultado disponível para copiar');
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

    // Calculadora de TFG
    $('#calcular').click(function () {
        let creatinina = parseFloat($('#creatinina').val());
        let idade = parseFloat($('#idade').val());
        let sexo = $('input[name="sexo"]:checked').val();
        let etnia = $('input[name="etnia"]:checked').val();
        let formula = $('input[name="formula"]:checked').val();
        
        // Validação dos campos obrigatórios
        if (isNaN(creatinina) || isNaN(idade) || !sexo) {
            showToast('⚠️ Preencha todos os campos obrigatórios');
            return;
        }
        
        if (creatinina <= 0 || idade <= 0) {
            showToast('⚠️ Os valores devem ser maiores que zero');
            return;
        }
        
        let tfg;
        let formulaUsada;
        
        if (formula === '2021') {
            // CKD-EPI 2021 - SEM fator racial
            // eGFR = 142 × min(Creat/K, 1)^α × max(Creat/K, 1)^-1.200 × 0.9938^idade × 1.012 [se feminino]
            let K = sexo === "feminino" ? 0.7 : 0.9;
            let alpha = sexo === "feminino" ? -0.241 : -0.302;
            let sexFactor = sexo === "feminino" ? 1.012 : 1;
            
            let creatK = creatinina / K;
            
            // A fórmula usa AMBOS os termos multiplicados
            let minTerm = Math.pow(Math.min(creatK, 1), alpha);
            let maxTerm = Math.pow(Math.max(creatK, 1), -1.200);
            let ageFactor = Math.pow(0.9938, idade);
            
            tfg = 142 * minTerm * maxTerm * ageFactor * sexFactor;
            formulaUsada = "CKD-EPI 2021";
            
            console.log('Debug CKD-EPI 2021:', {
                creatinina, K, alpha, sexFactor, creatK, 
                minTerm, maxTerm, ageFactor, tfg,
                'min(creatK, 1)': Math.min(creatK, 1),
                'max(creatK, 1)': Math.max(creatK, 1)
            });
        } else {
            // CKD-EPI 2009 - COM fator racial
            if (!etnia) {
                showToast('⚠️ Selecione a etnia para a fórmula CKD-EPI 2009');
                return;
            }
            
            let sex = sexo === "feminino" ? 1.018 : 1;
            let alpha = sexo === "feminino" ? -0.329 : -0.411;
            let kappa = sexo === "feminino" ? 0.7 : 0.9;
            let race = etnia === "negro" ? 1.159 : 1;

            let creatKappa = creatinina / kappa;
            
            // A fórmula CKD-EPI 2009 também usa ambos os termos
            let minTerm = Math.pow(Math.min(creatKappa, 1), alpha);
            let maxTerm = Math.pow(Math.max(creatKappa, 1), -1.209);
            
            tfg = 141 * minTerm * maxTerm * Math.pow(0.993, idade) * sex * race;
            formulaUsada = "CKD-EPI 2009";
            
            console.log('Debug CKD-EPI 2009:', {
                creatinina, kappa, alpha, sex, race, creatKappa, 
                minTerm, maxTerm, idade, tfg,
                'min(creatKappa, 1)': Math.min(creatKappa, 1),
                'max(creatKappa, 1)': Math.max(creatKappa, 1)
            });
        }
        
        // Classificação da função renal
        let categoriaG = tfg >= 90 ? "G1" : tfg >= 60 ? "G2" : tfg >= 45 ? "G3a" : tfg >= 30 ? "G3b" : tfg >= 15 ? "G4" : "G5";
        let descricao = tfg >= 90 ? "Normal" : tfg >= 60 ? "Levemente diminuída" : tfg >= 45 ? "Leve/moderadamente diminuída" : tfg >= 30 ? "Moderadamente diminuída" : tfg >= 15 ? "Muito diminuída" : "Falência renal";
        let faixa = tfg >= 90 ? "≥ 90" : tfg >= 60 ? "60-89" : tfg >= 45 ? "45-59" : tfg >= 30 ? "30-44" : tfg >= 15 ? "15-29" : "< 15";
        
        // Valor normal da TFG baseado na idade
        let tfgNormal = 0;
        if (idade > 70) {
            tfgNormal = 75; // TFG normal para idosos
        } else if (idade > 50) {
            tfgNormal = 108; // TFG normal para adultos
        } else {
            tfgNormal = 125; // TFG normal para jovens
        }

        let percentualFuncaoRenal = Math.min(100, Math.max(0, (tfg / tfgNormal) * 100));
        
        
        
        let resultadoTexto = `TFG ${tfg.toFixed(2)} mL/min/1.73m²\nCategoria ${categoriaG} - ${descricao} (Faixa: ${faixa} mL/min/1.73m²)\nFunção renal: ${percentualFuncaoRenal.toFixed(1)}%`;
        
        $('#resultado').text(resultadoTexto).data('copyText', resultadoTexto).attr('data-copy', true);
    });

});