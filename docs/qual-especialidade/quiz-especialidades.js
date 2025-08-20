// Sistema de Quiz Gamificado de Especialidades Médicas
class MedicalSpecialtyQuiz {
    constructor() {
        this.especialidades = [];
        this.currentRound = [];
        this.winners = [];
        this.currentMatch = 0;
        this.totalMatches = 0;
        this.selectedOption = null;
        this.roundNames = ['Oitavas de Final', 'Quartas de Final', 'Semifinal', 'Final'];
        this.currentRoundIndex = 0;
        this.podium = [];
        
        // Sistema de análise de preferências
        this.choiceTimings = [];
        this.quickChoices = [];
        this.slowChoices = [];
        this.rejectedSpecialties = [];
        this.currentChoiceStartTime = null;
    }

    async init() {
        try {
            await this.loadEspecialidades();
            this.showStartScreen();
        } catch (error) {
            console.error('Erro ao carregar especialidades:', error);
            document.getElementById('loading-screen').innerHTML = `
                <div class="text-center">
                    <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                    <h3>Erro ao carregar especialidades</h3>
                    <p>Tente recarregar a página</p>
                    <button class="btn btn-custom" onclick="location.reload()">
                        <i class="fas fa-redo"></i> Recarregar
                    </button>
                </div>
            `;
        }
    }

    async loadEspecialidades() {
        const response = await fetch('dados-especialidades.json');
        const data = await response.json();
        this.especialidades = data.especialidades;
    }

    showStartScreen() {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('start-screen').style.display = 'block';
    }

