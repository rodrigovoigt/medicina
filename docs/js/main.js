document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".dropdown > a").forEach((menu) => {
        menu.addEventListener("click", function (event) {
            event.preventDefault();
            let dropdown = this.parentElement;
            dropdown.classList.toggle("active");

            // Fecha outros dropdowns ao abrir um
            document.querySelectorAll(".dropdown").forEach((otherDropdown) => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove("active");
                }
            });
        });
    });

    // Fecha dropdowns se clicar fora
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".dropdown")) {
            document.querySelectorAll(".dropdown").forEach((dropdown) => {
                dropdown.classList.remove("active");
            });
        }
    });



    function showSection(sectionId) {
        document.querySelectorAll("section").forEach((section) => {
            section.classList.toggle("active", section.id === sectionId);
            section.classList.toggle("hidden", section.id !== sectionId);
        });
    }

    const links = {
        homeLink: "home",
        riskLink: "riskCalculator",
        ldlLink: "ldlCalculator",
        gfrLink: "gfrCalculator",
        imcLink: "imcCalculator",
        exameFisicoGeralLink: "exameFisicoGeral",
        teste1Link: "teste1Section",
        teste2Link: "teste2Section",
    };

    Object.keys(links).forEach((name) => {
        const link = document.getElementsByName(name)[0]; // Seleciona o primeiro elemento com o atributo name
        if (link) {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                showSection(links[name]);
            });
        }
    });

    ["calcularRiscoBtn", "calcularLDLBtn", "calcularGFRBtn", "calcularIMCBtn"].forEach((btnId) => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener("click", function () {
                const functionName = btnId.replace("Btn", ""); // Remove "Btn" do nome do botão para obter a função correta
                if (typeof window[functionName] === "function") {
                    window[functionName](); // Chama a função correta
                } else {
                    console.error(`Função ${functionName} não encontrada`);
                }
            });
        }
    });
});

// Função para calcular o Risco de Dez Anos
function calcularRisco() {
    let idade = parseFloat(document.getElementById("idade").value);
    let colesterolTotal = parseFloat(
        document.getElementById("colesterolTotal").value
    );
    let colesterolHDL = parseFloat(
        document.getElementById("colesterolHDL").value
    );
    let pressaoSistolica = parseFloat(
        document.getElementById("pressaoSistolica").value
    );
    let emMedicamentoHipertensao =
        document.getElementById("emMedicamentoHipertensao").value === "true";
    let fumante = document.getElementById("fumante").value === "true";
    let diabetes = document.getElementById("diabetes").value === "true";
    let genero = document.getElementById("genero").value;
    let raca = document.getElementById("raca").value;

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

    document.getElementById("resultadoRisco").innerText =
        "Risco de Dez Anos: " + Risco_Dez_Anos.toFixed(2) + "% - " + resultado;
}

// Função para calcular o Colesterol LDL
function calcularLDL() {
    let colesterolTotal = parseFloat(
        document.getElementById("colesterolTotalLDL").value
    );
    let colesterolHDL = parseFloat(
        document.getElementById("colesterolHDL_LDL").value
    );
    let triglicerideos = parseFloat(
        document.getElementById("triglicerideos").value
    );

    let ldl = colesterolTotal - colesterolHDL - triglicerideos / 5;

    document.getElementById("resultadoLDL").innerText =
        "Colesterol LDL: " + ldl.toFixed(2);
}

