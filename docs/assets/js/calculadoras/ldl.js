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

// Tabela de fatores novos para Martin/Hopkins
const martinHopkinsFactors = {
    '7-49': [3.5, 3.4, 3.3, 3.3, 3.2, 3.1],
    '50-56': [4.0, 3.9, 3.7, 3.6, 3.6, 3.4],
    '57-61': [4.3, 4.1, 4.0, 3.9, 3.8, 3.6],
    '62-66': [4.5, 4.3, 4.1, 4.0, 3.9, 3.9],
    '67-71': [4.7, 4.4, 4.3, 4.2, 4.1, 3.9],
    '72-75': [4.8, 4.6, 4.4, 4.2, 4.2, 4.1],
    '76-79': [4.9, 4.6, 4.5, 4.3, 4.3, 4.2],
    '80-83': [5.0, 4.8, 4.6, 4.4, 4.3, 4.2],
    '84-87': [5.1, 4.8, 4.6, 4.5, 4.4, 4.3],
    '88-92': [5.2, 4.9, 4.7, 4.6, 4.4, 4.3],
    '93-96': [5.3, 5.0, 4.8, 4.7, 4.5, 4.4],
    '97-100': [5.4, 5.1, 4.8, 4.7, 4.5, 4.3],
    '101-105': [5.5, 5.2, 5.0, 4.7, 4.6, 4.5],
    '106-110': [5.6, 5.3, 5.0, 4.8, 4.6, 4.5],
    '111-115': [5.7, 5.4, 5.1, 4.9, 4.7, 4.5],
    '116-120': [5.8, 5.5, 5.2, 5.0, 4.8, 4.6],
    '121-126': [6.0, 5.5, 5.3, 5.0, 4.8, 4.6],
    '127-132': [6.1, 5.7, 5.3, 5.1, 4.9, 4.7],
    '133-138': [6.2, 5.8, 5.4, 5.2, 5.0, 4.7],
    '139-146': [6.3, 5.9, 5.6, 5.3, 5.0, 4.8],
    '147-154': [6.5, 6.0, 5.7, 5.4, 5.1, 4.8],
    '155-163': [6.7, 6.2, 5.8, 5.4, 5.2, 4.9],
    '164-173': [6.8, 6.3, 5.9, 5.5, 5.3, 5.0],
    '174-185': [7.0, 6.5, 6.0, 5.7, 5.4, 5.1],
    '186-201': [7.3, 6.7, 6.2, 5.8, 5.5, 5.2],
    '202-220': [7.6, 6.9, 6.4, 6.0, 5.6, 5.3],
    '221-247': [8.0, 7.2, 6.6, 6.2, 5.9, 5.4],
    '248-292': [8.5, 7.6, 7.0, 6.5, 6.1, 5.6],
    '293-399': [9.5, 8.3, 7.5, 7.0, 6.5, 5.9],
    '400-13975': [11.9, 10.0, 8.8, 8.1, 7.5, 6.7]
};

