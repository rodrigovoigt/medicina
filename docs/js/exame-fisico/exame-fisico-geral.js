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

    function atualizarTexto() {
        let textoGerado = [];

        console.log($('#exameFisicoEstadoGeral').is(':checked'));
        console.log($('#exameFisicoEstadoGeral'));
    
        if ($('#exameFisicoEstadoGeral').is(':checked')) {
            textoGerado.push("O: Bom estado geral, fácies atípica, boas condições de higiene, colaborativo, eutímico, normobúlico, memória e raciocínio preservados, lúcido, orientado autopsiquicamente e alopsiquicamente, normovigilante. Eutrófico (IMC calculadora), normotônico, normoativo, deambulando sem auxílio. Mucosas úmidas e normocoradas, anictérico, acianótico, afebril (não aferido). Normosfigmo, normotenso, eupneico, normoxia em ar ambiente.\n");
        }

        if ($('#exameFisicoLabs').is(':checked')) {
            textoGerado.push("Exame laboratorial (/2025):\nHb XXX / Ht XXX / Leuco XXX / Plaq XXX\nGlicose XXX / HbA1c XXX\nCTotal XXX / CHdl XXX / CLdl XXX / Trig XXX\nVit D XXX / Vit B12 XXX / Vit C XXX\nTGO XXX / TGP XXX\n");
        }
    
        if ($('#exameFisicoPele').is(':checked')) {
            textoGerado.push("Exame físico de pele:\nLesão do tipo () localizada em (), simétrica, bordas definidas, cor (hiper/normo/hipocrômica/hiperemiada), diâmetro de (), de surgimento há () com/sem alterações significativas recentemente.\n");
        }
    
        if ($('#exameFisicoTorax').is(':checked')) {
            textoGerado.push("Exame físico de tórax e pulmonar:\nTórax íntegro, sem massas, crostas ou descamação, simétrico, sem abaulamento, sem retração, formato elíptico, normolíneo (ângulo de charpy =90°)/longilíneo (ângulo de charpy <90°)/brevilíneo (ângulo de charpy >90°).\nSom claro pulmonar à percussão.\nExpansão simétrica bilateralmente.\nFrêmito toracovocal presente sem alterações.\nMurmúrios vesiculares presentes bilateralmente, simétricos, sem ruídos adventícios.\n");
        }
    
        if ($('#exameFisicoCardio').is(':checked')) {
            textoGerado.push("Exame físico cardiovascular:\nPalpação do pulso de frequência normal, amplitude mediana ++/3, ritmo regular, simétrico com lado contralateral.\nAusência de turgência jugular.\nIctus cordis palpável na linha hemoclavicular esquerda no ()° espaço intercostal.\nAusência de impulsão paraesternal esquerda.\nAusência de frêmito cardiovascular.\nBulhas rítmicas regulares normofonéticas em dois tempos.\n");
        }
        
    
        if ($('#exameFisicoAbdomen').is(':checked')) {
            textoGerado.push("Exame físico de abdômen:\nAbdômen plano, depressível, com ruídos hidroaéreos presentes normoativos.\nSem alterações de sensibilidade, sem alterações de continuidade ou distensão após manobra de valsalva, normotenso bilateralmente.\nSom predominantemente claro e timpânico. Sem dor à palpação profunda ou superficial. Sem visceromegalias.\nSinal de piparote negativo.\nMacicez móvel normal.\nFígado palpável ao método de Lemos-Torres com bordas lisas, regulares, delimitadas e aspecto macio.\n");
        }

        if ($('#exameFisicoNeuro').is(':checked')) {
            textoGerado.push("Exame físico de abdômen:\nAbdômen plano, depressível, com ruídos hidroaéreos presentes normoativos.\nSem alterações de sensibilidade, sem alterações de continuidade ou distensão após manobra de valsalva, normotenso bilateralmente.\nSom predominantemente claro e timpânico. Sem dor à palpação profunda ou superficial. Sem visceromegalias.\nSinal de piparote negativo.\nMacicez móvel normal.\nFígado palpável ao método de Lemos-Torres com bordas lisas, regulares, delimitadas e aspecto macio.\n");
        }

        if ($('#exameFisicoGineco').is(':checked')) {
            textoGerado.push("Exame físico ginecológico:\nMamas simétricas, formato arredondado, volume grande/médio/pequeno, sem sinais flogísticos. Mamilos normoposicionados, protrusos, sem retrações, descamações ou lesões. Sem nódulos palpáveis, sem abaulamentos ou retrações à inspeção dinâmica. Expressão papilar sem saída de secreção. Linfonodos axilares, supraclaviculares e infraclaviculares não palpáveis.\nGenitália Externa com distribuição de pelos de padrão feminino, sem lesões, atrofia ou outras alterações morfológicas.\nColo uterino de aspecto habitual, sem lesões visíveis ou secreção anômala.\nToque vaginal com útero em posição antevertida, de volume e consistência normais, móvel e indolor. Anexos não palpáveis.\n");
        }

        if ($('#exameFisicoOsteoarticular').is(':checked')) {
            textoGerado.push("Exame físico osteoarticular:\nInspeção sem assimetrias ou atrofias musculares evidentes. Ausência de lesões cutâneas. Sem sinais flogísticos articulares. Sem deformidades articulares aparentes.\nPalpação sem dor ou edema nas interfaces articulares. Ausência de crepitação à mobilização. Sem hipertrofia sinovial ou edema sinovial palpável.\nAmplitude de movimento preservada, sem limitações ou hipermobilidade articular. Força muscular preservada.\nTeste de Neer e Hawkins negativos para impacto no ombro. Teste de Jobe sem evidências de lesão do supraespinhal. Teste de Phalen e Tinel negativos para síndrome do túnel do carpo. Testes de gaveta anterior e posterior negativos para instabilidade ligamentar do joelho. Sem sinais de derrame articular ao teste do choque da patela.\n");
        }        
    
        let textoFinal = textoGerado.length > 0 ? textoGerado.join("\n") : "Selecione os exames para gerar o texto...";
        $("#resultado").text(textoFinal);
    }
    
    $('.exame').change(atualizarTexto);

    
    
    $("#textoCopiavel").click(function() {
        let texto = $(this).text();
        navigator.clipboard.writeText(texto).then(() => {
            alert("Texto copiado com sucesso!");
        }).catch(err => {
            console.error("Erro ao copiar texto: ", err);
        });
    });
});