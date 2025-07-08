/**
 * HOMEPAGE NEWS LOADER
 * Handles news loading for homepage only
 * Other UI functions handled by shared/navigation.js
 */

class NewsManager {
    constructor() {
        try {
            this.isInitialized = false;
            this.retryAttempts = {
                news: 0,
                maxRetries: 3
            };
            
            this.init();
            console.log('📰 News Manager: Initialization complete');
            
        } catch (error) {
            console.error('🚨 News Manager: Initialization failed:', error);
            this.handleError('INIT_ERROR', error);
        }
    }
    
    /**
     * Initialize news loading
     */
    init() {
        try {
            this.loadNews();
            this.isInitialized = true;
            console.log('📰 News Manager: Ready');
            
        } catch (error) {
            console.error('🚨 News Manager: Init error:', error);
            this.handleError('SETUP_ERROR', error);
        }
    }
    
    /**
     * Load news with comprehensive error handling and retries
     */
    async loadNews() {
        const latestPost = this.safeGetElement('latestPost');
        if (!latestPost) {
            console.warn('📰 News: Latest post element not found');
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
            console.error('🚨 News Manager: News loading error:', error);
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
            console.error('🚨 News Manager: Fallback display error:', error);
        }
    }
    
    /**
     * Safely get DOM element
     */
    safeGetElement(id) {
        try {
            const element = document.getElementById(id);
            if (!element) {
                console.warn(`📰 News Manager: Element #${id} not found`);
            }
            return element;
        } catch (error) {
            console.error(`🚨 News Manager: Failed to get element #${id}:`, error);
            return null;
        }
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
            console.error('🚨 News Manager: HTML sanitization error:', error);
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
            console.error('🚨 News Manager: Date formatting error:', error);
            return 'Recent';
        }
    }
    
    /**
     * Handle errors gracefully
     */
    handleError(type, error) {
        console.error(`🚨 News Manager Error [${type}]:`, error);
        
        if (type === 'NEWS_ERROR') {
            const latestPost = this.safeGetElement('latestPost');
            if (latestPost) {
                this.showNewsFallback(latestPost);
            }
        }
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
            console.error('🚨 News Manager: News refresh error:', error);
        }
    }
    
    /**
     * Get status for debugging
     */
    getStatus() {
        return {
            initialized: this.isInitialized,
            newsRetries: this.retryAttempts.news,
            timestamp: new Date().toISOString()
        };
    }
}

// Initialize news manager when DOM is ready
let newsManager;

document.addEventListener('DOMContentLoaded', () => {
    try {
        newsManager = new NewsManager();
        console.log('📰 News Manager: Initialization triggered');
        
        // Global access for debugging
        window.newsManager = newsManager;
        
        // Add debug refresh button if in debug mode
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
            refreshBtn.onclick = () => newsManager.refreshNews();
            document.body.appendChild(refreshBtn);
        }
        
    } catch (error) {
        console.error('🚨 News Manager: Failed to create instance:', error);
        
        // Minimal fallback
        const latestPost = document.getElementById('latestPost');
        if (latestPost) {
            latestPost.innerHTML = `
                <div class="post-error">
                    News unavailable. 
                    <a href="https://ultrakeithdotcom.blogspot.com/" target="_blank">Visit blog</a>
                </div>
            `;
        }
    }
});

// Handle network status changes
window.addEventListener('online', () => {
    console.log('🌐 Network: Back online');
    if (newsManager && typeof newsManager.refreshNews === 'function') {
        setTimeout(() => {
            newsManager.refreshNews();
        }, 1000);
    }
});

window.addEventListener('offline', () => {
    console.log('🌐 Network: Gone offline');
});