function getNovelFactor(tg, nonHDL) {
    // Determinar a faixa de triglicerídeos
    let tgRange = '';
    if (tg >= 7 && tg <= 49) tgRange = '7-49';
    else if (tg >= 50 && tg <= 56) tgRange = '50-56';
    else if (tg >= 57 && tg <= 61) tgRange = '57-61';
    else if (tg >= 62 && tg <= 66) tgRange = '62-66';
    else if (tg >= 67 && tg <= 71) tgRange = '67-71';
    else if (tg >= 72 && tg <= 75) tgRange = '72-75';
    else if (tg >= 76 && tg <= 79) tgRange = '76-79';
    else if (tg >= 80 && tg <= 83) tgRange = '80-83';
    else if (tg >= 84 && tg <= 87) tgRange = '84-87';
    else if (tg >= 88 && tg <= 92) tgRange = '88-92';
    else if (tg >= 93 && tg <= 96) tgRange = '93-96';
    else if (tg >= 97 && tg <= 100) tgRange = '97-100';
    else if (tg >= 101 && tg <= 105) tgRange = '101-105';
    else if (tg >= 106 && tg <= 110) tgRange = '106-110';
    else if (tg >= 111 && tg <= 115) tgRange = '111-115';
    else if (tg >= 116 && tg <= 120) tgRange = '116-120';
    else if (tg >= 121 && tg <= 126) tgRange = '121-126';
    else if (tg >= 127 && tg <= 132) tgRange = '127-132';
    else if (tg >= 133 && tg <= 138) tgRange = '133-138';
    else if (tg >= 139 && tg <= 146) tgRange = '139-146';
    else if (tg >= 147 && tg <= 154) tgRange = '147-154';
    else if (tg >= 155 && tg <= 163) tgRange = '155-163';
    else if (tg >= 164 && tg <= 173) tgRange = '164-173';
    else if (tg >= 174 && tg <= 185) tgRange = '174-185';
    else if (tg >= 186 && tg <= 201) tgRange = '186-201';
    else if (tg >= 202 && tg <= 220) tgRange = '202-220';
    else if (tg >= 221 && tg <= 247) tgRange = '221-247';
    else if (tg >= 248 && tg <= 292) tgRange = '248-292';
    else if (tg >= 293 && tg <= 399) tgRange = '293-399';
    else if (tg >= 400) tgRange = '400-13975';
    else return 5.0; // valor padrão

    // Determinar o índice da coluna baseado no Non-HDL
    let colIndex = 0;
    if (nonHDL < 100) colIndex = 0;
    else if (nonHDL >= 100 && nonHDL <= 129) colIndex = 1;
    else if (nonHDL >= 130 && nonHDL <= 159) colIndex = 2;
    else if (nonHDL >= 160 && nonHDL <= 189) colIndex = 3;
    else if (nonHDL >= 190 && nonHDL <= 219) colIndex = 4;
    else if (nonHDL >= 220) colIndex = 5;

    return martinHopkinsFactors[tgRange][colIndex];
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

        // Cálculo do Non-HDL
        let nonHDL = colesterolTotal - colesterolHDL;

        // 1. Fórmula de Friedewald
        let ldlFriedewald = colesterolTotal - colesterolHDL - (triglicerideos / 5);
        let vldlFriedewald = triglicerideos / 5;

        // 2. Fórmula de Sampson/NIH
        let ldlSampson = (colesterolTotal / 0.948) - (colesterolHDL / 0.971) - 
                        (triglicerideos / 8.56 + (triglicerideos * nonHDL) / 2140 - (triglicerideos * 2) / 16100) - 9.44;
        let vldlSampson = colesterolTotal - colesterolHDL - ldlSampson;

        // 3. Fórmula de Martin/Hopkins
        let novelFactor = getNovelFactor(triglicerideos, nonHDL);
        let ldlMartinHopkins = nonHDL - (triglicerideos / novelFactor);
        let vldlMartinHopkins = triglicerideos / novelFactor;

        // Atualizar resultados
        $('#resultado-friedewald').text(`LDL-C ${ldlFriedewald.toFixed(1)} / VLDL-C ${vldlFriedewald.toFixed(1)}`)
            .data('copyText', `LDL-C ${ldlFriedewald.toFixed(1)} / VLDL-C ${vldlFriedewald.toFixed(1)}`)
            .attr('data-copy', true);

        $('#resultado-sampson').text(`LDL-C ${ldlSampson.toFixed(1)} / VLDL-C ${vldlSampson.toFixed(1)}`)
            .data('copyText', `LDL-C ${ldlSampson.toFixed(1)} / VLDL-C ${vldlSampson.toFixed(1)}`)
            .attr('data-copy', true);

        $('#resultado-martin').text(`LDL-C ${ldlMartinHopkins.toFixed(1)} / VLDL-C ${vldlMartinHopkins.toFixed(1)}`)
            .data('copyText', `LDL-C ${ldlMartinHopkins.toFixed(1)} / VLDL-C ${vldlMartinHopkins.toFixed(1)}`)
            .attr('data-copy', true);

        // Mostrar os resultados
        $('.resultados-container').show();
    });

});