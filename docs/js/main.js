document.addEventListener('DOMContentLoaded', function() {
    // Função para exibir a seção desejada
    function showSection(sectionId) {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.toggle('active', section.id === sectionId);
            section.classList.toggle('hidden', section.id !== sectionId);
        });
    }

    // Adiciona event listeners para os links da navbar
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Adiciona event listeners para os botões de cálculo
    const calcButtons = {
        calcularRiscoBtn: calcularRisco,
        calcularLDLBtn: calcularLDL,
        calcularGFRBtn: calcularGFR,
        calcularIMCBtn: calcularIMC
    };

    Object.keys(calcButtons).forEach(id => {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', calcButtons[id]);
        }
    });
});

// Funções de cálculo (mantidas conforme o código original)
function calcularRisco() {
    // Implementação da função de cálculo de risco
}

function calcularLDL() {
    // Implementação da função de cálculo de LDL
}

function calcularGFR() {
    // Implementação da função de cálculo de GFR
}

function calcularIMC() {
    // Implementação da função de cálculo de IMC
}
