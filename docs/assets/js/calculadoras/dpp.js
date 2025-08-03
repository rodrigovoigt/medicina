$(document).ready(function () {
    function calcularDPP(dum) {
        let dumDate = new Date(dum);
        dumDate.setDate(dumDate.getDate() + 280);  // Adiciona 280 dias ao DUM
        return dumDate.toLocaleDateString('pt-BR');
    }

    function calcularDPPporUltrassom(ultrassomData, idadeGestacional) {
        let dataUltimoUltra = new Date(ultrassomData);

        // Convertendo a entrada "semanas.dias" em dias totais
        let idadeSemanas = Math.floor(idadeGestacional);
        let idadeDias = Math.round((idadeGestacional - idadeSemanas) * 10); // Pegando os dias da entrada decimal
        let diasGestacionais = (idadeSemanas * 7) + idadeDias;

        let dpp = new Date(dataUltimoUltra);
        dpp.setDate(dpp.getDate() + (280 - diasGestacionais)); // Ajustar para 280 dias totais
        return dpp.toLocaleDateString('pt-BR');
    }

    // Alternar exibição dos campos
    $('#tipoData').change(function () {
        let tipoData = $(this).val();
        if (tipoData === 'dum') {
            $('#inputDUM').show();
            $('#inputUltimoUltra, #inputIdadeGestacional').hide();
        } else {
            $('#inputDUM').hide();
            $('#inputUltimoUltra, #inputIdadeGestacional').show();
        }
    });

    $('#calcular').click(function () {
        let tipoData = $('#tipoData').val();
        let dataDUM = $('#dataDUM').val();
        let dataUltimoUltra = $('#dataUltimoUltra').val();
        let idadeGestacional = parseFloat($('#idadeGestacional').val().replace(',', '.')); // Permite "12.3" ou "12,3"

        let dppResultado;

        if (tipoData === 'dum' && dataDUM) {
            dppResultado = calcularDPP(dataDUM);
        } else if (tipoData === 'ultrassom' && dataUltimoUltra && !isNaN(idadeGestacional)) {
            dppResultado = calcularDPPporUltrassom(dataUltimoUltra, idadeGestacional);
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        let resultadoTexto = `Data Provável do Parto: ${dppResultado}`;
        $('#resultado').text(resultadoTexto).data('copyText', resultadoTexto).attr('data-copy', true);
    });

    // Função para copiar texto ao clicar no resultado
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

    // Evento de clique para copiar texto
    $(document).on('click', '[data-copy]', function () {
        copiarTexto($(this).attr('id'));
    });
});
