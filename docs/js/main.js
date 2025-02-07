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
        tfgLink: "tfgCalculadora",
        imcLink: "imcCalculadora",
        cargaTabagicaLink: "cargaTabagicaCalculadora",
        exameFisicoGeralLink: "exameFisicoGeral",
        exameFisicoPeleLink: "exameFisicoPele",
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

    function showSection(sectionId) {
        $("section").each(function () {
            $(this).toggleClass("active", this.id === sectionId);
            $(this).toggleClass("hidden", this.id !== sectionId);
        });
    }

    // Atualiza o texto conforme os checkboxes são selecionados
    $('.exame').change(function () {
        let section = $(this).closest('section'); // Encontra a seção do checkbox alterado
        let resultadoId = section.find('.copy-box').attr('id'); // Pega o ID do resumo da seção
        atualizarTexto(resultadoId, section);
    });

    function atualizarTexto(idResultado, section) {
        let textoPuro = ''; // Texto para cópia
        let textoFormatado = ''; // Texto para exibição HTML

        // Para cada checkbox selecionado dentro da mesma seção
        section.find('.exame:checked').each(function () {
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

    // Calculadora de Risco Cardiovascular em 10 anos
    $('#calcularRiscoBtn').click(function () {
        let idade = parseFloat($('#idade').val());
        let colesterolTotal = parseFloat($('#colesterolTotal').val());
        let colesterolHDL = parseFloat($('#colesterolHDL').val());
        let pressaoSistolica = parseFloat($('#pressaoSistolica').val());
        let emMedicamentoHipertensao = $('#emMedicamentoHipertensao').val() === 'true';
        let fumante = $('#fumante').val() === 'true';
        let diabetes = $('#diabetes').val() === 'true';
        let genero = $('#genero').val();
        let raca = $('#raca').val();
    
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
    
        if (genero === "mulher") {
            if (raca === "negro") {
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
            } else if (raca === "branco") {
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
        } else if (genero === "homem") {
            if (raca === "negro") {
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
            } else if (raca === "branco") {
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
            emMedicamentoHipertensao *
                C_On_Hypertension_Meds *
                Math.log(pressaoSistolica) +
            emMedicamentoHipertensao *
                C_Age_On_Hypertension_Meds *
                Math.log(idade) *
                Math.log(pressaoSistolica) +
            !emMedicamentoHipertensao *
                C_Off_Hypertension_Meds *
                Math.log(pressaoSistolica) +
            !emMedicamentoHipertensao *
                C_Age_Off_Hypertension_Meds *
                Math.log(idade) *
                Math.log(pressaoSistolica) +
            C_Smoker * fumante +
            C_Age_Smoker * Math.log(idade) * fumante +
            C_Diabetes * diabetes;
    
        let Risco_Dez_Anos =
            100 * (1 - Math.pow(S10, Math.exp(Terms - Mean_Terms)));
    
        let resultado = "";
        if (Risco_Dez_Anos < 5) {
            resultado = "Baixo risco (<5%)";
        } else if (Risco_Dez_Anos >= 5 && Risco_Dez_Anos <= 7.4) {
            resultado = "Limítrofe (5% a 7.4%)";
        } else if (Risco_Dez_Anos >= 7.5 && Risco_Dez_Anos <= 19.9) {
            resultado = "Risco intermediário (7.5% a 19.9%)";
        } else {
            resultado = "Alto risco (≥20%)";
        }
    
        $('#resultadoRisco').text(
            "Risco de Dez Anos: " + Risco_Dez_Anos.toFixed(2) + "% - " + resultado
        );
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

    $('#calcularTFGBtn').click(function () {
        let creatinina = parseFloat($('#creatinina').val());
        let idade = parseFloat($('#idadeTFG').val());
        let sexo = $('#sexoTFG').val();
        let raca = $('#racaTFG').val();
        
        let sex = sexo === "mulher" ? 1.018 : 1;
        let alpha = sexo === "mulher" ? -0.329 : -0.411;
        let kappa = sexo === "mulher" ? 0.7 : 0.9;
        let race = raca === "negro" ? 1.159 : 1;

        let tfg = 141 * Math.min(Math.pow(creatinina / kappa, alpha), Math.pow(creatinina / kappa, -1.209)) * Math.pow(0.993, idade) * sex * race;
        
        let categoriaG = tfg >= 90 ? "G1" : tfg >= 60 ? "G2" : tfg >= 45 ? "G3a" : tfg >= 30 ? "G3b" : tfg >= 15 ? "G4" : "G5";
        let descricao = tfg >= 90 ? "Normal" : tfg >= 60 ? "Levemente diminuída" : tfg >= 45 ? "Leve/moderadamente diminuída" : tfg >= 30 ? "Moderadamente diminuída" : tfg >= 15 ? "Muito diminuída" : "Falência renal";
        let faixa = tfg >= 90 ? "≥ 90" : tfg >= 60 ? "60-89" : tfg >= 45 ? "45-59" : tfg >= 30 ? "30-44" : tfg >= 15 ? "15-29" : "< 15";
        
        let tfgNormal = idade > 70 ? 75 : 120;
        let percentualFuncaoRenal = (tfg / tfgNormal) * 100;
        
        let resultadoTexto = `Taxa de Filtração Glomerular (TFG): ${tfg.toFixed(2)} mL/min/1.73m²\nCategoria: ${categoriaG} - ${descricao} (Faixa: ${faixa} mL/min/1.73m²)\nFunção renal restante: ${percentualFuncaoRenal.toFixed(2)}%`;
        
        $('#resultadoTFG').text(resultadoTexto).data('copyText', resultadoTexto).attr('data-copy', true);
    });

    $('#calcularIMCBtn').click(function() {
        // Pegando os valores dos inputs
        let peso = parseFloat($('#pesoIMC').val());
        let altura = parseFloat($('#alturaIMC').val()) / 100; // Convertendo para metros
        let anos = parseInt($('#anosIMC').val()) || 0;
        let meses = parseInt($('#mesesIMC').val()) || 0;
        let semanas = parseInt($('#semanasIMC').val()) || 0;
        let dias = parseInt($('#diasIMC').val()) || 0;
        let sexo = $('#sexoIMC').val(); // Obtendo o valor selecionado no <select>
        
        // Calculando a idade total em dias
        let idadeDias = (anos * 365) + (meses * 30) + (semanas * 7) + dias;
        
        // Validação
        if (peso <= 0 || altura <= 0 || idadeDias <= 0 || sexo === "") {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }
        
        // Calculando IMC
        let imc = peso / (altura * altura);
        
        // Inicializando variáveis para o cálculo do percentil
        let resultado = '';
        let ref = null;
        let percentil = '';
    
        // Lógica para definir o IMC dependendo da idade e sexo
        if (sexo === 'homem') {
            if (idadeDias < 1857) {
                // Meninos (0-5 anos)
                ref = b0_5[idadeDias]; 
            } else if (idadeDias < 6935) {
                // Meninos (5-19 anos)
                let meses = Math.floor(idadeDias / 30) - 61; // Ajustando índice da tabela
                ref = b5_19[meses];
            } else {
                // Homens adultos
                resultado = anos < 60 ?
                    imc < 16 ? "Magreza grau III" : imc < 17 ? "Magreza grau II" : 
                    imc < 18.5 ? "Magreza grau I" : imc < 25 ? "Peso normal" : 
                    imc < 30 ? "Sobrepeso" : imc < 35 ? "Obesidade grau I" : 
                    imc < 40 ? "Obesidade grau II" : "Obesidade grau III"
                    : imc < 22 ? "Baixo peso" : imc <= 27 ? "Peso normal" : "Obesidade";
            }
        } else if (sexo === 'mulher') {
            if (idadeDias < 1857) {
                // Meninas (0-5 anos)
                ref = g0_5[idadeDias]; 
            } else if (idadeDias < 6935) {
                // Meninas (5-19 anos)
                let meses = Math.floor(idadeDias / 30) - 61; // Ajustando índice da tabela
                ref = g5_19[meses];
            } else {
                // Mulheres adultas
                resultado = anos < 60 ?
                    imc < 16 ? "Magreza grau III" : imc < 17 ? "Magreza grau II" : 
                    imc < 18.5 ? "Magreza grau I" : imc < 25 ? "Peso normal" : 
                    imc < 30 ? "Sobrepeso" : imc < 35 ? "Obesidade grau I" : 
                    imc < 40 ? "Obesidade grau II" : "Obesidade grau III"
                    : imc < 22 ? "Baixo peso" : imc <= 27 ? "Peso normal" : "Obesidade";
            }
        }
    
        // Se estiver dentro da faixa etária que usa percentil (0-5 anos ou 5-19 anos)
        if (ref) {
            let percentilMaisProximo = null;
            let menorDiferenca = Infinity;
    
            // Iterando sobre todos os percentis disponíveis na referência
            for (let p in ref) {
                let diferenca = Math.abs(imc - ref[p]);
                if (diferenca < menorDiferenca) {
                    menorDiferenca = diferenca;
                    percentilMaisProximo = p;
                }
            }
    
            // Determinar classificação do IMC
            if (imc < ref.p3) {
                resultado = "Baixo IMC para idade";
            } else if (imc >= ref.p3 && imc <= ref.p85) {
                resultado = "IMC adequado";
            } else if (imc > ref.p85 && imc <= ref.p97) {
                resultado = "Sobrepeso";
            } else {
                resultado = "Obesidade";
            }
    
            // Exibindo resultado com percentil correto
            let resultadoTexto = `IMC: ${imc.toFixed(2)} - ${resultado}, Percentil: ${percentilMaisProximo.toUpperCase()} (${ref[percentilMaisProximo]})`;
            $('#resultadoIMC').text(resultadoTexto).data('copyText', resultadoTexto).attr('data-copy', true);
            $('#resultadoIMC').show();
        } else {
            // Se for adulto, não exibe percentil
            let resultadoTexto = `IMC: ${imc.toFixed(2)} - ${resultado}`;
            $('#resultadoIMC').text(resultadoTexto).data('copyText', resultadoTexto).attr('data-copy', true);
            $('#resultadoIMC').show();
        }
    });
    
    $('#calcularCargaTabagicaBtn').click(function () {
        let cigarrosPorDia = parseFloat($('#cigarrosPorDiaCargaTabagica').val());
        let anosFumando = parseFloat($('#anosFumandoCargaTabagica').val());
    
        if (isNaN(cigarrosPorDia) || isNaN(anosFumando) || cigarrosPorDia <= 0 || anosFumando <= 0) {
            alert('Preencha todos os campos corretamente!');
            return;
        }
    
        let cargaTabagica = (cigarrosPorDia / 20) * anosFumando;
        let resultadoCarga = `Carga Tabágica: ${cargaTabagica.toFixed(2)} maços-ano`;
    
        $('#resultadoCargaTabagica').text(resultadoCarga).data('copyText', resultadoCarga).attr('data-copy', true);
    });
    
    
});