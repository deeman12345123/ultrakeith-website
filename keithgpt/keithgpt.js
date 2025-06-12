/* ========================================
   KEITH STUDIO - INNER UNIVERSE CHAT ROOM
   ======================================== */

class KeithUniverse {
    constructor() {
        this.sessionTimer = null;
        this.autoEventTimer = null;
        this.isProcessing = false;
        this.conversationHistory = [];
        this.guestAppearanceTimer = null;
    }

    // ========================================
    // INITIALIZATION
    // ========================================

    initializeUniverse() {
        this.setupEventListeners();
        this.startSession();
        this.displayWelcomeMessage();
        this.startAutoEvents();
        console.log('🎭 Keith\'s Inner Universe activated');
    }

    setupEventListeners() {
        // User input
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

        // Control buttons
        const newSessionBtn = document.getElementById('newSession');
        const toggleUserList = document.getElementById('toggleUserList');
        const mobileOverlay = document.getElementById('mobileOverlay');

        if (newSessionBtn) newSessionBtn.addEventListener('click', () => this.startNewSession());
        if (toggleUserList) toggleUserList.addEventListener('click', () => this.toggleUserList());
        if (mobileOverlay) mobileOverlay.addEventListener('click', () => this.closeUserList());
    }

    // ========================================
    // MOBILE USER LIST TOGGLE
    // ========================================

    toggleUserList() {
        const userList = document.getElementById('userList');
        const overlay = document.getElementById('mobileOverlay');
        
        if (userList && overlay) {
            userList.classList.toggle('show');
            overlay.classList.toggle('show');
        }
    }

    closeUserList() {
        const userList = document.getElementById('userList');
        const overlay = document.getElementById('mobileOverlay');
        
        if (userList && overlay) {
            userList.classList.remove('show');
            overlay.classList.remove('show');
        }
    }

    // ========================================
    // SESSION MANAGEMENT
    // ========================================

    startSession() {
        sessionState.startTime = Date.now();
        sessionState.tokensUsed = 0;
        sessionState.userLurking = true;
        
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
        
        // Warning when low on time
        if (remaining < 60000) { // Last minute
            timerEl.style.color = 'var(--status-warning)';
        }
    }

    endSession() {
        clearInterval(this.sessionTimer);
        clearInterval(this.autoEventTimer);
        clearTimeout(this.guestAppearanceTimer);
        
        this.addSystemMessage('🎭 Studio session complete! Thanks for experiencing Keith\'s Inner Universe.\n\nClick "New" to start another session.');
        
        // Disable input
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        if (chatInput) chatInput.disabled = true;
        if (sendBtn) sendBtn.disabled = true;
    }