// Função para calcular o GFR
function calcularGFR() {
    let creatinina = parseFloat(document.getElementById("creatinina").value);
    let idade = parseFloat(document.getElementById("idadeGFR").value);
    let sexo = document.getElementById("sexoGFR").value;
    let raca = document.getElementById("racaGFR").value;

    let sex, alpha, kappa, race;

    if (sexo === "mulher") {
        sex = 1.018;
        alpha = -0.329;
        kappa = 0.7;
    } else {
        sex = 1;
        alpha = -0.411;
        kappa = 0.9;
    }

    if (raca === "negro") {
        race = 1.159;
    } else {
        race = 1;
    }

    let gfr =
        141 *
        Math.min(
            Math.pow(creatinina / kappa, alpha),
            Math.pow(creatinina / kappa, -1.209)
        ) *
        Math.pow(0.993, idade) *
        sex *
        race;

    // Determinar a categoria de TFG (G), a descrição e a faixa
    let categoriaG, descricao, faixa;
    if (gfr >= 90) {
        categoriaG = "G1";
        descricao = "Normal";
        faixa = "≥ 90";
    } else if (gfr >= 60) {
        categoriaG = "G2";
        descricao = "Levemente diminuída";
        faixa = "60-89";
    } else if (gfr >= 45) {
        categoriaG = "G3a";
        descricao = "Leve/moderadamente diminuída";
        faixa = "45-59";
    } else if (gfr >= 30) {
        categoriaG = "G3b";
        descricao = "Moderadamente diminuída";
        faixa = "30-44";
    } else if (gfr >= 15) {
        categoriaG = "G4";
        descricao = "Muito diminuída";
        faixa = "15-29";
    } else {
        categoriaG = "G5";
        descricao = "Falência renal";
        faixa = "< 15";
    }

    // Definir TFG normal com base na idade
    let tfgNormal = idade > 70 ? 75 : 120;

    // Cálculo da porcentagem de função renal restante
    let percentualFuncaoRenal = (gfr / tfgNormal) * 100;
    
    // Exibir o resultado
    document.getElementById("resultadoGFR").innerText =
        "Taxa de Filtração Glomerular (GFR): " +
        gfr.toFixed(2) +
        " mL/min/1.73m²\n" +
        "Categoria: " +
        categoriaG +
        " - " +
        descricao +
        " (Faixa: " +
        faixa +
        " mL/min/1.73m²)\n" +
        "Função renal restante: " +
        percentualFuncaoRenal.toFixed(2) +
        "%";
}

function calcularIMC() {
    let peso = parseFloat(document.getElementById("pesoIMC").value);
    let altura = parseFloat(document.getElementById("alturaIMC").value) / 100; // converter de cm para m
    let idade = parseFloat(document.getElementById("idadeIMC").value);
    let imc = peso / (altura * altura);
    let resultado;

    if (idade < 60) {
        if (imc < 16) {
            resultado = "Magreza grau III";
        } else if (imc >= 16 && imc <= 16.99) {
            resultado = "Magreza grau II";
        } else if (imc >= 17 && imc <= 18.49) {
            resultado = "Magreza grau I";
        } else if (imc >= 18.5 && imc <= 24.99) {
            resultado = "Peso normal";
        } else if (imc >= 25 && imc <= 29.99) {
            resultado = "Sobrepeso";
        } else if (imc >= 30 && imc <= 34.99) {
            resultado = "Obesidade grau I";
        } else if (imc >= 35 && imc <= 39.99) {
            resultado = "Obesidade grau II";
        } else if (imc >= 40) {
            resultado = "Obesidade grau III";
        }
    } else {
        if (imc < 22) {
            resultado = "Baixo peso";
        } else if (imc >= 22 && imc <= 27) {
            resultado = "Peso normal";
        } else if (imc > 27) {
            resultado = "Obesidade";
        }
    }

    document.getElementById("resultadoIMC").innerText =
        "IMC: " + imc.toFixed(2) + " - " + resultado;
}

// Atualiza o texto conforme os checkboxes são selecionados
document.querySelectorAll('.exame').forEach(checkbox => {
    checkbox.addEventListener('change', () => atualizarTexto('resultadoExameFisico'));
});

function atualizarTexto(idResultado) {
    let textoPuro = ''; // Para cópia correta
    let textoFormatado = ''; // Para exibição correta

    document.querySelectorAll('.exame:checked').forEach(checkbox => {
        let texto = checkbox.dataset.text;
        textoPuro += texto + '\n\n'; // Mantém as quebras de linha para a cópia
        textoFormatado += texto.replace(/\n/g, '<br>') + '<br><br>'; // Converte para exibição HTML
    });

    let resultadoElement = document.getElementById(idResultado);
    
    if (textoFormatado.trim()) {
        resultadoElement.innerHTML = textoFormatado;
        resultadoElement.dataset.copyText = textoPuro.trim(); // Salva o texto puro para cópia
    } else {
        resultadoElement.innerHTML = 'Clique para copiar';
        resultadoElement.dataset.copyText = ''; // Reseta caso nenhum item esteja selecionado
    }
}

// Copia o texto formatado ao clicar no resultado
function copiarTexto(id) {
    let resultadoElement = document.getElementById(id);
    let textoParaCopiar = resultadoElement.dataset.copyText || '';

    if (textoParaCopiar) {
        navigator.clipboard.writeText(textoParaCopiar).then(() => {
            alert('Texto copiado com sucesso!');
        }).catch(err => {
            console.error('Erro ao copiar: ', err);
        });
    }
}

