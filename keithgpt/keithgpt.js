/* ========================================
   KEITH STUDIO - INNER UNIVERSE CHAT ROOM
   FULLY UPGRADED: Name entry, Clear, Save/Copy, Intensity levels, Private chat
   ======================================== */

class KeithUniverse {
    constructor() {
        this.sessionTimer = null;
        this.autoEventTimer = null;
        this.isProcessing = false;
        this.conversationHistory = [];
        this.guestAppearanceTimer = null;
        this.lastResponder = null;
        this.recentResponses = [];
        this.activePersonaResponses = new Set();
        this.isPaused = false;
        this.pausedTimers = [];
        // NEW: Private chat system
        this.privateChats = {};
        this.currentPrivateChat = null;
    }

    // ========================================
    // INITIALIZATION (UPGRADED)
    // ========================================

    initializeUniverse() {
        this.setupEventListeners();
        this.startSession();
        this.displayWelcomeMessage();
        this.startAutoEvents();
        this.updateIntensityDisplay();
        console.log(`🎭 Keith's Inner Universe activated - ${getCurrentIntensityConfig().name} Mode`);
    }

    setupEventListeners() {
        // User input (simplified - no separate name input)
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        
        if (chatInput) {
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendUserMessage();
                }
            });
            chatInput.addEventListener('input', () => this.updateSendButton());
        }
        
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendUserMessage());
        }

        // NEW: Enhanced control buttons
        const newSessionBtn = document.getElementById('newSession');
        const toggleUserList = document.getElementById('toggleUserList');
        const mobileOverlay = document.getElementById('mobileOverlay');
        const pauseChatBtn = document.getElementById('pauseChat');
        const clearChatBtn = document.getElementById('clearChat');
        const saveChatBtn = document.getElementById('saveChat');
        const copyChatBtn = document.getElementById('copyChat');

        if (newSessionBtn) newSessionBtn.addEventListener('click', () => this.startNewSession());
        if (toggleUserList) toggleUserList.addEventListener('click', () => this.toggleUserList());
        if (mobileOverlay) mobileOverlay.addEventListener('click', () => this.closeUserList());
        if (pauseChatBtn) pauseChatBtn.addEventListener('click', () => this.togglePauseChat());
        if (clearChatBtn) clearChatBtn.addEventListener('click', () => this.clearChat());
        if (saveChatBtn) saveChatBtn.addEventListener('click', () => this.saveChat());
        if (copyChatBtn) copyChatBtn.addEventListener('click', () => this.copyChat());

        // NEW: Private chat event listeners
        this.setupPrivateChatListeners();
        this.setupPersonaRightClick();
    }

    // ========================================
    // NEW: CHAT MANAGEMENT FEATURES
    // ========================================

    clearChat() {
        // Clear visual messages but keep personas active
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.innerHTML = '';
        }
        
        // Reset conversation history but keep session state
        this.conversationHistory = [];
        this.recentResponses = [];
        sessionState.chatLog = [];
        
        // Add system message
        this.addSystemMessage('🗑️ Chat cleared. Personas remain active and ready to continue the conversation.');
        
        // Trigger a brief resume message from a random persona
        setTimeout(() => {
            const resumeMessages = {
                'kool-keith': 'Abstract energy flowing fresh through the clean slate',
                'dr-octagon': 'Cosmic consciousness reset and ready for new dimensional experiences',
                'dr-dooom': 'Clean slate means more room for real talk',
                'black-elvis': 'Fresh start brings positive funk energy to the club'
            };
            
            const personas = Object.keys(resumeMessages);
            const speaker = personas[Math.floor(Math.random() * personas.length)];
            const message = resumeMessages[speaker];
            
            this.generatePersonaResponse(speaker, `${speaker} commenting on chat reset`, message);
        }, 2000);
    }

    async saveChat() {
        try {
            const chatContent = this.generateChatLog();
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
            const filename = `KeithGPT-Chat-${timestamp}.txt`;
            
            // Create downloadable file
            const blob = new Blob([chatContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            // Create temporary download link
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.addSystemMessage(`💾 Chat saved as ${filename}`);
            
        } catch (error) {
            console.error('Save chat error:', error);
            this.addSystemMessage('❌ Error saving chat. Please try again.');
        }
    }

    async copyChat() {
        try {
            const chatContent = this.generateChatLog();
            
            // Copy to clipboard
            await navigator.clipboard.writeText(chatContent);
            this.addSystemMessage('📋 Chat copied to clipboard!');
            
        } catch (error) {
            console.error('Copy chat error:', error);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = this.generateChatLog();
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.addSystemMessage('📋 Chat copied to clipboard!');
        }
    }

    generateChatLog() {
        const intensityConfig = getCurrentIntensityConfig();
        const startTime = sessionState.sessionStartTime || sessionState.startTime;
        const duration = sessionState.startTime ? Math.floor((Date.now() - sessionState.startTime) / 1000) : 0;
        
        let content = `========================================
KEITHGPT - THE PLAYERS CLUB CHAT LOG
========================================

Session Details:
- Date: ${new Date().toLocaleString()}
- Duration: ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}
- User: ${sessionState.userName}
- Intensity Level: ${intensityConfig.display}
- Personas Active: ${sessionState.personasActive.join(', ')}

========================================
CHAT MESSAGES:
========================================

`;

        // Add all messages from chat log
        if (sessionState.chatLog && sessionState.chatLog.length > 0) {
            sessionState.chatLog.forEach(entry => {
                const timestamp = new Date(entry.timestamp).toLocaleTimeString();
                content += `[${timestamp}] ${entry.speaker}: ${entry.message}\n`;
            });
        } else {
            // Fallback: extract from conversation history
            this.conversationHistory.forEach(entry => {
                content += `${entry.speaker}: ${entry.content}\n`;
            });
        }

        content += `\n========================================
END OF CHAT LOG
Generated by KeithGPT - The Players Club
Experience Keith's Inner Universe at ultrakeith.com
========================================`;

        return content;
    }

    // ========================================
    // NEW: INTENSITY LEVEL MANAGEMENT
    // ========================================

    updateIntensityDisplay() {
        const intensityDisplay = document.getElementById('intensityDisplay');
        if (intensityDisplay) {
            const config = getCurrentIntensityConfig();
            intensityDisplay.textContent = config.display;
            intensityDisplay.style.color = {
                1: '#66ff66', // Green for Tame
                2: '#ffaa00', // Orange for Players
                3: '#ff6666'  // Red for Wild
            }[sessionState.intensityLevel] || '#ffaa00';
        }
    }

    // ========================================
    // NEW: PRIVATE CHAT SYSTEM
    // ========================================

    setupPrivateChatListeners() {
        const closePrivateBtn = document.getElementById('closePrivateChat');
        const privateChatInput = document.getElementById('privateChatInput');
        const sendPrivateBtn = document.getElementById('sendPrivateBtn');
        const privateChatOverlay = document.getElementById('privateChatOverlay');

        if (closePrivateBtn) {
            closePrivateBtn.addEventListener('click', () => this.closePrivateChat());
        }

        if (privateChatOverlay) {
            privateChatOverlay.addEventListener('click', (e) => {
                if (e.target === privateChatOverlay) {
                    this.closePrivateChat();
                }
            });
        }

        if (privateChatInput) {
            privateChatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.sendPrivateMessage();
                }
            });
        }

        if (sendPrivateBtn) {
            sendPrivateBtn.addEventListener('click', () => this.sendPrivateMessage());
        }
    }

    setupPersonaRightClick() {
        // Add right-click context menu to persona items
        const personaItems = document.querySelectorAll('.persona-item');
        
        personaItems.forEach(item => {
            item.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                const persona = item.getAttribute('data-persona');
                if (persona) {
                    this.openPrivateChat(persona);
                }
            });
            
            // Also add click handler for mobile/touch devices
            item.addEventListener('dblclick', (e) => {
                e.preventDefault();
                const persona = item.getAttribute('data-persona');
                if (persona) {
                    this.openPrivateChat(persona);
                }
            });
        });
    }

    openPrivateChat(persona) {
        const personaData = mainPersonas[persona];
        if (!personaData) return;

        this.currentPrivateChat = persona;
        
        // Initialize private chat if doesn't exist
        if (!this.privateChats[persona]) {
            this.privateChats[persona] = {
                messages: [],
                lastActivity: Date.now()
            };
        }

        // Update UI
        const overlay = document.getElementById('privateChatOverlay');
        const title = document.getElementById('privateChatTitle');
        const messages = document.getElementById('privateChatMessages');

        if (title) {
            title.textContent = `Private Chat with ${personaData.name}`;
        }

        if (messages) {
            messages.innerHTML = '';
            
            // Show existing messages
            this.privateChats[persona].messages.forEach(msg => {
                this.addPrivateMessage(msg.speaker, msg.content, false);
            });

            // Add welcome message if first time
            if (this.privateChats[persona].messages.length === 0) {
                const welcomeMessages = {
                    'kool-keith': 'Abstract one-on-one conversation activated. What\'s your creative vision?',
                    'dr-octagon': 'Private cosmic consultation initiated. Describe your dimensional concerns.',
                    'dr-dooom': 'Private execution chamber opened. What needs real discussion?',
                    'black-elvis': 'Personal funk therapy session beginning. What\'s on your mind?'
                };
                
                const welcome = welcomeMessages[persona] || 'Private chat activated.';
                this.addPrivateMessage(personaData.name, welcome, true);
            }
        }

        if (overlay) {
            overlay.style.display = 'flex';
            overlay.classList.add('show');
        }

        // Focus input
        const input = document.getElementById('privateChatInput');
        if (input) {
            setTimeout(() => input.focus(), 100);
        }
    }

    closePrivateChat() {
        const overlay = document.getElementById('privateChatOverlay');
        if (overlay) {
            overlay.classList.remove('show');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
        }
        this.currentPrivateChat = null;
    }

    async sendPrivateMessage() {
        const input = document.getElementById('privateChatInput');
        if (!input || !this.currentPrivateChat) return;

        const message = input.value.trim();
        if (!message) return;

        const persona = this.currentPrivateChat;
        const personaData = mainPersonas[persona];
        
        // Add user message
        this.addPrivateMessage(sessionState.userName, message, true);
        input.value = '';

        // Generate persona response
        setTimeout(async () => {
            const context = `Private one-on-one conversation with ${sessionState.userName} who said: "${message}"`;
            const response = await this.generatePrivatePersonaResponse(persona, context);
            this.addPrivateMessage(personaData.name, response, true);
        }, 1000 + Math.random() * 2000);
    }

    addPrivateMessage(speaker, content, saveToHistory = true) {
        const messages = document.getElementById('privateChatMessages');
        if (!messages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `private-message ${speaker === sessionState.userName ? 'user' : 'persona'}`;
        
        const personaData = Object.values(mainPersonas).find(p => p.name === speaker);
        const isPersona = !!personaData;
        
        messageDiv.innerHTML = `
            ${isPersona ? `<img src="${personaData.avatar}" alt="${speaker}" class="private-avatar">` : ''}
            <div class="private-message-content">
                <strong>${this.escapeHtml(speaker)}:</strong> ${this.escapeHtml(content)}
            </div>
        `;

        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;

        // Save to private chat history
        if (saveToHistory && this.currentPrivateChat && this.privateChats[this.currentPrivateChat]) {
            this.privateChats[this.currentPrivateChat].messages.push({
                speaker,
                content,
                timestamp: Date.now()
            });
        }
    }

    async generatePrivatePersonaResponse(persona, context) {
        try {
            const prompt = this.buildPrivateChatPrompt(persona, context);
            const response = await this.callChatAPI(prompt);
            return response;
        } catch (error) {
            console.error('Private chat response error:', error);
            return this.getPrivateFallbackResponse(persona);
        }
    }

    buildPrivateChatPrompt(persona, context) {
        const knowledge = getCharacterKnowledge(persona);
        const personaData = mainPersonas[persona];
        const intensityConfig = getCurrentIntensityConfig();
        
        return `${knowledge}

PRIVATE CONVERSATION MODE: One-on-one chat with ${sessionState.userName}
INTENSITY LEVEL: ${intensityConfig.name} - ${intensityConfig.description}

PRIVATE CHAT CONTEXT: ${context}

This is a personal conversation, not the group chat room. You can be more:
- Direct and focused on the user
- Detailed in your responses (2-4 sentences)
- Personal and engaging
- Authentic to your character while being conversational

Respond as ${personaData.name} in a private setting, maintaining your personality but being more attentive to the individual user's input.`;
    }

    getPrivateFallbackResponse(persona) {
        const fallbacks = {
            'kool-keith': 'Abstract connection established... what\'s your creative question?',
            'dr-octagon': 'Private cosmic frequency open for communication...',
            'dr-dooom': 'Real talk in the private chamber... what\'s the situation?',
            'black-elvis': 'Personal funk session activated... what\'s on your mind?'
        };
        
        return fallbacks[persona] || 'Private connection active...';
    }

    // ========================================
    // PAUSE CHAT FUNCTIONALITY
    // ========================================

    togglePauseChat() {
        this.isPaused = !this.isPaused;
        const pauseBtn = document.getElementById('pauseChat');
        
        if (this.isPaused) {
            this.pauseChat();
            if (pauseBtn) {
                pauseBtn.innerHTML = '▶️ Resume';
                pauseBtn.style.background = 'var(--status-warning)';
            }
            this.addSystemMessage('⏸️ Chat paused - personas will stop talking. Click Resume to continue.');
        } else {
            this.resumeChat();
            if (pauseBtn) {
                pauseBtn.innerHTML = '⏸️ Pause';
                pauseBtn.style.background = 'var(--bg-tertiary)';
            }
            this.addSystemMessage('▶️ Chat resumed - personas are back in conversation.');
        }
    }

    pauseChat() {
        if (this.autoEventTimer) {
            clearInterval(this.autoEventTimer);
            this.autoEventTimer = null;
        }
        if (this.guestAppearanceTimer) {
            clearTimeout(this.guestAppearanceTimer);
            this.guestAppearanceTimer = null;
        }
        
        this.hideTyping();
        this.isProcessing = false;
        this.activePersonaResponses.clear();
    }

    resumeChat() {
        if (sessionState.startTime) {
            this.autoEventTimer = setInterval(() => {
                if (!this.isPaused) {
                    this.triggerRandomEvent();
                }
            }, 15000 + Math.random() * 30000);
            
            this.scheduleGuestAppearance();
            
            setTimeout(() => {
                if (!this.isPaused) {
                    this.triggerResumeConversation();
                }
            }, 2000);
        }
    }

    async triggerResumeConversation() {
        const resumeComments = {
            'dr-dooom': 'Y\'all ready for more real talk?',
            'dr-octagon': 'Cosmic consciousness never truly pauses...',
            'kool-keith': 'Abstract energy flowing again through the club',
            'black-elvis': 'Funk therapy session back in progress'
        };
        
        const personas = Object.keys(resumeComments);
        const speaker = personas[Math.floor(Math.random() * personas.length)];
        const comment = resumeComments[speaker];
        
        const uniqueContext = `${speaker} resume conversation comment`;
        await this.generatePersonaResponse(speaker, uniqueContext, comment);
    }

    // ========================================
    // MOBILE USER LIST TOGGLE
    // ========================================

    toggleUserList() {
        const userList = document.getElementById('userList');
        const overlay = document.getElementById('mobileOverlay');
        const toggleBtn = document.getElementById('toggleUserList');
        
        if (userList && overlay) {
            const isShowing = userList.classList.contains('show');
            
            if (isShowing) {
                userList.classList.remove('show');
                overlay.classList.remove('show');
                if (toggleBtn) toggleBtn.style.background = 'var(--bg-tertiary)';
            } else {
                userList.classList.add('show');
                overlay.classList.add('show');
                if (toggleBtn) toggleBtn.style.background = 'var(--primary-silver-subtle)';
            }
        }
    }

    closeUserList() {
        const userList = document.getElementById('userList');
        const overlay = document.getElementById('mobileOverlay');
        const toggleBtn = document.getElementById('toggleUserList');
        
        if (userList && overlay) {
            userList.classList.remove('show');
            overlay.classList.remove('show');
            if (toggleBtn) toggleBtn.style.background = 'var(--bg-tertiary)';
        }
    }

    // ========================================
    // SESSION MANAGEMENT
    // ========================================

    startSession() {
        sessionState.startTime = Date.now();
        sessionState.sessionStartTime = Date.now();
        sessionState.tokensUsed = 0;
        sessionState.userLurking = true;
        sessionState.chatLog = [];
        
        this.startSessionTimer();
        this.updateSessionDisplay();
    }

    startSessionTimer() {
        this.sessionTimer = setInterval(() => {
            const elapsed = Date.now() - sessionState.startTime;
            const remaining = CONFIG.sessionDuration - elapsed;
            
            if (remaining <= 0) {
                this.endSession();
                return;
            }
            
            this.updateSessionDisplay(remaining);
        }, 1000);
    }

    updateSessionDisplay(remaining = null) {
        const timerEl = document.getElementById('sessionTimer');
        if (!timerEl) return;
        
        if (remaining === null) {
            remaining = CONFIG.sessionDuration - (Date.now() - sessionState.startTime);
        }
        
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        timerEl.textContent = `Session: ${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (remaining < 60000) {
            timerEl.style.color = 'var(--status-warning)';
        }
    }

    endSession() {
        clearInterval(this.sessionTimer);
        clearInterval(this.autoEventTimer);
        clearTimeout(this.guestAppearanceTimer);
        
        this.addSystemMessage('🎭 Studio session complete! Thanks for experiencing Keith\'s Inner Universe.\n\nClick "New" to start another session.');
        
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        if (chatInput) chatInput.disabled = true;
        if (sendBtn) sendBtn.disabled = true;
    }

    startNewSession() {
        this.clearMessages();
        sessionState = {
            startTime: null,
            tokensUsed: 0,
            personasActive: ['kool-keith', 'dr-octagon', 'dr-dooom', 'black-elvis'],
            currentTopic: null,
            battleInProgress: false,
            userLurking: true,
            lastActivity: null,
            lastSpeaker: null,
            conversationFlow: 'natural',
            recentContexts: [],
            userName: sessionState.userName, // Keep user name
            intensityLevel: sessionState.intensityLevel, // Keep intensity level
            chatLog: [],
            sessionStartTime: null
        };
        
        this.recentResponses = [];
        this.activePersonaResponses.clear();
        this.privateChats = {}; // Reset private chats
        
        this.isPaused = false;
        const pauseBtn = document.getElementById('pauseChat');
        if (pauseBtn) {
            pauseBtn.innerHTML = '⏸️ Pause';
            pauseBtn.style.background = 'var(--bg-tertiary)';
        }
        
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        if (chatInput) {
            chatInput.disabled = false;
            chatInput.style.color = 'var(--text-primary)';
        }
        if (sendBtn) sendBtn.disabled = false;
        
        this.startSession();
        this.displayWelcomeMessage();
        this.startAutoEvents();
    }

    // ========================================
    // AUTO EVENTS & CONVERSATIONS (Enhanced)
    // ========================================

    startAutoEvents() {
        setTimeout(() => this.personasEnterChat(), 2000);
        
        this.autoEventTimer = setInterval(() => {
            this.triggerRandomEvent();
        }, 15000 + Math.random() * 30000);
        
        this.scheduleGuestAppearance();
    }

    async triggerRandomEvent() {
        if (this.isProcessing || sessionState.battleInProgress || this.isPaused) return;
        
        const events = [
            () => this.triggerSpontaneousArgument(),
            () => this.triggerTopicChange(),
            () => this.triggerPersonaConflict(),
            () => this.triggerGuestAppearance()
        ];
        
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        await randomEvent();
    }

    async triggerSpontaneousArgument() {
        if (this.isPaused) return;
        
        const conflicts = Object.keys(conflictTriggers);
        const conflict = conflicts[Math.floor(Math.random() * conflicts.length)];
        const trigger = conflictTriggers[conflict];
        
        // Use intensity-adjusted probability
        const adjustedProbability = getIntensityAdjustedProbability(trigger.baseProbability || 0.5, trigger.initiator);
        if (Math.random() > adjustedProbability) return;
        
        const initiator = trigger.initiator;
        const intensityLevel = sessionState.intensityLevel;
        const lines = trigger.trigger_lines[intensityLevel] || trigger.trigger_lines[2] || trigger.trigger_lines;
        const line = Array.isArray(lines) ? lines[Math.floor(Math.random() * lines.length)] : lines;
        
        this.addPersonaMessage(initiator, line);
        
        setTimeout(async () => {
            if (this.isPaused) return;
            
            if (trigger.target === 'any') {
                const targets = sessionState.personasActive.filter(p => p !== initiator);
                const target = targets[Math.floor(Math.random() * targets.length)];
                
                const uniqueContext = `${mainPersonas[trigger.target].name} ${mainPersonas[trigger.target].conflictStyle} rebuttal to ${mainPersonas[initiator].name}'s ${getCurrentIntensityConfig().name} level attack: "${line}"`;
                await this.generatePersonaResponse(trigger.target, uniqueContext);
            }
        }, 3000 + Math.random() * 2000);
    }

    // ========================================
    // NATURAL CONVERSATION ENGINE (Enhanced)
    // ========================================

    async startNaturalConversation() {
        if (this.isPaused) return;
        
        const topic = conversationTopics[Math.floor(Math.random() * conversationTopics.length)];
        sessionState.currentTopic = topic.topic;
        
        const starter = topic.starters[Math.floor(Math.random() * topic.starters.length)];
        
        // Get intensity-appropriate line
        const intensityLevel = sessionState.intensityLevel;
        const line = starter.lines[intensityLevel] || starter.lines[2] || starter.lines;
        
        setTimeout(async () => {
            if (this.isPaused) return;
            
            await this.addPersonaMessageWithTyping(starter.persona, line);
            this.scheduleTopicFollowUps(topic, line);
            
        }, this.getRandomTiming('normalResponse'));
    }

    scheduleTopicFollowUps(topic, triggerLine) {
        // Enhanced follow-ups based on intensity level
        topic.followUps?.forEach(followUp => {
            if (triggerLine.toLowerCase().includes(followUp.trigger)) {
                const availablePersonas = sessionState.personasActive.filter(p => 
                    p !== sessionState.lastSpeaker
                );
                
                followUp.responses.forEach((response, index) => {
                    if (availablePersonas[index]) {
                        setTimeout(async () => {
                            const uniqueContext = `${availablePersonas[index]} topic follow-up #${index + 1} about ${topic.topic} at ${getCurrentIntensityConfig().name} level`;
                            await this.addPersonaMessageWithTyping(
                                availablePersonas[index], 
                                response,
                                uniqueContext
                            );
                        }, this.getRandomTiming('normalResponse') * (index + 1));
                    }
                });
            }
        });
        
        setTimeout(() => {
            this.triggerTopicChange();
        }, this.getRandomTiming('topicChange') + 30000);
    }

    async addPersonaMessageWithTyping(persona, message, uniqueContext = null) {
        if (this.activePersonaResponses.has(persona)) {
            console.log(`${persona} already responding, skipping duplicate`);
            return;
        }
        
        if (this.shouldInterrupt(persona, message)) {
            const delay = this.getRandomTiming('interruption');
            setTimeout(async () => {
                this.showTyping(persona);
                await this.simulateTypingDelay(message.length);
                this.hideTyping();
                this.addPersonaMessage(persona, message);
                sessionState.lastSpeaker = persona;
                this.addToHistory(mainPersonas[persona].name, message);
            }, delay);
        } else {
            const delay = this.getRandomTiming('normalResponse');
            setTimeout(async () => {
                this.showTyping(persona);
                await this.simulateTypingDelay(message.length);
                this.hideTyping();
                this.addPersonaMessage(persona, message);
                sessionState.lastSpeaker = persona;
                this.addToHistory(mainPersonas[persona].name, message);
            }, delay);
        }
    }

    shouldInterrupt(persona, message) {
        const pattern = interactionPatterns[persona];
        if (!pattern) return false;
        
        // Use intensity-adjusted interrupt chance
        const baseChance = pattern.interruptChance || 0;
        const adjustedChance = getIntensityAdjustedProbability(baseChance, persona);
        
        if (Math.random() < adjustedChance) {
            if (pattern.likelyToInterrupt && 
                pattern.likelyToInterrupt.includes(sessionState.lastSpeaker)) {
                return true;
            }
        }
        
        return false;
    }

    simulateTypingDelay(messageLength) {
        const wordsPerMinute = 40 + Math.random() * 40;
        const wordsPerSecond = wordsPerMinute / 60;
        const wordCount = messageLength / 5;
        const typingTime = (wordCount / wordsPerSecond) * 1000;
        
        const variance = typingTime * 0.3;
        const finalTime = typingTime + (Math.random() * variance * 2 - variance);
        
        return new Promise(resolve => {
            setTimeout(resolve, Math.max(1000, Math.min(finalTime, 4000)));
        });
    }

    getRandomTiming(type) {
        const pattern = timingPatterns[type];
        if (!pattern) return 3000;
        
        return pattern.min + Math.random() * (pattern.max - pattern.min);
    }

    async triggerTopicChange() {
        const transitions = [
            "Speaking of that...",
            "That reminds me...",
            "On a different note...",
            "But check this out...",
            "Y'know what else..."
        ];
        
        const transition = transitions[Math.floor(Math.random() * transitions.length)];
        const newTopic = conversationTopics[Math.floor(Math.random() * conversationTopics.length)];
        
        const personas = sessionState.personasActive.filter(p => p !== sessionState.lastSpeaker);
        const speaker = personas[Math.floor(Math.random() * personas.length)];
        const starter = newTopic.starters.find(s => s.persona === speaker) || 
                        newTopic.starters[0];
        
        // Get intensity-appropriate line
        const intensityLevel = sessionState.intensityLevel;
        const line = starter.lines[intensityLevel] || starter.lines[2] || starter.lines;
        const fullMessage = `${transition} ${line}`;
        
        const uniqueContext = `${speaker} initiating topic change to: ${newTopic.topic} at ${getCurrentIntensityConfig().name} level`;
        await this.addPersonaMessageWithTyping(speaker, fullMessage, uniqueContext);
        
        sessionState.currentTopic = newTopic.topic;
        this.scheduleTopicFollowUps(newTopic, line);
    }

    triggerGuestAppearance() {
        const guestKeys = Object.keys(guestPersonas);
        const guestKey = guestKeys[Math.floor(Math.random() * guestKeys.length)];
        const guest = guestPersonas[guestKey];
        
        this.addGuestMessage(guest.name, guest.line);
        this.addGuestToList(guest.name);
        
        setTimeout(() => {
            this.addGuestExit(guest.name);
            this.removeGuestFromList(guest.name);
        }, guest.duration);
        
        // Dr. Dooom might diss the guest (intensity-adjusted)
        const dissProbability = getIntensityAdjustedProbability(0.4, 'dr-dooom');
        if (Math.random() < dissProbability) {
            setTimeout(() => {
                const intensityLevel = sessionState.intensityLevel;
                const disses = {
                    1: ['That\'s not how we do things here', 'Stay in your lane'],
                    2: ['Who asked for your fake input?', 'Another wannabe persona'],
                    3: ['Get out before you get executed', 'Fake personas get body bags']
                };
                const dissArray = disses[intensityLevel] || disses[2];
                const diss = dissArray[Math.floor(Math.random() * dissArray.length)];
                
                const uniqueContext = `Dr. Dooom dismissing guest persona ${guest.name} at ${getCurrentIntensityConfig().name} level`;
                this.generatePersonaResponse('dr-dooom', uniqueContext, diss);
            }, 1000 + Math.random() * 2000);
        }
    }

    scheduleGuestAppearance() {
        const delay = 30000 + Math.random() * 60000;
        this.guestAppearanceTimer = setTimeout(() => {
            this.triggerGuestAppearance();
            this.scheduleGuestAppearance();
        }, delay);
    }

    personasEnterChat() {
        const intensityLevel = sessionState.intensityLevel;
        
        // Different entry flows based on intensity
        const entryFlows = {
            1: [ // Tame
                { persona: 'dr-octagon', message: 'Medical and cosmic knowledge ready for discussion...', delay: 2000 },
                { persona: 'black-elvis', message: 'Musical harmony and positive vibes in the building', delay: 5000 },
                { persona: 'kool-keith', message: 'Creative foundation established for good conversation', delay: 8000 },
                { persona: 'dr-dooom', message: 'Real hip-hop discussion starting now', delay: 11000 }
            ],
            2: [ // Players Mode (Default)
                { persona: 'dr-octagon', message: 'The cosmic surgical procedures continue evolving through dimensions...', delay: 2000 },
                { persona: 'dr-dooom', message: 'Still cleaning out these fake MCs, one execution at a time', delay: 5500 },
                { persona: 'black-elvis', message: 'Y\'all need some funk therapy to balance this energy', delay: 8000 },
                { persona: 'kool-keith', message: 'Abstract foundation keeps everything connected though', delay: 11500 }
            ],
            3: [ // Wild & Crazy
                { persona: 'dr-dooom', message: 'Time for brutal execution of fake MCs in this club', delay: 2000 },
                { persona: 'dr-octagon', message: 'Dimensional surgery will dissect all primitive consciousness here', delay: 5500 },
                { persona: 'kool-keith', message: 'Raw creative energy about to explode through the foundation', delay: 8000 },
                { persona: 'black-elvis', message: 'Aggressive funk therapy session starting with maximum intensity', delay: 11500 }
            ]
        };
        
        const naturalFlow = entryFlows[intensityLevel] || entryFlows[2];
        
        naturalFlow.forEach(({ persona, message, delay }) => {
            setTimeout(async () => {
                this.showTyping(persona);
                await this.simulateTypingDelay(message.length);
                this.hideTyping();
                this.addPersonaMessage(persona, message);
                sessionState.lastSpeaker = persona;
                this.addToHistory(mainPersonas[persona].name, message);
                
                const context = `${persona} ${getCurrentIntensityConfig().name} level entry statement`;
                this.recentResponses.push(`${context}: ${message}`.toLowerCase());
            }, delay);
        });
        
        // Welcome newcomer comment
        setTimeout(async () => {
            const newcomerComments = {
                1: ['Welcome to our discussion', 'Good to have you here', 'Ready for some conversation?'],
                2: ['Who\'s this new face in the club?', 'Fresh ears in the building', 'Welcome to the real hip-hop discussion'],
                3: ['Another player joins the brutal conversation...', 'Fresh blood in the execution chamber', 'Ready for the raw truth?']
            };
            
            const comments = newcomerComments[intensityLevel] || newcomerComments[2];
            const comment = comments[Math.floor(Math.random() * comments.length)];
            
            this.showTyping('dr-dooom');
            await this.simulateTypingDelay(comment.length);
            this.hideTyping();
            this.addPersonaMessage('dr-dooom', comment);
            sessionState.lastSpeaker = 'dr-dooom';
            
            setTimeout(() => {
                this.startNaturalConversation();
            }, 8000);
            
        }, 15000);
    }

    // ========================================
    // USER LIST MANAGEMENT
    // ========================================

    addGuestToList(guestName) {
        const guestList = document.getElementById('guestList');
        if (!guestList) return;
        
        const guestNote = guestList.querySelector('.guest-note');
        if (guestNote) guestNote.style.display = 'none';
        
        const guestDiv = document.createElement('div');
        guestDiv.className = 'guest-item';
        guestDiv.innerHTML = `
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiNjY2MiIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZD0iTTggOGEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTItM2EyIDIgMCAxIDEtNCAwIDIgMiAwIDAgMSA0IDB6bTQgOGMwIDEtMSAxLTEgMUgzcy0xIDAtMS0xIDEtNCA2LTQgNiAzIDYgNHoiLz48L3N2Zz4=" alt="${guestName}">
            <div class="guest-info">
                <span class="guest-name">${guestName}</span>
                <span class="guest-status">Visiting</span>
            </div>
            <div class="status-dot online"></div>
        `;
        
        guestList.appendChild(guestDiv);
        this.updateUserCount();
        
        return guestDiv;
    }

    removeGuestFromList(guestName) {
        const guestList = document.getElementById('guestList');
        if (!guestList) return;
        
        const guestItems = guestList.querySelectorAll('.guest-item');
        guestItems.forEach(item => {
            const nameSpan = item.querySelector('.guest-name');
            if (nameSpan && nameSpan.textContent === guestName) {
                item.classList.add('leaving');
                setTimeout(() => {
                    item.remove();
                    this.updateUserCount();
                    
                    const remainingGuests = guestList.querySelectorAll('.guest-item');
                    if (remainingGuests.length === 0) {
                        const guestNote = guestList.querySelector('.guest-note');
                        if (guestNote) guestNote.style.display = 'block';
                    }
                }, 300);
            }
        });
    }

    addUserToList(userName) {
        const fanList = document.getElementById('fanList');
        if (!fanList) return;
        
        const existingUser = fanList.querySelector(`[data-user="${userName}"]`);
        if (existingUser) return;
        
        const userDiv = document.createElement('div');
        userDiv.className = 'fan-item';
        userDiv.setAttribute('data-user', userName);
        userDiv.innerHTML = `
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiNmZmQ3MDAiIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZD0iTTggOGEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTItM2EyIDIgMCAxIDEtNCAwIDIgMiAwIDAgMSA0IDB6bTQgOGMwIDEtMSAxLTEgMUgzcy0xIDAtMS0xIDEtNCA2LTQgNiAzIDYgNHoiLz48L3N2Zz4=" alt="${userName}">
            <div class="fan-info">
                <span class="fan-name">${userName}</span>
                <span class="fan-status">Fan</span>
            </div>
            <div class="status-dot online"></div>
        `;
        
        fanList.appendChild(userDiv);
        this.updateUserCount();
    }

    updateUserCount() {
        const userCountEl = document.getElementById('userCount');
        if (!userCountEl) return;
        
        const mainPersonas = 4;
        const guests = document.querySelectorAll('#guestList .guest-item').length;
        const fans = document.querySelectorAll('#fanList .fan-item').length;
        const total = mainPersonas + guests + fans;
        
        userCountEl.textContent = `${total} online`;
    }

    // ========================================
    // MESSAGE HANDLING (Enhanced)
    // ========================================

    async sendUserMessage() {
        const chatInput = document.getElementById('chatInput');
        
        if (!chatInput || this.isProcessing) return;
        
        const message = chatInput.value.trim();
        if (!message) return;
        
        const userDisplayName = sessionState.userName;
        sessionState.userLurking = false;
        
        this.addUserMessage(userDisplayName, message);
        this.addUserToList(userDisplayName);
        chatInput.value = '';
        this.updateSendButton();
        
        setTimeout(async () => {
            const responder = this.selectResponder(message);
            const uniqueContext = `${mainPersonas[responder].name} ${mainPersonas[responder].conflictStyle} response to user ${userDisplayName}: "${message}" at ${getCurrentIntensityConfig().name} level`;
            await this.generatePersonaResponse(responder, uniqueContext);
        }, 1000 + Math.random() * 3000);
    }

    selectResponder(userMessage) {
        for (const [persona, data] of Object.entries(mainPersonas)) {
            for (const trigger of data.triggerWords) {
                if (userMessage.toLowerCase().includes(trigger)) {
                    return persona;
                }
            }
        }
        
        return sessionState.personasActive[Math.floor(Math.random() * sessionState.personasActive.length)];
    }

    async generatePersonaResponse(persona, context, presetResponse = null) {
        if (this.isProcessing || sessionState.tokensUsed > CONFIG.maxTokensPerSession || this.isPaused) return;
        
        if (this.activePersonaResponses.has(persona)) {
            console.log(`${persona} already responding, skipping duplicate request`);
            return;
        }
        
        this.activePersonaResponses.add(persona);
        this.isProcessing = true;
        this.showTyping(persona);
        
        try {
            let response;
            
            if (presetResponse) {
                response = presetResponse;
            } else {
                const prompt = this.buildChatPrompt(persona, context);
                response = await this.callChatAPI(prompt);
                
                const responseKey = response.trim().toLowerCase();
                if (this.recentResponses.includes(responseKey)) {
                    console.log(`Duplicate response detected for ${persona}, regenerating...`);
                    const altPrompt = `${prompt}\n\nIMPORTANT: Provide a DIFFERENT response than these recent ones: "${this.recentResponses.slice(-3).join('", "')}"`;
                    response = await this.callChatAPI(altPrompt);
                }
                
                this.recentResponses.push(responseKey);
                if (this.recentResponses.length > 10) {
                    this.recentResponses = this.recentResponses.slice(-10);
                }
            }
            
            this.hideTyping();
            this.addPersonaMessage(persona, response);
            
            sessionState.tokensUsed += 50;
            
        } catch (error) {
            console.error('Response generation error:', error);
            this.hideTyping();
            this.addPersonaMessage(persona, this.getFallbackResponse(persona));
        } finally {
            this.activePersonaResponses.delete(persona);
            this.isProcessing = false;
        }
    }

    buildChatPrompt(persona, context) {
        const knowledge = getCharacterKnowledge(persona);
        const recentHistory = this.conversationHistory.slice(-6);
        const personaData = mainPersonas[persona];
        const intensityConfig = getCurrentIntensityConfig();
        
        return `${knowledge}

UNIQUE PERSONA IDENTITY: You are specifically ${personaData.name} - ${personaData.status}
CONFLICT STYLE: ${personaData.conflictStyle}
PERSONALITY TRIGGER WORDS: ${personaData.triggerWords.join(', ')}
CURRENT INTENSITY LEVEL: ${intensityConfig.display}

CURRENT CONTEXT: ${context}

RECENT CONVERSATION:
${recentHistory.map(msg => `${msg.speaker}: ${msg.content}`).join('\n')}

CRITICAL INSTRUCTIONS:
- Respond ONLY as ${personaData.name} using your unique ${personaData.conflictStyle} style
- Use vocabulary and phrases specific to your character at ${intensityConfig.name} intensity level
- Do NOT repeat what other personas just said
- Keep response to 1-2 sentences maximum
- Stay authentic to your documented personality conflicts and relationships
- Adjust aggression/language based on ${intensityConfig.name} setting`;
    }

    getFallbackResponse(persona) {
        const intensityLevel = sessionState.intensityLevel;
        const fallbacks = {
            'kool-keith': {
                1: 'Creative thoughts flowing through the discussion',
                2: 'Abstract thoughts flowing through the universe',
                3: 'Raw creative energy exploding through dimensional barriers'
            },
            'dr-octagon': {
                1: 'Medical analysis in progress...',
                2: 'Cosmic interference detected in the communication channels',
                3: 'Brutal dimensional surgery experiencing violent interference'
            },
            'dr-dooom': {
                1: 'Technical issues... someone needs to fix this',
                2: 'Technical difficulties... someone\'s getting executed for this',
                3: 'System failure means someone gets brutally executed immediately'
            },
            'black-elvis': {
                1: 'Musical frequencies experiencing some static',
                2: 'Funk frequencies experiencing some static, y\'all',
                3: 'Aggressive sonic interference disrupting the raw funk energy'
            }
        };
        
        const personaFallbacks = fallbacks[persona];
        return personaFallbacks ? personaFallbacks[intensityLevel] || personaFallbacks[2] : 'Connection unstable in the universe';
    }

    // ========================================
    // API CALLS
    // ========================================

    async callChatAPI(prompt) {
        const apiKey = CONFIG.getApiKey();
        if (!apiKey) throw new Error('API configuration error');

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.apiTimeout);

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.9,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 100
                    },
                    safetySettings: [
                        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
                    ]
                }),
                signal: controller.signal
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            if (data.candidates?.[0]?.content) {
                return data.candidates[0].content.parts[0].text.trim();
            } else {
                throw new Error('No response content from AI');
            }
        } finally {
            clearTimeout(timeoutId);
        }
    }

    // ========================================
    // UI METHODS (Enhanced)
    // ========================================

    addSystemMessage(content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'system-message';
        messageDiv.innerHTML = `<div class="message-content">${this.escapeHtml(content)}</div>`;
        this.appendMessage(messageDiv);
    }

    addPersonaMessage(persona, content) {
        const personaData = mainPersonas[persona];
        if (!personaData) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${persona}`;
        messageDiv.innerHTML = `
            <img src="${personaData.avatar}" alt="${personaData.name}" class="message-avatar">
            <div class="message-content">
                <strong>${personaData.name}:</strong> ${this.escapeHtml(content)}
            </div>
        `;
        
        this.appendMessage(messageDiv);
        this.addToHistory(personaData.name, content);
        this.addToChatLog(personaData.name, content);
    }

    addUserMessage(userName, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `
            <div class="message-content">
                <strong>${this.escapeHtml(userName)}:</strong> ${this.escapeHtml(content)}
            </div>
        `;
        
        this.appendMessage(messageDiv);
        this.addToHistory(userName, content);
        this.addToChatLog(userName, content);
    }

    addGuestMessage(guestName, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message guest';
        messageDiv.innerHTML = `
            <div class="message-content">
                <em>*${this.escapeHtml(guestName)} enters chat*</em><br>
                <strong>${this.escapeHtml(guestName)}:</strong> ${this.escapeHtml(content)}
            </div>
        `;
        
        this.appendMessage(messageDiv);
        this.addToChatLog(`*${guestName}*`, `enters chat - ${content}`);
    }

    addGuestExit(guestName) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message guest';
        messageDiv.innerHTML = `
            <div class="message-content">
                <em>*${this.escapeHtml(guestName)} leaves chat*</em>
            </div>
        `;
        
        this.appendMessage(messageDiv);
        this.addToChatLog(`*${guestName}*`, 'leaves chat');
    }

    appendMessage(messageDiv) {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.appendChild(messageDiv);
            this.scrollToBottom();
        }
    }

    addToHistory(speaker, content) {
        this.conversationHistory.push({ speaker, content });
        if (this.conversationHistory.length > 20) {
            this.conversationHistory = this.conversationHistory.slice(-20);
        }
    }

    addToChatLog(speaker, content) {
        if (!sessionState.chatLog) {
            sessionState.chatLog = [];
        }
        
        sessionState.chatLog.push({
            speaker,
            message: content,
            timestamp: Date.now()
        });
    }

    showTyping(persona) {
        const typingArea = document.getElementById('typingArea');
        if (!typingArea) return;
        
        const personaData = mainPersonas[persona];
        typingArea.innerHTML = `
            <div class="typing-indicator">
                <img src="${personaData.avatar}" alt="${personaData.name}">
                <span>${personaData.name} is thinking...</span>
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
    }

    hideTyping() {
        const typingArea = document.getElementById('typingArea');
        if (typingArea) typingArea.innerHTML = '';
    }

    updateSendButton() {
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        
        if (chatInput && sendBtn) {
            const hasText = chatInput.value.trim().length > 0;
            sendBtn.disabled = !hasText || this.isProcessing;
        }
    }

    scrollToBottom() {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100);
        }
    }

    clearMessages() {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) chatMessages.innerHTML = '';
        this.conversationHistory = [];
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    displayWelcomeMessage() {
        setTimeout(() => {
            const intensityConfig = getCurrentIntensityConfig();
            this.addSystemMessage(`👥 Welcome to The Players Club Chat Room

User: ${sessionState.userName}
Intensity Level: ${intensityConfig.display}
Four personas are currently active. Spontaneous events will occur...
You can lurk and watch, or jump in anytime!

Session Duration: 15 minutes
💡 Tip: Right-click any persona for private chat!`);
        }, 500);
    }

    async triggerPersonaConflict() {
        const intensityLevel = sessionState.intensityLevel;
        
        const conflicts = [
            {
                personas: ['dr-dooom', 'dr-octagon'],
                context1: `Dr. Dooom spontaneous Octagon attack at ${getCurrentIntensityConfig().name} level`,
                context2: `Dr. Octagon defensive response to Dooom at ${getCurrentIntensityConfig().name} level`,
                lines1: {
                    1: 'That cosmic approach isn\'t realistic',
                    2: 'That cosmic nonsense is still dead and buried',
                    3: 'Time to brutally execute this fake cosmic fraud'
                },
                lines2: {
                    1: 'Scientific knowledge transcends street understanding',
                    2: 'My consciousness transcends your crude understanding of existence',
                    3: 'Your primitive violence cannot comprehend dimensional supremacy'
                }
            },
            {
                personas: ['kool-keith', 'dr-dooom'],
                context1: `Kool Keith moderating Dooom aggression at ${getCurrentIntensityConfig().name} level`,
                context2: `Dr. Dooom dismissing Keith authority at ${getCurrentIntensityConfig().name} level`,
                lines1: {
                    1: 'The creative foundation doesn\'t need all this conflict',
                    2: 'The abstract foundation doesn\'t need all this violence',
                    3: 'Revolutionary innovation doesn\'t require brutal destruction'
                },
                lines2: {
                    1: 'Foundation or not, fake MCs still need correction',
                    2: 'Foundation or not, fake MCs still need execution',
                    3: 'Abstract concepts can\'t stop the brutal elimination of phonies'
                }
            },
            {
                personas: ['black-elvis', 'dr-dooom'],
                context1: `Black Elvis peaceful intervention at ${getCurrentIntensityConfig().name} level`,
                context2: `Dr. Dooom rejecting peace at ${getCurrentIntensityConfig().name} level`,
                lines1: {
                    1: 'Some musical harmony might calm all this energy',
                    2: 'Some funk therapy might calm all this aggressive energy',
                    3: 'Raw funk energy could redirect this violent aggression'
                },
                lines2: {
                    1: 'Music can\'t fix authenticity issues',
                    2: 'Funk can\'t fix fake personas - only execution can',
                    3: 'Funk therapy is useless against fake MCs requiring brutal elimination'
                }
            }
        ];
        
        const conflict = conflicts[Math.floor(Math.random() * conflicts.length)];
        const line1 = conflict.lines1[intensityLevel] || conflict.lines1[2];
        const line2 = conflict.lines2[intensityLevel] || conflict.lines2[2];
        
        setTimeout(() => {
            this.generatePersonaResponse(conflict.personas[0], conflict.context1, line1);
        }, 1000);
        
        setTimeout(() => {
            this.generatePersonaResponse(conflict.personas[1], conflict.context2, line2);
        }, 3000 + Math.random() * 2000);
    }
}

// ========================================
// INITIALIZATION
// ========================================

let keithUniverse;

document.addEventListener('DOMContentLoaded', () => {
    try {
        keithUniverse = new KeithUniverse();
        window.keithUniverse = keithUniverse;
        console.log('🎭 Keith Universe system loaded');
    } catch (error) {
        console.error('Keith Universe initialization failed:', error);
        document.body.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100vh; background: #1A1A1A; color: #fff; font-family: Arial, sans-serif;">
                <div style="text-align: center;">
                    <h1 style="color: #C0C0C0;">Keith Studio Failed to Load</h1>
                    <p>Please refresh the page</p>
                </div>
            </div>
        `;
    }
});

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});mainPersonas[target].name} ${mainPersonas[target].conflictStyle} response to ${mainPersonas[initiator].name}'s ${getCurrentIntensityConfig().name} level statement: "${line}"`;
                await this.generatePersonaResponse(target, uniqueContext);
            } else if (sessionState.personasActive.includes(trigger.target)) {
                const uniqueContext = `${
