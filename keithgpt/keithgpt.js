/* ========================================
   KEITH STUDIO - CLEAN WORKING VERSION
   COMPLETELY FIXED: No async errors at all
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

    initializeUniverse() {
        console.log('🚀 Initializing Keith Universe...');
        
        var requiredElements = [
            'chatInput',
            'sendBtn', 
            'chatMessages',
            'sessionTimer',
            'userCount',
            'toggleUserList',
            'userList',
            'mobileOverlay'
        ];
        
        var missing = [];
        for (var i = 0; i < requiredElements.length; i++) {
            if (!document.getElementById(requiredElements[i])) {
                missing.push(requiredElements[i]);
            }
        }
        
        if (missing.length > 0) {
            console.error('❌ Missing required elements:', missing);
            this.showError('Required elements missing: ' + missing.join(', '));
            return;
        }
        
        console.log('✅ All required elements found');
        
        this.setupEventListeners();
        this.startSession();
        this.displayWelcomeMessage();
        this.startAutoEvents();
        this.updateIntensityDisplay();
        this.initializeUserList();
        
        var config = getCurrentIntensityConfig();
        console.log('🎭 Keith\'s Inner Universe activated - ' + config.name + ' Mode');
    }

    showError(message) {
        var chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.innerHTML = '<div style="text-align: center; color: #ff6666; padding: 20px; border: 1px solid #ff6666; border-radius: 8px; margin: 20px;"><h3>⚠️ Initialization Error</h3><p>' + message + '</p><p><small>Please refresh the page and try again.</small></p></div>';
        }
    }

    setupEventListeners() {
        console.log('🔧 Setting up event listeners...');
        
        var self = this;
        var chatInput = document.getElementById('chatInput');
        var sendBtn = document.getElementById('sendBtn');
        
        if (chatInput && sendBtn) {
            chatInput.onkeydown = null;
            chatInput.oninput = null;
            sendBtn.onclick = null;
            
            chatInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    console.log('⌨️ Enter key pressed');
                    self.sendUserMessage();
                }
            });
            
            chatInput.addEventListener('input', function() {
                self.updateSendButton();
            });
            
            sendBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('🖱️ Send button clicked');
                self.sendUserMessage();
            });
            
            console.log('✅ Chat input listeners attached');
        }

        this.setupControlButtons();
        this.setupMobileControls();
        this.updateSendButton();
    }

    setupControlButtons() {
        var self = this;
        var buttons = [
            { id: 'newSession', handler: function() { self.startNewSession(); } },
            { id: 'pauseChat', handler: function() { self.togglePauseChat(); } },
            { id: 'clearChat', handler: function() { self.clearChat(); } },
            { id: 'saveChat', handler: function() { self.saveChat(); } },
            { id: 'copyChat', handler: function() { self.copyChat(); } }
        ];

        for (var i = 0; i < buttons.length; i++) {
            var btn = document.getElementById(buttons[i].id);
            if (btn) {
                btn.onclick = null;
                btn.addEventListener('click', buttons[i].handler);
                console.log('✅ ' + buttons[i].id + ' button connected');
            }
        }
    }

    setupMobileControls() {
        var self = this;
        var toggleUserList = document.getElementById('toggleUserList');
        var mobileOverlay = document.getElementById('mobileOverlay');

        if (toggleUserList) {
            toggleUserList.onclick = null;
            toggleUserList.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('📱 Mobile toggle clicked');
                self.toggleUserList();
            });
            console.log('✅ Mobile toggle connected');
        }

        if (mobileOverlay) {
            mobileOverlay.onclick = null;
            mobileOverlay.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('📱 Mobile overlay clicked');
                self.closeUserList();
            });
            console.log('✅ Mobile overlay connected');
        }
    }

    initializeUserList() {
        this.updateUserCount();
        console.log('👥 User list initialized');
    }

    toggleUserList() {
        var userList = document.getElementById('userList');
        var overlay = document.getElementById('mobileOverlay');
        var toggleBtn = document.getElementById('toggleUserList');
        
        if (!userList || !overlay) {
            console.error('❌ User list or overlay not found');
            return;
        }
        
        var isShowing = userList.classList.contains('show');
        console.log('📱 Toggle user list - currently showing:', isShowing);
        
        if (isShowing) {
            userList.classList.remove('show');
            overlay.classList.remove('show');
            if (toggleBtn) toggleBtn.classList.remove('active');
            console.log('📱 User list hidden');
        } else {
            userList.classList.add('show');
            overlay.classList.add('show');
            if (toggleBtn) toggleBtn.classList.add('active');
            console.log('📱 User list shown');
        }
    }

    closeUserList() {
        var userList = document.getElementById('userList');
        var overlay = document.getElementById('mobileOverlay');
        var toggleBtn = document.getElementById('toggleUserList');
        
        if (userList && overlay) {
            userList.classList.remove('show');
            overlay.classList.remove('show');
            if (toggleBtn) toggleBtn.classList.remove('active');
            console.log('📱 User list closed');
        }
    }

    sendUserMessage() {
        console.log('📤 sendUserMessage called');
        
        var chatInput = document.getElementById('chatInput');
        if (!chatInput) {
            console.error('❌ Chat input element not found');
            return;
        }
        
        var message = chatInput.value.trim();
        console.log('💬 Message content:', message);
        
        if (!message) {
            console.log('❌ Empty message, not sending');
            return;
        }
        
        if (this.isProcessing) {
            console.log('⏳ Still processing previous message');
            return;
        }
        
        var sessionState = window.sessionState || { userName: 'Player' };
        var userName = sessionState.userName || 'Player';
        console.log('👤 User name:', userName);
        
        this.addUserMessage(userName, message);
        this.addUserToUnifiedList(userName, 'User', 'user');
        
        chatInput.value = '';
        this.updateSendButton();
        
        if (window.sessionState) {
            window.sessionState.userLurking = false;
        }
        
        console.log('✅ User message added, generating response...');
        
        var self = this;
        setTimeout(function() {
            try {
                var responder = self.selectResponder(message);
                console.log('🎭 Selected responder:', responder);
                
                var context = (mainPersonas[responder] ? mainPersonas[responder].name : responder) + ' responding to ' + userName + ': "' + message + '"';
                self.generatePersonaResponse(responder, context);
            } catch (error) {
                console.error('❌ Error generating response:', error);
                self.addSystemMessage('⚠️ Error generating response. Please try again.');
            }
        }, 1000 + Math.random() * 3000);
    }

    selectResponder(userMessage) {
        for (var persona in mainPersonas) {
            var data = mainPersonas[persona];
            if (data.triggerWords) {
                for (var i = 0; i < data.triggerWords.length; i++) {
                    var trigger = data.triggerWords[i];
                    if (userMessage.toLowerCase().includes(trigger)) {
                        console.log('🎯 Trigger word "' + trigger + '" found, selecting ' + persona);
                        return persona;
                    }
                }
            }
        }
        
        var sessionState = window.sessionState || { personasActive: Object.keys(mainPersonas) };
        var available = sessionState.personasActive || Object.keys(mainPersonas);
        var selected = available[Math.floor(Math.random() * available.length)];
        console.log('🎲 Random selection:', selected);
        return selected;
    }

    updateSendButton() {
        var chatInput = document.getElementById('chatInput');
        var sendBtn = document.getElementById('sendBtn');
        
        if (!chatInput || !sendBtn) return;
        
        var hasText = chatInput.value.trim().length > 0;
        var canSend = hasText && !this.isProcessing;
        
        sendBtn.disabled = !canSend;
        sendBtn.style.opacity = canSend ? '1' : '0.4';
        sendBtn.style.cursor = canSend ? 'pointer' : 'not-allowed';
    }

    generatePersonaResponse(persona, context, presetResponse) {
        if (this.isProcessing || this.isPaused) {
            console.log('⏸️ Skipping response - processing or paused');
            return;
        }
        
        if (this.activePersonaResponses.has(persona)) {
            console.log('🔄 ' + persona + ' already responding, skipping');
            return;
        }
        
        this.activePersonaResponses.add(persona);
        this.isProcessing = true;
        
        console.log('🎭 Generating response for ' + persona);
        
        var self = this;
        
        if (presetResponse) {
            this.processPersonaResponse(persona, presetResponse);
        } else {
            var prompt = this.buildChatPrompt(persona, context);
            this.callChatAPI(prompt, function(response) {
                console.log('✅ API response for ' + persona + ':', response);
                self.processPersonaResponse(persona, response);
            }, function(error) {
                console.warn('⚠️ API failed for ' + persona + ':', error);
                var fallback = self.getFallbackResponse(persona);
                self.processPersonaResponse(persona, fallback);
            });
        }
    }

    processPersonaResponse(persona, response) {
        var self = this;
        
        this.showTyping(persona);
        
        setTimeout(function() {
            self.hideTyping();
            self.addPersonaMessage(persona, response);
            self.activePersonaResponses.delete(persona);
            self.isProcessing = false;
            self.updateSendButton();
        }, 1000 + Math.random() * 2000);
    }

    buildChatPrompt(persona, context) {
        var personaData = mainPersonas[persona];
        var intensityConfig = getCurrentIntensityConfig();
        
        if (!personaData) {
            throw new Error('Unknown persona: ' + persona);
        }
        
        var sessionState = window.sessionState || { userName: 'Player' };
        
        return 'You are ' + personaData.name + ' - ' + personaData.status + ' in Keith\'s chat room.\n\nContext: ' + context + '\nIntensity: ' + intensityConfig.name + '\nUser: ' + sessionState.userName + '\n\nKeep responses short (1-2 sentences) and stay in character as ' + personaData.name + '.\nBe conversational and authentic to your persona.';
    }

    getFallbackResponse(persona) {
        var fallbacks = {
            'kool-keith': 'Abstract thoughts flowing through the conversation...',
            'dr-octagon': 'Cosmic interference in the communication channels...',
            'dr-dooom': 'Technical difficulties... someone needs to handle this',
            'black-elvis': 'Funk frequencies experiencing some static, y\'all'
        };
        
        return fallbacks[persona] || 'Connection unstable in the universe...';
    }

    callChatAPI(prompt, onSuccess, onError) {
        var apiKey = CONFIG.getApiKey();
        if (!apiKey || apiKey.length < 20) {
            onError(new Error('Invalid API key configuration'));
            return;
        }

        var controller = new AbortController();
        var timeoutId = setTimeout(function() {
            controller.abort();
        }, CONFIG.apiTimeout || 15000);

        fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey, {
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
        })
        .then(function(response) {
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error('HTTP ' + response.status + ': ' + response.statusText);
            }
            return response.json();
        })
        .then(function(data) {
            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text) {
                onSuccess(data.candidates[0].content.parts[0].text.trim());
            } else {
                onError(new Error('No valid response content from API'));
            }
        })
        .catch(function(error) {
            clearTimeout(timeoutId);
            onError(error);
        });
    }

    clearChat() {
        var chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.innerHTML = '';
        }
        
        this.conversationHistory = [];
        this.recentResponses = [];
        
        if (window.sessionState && window.sessionState.chatLog) {
            window.sessionState.chatLog = [];
        }
        
        this.addSystemMessage('🗑️ Chat cleared. Personas remain active and ready to continue.');
        console.log('🗑️ Chat cleared');
    }

    saveChat() {
        try {
            var content = this.generateChatLog();
            var timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
            var filename = 'KeithGPT-Chat-' + timestamp + '.txt';
            
            var blob = new Blob([content], { type: 'text/plain' });
            var url = URL.createObjectURL(blob);
            
            var a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.addSystemMessage('💾 Chat saved as ' + filename);
            console.log('💾 Chat saved successfully');
            
        } catch (error) {
            console.error('❌ Save error:', error);
            this.addSystemMessage('❌ Error saving chat. Please try again.');
        }
    }

    copyChat() {
        var self = this;
        try {
            var content = this.generateChatLog();
            if (navigator.clipboard) {
                navigator.clipboard.writeText(content).then(function() {
                    self.addSystemMessage('📋 Chat copied to clipboard!');
                    console.log('📋 Chat copied to clipboard');
                }).catch(function(error) {
                    console.error('❌ Copy error:', error);
                    self.fallbackCopy(content);
                });
            } else {
                this.fallbackCopy(content);
            }
        } catch (error) {
            console.error('❌ Copy error:', error);
            this.fallbackCopy(this.generateChatLog());
        }
    }

    fallbackCopy(content) {
        var textArea = document.createElement('textarea');
        textArea.value = content;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        this.addSystemMessage('📋 Chat copied to clipboard!');
    }

    generateChatLog() {
        var config = getCurrentIntensityConfig();
        var sessionState = window.sessionState || {};
        var duration = sessionState.startTime ? Math.floor((Date.now() - sessionState.startTime) / 1000) : 0;
        
        var content = '========================================\nKEITHGPT - THE PLAYERS CLUB CHAT LOG\n========================================\n\nSession Details:\n- Date: ' + new Date().toLocaleString() + '\n- Duration: ' + Math.floor(duration / 60) + ':' + (duration % 60).toString().padStart(2, '0') + '\n- User: ' + (sessionState.userName || 'Player') + '\n- Intensity: ' + config.display + '\n\n========================================\nMESSAGES:\n========================================\n\n';

        for (var i = 0; i < this.conversationHistory.length; i++) {
            var entry = this.conversationHistory[i];
            content += entry.speaker + ': ' + entry.content + '\n';
        }

        content += '\n========================================\nGenerated by KeithGPT - The Players Club\n========================================';

        return content;
    }

    togglePauseChat() {
        this.isPaused = !this.isPaused;
        var pauseBtn = document.getElementById('pauseChat');
        
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
        
        console.log(this.isPaused ? '⏸️ Paused' : '▶️ Resumed' + ' chat');
    }

    updateIntensityDisplay() {
        var intensityDisplay = document.getElementById('intensityDisplay');
        if (intensityDisplay) {
            var config = getCurrentIntensityConfig();
            intensityDisplay.textContent = config.display;
            
            var sessionState = window.sessionState || { intensityLevel: 2 };
            var colors = {
                1: '#66ff66',
                2: '#ffaa00', 
                3: '#ff6666'
            };
            intensityDisplay.style.color = colors[sessionState.intensityLevel] || '#ffaa00';
        }
    }

    startSession() {
        if (!window.sessionState) {
            window.sessionState = {};
        }
        
        window.sessionState.startTime = Date.now();
        window.sessionState.sessionStartTime = Date.now();
        window.sessionState.tokensUsed = 0;
        window.sessionState.userLurking = true;
        window.sessionState.chatLog = [];
        
        this.startSessionTimer();
        this.updateSessionDisplay();
        console.log('🕐 Session started');
    }

    startSessionTimer() {
        var self = this;
        this.sessionTimer = setInterval(function() {
            var sessionState = window.sessionState || {};
            var elapsed = Date.now() - (sessionState.startTime || Date.now());
            var remaining = (CONFIG.sessionDuration || 900000) - elapsed;
            
            if (remaining <= 0) {
                self.endSession();
                return;
            }
            
            self.updateSessionDisplay(remaining);
        }, 1000);
    }

    updateSessionDisplay(remaining) {
        var timerEl = document.getElementById('sessionTimer');
        if (!timerEl) return;
        
        if (remaining === null || remaining === undefined) {
            var sessionState = window.sessionState || {};
            remaining = (CONFIG.sessionDuration || 900000) - (Date.now() - (sessionState.startTime || Date.now()));
        }
        
        var minutes = Math.floor(remaining / 60000);
        var seconds = Math.floor((remaining % 60000) / 1000);
        timerEl.textContent = 'Session: ' + minutes + ':' + seconds.toString().padStart(2, '0');
        
        if (remaining < 60000) {
            timerEl.style.color = '#ffaa00';
        }
    }

    endSession() {
        clearInterval(this.sessionTimer);
        clearInterval(this.autoEventTimer);
        clearTimeout(this.guestAppearanceTimer);
        
        this.addSystemMessage('🎭 Session complete! Click "🔄" to start another session.');
        
        var chatInput = document.getElementById('chatInput');
        var sendBtn = document.getElementById('sendBtn');
        if (chatInput) chatInput.disabled = true;
        if (sendBtn) sendBtn.disabled = true;
        
        console.log('⏰ Session ended');
    }

    startNewSession() {
        this.clearMessages();
        
        var sessionState = window.sessionState || {};
        var userName = sessionState.userName;
        var intensityLevel = sessionState.intensityLevel;
        
        window.sessionState = {
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
        
        this.recentResponses = [];
        this.activePersonaResponses.clear();
        this.isPaused = false;
        
        var pauseBtn = document.getElementById('pauseChat');
        if (pauseBtn) {
            pauseBtn.innerHTML = '⏸️ Pause';
            pauseBtn.style.background = '';
        }
        
        var chatInput = document.getElementById('chatInput');
        var sendBtn = document.getElementById('sendBtn');
        if (chatInput) {
            chatInput.disabled = false;
            chatInput.focus();
        }
        if (sendBtn) sendBtn.disabled = false;
        
        this.resetUserList();
        this.startSession();
        this.displayWelcomeMessage();
        this.startAutoEvents();
        
        console.log('🔄 New session started');
    }

    startAutoEvents() {
        var self = this;
        
        setTimeout(function() {
            self.personasEnterChat();
        }, 2000);
        
        this.autoEventTimer = setInterval(function() {
            if (!self.isPaused) {
                self.triggerRandomEvent();
            }
        }, 20000 + Math.random() * 40000);
        
        this.scheduleGuestAppearance();
    }

    triggerRandomEvent() {
        if (this.isProcessing || this.isPaused) return;
        
        var events = [
            this.triggerSpontaneousComment.bind(this),
            this.triggerGuestAppearance.bind(this)
        ];
        
        var event = events[Math.floor(Math.random() * events.length)];
        event();
    }

    triggerSpontaneousComment() {
        var comments = {
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
        
        var personas = Object.keys(comments);
        var persona = personas[Math.floor(Math.random() * personas.length)];
        var personaComments = comments[persona];
        var comment = personaComments[Math.floor(Math.random() * personaComments.length)];
        
        this.generatePersonaResponse(persona, persona + ' spontaneous comment', comment);
    }

    triggerGuestAppearance() {
        if (!guestPersonas || Object.keys(guestPersonas).length === 0) return;
        
        var guestKeys = Object.keys(guestPersonas);
        var guestKey = guestKeys[Math.floor(Math.random() * guestKeys.length)];
        var guest = guestPersonas[guestKey];
        
        var willSpeak = Math.random() < 0.4;
        
        if (willSpeak) {
            this.addGuestMessage(guest.name, guest.line);
            console.log('🗣️ ' + guest.name + ' spoke: ' + guest.line);
        } else {
            console.log('👁️ ' + guest.name + ' lurked silently');
        }
        
        this.addUserToUnifiedList(guest.name, 'Visitor', 'visitor');
        
        var self = this;
        setTimeout(function() {
            if (willSpeak) {
                self.addGuestExit(guest.name);
            }
            self.removeUserFromUnifiedList(guest.name);
            console.log('👋 ' + guest.name + ' left');
        }, guest.duration);
    }

    scheduleGuestAppearance() {
        var delay = 45000 + Math.random() * 90000;
        var self = this;
        this.guestAppearanceTimer = setTimeout(function() {
            if (!self.isPaused) {
                self.triggerGuestAppearance();
                self.scheduleGuestAppearance();
            }
        }, delay);
    }

    personasEnterChat() {
        var sessionState = window.sessionState || { intensityLevel: 2 };
        var intensityLevel = sessionState.intensityLevel || 2;
        
        var entryMessages = {
            1: {
                'dr-octagon': 'Medical knowledge ready for discussion',
                'kool-keith': 'Creative foundation established for conversation',
                'black-elvis': 'Musical harmony bringing positive energy',
                'dr-dooom': 'Real hip-hop discussion starting now'
            },
            2: {
                'dr-octagon': 'Cosmic surgical procedures evolving through dimensions',
                'dr-dooom': 'Cleaning out fake MCs, one conversation at a time',
                'black-elvis': 'Funk therapy balancing the energy in here',
                'kool-keith': 'Abstract foundation connecting everything'
            },
            3: {
                'dr-dooom': 'Time for brutal execution of fake MCs',
                'dr-octagon': 'Dimensional surgery dissecting primitive consciousness',
                'kool-keith': 'Raw creative energy exploding through the foundation',
                'black-elvis': 'Aggressive funk therapy with maximum intensity'
            }
        };
        
        var messages = entryMessages[intensityLevel] || entryMessages[2];
        var personas = Object.keys(messages);
        
        var self = this;
        for (var i = 0; i < personas.length; i++) {
            (function(persona, delay) {
                setTimeout(function() {
                    self.addPersonaMessage(persona, messages[persona]);
                    self.addToHistory(mainPersonas[persona] ? mainPersonas[persona].name : persona, messages[persona]);
                }, delay);
            })(personas[i], (i + 1) * 3000);
        }
        
        setTimeout(function() {
            var welcomes = {
                1: 'Welcome to our discussion',
                2: 'Fresh face in the club - what\'s good?',
                3: 'Another player joins the intense conversation'
            };
            
            var welcome = welcomes[intensityLevel] || welcomes[2];
            self.addPersonaMessage('dr-dooom', welcome);
        }, 15000);
    }

    addUserToUnifiedList(userName, status, type) {
        var allUsersList = document.getElementById('allUsersList');
        if (!allUsersList) return;
        
        var userNote = allUsersList.querySelector('.user-note');
        if (userNote) userNote.style.display = 'none';
        
        var existingUser = allUsersList.querySelector('[data-user="' + userName + '"]');
        if (existingUser) return;
        
        var avatarColor = type === 'user' ? '#4488ff' : '#cccccc';
        var avatarSVG = 'data:image/svg+xml;base64,' + btoa('<svg width="28" height="28" fill="' + avatarColor + '" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4z"/></svg>');
        
        var userDiv = document.createElement('div');
        userDiv.className = 'user-item';
        userDiv.setAttribute('data-user', userName);
        userDiv.innerHTML = '<img src="' + avatarSVG + '" alt="' + userName + '"><div class="user-item-info"><span class="user-item-name">' + this.escapeHtml(userName) + '</span><span class="user-item-status">' + status + '</span></div><div class="status-dot online"></div>';
        
        allUsersList.appendChild(userDiv);
        this.updateUserCount();
        console.log('👤 Added ' + userName + ' (' + type + ') to unified list');
    }

    removeUserFromUnifiedList(userName) {
        var allUsersList = document.getElementById('allUsersList');
        if (!allUsersList) return;
        
        var userItem = allUsersList.querySelector('[data-user="' + userName + '"]');
        if (userItem) {
            userItem.remove();
            this.updateUserCount();
            console.log('👋 Removed ' + userName + ' from unified list');
            
            var remainingUsers = allUsersList.querySelectorAll('.user-item');
            if (remainingUsers.length === 0) {
                var userNote = allUsersList.querySelector('.user-note');
                if (userNote) userNote.style.display = 'block';
            }
        }
    }

    resetUserList() {
        var allUsersList = document.getElementById('allUsersList');
        if (allUsersList) {
            var userItems = allUsersList.querySelectorAll('.user-item');
            for (var i = 0; i < userItems.length; i++) {
                userItems[i].remove();
            }
            
            var userNote = allUsersList.querySelector('.user-note');
            if (userNote) userNote.style.display = 'block';
        }
        
        this.updateUserCount();
        console.log('👥 User list reset');
    }

    updateUserCount() {
        var userCountEl = document.getElementById('userCount');
        if (!userCountEl) return;
        
        var mainPersonas = 4;
        var dynamicUsers = document.querySelectorAll('#allUsersList .user-item').length;
        var total = mainPersonas + dynamicUsers;
        
        userCountEl.textContent = total + ' online';
    }

    addSystemMessage(content) {
        var messageDiv = document.createElement('div');
        messageDiv.className = 'system-message';
        messageDiv.innerHTML = '<div class="message-content">' + this.escapeHtml(content) + '</div>';
        this.appendMessage(messageDiv);
    }

    addPersonaMessage(persona, content) {
        var personaData = mainPersonas[persona];
        if (!personaData) {
            console.warn('Unknown persona: ' + persona);
            return;
        }

        var messageDiv = document.createElement('div');
        messageDiv.className = 'message ' + persona;
        messageDiv.innerHTML = '<img src="' + personaData.avatar + '" alt="' + personaData.name + '" class="message-avatar" onerror="this.src=\'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIGZpbGw9IiNjY2MiIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZD0iTTggOGEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTItM2EyIDIgMCExIDEtNCAwIDIgMiAwIDAgMSA0IDB6bTQgOGMwIDEtMSAxLTEgMUgzcy0xIDAtMS0xIDEtNCA2LTQgNiAzIDYgNHoiLz48L3N2Zz4=\'"><div class="message-content"><strong>' + personaData.name + ':</strong> ' + this.escapeHtml(content) + '</div>';
        
        this.appendMessage(messageDiv);
        this.addToHistory(personaData.name, content);
        this.addToChatLog(personaData.name, content);
    }

    addUserMessage(userName, content) {
        var messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = '<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIGZpbGw9IiM0NDg4ZmYiIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZD0iTTggOGEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTItM2EyIDIgMCAxIDEtNCAwIDIgMiAwIDAgMSA0IDB6bTQgOGMwIDEtMSAxLTEgMUgzcy0xIDAtMS0xIDEtNCA2LTQgNiAzIDYgNHoiLz48L3N2Zz4=" alt="' + userName + '" class="message-avatar"><div class="message-content"><strong>' + this.escapeHtml(userName) + ':</strong> ' + this.escapeHtml(content) + '</div>';
        
        this.appendMessage(messageDiv);
        this.addToHistory(userName, content);
        this.addToChatLog(userName, content);
    }

    addGuestMessage(guestName, content) {
        var messageDiv = document.createElement('div');
        messageDiv.className = 'message guest';
        messageDiv.innerHTML = '<div class="message-content"><em>*' + this.escapeHtml(guestName) + ' enters chat*</em><br><strong>' + this.escapeHtml(guestName) + ':</strong> ' + this.escapeHtml(content) + '</div>';
        
        this.appendMessage(messageDiv);
        this.addToChatLog('*' + guestName + '*', 'enters chat - ' + content);
    }

    addGuestExit(guestName) {
        var messageDiv = document.createElement('div');
        messageDiv.className = 'message guest';
        messageDiv.innerHTML = '<div class="message-content"><em>*' + this.escapeHtml(guestName) + ' leaves chat*</em></div>';
        
        this.appendMessage(messageDiv);
        this.addToChatLog('*' + guestName + '*', 'leaves chat');
    }

    appendMessage(messageDiv) {
        var chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.appendChild(messageDiv);
            this.scrollToBottom();
        }
    }

    addToHistory(speaker, content) {
        this.conversationHistory.push({ speaker: speaker, content: content });
        if (this.conversationHistory.length > 50) {
            this.conversationHistory = this.conversationHistory.slice(-50);
        }
    }

    addToChatLog(speaker, content) {
        if (!window.sessionState) {
            window.sessionState = {};
        }
        
        if (!window.sessionState.chatLog) {
            window.sessionState.chatLog = [];
        }
        
        window.sessionState.chatLog.push({
            speaker: speaker,
            message: content,
            timestamp: Date.now()
        });
    }

    showTyping(persona) {
        var typingArea = document.getElementById('typingArea');
        if (!typingArea) return;
        
        var personaData = mainPersonas[persona];
        typingArea.innerHTML = '<div class="typing-indicator"><img src="' + personaData.avatar + '" alt="' + personaData.name + '" onerror="this.src=\'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiNjY2MiIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHBhdGggZD0iTTggOGEzIDMgMCExIDAgMC02IDMgMyAwIDAgMCAwIDZ6bTItM2EyIDIgMCExIDEtNCAwIDIgMiAwIDAgMSA0IDB6bTQgOGMwIDEtMSAxLTEgMUgzcy0xIDAtMS0xIDEtNCA2LTQgNiAzIDYgNHoiLz48L3N2Zz4=\'"><span>' + personaData.name + ' is typing...</span><div class="typing-dots"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>';
    }

    hideTyping() {
        var typingArea = document.getElementById('typingArea');
        if (typingArea) typingArea.innerHTML = '';
    }

    scrollToBottom() {
        var chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            setTimeout(function() {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100);
        }
    }

    clearMessages() {
        var chatMessages = document.getElementById('chatMessages');
        if (chatMessages) chatMessages.innerHTML = '';
        this.conversationHistory = [];
    }

    escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    displayWelcomeMessage() {
        var self = this;
        setTimeout(function() {
            var config = getCurrentIntensityConfig();
            var sessionState = window.sessionState || { userName: 'Player' };
            self.addSystemMessage('👥 Welcome to The Players Club Chat Room\n\nUser: ' + (sessionState.userName || 'Player') + '\nIntensity Level: ' + config.display + '\nFour personas are currently active. Spontaneous events will occur...\nYou can lurk and watch, or jump in anytime!\n\nSession Duration: 15 minutes');
        }, 500);
    }
}

var keithUniverse;

document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('🚀 DOM loaded, initializing Keith Universe...');
        
        keithUniverse = new KeithUniverse();
        window.keithUniverse = keithUniverse;
        
        console.log('✅ Keith Universe class created');
        console.log('⏳ Waiting for entry screen completion...');
        
    } catch (error) {
        console.error('❌ Keith Universe initialization failed:', error);
        document.body.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100vh; background: #1A1A1A; color: #fff; font-family: Arial, sans-serif;"><div style="text-align: center;"><h1 style="color: #C0C0C0;">Keith Studio Failed to Load</h1><p>Error: ' + error.message + '</p><button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #C0C0C0; color: #1A1A1A; border: none; border-radius: 5px; cursor: pointer;">Refresh Page</button></div></div>';
    }
});

window.addEventListener('error', function(event) {
    console.error('🔥 Global JavaScript error:', event.error);
    console.error('Error details:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
    });
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('🔥 Unhandled promise rejection:', event.reason);
});
