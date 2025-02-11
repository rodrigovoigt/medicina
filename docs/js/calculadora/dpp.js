$(document).ready(function () {
    // Função para calcular DPP com base no DUM
    function calcularDPP(dum) {
        let dumDate = new Date(dum);
        dumDate.setDate(dumDate.getDate() + 280);  // Adiciona 280 dias ao DUM
        return dumDate.toLocaleDateString('pt-BR');
    }

    // Mostra ou esconde os campos de acordo com a escolha do select
    $('#tipoData').change(function () {
        let tipoData = $(this).val();
        if (tipoData === 'dum') {
            $('#inputDUM').show();
            $('#inputUltimoUltra').hide();
        } else {
            $('#inputDUM').hide();
            $('#inputUltimoUltra').show();
        }
    });

    $('#calcularDPP').click(function () {
        let tipoData = $('#tipoData').val();
        let dataDUM = $('#dataDUM').val();
        let dataUltimoUltra = $('#dataUltimoUltra').val();
        let dppResultado;

        if (tipoData === 'dum' && dataDUM) {
            // Calcular DPP com base no DUM
            dppResultado = calcularDPP(dataDUM);
        } else if (tipoData === 'ultrassom' && dataUltimoUltra) {
            // Implementar cálculo com base no Ultrassom se necessário
            alert('Cálculo baseado no Ultrassom ainda não está implementado.');
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        $('#resultadoDPP').text(`Data Provável do Parto: ${dppResultado}`);
    });
});
