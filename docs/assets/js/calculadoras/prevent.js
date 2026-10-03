(() => {
    const form = document.getElementById('prevent-form');
    const result = document.getElementById('prevent-result');
    const resultGrid = document.getElementById('prevent-result-grid');
    const copyButton = document.getElementById('copy-prevent');

    function numberValue(id) {
        const value = document.getElementById(id).value.trim().replace(',', '.');
        return value === '' ? null : Number.parseFloat(value);
    }

    function riskPercent(logOdds) {
        return 100 * Math.exp(logOdds) / (1 + Math.exp(logOdds));
    }

    function mmol(value) {
        return 0.02586 * value;
    }

    function format(value) {
        return value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    }

    function ldlTarget(risk, veryHighRisk, extremeRisk) {
        if (extremeRisk) return '< 40 mg/dL';
        if (veryHighRisk) return '< 50 mg/dL';
        if (risk < 5) return '< 115 mg/dL';
        if (risk < 7.5) return '< 100 mg/dL';
        if (risk < 20) return '< 70 mg/dL';
        return '< 50 mg/dL';
    }

    function calculateCkdEpi2021(creatinine, age, sex) {
        const kappa = sex === 'female' ? 0.7 : 0.9;
        const alpha = sex === 'female' ? -0.241 : -0.302;
        const sexFactor = sex === 'female' ? 1.012 : 1;
        const creatinineRatio = creatinine / kappa;
        const minTerm = Math.pow(Math.min(creatinineRatio, 1), alpha);
        const maxTerm = Math.pow(Math.max(creatinineRatio, 1), -1.2);
        return 142 * minTerm * maxTerm * Math.pow(0.9938, age) * sexFactor;
    }

    function calculateMale(v) {
        const age = (v.age - 55) / 10;
        const nonHdl = mmol(v.totalCholesterol - v.hdl) - 3.5;
        const hdl = (mmol(v.hdl) - 1.3) / .3;
        const sbpLow = (Math.min(v.sbp, 110) - 110) / 20;
        const sbpHigh = (Math.max(v.sbp, 110) - 130) / 20;
        const egfrLow = (Math.min(v.egfr, 60) - 60) / -15;
        const egfrHigh = (Math.max(v.egfr, 60) - 90) / -15;
        const bmiLow = (Math.min(v.bmi, 30) - 25) / 5;
        const bmiHigh = (Math.max(v.bmi, 30) - 30) / 5;

        return {
            cvd10: riskPercent(-3.307728 + .7939329 * age + .0305239 * nonHdl - .1606857 * hdl - .2394003 * sbpLow + .360078 * sbpHigh + .8667604 * v.diabetes + .5360739 * v.smoking + .6045917 * egfrLow + .0433769 * egfrHigh + .3151672 * v.bpTreatment - .1477655 * v.statin - .0663612 * v.bpTreatment * sbpHigh + .1197879 * v.statin * nonHdl - .0819715 * age * nonHdl + .0306769 * age * hdl - .0946348 * age * sbpHigh - .27057 * age * v.diabetes - .078715 * age * v.smoking - .1637806 * age * egfrLow),
            cvd30: riskPercent(-1.318827 + .5503079 * age - .0928369 * age ** 2 + .0409794 * nonHdl - .1663306 * hdl - .1628654 * sbpLow + .3299505 * sbpHigh + .6793894 * v.diabetes + .3196112 * v.smoking + .1857101 * egfrLow + .0553528 * egfrHigh + .2894 * v.bpTreatment - .075688 * v.statin - .056367 * v.bpTreatment * sbpHigh + .1071019 * v.statin * nonHdl - .0751438 * age * nonHdl + .0301786 * age * hdl - .0998776 * age * sbpHigh - .3206166 * age * v.diabetes - .1607862 * age * v.smoking - .1450788 * age * egfrLow),
            ascvd10: riskPercent(-3.819975 + .719883 * age + .1176967 * nonHdl - .151185 * hdl - .0835358 * sbpLow + .3592852 * sbpHigh + .8348585 * v.diabetes + .4831078 * v.smoking + .4864619 * egfrLow + .0397779 * egfrHigh + .2265309 * v.bpTreatment - .0592374 * v.statin - .0395762 * v.bpTreatment * sbpHigh + .0844423 * v.statin * nonHdl - .0567839 * age * nonHdl + .0325692 * age * hdl - .1035985 * age * sbpHigh - .2417542 * age * v.diabetes - .0791142 * age * v.smoking - .1671492 * age * egfrLow),
            ascvd30: riskPercent(-1.974074 + .4669202 * age - .0893118 * age ** 2 + .1256901 * nonHdl - .1542255 * hdl - .0018093 * sbpLow + .322949 * sbpHigh + .6296707 * v.diabetes + .268292 * v.smoking + .100106 * egfrLow + .0499663 * egfrHigh + .1875292 * v.bpTreatment + .0152476 * v.statin - .0276123 * v.bpTreatment * sbpHigh + .0736147 * v.statin * nonHdl - .0521962 * age * nonHdl + .0316918 * age * hdl - .1046101 * age * sbpHigh - .2727793 * age * v.diabetes - .1530907 * age * v.smoking - .1299149 * age * egfrLow),
            hf10: riskPercent(-4.310409 + .8998235 * age - .4559771 * sbpLow + .3576505 * sbpHigh + 1.038346 * v.diabetes + .583916 * v.smoking - .0072294 * bmiLow + .2997706 * bmiHigh + .7451638 * egfrLow + .0557087 * egfrHigh + .3534442 * v.bpTreatment - .0981511 * v.bpTreatment * sbpHigh - .0946663 * age * sbpHigh - .3581041 * age * v.diabetes - .1159453 * age * v.smoking - .003878 * age * bmiHigh - .1884289 * age * egfrLow),
            hf30: riskPercent(-2.205379 + .6254374 * age - .0983038 * age ** 2 - .3919241 * sbpLow + .3142295 * sbpHigh + .8330787 * v.diabetes + .3438651 * v.smoking + .0594874 * bmiLow + .2525536 * bmiHigh + .2981642 * egfrLow + .0667159 * egfrHigh + .333921 * v.bpTreatment - .0893177 * v.bpTreatment * sbpHigh - .0974299 * age * sbpHigh - .404855 * age * v.diabetes - .1982991 * age * v.smoking - .0035619 * age * bmiHigh - .1564215 * age * egfrLow)
        };
    }

    function calculateFemale(v) {
        const age = (v.age - 55) / 10;
        const nonHdl = mmol(v.totalCholesterol - v.hdl) - 3.5;
        const hdl = (mmol(v.hdl) - 1.3) / .3;
        const sbpLow = (Math.min(v.sbp, 110) - 110) / 20;
        const sbpHigh = (Math.max(v.sbp, 110) - 130) / 20;
        const egfrLow = (Math.min(v.egfr, 60) - 60) / -15;
        const egfrHigh = (Math.max(v.egfr, 60) - 90) / -15;
        const bmiLow = (Math.min(v.bmi, 30) - 25) / 5;
        const bmiHigh = (Math.max(v.bmi, 30) - 30) / 5;

        return {
            cvd10: riskPercent(-3.031168 + .7688528 * age + .0736174 * nonHdl - .0954431 * hdl - .4347345 * sbpLow + .3362658 * sbpHigh + .7692857 * v.diabetes + .4386871 * v.smoking + .5378979 * egfrLow + .0164827 * egfrHigh + .288879 * v.bpTreatment - .1337349 * v.statin - .0475924 * v.bpTreatment * sbpHigh + .150273 * v.statin * nonHdl - .0517874 * age * nonHdl + .0191169 * age * hdl - .1049477 * age * sbpHigh - .2251948 * age * v.diabetes - .0895067 * age * v.smoking - .1543702 * age * egfrLow),
            cvd30: riskPercent(-1.148204 + .4627309 * age - .0984281 * age ** 2 + .0836088 * nonHdl - .1029824 * hdl - .2140352 * sbpLow + .2904325 * sbpHigh + .5331276 * v.diabetes + .2141914 * v.smoking + .1155556 * egfrLow + .0603775 * egfrHigh + .232714 * v.bpTreatment - .0272112 * v.statin - .0384488 * v.bpTreatment * sbpHigh + .134192 * v.statin * nonHdl - .0511759 * age * nonHdl + .0165865 * age * hdl - .1101437 * age * sbpHigh - .2585943 * age * v.diabetes - .1566406 * age * v.smoking - .1166776 * age * egfrLow),
            ascvd10: riskPercent(-3.500655 + .7099847 * age + .1658663 * nonHdl - .1144285 * hdl - .2837212 * sbpLow + .3239977 * sbpHigh + .7189597 * v.diabetes + .3956973 * v.smoking + .3690075 * egfrLow + .0203619 * egfrHigh + .2036522 * v.bpTreatment - .0865581 * v.statin - .0322916 * v.bpTreatment * sbpHigh + .114563 * v.statin * nonHdl - .0300005 * age * nonHdl + .0232747 * age * hdl - .0927024 * age * sbpHigh - .2018525 * age * v.diabetes - .0970527 * age * v.smoking - .1217081 * age * egfrLow),
            ascvd30: riskPercent(-1.736444 + .3994099 * age - .0937484 * age ** 2 + .1744643 * nonHdl - .120203 * hdl - .0665117 * sbpLow + .2753037 * sbpHigh + .4790257 * v.diabetes + .1782635 * v.smoking - .0218789 * egfrLow + .0602553 * egfrHigh + .1421182 * v.bpTreatment + .0135996 * v.statin - .0218265 * v.bpTreatment * sbpHigh + .1013148 * v.statin * nonHdl - .0312619 * age * nonHdl + .020673 * age * hdl - .0920935 * age * sbpHigh - .2159947 * age * v.diabetes - .1548811 * age * v.smoking - .0712547 * age * egfrLow),
            hf10: riskPercent(-3.946391 + .8972642 * age - .6811466 * sbpLow + .3634461 * sbpHigh + .923776 * v.diabetes + .5023736 * v.smoking - .0485841 * bmiLow + .3726929 * bmiHigh + .6926917 * egfrLow + .0251827 * egfrHigh + .2980922 * v.bpTreatment - .0497731 * v.bpTreatment * sbpHigh - .1289201 * age * sbpHigh - .3040924 * age * v.diabetes - .1401688 * age * v.smoking + .0068126 * age * bmiHigh - .1797778 * age * egfrLow),
            hf30: riskPercent(-1.95751 + .5681541 * age - .1048388 * age ** 2 - .4761564 * sbpLow + .30324 * sbpHigh + .6840338 * v.diabetes + .2656273 * v.smoking + .0833107 * bmiLow + .26999 * bmiHigh + .2541805 * egfrLow + .0638923 * egfrHigh + .2583631 * v.bpTreatment - .0391938 * v.bpTreatment * sbpHigh - .1269124 * age * sbpHigh - .3273572 * age * v.diabetes - .2043019 * age * v.smoking - .0182831 * age * bmiHigh - .1342618 * age * egfrLow)
        };
    }

    function calculate(event) {
        event.preventDefault();
        const values = {
            sex: document.getElementById('sex').value,
            age: numberValue('age'),
            weight: numberValue('weight'),
            height: numberValue('height'),
            totalCholesterol: numberValue('totalCholesterol'),
            hdl: numberValue('hdl'),
            sbp: numberValue('sbp'),
            bmi: numberValue('bmi'),
            creatinine: numberValue('creatinine'),
            egfr: numberValue('egfr'),
            diabetes: Number(document.getElementById('diabetes').value),
            smoking: Number(document.getElementById('smoking').value),
            bpTreatment: Number(document.getElementById('bpTreatment').value),
            statin: Number(document.getElementById('statin').value),
            veryHighRisk: Number(document.getElementById('veryHighRisk').value),
            extremeRisk: Number(document.getElementById('extremeRisk').value)
        };

        if ([values.age, values.totalCholesterol, values.hdl, values.sbp].some((value) => value === null || Number.isNaN(value)) || values.age < 30 || values.age > 79) {
            alert('Preencha os campos clínicos obrigatórios com valores válidos. A faixa de idade é de 30 a 79 anos.');
            return;
        }

        if (values.weight !== null && values.height !== null && values.weight > 0 && values.height > 0) {
            const heightInMeters = values.height / 100;
            values.bmi = values.weight / (heightInMeters * heightInMeters);
        }

        if (values.creatinine !== null && values.creatinine > 0) {
            values.egfr = calculateCkdEpi2021(values.creatinine, values.age, values.sex);
        }

        if (values.bmi === null || Number.isNaN(values.bmi) || values.egfr === null || Number.isNaN(values.egfr)) {
            alert('Informe o IMC e a TFG, ou preencha peso/altura e creatinina para calculá-los automaticamente.');
            return;
        }

        const risks = values.sex === 'male' ? calculateMale(values) : calculateFemale(values);
        const labels = [
            ['DCV em 10 anos', risks.cvd10], ['DCV em 30 anos', risks.cvd30],
            ['ASCVD em 10 anos', risks.ascvd10], ['ASCVD em 30 anos', risks.ascvd30],
            ['Insuficiência cardíaca em 10 anos', risks.hf10], ['Insuficiência cardíaca em 30 anos', risks.hf30]
        ];
        const riskSummary = `Risco PREVENT calculado em 10 anos: ${format(risks.cvd10)}%`;
        const ldlSummary = `Meta LDL: ${ldlTarget(risks.cvd10, values.veryHighRisk, values.extremeRisk)}`;
        document.getElementById('prevent-summary').innerHTML = `<strong>${riskSummary}</strong><strong>${ldlSummary}</strong>`;
        resultGrid.innerHTML = labels.map(([label, value]) => `<div class="prevent-result"><span>${label}</span><strong>${format(value)}%</strong></div>`).join('');
        result.hidden = false;
        copyButton.disabled = false;
        copyButton.dataset.copyText = `${riskSummary}\n${ldlSummary}\n\n${labels.map(([label, value]) => `${label}: ${format(value)}%`).join('\n')}`;
    }

    form.addEventListener('submit', calculate);
    copyButton.addEventListener('click', async () => {
        const text = copyButton.dataset.copyText;
        try {
            await navigator.clipboard.writeText(text);
            copyButton.textContent = 'Copiado';
            window.setTimeout(() => { copyButton.textContent = 'Copiar'; }, 1800);
        } catch (error) {
            window.alert('Não foi possível copiar o resultado.');
        }
    });
})();