    startNewSession() {
        // Reset everything
        this.clearMessages();
        sessionState = {
            startTime: null,
            tokensUsed: 0,
            personasActive: ['kool-keith', 'dr-octagon', 'dr-dooom', 'black-elvis'],
            currentTopic: null,
            battleInProgress: false,
            userLurking: true,
            lastActivity: null
        };
        
        // Re-enable input
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
    // AUTO EVENTS & CONVERSATIONS
    // ========================================

    startAutoEvents() {
        // Initial personas enter
        setTimeout(() => this.personasEnterChat(), 2000);
        
        // Start random events
        this.autoEventTimer = setInterval(() => {
            this.triggerRandomEvent();
        }, 15000 + Math.random() * 30000); // Every 15-45 seconds
        
        // Guest persona appearances
        this.scheduleGuestAppearance();
    }

    async triggerRandomEvent() {
        if (this.isProcessing || sessionState.battleInProgress) return;
        
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
        const conflicts = Object.keys(conflictTriggers);
        const conflict = conflicts[Math.floor(Math.random() * conflicts.length)];
        const trigger = conflictTriggers[conflict];
        
        if (Math.random() > trigger.probability) return;
        
        const initiator = trigger.initiator;
        const line = trigger.trigger_lines[Math.floor(Math.random() * trigger.trigger_lines.length)];
        
        this.addPersonaMessage(initiator, line);
        
        // Target responds
        setTimeout(async () => {
            if (trigger.target === 'any') {
                const targets = sessionState.personasActive.filter(p => p !== initiator);
                const target = targets[Math.floor(Math.random() * targets.length)];
                await this.generatePersonaResponse(target, `Responding to ${mainPersonas[initiator].name}'s diss`);
            } else if (sessionState.personasActive.includes(trigger.target)) {
                await this.generatePersonaResponse(trigger.target, `Responding to ${mainPersonas[initiator].name}'s attack`);
            }
        }, 2000 + Math.random() * 3000);
    }

    async triggerTopicChange() {
        const newTopic = chatTopics[Math.floor(Math.random() * chatTopics.length)];
        sessionState.currentTopic = newTopic;
        
        // Random persona brings up the topic
        const personas = sessionState.personasActive;
        const speaker = personas[Math.floor(Math.random() * personas.length)];
        
        await this.generatePersonaResponse(speaker, `Start discussing: ${newTopic}`);
    }

    triggerGuestAppearance() {
        const guestKeys = Object.keys(guestPersonas);
        const guestKey = guestKeys[Math.floor(Math.random() * guestKeys.length)];
        const guest = guestPersonas[guestKey];
        
        this.addGuestMessage(guest.name, guest.line);
        
        // Guest leaves after duration
        setTimeout(() => {
            this.addGuestExit(guest.name);
        }, guest.duration);
        
        // Dr. Dooom might diss the guest
        if (Math.random() < 0.4) {
            setTimeout(() => {
                const disses = [
                    "Who asked for your fake input?",
                    "Another wannabe persona",
                    "Stay in your lane"
                ];
                const diss = disses[Math.floor(Math.random() * disses.length)];
                this.addPersonaMessage('dr-dooom', diss);
            }, 1000 + Math.random() * 2000);
        }
    }

    scheduleGuestAppearance() {
        const delay = 30000 + Math.random() * 60000; // 30-90 seconds
        this.guestAppearanceTimer = setTimeout(() => {
            this.triggerGuestAppearance();
            this.scheduleGuestAppearance(); // Schedule next one
        }, delay);
    }

    personasEnterChat() {
        // Skip the "entering" phase - they're already chatting
        this.addSystemMessage('🎭 You\'ve entered Keith\'s Inner Universe mid-conversation...');
        
        // Simulate ongoing conversation
        const ongoingChat = [
            { persona: 'dr-octagon', message: 'The cosmic surgical procedures continue to evolve...', delay: 1000 },
            { persona: 'dr-dooom', message: 'Still cleaning out fake MCs from the industry', delay: 2500 },
            { persona: 'kool-keith', message: 'Abstract foundation always in motion', delay: 4000 },
            { persona: 'black-elvis', message: 'Funk dimensions staying consistent, y\'all', delay: 5500 }
        ];
        
        ongoingChat.forEach(({ persona, message, delay }) => {
            setTimeout(() => {
                this.addPersonaMessage(persona, message);
            }, delay);
        });
        
        // Start natural flow after initial messages
        setTimeout(async () => {
            await this.generatePersonaResponse('dr-dooom', 'Notice new person entered the chat');
        }, 7000);
    }

    addGuestToList(guestName) {
        const guestList = document.getElementById('guestList');
        if (!guestList) return;
        
        // Remove "Guest personas appear randomly..." text
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
                    
                    // Show note again if no guests
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
        
        // Check if user already in list
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
        
        const mainPersonas = 4; // Always 4 main personas
        const guests = document.querySelectorAll('#guestList .guest-item').length;
        const fans = document.querySelectorAll('#fanList .fan-item').length;
        const total = mainPersonas + guests + fans;
        
        userCountEl.textContent = `${total} online`;
    }

    // ========================================
    // MESSAGE HANDLING
    // ========================================

    async sendUserMessage() {
        const chatInput = document.getElementById('chatInput');
        const userName = document.getElementById('userName');
        
        if (!chatInput || this.isProcessing) return;
        
        const message = chatInput.value.trim();
        if (!message) return;
        
        const userDisplayName = userName?.value.trim() || 'User';
        sessionState.userLurking = false;
        
        this.addUserMessage(userDisplayName, message);
        chatInput.value = '';
        this.updateSendButton();
        
        // Random persona responds
        setTimeout(async () => {
            const responder = this.selectResponder(message);
            await this.generatePersonaResponse(responder, `Responding to ${userDisplayName}: ${message}`);
        }, 1000 + Math.random() * 3000);
    }

    selectResponder(userMessage) {
        // Check for trigger words
        for (const [persona, data] of Object.entries(mainPersonas)) {
            for (const trigger of data.triggerWords) {
                if (userMessage.toLowerCase().includes(trigger)) {
                    return persona;
                }
            }
        }
        
        // Random responder
        return sessionState.personasActive[Math.floor(Math.random() * sessionState.personasActive.length)];
    }

    async generatePersonaResponse(persona, context) {
        if (this.isProcessing || sessionState.tokensUsed > CONFIG.maxTokensPerSession) return;
        
        this.isProcessing = true;
        this.showTyping(persona);
        
        try {
            const prompt = this.buildChatPrompt(persona, context);
            const response = await this.callChatAPI(prompt);
            
            this.hideTyping();
            this.addPersonaMessage(persona, response);
            
            sessionState.tokensUsed += 50; // Estimate
            
        } catch (error) {
            console.error('Response generation error:', error);
            this.hideTyping();
            this.addPersonaMessage(persona, this.getFallbackResponse(persona));
        } finally {
            this.isProcessing = false;
        }
    }

    buildChatPrompt(persona, context) {
        const knowledge = getCharacterKnowledge(persona);
        const recentHistory = this.conversationHistory.slice(-6);
        
        return `${knowledge}

CURRENT CONTEXT: ${context}

RECENT CONVERSATION:
${recentHistory.map(msg => `${msg.speaker}: ${msg.content}`).join('\n')}

Respond as ${mainPersonas[persona].name} with 1-2 sentences maximum. Keep it conversational and authentic to your personality.`;
    }

    getFallbackResponse(persona) {
        const fallbacks = {
            'kool-keith': 'Abstract thoughts flowing through the universe',
            'dr-octagon': 'Cosmic interference detected in the communication channels',
            'dr-dooom': 'Technical difficulties... someone\'s getting executed for this',
            'black-elvis': 'Funk frequencies experiencing some static, y\'all'
        };
        
        return fallbacks[persona] || 'Connection unstable in the universe';
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
    // UI METHODS
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
    }

    addGuestMessage(guestName, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message guest';
        messageDiv.innerHTML = `
            <div class="message-content">
                <em>*${this.escapeHtml(guestName)} enters*</em><br>
                <strong>${this.escapeHtml(guestName)}:</strong> ${this.escapeHtml(content)}
            </div>
        `;
        
        this.appendMessage(messageDiv);
    }

    addGuestExit(guestName) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message guest';
        messageDiv.innerHTML = `
            <div class="message-content">
                <em>*${this.escapeHtml(guestName)} has left the universe*</em>
            </div>
        `;
        
        this.appendMessage(messageDiv);
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
            this.addSystemMessage(`🎭 Welcome to Keith's Inner Universe Chat Room

Four personas are currently active. Spontaneous events will occur...
You can lurk and watch, or jump in anytime!

Session Duration: 15 minutes`);
        }, 500);
    }

    // ========================================
    // CONTROL METHODS
    // ========================================

    toggleLurkerMode() {
        sessionState.userLurking = !sessionState.userLurking;
        const lurkerBtn = document.getElementById('lurkerMode');
        
        if (lurkerBtn) {
            lurkerBtn.textContent = sessionState.userLurking ? '👁️ Lurk' : '💬 Chat';
            lurkerBtn.style.background = sessionState.userLurking ? 'var(--bg-tertiary)' : 'var(--primary-silver-subtle)';
        }
    }

    async requestBattle() {
        if (sessionState.battleInProgress) return;
        
        sessionState.battleInProgress = true;
        const topic = battleTopics[Math.floor(Math.random() * battleTopics.length)];
        
        this.addSystemMessage(`⚔️ SPONTANEOUS BATTLE REQUESTED!
Topic: "${topic}"
Dr. Dooom vs Dr. Octagon`);
        
        // Quick battle exchange
        setTimeout(() => this.addPersonaMessage('dr-dooom', 'Time to execute this fake cosmic surgeon again'), 2000);
        setTimeout(() => this.addPersonaMessage('dr-octagon', 'Your terrestrial mind cannot comprehend my dimensional superiority'), 4000);
        setTimeout(() => this.addPersonaMessage('dr-dooom', 'Dead personas don\'t talk, shut up and stay buried'), 6000);
        setTimeout(() => {
            this.addSystemMessage('⚔️ Battle complete! The universe continues...');
            sessionState.battleInProgress = false;
        }, 8000);
    }
}

// ========================================
// INITIALIZATION
// ========================================

let keithUniverse;

document.addEventListener('DOMContentLoaded', () => {
    try {
        keithUniverse = new KeithUniverse();
        window.keithUniverse = keithUniverse; // Make globally accessible
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
});
