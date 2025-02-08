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

    // Calculadora de IMC
    $('#calcular').click(function() {
        // Pegando os valores dos inputs
        let peso = parseFloat($('#peso').val());
        let altura = parseFloat($('#altura').val()) / 100; // Convertendo para metros
        let anos = parseInt($('#anos').val()) || 0;
        let meses = parseInt($('#meses').val()) || 0;
        let semanas = parseInt($('#semanas').val()) || 0;
        let dias = parseInt($('#dias').val()) || 0;
        let sexo = $('#sexo').val(); // Obtendo o valor selecionado no <select>
        
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
            $('#resultado').text(resultadoTexto).data('copyText', resultadoTexto).attr('data-copy', true);
            $('#resultado').show();
        } else {
            // Se for adulto, não exibe percentil
            let resultadoTexto = `IMC: ${imc.toFixed(2)} - ${resultado}`;
            $('#resultado').text(resultadoTexto).data('copyText', resultadoTexto).attr('data-copy', true);
            $('#resultado').show();
        }
    });

});