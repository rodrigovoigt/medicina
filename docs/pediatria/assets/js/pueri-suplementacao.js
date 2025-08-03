//Arquivo de Suplementação Vitamínica Pediátrica
//Atualizado conforme Consenso SBP/SPSP 2018
//Última atualização: 2024

//Proibir entrada de números no Input
            function isNumberKey(evt, obj) {
                var charCode = (evt.which) ? evt.which : event.keyCode
                var value = obj.value;
                var dotcontains = value.indexOf(".") != -1;
                if (dotcontains)
                if (charCode == 46) return false;
                if (charCode == 46) return true;
                if (charCode > 31 && (charCode < 48 || charCode > 57))
                    return false;
                return true;
            }

//VERIFICAR DATA
function qtdeDias(dataInput) {
    var data = dataInput.split("/");
    data = new Date(data[2], data[1] - 1, data[0]);
     
    var start = data;
    var end = new Date();
    
    var qtde = new Date(end - start);
        qtde = Math.floor(qtde / 86400000);
    
    return qtde;
}

function suplementacao(idade, peso, maturidade, pesoAoNascer, pesoAoNascer2) {
    
    // Funções auxiliares baseadas no Consenso SBP/SPSP 2018
    function calcularVitaminaD(idadeEmDias) {
        if (idadeEmDias >= 0 && idadeEmDias <= 365) {
            return "<li><b>Vitamina D 200 UI/gota -</b> Dar 2 gotas (400 UI), todos os dias, até 1 ano de idade.</li>";
        } else if (idadeEmDias >= 366 && idadeEmDias <= 730) {
            return "<li><b>Vitamina D 200 UI/gota -</b> Dar 3 gotas (600 UI), todos os dias, até 2 anos de idade.</li>";
        } else {
            return null;
        }
    }
    
    function calcularVitaminaA(idadeEmDias) {
        if (idadeEmDias > 1825) {
            return null;
        } else if (idadeEmDias >= 183 && idadeEmDias <= 365) {
            return "<li><b>Vitamina A 100.000 UI (megadose) -</b> Dar o conteúdo de 1 cápsula, disponibilizada na APS, a partir dos 6 meses de idade em crianças que vivem em áreas endêmicas para deficiência de vitamina A ou que apresentam risco aumentado de deficiência.</li>";
        } else if (idadeEmDias >= 366 && idadeEmDias <= 1825) {
            return "<li><b>Vitamina A 200.000 UI (megadose) -</b> Dar o conteúdo de 1 cápsula, disponibilizada na APS, a cada 6 meses, a partir dos 12 meses de idade, até os 5 anos, para crianças que vivem em áreas endêmicas para deficiência de vitamina A ou que apresentam risco aumentado de deficiência.</li>";
        } else {
            return null;
        }
    }
    
    function calcularFerro(idadeEmDias, pesoAtual, pesoNascimento, maturidade) {
        if (idadeEmDias > 730) {
            return "Suplementação de ferro profilática não está mais indicada após 24 meses de idade.";
        }
        
        var pesoKg = pesoAtual / 1000;
        var resFerroHTML = "";
        
        // Recém-nascido a termo com peso adequado (≥2500g)
        if (maturidade === "RNT" && pesoNascimento >= 2500) {
            if (idadeEmDias < 90) {
                return "Suplementação de ferro deve ser iniciada aos 3 meses de vida (Consenso SBP/SPSP 2018).";
            }
            var doseFerro = 1 * pesoKg;
            resFerroHTML = "<li><b>Sulfato Ferroso 125mg/mL (1,25mg/gota) -</b> Dar " + Math.round((pesoKg * 0.8)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses. A dose deve ser reajustada conforme o peso.</li>";
            resFerroHTML += "<li><b>Ferripolimaltose 50mg/mL (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses. A dose deve ser reajustada conforme o peso.</li>";
            resFerroHTML += "<li><b>Noripurum gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses. A dose deve ser reajustada conforme o peso.</li>";
            resFerroHTML += "<li><b>Combiron gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses. A dose deve ser reajustada conforme o peso.</li>";
            return resFerroHTML;
        }
        
        // Recém-nascido a termo com baixo peso (<2500g)
        if (maturidade === "RNT" && pesoNascimento < 2500) {
            if (idadeEmDias < 30) {
                return "Suplementação de ferro deve ser iniciada aos 30 dias de vida devido ao baixo peso ao nascer.";
            } else if (idadeEmDias <= 365) {
                var doseFerro = 2 * pesoKg;
                resFerroHTML = "<li><b>Sulfato Ferroso 125mg/mL (1,25mg/gota) -</b> Dar " + Math.round((pesoKg * 1.6)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, durante o primeiro ano. Após 12 meses: reduzir para 1mg/kg/dia.</li>";
                resFerroHTML += "<li><b>Ferripolimaltose 50mg/mL (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.8)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, durante o primeiro ano. Após 12 meses: reduzir para 1mg/kg/dia.</li>";
                resFerroHTML += "<li><b>Noripurum gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.8)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, durante o primeiro ano. Após 12 meses: reduzir para 1mg/kg/dia.</li>";
                resFerroHTML += "<li><b>Neutrofer gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.8)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, durante o primeiro ano. Após 12 meses: reduzir para 1mg/kg/dia.</li>";
                return resFerroHTML;
            } else {
                var doseFerro = 1 * pesoKg;
                resFerroHTML = "<li><b>Sulfato Ferroso 125mg/mL (1,25mg/gota) -</b> Dar " + Math.round((pesoKg * 0.8)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses.</li>";
                resFerroHTML += "<li><b>Ferripolimaltose 50mg/mL (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses.</li>";
                resFerroHTML += "<li><b>Noripurum gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses.</li>";
                resFerroHTML += "<li><b>Combiron gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses.</li>";
                resFerroHTML += "<li><b>Neutrofer gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses.</li>";
                return resFerroHTML;
            }
        }
        
        // Recém-nascido pré-termo
        if (maturidade === "RNPT") {
            if (pesoNascimento > 2500) {
                if (idadeEmDias < 90) {
                    return "Suplementação de ferro deve ser iniciada aos 3 meses de vida (pré-termo com peso adequado).";
                }
                var doseFerro = 1 * pesoKg;
                resFerroHTML = "<li><b>Sulfato Ferroso 125mg/mL (1,25mg/gota) -</b> Dar " + Math.round((pesoKg * 0.8)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses (pré-termo com peso adequado).</li>";
                resFerroHTML += "<li><b>Ferripolimaltose 50mg/mL (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses (pré-termo com peso adequado).</li>";
                resFerroHTML += "<li><b>Noripurum gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses (pré-termo com peso adequado).</li>";
                resFerroHTML += "<li><b>Combiron gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses (pré-termo com peso adequado).</li>";
                resFerroHTML += "<li><b>Neutrofer gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses (pré-termo com peso adequado).</li>";
                return resFerroHTML;
            } else if (pesoNascimento > 1500 && pesoNascimento <= 2500) {
                if (idadeEmDias < 30) {
                    return "Suplementação de ferro deve ser iniciada aos 30 dias de vida devido à prematuridade.";
                } else if (idadeEmDias <= 365) {
                    var doseFerro = 2 * pesoKg;
                    resFerroHTML = "<li><b>Sulfato Ferroso 125mg/mL (1,25mg/gota) -</b> Dar " + Math.round((pesoKg * 1.6)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, durante o primeiro ano. Após 12 meses: reduzir para 1mg/kg/dia.</li>";
                    resFerroHTML += "<li><b>Ferripolimaltose 50mg/mL (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.8)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, durante o primeiro ano. Após 12 meses: reduzir para 1mg/kg/dia.</li>";
                    resFerroHTML += "<li><b>Noripurum gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.8)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, durante o primeiro ano. Após 12 meses: reduzir para 1mg/kg/dia.</li>";
                    resFerroHTML += "<li><b>Combiron gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.8)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, durante o primeiro ano. Após 12 meses: reduzir para 1mg/kg/dia.</li>";
                    resFerroHTML += "<li><b>Neutrofer gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.8)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, durante o primeiro ano. Após 12 meses: reduzir para 1mg/kg/dia.</li>";
                    return resFerroHTML;
                } else {
                    var doseFerro = 1 * pesoKg;
                    resFerroHTML = "<li><b>Sulfato Ferroso 125mg/mL (1,25mg/gota) -</b> Dar " + Math.round((pesoKg * 0.8)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses.</li>";
                    resFerroHTML += "<li><b>Ferripolimaltose 50mg/mL (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses.</li>";
                    resFerroHTML += "<li><b>Noripurum gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses.</li>";
                    resFerroHTML += "<li><b>Combiron gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses.</li>";
                    resFerroHTML += "<li><b>Neutrofer gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses.</li>";
                    return resFerroHTML;
                }
            } else if (pesoNascimento > 1000 && pesoNascimento <= 1500) {
                if (idadeEmDias < 30) {
                    return "Suplementação de ferro deve ser iniciada aos 30 dias de vida devido à prematuridade extrema.";
                } else if (idadeEmDias <= 365) {
                    var doseFerro = 3 * pesoKg;
                    resFerroHTML = "<li><b>Sulfato Ferroso 125mg/mL (1,25mg/gota) -</b> Dar " + Math.round((pesoKg * 2.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, durante o primeiro ano. Após 12 meses: reduzir para 1mg/kg/dia.</li>";
                    resFerroHTML += "<li><b>Ferripolimaltose 50mg/mL (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 1.2)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, durante o primeiro ano. Após 12 meses: reduzir para 1mg/kg/dia.</li>";
                    resFerroHTML += "<li><b>Noripurum gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 1.2)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, durante o primeiro ano. Após 12 meses: reduzir para 1mg/kg/dia.</li>";
                    resFerroHTML += "<li><b>Combiron gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 1.2)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, durante o primeiro ano. Após 12 meses: reduzir para 1mg/kg/dia.</li>";
                    resFerroHTML += "<li><b>Neutrofer gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 1.2)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, durante o primeiro ano. Após 12 meses: reduzir para 1mg/kg/dia.</li>";
                    return resFerroHTML;
                } else {
                    var doseFerro = 1 * pesoKg;
                    resFerroHTML = "<li><b>Sulfato Ferroso 125mg/mL (1,25mg/gota) -</b> Dar " + Math.round((pesoKg * 0.8)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses.</li>";
                    resFerroHTML += "<li><b>Ferripolimaltose 50mg/mL (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses.</li>";
                    resFerroHTML += "<li><b>Noripurum gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses.</li>";
                    resFerroHTML += "<li><b>Combiron gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses.</li>";
                    resFerroHTML += "<li><b>Neutrofer gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses.</li>";
                    return resFerroHTML;
                }
            } else if (pesoNascimento <= 1000) {
                if (idadeEmDias < 30) {
                    return "Suplementação de ferro deve ser iniciada aos 30 dias de vida devido à prematuridade extrema.";
                } else if (idadeEmDias <= 365) {
                    var doseFerro = 4 * pesoKg;
                    resFerroHTML = "<li><b>Sulfato Ferroso 125mg/mL (1,25mg/gota) -</b> Dar " + Math.round((pesoKg * 3.2)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, durante o primeiro ano. Após 12 meses: reduzir para 1mg/kg/dia.</li>";
                    resFerroHTML += "<li><b>Ferripolimaltose 50mg/mL (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 1.6)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, durante o primeiro ano. Após 12 meses: reduzir para 1mg/kg/dia.</li>";
                    resFerroHTML += "<li><b>Noripurum gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 1.6)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, durante o primeiro ano. Após 12 meses: reduzir para 1mg/kg/dia.</li>";
                    resFerroHTML += "<li><b>Combiron gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 1.6)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, durante o primeiro ano. Após 12 meses: reduzir para 1mg/kg/dia.</li>";
                    resFerroHTML += "<li><b>Neutrofer gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 1.6)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, durante o primeiro ano. Após 12 meses: reduzir para 1mg/kg/dia.</li>";
                    return resFerroHTML;
                } else {
                    var doseFerro = 1 * pesoKg;
                    resFerroHTML = "<li><b>Sulfato Ferroso 125mg/mL (1,25mg/gota) -</b> Dar " + Math.round((pesoKg * 0.8)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses.</li>";
                    resFerroHTML += "<li><b>Ferripolimaltose 50mg/mL (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses.</li>";
                    resFerroHTML += "<li><b>Noripurum gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses.</li>";
                    resFerroHTML += "<li><b>Combiron gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses.</li>";
                    resFerroHTML += "<li><b>Neutrofer gotas (2,5mg/gota) -</b> Dar " + Math.round((pesoKg * 0.4)) + " gotas (" + doseFerro.toFixed(1) + "mg/dia), próximo ao almoço, até 24 meses.</li>";
                    return resFerroHTML;
                }
            }
        }
        
        return "Situação não contemplada nas recomendações do Consenso SBP/SPSP 2018.";
    }
    
    var zinco = {
        "idadeInicio": [7],
        "idadeFim": [180],
        "pesoMinimo": [null],
        "dosePreconizada": ["2 mL/dia"],
        "doseUnica": [true],
        "dosePorKg": [1]
    };
    
    // Cálculo das suplementações baseado no Consenso SBP/SPSP 2018
    var resVitaminaA = calcularVitaminaA(idade);
    var resVitaminaD = calcularVitaminaD(idade);
    var resFerro = calcularFerro(idade, peso, pesoAoNascer, maturidade);
    
    // Tratamento especial para RNPT - Vitamina A+D combinada
    if (maturidade === "RNPT") {
        if (idade >= 7 && idade <= 730) {
            resVitaminaA = "<li><b>Vitamina A + D -</b> Dar 2 gotas, próximo ao almoço, até completar 2 anos de idade. Depois, manter suplementação apenas da Vitamina A com superdoses (esquema do RNT).</li>";
            resVitaminaD = null; // Remove vitamina D isolada para RNPT
        } else if (idade > 730 && idade <= 1825) {
            resVitaminaA = "<li><b>Vitamina A 200.000 UI (megadose) -</b> Dar o conteúdo de 1 cápsula, disponibilizada na APS, em intervalos de 6/6 meses até completar 5 anos de idade (59 meses).</li>";
            resVitaminaD = null;
        }
    }
    
    // Zinco para RNPT com peso <1500g
    var resZinco = null;
    if (maturidade === "RNPT" && idade >= 7 && idade <= 180 && pesoAoNascer <= 1500) {
        resZinco = "<li><b>Sulfato de Zinco 4mg/mL -</b> Dar 1.25 mL (5 mg/dia), próximo ao almoço, até 6 meses de vida.</li>";
    }
    
    // Vitamina C para RNPT até 40 dias
    var resVitaminaC = null;
    if (maturidade === "RNPT" && idade >= 7 && idade <= 40) {
        resVitaminaC = "<li><b>Vitamina C 200mg/mL</b> - Dar 5 gotas, próximo ao almoço, até completar 40 dias de vida. Após este período, a necessidade diária é atingida pelo aleitamento materno ou uso de fórmulas infantis.</li>";
    }
    
    //Retorno Final
    return [resVitaminaA, resVitaminaD, resFerro, resZinco];
    
}