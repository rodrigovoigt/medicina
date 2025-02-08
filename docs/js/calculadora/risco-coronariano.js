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

    // Calculadora de Risco Cardiovascular em 10 anos
    $('#calcular').click(function () {
        let idade = parseFloat($('#idade').val());
        let colesterolTotal = parseFloat($('#colesterolTotal').val());
        let colesterolHDL = parseFloat($('#colesterolHDL').val());
        let pressaoSistolica = parseFloat($('#pressaoSistolica').val());
        let medicamentoHipertensao = $('input[name="medicamentoHipertensao"]:checked').val() === 'true';
        let tabagista = $('input[name="tabagista"]:checked').val() === 'true';
        let diabetico = $('input[name="diabetico"]:checked').val() === 'true';
        let sexo = $('input[name="sexo"]:checked').val();
        let etnia = $('input[name="etnia"]:checked').val();

        let C_Age,
            C_Sq_Age,
            C_Total_Chol,
            C_Age_Total_Chol,
            C_HDL_Chol,
            C_Age_HDL_Chol,
            C_On_Hypertension_Meds,
            C_Age_On_Hypertension_Meds,
            C_Off_Hypertension_Meds,
            C_Age_Off_Hypertension_Meds,
            C_Smoker,
            C_Age_Smoker,
            C_Diabetes,
            S10,
            Mean_Terms;

        if (sexo === "feminino") {
            if (etnia === "negro") {
                C_Age = 17.114;
                C_Sq_Age = 0;
                C_Total_Chol = 0.94;
                C_Age_Total_Chol = 0;
                C_HDL_Chol = -18.92;
                C_Age_HDL_Chol = 4.475;
                C_On_Hypertension_Meds = 29.291;
                C_Age_On_Hypertension_Meds = -6.432;
                C_Off_Hypertension_Meds = 27.82;
                C_Age_Off_Hypertension_Meds = -6.087;
                C_Smoker = 0.691;
                C_Age_Smoker = 0;
                C_Diabetes = 0.874;
                S10 = 0.9533;
                Mean_Terms = 86.61;
            } else if (etnia === "branco") {
                C_Age = -29.799;
                C_Sq_Age = 4.884;
                C_Total_Chol = 13.54;
                C_Age_Total_Chol = -3.114;
                C_HDL_Chol = -13.578;
                C_Age_HDL_Chol = 3.149;
                C_On_Hypertension_Meds = 2.019;
                C_Age_On_Hypertension_Meds = 0;
                C_Off_Hypertension_Meds = 1.957;
                C_Age_Off_Hypertension_Meds = 0;
                C_Smoker = 7.574;
                C_Age_Smoker = -1.665;
                C_Diabetes = 0.661;
                S10 = 0.9665;
                Mean_Terms = -29.18;
            }
        } else if (sexo === "masculino") {
            if (etnia === "negro") {
                C_Age = 2.469;
                C_Sq_Age = 0;
                C_Total_Chol = 0.302;
                C_Age_Total_Chol = 0;
                C_HDL_Chol = -0.307;
                C_Age_HDL_Chol = 0;
                C_On_Hypertension_Meds = 1.916;
                C_Age_On_Hypertension_Meds = 0;
                C_Off_Hypertension_Meds = 1.809;
                C_Age_Off_Hypertension_Meds = 0;
                C_Smoker = 0.549;
                C_Age_Smoker = 0;
                C_Diabetes = 0.645;
                S10 = 0.8954;
                Mean_Terms = 19.54;
            } else if (etnia === "branco") {
                C_Age = 12.344;
                C_Sq_Age = 0;
                C_Total_Chol = 11.853;
                C_Age_Total_Chol = -2.664;
                C_HDL_Chol = -7.99;
                C_Age_HDL_Chol = 1.769;
                C_On_Hypertension_Meds = 1.797;
                C_Age_On_Hypertension_Meds = 0;
                C_Off_Hypertension_Meds = 1.764;
                C_Age_Off_Hypertension_Meds = 0;
                C_Smoker = 7.837;
                C_Age_Smoker = -1.795;
                C_Diabetes = 0.658;
                S10 = 0.9144;
                Mean_Terms = 61.18;
            }
        }

        let Terms =
            C_Age * Math.log(idade) +
            C_Sq_Age * Math.pow(Math.log(idade), 2) +
            C_Total_Chol * Math.log(colesterolTotal) +
            C_Age_Total_Chol * Math.log(idade) * Math.log(colesterolTotal) +
            C_HDL_Chol * Math.log(colesterolHDL) +
            C_Age_HDL_Chol * Math.log(idade) * Math.log(colesterolHDL) +
            medicamentoHipertensao *
                C_On_Hypertension_Meds *
                Math.log(pressaoSistolica) +
            medicamentoHipertensao *
                C_Age_On_Hypertension_Meds *
                Math.log(idade) *
                Math.log(pressaoSistolica) +
            !medicamentoHipertensao *
                C_Off_Hypertension_Meds *
                Math.log(pressaoSistolica) +
            !medicamentoHipertensao *
                C_Age_Off_Hypertension_Meds *
                Math.log(idade) *
                Math.log(pressaoSistolica) +
            C_Smoker * tabagista +
            C_Age_Smoker * Math.log(idade) * tabagista +
            C_Diabetes * diabetico;

        let Risco_Dez_Anos =
            100 * (1 - Math.pow(S10, Math.exp(Terms - Mean_Terms)));

        let resultadoRiscoCardio = "Risco de Dez Anos: " + Risco_Dez_Anos.toFixed(2) + "% - ";
        if (Risco_Dez_Anos < 5) {
            resultadoRiscoCardio = resultadoRiscoCardio + "Baixo risco (<5%)";
        } else if (Risco_Dez_Anos >= 5 && Risco_Dez_Anos <= 7.4) {
            resultadoRiscoCardio = resultadoRiscoCardio + "Limítrofe (5% a 7.4%)";
        } else if (Risco_Dez_Anos >= 7.5 && Risco_Dez_Anos <= 19.9) {
            resultadoRiscoCardio = resultadoRiscoCardio + "Risco intermediário (7.5% a 19.9%)";
        } else {
            resultadoRiscoCardio = resultadoRiscoCardio + "Alto risco (≥20%)";
        }

        $('#resultado').text(resultadoRiscoCardio).data('copyText', resultadoRiscoCardio).attr('data-copy', true);
    });

});