    startQuiz() {
        // Embaralhar especialidades
        this.currentRound = this.shuffleArray([...this.especialidades]);
        
        // Se não for múltiplo de 2, remover uma especialidade aleatória
        if (this.currentRound.length % 2 !== 0) {
            this.currentRound.pop();
        }

        this.currentMatch = 0;
        this.currentRoundIndex = 0;
        this.totalMatches = this.currentRound.length / 2;
        this.winners = [];
        this.selectedOption = null;

        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('quiz-screen').style.display = 'block';
        
        this.updateRoundInfo();
        this.showCurrentMatch();
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    updateRoundInfo() {
        const roundName = this.roundNames[this.currentRoundIndex] || 'Rodada Especial';
        const matchInfo = `${this.currentMatch + 1}/${this.totalMatches}`;
        document.getElementById('round-info').textContent = `${roundName} - ${matchInfo}`;
        
        // Atualizar barra de progresso
        const progress = ((this.currentMatch) / this.totalMatches) * 100;
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${Math.round(progress)}%`;
    }

    showCurrentMatch() {
        if (this.currentMatch * 2 >= this.currentRound.length) {
            this.nextRound();
            return;
        }

        const option1 = this.currentRound[this.currentMatch * 2];
        const option2 = this.currentRound[this.currentMatch * 2 + 1];

        this.displaySpecialty(option1, 1);
        this.displaySpecialty(option2, 2);

        // Reset selection
        document.getElementById('option1').classList.remove('selected');
        document.getElementById('option2').classList.remove('selected');
        document.getElementById('next-btn').style.display = 'none';
        this.selectedOption = null;

        // Iniciar tracking de tempo para a escolha
        this.currentChoiceStartTime = Date.now();

        // Adicionar eventos touch para mobile
        this.addTouchEvents();

        // Adicionar animação
        document.getElementById('quiz-screen').classList.add('fade-in');
        setTimeout(() => {
            document.getElementById('quiz-screen').classList.remove('fade-in');
        }, 500);
    }

    addTouchEvents() {
        const option1 = document.getElementById('option1');
        const option2 = document.getElementById('option2');

        // Remover eventos anteriores
        option1.replaceWith(option1.cloneNode(true));
        option2.replaceWith(option2.cloneNode(true));

        // Reobter referências após clonagem
        const newOption1 = document.getElementById('option1');
        const newOption2 = document.getElementById('option2');

        // Adicionar eventos para ambos mouse e touch
        ['click', 'touchend'].forEach(eventType => {
            newOption1.addEventListener(eventType, (e) => {
                e.preventDefault();
                this.selectOption(1);
            });

            newOption2.addEventListener(eventType, (e) => {
                e.preventDefault();
                this.selectOption(2);
            });
        });

        // Feedback visual para touch
        ['touchstart'].forEach(eventType => {
            newOption1.addEventListener(eventType, (e) => {
                e.preventDefault();
                newOption1.style.transform = 'scale(0.98)';
            });

            newOption2.addEventListener(eventType, (e) => {
                e.preventDefault();
                newOption2.style.transform = 'scale(0.98)';
            });
        });

        ['touchend', 'touchcancel'].forEach(eventType => {
            newOption1.addEventListener(eventType, (e) => {
                setTimeout(() => {
                    newOption1.style.transform = 'scale(1)';
                }, 100);
            });

            newOption2.addEventListener(eventType, (e) => {
                setTimeout(() => {
                    newOption2.style.transform = 'scale(1)';
                }, 100);
            });
        });
    }

    displaySpecialty(specialty, optionNumber) {
        document.querySelector(`#name${optionNumber} span`).textContent = specialty.nome;
        document.getElementById(`duration${optionNumber}`).textContent = `⏱️ ${specialty.formacao}`;
        document.getElementById(`description${optionNumber}`).textContent = specialty.descricao;
        document.getElementById(`requisito${optionNumber}`).textContent = specialty.requisito;
    }

    selectOption(option) {
        // Calcular tempo de resposta
        const responseTime = Date.now() - this.currentChoiceStartTime;
        
        // Obter especialidades atuais
        const option1 = this.currentRound[this.currentMatch * 2];
        const option2 = this.currentRound[this.currentMatch * 2 + 1];
        const selectedSpecialty = option === 1 ? option1 : option2;
        const rejectedSpecialty = option === 1 ? option2 : option1;

        // Registrar dados para análise
        this.choiceTimings.push({
            specialty: selectedSpecialty,
            responseTime: responseTime,
            wasSelected: true
        });

        this.choiceTimings.push({
            specialty: rejectedSpecialty,
            responseTime: responseTime,
            wasSelected: false
        });

        // Categorizar por velocidade de resposta
        if (responseTime < 3000) { // Menos de 3 segundos = decisão rápida
            this.quickChoices.push({
                specialty: selectedSpecialty,
                responseTime: responseTime
            });
        } else if (responseTime > 8000) { // Mais de 8 segundos = decisão lenta (reflexão)
            this.slowChoices.push({
                specialty: selectedSpecialty,
                responseTime: responseTime
            });
        }

        // Registrar especialidade rejeitada
        if (responseTime < 4000) { // Rejeição rápida
            this.rejectedSpecialties.push({
                specialty: rejectedSpecialty,
                responseTime: responseTime
            });
        }

        // Remove seleção anterior
        document.getElementById('option1').classList.remove('selected');
        document.getElementById('option2').classList.remove('selected');

        // Adiciona seleção atual
        document.getElementById(`option${option}`).classList.add('selected');
        this.selectedOption = option;

        // Mostra botão próximo
        document.getElementById('next-btn').style.display = 'inline-block';

        // Adicionar efeito sonoro visual
        this.addSelectionEffect(option);
    }

    addSelectionEffect(option) {
        const card = document.getElementById(`option${option}`);
        card.style.transform = 'scale(1.05)';
        setTimeout(() => {
            card.style.transform = 'scale(1.02)';
        }, 200);
    }

    nextRound() {
        if (this.selectedOption) {
            // Adicionar vencedor
            const winnerIndex = this.currentMatch * 2 + (this.selectedOption - 1);
            this.winners.push(this.currentRound[winnerIndex]);
        }

        this.currentMatch++;
        this.updateRoundInfo();

        if (this.currentMatch >= this.totalMatches) {
            // Rodada concluída
            if (this.winners.length === 1) {
                // Quiz concluído!
                this.finishQuiz();
            } else if (this.winners.length === 2) {
                // Preparar final
                this.prepareNextRound();
            } else if (this.winners.length === 3) {
                // Decisão do terceiro lugar
                this.prepareBronzeMatch();
            } else {
                // Próxima rodada
                this.prepareNextRound();
            }
        } else {
            // Próxima batalha na mesma rodada
            this.showCurrentMatch();
        }
    }

    prepareNextRound() {
        this.currentRound = [...this.winners];
        this.winners = [];
        this.currentMatch = 0;
        this.totalMatches = this.currentRound.length / 2;
        this.currentRoundIndex++;
        
        this.updateRoundInfo();
        this.showCurrentMatch();
    }

    prepareBronzeMatch() {
        // Salvar o campeão
        const champion = this.winners[this.winners.length - 1];
        
        // Pegar os dois últimos eliminados para disputa do 3º lugar
        // (esta é uma simplificação - idealmente salvaria os semifinalistas)
        this.currentRound = this.winners.slice(0, 2);
        this.winners = [champion];
        this.currentMatch = 0;
        this.totalMatches = 1;
        
        document.getElementById('round-info').textContent = 'Disputa do 3º Lugar - 1/1';
        this.showCurrentMatch();
    }

    finishQuiz() {
        // Organizar pódio (simplificado)
        this.podium = [
            this.winners[0], // 1º lugar
            this.currentRound[this.selectedOption === 1 ? 1 : 0], // 2º lugar (perdedor da final)
            this.currentRound[this.selectedOption === 1 ? 0 : 1]  // 3º lugar (aproximação)
        ];

        this.showResults();
    }

    showResults() {
        document.getElementById('quiz-screen').style.display = 'none';
        document.getElementById('results-screen').style.display = 'block';

        // Exibir pódio
        const [first, second, third] = this.podium;
        
        document.getElementById('first-place').innerHTML = `
            <h4>${first.nome}</h4>
            <p><small>${first.formacao}</small></p>
        `;
        
        document.getElementById('second-place').innerHTML = `
            <h5>${second.nome}</h5>
            <p><small>${second.formacao}</small></p>
        `;
        
        document.getElementById('third-place').innerHTML = `
            <h5>${third.nome}</h5>
            <p><small>${third.formacao}</small></p>
        `;

        // Detalhes do vencedor
        document.getElementById('winner-details').innerHTML = `
            <div class="specialty-card" style="max-width: 600px; margin: 0 auto;">
                <div class="specialty-name">
                    <i class="fas fa-crown"></i>
                    <span>${first.nome}</span>
                </div>
                <div class="specialty-duration">${first.formacao}</div>
                <div class="specialty-description">${first.descricao}</div>
                <div class="mt-3">
                    <small><strong>Requisito:</strong> ${first.requisito}</small>
                </div>
            </div>
        `;

        // Exibir análise de preferências
        this.showPreferencesAnalysis();

        // Animação de confete (simulada)
        this.showConfetti();
    }

    showConfetti() {
        // Efeito visual simples de comemoração
        const resultsScreen = document.getElementById('results-screen');
        resultsScreen.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7)';
        resultsScreen.style.backgroundSize = '400% 400%';
        resultsScreen.style.animation = 'gradientShift 3s ease infinite';
        
        // Adicionar CSS da animação dinamicamente
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
    }

