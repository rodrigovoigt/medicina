(() => {
    const form = document.getElementById('adrogue-form');
    const solutionType = document.getElementById('solutionType');
    const mixtureFields = document.getElementById('mixtureFields');
    const readySolutionFields = document.getElementById('readySolutionFields');
    const result = document.getElementById('resultado');
    const resultText = document.getElementById('resultadoTexto');
    const copyButton = document.getElementById('copiarResultado');

    const solutions = {
        sg5: { label: 'SG 5% / agua destilada', sodium: 0 },
        sf09: { label: 'SF 0,9%', sodium: 154 },
        nacl3: { label: 'NaCl 3%', sodium: 513 }
    };

    function numberValue(id) {
        return Number.parseFloat(document.getElementById(id).value);
    }

    function formatNumber(value, decimals = 1) {
        return value.toLocaleString('pt-BR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-custom';
        toast.textContent = message;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        window.setTimeout(() => {
            toast.classList.remove('show');
            window.setTimeout(() => toast.remove(), 250);
        }, 3200);
    }

    function updateMode() {
        const isMixture = solutionType.value === 'mixture';
        mixtureFields.hidden = !isMixture;
        readySolutionFields.hidden = isMixture;
        document.getElementById('mixtureNotice').hidden = !isMixture;
    }

    function calculateMixture() {
        const totalVolume = numberValue('mixtureTotalVolume');
        const concentratedSodium = numberValue('concentratedSodium');
        const diluentSodium = numberValue('diluentSodium');
        const targetSolutionSodium = numberValue('targetSolutionSodium');

        if ([totalVolume, concentratedSodium, diluentSodium, targetSolutionSodium].some((value) => !Number.isFinite(value)) || totalVolume <= 0) {
            throw new Error('Preencha todos os campos da mistura com valores validos.');
        }

        if (concentratedSodium === diluentSodium || targetSolutionSodium < Math.min(concentratedSodium, diluentSodium) || targetSolutionSodium > Math.max(concentratedSodium, diluentSodium)) {
            throw new Error('A concentracao alvo da mistura precisa ficar entre as concentracoes escolhidas.');
        }

        const concentratedVolume = totalVolume * (targetSolutionSodium - diluentSodium) / (concentratedSodium - diluentSodium);
        const diluentVolume = totalVolume - concentratedVolume;

        return {
            label: 'Mistura preparada',
            sodium: targetSolutionSodium,
            details: `Mistura para ${formatNumber(totalVolume, 0)} mL: ${formatNumber(concentratedVolume, 1)} mL da solucao concentrada + ${formatNumber(diluentVolume, 1)} mL do diluente.`
        };
    }

    function calculate(event) {
        event.preventDefault();

        try {
            const currentSodium = numberValue('currentSodium');
            const targetSodium = numberValue('targetSodium');
            const weight = numberValue('weight');
            const coefficient = numberValue('waterCoefficient');

            if ([currentSodium, targetSodium, weight, coefficient].some((value) => !Number.isFinite(value)) || weight <= 0 || currentSodium <= 0 || targetSodium <= 0) {
                throw new Error('Preencha os dados do paciente com valores validos.');
            }

            const solution = solutionType.value === 'mixture'
                ? calculateMixture()
                : { ...solutions[solutionType.value], details: `Solucao selecionada: ${solutions[solutionType.value].label}.` };
            const totalBodyWater = weight * coefficient;
            const changePerLiter = (solution.sodium - currentSodium) / (totalBodyWater + 1);
            const desiredChange = targetSodium - currentSodium;

            if (changePerLiter === 0 || desiredChange === 0 || changePerLiter * desiredChange <= 0) {
                throw new Error('A solucao escolhida nao corrige o sodio na direcao do alvo informado.');
            }

            const volumeLiters = desiredChange / changePerLiter;
            const volumeMl = volumeLiters * 1000;
            const correctionWarning = Math.abs(desiredChange) > 8
                ? '<div class="result-warning">O alvo informado altera o sodio em mais de 8 mEq/L. Confirme o limite de correcao, o tempo de infusao e a monitorizacao conforme o protocolo clinico.</div>'
                : '';
            const sterileWaterWarning = solutionType.value === 'sg5'
                ? '<div class="result-warning">Agua destilada esteril nao deve ser infundida isoladamente por via intravenosa. Use somente conforme a preparacao e o protocolo do servico.</div>'
                : '';

            resultText.textContent = [
                `Sodio atual: ${formatNumber(currentSodium)} mEq/L`,
                `Sodio alvo: ${formatNumber(targetSodium)} mEq/L`,
                `Agua corporal total estimada: ${formatNumber(totalBodyWater)} L`,
                `Sodio da solucao: ${formatNumber(solution.sodium)} mEq/L`,
                `Variacao estimada por 1 L: ${changePerLiter >= 0 ? '+' : ''}${formatNumber(changePerLiter)} mEq/L`,
                `Volume estimado: ${formatNumber(volumeLiters)} L (${formatNumber(volumeMl, 0)} mL)`,
                solution.details
            ].join('\n');
            document.getElementById('resultWarnings').innerHTML = correctionWarning + sterileWaterWarning;
            result.hidden = false;
        } catch (error) {
            showToast(`⚠️ ${error.message}`);
        }
    }

    solutionType.addEventListener('change', updateMode);
    form.addEventListener('submit', calculate);
    copyButton.addEventListener('click', async () => {
        if (!resultText.textContent.trim()) {
            showToast('⚠️ Calcule um resultado antes de copiar.');
            return;
        }

        try {
            await navigator.clipboard.writeText(resultText.textContent);
            showToast('✅ Resultado copiado.');
        } catch (error) {
            showToast('❌ Nao foi possivel copiar o resultado.');
        }
    });

    updateMode();
})();
