/**
 * BULLETPROOF UI MANAGER
 * Enhanced with comprehensive error handling and fallbacks
 */

class UIManager {
    constructor() {
        try {
            this.soundEnabled = true;
            this.isInitialized = false;
            this.retryAttempts = {
                news: 0,
                maxRetries: 3
            };
            
            this.init();
            console.log('🎛️ UI Manager: Initialization complete');
            
        } catch (error) {
            console.error('🚨 UI Manager: Initialization failed:', error);
            this.handleError('INIT_ERROR', error);
        }
    }
    
    /**
     * Initialize all UI components with error boundaries
     */
    init() {
        try {
            this.setupDesktopBanner();
            this.setupMobileMenu();
            this.setupAudioToggle();
            this.loadNews();
            
            this.isInitialized = true;
            console.log('🎛️ UI Manager: All components initialized');
            
        } catch (error) {
            console.error('🚨 UI Manager: Component initialization error:', error);
            this.handleError('SETUP_ERROR', error);
        }
    }
    
    /**
     * Setup desktop recommendation banner
     */
    setupDesktopBanner() {
        try {
            // Only show on mobile and if not previously dismissed
            if (window.innerWidth <= 768 && !this.getLocalStorage('desktopBannerDismissed')) {
                const banner = this.safeGetElement('desktopBanner');
                const closeBtn = this.safeGetElement('closeBanner');
                const mainContent = this.safeGetElement('mainContent');
                
                if (banner && closeBtn && mainContent) {
                    // Show banner with animation
                    setTimeout(() => {
                        banner.classList.add('show');
                        mainContent.classList.add('with-banner');
                    }, 500);
                    
                    // Close banner functionality
                    closeBtn.addEventListener('click', () => {
                        try {
                            banner.classList.remove('show');
                            mainContent.classList.remove('with-banner');
                            this.setLocalStorage('desktopBannerDismissed', 'true');
                            console.log('🎛️ UI Manager: Desktop banner dismissed');
                        } catch (error) {
                            console.error('🚨 UI Manager: Banner close error:', error);
                        }
                    });
                    
                    console.log('🎛️ UI Manager: Desktop banner setup complete');
                }
            }
        } catch (error) {
            console.error('🚨 UI Manager: Desktop banner setup error:', error);
        }
    }
    
    /**
     * Setup mobile menu with error handling
     */
    setupMobileMenu() {
        try {
            const mobileMenuBtn = this.safeGetElement('mobileMenuBtn');
            const navMenu = this.safeGetElement('navMenu');
            
            if (mobileMenuBtn && navMenu) {
                mobileMenuBtn.addEventListener('click', () => {
                    try {
                        navMenu.classList.toggle('show');
                        const isOpen = navMenu.classList.contains('show');
                        
                        // Update ARIA attributes for accessibility
                        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
                        
                        console.log('🎛️ UI Manager: Mobile menu toggled:', isOpen ? 'open' : 'closed');
                        
                    } catch (error) {
                        console.error('🚨 UI Manager: Mobile menu toggle error:', error);
                    }
                });
                
                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    try {
                        if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
                            navMenu.classList.remove('show');
                            mobileMenuBtn.setAttribute('aria-expanded', 'false');
                        }
                    } catch (error) {
                        console.error('🚨 UI Manager: Outside click handler error:', error);
                    }
                });
                
