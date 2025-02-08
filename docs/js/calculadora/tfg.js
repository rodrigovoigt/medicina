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
        
        let sex = sexo === "feminino" ? 1.018 : 1;
        let alpha = sexo === "feminino" ? -0.329 : -0.411;
        let kappa = sexo === "feminino" ? 0.7 : 0.9;
        let race = etnia === "negro" ? 1.159 : 1;

        let tfg = 141 * Math.min(Math.pow(creatinina / kappa, alpha), Math.pow(creatinina / kappa, -1.209)) * Math.pow(0.993, idade) * sex * race;
        
        let categoriaG = tfg >= 90 ? "G1" : tfg >= 60 ? "G2" : tfg >= 45 ? "G3a" : tfg >= 30 ? "G3b" : tfg >= 15 ? "G4" : "G5";
        let descricao = tfg >= 90 ? "Normal" : tfg >= 60 ? "Levemente diminuída" : tfg >= 45 ? "Leve/moderadamente diminuída" : tfg >= 30 ? "Moderadamente diminuída" : tfg >= 15 ? "Muito diminuída" : "Falência renal";
        let faixa = tfg >= 90 ? "≥ 90" : tfg >= 60 ? "60-89" : tfg >= 45 ? "45-59" : tfg >= 30 ? "30-44" : tfg >= 15 ? "15-29" : "< 15";
        
        let tfgNormal = idade > 70 ? 75 : 120;
        let percentualFuncaoRenal = (tfg / tfgNormal) * 100;
        
        let resultadoTexto = `Taxa de Filtração Glomerular (TFG): ${tfg.toFixed(2)} mL/min/1.73m²\nCategoria: ${categoriaG} - ${descricao} (Faixa: ${faixa} mL/min/1.73m²)\nFunção renal restante: ${percentualFuncaoRenal.toFixed(2)}%`;
        
        $('#resultado').text(resultadoTexto).data('copyText', resultadoTexto).attr('data-copy', true);
    });

});