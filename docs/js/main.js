$(document).ready(function () {
    // Toggle dropdowns
    $(".dropdown > a").click(function (event) {
        event.preventDefault();
        var $dropdown = $(this).parent();

        // Toggle 'active' on the clicked dropdown
        $dropdown.toggleClass("active");

        // Remove 'active' class from other dropdowns
        $(".dropdown").not($dropdown).removeClass("active");
    });

    // Fecha dropdowns se clicar fora
    $(document).click(function (event) {
        if (!$(event.target).closest(".dropdown").length) {
            $(".dropdown").removeClass("active");
        }
    });

    // Mostrar a seção ao clicar nos links
    const links = {
        homeLink: "home",
        riscoCardioDezLink: "riscoCardioDezCalculadora",
        ldlLink: "ldlCalculadora",
        gfrLink: "gfrCalculadora",
        imcLink: "imcCalculadora",
        exameFisicoGeralLink: "exameFisicoGeral",
        teste1Link: "teste1Section",
        teste2Link: "teste2Section",
    };

    // Usando jQuery para adicionar os eventos de clique
    $.each(links, function (name, sectionId) {
        $("[name='" + name + "']").click(function (event) {
            event.preventDefault();
            showSection(sectionId);
        });
    });

    // Adicionando evento para os botões de cálculo
    ["calcularRiscoBtn", "calcularLDLBtn", "calcularGFRBtn", "calcularIMCBtn"].forEach(function (btnId) {
        $("#" + btnId).click(function () {
            var functionName = btnId.replace("Btn", ""); // Remove "Btn" do nome do botão para obter a função correta
            if (typeof window[functionName] === "function") {
                window[functionName](); // Chama a função correta
            } else {
                console.error("Função " + functionName + " não encontrada");
            }
        });
    });

    function showSection(sectionId) {
        $("section").each(function () {
            $(this).toggleClass("active", this.id === sectionId);
            $(this).toggleClass("hidden", this.id !== sectionId);
        });
    }

    // Atualiza o texto conforme os checkboxes são selecionados
    $('.exame').change(function () {
        atualizarTexto('resultadoExameFisico');
    });

    function atualizarTexto(idResultado) {
        let textoPuro = ''; // Texto para cópia
        let textoFormatado = ''; // Texto para exibição HTML

        // Para cada checkbox selecionado
        $('.exame:checked').each(function () {
            let texto = $(this).data('text');
            textoPuro += texto + '\n\n'; // Mantém as quebras de linha para cópia
            textoFormatado += texto.replace(/\n/g, '<br>') + '<br><br>'; // Converte para exibição HTML
        });

        // Atualiza o resultado
        let $resultadoElement = $('#' + idResultado);

        if (textoFormatado.trim()) {
            $resultadoElement.html(textoFormatado);
            $resultadoElement.data('copyText', textoPuro.trim()); // Salva o texto puro para cópia
        } else {
            $resultadoElement.html('Clique para copiar');
            $resultadoElement.data('copyText', ''); // Reseta caso nenhum item esteja selecionado
        }
    }

    // Função genérica para copiar texto de qualquer elemento
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

    // Evento de clique para copiar qualquer texto dinâmico
    $(document).on('click', '[data-copy]', function () {
        copiarTexto($(this).attr('id'));
    });

    // Calculadora de Colesterol LDL
    $('#calcularRiscoBtn').click(function () {
        let idade = parseFloat($('#idade').val());
        let colesterolTotal = parseFloat($('#colesterolTotal').val());
        let colesterolHDL = parseFloat($('#colesterolHDL').val());
        let pressaoSistolica = parseFloat($('#pressaoSistolica').val());
        let emMedicamentoHipertensao = $('#emMedicamentoHipertensao').val() === "true" ? 1 : 0;
        let fumante = $('#fumante').val() === "true" ? 1 : 0;
        let diabetes = $('#diabetes').val() === "true" ? 1 : 0;
        let genero = $('#genero').val();
        let raca = $('#raca').val();

        if (isNaN(idade) || isNaN(colesterolTotal) || isNaN(colesterolHDL) || isNaN(pressaoSistolica)) {
            alert('Preencha todos os campos corretamente!');
            return;
        }

        let coef = {
            mulher: {
                negro: { C_Age: 17.114, C_HDL_Chol: -18.92, C_Age_HDL_Chol: 4.475, C_On_Hypertension_Meds: 29.291, C_Age_On_Hypertension_Meds: -6.432, C_Off_Hypertension_Meds: 27.82, C_Age_Off_Hypertension_Meds: -6.087, C_Smoker: 0.691, C_Diabetes: 0.874, S10: 0.9533, Mean_Terms: 86.61 },
                branco: { C_Age: -29.799, C_HDL_Chol: -13.578, C_Age_HDL_Chol: 3.149, C_On_Hypertension_Meds: 2.019, C_Off_Hypertension_Meds: 1.957, C_Smoker: 7.574, C_Age_Smoker: -1.665, C_Diabetes: 0.661, S10: 0.9665, Mean_Terms: -29.18 }
            },
            homem: {
                negro: { C_Age: 2.469, C_HDL_Chol: -0.307, C_On_Hypertension_Meds: 1.916, C_Off_Hypertension_Meds: 1.809, C_Smoker: 0.549, C_Diabetes: 0.645, S10: 0.8954, Mean_Terms: 19.54 },
                branco: { C_Age: 12.344, C_HDL_Chol: -7.99, C_Age_HDL_Chol: 1.769, C_On_Hypertension_Meds: 1.797, C_Off_Hypertension_Meds: 1.764, C_Smoker: 7.837, C_Age_Smoker: -1.795, C_Diabetes: 0.658, S10: 0.9144, Mean_Terms: 61.18 }
            }
        };

        let c = coef[genero][raca];

        let Terms = c.C_Age * Math.log(idade) +
            c.C_Sq_Age * Math.pow(Math.log(idade), 2) +
            c.C_Total_Chol * Math.log(colesterolTotal) +
            c.C_Age_Total_Chol * Math.log(idade) * Math.log(colesterolTotal) +
            c.C_HDL_Chol * Math.log(colesterolHDL) +
            c.C_Age_HDL_Chol * Math.log(idade) * Math.log(colesterolHDL) +
            (emMedicamentoHipertensao ? c.C_On_Hypertension_Meds * Math.log(pressaoSistolica) +
            c.C_Age_On_Hypertension_Meds * Math.log(idade) * Math.log(pressaoSistolica) :
            c.C_Off_Hypertension_Meds * Math.log(pressaoSistolica) +
            c.C_Age_Off_Hypertension_Meds * Math.log(idade) * Math.log(pressaoSistolica)) +
            c.C_Smoker * fumante +
            (c.C_Age_Smoker || 0) * Math.log(idade) * fumante +
            c.C_Diabetes * diabetes;


        let Risco_Dez_Anos = 100 * (1 - Math.pow(c.S10, Math.exp(Terms - c.Mean_Terms)));

        let resultado = Risco_Dez_Anos < 5 ? "Baixo risco (<5%)" :
            Risco_Dez_Anos <= 7.4 ? "Limítrofe (5% a 7.4%)" :
                Risco_Dez_Anos <= 19.9 ? "Risco intermediário (7.5% a 19.9%)" :
                    "Alto risco (≥20%)";

                    console.log(Risco_Dez_Anos);
        let resultadoTexto = `Risco de Dez Anos: ${Risco_Dez_Anos.toFixed(2)}% - ${resultado}`;
        $('#resultadoRisco').text(resultadoTexto).data('copyText', resultadoTexto).attr('data-copy', true);
    });

    // Calculadora de Colesterol LDL
    $('#calcularLDLBtn').click(function () {
        let colesterolTotal = parseFloat($('#colesterolTotalLDL').val());
        let colesterolHDL = parseFloat($('#colesterolHDL_LDL').val());
        let triglicerideos = parseFloat($('#triglicerideos').val());

        if (isNaN(colesterolTotal) || isNaN(colesterolHDL) || isNaN(triglicerideos)) {
            alert('Preencha todos os campos corretamente!');
            return;
        }

        let ldl = colesterolTotal - colesterolHDL - triglicerideos / 5;
        let resultadoLDL = "Colesterol LDL: " + ldl.toFixed(2);

        $('#resultadoLDL').text(resultadoLDL).data('copyText', resultadoLDL).attr('data-copy', true);
    });

    $('#calcularGFRBtn').click(function () {
        let creatinina = parseFloat($('#creatinina').val());
        let idade = parseFloat($('#idadeGFR').val());
        let sexo = $('#sexoGFR').val();
        let raca = $('#racaGFR').val();
        
        let sex = sexo === "mulher" ? 1.018 : 1;
        let alpha = sexo === "mulher" ? -0.329 : -0.411;
        let kappa = sexo === "mulher" ? 0.7 : 0.9;
        let race = raca === "negro" ? 1.159 : 1;

        let gfr = 141 * Math.min(Math.pow(creatinina / kappa, alpha), Math.pow(creatinina / kappa, -1.209)) * Math.pow(0.993, idade) * sex * race;
        
        let categoriaG = gfr >= 90 ? "G1" : gfr >= 60 ? "G2" : gfr >= 45 ? "G3a" : gfr >= 30 ? "G3b" : gfr >= 15 ? "G4" : "G5";
        let descricao = gfr >= 90 ? "Normal" : gfr >= 60 ? "Levemente diminuída" : gfr >= 45 ? "Leve/moderadamente diminuída" : gfr >= 30 ? "Moderadamente diminuída" : gfr >= 15 ? "Muito diminuída" : "Falência renal";
        let faixa = gfr >= 90 ? "≥ 90" : gfr >= 60 ? "60-89" : gfr >= 45 ? "45-59" : gfr >= 30 ? "30-44" : gfr >= 15 ? "15-29" : "< 15";
        
        let tfgNormal = idade > 70 ? 75 : 120;
        let percentualFuncaoRenal = (gfr / tfgNormal) * 100;
        
        let resultadoTexto = `Taxa de Filtração Glomerular (GFR): ${gfr.toFixed(2)} mL/min/1.73m²\nCategoria: ${categoriaG} - ${descricao} (Faixa: ${faixa} mL/min/1.73m²)\nFunção renal restante: ${percentualFuncaoRenal.toFixed(2)}%`;
        
        $('#resultadoGFR').text(resultadoTexto).data('copyText', resultadoTexto).attr('data-copy', true);
    });

    $('#calcularIMCBtn').click(function () {
        let peso = parseFloat($('#pesoIMC').val());
        let altura = parseFloat($('#alturaIMC').val()) / 100;
        let idade = parseFloat($('#idadeIMC').val());
        let imc = peso / (altura * altura);
        
        let resultado = idade < 60 ?
            imc < 16 ? "Magreza grau III" : imc < 17 ? "Magreza grau II" : imc < 18.5 ? "Magreza grau I" : imc < 25 ? "Peso normal" : imc < 30 ? "Sobrepeso" : imc < 35 ? "Obesidade grau I" : imc < 40 ? "Obesidade grau II" : "Obesidade grau III"
            : imc < 22 ? "Baixo peso" : imc <= 27 ? "Peso normal" : "Obesidade";
        
        let resultadoTexto = `IMC: ${imc.toFixed(2)} - ${resultado}`;
        
        $('#resultadoIMC').text(resultadoTexto).data('copyText', resultadoTexto).attr('data-copy', true);
    });
});