                console.log('🎛️ UI Manager: Mobile menu setup complete');
            }
        } catch (error) {
            console.error('🚨 UI Manager: Mobile menu setup error:', error);
        }
    }
    
    /**
     * Setup audio toggle with error handling
     */
    setupAudioToggle() {
        try {
            const audioToggle = this.safeGetElement('audioToggle');
            const audioIcon = this.safeGetElement('audioIcon');
            const audioText = this.safeGetElement('audioText');
            
            if (audioToggle && audioIcon && audioText) {
                // Load saved preference
                const savedState = this.getLocalStorage('audioEnabled');
                if (savedState !== null) {
                    this.soundEnabled = savedState === 'true';
                    this.updateAudioUI(audioToggle, audioIcon, audioText);
                }
                
                audioToggle.addEventListener('click', () => {
                    try {
                        this.soundEnabled = !this.soundEnabled;
                        this.updateAudioUI(audioToggle, audioIcon, audioText);
                        
                        // Save preference
                        this.setLocalStorage('audioEnabled', this.soundEnabled.toString());
                        
                        // Dispatch custom event for other components
                        window.dispatchEvent(new CustomEvent('audioToggle', {
                            detail: { enabled: this.soundEnabled }
                        }));
                        
                        console.log('🎛️ UI Manager: Audio toggled:', this.soundEnabled ? 'on' : 'off');
                        
                    } catch (error) {
                        console.error('🚨 UI Manager: Audio toggle error:', error);
                    }
                });
                
                console.log('🎛️ UI Manager: Audio toggle setup complete');
            }
        } catch (error) {
            console.error('🚨 UI Manager: Audio toggle setup error:', error);
        }
    }
    
    /**
     * Update audio UI elements
     */
    updateAudioUI(toggle, icon, text) {
        try {
            if (this.soundEnabled) {
                toggle.classList.remove('disabled');
                icon.textContent = '🔊';
                text.textContent = 'Audio On';
                toggle.setAttribute('aria-pressed', 'true');
            } else {
                toggle.classList.add('disabled');
                icon.textContent = '🔇';
                text.textContent = 'Audio Off';
                toggle.setAttribute('aria-pressed', 'false');
            }
        } catch (error) {
            console.error('🚨 UI Manager: Audio UI update error:', error);
        }
    }
    
    /**
     * Load news with comprehensive error handling and retries
     */
    async loadNews() {
        const latestPost = this.safeGetElement('latestPost');
        if (!latestPost) {
            console.warn('🎛️ UI Manager: Latest post element not found');
            return;
        }
        
        try {
            console.log('📰 News: Loading latest posts...');
            
            // Test URLs with fallbacks
            const testUrls = [
                'https://api.rss2json.com/v1/api.json?rss_url=https://ultrakeithdotcom.blogspot.com/feeds/posts/default',
                'https://api.rss2json.com/v1/api.json?rss_url=https://ultrakeithdotcom.blogspot.com/feeds/posts/default?alt=rss'
            ];
            
            for (let i = 0; i < testUrls.length; i++) {
                try {
                    console.log(`📰 News: Trying RSS URL ${i + 1}:`, testUrls[i]);
                    
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
                    
                    const response = await fetch(testUrls[i], {
                        signal: controller.signal,
                        cache: 'no-cache'
                    });
                    
                    clearTimeout(timeoutId);
                    
                    if (response.ok) {
                        const data = await response.json();
                        console.log('📰 News: RSS Response received:', data);
                        
                        if (data.status === 'ok' && data.items && data.items.length > 0) {
                            const post = data.items[0];
                            
                            // Safely extract post data
                            const title = this.sanitizeHTML(post.title || 'Latest Update');
                            const link = post.link || '#';
                            const description = post.description || '';
                            const pubDate = post.pubDate || new Date().toISOString();
                            
                            // Create safe excerpt
                            const tempDiv = document.createElement('div');
                            tempDiv.innerHTML = description;
                            const excerpt = (tempDiv.textContent || tempDiv.innerText || '').substring(0, 140) + '...';
                            
                            // Format date safely
                            const date = this.formatDate(pubDate);
                            
                            // Update DOM safely
                            latestPost.innerHTML = `
                                <div class="post-title">
                                    <a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a>
                                </div>
                                <div class="post-excerpt">${this.sanitizeHTML(excerpt)}</div>
                                <div class="post-date">${date}</div>
                            `;
                            
                            console.log('📰 News: Successfully loaded latest post');
                            return; // Success - exit the loop
                            
                        } else {
                            console.log('📰 News: RSS data format issue:', data);
                        }
                    } else {
                        console.log('📰 News: HTTP error:', response.status, response.statusText);
                    }
                    
                } catch (error) {
                    if (error.name === 'AbortError') {
                        console.log('📰 News: Request timeout');
                    } else {
                        console.log(`📰 News: RSS attempt ${i + 1} failed:`, error.message);
                    }
                }
            }
            
            // All methods failed - show fallback
            this.showNewsFallback(latestPost);
            
        } catch (error) {
            console.error('🚨 UI Manager: News loading error:', error);
            this.showNewsFallback(latestPost);
        }
    }
    
    /**
     * Show news fallback content
     */
    showNewsFallback(element) {
        try {
            this.retryAttempts.news++;
            
            if (this.retryAttempts.news < this.retryAttempts.maxRetries) {
                element.innerHTML = `
                    <div class="post-loading">Loading news... (attempt ${this.retryAttempts.news})</div>
                `;
                
                // Retry after delay
                setTimeout(() => {
                    this.loadNews();
                }, 5000 * this.retryAttempts.news); // Increasing delay
                
            } else {
                element.innerHTML = `
                    <div class="post-error">
                        News temporarily unavailable. 
                        <a href="https://ultrakeithdotcom.blogspot.com/" target="_blank" rel="noopener noreferrer">
                            Visit blog directly
                        </a>
                    </div>
                `;
                console.log('📰 News: Max retries reached, showing final fallback');
            }
        } catch (error) {
            console.error('🚨 UI Manager: Fallback display error:', error);
        }
    }
    
    /**
     * Safely get DOM element
     */
    safeGetElement(id) {
        try {
            const element = document.getElementById(id);
            if (!element) {
                console.warn(`🎛️ UI Manager: Element #${id} not found`);
            }
            return element;
        } catch (error) {
            console.error(`🚨 UI Manager: Failed to get element #${id}:`, error);
            return null;
        }
    }
    
    /**
     * Safe localStorage operations
     */
    getLocalStorage(key) {
        try {
            if (typeof Storage !== 'undefined') {
                return localStorage.getItem(key);
            }
        } catch (error) {
            console.warn('🎛️ UI Manager: localStorage get error:', error);
        }
        return null;
    }
    
    setLocalStorage(key, value) {
        try {
            if (typeof Storage !== 'undefined') {
                localStorage.setItem(key, value);
                return true;
            }
        } catch (error) {
            console.warn('🎛️ UI Manager: localStorage set error:', error);
        }
        return false;
    }
    
    /**
     * Sanitize HTML to prevent XSS
     */
    sanitizeHTML(str) {
        try {
            const temp = document.createElement('div');
            temp.textContent = str;
            return temp.innerHTML;
        } catch (error) {
            console.error('🚨 UI Manager: HTML sanitization error:', error);
            return 'Content unavailable';
        }
    }
    
    /**
     * Format date safely
     */
    formatDate(dateString) {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return 'Recent';
            }
            
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (error) {
            console.error('🚨 UI Manager: Date formatting error:', error);
            return 'Recent';
        }
    }
    
    /**
     * Handle errors gracefully
     */
    handleError(type, error) {
        console.error(`🚨 UI Manager Error [${type}]:`, error);
        
        // Attempt recovery based on error type
        switch (type) {
            case 'INIT_ERROR':
                // Try to initialize critical components only
                try {
                    this.setupMobileMenu();
                    this.setupAudioToggle();
                } catch (recoveryError) {
                    console.error('🚨 UI Manager: Recovery failed:', recoveryError);
                }
                break;
            case 'NEWS_ERROR':
                const latestPost = this.safeGetElement('latestPost');
                if (latestPost) {
                    this.showNewsFallback(latestPost);
                }
                break;
        }
    }
    
    /**
     * Get UI status for debugging
     */
    getStatus() {
        return {
            initialized: this.isInitialized,
            soundEnabled: this.soundEnabled,
            newsRetries: this.retryAttempts.news,
            timestamp: new Date().toISOString()
        };
    }
    
    /**
     * Refresh news manually
     */
    refreshNews() {
        try {
            this.retryAttempts.news = 0;
            const latestPost = this.safeGetElement('latestPost');
            if (latestPost) {
                latestPost.innerHTML = '<div class="post-loading">Refreshing news...</div>';
            }
            this.loadNews();
            console.log('📰 News: Manual refresh triggered');
        } catch (error) {
            console.error('🚨 UI Manager: News refresh error:', error);
        }
    }
}

