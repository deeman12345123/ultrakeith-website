/* ========================================
   KEITH STUDIO - MAIN CHAT ENGINE
   COMPLETE WORKING VERSION - CLEAN & RELIABLE
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
        
        // Check for required elements
        const requiredElements = [
            'chatInput', 'sendBtn', 'chatMessages', 'sessionTimer',
            'userCount', 'toggleUserList', 'userList', 'mobileOverlay'
        ];
        
        const missing = requiredElements.filter(id => !document.getElementById(id));
        
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
        
        const config = getCurrentIntensityConfig();
        console.log('🎭 Keith\'s Inner Universe activated - ' + config.name + ' Mode');
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
        
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        
        if (chatInput && sendBtn) {
            // Clear existing listeners
            chatInput.onkeydown = null;
            chatInput.oninput = null;
            sendBtn.onclick = null;
            
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
        }

        this.setupControlButtons();
        this.setupMobileControls();
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
                btn.onclick = null;
                btn.addEventListener('click', handler);
                console.log(`✅ ${id} button connected`);
            }
        });
    }

    setupMobileControls() {
        const toggleUserList = document.getElementById('toggleUserList');
        const mobileOverlay = document.getElementById('mobileOverlay');

        if (toggleUserList) {
            toggleUserList.onclick = null;
            toggleUserList.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('📱 Mobile toggle clicked');
                this.toggleUserList();
            });
            console.log('✅ Mobile toggle connected');
        }

        if (mobileOverlay) {
            mobileOverlay.onclick = null;
            mobileOverlay.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('📱 Mobile overlay clicked');
                this.closeUserList();
            });
            console.log('✅ Mobile overlay connected');
        }
    }

    initializeUserList() {
        this.updateUserCount();
        console.log('👥 User list initialized');
    }

    toggleUserList() {
        const userList = document.getElementById('userList');
        const overlay = document.getElementById('mobileOverlay');
        const toggleBtn = document.getElementById('toggleUserList');
        
        if (!userList || !overlay) {
            console.error('❌ User list or overlay not found');
            return;
        }
        
        const isShowing = userList.classList.contains('show');
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
        const userList = document.getElementById('userList');
        const overlay = document.getElementById('mobileOverlay');
        const toggleBtn = document.getElementById('toggleUserList');
        
        if (userList && overlay) {
            userList.classList.remove('show');
            overlay.classList.remove('show');
