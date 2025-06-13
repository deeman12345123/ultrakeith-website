/* ========================================
   KEITH STUDIO - CLEAN WORKING VERSION
   FIXED: All chat input and functionality issues
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
    }

    // ========================================
    // INITIALIZATION - CLEAN VERSION
    // ========================================

    initializeUniverse() {
        console.log('🚀 Initializing Keith Universe...');
        
        // Essential element checks
        const requiredElements = [
            'chatInput',
            'sendBtn', 
            'chatMessages',
            'sessionTimer',
            'userCount'
        ];
        
        const missing = requiredElements.filter(id => !document.getElementById(id));
        if (missing.length > 0) {
            console.error('❌ Missing required elements:', missing);
            this.showError('Required elements missing: ' + missing.join(', '));
            return;
        }
        
        console.log('✅ All required elements found');
        
        // Initialize in correct order
        this.setupEventListeners();
        this.startSession();
        this.displayWelcomeMessage();
        this.startAutoEvents();
        this.updateIntensityDisplay();
        
        console.log(`🎭 Keith's Inner Universe activated - ${getCurrentIntensityConfig().name} Mode`);
    }

    showError(message) {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.innerHTML = `
                <div style="text-align: center; color: #ff6666; padding: 20px; border: 1px solid #ff6666; border-radius: 8px; margin: 20px;">
                    <h3>⚠️ Initialization Error</h3>
                    <p>${message}</p>
                    <p><small>Please refresh the page and try again.</small></p>
                </div>
            `;
        }
    }

    setupEventListeners() {
        console.log('🔧 Setting up event listeners...');
        
        // Chat input and send button
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        
        if (chatInput && sendBtn) {
            // Clear existing listeners
            chatInput.onkeydown = null;
            chatInput.oninput = null;
            sendBtn.onclick = null;
            
            // Add fresh listeners
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    console.log('⌨️ Enter key pressed');
                    this.sendUserMessage();
                }
            });
            
            chatInput.addEventListener('input', () => {
                this.updateSendButton();
            });
            
            sendBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🖱️ Send button clicked');
                this.sendUserMessage();
            });
            
            console.log('✅ Chat input listeners attached');
        } else {
            console.error('❌ Chat input or send button not found');
        }

        // Control buttons
        this.setupControlButtons();
        
        // Mobile controls
        this.setupMobileControls();
        
        // Initialize send button state
        this.updateSendButton();
    }

    setupControlButtons() {
        const buttons = [
            { id: 'newSession', handler: () => this.startNewSession() },
            { id: 'pauseChat', handler: () => this.togglePauseChat() },
            { id: 'clearChat', handler: () => this.clearChat() },
            { id: 'saveChat', handler: () => this.saveChat() },
            { id: 'copyChat', handler: () => this.copyChat() }
        ];

        buttons.forEach(({ id, handler }) => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.onclick = null; // Clear existing
                btn.addEventListener('click', handler);
                console.log(`✅ ${id} button connected`);
            } else {
                console.warn(`⚠️ ${id} button not found`);
            }
        });
    }

    setupMobileControls() {
        const toggleUserList = document.getElementById('toggleUserList');
        const mobileOverlay = document.getElementById('mobileOverlay');

        if (toggleUserList) {
            toggleUserList.onclick = null;
            toggleUserList.addEventListener('click', () => this.toggleUserList());
        }

        if (mobileOverlay) {
            mobileOverlay.onclick = null;
            mobileOverlay.addEventListener('click', () => this.closeUserList());
        }
    }

    // ========================================
    // CHAT INPUT FUNCTIONALITY - FIXED
    // ========================================

    async sendUserMessage() {
        console.log('📤 sendUserMessage called');
        
        const chatInput = document.getElementById('chatInput');
        if (!chatInput) {
            console.error('❌ Chat input element not found');
            return;
        }
        
        const message = chatInput.value.trim();
        console.log('💬 Message content:', `"${message}"`);
        
        if (!message) {
            console.log('❌ Empty message, not sending');
            return;
        }
        
        if (this.isProcessing) {
            console.log('⏳ Still processing previous message');
            return;
        }
        
        const userName = sessionState.userName || 'Player';
        console.log('👤 User name:', userName);
        
        // Add message to chat
        this.addUserMessage(userName, message);
        this.addUserToList(userName);
        
        // Clear input
        chatInput.value = '';
        this.updateSendButton();
        
        // Mark user as active
        sessionState.userLurking = false;
        
        console.log('✅ User message added, generating response...');
        
        // Generate persona response
        setTimeout(async () => {
            try {
                const responder = this.selectResponder(message);
                console.log('🎭 Selected responder:', responder);
                
                const context = `${mainPersonas[responder]?.name || responder} responding to ${userName}: "${message}"`;
                await this.generatePersonaResponse(responder, context);
            } catch (error) {
                console.error('❌ Error generating response:', error);
                this.addSystemMessage('⚠️ Error generating response. Please try again.');
            }
        }, 1000 + Math.random() * 3000);
    }

    selectResponder(userMessage) {
        // Check for trigger words
        for (const [persona, data] of Object.entries(mainPersonas)) {
            if (data.triggerWords) {
                for (const trigger of data.triggerWords) {
                    if (userMessage.toLowerCase().includes(trigger)) {
                        console.log(`🎯 Trigger word "${trigger}" found, selecting ${persona}`);
                        return persona;
                    }
                }
            }
        }
        
        // Random selection
        const available = sessionState.personasActive || Object.keys(mainPersonas);
        const selected = available[Math.floor(Math.random() * available.length)];
        console.log('🎲 Random selection:', selected);
        return selected;
    }

    updateSendButton() {
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        
        if (!chatInput || !sendBtn) return;
        
        const hasText = chatInput.value.trim().length > 0;
        const canSend = hasText && !this.isProcessing;
        
        sendBtn.disabled = !canSend;
        
        // Visual feedback
        sendBtn.style.opacity = canSend ? '1' : '0.4';
        sendBtn.style.cursor = canSend ? 'pointer' : 'not-allowed';
        
        // Debug log
        console.log('🔄 Send button state:', { hasText, isProcessing: this.isProcessing, canSend });
    }

    // ========================================
    // PERSONA RESPONSE GENERATION - SIMPLIFIED
    // ========================================

    async generatePersonaResponse(persona, context, presetResponse = null) {
        if (this.isProcessing || this.isPaused) {
            console.log('⏸️ Skipping response - processing or paused');
            return;
        }
        
        if (this.activePersonaResponses.has(persona)) {
            console.log(`🔄 ${persona} already responding, skipping`);
            return;
        }
        
        this.activePersonaResponses.add(persona);
        this.isProcessing = true;
        
        console.log(`🎭 Generating response for ${persona}`);
        
        try {
            let response;
            
            if (presetResponse) {
                response = presetResponse;
            } else {
                // Try API call
                try {
                    const prompt = this.buildChatPrompt(persona, context);
                    response = await this.callChatAPI(prompt);
                    console.log(`✅ API response for ${persona}:`, response);
                } catch (apiError) {
                    console.warn(`⚠️ API failed for ${persona}:`, apiError);
                    response = this.getFallbackResponse(persona);
                }
            }
            
            // Add typing indicator
            this.showTyping(persona);
            
            // Simulate typing delay
            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
            
            this.hideTyping();
            this.addPersonaMessage(persona, response);
            
        } catch (error) {
            console.error(`❌ Error generating response for ${persona}:`, error);
            this.hideTyping();
            this.addPersonaMessage(persona, this.getFallbackResponse(persona));
        } finally {
            this.activePersonaResponses.delete(persona);
            this.isProcessing = false;
            this.updateSendButton(); // Re-enable send button
        }
    }

    buildChatPrompt(persona, context) {
        const personaData = mainPersonas[persona];
        const intensityConfig = getCurrentIntensityConfig();
        
        if (!personaData) {
            throw new Error(`Unknown persona: ${persona}`);
        }
        
        return `You are ${personaData.name} - ${personaData.status} in Keith's chat room.

Context: ${context}
Intensity: ${intensityConfig.name}
User: ${sessionState.userName}

Keep responses short (1-2 sentences) and stay in character as ${personaData.name}.
Be conversational and authentic to your persona.`;
    }

    getFallbackResponse(persona) {
        const fallbacks = {
            'kool-keith': 'Abstract thoughts flowing through the conversation...',
            'dr-octagon': 'Cosmic interference in the communication channels...',
            'dr-dooom': 'Technical difficulties... someone needs to handle this',
            'black-elvis': 'Funk frequencies experiencing some static, y\'all'
        };
        
        return fallbacks[persona] || 'Connection unstable in the universe...';
    }

    // ========================================
    // API INTEGRATION
    // ========================================

    async callChatAPI(prompt) {
        const apiKey = CONFIG.getApiKey();
        if (!apiKey || apiKey.length < 20) {
            throw new Error('Invalid API key configuration');
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.apiTimeout || 15000);

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

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
                return data.candidates[0].content.parts[0].text.trim();
            } else {
                throw new Error('No valid response content from API');
            }
        } finally {
            clearTimeout(timeoutId);
        }
    }

    // ========================================
    // CHAT MANAGEMENT FEATURES
    // ========================================

    clearChat() {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.innerHTML = '';
        }
        
        this.conversationHistory = [];
        this.recentResponses = [];
        if (sessionState.chatLog) {
            sessionState.chatLog = [];
        }
        
        this.addSystemMessage('🗑️ Chat cleared. Personas remain active and ready to continue.');
        console.log('🗑️ Chat cleared');
    }

    async saveChat() {
        try {
            const content = this.generateChatLog();
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
            const filename = `KeithGPT-Chat-${timestamp}.txt`;
            
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.addSystemMessage(`💾 Chat saved as ${filename}`);
            console.log('💾 Chat saved successfully');
            
        } catch (error) {
            console.error('❌ Save error:', error);
            this.addSystemMessage('❌ Error saving chat. Please try again.');
        }
    }

    async copyChat() {
        try {
            const content = this.generateChatLog();
            await navigator.clipboard.writeText(content);
            this.addSystemMessage('📋 Chat copied to clipboard!');
            console.log('📋 Chat copied to clipboard');
            
        } catch (error) {
            console.error('❌ Copy error:', error);
            // Fallback method
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
        const config = getCurrentIntensityConfig();
        const duration = sessionState.startTime ? 
            Math.floor((Date.now() - sessionState.startTime) / 1000) : 0;
        
        let content = `========================================
KEITHGPT - THE PLAYERS CLUB CHAT LOG
========================================

Session Details:
- Date: ${new Date().toLocaleString()}
- Duration: ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}
- User: ${sessionState.userName || 'Player'}
- Intensity: ${config.display}

========================================
MESSAGES:
========================================

`;

        // Add conversation history
        this.conversationHistory.forEach(entry => {
            content += `${entry.speaker}: ${entry.content}\n`;
        });

        content += `\n========================================
Generated by KeithGPT - The Players Club
========================================`;

        return content;
    }

    togglePauseChat() {
        this.isPaused = !this.isPaused;
        const pauseBtn = document.getElementById('pauseChat');
        
        if (this.isPaused) {
            if (pauseBtn) {
                pauseBtn.innerHTML = '▶️ Resume';
                pauseBtn.style.background = '#ffaa00';
            }
            this.addSystemMessage('⏸️ Chat paused. Click Resume to continue.');
        } else {
            if (pauseBtn) {
                pauseBtn.innerHTML = '⏸️ Pause';
                pauseBtn.style.background = '';
            }
            this.addSystemMessage('▶️ Chat resumed.');
        }
        
        console.log(`${this.isPaused ? '⏸️ Paused' : '▶️ Resumed'} chat`);
    }

    updateIntensityDisplay() {
        const intensityDisplay = document.getElementById('intensityDisplay');
        if (intensityDisplay) {
            const config = getCurrentIntensityConfig();
            intensityDisplay.textContent = config.display;
            intensityDisplay.style.color = {
                1: '#66ff66',
                2: '#ffaa00', 
                3: '#ff6666'
            }[sessionState.intensityLevel] || '#ffaa00';
        }
    }

    // ========================================
    // MOBILE FUNCTIONALITY
    // ========================================

    toggleUserList() {
        const userList = document.getElementById('userList');
        const overlay = document.getElementById('mobileOverlay');
        
        if (userList && overlay) {
            const isShowing = userList.classList.contains('show');
            
            if (isShowing) {
                userList.classList.remove('show');
                overlay.classList.remove('show');
            } else {
                userList.classList.add('show');
                overlay.classList.add('show');
            }
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
        sessionState.sessionStartTime = Date.now();
        sessionState.tokensUsed = 0;
        sessionState.userLurking = true;
        sessionState.chatLog = [];
        
        this.startSessionTimer();
        this.updateSessionDisplay();
        console.log('🕐 Session started');
    }

    startSessionTimer() {
        this.sessionTimer = setInterval(() => {
            const elapsed = Date.now() - sessionState.startTime;
            const remaining = (CONFIG.sessionDuration || 900000) - elapsed; // 15 min default
            
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
            remaining = (CONFIG.sessionDuration || 900000) - (Date.now() - sessionState.startTime);
        }
        
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        timerEl.textContent = `Session: ${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (remaining < 60000) {
            timerEl.style.color = '#ffaa00';
        }
    }

    endSession() {
        clearInterval(this.sessionTimer);
        clearInterval(this.autoEventTimer);
        clearTimeout(this.guestAppearanceTimer);
        
        this.addSystemMessage('🎭 Session complete! Click "New" to start another session.');
        
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        if (chatInput) chatInput.disabled = true;
        if (sendBtn) sendBtn.disabled = true;
        
        console.log('⏰ Session ended');
    }

    startNewSession() {
        this.clearMessages();
        
        // Reset session state but keep user preferences
        const userName = sessionState.userName;
        const intensityLevel = sessionState.intensityLevel;
        
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
            userName: userName,
            intensityLevel: intensityLevel,
            chatLog: [],
            sessionStartTime: null
        };
        
        // Reset instance state
        this.recentResponses = [];
        this.activePersonaResponses.clear();
        this.isPaused = false;
        
        // Reset UI
        const pauseBtn = document.getElementById('pauseChat');
        if (pauseBtn) {
            pauseBtn.innerHTML = '⏸️ Pause';
            pauseBtn.style.background = '';
        }
        
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        if (chatInput) {
            chatInput.disabled = false;
            chatInput.focus();
        }
        if (sendBtn) sendBtn.disabled = false;
        
        this.startSession();
        this.displayWelcomeMessage();
        this.startAutoEvents();
        
        console.log('🔄 New session started');
    }

    // ========================================
    // AUTO EVENTS
    // ========================================

    startAutoEvents() {
        // Start personas conversation
        setTimeout(() => this.personasEnterChat(), 2000);
        
        // Random events
        this.autoEventTimer = setInterval(() => {
            if (!this.isPaused) {
                this.triggerRandomEvent();
            }
        }, 20000 + Math.random() * 40000); // 20-60 seconds
        
        // Guest appearances
        this.scheduleGuestAppearance();
    }

    async triggerRandomEvent() {
        if (this.isProcessing || this.isPaused) return;
        
        const events = [
            () => this.triggerSpontaneousComment(),
            () => this.triggerGuestAppearance()
        ];
        
        const event = events[Math.floor(Math.random() * events.length)];
        await event();
    }

    async triggerSpontaneousComment() {
        const comments = {
            'kool-keith': [
                'Abstract creativity keeps flowing through the universe',
                'Innovation never stops in the foundation',
                'Ultramagnetic energy connecting all dimensions'
            ],
            'dr-octagon': [
                'Cosmic surgical procedures continue their evolution',
                'Dimensional consciousness expanding through space-time',
                'Medical frequencies operating on multiple levels'
            ],
            'dr-dooom': [
                'Real recognize real in this conversation',
                'Fake MCs still need correction in the industry',
                'Street authenticity remains the standard'
            ],
            'black-elvis': [
                'Funk therapy healing all the negative vibrations',
                'Musical harmony bringing peace to the session',
                'Genre-blending creates infinite possibilities'
            ]
        };
        
        const personas = Object.keys(comments);
        const persona = personas[Math.floor(Math.random() * personas.length)];
        const personaComments = comments[persona];
        const comment = personaComments[Math.floor(Math.random() * personaComments.length)];
        
        await this.generatePersonaResponse(persona, `${persona} spontaneous comment`, comment);
    }

    triggerGuestAppearance() {
        if (!guestPersonas || Object.keys(guestPersonas).length === 0) return;
        
        const guestKeys = Object.keys(guestPersonas);
        const guestKey = guestKeys[Math.floor(Math.random() * guestKeys.length)];
        const guest = guestPersonas[guestKey];
        
        this.addGuestMessage(guest.name, guest.line);
        this.addGuestToList(guest.name);
        
        setTimeout(() => {
            this.addGuestExit(guest.name);
            this.removeGuestFromList(guest.name);
        }, guest.duration);
    }

    scheduleGuestAppearance() {
        const delay = 45000 + Math.random() * 90000; // 45-135 seconds
        this.guestAppearanceTimer = setTimeout(() => {
            if (!this.isPaused) {
                this.triggerGuestAppearance();
                this.scheduleGuestAppearance();
            }
        }, delay);
    }

    personasEnterChat() {
        const intensityLevel = sessionState.intensityLevel || 2;
        
        const entryMessages = {
            1: { // Tame
                'dr-octagon': 'Medical knowledge ready for discussion',
                'kool-keith': 'Creative foundation established for conversation',
                'black-elvis': 'Musical harmony bringing positive energy',
                'dr-dooom': 'Real hip-hop discussion starting now'
            },
            2: { // Players Mode
                'dr-octagon': 'Cosmic surgical procedures evolving through dimensions',
                'dr-dooom': 'Cleaning out fake MCs, one conversation at a time',
                'black-elvis': 'Funk therapy balancing the energy in here',
                'kool-keith': 'Abstract foundation connecting everything'
            },
            3: { // Wild
                'dr-dooom': 'Time for brutal execution of fake MCs',
                'dr-octagon': 'Dimensional surgery dissecting primitive consciousness',
                'kool-keith': 'Raw creative energy exploding through the foundation',
                'black-elvis': 'Aggressive funk therapy with maximum intensity'
            }
        };
        
        const messages = entryMessages[intensityLevel] || entryMessages[2];
        const personas = Object.keys(messages);
        
        personas.forEach((persona, index) => {
            setTimeout(() => {
                this.addPersonaMessage(persona, messages[persona]);
                this.addToHistory(mainPersonas[persona]?.name || persona, messages[persona]);
            }, (index + 1) * 3000);
        });
        
        // Welcome user
        setTimeout(() => {
            const welcomes = {
                1: 'Welcome to our discussion',
                2: 'Fresh face in the club - what\'s good?',
                3: 'Another player joins the intense conversation'
            };
            
            const welcome = welcomes[intensityLevel] || welcomes[2];
            this.addPersonaMessage('dr-dooom', welcome);
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
    }

    removeGuestFromList(guestName) {
        const guestList = document.getElementById('guestList');
        if (!guestList) return;
        
        const guestItems = guestList.querySelectorAll('.guest-item');
        guestItems.forEach(item => {
            const nameSpan = item.querySelector('.guest-name');
            if (nameSpan && nameSpan.textContent === guestName) {
                item.remove();
                this.updateUserCount();
                
                const remainingGuests = guestList.querySelectorAll('.guest-item');
                if (remainingGuests.length === 0) {
                    const guestNote = guestList.querySelector('.guest-note');
                    if (guestNote) guestNote.style.display = 'block';
                }
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
    // MESSAGE DISPLAY FUNCTIONS
    // ========================================

    addSystemMessage(content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'system-message';
        messageDiv.innerHTML = `<div class="message-content">${this.escapeHtml(content)}</div>`;
        this.appendMessage(messageDiv);
    }

    addPersonaMessage(persona, content) {
        const personaData = mainPersonas[persona];
        if (!personaData) {
            console.warn(`Unknown persona: ${persona}`);
            return;
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${persona}`;
        messageDiv.innerHTML = `
            <img src="${personaData.avatar}" alt="${personaData.name}" class="message-avatar" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIGZpbGw9IiNjY2MiIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZD0iTTggOGEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTItM2EyIDIgMCAxIDEtNCAwIDIgMiAwIDAgMSA0IDB6bTQgOGMwIDEtMSAxLTEgMUgzcy0xIDAtMS0xIDEtNCA2LTQgNiAzIDYgNHoiLz48L3N2Zz4='">
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
        if (this.conversationHistory.length > 50) {
            this.conversationHistory = this.conversationHistory.slice(-50);
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
                <img src="${personaData.avatar}" alt="${personaData.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiNjY2MiIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZD0iTTggOGEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTItM2EyIDIgMCAxIDEtNCAwIDIgMiAwIDAgMSA0IDB6bTQgOGMwIDEtMSAxLTEgMUgzcy0xIDAtMS0xIDEtNCA2LTQgNiAzIDYgNHoiLz48L3N2Zz4='">
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
            const config = getCurrentIntensityConfig();
            this.addSystemMessage(`👥 Welcome to The Players Club Chat Room

User: ${sessionState.userName || 'Player'}
Intensity Level: ${config.display}
Four personas are currently active. Spontaneous events will occur...
You can lurk and watch, or jump in anytime!

Session Duration: 15 minutes`);
        }, 500);
    }
}

// ========================================
// INITIALIZATION
// ========================================

let keithUniverse;

document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('🚀 DOM loaded, initializing Keith Universe...');
        
        keithUniverse = new KeithUniverse();
        window.keithUniverse = keithUniverse;
        
        console.log('✅ Keith Universe class created');
        
        // Don't auto-initialize - wait for entry screen
        console.log('⏳ Waiting for entry screen completion...');
        
    } catch (error) {
        console.error('❌ Keith Universe initialization failed:', error);
        document.body.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100vh; background: #1A1A1A; color: #fff; font-family: Arial, sans-serif;">
                <div style="text-align: center;">
                    <h1 style="color: #C0C0C0;">Keith Studio Failed to Load</h1>
                    <p>Error: ${error.message}</p>
                    <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #C0C0C0; color: #1A1A1A; border: none; border-radius: 5px; cursor: pointer;">Refresh Page</button>
                </div>
            </div>
        `;
    }
});

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (event) => {
    console.error('🔥 Global JavaScript error:', event.error);
    console.error('Error details:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
    });
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('🔥 Unhandled promise rejection:', event.reason);
});