// Initialize UI when DOM is ready
let uiManager;

document.addEventListener('DOMContentLoaded', () => {
    try {
        uiManager = new UIManager();
        console.log('🎛️ UI Manager: Initialization triggered');
        
        // Global access for debugging
        window.uiManager = uiManager;
        
        // Add global refresh button for news (for debugging)
        if (window.location.search.includes('debug=true')) {
            const refreshBtn = document.createElement('button');
            refreshBtn.textContent = '🔄 Refresh News';
            refreshBtn.style.position = 'fixed';
            refreshBtn.style.bottom = '20px';
            refreshBtn.style.left = '20px';
            refreshBtn.style.zIndex = '1000';
            refreshBtn.style.padding = '10px';
            refreshBtn.style.background = '#DAB547';
            refreshBtn.style.border = 'none';
            refreshBtn.style.borderRadius = '5px';
            refreshBtn.onclick = () => uiManager.refreshNews();
            document.body.appendChild(refreshBtn);
        }
        
    } catch (error) {
        console.error('🚨 UI Manager: Failed to create instance:', error);
        
        // Minimal fallback functionality
        try {
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const navMenu = document.getElementById('navMenu');
            if (mobileMenuBtn && navMenu) {
                mobileMenuBtn.addEventListener('click', () => {
                    navMenu.classList.toggle('show');
                });
                console.log('🎛️ UI Manager: Fallback mobile menu enabled');
            }
        } catch (fallbackError) {
            console.error('🚨 UI Manager: Even fallback failed:', fallbackError);
        }
    }
});

// Global error handler for UI
window.addEventListener('error', (event) => {
    if (event.filename && event.filename.includes('ui.js')) {
        console.error('🚨 Global UI Error:', event.error);
        
        // Try to maintain basic functionality
        if (uiManager && typeof uiManager.handleError === 'function') {
            uiManager.handleError('GLOBAL_ERROR', event.error);
        }
    }
});

// Handle network status changes
window.addEventListener('online', () => {
    console.log('🌐 Network: Back online');
    if (uiManager && typeof uiManager.refreshNews === 'function') {
        setTimeout(() => {
            uiManager.refreshNews();
        }, 1000);
    }
});

window.addEventListener('offline', () => {
    console.log('🌐 Network: Gone offline');
});
