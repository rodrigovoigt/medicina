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

    // Mapeamento de accordion para o primeiro checkbox de cada seção
    const accordionCheckboxMap = {
        'collapseProntuarios': 'prontuarioPadrao',
        'collapse1': 'exameFisicoEstadoGeral',
        'collapse2': 'exameFisicoLabs', 
        'collapse3': 'exameFisicoTorax',
        'collapse4': 'exameFisicoCardio',
        'collapse5': 'exameFisicoPele',
        'collapseMamas': 'exameMamas',
        'collapse6': 'exameFisicoAbdomen',
        'collapse7': 'exameFisicoNeuro',
        'collapse8': 'exameFisicoGineco',
        'collapse9': 'exameFisicoOsteoarticular',
        'collapseEspecializados': 'otoscopia'
    };

    // Evento para quando accordion abrir
    $('.accordion-collapse').on('shown.bs.collapse', function () {
        const collapseId = $(this).attr('id');
        const checkboxId = accordionCheckboxMap[collapseId];
        
        if (checkboxId) {
            $('#' + checkboxId).prop('checked', true);
            atualizarTexto(); // Atualiza o texto quando marcar
        }
    });

    // Evento para quando accordion fechar
    $('.accordion-collapse').on('hidden.bs.collapse', function () {
        const collapseId = $(this).attr('id');
        const checkboxId = accordionCheckboxMap[collapseId];
        
        if (checkboxId) {
            $('#' + checkboxId).prop('checked', false);
            atualizarTexto(); // Atualiza o texto quando desmarcar
        }
    });

    // Evento para mudanças nos checkboxes individuais
    $('.exame').on('change', function() {
        atualizarTexto();
    });

    function atualizarTexto() {
        let textoGerado = [];

        // Modelos de Prontuário
        if ($('#prontuarioPadrao').is(':checked')) {
            textoGerado.push("Alergias: nega\nMUC:\nComorbidades:\nHábitos de vida: Nega tabagismo, nega etilismo\nCirurgias e internações:\nHistórico familiar:\n\nQueixa:\n- \n\nExame físico e complementar:\n\nAvaliação:\n- \n\nConduta:\n- \n- \n\n");
        }

        if ($('#prontuarioPreNatal').is(':checked')) {
            textoGerado.push("G XXX P XXX C XXX A XXX\nIG US:\nDescrição do USG1T:\nData provável do parto:\nDUM:\nTipo ABO/RH:\n\nAlergias: nega\nMUC:\nComorbidades:\nHábitos de vida: Nega tabagismo, nega etilismo\nCirurgias e internações:\nHistórico familiar:\n\nQueixa:\n- \n\nExame físico e complementar:\nBCF:\nAU:\nPA:\n\nAvaliação:\n- \n\nConduta:\n- \n- \n\nPaciente ciente e concordante, nega dúvidas.\n\nXXXXX, Acadêmico XXX ° fase\nPrecep. Dr\n\n");
        }

        if ($('#prontuarioFeminino').is(':checked')) {
            textoGerado.push("G XXX P XXX C XXX A XXX\nDUM:\n\nAlergias: nega\nMUC:\nComorbidades:\nHábitos de vida: Nega tabagismo, nega etilismo\nCirurgias e internações:\nHistórico familiar:\n\nQueixa:\n- \n\nExame físico e complementar:\n\nAvaliação:\n- \n\nConduta:\n- \n- \n\nPaciente ciente e concordante, nega dúvidas.\n\nXXXXX, Acadêmico XXX ° fase\nPrecep. Dr\n\n");
        }

        if ($('#prontuarioPuericultura').is(':checked')) {
            textoGerado.push("Alergias: nega\nMUC:\nComorbidades:\nHábitos de vida: Nega tabagismo, nega etilismo\nCirurgias e internações:\nHistórico familiar:\nVacinação: \nAlimentação: \nHábito intestinal: \nTempo de tela: \nSono: \nDNPM:\n\nQueixa:\n- \n\nExame físico e complementar:\n\nAvaliação:\n- \n\nConduta:\n- \n- \n\nPaciente ciente e concordante, nega dúvidas.\n\nXXXXX, Acadêmico XXX ° fase\nPrecep. Dr\n\n");
        }

        // Estado Geral
        if ($('#exameFisicoEstadoGeral').is(':checked')) {
            textoGerado.push("Bom estado geral, fácies atípica, boas condições de higiene, colaborativo, eutímico, normobúlico, memória e raciocínio preservados, lúcido, orientado autopsiquicamente e alopsiquicamente, normovigilante. Eutrófico (IMC calculadora), normotônico, normoativo, deambulando sem auxílio. Mucosas úmidas e normocoradas, anictérico, acianótico, afebril (não aferido). Normosfigmo, normotenso, eupneico, normoxia em ar ambiente.\n");
        }

        if ($('#estadoGeralSimples').is(':checked')) {
            textoGerado.push("Bom estado geral, lúcido e orientado em tempo e espaço. Mucosas úmidas e normocoradas, anictérico, acianótico, afebril (SIC), deambulando sem auxílio, fácies atípicas, boas condições de higiene.\n");
        }

        if ($('#condicaoMental').is(':checked')) {
            textoGerado.push("Colaborativo, memória e raciocínio preservados, normovigilante, humor eutímico e normobúlico com apetite e sono preservados.\n");
        }

        if ($('#capacidadeFisica').is(':checked')) {
            textoGerado.push("Eutrófico (IMC), com tônus e força preservados, normoativo. Normosfigmo, normotenso, eupneico, normoxemia em ar ambiente.\n");
        }

        // Exames Laboratoriais
        if ($('#exameFisicoLabs').is(':checked')) {
            textoGerado.push("Exame laboratorial (XXX/XXX/2025):\nHb XXX / Ht XXX / Leuco. XXX / Plaq. XXX\nGlicose XXX / HbA1c XXX\nCT XXX / HDL-C XXX / LDL-C XXX / Trig. XXX\n");
        }

        if ($('#labTireoide').is(':checked')) {
            textoGerado.push("Tireóide:\nTSH XXX / T4L XXX\n");
        }

        if ($('#labVitaminas').is(':checked')) {
            textoGerado.push("Vitaminas e nutrientes:\nVit D XXX / Vit B12 XXX / Ferritina XXX / Vit C XXX\n");
        }

        if ($('#labHepatico').is(':checked')) {
            textoGerado.push("Hepático:\nTGO XXX / TGP XXX / Alb. XXX\n");
        }

        if ($('#labHormoniosFem').is(':checked')) {
            textoGerado.push("Hormônios femininos:\nFSH XXX / LH XXX / Estrad. XXX / Proges. XXX / BHCG XXX\n");
        }

        if ($('#labPreNatal').is(':checked')) {
            textoGerado.push("Pré-natal:\nTipagem ABO/Rh / Coombs Ind. XXX / HBsAg XXX / Anti-HIV XXX / VDRL XXX / Toxoplasmose IgG XXX / IgM XXX / Glic XXX / EAS XXX / Urina cultura XXX\n");
        }

        if ($('#labVesicula').is(':checked')) {
            textoGerado.push("Vesícula Biliar:\nGamaGT XXX / FA XXX / BilT XXX\n");
        }

        if ($('#labRenal').is(':checked')) {
            textoGerado.push("Renal:\nCr XXX / Ur XXX / TFG XXX\n");
        }

        if ($('#labEletrolitos').is(':checked')) {
            textoGerado.push("Eletrólitos:\nNa⁺ XXX / K⁺ XXX / Ca²⁺ XXX / Mg²⁺ XXX / P³⁻ XXX\n");
        }
    
        if ($('#exameFisicoPele').is(':checked')) {
            textoGerado.push("Exame físico de pele:\nLesão do tipo mácula / pápula / placa / vesícula / liquenificação / descamação / erosão / ulceração. Localizada em XXXXX. Simétrica / Assimétrica / Difusa / Localizada / Em áreas de pressão. Bordas nítidas / indefinidas / regulares / irregulares. Hipocrômica / Normocrômica / Hiperpigmentada / Eritematosa / Violácea. Superfície lisa / áspera / com descamação / com crostas / com escamas / com liquenificação. Diâmetro de XXXX cm. Surgimento há XXX, com / sem alterações significativas recentemente.\n");
        }
    
        if ($('#exameFisicoTorax').is(':checked')) {
            textoGerado.push("Exame físico de tórax e pulmonar:\nTórax íntegro, sem massas, crostas ou descamação, simétrico, sem abaulamento, sem retração, formato elíptico, normolíneo (ângulo de charpy =90°)/longilíneo (ângulo de charpy <90°)/brevilíneo (ângulo de charpy >90°).\nSom claro pulmonar à percussão.\nExpansão simétrica bilateralmente.\nFrêmito toracovocal presente sem alterações.\nMurmúrios vesiculares presentes bilateralmente, simétricos, sem ruídos adventícios.\n");
        }

        if ($('#ausculta').is(':checked')) {
            textoGerado.push("Ausculta pulmonar:\nMurmúrios vesiculares presentes, simétricos, sem ruídos adventícios / com roncos / sibilos / estertores localizados em XXX.\nSem broncofonia, pectorilóquia ou egofonia.\n");
        }

        if ($('#ectoscopiaTorax').is(':checked')) {
            textoGerado.push("Ectoscopia:\nTórax íntegro, simétrico, sem abaulamentos ou retrações, sem alterações cutâneas visíveis. Tórax de formato elíptico / pectus excavatum / pectus carinatum / em tonel / piriforme, com biotipo normolíneo (ângulo de Charpy ≈ 90°) / longilíneo (< 90°) / brevilíneo (> 90°).\n");
        }

        if ($('#palpacaoPercussao').is(':checked')) {
            textoGerado.push("Palpação e percussão:\nExpansibilidade torácica preservada e simétrica bilateralmente.\nFrêmito toracovocal presente, simétrico, sem alterações.\nPercussão com som predominantemente claro pulmonar bilateralmente.\n");
        }
    
        if ($('#exameFisicoCardio').is(':checked')) {
            textoGerado.push("Exame físico cardiovascular:\nPalpação do pulso de frequência normal, amplitude mediana ++/3, ritmo regular, simétrico com lado contralateral.\nAusência de turgência jugular.\nIctus cordis palpável na linha hemoclavicular esquerda no ()° espaço intercostal.\nAusência de impulsão paraesternal esquerda.\nAusência de frêmito cardiovascular.\nBulhas rítmicas regulares normofonéticas em dois tempos.\n");
        }
        
        if ($('#exameFisicoAbdomen').is(':checked')) {
            textoGerado.push("Exame físico de abdômen:\nAbdômen plano, depressível, com ruídos hidroaéreos presentes normoativos.\nSem alterações de sensibilidade, sem alterações de continuidade ou distensão após manobra de valsalva, normotenso bilateralmente.\nSom predominantemente claro e timpânico. Sem dor à palpação profunda ou superficial. Sem visceromegalias.\nSinal de piparote negativo.\nMacicez móvel normal.\nFígado palpável ao método de Lemos-Torres com bordas lisas, regulares, delimitadas e aspecto macio.\n");
        }

        if ($('#exameFisicoNeuro').is(':checked')) {
            textoGerado.push("Exame físico neurológico:\nPupilas isocóricas e isofotorreagentes. Pares cranianos sem alterações.\nForça muscular +++++/5 nos quatro membros. Reflexos osteotendíneos normais ++/4. Sensibilidade superficial e profunda preservadas. Marcha sem alterações. Sem sinais meníngeos.\n");
        }

        // Exames de Mamas
        if ($('#exameMamas').is(':checked')) {
            textoGerado.push("Exame físico de mamas:\nMamas simétricas, formato arredondado / piriforme / pendular, volume grande/médio/pequeno, sem alterações cutâneas visíveis. Mamilos normoposicionados / protrusos / invertido, sem retrações, descamações ou lesões. Sem nódulos palpáveis, sem abaulamentos ou retrações à inspeção dinâmica e estática.\nExpressão papilar sem saída de secreção.\n");
        }

        if ($('#amastasia').is(':checked')) {
            textoGerado.push("Amastasia:\nPaciente com amastasia direita / esquerda / bilateral. Sem alterações cutâneas visíveis. Sem nódulos palpáveis na região, sem abaulamentos ou retrações à inspeção dinâmica e estática.\n");
        }

        if ($('#politeliaPolimastia').is(':checked')) {
            textoGerado.push("Politelia/polimastia:\nPaciente com politelia / polimastia em região XXX. Estrutura com características de tecido mamário e/ou papilar / Estrutura semelhante a mamilo, sem tecido glandular subjacente palpável / , sem nódulos palpáveis e sem alterações cutâneas associadas.\nÀ inspeção dinâmica e estática, sem abaulamentos ou retrações significativas.\n");
        }

        if ($('#linfonodos').is(':checked')) {
            textoGerado.push("Linfonodos:\nLinfonodos axilares, supraclaviculares e infraclaviculares não palpáveis / palpáveis, de aproximadamente XXX cm, móveis / aderidos, indolores / dolorosos, de consistência fibroelástica / endurecida / amolecida, sem sinais flogísticos locais.\n");
        }

        if ($('#exameFisicoGineco').is(':checked')) {
            textoGerado.push("Exame físico ginecológico:\nMamas simétricas, formato arredondado, volume grande/médio/pequeno, sem sinais flogísticos. Mamilos normoposicionados, protrusos, sem retrações, descamações ou lesões. Sem nódulos palpáveis, sem abaulamentos ou retrações à inspeção dinâmica. Expressão papilar sem saída de secreção. Linfonodos axilares, supraclaviculares e infraclaviculares não palpáveis.\nGenitália Externa com distribuição de pelos de padrão feminino, sem lesões, atrofia ou outras alterações morfológicas.\nColo uterino de aspecto habitual, sem lesões visíveis ou secreção anômala.\nToque vaginal com útero em posição antevertida, de volume e consistência normais, móvel e indolor. Anexos não palpáveis.\n");
        }

        if ($('#ectoscopiaGineco').is(':checked')) {
            textoGerado.push("Ectoscopia:\nGenitália Externa com distribuição de pelos de padrão feminino, sem lesões, atrofias, verrugas ou outras alterações morfológicas. Períneo íntegro.\n");
        }

        if ($('#especular').is(':checked')) {
            textoGerado.push("Especular:\nColo uterino de aspecto habitual / hiperemiado / friável / com ectopia / com pólipos, sem lesões visíveis / com lesão exofítica / com secreção anômala (mucoide / purulenta / sanguinolenta / fétida).\nSecreção vaginal ausente / escassa / abundante, de coloração transparente / esbranquiçada / amarelada / esverdeada, sem odor / com odor fétido.\nParedes vaginais íntegras / hiperemiadas / atróficas / com descamação / com lesões.\n");
        }

        if ($('#toqueVaginal').is(':checked')) {
            textoGerado.push("Toque vaginal bimanual:\nÚtero em posição antevertida / retrovertida / médiovertida, de volume e consistência normais / aumentado / rebaixado / amolecido, móvel / fixo, indolor / doloroso à mobilização.\nAnexos não palpáveis / palpáveis à direita / à esquerda, com massa de aproximadamente X cm, consistência cística / sólida, indolor / dolorosa.\nFundo de saco de Douglas livre / doloroso / com massa / abaulado.\n");
        }

        if ($('#exameFisicoOsteoarticular').is(':checked')) {
            textoGerado.push("Exame físico osteoarticular:\nInspeção sem assimetrias ou atrofias musculares evidentes. Ausência de lesões cutâneas. Sem sinais flogísticos articulares. Sem deformidades articulares aparentes.\nPalpação sem dor ou edema nas interfaces articulares. Ausência de crepitação à mobilização. Sem hipertrofia sinovial ou edema sinovial palpável.\nAmplitude de movimento preservada, sem limitações ou hipermobilidade articular. Força muscular preservada.\nTeste de Neer e Hawkins negativos para impacto no ombro. Teste de Jobe sem evidências de lesão do supraespinhal. Teste de Phalen e Tinel negativos para síndrome do túnel do carpo. Testes de gaveta anterior e posterior negativos para instabilidade ligamentar do joelho. Sem sinais de derrame articular ao teste do choque da patela.\n");
        }

        // Exames Especializados
        if ($('#otoscopia').is(':checked')) {
            textoGerado.push("Otoscopia:\nPavilhão auricular sem hiperemia.\nMeato acústico externo com cerúmen em quantidade adequada, sem secreção, sem estreitamento, sem hiperemia e sem obstrução.\nMembrana timpânica íntegra, translúcida, normotensa e peroladas/hiperemia.\n");
        }

        if ($('#oroscopia').is(':checked')) {
            textoGerado.push("Oroscopia:\nDentes em bom estado de conservação.\nMucosa jugal brilhante úmida, normocorada e sem lesões visíveis.\nTonsilas e língua normotróficas e normocoradas, sem placas.\nDucto parotídeo e submandibular sem obstrução.\n");
        }

        if ($('#exameCabeca').is(':checked')) {
            textoGerado.push("Exame físico cabeça:\nCrânio normocefálico, fontanelas normotensas, sendo a anterior 2-3 polpas (18-24m) e posterior (2m) 1-2 polpas. Suturas não abauladas, sem sinais de acalvagamento, diástase ou craniossinostose.\n");
        }
        
        let textoFinal = textoGerado.length > 0 ? textoGerado.join("\n") : "Selecione os exames para gerar o texto...";
        $("#resultado").text(textoFinal);
    }

    // Inicializar o texto
    atualizarTexto();
    
    $("#textoCopiavel").click(function() {
        let texto = $(this).text();
        navigator.clipboard.writeText(texto).then(() => {
            alert("Texto copiado com sucesso!");
        }).catch(err => {
            console.error("Erro ao copiar texto: ", err);
        });
    });
});