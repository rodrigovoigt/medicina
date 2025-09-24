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

    // Evento de clique para copiar texto
    $(document).on('click', '[data-copy]', function () {
        copiarTexto($(this).attr('id'));
    });
});
