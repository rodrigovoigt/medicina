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
        this.isProcessing = false; // Prevenção de loop infinito
        
        // Sistema de análise de preferências
        this.choiceTimings = [];
        this.quickChoices = [];
        this.slowChoices = [];
        this.rejectedSpecialties = [];
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
                timeAnalysis: new Map(),      // Análise temporal por especialidade
                patternRecognition: new Map(), // Reconhecimento de padrões
                emotionalResponse: new Map(),  // Resposta emocional inferida
                cognitiveLoad: new Map(),      // Carga cognitiva
                consistency: new Map(),        // Consistência de escolhas
                contextualPreference: new Map() // Preferência contextual
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
            
            // Scores compostos por especialidade
            compositeScores: new Map(),
            
            // Metadados de contexto
            contextMetadata: {
                sessionStartTime: Date.now(),
                totalInteractions: 0,
                averageSessionEngagement: 0,
                decisionPattern: [],
                userBehaviorProfile: {}
            }
        };
        
        // Sistema de detecção de micro-expressões comportamentais
        this.microBehaviors = {
            hesitation: [],           // Padrões de hesitação
            confidence: [],           // Indicadores de confiança
            curiosity: [],            // Sinais de curiosidade
            rejection: [],            // Padrões de rejeição
            enthusiasm: [],           // Indicadores de entusiasmo
            fatigue: []              // Detecção de fadiga cognitiva
        };
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
        
        // Garantir número par de especialidades
        while (this.currentRound.length % 2 !== 0) {
            // Se ímpar, remover uma especialidade aleatória
            const randomIndex = Math.floor(Math.random() * this.currentRound.length);
            this.currentRound.splice(randomIndex, 1);
            console.log(`Número ímpar detectado. Removida especialidade no índice ${randomIndex}. Total agora: ${this.currentRound.length}`);
        }

        this.currentMatch = 0;
        this.currentRoundIndex = 0;
        this.totalMatches = this.currentRound.length / 2;
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
        const roundName = this.roundNames[this.currentRoundIndex] || 'Rodada Especial';
        const matchInfo = `${this.currentMatch + 1}/${this.totalMatches}`;
        document.getElementById('round-info').textContent = `${roundName} - ${matchInfo}`;
        
        // Atualizar barra de progresso corrigida
        const totalRounds = 4;
        const roundProgress = this.currentRoundIndex / totalRounds;
        const matchProgress = this.currentMatch / this.totalMatches;
        const overallProgress = (roundProgress + (matchProgress / totalRounds)) * 100;
        
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.width = `${Math.min(100, Math.max(0, overallProgress))}%`;
        progressBar.textContent = `${Math.round(overallProgress)}%`;
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
        this.selectedOption = null;

        // Limpar feedbacks de seleção anteriores
        const feedbacks = document.querySelectorAll('.selection-feedback');
        feedbacks.forEach(feedback => feedback.remove());
        
        // Reabilitar interações
        document.getElementById('option1').style.pointerEvents = 'auto';
        document.getElementById('option2').style.pointerEvents = 'auto';

        // Iniciar tracking de tempo para a escolha
        this.currentChoiceStartTime = Date.now();

        // Log das médias atuais (para debug)
        if (this.totalDecisions > 0) {
            console.log(`Médias atuais - Aceitos: ${(this.runningAverageAccepted/1000).toFixed(1)}s, Rejeitados: ${(this.runningAverageRejected/1000).toFixed(1)}s, Total de decisões: ${this.totalDecisions}`);
        }

        // Configurar interações mobile
        this.setupMobileInteractions();

        // Adicionar animação
        document.getElementById('quiz-screen').classList.add('fade-in');
        setTimeout(() => {
            document.getElementById('quiz-screen').classList.remove('fade-in');
        }, 500);
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

        // REDE NEURAL COMPLEXA - Processamento multicamada
        this.processNeuralAnalysis(selectedSpecialty, rejectedSpecialty, responseTime, option);

        // Incrementar contador total
        this.totalDecisions++;

        // Atualizar médias progressivas
        this.updateRunningAverages(responseTime, selectedSpecialty, true);
        this.updateRunningAverages(responseTime, rejectedSpecialty, false);

        // Registrar dados para análise básica (mantido para compatibilidade)
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

        // A seleção visual já foi feita no handleSelection dos event listeners
        // Apenas marcar como confirmado para lógica interna
        this.selectedOption = option;

        // Continuar com processamento normal
        // (Botão removido - funciona apenas com duplo clique)

        // Feedback neural em tempo real
        this.displayNeuralFeedback(selectedSpecialty, responseTime);

        // Feedback visual avançado
        this.showAdvancedFeedback(selectedSpecialty, responseTime);

        // Adicionar efeito sonoro visual
        this.addSelectionEffect(option);
        
        // Avançar automaticamente após um breve delay para mostrar o feedback
        setTimeout(() => {
            this.nextRound();
        }, 800); // Reduzido de 1500 para 800ms
    }

    showAdvancedFeedback(specialty, responseTime) {
        const feedbackElement = document.getElementById('advanced-feedback');
        if (!feedbackElement) {
            // Criar elemento de feedback se não existir
            const feedback = document.createElement('div');
            feedback.id = 'advanced-feedback';
            feedback.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px;
                border-radius: 10px;
                font-size: 12px;
                z-index: 1000;
                max-width: 250px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
                opacity: 1;
            `;
            document.body.appendChild(feedback);
        }

        const neuralScore = this.neuralNetwork.compositeScores.get(specialty.id) || 0;
        const confidence = (neuralScore * 100).toFixed(1);
        const speed = responseTime < 3000 ? '⚡ Rápido' : responseTime > 7000 ? '🤔 Reflexivo' : '⚖️ Equilibrado';
        const decisionStyle = this.neuralNetwork.contextMetadata.userBehaviorProfile?.decisionStyle || 'Analisando...';
        
        const feedbackEl = document.getElementById('advanced-feedback');
        feedbackEl.style.opacity = '1';
        feedbackEl.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 8px; color: #FFD700;">🧠 Análise Neural</div>
            <div style="margin-bottom: 4px;"><strong>${specialty.nome}</strong></div>
            <div style="margin-bottom: 4px;">Confiança: <span style="color: #90EE90;">${confidence}%</span></div>
            <div style="margin-bottom: 4px;">Estilo: ${speed}</div>
            <div style="margin-bottom: 4px;">Perfil: ${decisionStyle}</div>
            <div style="font-size: 11px; color: #E0E0E0;">Round ${this.currentRoundIndex + 1}/4 • Match ${this.currentMatch + 1}</div>
        `;

        // Esconder feedback após 4 segundos
        setTimeout(() => {
            const el = document.getElementById('advanced-feedback');
            if (el) el.style.opacity = '0';
        }, 4000);
    }

    processNeuralAnalysis(selectedSpecialty, rejectedSpecialty, responseTime, option) {
        const interaction = {
            timestamp: Date.now(),
            selectedId: selectedSpecialty.id,
            rejectedId: rejectedSpecialty.id,
            responseTime: responseTime,
            optionPosition: option,
            roundIndex: this.currentRoundIndex,
            matchIndex: this.currentMatch
        };

        // Adicionar à história de interações
        this.neuralNetwork.interactionHistory.push(interaction);
        this.neuralNetwork.contextMetadata.totalInteractions++;

        // CAMADA 1: Análise Temporal Profunda
        this.processTimeAnalysisLayer(selectedSpecialty, rejectedSpecialty, responseTime);

        // CAMADA 2: Reconhecimento de Padrões Comportamentais
        this.processPatternRecognitionLayer(selectedSpecialty, responseTime, option);

        // CAMADA 3: Resposta Emocional Inferida
        this.processEmotionalResponseLayer(selectedSpecialty, rejectedSpecialty, responseTime);

        // CAMADA 4: Carga Cognitiva
        this.processCognitiveLoadLayer(selectedSpecialty, responseTime);

        // CAMADA 5: Análise de Consistência
        this.processConsistencyLayer(selectedSpecialty, rejectedSpecialty);

        // CAMADA 6: Preferência Contextual
        this.processContextualPreferenceLayer(selectedSpecialty, rejectedSpecialty);

        // PROCESSAMENTO FINAL: Calcular score composto
        this.calculateCompositeNeuralScore(selectedSpecialty);
        this.calculateCompositeNeuralScore(rejectedSpecialty);

        // Detectar micro-comportamentos
        this.detectMicroBehaviors(responseTime, selectedSpecialty);

        // Atualizar perfil comportamental do usuário
        this.updateUserBehaviorProfile();
    }

    processNeuralAnalysis(selectedSpecialty, rejectedSpecialty, responseTime, option) {
        // Processar todas as camadas da rede neural
        this.processTimeAnalysisLayer(selectedSpecialty, rejectedSpecialty, responseTime);
        this.processPatternRecognitionLayer(selectedSpecialty, responseTime, option);
        this.processEmotionalResponseLayer(selectedSpecialty, rejectedSpecialty, responseTime);
        this.processCognitiveLoadLayer(selectedSpecialty, responseTime);
        this.processConsistencyLayer(selectedSpecialty, rejectedSpecialty);
        this.processContextualPreferenceLayer(selectedSpecialty, rejectedSpecialty);

        // Calcular score neural composto
        const compositeScore = this.calculateCompositeNeuralScore(selectedSpecialty);

        // Registrar interação para análise futura
        this.neuralNetwork.interactionHistory.push({
            timestamp: Date.now(),
            selectedId: selectedSpecialty.id,
            rejectedId: rejectedSpecialty.id,
            responseTime: responseTime,
            option: option,
            compositeScore: compositeScore,
            round: this.currentRoundIndex
        });

        // Detectar micro-comportamentos
        this.detectMicroBehaviors(responseTime, selectedSpecialty);

        // Atualizar perfil comportamental
        this.updateUserBehaviorProfile();

        // Feedback neural em tempo real
        this.displayNeuralFeedback(selectedSpecialty, responseTime);

        // Adaptação dinâmica dos pesos das camadas
        this.adaptLayerWeights();

        return compositeScore;
    }

    adaptLayerWeights() {
        // Adaptar pesos das camadas com base no comportamento do usuário
        const profile = this.neuralNetwork.contextMetadata.userBehaviorProfile;
        
        if (profile.decisionStyle === "Intuitivo") {
            this.neuralNetwork.layerWeights.emotionalResponse += 0.01;
            this.neuralNetwork.layerWeights.timeAnalysis += 0.01;
        } else if (profile.decisionStyle === "Analítico") {
            this.neuralNetwork.layerWeights.cognitiveLoad += 0.01;
            this.neuralNetwork.layerWeights.consistency += 0.01;
        }

        // Normalizar pesos para soma = 1
        const totalWeight = Object.values(this.neuralNetwork.layerWeights).reduce((sum, w) => sum + w, 0);
        Object.keys(this.neuralNetwork.layerWeights).forEach(key => {
            this.neuralNetwork.layerWeights[key] /= totalWeight;
        });
    }

    calculateVariance(values) {
        if (values.length < 2) return 0;
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
        const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
        return squaredDiffs.reduce((sum, diff) => sum + diff, 0) / values.length;
    }

    // ===================== FIM DA REDE NEURAL =====================

    generateNeuralReport() {
        // Gerar relatório completo da análise neural
        const topSpecialties = Array.from(this.neuralNetwork.compositeScores.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([id, score]) => {
                const specialty = this.allSpecialties.find(s => s.id === parseInt(id));
                return {
                    specialty: specialty,
                    neuralScore: score,
                    confidence: (score * 100).toFixed(1)
                };
            });

        const behaviorProfile = this.neuralNetwork.contextMetadata.userBehaviorProfile;
        const sessionStats = {
            totalDecisions: this.totalDecisions,
            sessionDuration: (Date.now() - this.neuralNetwork.contextMetadata.sessionStartTime) / 1000,
            avgResponseTime: this.runningAverageAccepted,
            decisionStyle: behaviorProfile?.decisionStyle || 'Indefinido',
            cognitiveProfile: behaviorProfile?.cognitiveProfile || {}
        };

        return {
            topSpecialties,
            behaviorProfile,
            sessionStats,
            neuralLayers: this.neuralNetwork.behavioralLayers,
            interactionHistory: this.neuralNetwork.interactionHistory
        };
    }

    displayNeuralResults() {
        const report = this.generateNeuralReport();
        
        let neuralResultsHTML = `
            <div class="neural-results" style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); border-radius: 15px; color: white;">
                <h3 style="text-align: center; margin-bottom: 20px; color: #FFD700;">🧠 Análise Neural Completa</h3>
                
                <div class="behavior-profile" style="margin-bottom: 20px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 10px;">
                    <h4 style="color: #90EE90; margin-bottom: 10px;">📊 Perfil Comportamental</h4>
                    <p><strong>Estilo de Decisão:</strong> ${report.sessionStats.decisionStyle}</p>
                    <p><strong>Tempo Médio de Resposta:</strong> ${(report.sessionStats.avgResponseTime / 1000).toFixed(1)}s</p>
                    <p><strong>Duração da Sessão:</strong> ${Math.floor(report.sessionStats.sessionDuration / 60)}min ${Math.floor(report.sessionStats.sessionDuration % 60)}s</p>
                    <p><strong>Total de Decisões:</strong> ${report.sessionStats.totalDecisions}</p>
                </div>

                <div class="top-neural-specialties">
                    <h4 style="color: #FFB6C1; margin-bottom: 15px;">🎯 Top 5 Especialidades (Análise Neural)</h4>
        `;

        report.topSpecialties.slice(0, 5).forEach((item, index) => {
            neuralResultsHTML += `
                <div style="margin-bottom: 10px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="color: #FFD700;">${index + 1}º ${item.specialty.nome}</strong>
                        <div style="font-size: 12px; color: #E0E0E0; margin-top: 2px;">${item.specialty.descricao.substring(0, 100)}...</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 18px; font-weight: bold; color: #90EE90;">${item.confidence}%</div>
                        <div style="font-size: 10px; color: #FFA500;">Neural Score</div>
                    </div>
                </div>
            `;
        });

        neuralResultsHTML += `
                </div>
                
                <div class="neural-insights" style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 10px;">
                    <h4 style="color: #DDA0DD; margin-bottom: 10px;">🔍 Insights da IA</h4>
                    <p style="font-size: 14px; line-height: 1.5;">
                        Com base na análise neural de suas ${report.sessionStats.totalDecisions} decisões, 
                        identificamos um perfil <strong>${report.sessionStats.decisionStyle.toLowerCase()}</strong> 
                        com tempo médio de ${(report.sessionStats.avgResponseTime / 1000).toFixed(1)} segundos por escolha.
                        ${this.generatePersonalizedInsight(report)}
                    </p>
                </div>
            </div>
        `;

        return neuralResultsHTML;
    }

    generatePersonalizedInsight(report) {
        const avgTime = report.sessionStats.avgResponseTime;
        const style = report.sessionStats.decisionStyle;
        
        if (style === "Intuitivo") {
            return "Suas decisões rápidas sugerem confiança em instintos, ideal para especialidades que exigem tomadas de decisão ágeis.";
        } else if (style === "Analítico") {
            return "Seu padrão reflexivo indica preferência por análise detalhada, adequado para especialidades que valorizam precisão diagnóstica.";
        } else {
            return "Seu estilo equilibrado demonstra versatilidade, podendo se adaptar tanto a especialidades dinâmicas quanto analíticas.";
        }
    }

    updateRunningAverages(responseTime, specialty, isAccepted) {
        if (isAccepted) {
            this.acceptedCount++;
            this.runningAverageAccepted = ((this.runningAverageAccepted * (this.acceptedCount - 1)) + responseTime) / this.acceptedCount;
        } else {
            this.rejectedCount++;
            this.runningAverageRejected = ((this.runningAverageRejected * (this.rejectedCount - 1)) + responseTime) / this.rejectedCount;
        }
    }

    isQuickDecision(responseTime, isAccepted) {
        // Usar média progressiva ou valor inicial se ainda não houver dados suficientes
        const referenceAverage = isAccepted ? 
            (this.acceptedCount > 3 ? this.runningAverageAccepted : 4000) :
            (this.rejectedCount > 3 ? this.runningAverageRejected : 3500);
        
        // Decisão rápida = 75% abaixo da média atual
        return responseTime < (referenceAverage * 0.75);
    }

    isSlowDecision(responseTime, isAccepted) {
        // Usar média progressiva ou valor inicial se ainda não houver dados suficientes
        const referenceAverage = isAccepted ? 
            (this.acceptedCount > 3 ? this.runningAverageAccepted : 4000) :
            (this.rejectedCount > 3 ? this.runningAverageRejected : 3500);
        
        // Decisão lenta = 150% acima da média atual
        return responseTime > (referenceAverage * 1.5);
    }

    // ===================== REDE NEURAL COMPLEXA =====================

    processTimeAnalysisLayer(selectedSpecialty, rejectedSpecialty, responseTime) {
        // Verificar se especialidades existem
        if (!selectedSpecialty || !rejectedSpecialty) {
            console.warn('Especialidades não definidas para análise temporal:', { selectedSpecialty, rejectedSpecialty });
            return;
        }
        
        // Análise temporal sofisticada com múltiplos fatores
        const timeScore = {
            rawSpeed: Math.max(0, 10000 - responseTime) / 10000, // Normalizado 0-1
            adaptiveSpeed: this.calculateAdaptiveSpeedScore(responseTime),
            consistencyBonus: this.calculateTimeConsistency(selectedSpecialty.id, responseTime),
            fatigueAdjustment: this.calculateFatigueAdjustment(),
            contextualSpeed: this.calculateContextualSpeedScore(responseTime)
        };

        const compositeTimeScore = (
            timeScore.rawSpeed * 0.3 +
            timeScore.adaptiveSpeed * 0.3 +
            timeScore.consistencyBonus * 0.2 +
            timeScore.fatigueAdjustment * 0.1 +
            timeScore.contextualSpeed * 0.1
        );

        this.neuralNetwork.behavioralLayers.timeAnalysis.set(selectedSpecialty.id, compositeTimeScore);
        this.neuralNetwork.behavioralLayers.timeAnalysis.set(rejectedSpecialty.id, -compositeTimeScore * 0.5);
    }

    processPatternRecognitionLayer(selectedSpecialty, responseTime, option) {
        // Reconhecimento de padrões comportamentais complexos
        const patterns = {
            selectionBias: this.detectSelectionBias(option),
            categoryPreference: this.detectCategoryPreference(selectedSpecialty),
            sequentialPattern: this.detectSequentialPattern(selectedSpecialty.id),
            timePattern: this.detectTimePattern(responseTime),
            choiceStability: this.calculateChoiceStability(selectedSpecialty.id)
        };

        const patternScore = Object.values(patterns).reduce((sum, score) => sum + score, 0) / Object.keys(patterns).length;
        this.neuralNetwork.behavioralLayers.patternRecognition.set(selectedSpecialty.id, patternScore);
    }

    processEmotionalResponseLayer(selectedSpecialty, rejectedSpecialty, responseTime) {
        // Inferência de resposta emocional baseada em micro-indicadores
        const emotionalIndicators = {
            enthusiasm: this.detectEnthusiasm(responseTime, selectedSpecialty),
            hesitation: this.detectHesitation(responseTime),
            confidence: this.detectConfidence(responseTime, selectedSpecialty),
            stress: this.detectStressLevel(responseTime),
            engagement: this.calculateEngagementLevel()
        };

        const emotionalScore = this.calculateEmotionalComposite(emotionalIndicators);
        this.neuralNetwork.behavioralLayers.emotionalResponse.set(selectedSpecialty.id, emotionalScore);
    }

    processCognitiveLoadLayer(selectedSpecialty, responseTime) {
        // Análise da carga cognitiva durante a decisão
        const cognitiveFactors = {
            decisionComplexity: this.calculateDecisionComplexity(responseTime),
            informationProcessing: this.calculateInfoProcessingScore(selectedSpecialty),
            mentalEffort: this.calculateMentalEffort(responseTime),
            cognitiveEase: this.calculateCognitiveEase(selectedSpecialty),
            workingMemoryLoad: this.calculateWorkingMemoryLoad()
        };

        const cognitiveScore = Object.values(cognitiveFactors).reduce((sum, score) => sum + score, 0) / Object.keys(cognitiveFactors).length;
        this.neuralNetwork.behavioralLayers.cognitiveLoad.set(selectedSpecialty.id, cognitiveScore);
    }

    processConsistencyLayer(selectedSpecialty, rejectedSpecialty) {
        // Análise de consistência comportamental
        const consistencyMetrics = {
            choiceConsistency: this.calculateChoiceConsistency(selectedSpecialty.id),
            timeConsistency: this.calculateTimeConsistency(selectedSpecialty.id),
            patternConsistency: this.calculatePatternConsistency(selectedSpecialty),
            valueAlignment: this.calculateValueAlignment(selectedSpecialty)
        };

        const consistencyScore = Object.values(consistencyMetrics).reduce((sum, score) => sum + score, 0) / Object.keys(consistencyMetrics).length;
        this.neuralNetwork.behavioralLayers.consistency.set(selectedSpecialty.id, consistencyScore);
    }

    processContextualPreferenceLayer(selectedSpecialty, rejectedSpecialty) {
        // Análise de preferência contextual
        const contextualFactors = {
            roundContext: this.calculateRoundContextScore(selectedSpecialty),
            competitionContext: this.calculateCompetitionContext(selectedSpecialty, rejectedSpecialty),
            sessionContext: this.calculateSessionContext(),
            temporalContext: this.calculateTemporalContext(),
            adaptiveContext: this.calculateAdaptiveContext(selectedSpecialty)
        };

        const contextualScore = Object.values(contextualFactors).reduce((sum, score) => sum + score, 0) / Object.keys(contextualFactors).length;
        this.neuralNetwork.behavioralLayers.contextualPreference.set(selectedSpecialty.id, contextualScore);
    }

    calculateCompositeNeuralScore(specialty) {
        const layers = this.neuralNetwork.behavioralLayers;
        const weights = this.neuralNetwork.layerWeights;
        
        const scores = {
            timeAnalysis: layers.timeAnalysis.get(specialty.id) || 0,
            patternRecognition: layers.patternRecognition.get(specialty.id) || 0,
            emotionalResponse: layers.emotionalResponse.get(specialty.id) || 0,
            cognitiveLoad: layers.cognitiveLoad.get(specialty.id) || 0,
            consistency: layers.consistency.get(specialty.id) || 0,
            contextualPreference: layers.contextualPreference.get(specialty.id) || 0
        };

        // Score composto ponderado
        const compositeScore = Object.keys(scores).reduce((sum, key) => {
            return sum + (scores[key] * weights[key]);
        }, 0);

        // Aplicar função de ativação (sigmoide)
        const activatedScore = 1 / (1 + Math.exp(-compositeScore * 5));
        
        this.neuralNetwork.compositeScores.set(specialty.id, activatedScore);
        return activatedScore;
    }

    // ===================== FUNÇÕES AUXILIARES DA REDE NEURAL =====================

    calculateAdaptiveSpeedScore(responseTime) {
        const personalAverage = this.runningAverageAccepted || 4000;
        const deviation = Math.abs(responseTime - personalAverage) / personalAverage;
        return Math.max(0, 1 - deviation);
    }

    calculateTimeConsistency(specialtyId, responseTime) {
        const previousTimes = this.neuralNetwork.interactionHistory
            .filter(h => h.selectedId === specialtyId)
            .map(h => h.responseTime);
        
        if (previousTimes.length < 2) return 0.5;
        
        const variance = this.calculateVariance(previousTimes);
        return Math.max(0, 1 - (variance / 10000000)); // Normalizar variance
    }

    calculateFatigueAdjustment() {
        const sessionDuration = Date.now() - this.neuralNetwork.contextMetadata.sessionStartTime;
        const fatigueFactor = Math.max(0, 1 - (sessionDuration / 1800000)); // 30 min max
        return fatigueFactor;
    }

    detectEnthusiasm(responseTime, specialty) {
        // Entusiasmo = decisão rápida + padrão consistente
        const isQuick = responseTime < (this.runningAverageAccepted * 0.7);
        const hasPositiveHistory = this.getSpecialtyHistory(specialty.id).length > 0;
        return (isQuick ? 0.7 : 0.3) + (hasPositiveHistory ? 0.3 : 0);
    }

    detectConfidence(responseTime, specialty) {
        // Confiança = velocidade moderada + consistência
        const idealRange = responseTime > 1000 && responseTime < 5000;
        const consistency = this.calculateTimeConsistency(specialty.id, responseTime);
        return (idealRange ? 0.6 : 0.2) + (consistency * 0.4);
    }

    getSpecialtyHistory(specialtyId) {
        return this.neuralNetwork.interactionHistory.filter(h => h.selectedId === specialtyId);
    }

    // Implementações simplificadas (podem ser expandidas)
    calculateContextualSpeedScore(responseTime) { return 0.5; }
    detectSelectionBias(option) { return 0.5; }
    detectCategoryPreference(specialty) { return 0.5; }
    detectSequentialPattern(specialtyId) { return 0.5; }
    detectTimePattern(responseTime) { return 0.5; }
    calculateChoiceStability(specialtyId) { return 0.5; }
    detectHesitation(responseTime) { return responseTime > 8000 ? 0.8 : 0.2; }
    detectStressLevel(responseTime) { return responseTime > 10000 ? 0.8 : 0.2; }
    calculateEngagementLevel() { return 0.7; }
    calculateEmotionalComposite(indicators) { return Object.values(indicators).reduce((s, v) => s + v, 0) / Object.keys(indicators).length; }
    calculateDecisionComplexity(responseTime) { return Math.min(1, responseTime / 10000); }
    calculateInfoProcessingScore(specialty) { return specialty.descricao.length > 200 ? 0.8 : 0.4; }
    calculateMentalEffort(responseTime) { return Math.min(1, responseTime / 8000); }
    calculateCognitiveEase(specialty) { return 1 - (specialty.nome.length / 50); }
    calculateWorkingMemoryLoad() { return Math.min(1, this.totalDecisions / 20); }
    calculateChoiceConsistency(specialtyId) { return this.getSpecialtyHistory(specialtyId).length > 0 ? 0.8 : 0.3; }
    calculatePatternConsistency(specialty) { return 0.5; }
    calculateValueAlignment(specialty) { return 0.5; }
    calculateRoundContextScore(specialty) { return 1 - (this.currentRoundIndex / 4); }
    calculateCompetitionContext(selected, rejected) { return 0.5; }
    calculateSessionContext() { return 0.7; }
    calculateTemporalContext() { return 0.6; }
    calculateAdaptiveContext(specialty) { return 0.5; }

    calculateConfidenceScore(specialty, responseTime) {
        return this.neuralNetwork.compositeScores.get(specialty.id) || 0.5;
    }

    calculateDeliberationScore(specialty, responseTime) {
        return Math.min(1, responseTime / 10000);
    }

    detectMicroBehaviors(responseTime, specialty) {
        // Detectar micro-comportamentos para refinamento futuro
        if (responseTime < 1500) this.microBehaviors.confidence.push({specialty, responseTime});
        if (responseTime > 8000) this.microBehaviors.hesitation.push({specialty, responseTime});
        if (responseTime > 15000) this.microBehaviors.fatigue.push({specialty, responseTime});
    }

    updateUserBehaviorProfile() {
        // Atualizar perfil comportamental do usuário
        this.neuralNetwork.contextMetadata.userBehaviorProfile = {
            avgResponseTime: this.runningAverageAccepted,
            decisionStyle: this.classifyDecisionStyle(),
            consistency: this.calculateOverallConsistency(),
            engagement: this.calculateOverallEngagement(),
            cognitiveProfile: this.generateCognitiveProfile()
        };
    }

    classifyDecisionStyle() {
        if (this.runningAverageAccepted < 3000) return "Intuitivo";
        if (this.runningAverageAccepted > 7000) return "Analítico";
        return "Equilibrado";
    }

    calculateOverallConsistency() {
        return 0.7; // Implementação simplificada
    }

    calculateOverallEngagement() {
        return Math.max(0, 1 - (this.microBehaviors.fatigue.length / this.totalDecisions));
    }

    generateCognitiveProfile() {
        return {
            processingSpeed: this.runningAverageAccepted < 4000 ? "Rápido" : "Moderado",
            decisionConfidence: this.microBehaviors.confidence.length / Math.max(1, this.totalDecisions),
            cognitiveLoad: this.microBehaviors.hesitation.length / Math.max(1, this.totalDecisions)
        };
    }

    displayNeuralFeedback(specialty, responseTime) {
        // Feedback visual da rede neural em tempo real
        const neuralScore = this.neuralNetwork.compositeScores.get(specialty.id) || 0;
        const confidence = this.calculateConfidenceScore(specialty, responseTime);
        
        console.log(`🧠 Neural Score: ${(neuralScore * 100).toFixed(1)}% | Confidence: ${(confidence * 100).toFixed(1)}% | ${specialty.nome}`);
    }

    // ===================== FIM DA REDE NEURAL =====================

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
        // Reordenar aleatoriamente os vencedores para a próxima rodada
        this.currentRound = this.shuffleArray([...this.winners]);
        this.winners = [];
        this.currentMatch = 0;
        this.totalMatches = this.currentRound.length / 2;
        this.currentRoundIndex++;
        
        console.log(`Rodada ${this.currentRoundIndex + 1} - ${this.roundNames[this.currentRoundIndex]} com resorteio:`, 
                   this.currentRound.map(s => s.nome));
        
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

        // Exibir análise neural completa
        this.showNeuralAnalysis();

        // Animação de confete (simulada)
        this.showConfetti();
    }

    showNeuralAnalysis() {
        const neuralResultsHTML = this.displayNeuralResults();
        const analysisContainer = document.getElementById('preferences-analysis');
        
        if (analysisContainer) {
            analysisContainer.innerHTML += neuralResultsHTML;
        }
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
        // Separar todas as escolhas em aceitas e rejeitadas
        const acceptedChoices = this.choiceTimings.filter(c => c.wasSelected);
        const rejectedChoices = this.choiceTimings.filter(c => !c.wasSelected);

        // Top 3 especialidades que mais gostou (escolhas mais rápidas entre as aceitas)
        const topPreferences = acceptedChoices
            .sort((a, b) => a.responseTime - b.responseTime)
            .slice(0, 3);

        const topList = document.getElementById('top-preferences-list');
        topList.innerHTML = '';
        if (topPreferences.length > 0) {
            topPreferences.forEach((choice, index) => {
                const li = document.createElement('li');
                const emoji = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';
                li.innerHTML = `
                    <div>
                        ${emoji} <strong>${choice.specialty.nome}</strong>
                        <br><small class="text-muted">${choice.specialty.formacao}</small>
                    </div>
                    <span class="time-badge">${(choice.responseTime / 1000).toFixed(1)}s</span>
                `;
                topList.appendChild(li);
            });
        } else {
            topList.innerHTML = '<li><em>Ainda não há dados suficientes para análise.</em></li>';
        }

        // 3 especialidades que menos gostou (rejeições mais rápidas)
        const leastPreferences = rejectedChoices
            .sort((a, b) => a.responseTime - b.responseTime)
            .slice(0, 3);

        const leastList = document.getElementById('least-preferences-list');
        leastList.innerHTML = '';
        if (leastPreferences.length > 0) {
            leastPreferences.forEach((choice, index) => {
                const li = document.createElement('li');
                const emoji = index === 0 ? '👎' : index === 1 ? '😐' : '🤔';
                li.innerHTML = `
                    <div>
                        ${emoji} <strong>${choice.specialty.nome}</strong>
                        <br><small class="text-muted">${choice.specialty.formacao}</small>
                    </div>
                    <span class="time-badge">${(choice.responseTime / 1000).toFixed(1)}s</span>
                `;
                leastList.appendChild(li);
            });
        } else {
            leastList.innerHTML = '<li><em>Ainda não há dados suficientes para análise.</em></li>';
        }

        // 3 especialidades para pesquisar mais (decisões mais lentas entre as aceitas)
        const researchMore = acceptedChoices
            .sort((a, b) => b.responseTime - a.responseTime)
            .slice(0, 3);

        const researchList = document.getElementById('research-more-list');
        researchList.innerHTML = '';
        if (researchMore.length > 0) {
            researchMore.forEach((choice, index) => {
                const li = document.createElement('li');
                const emoji = index === 0 ? '🧠' : index === 1 ? '🤓' : '📚';
                li.innerHTML = `
                    <div>
                        ${emoji} <strong>${choice.specialty.nome}</strong>
                        <br><small class="text-muted">${choice.specialty.formacao}</small>
                    </div>
                    <span class="time-badge">${(choice.responseTime / 1000).toFixed(1)}s</span>
                `;
                researchList.appendChild(li);
            });
        } else {
            researchList.innerHTML = '<li><em>Ainda não há dados suficientes para análise.</em></li>';
        }

        // Adicionar estatísticas gerais
        this.showGeneralStats(acceptedChoices, rejectedChoices);
    }

    showGeneralStats(acceptedChoices, rejectedChoices) {
        const avgAcceptedTime = acceptedChoices.length > 0 
            ? acceptedChoices.reduce((sum, c) => sum + c.responseTime, 0) / acceptedChoices.length 
            : 0;
        
        const avgRejectedTime = rejectedChoices.length > 0 
            ? rejectedChoices.reduce((sum, c) => sum + c.responseTime, 0) / rejectedChoices.length 
            : 0;

        // Adicionar insights baseados nas médias progressivas e comportamento
        let insights = [];
        
        // Insights sobre velocidade de decisão
        if (this.runningAverageAccepted > this.runningAverageRejected + 1000) {
            insights.push("🎯 Você reflete mais antes de escolher suas preferências!");
        } else if (this.runningAverageRejected > this.runningAverageAccepted + 1000) {
            insights.push("⚡ Você decide rápido o que gosta, mas pondera mais nas rejeições!");
        } else {
            insights.push("⚖️ Você mantém um bom equilíbrio entre decisões rápidas e reflexivas!");
        }

        // Insights sobre padrão de escolha
        if (this.runningAverageAccepted < 3000) {
            insights.push("🚀 Suas escolhas são muito intuitivas!");
        } else if (this.runningAverageAccepted > 7000) {
            insights.push("🤔 Você é muito cauteloso e analítico nas escolhas!");
        }

        // Insights sobre consistência
        const acceptedVariance = this.calculateVariance(acceptedChoices.map(c => c.responseTime));
        if (acceptedVariance < 2000000) { // Baixa variância
            insights.push("🎯 Você é muito consistente em suas decisões!");
        } else if (acceptedVariance > 5000000) { // Alta variância
            insights.push("🌊 Suas decisões variam bastante - algumas rápidas, outras mais pensadas!");
        }

        // Insight sobre adaptação (sistema de médias progressivas)
        insights.push(`📊 Sistema adaptativo: Suas médias foram ${(this.runningAverageAccepted/1000).toFixed(1)}s (aceitos) e ${(this.runningAverageRejected/1000).toFixed(1)}s (rejeitados)`);

        // Adicionar seção de insights se não existir
        if (!document.getElementById('insights-section')) {
            const analysisContainer = document.querySelector('.analysis-container');
            const insightsHtml = `
                <div id="insights-section" class="analysis-section" style="border-left-color: #9f7aea; background: linear-gradient(135deg, rgba(159, 122, 234, 0.1), rgba(129, 90, 213, 0.1));">
                    <div class="analysis-title">
                        <i class="fas fa-lightbulb text-primary"></i>
                        <span>Insights sobre seu Perfil</span>
                    </div>
                    <ul class="analysis-list" id="insights-list"></ul>
                </div>
            `;
            analysisContainer.insertAdjacentHTML('beforeend', insightsHtml);
        }

        const insightsList = document.getElementById('insights-list');
        insightsList.innerHTML = '';
        insights.forEach(insight => {
            const li = document.createElement('li');
            li.innerHTML = `<div>${insight}</div>`;
            insightsList.appendChild(li);
        });
    }

    calculateVariance(values) {
        if (values.length === 0) return 0;
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
        const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
        return squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
    }

    setupMobileInteractions() {
        console.log('Sistema simplificado ativo - usando botões diretos');
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
        
        // Reabilitar após delay (tempo suficiente para processar)
        setTimeout(() => {
            allButtons.forEach(btn => {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-check"></i> Escolher';
            });
        }, 1000);
    }

        // Sistema de seleção simplificado com duplo clique
        const handleSelection = (optionNumber) => {
            console.log(`Clique detectado na opção ${optionNumber}, selectedOption atual: ${this.selectedOption}`);
            
            // Primeiro clique - selecionar visualmente
            if (!this.selectedOption) {
                // Remover seleção anterior
                option1.classList.remove('selected');
                option2.classList.remove('selected');
                
                // Adicionar seleção atual
                if (optionNumber === 1) {
                    option1.classList.add('selected');
                } else {
                    option2.classList.add('selected');
                }
                
                // Marcar como selecionado
                this.selectedOption = optionNumber;
                this.showSelectionFeedback(optionNumber);
                // NÃO mostrar botão - só duplo clique
                console.log(`Primeira seleção feita: opção ${optionNumber}`);
                return;
            }
            
            // Segundo clique na mesma opção - confirmar
            if (this.selectedOption === optionNumber) {
                console.log(`Confirmando seleção da opção ${optionNumber}`);
                this.confirmSelection(optionNumber);
                return;
            }
            
            // Clique em opção diferente - trocar seleção
            console.log(`Trocando seleção para opção ${optionNumber}`);
            option1.classList.remove('selected');
            option2.classList.remove('selected');
            
            // Limpar feedback anterior
            const feedbacks = document.querySelectorAll('.selection-feedback');
            feedbacks.forEach(feedback => feedback.remove());
            
            if (optionNumber === 1) {
                option1.classList.add('selected');
            } else {
                option2.classList.add('selected');
            }
            
            this.selectedOption = optionNumber;
            this.showSelectionFeedback(optionNumber);
        };

        // Event listeners simplificados
        const addClickListener = (element, optionNumber) => {
            // Remover listeners existentes
            element.replaceWith(element.cloneNode(true));
            const newElement = document.getElementById(element.id);
            
            // Adicionar apenas um listener unificado
            newElement.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSelection(optionNumber);
            });
            
            return newElement;
        };

        // Aplicar listeners
        const newOption1 = addClickListener(option1, 1);
        const newOption2 = addClickListener(option2, 2);
    }

    showSelectionFeedback(optionNumber) {
        console.log(`Mostrando feedback para opção ${optionNumber}`);
        
        // Remover todos os feedbacks existentes primeiro
        const allFeedbacks = document.querySelectorAll('.selection-feedback');
        allFeedbacks.forEach(f => f.remove());
        
        // Feedback visual para indicar que precisa clicar novamente para confirmar
        const selectedCard = document.getElementById(`option${optionNumber}`);
        if (!selectedCard) return;
        
        const feedbackElement = document.createElement('div');
        feedbackElement.className = 'selection-feedback';
        feedbackElement.style.cssText = `
            position: absolute;
            top: 10px;
            left: 15px;
            background: #fff;
            color: #333;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: bold;
            z-index: 10;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            animation: pulse 2s infinite;
        `;
        feedbackElement.textContent = 'Clique novamente para confirmar';
        
        selectedCard.appendChild(feedbackElement);

        // Adicionar CSS da animação se não existir
        if (!document.getElementById('pulse-animation')) {
            const style = document.createElement('style');
            style.id = 'pulse-animation';
            style.textContent = `
                @keyframes pulse {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.02); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    confirmSelection(optionNumber) {
        console.log(`Confirmando seleção final da opção ${optionNumber}`);
        
        // Verificar se já está processando para evitar loop infinito
        if (this.isProcessing) {
            console.warn('Já processando uma seleção, ignorando confirmação duplicada');
            return;
        }
        
        this.isProcessing = true;
        
        // Limpar feedback visual
        const selectedCard = document.getElementById(`option${optionNumber}`);
        const feedback = selectedCard.querySelector('.selection-feedback');
        if (feedback) {
            feedback.remove();
        }
        
        // Desabilitar cliques para evitar dupla confirmação
        const option1 = document.getElementById('option1');
        const option2 = document.getElementById('option2');
        option1.style.pointerEvents = 'none';
        option2.style.pointerEvents = 'none';
        
        // Executar lógica de seleção original
        setTimeout(() => {
            this.selectOption(optionNumber);
            // Reabilitar cliques após processamento
            option1.style.pointerEvents = 'auto';
            option2.style.pointerEvents = 'auto';
        }, 100);
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