    restartQuiz() {
        // Reset completo
        this.currentRound = [];
        this.winners = [];
        this.currentMatch = 0;
        this.currentRoundIndex = 0;
        this.selectedOption = null;
        this.podium = [];

        document.getElementById('results-screen').style.display = 'none';
        document.getElementById('start-screen').style.display = 'block';
    }

    shareResults() {
        const winner = this.podium[0];
        const shareText = `🏆 Minha especialidade médica ideal é: ${winner.nome}!\n\n` +
                         `${winner.descricao}\n\n` +
                         `⏱️ Duração: ${winner.formacao}\n` +
                         `🎯 Descubra a sua no Quiz de Especialidades Médicas!`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Quiz de Especialidades Médicas - Resultado',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback para cópia
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Resultado copiado para a área de transferência!');
            });
        }
    }

    showSpecialtyDetails() {
        const option1 = this.currentRound[this.currentMatch * 2];
        const option2 = this.currentRound[this.currentMatch * 2 + 1];
        
        const details = `
            <div class="modal fade" id="detailsModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Comparação Detalhada</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <h6>${option1.nome}</h6>
                                    <p><strong>Duração:</strong> ${option1.formacao}</p>
                                    <p><strong>Descrição:</strong> ${option1.descricao}</p>
                                    <p><strong>Requisito:</strong> ${option1.requisito}</p>
                                </div>
                                <div class="col-md-6">
                                    <h6>${option2.nome}</h6>
                                    <p><strong>Duração:</strong> ${option2.formacao}</p>
                                    <p><strong>Descrição:</strong> ${option2.descricao}</p>
                                    <p><strong>Requisito:</strong> ${option2.requisito}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', details);
        const modal = new bootstrap.Modal(document.getElementById('detailsModal'));
        modal.show();
        
        // Remover modal após fechar
        document.getElementById('detailsModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    }

    showPreferencesAnalysis() {
        // Top 3 especialidades que mais gostou (escolhas rápidas)
        const topPreferences = this.quickChoices
            .sort((a, b) => a.responseTime - b.responseTime)
            .slice(0, 3);

        const topList = document.getElementById('top-preferences-list');
        topList.innerHTML = '';
        topPreferences.forEach((choice, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${choice.specialty.nome}</strong>
                    <br><small class="text-muted">${choice.specialty.formacao}</small>
                </div>
                <span class="time-badge">${(choice.responseTime / 1000).toFixed(1)}s</span>
            `;
            topList.appendChild(li);
        });

        // 3 especialidades que menos gostou (rejeições rápidas)
        const leastPreferences = this.rejectedSpecialties
            .sort((a, b) => a.responseTime - b.responseTime)
            .slice(0, 3);

        const leastList = document.getElementById('least-preferences-list');
        leastList.innerHTML = '';
        leastPreferences.forEach((choice, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${choice.specialty.nome}</strong>
                    <br><small class="text-muted">${choice.specialty.formacao}</small>
                </div>
                <span class="time-badge">${(choice.responseTime / 1000).toFixed(1)}s</span>
            `;
            leastList.appendChild(li);
        });

        // 3 especialidades para pesquisar mais (decisões lentas)
        const researchMore = this.slowChoices
            .sort((a, b) => b.responseTime - a.responseTime)
            .slice(0, 3);

        const researchList = document.getElementById('research-more-list');
        researchList.innerHTML = '';
        researchMore.forEach((choice, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${choice.specialty.nome}</strong>
                    <br><small class="text-muted">${choice.specialty.formacao}</small>
                </div>
                <span class="time-badge">${(choice.responseTime / 1000).toFixed(1)}s</span>
            `;
            researchList.appendChild(li);
        });

        // Se não houver dados suficientes, mostrar mensagens alternativas
        if (topPreferences.length === 0) {
            topList.innerHTML = '<li><em>Não foram detectadas preferências claras nesta categoria.</em></li>';
        }
        
        if (leastPreferences.length === 0) {
            leastList.innerHTML = '<li><em>Não foram detectadas rejeições rápidas.</em></li>';
        }
        
        if (researchMore.length === 0) {
            researchList.innerHTML = '<li><em>Não foram detectadas decisões que requerem mais pesquisa.</em></li>';
        }
    }
}

// Funções globais para os botões
let quiz;

window.onload = function() {
    quiz = new MedicalSpecialtyQuiz();
    quiz.init();
};

function startQuiz() {
    quiz.startQuiz();
}

function selectOption(option) {
    quiz.selectOption(option);
}

function nextRound() {
    quiz.nextRound();
}

function restartQuiz() {
    quiz.restartQuiz();
}

function shareResults() {
    quiz.shareResults();
}

function showSpecialtyDetails() {
    quiz.showSpecialtyDetails();
}
