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
    event.preventDefault();

    let query = document.getElementById("searchQuery").value.trim();

    if (!query) {
        alert("Digite algo para buscar.");
        return;
    }

    let searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}+site:msdmanuals.com+OR+site:consultaremedios.com.br+OR+site:pedb.com.br`;

    window.open(searchUrl, "_blank");
}

$(document).ready(function () {
    function calcularIdadeGestacional(dataReferencia, semanasPassadas, diasPassados) {
        let dataAtual = new Date();
        let dataInicial = new Date(dataReferencia);
        
        let diferencaDias = Math.floor((dataAtual - dataInicial) / (1000 * 60 * 60 * 24));
        let totalDias = semanasPassadas * 7 + diasPassados + diferencaDias;

        let semanas = Math.floor(totalDias / 7);
        let dias = totalDias % 7;

        return { semanas, dias };
    }

    $('#tipoCalculo').change(function () {
        let tipo = $(this).val();
        $('#inputDUM, #inputExame, #inputDPP').hide();

        if (tipo === "dum") {
            $('#inputDUM').show();
        } else if (tipo === "exame") {
            $('#inputExame').show();
        } else if (tipo === "dpp") {
            $('#inputDPP').show();
        }
    });

    $('#calcular').click(function () {
        let tipo = $('#tipoCalculo').val();
        let resultadoTexto = "";

        if (tipo === "dum") {
            let dum = $('#dataDUM').val();
            if (!dum) {
                alert("Informe a Data da Última Menstruação (DUM). ");
                return;
            }
            let idade = calcularIdadeGestacional(dum, 0, 0);
            resultadoTexto = `Idade Gestacional: ${idade.semanas} semanas e ${idade.dias} dias.`;
        
        } else if (tipo === "exame") {
            let dataExame = $('#dataExame').val();
            let idadeGestacionalExame = $('#idadeGestacionalExame').val().split(".");
            let semanasPassadas = parseInt(idadeGestacionalExame[0]);
            let diasPassados = parseInt(idadeGestacionalExame[1] || 0);

            if (!dataExame || isNaN(semanasPassadas)) {
                alert("Informe a data do exame e a idade gestacional correta.");
                return;
            }
            let idade = calcularIdadeGestacional(dataExame, semanasPassadas, diasPassados);
            resultadoTexto = `Idade Gestacional: ${idade.semanas} semanas e ${idade.dias} dias.`;

        } else if (tipo === "dpp") {
            let dpp = $('#dataDPP').val();
            if (!dpp) {
                alert("Informe a Data Provável do Parto (DPP). ");
                return;
            }
            let idade = calcularIdadeGestacional(dpp, 40, 0);
            resultadoTexto = `Idade Gestacional: ${idade.semanas} semanas e ${idade.dias} dias.`;
        }

        $('#resultado').text(resultadoTexto).data('copyText', resultadoTexto);
    });

    $('#resultado').click(function () {
        copiarTexto('resultado');
    });
});