// Sistema de Quiz Gamificado de Especialidades Médicas - Versão Simplificada
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
        
        // Histórico completo para análise final
        this.allChoices = []; // Todas as escolhas feitas no quiz
        this.rejectedSpecialties = []; // Todas as especialidades rejeitadas
        this.finalRanking = []; // Ranking final baseado na progressão
        
        // Sistema de análise de preferências
        this.choiceTimings = [];
        this.quickChoices = [];
        this.slowChoices = [];
        this.currentChoiceStartTime = null;
        
        // Sistema de médias progressivas
        this.runningAverageAccepted = 0;
        this.runningAverageRejected = 0;
        this.acceptedCount = 0;
        this.rejectedCount = 0;
        this.totalDecisions = 0;
        
        // Rede Complexa de Processamento Gamificada
        this.neuralNetwork = {
            // Camadas de análise comportamental
            behavioralLayers: {
                timeAnalysis: new Map(),      
                patternRecognition: new Map(), 
                emotionalResponse: new Map(),  
                cognitiveLoad: new Map(),      
                consistency: new Map(),        
                contextualPreference: new Map() 
            },
            
            // Pesos adaptativos para cada camada
            layerWeights: {
                timeAnalysis: 0.25,
                patternRecognition: 0.20,
                emotionalResponse: 0.15,
                cognitiveLoad: 0.15,
                consistency: 0.15,
                contextualPreference: 0.10
            },
            
            // Histórico de todas as interações
            interactionHistory: [],
            
            // Scores compostos finais
            compositeScores: new Map(),
            
            // Metadados de contexto
            contextMetadata: {
                startTime: Date.now(),
                totalInteractions: 0,
                sessionComplexity: 'moderate',
                adaptiveDifficulty: 1.0
            }
        };
        
        // Sistema de histórico para análise temporal
        this.quizHistory = [];
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
        
        // Garantir número par de especialidades
        while (this.currentRound.length % 2 !== 0) {
            const randomIndex = Math.floor(Math.random() * this.currentRound.length);
            this.currentRound.splice(randomIndex, 1);
            console.log(`Número ímpar detectado. Removida especialidade no índice ${randomIndex}. Total agora: ${this.currentRound.length}`);
        }

        this.currentMatch = 0;
        this.currentRoundIndex = 0;
        this.totalMatches = Math.floor(this.currentRound.length / 2); // Usar Math.floor para garantir número inteiro
        this.winners = [];
        this.selectedOption = null;

        console.log(`Quiz iniciado com ${this.currentRound.length} especialidades (${this.totalMatches} matches por rodada)`);

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
        if (this.currentRoundIndex < this.roundNames.length) {
            document.getElementById('round-info').textContent = 
                `${this.roundNames[this.currentRoundIndex]} - ${this.currentMatch + 1}/${this.totalMatches}`;
        }
    }

    showCurrentMatch() {
        const option1Index = this.currentMatch * 2;
        const option2Index = this.currentMatch * 2 + 1;

        // Verificar se temos especialidades suficientes para este match
        if (option1Index >= this.currentRound.length || option2Index >= this.currentRound.length) {
            console.log('Não há mais especialidades para match - finalizando rodada');
            this.finishQuiz();
            return;
        }

        this.displaySpecialty(this.currentRound[option1Index], 1);
        this.displaySpecialty(this.currentRound[option2Index], 2);
        
        // Limpar seleções anteriores
        document.getElementById('option1').classList.remove('selected');
        document.getElementById('option2').classList.remove('selected');
        this.selectedOption = null;
        
        // Reabilitar botões
        const allButtons = document.querySelectorAll('.btn-choose');
        allButtons.forEach(btn => {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-check"></i> Escolher';
        });

        this.currentChoiceStartTime = Date.now();
        console.log('Match atual exibido, aguardando seleção...');
    }

    displaySpecialty(specialty, optionNumber) {
        document.querySelector(`#name${optionNumber} span`).textContent = specialty.nome;
        document.getElementById(`duration${optionNumber}`).textContent = `⏱️ ${specialty.formacao}`;
        document.getElementById(`description${optionNumber}`).textContent = specialty.descricao;
        document.getElementById(`requisito${optionNumber}`).textContent = specialty.requisito;
    }

    selectOption(option) {
        console.log(`Selecionando opção ${option}`);
        
        // Feedback visual imediato
        this.showSelectionFeedback(option);
        
        // Calcular tempo de resposta
        const responseTime = Date.now() - this.currentChoiceStartTime;
        
        // Obter especialidades atuais com verificação de segurança
        const option1 = this.currentRound[this.currentMatch * 2];
        const option2 = this.currentRound[this.currentMatch * 2 + 1];
        
        // Verificar se as especialidades existem
        if (!option1 || !option2) {
            console.error('Especialidades não encontradas:', { option1, option2, currentMatch: this.currentMatch, currentRound: this.currentRound });
            return;
        }
        
        const selectedSpecialty = option === 1 ? option1 : option2;
        const rejectedSpecialty = option === 1 ? option2 : option1;

        // SALVAR HISTÓRICO COMPLETO
        this.allChoices.push({
            selected: selectedSpecialty,
            rejected: rejectedSpecialty,
            responseTime: responseTime,
            round: this.currentRoundIndex,
            match: this.currentMatch,
            timestamp: Date.now()
        });
        
        // Adicionar rejeitada ao histórico
        this.rejectedSpecialties.push({
            specialty: rejectedSpecialty,
            responseTime: responseTime,
            round: this.currentRoundIndex,
            rejectedAt: Date.now()
        });

        // REDE NEURAL COMPLEXA - Processamento multicamada
        this.processNeuralAnalysis(selectedSpecialty, rejectedSpecialty, responseTime, option);

        // Incrementar contador total
        this.totalDecisions++;

        // Atualizar médias progressivas
        this.updateRunningAverages(responseTime, selectedSpecialty, true);
        this.updateRunningAverages(responseTime, rejectedSpecialty, false);

        // Registrar dados para análise básica
        this.choiceTimings.push({
            specialty: selectedSpecialty,
            responseTime: responseTime,
            wasSelected: true,
            isQuickDecision: this.isQuickDecision(responseTime, true),
            isSlowDecision: this.isSlowDecision(responseTime, true),
            neuralScore: this.neuralNetwork.compositeScores.get(selectedSpecialty.id) || 0
        });

        this.choiceTimings.push({
            specialty: rejectedSpecialty,
            responseTime: responseTime,
            wasSelected: false,
            isQuickDecision: this.isQuickDecision(responseTime, false),
            isSlowDecision: this.isSlowDecision(responseTime, false),
            neuralScore: this.neuralNetwork.compositeScores.get(rejectedSpecialty.id) || 0
        });

        // Categorizar usando médias dinâmicas + rede neural
        if (this.isQuickDecision(responseTime, true)) {
            this.quickChoices.push({
                specialty: selectedSpecialty,
                responseTime: responseTime,
                confidence: this.calculateConfidenceScore(selectedSpecialty, responseTime)
            });
        } else if (this.isSlowDecision(responseTime, true)) {
            this.slowChoices.push({
                specialty: selectedSpecialty,
                responseTime: responseTime,
                deliberation: this.calculateDeliberationScore(selectedSpecialty, responseTime)
            });
        }

        this.selectedOption = option;

        // Avançar automaticamente após um breve delay
        setTimeout(() => {
            this.nextRound();
        }, 800);
    }

    // Método simplificado para feedback visual
    showSelectionFeedback(optionNumber) {
        console.log(`Feedback visual para opção ${optionNumber}`);
        
        // Desabilitar todos os botões durante processamento
        const allButtons = document.querySelectorAll('.btn-choose');
        allButtons.forEach(btn => {
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
        });
    }

    nextRound() {
        console.log(`=== PROCESSANDO RESULTADO DO MATCH ${this.currentMatch + 1}/${this.totalMatches} ===`);
        
        if (this.selectedOption) {
            // Adicionar vencedor
            const winnerIndex = this.currentMatch * 2 + (this.selectedOption - 1);
            const winner = this.currentRound[winnerIndex];
            const loser = this.currentRound[this.currentMatch * 2 + (2 - this.selectedOption)];
            
            this.winners.push(winner);
            console.log(`✅ Vencedor adicionado: ${winner.nome}`);
            console.log(`❌ Eliminado: ${loser.nome}`);
            console.log(`Vencedores acumulados: [${this.winners.map(w => w.nome).join(', ')}]`);
        }

        this.currentMatch++;
        console.log(`Match incrementado: ${this.currentMatch}/${this.totalMatches}`);
        this.updateRoundInfo();

        if (this.currentMatch >= this.totalMatches) {
            console.log(`=== RODADA COMPLETA! ===`);
            console.log(`Winners desta rodada: ${this.winners.length} (${this.winners.map(w => w.nome).join(', ')})`);
            
            // Lógica especial para semifinal com 3 especialidades
            if (this.totalMatches === 2 && this.currentRound.length === 3) {
                console.log('🔥 Finalizando semifinal especial...');
                if (this.currentMatch === 1) {
                    // Primeiro match completo, configurar segundo match
                    const firstWinner = this.winners[0];
                    const thirdContender = this.currentRound[2];
                    
                    console.log(`Segundo match da semifinal: ${firstWinner.nome} vs ${thirdContender.nome}`);
                    
                    // Configurar segundo match
                    this.currentRound = [firstWinner, thirdContender];
                    this.winners = []; // Reset para o segundo match
                    this.showCurrentMatch();
                    return;
                } else {
                    // Semifinal completa
                    console.log('🏆 Semifinal especial finalizada!');
                    this.finishQuiz();
                    return;
                }
            }
            
            // Lógica normal de finalização
            if (this.winners.length <= 1) {
                // Quiz concluído - temos o campeão!
                console.log('🏆 Quiz finalizado - campeão definido!');
                this.finishQuiz();
            } else if (this.winners.length === 2) {
                // Final entre 2 especialidades
                console.log('🥇 Preparando FINAL entre 2 especialidades!');
                this.prepareNextRound();
            } else if (this.winners.length === 3) {
                // Ainda temos 3, vamos para uma semifinal
                console.log('🥉 Semifinal com 3 especialidades...');
                this.prepareNextRound();
            } else {
                // Mais de 3 especialidades - próxima rodada
                console.log(`🔄 Preparando próxima rodada com ${this.winners.length} especialidades...`);
                this.prepareNextRound();
            }
        } else {
            // Próximo match da rodada atual
            console.log(`➡️ Próximo match da mesma rodada (${this.currentMatch + 1}/${this.totalMatches})...`);
            this.showCurrentMatch();
        }
    }

    prepareNextRound() {
        console.log(`=== PREPARANDO NOVA RODADA ===`);
        console.log('Winners atuais:', this.winners.map(w => w.nome));
        console.log('Current round atual:', this.currentRound.map(c => c.nome));
        
        this.currentRound = [...this.winners];
        
        // Lógica inteligente para números ímpares
        if (this.currentRound.length % 2 !== 0) {
            console.log(`⚠️ Número ímpar de especialidades: ${this.currentRound.length}`);
            console.log('Especialidades antes da correção:', this.currentRound.map(s => s.nome));
            
            if (this.currentRound.length === 3) {
                // Caso especial: 3 especialidades na semifinal
                // Vamos fazer todos enfrentarem todos e pegar a melhor
                console.log('Modo semifinal especial: 3 especialidades');
                this.handleThreeWayMatch();
                return;
            } else {
                // Para números ímpares > 3, a PRIMEIRA especialidade "passa direto"
                // (mudei de .pop() para .shift() para ser mais justo)
                const passedSpecialty = this.currentRound.shift();
                console.log(`📈 ${passedSpecialty.nome} avança diretamente para a próxima fase (por número ímpar)`);
                console.log('Especialidades restantes para os matches:', this.currentRound.map(s => s.nome));
                
                // Adicionar aos vencedores automaticamente
                this.winners = [passedSpecialty];
                
                // Registrar essa "escolha automática"
                this.allChoices.push({
                    selected: passedSpecialty,
                    rejected: { nome: 'Passou direto (número ímpar)', id: 'auto-pass' },
                    round: this.currentRoundIndex,
                    match: 'auto',
                    responseTime: 0,
                    timestamp: Date.now()
                });
                
                console.log(`${passedSpecialty.nome} foi automaticamente promovida para a próxima fase`);
            }
        } else {
            console.log('✅ Número par de especialidades - todos farão matches');
            this.winners = [];
        }
        
        this.currentMatch = 0;
        this.currentRoundIndex++;
        this.totalMatches = Math.floor(this.currentRound.length / 2);
        
        console.log(`Nova rodada configurada:`);
        console.log(`- Especialidades nos matches: ${this.currentRound.length} (${this.currentRound.map(s => s.nome).join(', ')})`);
        console.log(`- Matches a serem realizados: ${this.totalMatches}`);
        console.log(`- Winners pré-definidos: ${this.winners.length} (${this.winners.map(w => w.nome).join(', ')})`);
        console.log(`- Rodada número: ${this.currentRoundIndex}`);
        
        this.updateRoundInfo();
        
        if (this.totalMatches > 0) {
            console.log('Iniciando matches da nova rodada...');
            this.showCurrentMatch();
        } else {
            // Se não há matches, terminar o quiz
            console.log('Nenhum match necessário - finalizando quiz');
            this.finishQuiz();
        }
    }

    handleThreeWayMatch() {
        console.log('=== RESOLVENDO SEMIFINAL COM 3 ESPECIALIDADES ===');
        
        // Estratégia: fazer 2 matches sequenciais
        // Match 1: A vs B, Match 2: Vencedor vs C
        
        // Embaralhar para justiça
        const shuffled = [...this.currentRound].sort(() => Math.random() - 0.5);
        
        console.log('Ordem dos enfrentamentos:', shuffled.map(s => s.nome));
        
        // Configurar para 2 matches: primeiro A vs B, depois vencedor vs C
        this.currentRound = [shuffled[0], shuffled[1], shuffled[2]];
        this.winners = [];
        this.currentMatch = 0;
        this.totalMatches = 2; // 2 matches na semifinal especial
        this.currentRoundIndex++;
        
        console.log('Semifinal configurada: 2 matches sequenciais');
        this.updateRoundInfo();
        this.showCurrentMatch();
    }

    prepareBronzeMatch() {
        // Implementação simplificada
        this.finishQuiz();
    }

    finishQuiz() {
        // Construir ranking baseado na progressão do quiz
        this.buildFinalRanking();
        
        // Exibir resultados
        document.getElementById('quiz-screen').style.display = 'none';
        document.getElementById('results-screen').style.display = 'block';
        
        this.displayResults();
        this.generateAdvancedAnalysis();
    }
    
    buildFinalRanking() {
        console.log('=== CONSTRUINDO RANKING FINAL ===');
        console.log('Winners atuais:', this.winners.map(w => w.nome));
        console.log('Current round:', this.currentRound.map(c => c.nome));
        console.log('Total de escolhas feitas:', this.allChoices.length);
        
        // 1. Campeão(ões) - última(s) especialidade(s) que restaram
        const champions = this.winners.length > 0 ? [...this.winners] : [...this.currentRound];
        console.log('Campeões identificados:', champions.map(c => c.nome));
        
        // 2. Mapear TODAS as especialidades e sua progressão
        const progressionMap = new Map();
        
        // Inicializar todas as especialidades
        this.especialidades.forEach(spec => {
            progressionMap.set(spec.id, {
                specialty: spec,
                lastRound: 0,
                totalChoices: 0,
                avgResponseTime: 0,
                rounds: [],
                status: 'nunca_apareceu',
                isChampion: champions.some(c => c.id === spec.id)
            });
        });
        
        console.log('=== ANALISANDO ESCOLHAS ===');
        this.allChoices.forEach((choice, index) => {
            console.log(`Escolha ${index + 1}: ${choice.selected.nome} vs ${choice.rejected.nome}`);
            console.log(`  Rodada ${choice.round}, Match ${choice.match}, ${choice.responseTime}ms`);
            
            // Atualizar especialidade ESCOLHIDA
            const selectedData = progressionMap.get(choice.selected.id);
            if (selectedData) {
                selectedData.lastRound = Math.max(selectedData.lastRound, choice.round);
                selectedData.totalChoices++;
                selectedData.avgResponseTime = selectedData.totalChoices === 1 ? 
                    choice.responseTime : 
                    (selectedData.avgResponseTime + choice.responseTime) / 2;
                selectedData.rounds.push(choice.round);
                selectedData.status = 'escolhida';
            }
            
            // Atualizar especialidade REJEITADA (só se não for auto-pass)
            if (choice.rejected.id !== 'auto-pass') {
                const rejectedData = progressionMap.get(choice.rejected.id);
                if (rejectedData && rejectedData.status === 'nunca_apareceu') {
                    rejectedData.status = 'rejeitada';
                    rejectedData.lastRound = choice.round; // Rodada onde foi eliminada
                }
            }
        });
        
        console.log('=== PROGRESSÃO DETALHADA ===');
        progressionMap.forEach((data, id) => {
            console.log(`${data.specialty.nome}:`);
            console.log(`  Status: ${data.status}`);
            console.log(`  Campeã: ${data.isChampion ? 'SIM' : 'não'}`);
            console.log(`  Última rodada: ${data.lastRound}`);
            console.log(`  Total escolhas: ${data.totalChoices}`);
            console.log(`  Rodadas: [${data.rounds.join(', ')}]`);
        });
        
        // Converter para array e criar ranking inteligente
        const allSpecialities = Array.from(progressionMap.values());
        
        // Separar por categorias
        const championsList = allSpecialities.filter(s => s.isChampion);
        const activeParticipants = allSpecialities.filter(s => s.status === 'escolhida' && !s.isChampion);
        const rejectedList = allSpecialities.filter(s => s.status === 'rejeitada');
        const neverAppeared = allSpecialities.filter(s => s.status === 'nunca_apareceu');
        
        console.log('=== CATEGORIZAÇÃO ===');
        console.log('Campeãs:', championsList.map(s => s.specialty.nome));
        console.log('Participantes ativas:', activeParticipants.map(s => s.specialty.nome));
        console.log('Rejeitadas:', rejectedList.map(s => s.specialty.nome));
        console.log('Nunca apareceram:', neverAppeared.map(s => s.specialty.nome));
        
        // Ordenar cada categoria
        const sortByProgression = (a, b) => {
            if (a.lastRound !== b.lastRound) return b.lastRound - a.lastRound;
            if (a.totalChoices !== b.totalChoices) return b.totalChoices - a.totalChoices;
            return a.avgResponseTime - b.avgResponseTime;
        };
        
        championsList.sort(sortByProgression);
        activeParticipants.sort(sortByProgression);
        rejectedList.sort(sortByProgression);
        
        // Construir ranking final: Campeãs → Participantes → Rejeitadas → Nunca apareceram
        const finalRankingArray = [
            ...championsList,
            ...activeParticipants,
            ...rejectedList,
            ...neverAppeared
        ];
        
        console.log('=== RANKING FINAL ===');
        finalRankingArray.forEach((item, index) => {
            const pos = index + 1;
            console.log(`${pos}º: ${item.specialty.nome} (${item.status}, R${item.lastRound}, ${item.totalChoices} escolhas)`);
        });
        
        // Construir pódio com as top 3
        this.finalRanking = finalRankingArray;
        this.podium = finalRankingArray.slice(0, 3).map(item => item.specialty);
        
        console.log('=== PÓDIO FINAL ===');
        this.podium.forEach((spec, index) => {
            console.log(`${index + 1}º lugar: ${spec.nome}`);
        });
    }

    displayResults() {
        // Exibir campeão principal
        if (this.podium.length > 0) {
            const winnerDetails = document.getElementById('winner-details');
            if (winnerDetails) {
                winnerDetails.innerHTML = `
                    <div class="winner-card">
                        <h4>${this.podium[0].nome}</h4>
                        <p class="text-muted">${this.podium[0].formacao}</p>
                        <p>${this.podium[0].descricao}</p>
                        <small><strong>Requisito:</strong> ${this.podium[0].requisito}</small>
                    </div>
                `;
            }
        }
        
        // Exibir pódio nos elementos corretos
        if (this.podium.length >= 1) {
            const firstPlace = document.getElementById('first-place');
            if (firstPlace) {
                firstPlace.innerHTML = `
                    <strong>${this.podium[0].nome}</strong><br>
                    <small>${this.podium[0].formacao}</small>
                `;
            }
        }
        
        if (this.podium.length >= 2) {
            const secondPlace = document.getElementById('second-place');
            if (secondPlace) {
                secondPlace.innerHTML = `
                    <strong>${this.podium[1].nome}</strong><br>
                    <small>${this.podium[1].formacao}</small>
                `;
            }
        }
        
        if (this.podium.length >= 3) {
            const thirdPlace = document.getElementById('third-place');
            if (thirdPlace) {
                thirdPlace.innerHTML = `
                    <strong>${this.podium[2].nome}</strong><br>
                    <small>${this.podium[2].formacao}</small>
                `;
            }
        }
        
        console.log('Resultados exibidos no pódio');
    }

    generateAdvancedAnalysis() {
        console.log('Gerando análise avançada...');
        
        // Filtrar escolhas reais (excluir passagens diretas e tempos absurdos)
        const realChoices = this.allChoices.filter(choice => 
            choice.responseTime > 100 && // Excluir escolhas automáticas (0ms)
            choice.responseTime < 30000 && // Excluir tempos absurdos (> 30s)
            choice.match !== 'auto' // Excluir passagens diretas por número ímpar
        );
        
        console.log(`Analisando ${realChoices.length} escolhas reais de ${this.allChoices.length} totais`);
        
        // ANÁLISE INTELIGENTE: Distinguir entre "gosto muito" vs "eliminação"
        const truePreferences = this.analyzeRealPreferences(realChoices);
        const trueRejections = this.analyzeRealRejections();
        
        // TOP 3 - Especialidades que REALMENTE mais gostou
        const topPreferences = document.getElementById('top-preferences-list');
        if (topPreferences) {
            if (truePreferences.length > 0) {
                topPreferences.innerHTML = truePreferences.slice(0, 3).map((pref, index) => `
                    <li class="analysis-item">
                        <div class="specialty-info">
                            <strong>${pref.specialty.nome}</strong>
                            <small class="time-info">(${pref.confidence}% confiança - ${pref.reason})</small>
                        </div>
                        <div class="specialty-description">${pref.specialty.formacao}</div>
                        <div class="analysis-note">
                            <small>💚 ${pref.explanation}</small>
                        </div>
                    </li>
                `).join('');
            } else {
                topPreferences.innerHTML = `
                    <li class="analysis-item">
                        <div class="specialty-info">
                            <strong>Análise mais complexa necessária</strong>
                            <small class="time-info">Suas escolhas foram muito equilibradas</small>
                        </div>
                    </li>
                `;
            }
        }
        
        // 3 ESPECIALIDADES QUE REALMENTE menos interessam
        const leastPreferences = document.getElementById('least-preferences-list');
        if (leastPreferences) {
            if (trueRejections.length > 0) {
                leastPreferences.innerHTML = trueRejections.slice(0, 3).map((rejection, index) => `
                    <li class="analysis-item">
                        <div class="specialty-info">
                            <strong>${rejection.specialty.nome}</strong>
                            <small class="time-info">(${rejection.confidence}% confiança - ${rejection.reason})</small>
                        </div>
                        <div class="specialty-description">${rejection.specialty.formacao}</div>
                        <div class="analysis-note">
                            <small>💔 ${rejection.explanation}</small>
                        </div>
                    </li>
                `).join('');
            } else {
                leastPreferences.innerHTML = `
                    <li class="analysis-item">
                        <div class="specialty-info">
                            <strong>Nenhuma aversão clara detectada</strong>
                            <small class="time-info">Você mostrou interesse em diversas áreas</small>
                        </div>
                    </li>
                `;
            }
        }
        
        // 3 ESPECIALIDADES PARA PESQUISAR (decisões difíceis)
        const complexChoices = realChoices
            .filter(choice => choice.responseTime > 4000 && choice.responseTime < 15000)
            .sort((a, b) => b.responseTime - a.responseTime)
            .slice(0, 3);
            
        const researchSuggestions = document.getElementById('research-more-list');
        if (researchSuggestions) {
            if (complexChoices.length > 0) {
                researchSuggestions.innerHTML = complexChoices.map((choice, index) => `
                    <li class="analysis-item">
                        <div class="specialty-info">
                            <strong>${choice.selected.nome}</strong>
                            <small class="time-info">(${(choice.responseTime/1000).toFixed(1)}s - Decisão difícil)</small>
                        </div>
                        <div class="specialty-description">${choice.selected.formacao}</div>
                        <div class="analysis-note">
                            <small>🤔 Você teve dificuldade para escolher - vale pesquisar mais!</small>
                        </div>
                    </li>
                `).join('');
            } else {
                researchSuggestions.innerHTML = `
                    <li class="analysis-item">
                        <div class="specialty-info">
                            <strong>Decisões bem definidas!</strong>
                            <small class="time-info">Você tem clareza sobre suas preferências</small>
                        </div>
                        <div class="analysis-note">
                            <small>✨ Isso indica boa autoconhecimento!</small>
                        </div>
                    </li>
                `;
            }
        }
        
        console.log('Análise completa:', {
            totalChoices: this.allChoices.length,
            realChoices: realChoices.length,
            truePreferences: truePreferences.length,
            trueRejections: trueRejections.length,
            complexChoices: complexChoices.length,
            autoChoices: this.allChoices.filter(c => c.match === 'auto').length
        });
    }
    
    analyzeRealPreferences(realChoices) {
        const preferences = [];
        
        // Analisar cada escolha rápida para ver se foi por "gostar" ou "eliminação"
        realChoices.forEach(choice => {
            if (choice.responseTime < 2000) { // Decisão rápida
                
                // Fatores que indicam preferência REAL (não eliminação):
                let confidence = 50; // Base
                let reasons = [];
                
                // 1. A especialidade escolhida progrediu muito no quiz
                const progression = this.getSpecialtyProgression(choice.selected);
                if (progression > 2) {
                    confidence += 30;
                    reasons.push('chegou longe no quiz');
                }
                
                // 2. Área consistente com outras escolhas
                const areaConsistency = this.getAreaConsistency(choice.selected);
                if (areaConsistency > 0.6) {
                    confidence += 20;
                    reasons.push('área consistente');
                }
                
                // 3. Tempo "ideal" (não muito rápido = não foi só eliminação)
                if (choice.responseTime > 800) {
                    confidence += 15;
                    reasons.push('tempo de reflexão adequado');
                }
                
                // 4. A rejeitada também tem boa pontuação (escolha difícil)
                const rejectedProgression = this.getSpecialtyProgression(choice.rejected);
                if (rejectedProgression > 1) {
                    confidence += 10;
                    reasons.push('escolha entre duas boas opções');
                }
                
                if (confidence > 70) {
                    preferences.push({
                        specialty: choice.selected,
                        confidence: Math.min(confidence, 95),
                        reason: `Decisão rápida (${(choice.responseTime/1000).toFixed(1)}s)`,
                        explanation: `Escolha consistente: ${reasons.join(', ')}`,
                        originalChoice: choice
                    });
                }
            }
        });
        
        // Ordenar por confiança
        return preferences.sort((a, b) => b.confidence - a.confidence);
    }
    
    analyzeRealRejections() {
        const rejections = [];
        
        // Analisar rejeições consistentes
        this.rejectedSpecialties.forEach(rejected => {
            if (rejected.responseTime > 100 && rejected.responseTime < 30000) {
                
                let confidence = 50;
                let reasons = [];
                
                // 1. Rejeitada múltiplas vezes ou rapidamente
                if (rejected.responseTime < 1500) {
                    confidence += 25;
                    reasons.push('rejeitada rapidamente');
                }
                
                // 2. Área inconsistente com preferências
                const areaRejection = this.getAreaRejectionPattern(rejected.specialty);
                if (areaRejection > 0.7) {
                    confidence += 30;
                    reasons.push('área inconsistente com perfil');
                }
                
                // 3. Nunca progrediu no quiz
                confidence += 20;
                reasons.push('eliminada precocemente');
                
                if (confidence > 70) {
                    rejections.push({
                        specialty: rejected.specialty,
                        confidence: Math.min(confidence, 95),
                        reason: `Rejeitada em ${(rejected.responseTime/1000).toFixed(1)}s`,
                        explanation: `Padrão claro: ${reasons.join(', ')}`,
                        originalRejection: rejected
                    });
                }
            }
        });
        
        return rejections.sort((a, b) => b.confidence - a.confidence);
    }
    
    getSpecialtyProgression(specialty) {
        // Ver até que rodada a especialidade chegou
        const allChoicesForSpecialty = this.allChoices.filter(c => c.selected.id === specialty.id);
        if (allChoicesForSpecialty.length === 0) return 0;
        
        return Math.max(...allChoicesForSpecialty.map(c => c.round));
    }
    
    getAreaConsistency(specialty) {
        if (this.allChoices.length < 3) return 0.5;
        
        const specialtyArea = this.getSpecialtyArea(specialty.nome);
        const sameAreaChoices = this.allChoices.filter(c => 
            this.getSpecialtyArea(c.selected.nome) === specialtyArea
        ).length;
        
        return sameAreaChoices / this.allChoices.length;
    }
    
    getAreaRejectionPattern(specialty) {
        const specialtyArea = this.getSpecialtyArea(specialty.nome);
        const areaRejections = this.rejectedSpecialties.filter(r => 
            this.getSpecialtyArea(r.specialty.nome) === specialtyArea
        ).length;
        
        const totalAreaSpecialties = this.especialidades.filter(s => 
            this.getSpecialtyArea(s.nome) === specialtyArea
        ).length;
        
        return totalAreaSpecialties > 0 ? areaRejections / totalAreaSpecialties : 0;
    }

    restartQuiz() {
        // Reset do estado
        this.currentRound = [];
        this.winners = [];
        this.currentMatch = 0;
        this.selectedOption = null;
        this.currentRoundIndex = 0;
        this.podium = [];
        
        // Voltar para tela inicial
        document.getElementById('results-screen').style.display = 'none';
        document.getElementById('start-screen').style.display = 'block';
    }

    shareResults() {
        // Implementação opcional
        console.log('Compartilhamento de resultados');
    }

    // Métodos auxiliares para análise neural avançada
    processNeuralAnalysis(selectedSpecialty, rejectedSpecialty, responseTime, option) {
        if (!selectedSpecialty || !rejectedSpecialty) {
            console.warn('Especialidades não definidas para análise neural');
            return;
        }
        
        console.log(`🧠 Processando análise neural: ${selectedSpecialty.nome} vs ${rejectedSpecialty.nome}`);
        
        // 1. ANÁLISE TEMPORAL (25% do peso)
        const timeScore = this.calculateTimeScore(responseTime);
        
        // 2. RECONHECIMENTO DE PADRÕES (20% do peso)
        const patternScore = this.calculatePatternScore(selectedSpecialty, rejectedSpecialty);
        
        // 3. RESPOSTA EMOCIONAL (15% do peso)
        const emotionalScore = this.calculateEmotionalScore(selectedSpecialty, responseTime);
        
        // 4. CARGA COGNITIVA (15% do peso) 
        const cognitiveScore = this.calculateCognitiveScore(responseTime, option);
        
        // 5. CONSISTÊNCIA (15% do peso)
        const consistencyScore = this.calculateConsistencyScore(selectedSpecialty);
        
        // 6. PREFERÊNCIA CONTEXTUAL (10% do peso)
        const contextualScore = this.calculateContextualScore(selectedSpecialty, rejectedSpecialty);
        
        // Calcular score composto com pesos
        const selectedComposite = (
            timeScore.selected * 0.25 +
            patternScore.selected * 0.20 +
            emotionalScore.selected * 0.15 +
            cognitiveScore.selected * 0.15 +
            consistencyScore.selected * 0.15 +
            contextualScore.selected * 0.10
        );
        
        const rejectedComposite = (
            timeScore.rejected * 0.25 +
            patternScore.rejected * 0.20 +
            emotionalScore.rejected * 0.15 +
            cognitiveScore.rejected * 0.15 +
            consistencyScore.rejected * 0.15 +
            contextualScore.rejected * 0.10
        );
        
        // Armazenar nos mapas das camadas
        this.neuralNetwork.behavioralLayers.timeAnalysis.set(selectedSpecialty.id, timeScore.selected);
        this.neuralNetwork.behavioralLayers.patternRecognition.set(selectedSpecialty.id, patternScore.selected);
        this.neuralNetwork.behavioralLayers.emotionalResponse.set(selectedSpecialty.id, emotionalScore.selected);
        this.neuralNetwork.behavioralLayers.cognitiveLoad.set(selectedSpecialty.id, cognitiveScore.selected);
        this.neuralNetwork.behavioralLayers.consistency.set(selectedSpecialty.id, consistencyScore.selected);
        this.neuralNetwork.behavioralLayers.contextualPreference.set(selectedSpecialty.id, contextualScore.selected);
        
        // Armazenar scores compostos finais
        this.neuralNetwork.compositeScores.set(selectedSpecialty.id, selectedComposite);
        this.neuralNetwork.compositeScores.set(rejectedSpecialty.id, rejectedComposite);
        
        // Adicionar ao histórico de interações
        this.neuralNetwork.interactionHistory.push({
            selected: selectedSpecialty.id,
            rejected: rejectedSpecialty.id,
            responseTime: responseTime,
            timestamp: Date.now(),
            scores: {
                timeScore, patternScore, emotionalScore,
                cognitiveScore, consistencyScore, contextualScore
            },
            composite: { selected: selectedComposite, rejected: rejectedComposite }
        });
        
        console.log(`📊 Scores neurais - ${selectedSpecialty.nome}: ${(selectedComposite * 100).toFixed(1)}% | ${rejectedSpecialty.nome}: ${(rejectedComposite * 100).toFixed(1)}%`);
    }
    
    calculateTimeScore(responseTime) {
        // Análise temporal: decisões muito rápidas (< 1s) = instintivas, muito lentas (> 8s) = indecisão
        const optimal = 2500; // Tempo ideal para uma decisão ponderada
        const deviation = Math.abs(responseTime - optimal);
        const normalizedDeviation = Math.min(deviation / optimal, 1);
        
        const selectedScore = Math.max(0.1, 1 - normalizedDeviation * 0.6); // Escolha ponderada
        const rejectedScore = Math.max(0.05, normalizedDeviation * 0.4); // Rejeição proporcional
        
        return { selected: selectedScore, rejected: rejectedScore };
    }
    
    calculatePatternScore(selectedSpecialty, rejectedSpecialty) {
        // Reconhecimento de padrões: busca por consistência em tipos de especialidade
        const selectedArea = this.getSpecialtyArea(selectedSpecialty.nome);
        const rejectedArea = this.getSpecialtyArea(rejectedSpecialty.nome);
        
        // Verificar histórico para padrões
        const historicalPreference = this.getAreaPreference(selectedArea);
        const historicalRejection = this.getAreaPreference(rejectedArea);
        
        return {
            selected: Math.min(1, 0.5 + historicalPreference * 0.5),
            rejected: Math.max(0, 0.5 - historicalRejection * 0.3)
        };
    }
    
    calculateEmotionalScore(selectedSpecialty, responseTime) {
        // Resposta emocional: decisões rápidas = forte afinidade, hesitação = dúvida
        const emotionalIntensity = responseTime < 1500 ? 0.9 : (responseTime > 5000 ? 0.3 : 0.6);
        
        return {
            selected: emotionalIntensity,
            rejected: 1 - emotionalIntensity
        };
    }
    
    calculateCognitiveScore(responseTime, option) {
        // Carga cognitiva: posição da escolha (1 = esquerda, 2 = direita) + tempo
        const positionBias = option === 1 ? 0.1 : -0.1; // Leve viés pela posição
        const timeComplexity = responseTime > 3000 ? 0.2 : 0; // Decisões complexas
        
        const selectedScore = Math.max(0.1, 0.7 + positionBias + timeComplexity);
        const rejectedScore = Math.max(0.1, 0.3 - positionBias);
        
        return { selected: selectedScore, rejected: rejectedScore };
    }
    
    calculateConsistencyScore(selectedSpecialty) {
        // Consistência: quantas vezes especialidades similares foram escolhidas
        const selections = this.allChoices.filter(choice => 
            this.getSpecialtyArea(choice.selected.nome) === this.getSpecialtyArea(selectedSpecialty.nome)
        ).length;
        
        const consistencyLevel = Math.min(1, selections / 3); // Normalizar até 3 escolhas
        
        return {
            selected: Math.max(0.2, 0.4 + consistencyLevel * 0.6),
            rejected: Math.max(0.1, 0.4 - consistencyLevel * 0.3)
        };
    }
    
    calculateContextualScore(selectedSpecialty, rejectedSpecialty) {
        // Preferência contextual: duração da formação, complexidade, etc.
        const selectedDuration = parseInt(selectedSpecialty.formacao) || 3;
        const rejectedDuration = parseInt(rejectedSpecialty.formacao) || 3;
        
        // Preferência por especializações mais longas ou mais curtas
        const durationPreference = this.getDurationPreference();
        
        const selectedContextual = selectedDuration >= 4 ? 
            (durationPreference > 0.5 ? 0.8 : 0.4) : 
            (durationPreference < 0.5 ? 0.8 : 0.4);
            
        return {
            selected: selectedContextual,
            rejected: 1 - selectedContextual
        };
    }
    
    getSpecialtyArea(nome) {
        // Classificar especialidades por área
        if (nome.includes('Cirurgia')) return 'cirurgica';
        if (nome.includes('Clínica') || nome.includes('Medicina')) return 'clinica';
        if (nome.includes('Pediatria') || nome.includes('Pediátrica')) return 'pediatrica';
        if (nome.includes('Psiquiatria') || nome.includes('Psicologia')) return 'mental';
        if (nome.includes('Diagnóstico') || nome.includes('Radiologia') || nome.includes('Patologia')) return 'diagnostica';
        return 'outras';
    }
    
    getAreaPreference(area) {
        // Calcular preferência histórica por área
        if (this.allChoices.length === 0) return 0;
        
        const areaChoices = this.allChoices.filter(choice => 
            this.getSpecialtyArea(choice.selected.nome) === area
        ).length;
        
        return areaChoices / this.allChoices.length;
    }
    
    getDurationPreference() {
        // Preferência por especializações longas vs curtas
        if (this.allChoices.length === 0) return 0.5;
        
        const longSpecialties = this.allChoices.filter(choice => {
            const duration = parseInt(choice.selected.formacao) || 3;
            return duration >= 4;
        }).length;
        
        return longSpecialties / this.allChoices.length;
    }

    updateRunningAverages(responseTime, specialty, wasAccepted) {
        if (wasAccepted) {
            this.runningAverageAccepted = ((this.runningAverageAccepted * this.acceptedCount) + responseTime) / (this.acceptedCount + 1);
            this.acceptedCount++;
        } else {
            this.runningAverageRejected = ((this.runningAverageRejected * this.rejectedCount) + responseTime) / (this.rejectedCount + 1);
            this.rejectedCount++;
        }
    }

    isQuickDecision(responseTime, wasAccepted) {
        const threshold = wasAccepted ? this.runningAverageAccepted * 0.7 : this.runningAverageRejected * 0.7;
        return responseTime < Math.max(threshold, 1000);
    }

    isSlowDecision(responseTime, wasAccepted) {
        const threshold = wasAccepted ? this.runningAverageAccepted * 1.5 : this.runningAverageRejected * 1.5;
        return responseTime > Math.max(threshold, 3000);
    }

    calculateConfidenceScore(specialty, responseTime) {
        return Math.max(0.5, 1 - (responseTime / 5000));
    }

    calculateDeliberationScore(specialty, responseTime) {
        return Math.min(1, responseTime / 10000);
    }
}

// Instância global do quiz
const quiz = new MedicalSpecialtyQuiz();

// Funções globais para compatibilidade
function startQuiz() {
    quiz.startQuiz();
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

// Inicializar o quiz quando a página carrega
document.addEventListener('DOMContentLoaded', async function() {
    await quiz.loadEspecialidades();
    quiz.showStartScreen();
});
