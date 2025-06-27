// UI Manager for site functionality
class UIManager {
    constructor() {
        this.soundEnabled = true;
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        this.setupAudioToggle();
        this.loadNews();
    }
    
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        
        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('show');
            });
        }
    }
    
    setupAudioToggle() {
        const audioToggle = document.getElementById('audioToggle');
        const audioIcon = document.getElementById('audioIcon');
        const audioText = document.getElementById('audioText');
        
        if (audioToggle && audioIcon && audioText) {
            audioToggle.addEventListener('click', () => {
                this.soundEnabled = !this.soundEnabled;
                
                if (this.soundEnabled) {
                    audioToggle.classList.remove('disabled');
                    audioIcon.textContent = '🔊';
                    audioText.textContent = 'Audio On';
                } else {
                    audioToggle.classList.add('disabled');
                    audioIcon.textContent = '🔇';
                    audioText.textContent = 'Audio Off';
                }
            });
        }
    }
    
    async loadNews() {
        const latestPost = document.getElementById('latestPost');
        if (!latestPost) return;
        
        // Simple, direct approach - test the actual RSS URL first
        const testUrls = [
            'https://api.rss2json.com/v1/api.json?rss_url=https://ultrakeithdotcom.blogspot.com/feeds/posts/default',
            'https://api.rss2json.com/v1/api.json?rss_url=https://ultrakeithdotcom.blogspot.com/feeds/posts/default?alt=rss'
        ];
        
        for (let i = 0; i < testUrls.length; i++) {
            try {
                console.log(`Trying RSS URL ${i + 1}:`, testUrls[i]);
                const response = await fetch(testUrls[i]);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('RSS Response:', data);
                    
                    if (data.status === 'ok' && data.items && data.items.length > 0) {
                        const post = data.items[0];
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = post.description || '';
                        const excerpt = (tempDiv.textContent || '').substring(0, 140) + '...';
                        const date = new Date(post.pubDate).toLocaleDateString('en-US', {
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric'
                        });

                        latestPost.innerHTML = `
                            <div class="post-title">
                                <a href="${post.link}" target="_blank" rel="noopener noreferrer">${post.title}</a>
                            </div>
                            <div class="post-excerpt">${excerpt}</div>
                            <div class="post-date">${date}</div>
                        `;
                        return; // Success - exit the loop
                    } else {
                        console.log('RSS data format issue:', data);
                    }
                } else {
                    console.log('HTTP error:', response.status, response.statusText);
                }
            } catch (error) {
                console.log(`RSS attempt ${i + 1} failed:`, error);
            }
        }
        
        // If all methods fail, show a simple fallback
        latestPost.innerHTML = '<div class="post-error">News feed temporarily unavailable</div>';
    }
}

// Initialize UI when DOM is ready
let uiManager;
document.addEventListener('DOMContentLoaded', () => {
    try {
        uiManager = new UIManager();
        console.log('UI initialized successfully');
    } catch (error) {
        console.error('UI initialization error:', error);
    }
});
