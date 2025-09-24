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

    // Calculadora de IMC
    $('#calcular').click(function() {
        // Pegando os valores dos inputs
        let peso = parseFloat($('#peso').val());
        let altura = parseFloat($('#altura').val()) / 100; // Convertendo para metros
        let anos = parseInt($('#anos').val()) || 0;
        let meses = parseInt($('#meses').val()) || 0;
        let semanas = parseInt($('#semanas').val()) || 0;
        let dias = parseInt($('#dias').val()) || 0;
        let sexo = $('input[name="sexo"]:checked').val();
        
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
        if (sexo === 'masculino') {
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
        } else if (sexo === 'feminino') {
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
            let resultadoTexto = ` ${imc.toFixed(2)} - ${resultado}, Percentil: ${percentilMaisProximo.toUpperCase()} (${ref[percentilMaisProximo]})`;
            $('#texto1').text(`IMC: `);
            $('#resultado').text(resultadoTexto).data('copyText', resultadoTexto).attr('data-copy', true);
            $('#resultado').show();
        } else {
            // Se for adulto, não exibe percentil
            let resultadoTexto = `${imc.toFixed(2)} - ${resultado}`;
            $('#texto1').text(`IMC: `);
            $('#resultado').text(resultadoTexto).data('copyText', resultadoTexto).attr('data-copy', true);
            $('#resultado').show();
        }
    });

});