/* ========================================
   KEITHGPT v9 - MAIN APPLICATION LOGIC
   ======================================== */

class KeithGPT {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updatePersonaUI();
        this.resetConversation();
        console.log('KeithGPT v9 Bulletproof Edition initialized');
    }

    // ========================================
    // UTILITY METHODS
    // ========================================

    getElement(id) {
        return document.getElementById(id);
    }

    safeSetText(id, text) {
        const el = this.getElement(id);
        if (el) el.textContent = text;
    }

    safeSetSrc(id, src) {
        const el = this.getElement(id);
        if (el) el.src = src;
    }

    safeToggleClass(id, className, condition) {
        const el = this.getElement(id);
        if (el) el.classList.toggle(className, condition);
    }

    showError(message, duration = 5000) {
        const errorEl = this.getElement('errorMessage');
        if (errorEl) {
            errorEl.textContent = `⚠️ ${message}`;
            errorEl.classList.add('active');
            setTimeout(() => errorEl.classList.remove('active'), duration);
        }
    }

    hideError() {
        this.safeToggleClass('errorMessage', 'active', false);
    }

    // ========================================
    // EVENT LISTENERS SETUP
    // ========================================

    setupEventListeners() {
        // Mode buttons
        const chatModeBtn = this.getElement('chatModeBtn');
        const battleModeBtn = this.getElement('battleModeBtn');
        if (chatModeBtn) chatModeBtn.addEventListener('click', () => this.setMode('chat'));
        if (battleModeBtn) battleModeBtn.addEventListener('click', () => this.setMode('battle'));

        // Persona dropdown
        const personaSelected = this.getElement('personaSelected');
        if (personaSelected) personaSelected.addEventListener('click', () => this.togglePersonaDropdown());

        // Battle controls
        const startBattleBtn = this.getElement('startBattleBtn');
        if (startBattleBtn) startBattleBtn.addEventListener('click', () => this.startBattle());

        const battleSelected1 = this.getElement('battleSelected1');
        const battleSelected2 = this.getElement('battleSelected2');
        if (battleSelected1) battleSelected1.addEventListener('click', () => this.toggleBattleDropdown(1));
        if (battleSelected2) battleSelected2.addEventListener('click', () => this.toggleBattleDropdown(2));

        // Main controls
        const sendBtn = this.getElement('sendBtn');
        const newChatBtn = this.getElement('newChatBtn');
        const mobileToggle = this.getElement('mobileToggle');
        const mobileOverlay = this.getElement('mobileOverlay');

        if (sendBtn) sendBtn.addEventListener('click', () => this.sendMessage());
        if (newChatBtn) newChatBtn.addEventListener('click', () => this.resetConversation());
        if (mobileToggle) mobileToggle.addEventListener('click', () => this.toggleMobile());
        if (mobileOverlay) mobileOverlay.addEventListener('click', () => this.closeMobile());

        // Persona options
        document.querySelectorAll('.persona-option').forEach(option => {
            option.addEventListener('click', () => this.switchCharacter(option.dataset.character));
        });

        // Battle options
        document.querySelectorAll('#battleDropdown1 .battle-option').forEach(option => {
            option.addEventListener('click', () => this.selectBattleFighter(1, option.dataset.character));
        });

        document.querySelectorAll('#battleDropdown2 .battle-option').forEach(option => {
            option.addEventListener('click', () => this.selectBattleFighter(2, option.dataset.character));
        });

        // Chat input
        const chatInput = this.getElement('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            chatInput.addEventListener('input', () => this.handleInputChange());
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#personaDropdown')) this.closePersonaDropdown();
            if (!e.target.closest('#battleDropdown1')) this.closeBattleDropdown(1);
            if (!e.target.closest('#battleDropdown2')) this.closeBattleDropdown(2);
        });
    }

    // ========================================
    // MODE MANAGEMENT
    // ========================================

    setMode(mode) {
        currentMode = mode;
        this.safeToggleClass('chatModeBtn', 'active', mode === 'chat');
        this.safeToggleClass('battleModeBtn', 'active', mode === 'battle');

        const chatSection = this.getElement('chatPersonaSection');
        if (chatSection) chatSection.style.display = mode === 'chat' ? 'block' : 'none';

        this.safeToggleClass('battleSection', 'active', mode === 'battle');

        if (mode === 'chat') {
            battleState.active = false;
            this.safeToggleClass('battleStatus', 'active', false);
        }

        this.resetConversation();
    }

    // ========================================
    // PERSONA MANAGEMENT
    // ========================================

    togglePersonaDropdown() {
        this.safeToggleClass('personaDropdown', 'open');
    }

    closePersonaDropdown() {
        this.safeToggleClass('personaDropdown', 'open', false);
    }

    switchCharacter(character) {
        if (!characterData[character]) return;

        currentCharacter = character;

        document.querySelectorAll('.persona-option').forEach(option => {
            option.classList.toggle('active', option.dataset.character === character);
        });

        this.updatePersonaUI();
        this.closePersonaDropdown();
        this.resetConversation();
    }

    updatePersonaUI() {
        const data = characterData[currentCharacter];
        if (!data) return;

        this.safeSetSrc('selectedAvatar', data.avatar);
        this.safeSetText('selectedName', data.name);
        this.safeSetSrc('headerAvatar', data.avatar);
        this.safeSetText('headerName', data.name);
        this.safeSetText('headerStatus', data.status);
        this.safeSetSrc('typingAvatar', data.avatar);
        this.safeSetText('typingName', data.name);

        const chatInput = this.getElement('chatInput');
        if (chatInput) chatInput.placeholder = `Message ${data.name}...`;
    }

    // ========================================
    // BATTLE MANAGEMENT
    // ========================================

    toggleBattleDropdown(num) {
        this.safeToggleClass(`battleDropdown${num}`, 'open');
        const otherNum = num === 1 ? 2 : 1;
        this.safeToggleClass(`battleDropdown${otherNum}`, 'open', false);
    }

    closeBattleDropdown(num) {
        this.safeToggleClass(`battleDropdown${num}`, 'open', false);
    }

    selectBattleFighter(num, character) {
        if (num === 1) battleState.fighter1 = character;
        else battleState.fighter2 = character;

        const fighterName = character === 'user' ? 'You' : (characterData[character]?.name || character);
        this.safeSetText(`battleSelected${num}`, fighterName);
        this.closeBattleDropdown(num);
    }

    async startBattle() {
        if (battleState.fighter1 === battleState.fighter2) {
            alert('Please select different fighters!');
            return;
        }

        if (isProcessing) return;

        battleState.active = true;
        battleState.currentRound = 1;
        battleState.topic = battleTopics[Math.floor(Math.random() * battleTopics.length)];
        battleState.nextUp = 'fighter1';

        this.safeToggleClass('battleStatus', 'active', true);
        this.safeSetText('currentRound', '1');
        this.resetConversation();

        const fighter1Name = battleState.fighter1 === 'user' ? 'You' : (characterData[battleState.fighter1]?.name || battleState.fighter1);
        const fighter2Name = battleState.fighter2 === 'user' ? 'You' : (characterData[battleState.fighter2]?.name || battleState.fighter2);

        this.addSystemMessage(`🥊 BATTLE ROYALE: ${fighter1Name} vs ${fighter2Name}\n\nTopic: "${battleState.topic}"\n\n3 rounds of lyrical warfare begins NOW!`);

        setTimeout(() => this.battleLoop(), 1000);
    }

    async battleLoop() {
        if (battleState.currentRound > battleState.maxRounds) {
            this.addSystemMessage('🏆 BATTLE COMPLETE! Both warriors showed incredible skill!');
            this.safeToggleClass('battleStatus', 'active', false);
            battleState.active = false;
            return;
        }

        const fighter = battleState.nextUp === 'fighter1' ? battleState.fighter1 : battleState.fighter2;
        const fighterName = fighter === 'user' ? 'You' : (characterData[fighter]?.name || fighter);

        if (fighter === 'user') {
            this.addSystemMessage(`Your turn! Drop your verse for round ${battleState.currentRound}`);
            const chatInput = this.getElement('chatInput');
            if (chatInput) chatInput.placeholder = `Your battle verse for round ${battleState.currentRound}...`;
            return;
        }

        this.showTyping(true, fighter);

        try {
            const verse = await this.callWithRetry(() => this.callBattleAPI(fighter, battleState.topic, battleState.currentRound));
            this.showTyping(false);
            this.addBattleMessage(verse, fighterName, battleState.currentRound);
            this.advanceBattleState();
            setTimeout(() => this.battleLoop(), 3000);
        } catch (error) {
            console.error('Battle verse error:', error);
            this.showTyping(false);
            this.showError('Battle verse failed, retrying...');
            setTimeout(() => this.battleLoop(), 2000);
        }
    }

    advanceBattleState() {
        if (battleState.nextUp === 'fighter1') {
            battleState.nextUp = 'fighter2';
        } else {
            battleState.nextUp = 'fighter1';
            battleState.currentRound++;
            this.safeSetText('currentRound', battleState.currentRound.toString());
        }
    }

    // ========================================
    // API CALLS
    // ========================================

    async callWithRetry(apiFunction) {
        let lastError;
        for (let attempt = 1; attempt <= CONFIG.retryAttempts; attempt++) {
            try {
                const result = await apiFunction();
                this.hideError();
                return result;
            } catch (error) {
                lastError = error;
                console.warn(`API attempt ${attempt} failed:`, error.message);
                if (attempt < CONFIG.retryAttempts) {
                    this.showError(`Connection issue, retrying... (${attempt}/${CONFIG.retryAttempts})`);
                    await new Promise(resolve => setTimeout(resolve, CONFIG.retryDelay * attempt));
                }
            }
        }
        throw lastError;
    }

    async callChatAPI(userMessage) {
        const apiKey = CONFIG.getApiKey();
        if (!apiKey) throw new Error('API configuration error');

        const characterKnowledge = getCharacterKnowledge(currentCharacter);
        const prompt = `${characterKnowledge}\n\nBased on the above knowledge, respond to the user as this character. Stay authentic to their documented personality, style, vocabulary, and themes.\n\nUser message: ${userMessage}\n\nResponse as character:`;

        const messages = [
            { role: 'user', parts: [{ text: prompt }] },
            ...conversationHistory.slice(-6)
        ];

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.apiTimeout);

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: messages,
                    generationConfig: {
                        temperature: 0.8,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 400
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
                const aiResponse = data.candidates[0].content.parts[0].text;
                conversationHistory.push(
                    { role: 'user', parts: [{ text: userMessage }] },
                    { role: 'model', parts: [{ text: aiResponse }] }
                );

                if (conversationHistory.length > 20) {
                    conversationHistory = conversationHistory.slice(-20);
                }

                return aiResponse;
            } else {
                throw new Error('No response content from AI');
            }
        } finally {
            clearTimeout(timeoutId);
        }
    }

    async callBattleAPI(character, topic, round) {
        const apiKey = CONFIG.getApiKey();
        if (!apiKey) throw new Error('API configuration error');

        const characterName = characterData[character]?.name || character;
        const prompt = `CRITICAL: DO NOT start with "Yo, check the mic" or "one two" or "this ain't no" - BANNED PHRASES!\n\nYou are ${characterName}. Write a 4-line rap battle verse with proper rhymes that flows naturally. Start immediately with your authentic character voice.\n\nBattle topic: ${topic}\nRound: ${round}\n\nWrite your verse now:`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.apiTimeout);

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 1.0,
                        topK: 40,
                        topP: 0.9,
                        maxOutputTokens: 150
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

            if (!response.ok) throw new Error(`API Error: ${response.status}`);

            const data = await response.json();
            if (data.candidates?.[0]?.content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('No battle verse content in API response');
            }
        } finally {
            clearTimeout(timeoutId);
        }
    }

    // ========================================
    // MESSAGE HANDLING
    // ========================================

    async sendMessage() {
        const chatInput = this.getElement('chatInput');
        const sendBtn = this.getElement('sendBtn');
        if (!chatInput || !sendBtn) return;

        const message = chatInput.value.trim();
        if (!message || sendBtn.disabled || isProcessing) return;

        isProcessing = true;
        this.addUserMessage(message);
        chatInput.value = '';
        this.handleInputChange();

        // Handle battle mode user input
        if (battleState.active) {
            const currentFighter = battleState.nextUp === 'fighter1' ? battleState.fighter1 : battleState.fighter2;
            if (currentFighter === 'user') {
                this.addBattleMessage(message, 'You', battleState.currentRound);
                this.advanceBattleState();
                isProcessing = false;
                setTimeout(() => this.battleLoop(), 1500);
                return;
            }
        }

        this.showTyping(true);

        try {
            const response = await this.callWithRetry(() => this.callChatAPI(message));
            this.showTyping(false);
            this.addBotMessage(response);
        } catch (error) {
            this.showTyping(false);
            console.error('Chat API Error:', error);
            this.showError('Connection failed - please try again');
            this.addBotMessage("I'm having trouble connecting right now. Please try again in a moment.");
        } finally {
            isProcessing = false;
        }
    }

    // ========================================
    // MESSAGE DISPLAY
    // ========================================

    addSystemMessage(content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message system';
        messageDiv.innerHTML = `<div class="message-content">${this.escapeHtml(content)}</div>`;
        this.appendMessage(messageDiv);
    }

    addBattleMessage(content, characterName, round) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message battle';
        messageDiv.innerHTML = `
            <div class="battle-header">
                <span class="battle-round">Round ${round}</span>
                <span class="battle-character">${this.escapeHtml(characterName)}</span>
            </div>
            <div class="message-content">${this.escapeHtml(content)}</div>
        `;
        this.appendMessage(messageDiv);
    }

    addUserMessage(content) {
        const userAvatar = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiNjY2NjY2MiIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZD0iTTggOGEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTItM2EyIDIgMCAxIDEtNCAwIDIgMiAwIDAgMSA0IDB6bTQgOGMwIDEtMSAxLTEgMUgzcy0xIDAtMS0xIDEtNCA2LTQgNiAzIDYgNHoiLz48L3N2Zz4=';
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `
            <img src="${userAvatar}" alt="You" class="message-avatar">
            <div style="flex: 1;">
                <div class="message-content">${this.escapeHtml(content)}</div>
            </div>
        `;
        this.appendMessage(messageDiv);
    }

    addBotMessage(content) {
        const data = characterData[currentCharacter];
        if (data) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message bot';
            messageDiv.innerHTML = `
                <img src="${data.avatar}" alt="${data.name}" class="message-avatar">
                <div style="flex: 1;">
                    <div class="message-content">${this.escapeHtml(content)}</div>
                </div>
            `;
            this.appendMessage(messageDiv);
        }
    }

    appendMessage(messageDiv) {
        const chatMessages = this.getElement('chatMessages');
        if (chatMessages) {
            chatMessages.appendChild(messageDiv);
            this.scrollToBottom();
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ========================================
    // UI HELPERS
    // ========================================

    showTyping(show = true, character = null) {
        const typingIndicator = this.getElement('typingIndicator');
        if (typingIndicator) {
            typingIndicator.style.display = show ? 'flex' : 'none';
            
            if (show && character && characterData[character]) {
                this.safeSetSrc('typingAvatar', characterData[character].avatar);
                this.safeSetText('typingName', characterData[character].name);
            }
            
            if (show) this.scrollToBottom();
        }
    }

    scrollToBottom() {
        const chatMessages = this.getElement('chatMessages');
        if (chatMessages) {
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100);
        }
    }

    handleInputChange() {
        const chatInput = this.getElement('chatInput');
        const sendBtn = this.getElement('sendBtn');
        if (chatInput && sendBtn) {
            const hasText = chatInput.value.trim().length > 0;
            sendBtn.disabled = !hasText || isProcessing;
        }
    }

    resetConversation() {
        conversationHistory = [];
        const chatMessages = this.getElement('chatMessages');
        if (chatMessages) chatMessages.innerHTML = '';

        if (currentMode === 'chat') {
            const data = characterData[currentCharacter];
            if (data) {
                const welcomeMessage = `Yo, what's good? ${data.name} here - ready to chat! KeithGPT v9 Bulletproof Edition is loaded with enhanced knowledge.`;
                this.addBotMessage(welcomeMessage);
            }
        }

        battleState.active = false;
        this.safeToggleClass('battleStatus', 'active', false);

        const chatInput = this.getElement('chatInput');
        const data = characterData[currentCharacter];
        if (chatInput && data) {
            chatInput.placeholder = `Message ${data.name}...`;
        }
    }

    // ========================================
    // MOBILE SUPPORT
    // ========================================

    toggleMobile() {
        this.safeToggleClass('sidebar', 'open');
        this.safeToggleClass('mobileOverlay', 'show');
    }

    closeMobile() {
        this.safeToggleClass('sidebar', 'open', false);
        this.safeToggleClass('mobileOverlay', 'show', false);
    }
}

// ========================================
// APPLICATION INITIALIZATION
// ========================================

let app;

document.addEventListener('DOMContentLoaded', () => {
    try {
        app = new KeithGPT();
    } catch (error) {
        console.error('KeithGPT initialization failed:', error);
        document.body.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100vh; background: #0a0a0a; color: #fff; font-family: Arial, sans-serif;">
                <div style="text-align: center;">
                    <h1 style="color: #ffd700;">KeithGPT Failed to Load</h1>
                    <p>Please refresh the page</p>
                </div>
            </div>
        `;
    }
});

// ========================================
// MOBILE VIEWPORT HANDLING
// ========================================

function handleViewportChange() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', handleViewportChange);
window.addEventListener('orientationchange', handleViewportChange);
handleViewportChange();

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    if (app && app.showError) {
        app.showError('Something went wrong - please refresh if issues persist');
    }
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    if (app && app.showError) {
        app.showError('Network error - please check your connection');
    }
});
