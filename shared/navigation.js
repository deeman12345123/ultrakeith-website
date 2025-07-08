// ULTRA KEITH - SHARED NAVIGATION & FOOTER SYSTEM
// Update this ONE file and ALL pages get updated automatically!

console.log('Loading Ultra Keith shared navigation system...');

// AUDIO SYSTEM - NEW ADDITION
class UltraKeithAudio {
    constructor() {
        this.audioContext = null;
        this.tracks = {};
        this.currentTrack = null;
        this.audioSource = null;
        this.gainNode = null;
        this.filterNode = null;
        this.isPlaying = false;
        this.isMuted = false;
        this.pageMusic = {};
        this.keithVoices = {};
        this.currentPageTrack = null;
        
        this.init();
    }
    
    async init() {
        // Initialize Web Audio API
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.gainNode = this.audioContext.createGain();
        this.filterNode = this.audioContext.createBiquadFilter();
        
        this.filterNode.type = 'lowpass';
        this.filterNode.frequency.setValueAtTime(800, this.audioContext.currentTime);
        
        this.filterNode.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);
    }
    
    async loadTrack(url, trackName) {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            
            this.tracks[trackName] = audioBuffer;
            return audioBuffer;
        } catch (error) {
            console.error(`Error loading ${trackName}:`, error);
            return null;
        }
    }
    
    async loadPageMusic(pageName, audioUrl) {
        const trackName = `${pageName}_music`;
        await this.loadTrack(audioUrl, trackName);
        this.pageMusic[pageName] = trackName;
    }
    
    async loadKeithVoice(voiceName, audioUrl) {
        const trackName = `keith_${voiceName}`;
        await this.loadTrack(audioUrl, trackName);
        this.keithVoices[voiceName] = trackName;
    }
    
    playTrack(trackName, options = {}) {
        const track = this.tracks[trackName];
        if (!track) return;
        
        // Stop current track unless overlay
        if (!options.overlay) {
            this.stopTrack();
        }
        
        try {
            const audioSource = this.audioContext.createBufferSource();
            audioSource.buffer = track;
            audioSource.loop = options.loop !== false;
            
            if (options.muffled) {
                this.setMuffled(true);
                audioSource.connect(this.filterNode);
            } else {
                audioSource.connect(this.gainNode);
            }
            
            audioSource.start(0);
            
            if (!options.overlay) {
                this.audioSource = audioSource;
                this.currentTrack = trackName;
                this.isPlaying = true;
            }
            
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    }
    
    stopTrack() {
        if (this.audioSource) {
            try {
                this.audioSource.stop();
            } catch (error) {}
            this.audioSource = null;
        }
        this.isPlaying = false;
    }
    
    playKeithVoice(voiceName) {
        const trackName = this.keithVoices[voiceName];
        if (trackName) {
            this.playTrack(trackName, { loop: false, overlay: true });
        }
    }
    
    startPageMusic(pageName) {
        const trackName = this.pageMusic[pageName];
        if (trackName && !this.isMuted) {
            const options = { loop: true };
            if (pageName === 'playersclub') {
                options.muffled = true;
            }
            this.currentPageTrack = pageName;
            this.playTrack(trackName, options);
        }
    }
    
    toggleMute() {
        this.isMuted = !this.isMuted;
        
        if (this.isMuted) {
            this.stopTrack();
        } else {
            // Restart current page music
            if (this.currentPageTrack) {
                this.startPageMusic(this.currentPageTrack);
            }
        }
        
        this.updateAudioButton();
    }
    
    updateAudioButton() {
        const audioIcon = document.getElementById('audioIcon');
        const audioText = document.getElementById('audioText');
        
        if (audioIcon && audioText) {
            if (this.isMuted || !this.isPlaying) {
                audioIcon.textContent = '🔇';
                audioText.textContent = 'Audio Off';
            } else {
                audioIcon.textContent = '🔊';
                audioText.textContent = 'Audio On';
            }
        }
    }
    
    setMuffled(muffled) {
        if (!this.filterNode) return;
        const frequency = muffled ? 400 : 20000;
        this.filterNode.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    }
    
    clearMuffled() {
        this.setMuffled(false);
    }
}

// Initialize audio system
const ultraAudio = new UltraKeithAudio();

// NAVIGATION GENERATOR
function generateNavigation() {
    return `
    <nav class="nav" role="navigation">
        <div class="nav-container">
            <a href="/home.html" class="nav-logo">
                <img src="/koolkeithmainlogo.png" alt="Kool Keith Home" onerror="this.style.display='none'">
            </a>
            
            <div class="nav-right">
                <ul class="nav-menu" id="navMenu">
                    <li><a href="/music/music.html">Music</a></li>
                    <li><a href="/bio.html">Biography</a></li>
                    <li><a href="/tour.html">Tour</a></li>
                    <li><a href="https://ultrakeithdotcom.blogspot.com/" target="_blank">News</a></li>
                    <li><a href="/shop.html">Store</a></li>
                    <li><a href="/players/playersclub.html">Players Club</a></li>
                </ul>
                
                <button class="audio-toggle" id="audioToggle" aria-label="Toggle background audio">
                    <span class="audio-icon" id="audioIcon">🔊</span>
                    <span class="audio-text" id="audioText">Audio On</span>
                </button>
                
                <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle mobile menu">☰</button>
            </div>
        </div>
    </nav>`;
}

// FOOTER GENERATOR
function generateFooter() {
    return `
    <footer class="footer">
        <nav aria-label="Footer navigation">
            <ul class="footer-links">
                <li><a href="/booking.html">Booking</a></li>
                <li><a href="/press.html">Press Kit</a></li>
                <li><a href="/contact.html">Contact</a></li>
                <li><a href="/privacy.html">Privacy</a></li>
            </ul>
        </nav>
        
        <div class="footer-social">
            <a href="https://twitter.com/UltraMan7000" target="_blank" rel="noopener noreferrer" aria-label="Follow Kool Keith on Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
            </a>
            <a href="https://instagram.com/OfficialKoolKeith" target="_blank" rel="noopener noreferrer" aria-label="Follow Kool Keith on Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
            </a>
            <a href="https://koolkeith.proboards.com/" target="_blank" rel="noopener noreferrer" aria-label="Join Kool Keith Forum">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
            </a>
        </div>
        
        <p class="footer-copyright">© 2025 Kool Keith. All rights reserved.</p>
    </footer>`;
}

// MOBILE NAVIGATION FUNCTIONALITY
function initializeMobileNavigation() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('show');
                mobileMenuBtn.classList.remove('active');
            }
        });
        
        // Close mobile menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
}

// ENHANCED AUDIO TOGGLE FUNCTIONALITY  
function initializeAudioToggle() {
    const audioToggle = document.getElementById('audioToggle');
    
    if (audioToggle) {
        audioToggle.addEventListener('click', function() {
            // Check for old-style audio elements first
            const audio = document.querySelector('audio') || 
                         document.getElementById('backgroundAudio') || 
                         document.getElementById('apartment223Audio');
            
            if (audio) {
                // Handle old-style audio elements
                if (audio.paused) {
                    audio.play().catch(e => console.log('Audio play failed:', e));
                    updateAudioButtonDisplay(false);
                } else {
                    audio.pause();
                    updateAudioButtonDisplay(true);
                }
            } else {
                // Handle new Web Audio API
                ultraAudio.toggleMute();
            }
        });
    }
}

function updateAudioButtonDisplay(muted) {
    const audioIcon = document.getElementById('audioIcon');
    const audioText = document.getElementById('audioText');
    
    if (audioIcon && audioText) {
        if (muted) {
            audioIcon.textContent = '🔇';
            audioText.textContent = 'Audio Off';
        } else {
            audioIcon.textContent = '🔊';
            audioText.textContent = 'Audio On';
        }
    }
}

// ACTIVE PAGE HIGHLIGHTING
function setActiveNavLink() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        
        // Remove active class from all links
        link.classList.remove('active');
        
        // Add active class to current page
        if (currentPage === linkPath || 
            (currentPage === '/' && linkPath === '/home.html') ||
            (currentPage.includes('players') && linkPath.includes('players')) ||
            (currentPage.includes('music') && linkPath.includes('music'))) {
            link.style.color = 'var(--keith-gold)';
            link.style.fontWeight = 'bold';
        }
    });
}

// HELPER FUNCTIONS
function getCurrentPageName() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');
    if (path.includes('players')) return 'playersclub';
    return filename || 'home';
}

// INITIALIZE EVERYTHING
function initializeSharedComponents() {
    console.log('Initializing Ultra Keith shared components...');
    
    // Add navigation to top of body
    document.body.insertAdjacentHTML('afterbegin', generateNavigation());
    
    // Add footer to bottom of body (before any existing scripts)
    document.body.insertAdjacentHTML('beforeend', generateFooter());
    
    // Initialize functionality
    initializeMobileNavigation();
    initializeAudioToggle();
    setActiveNavLink();
    
    // Auto-start page music and set current page after a short delay
    setTimeout(() => {
        const currentPage = getCurrentPageName();
        ultraAudio.currentPageTrack = currentPage;
        if (ultraAudio.pageMusic[currentPage] && !ultraAudio.isMuted) {
            ultraAudio.startPageMusic(currentPage);
        }
    }, 1000);
    
    console.log('✅ Ultra Keith navigation and footer loaded successfully!');
}

// AUTO-INITIALIZE WHEN PAGE LOADS
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSharedComponents);
} else {
    // DOM already loaded
    initializeSharedComponents();
}

// GLOBAL FUNCTIONS FOR EASY USE
window.loadPageMusic = (pageName, audioUrl) => ultraAudio.loadPageMusic(pageName, audioUrl);
window.loadKeithVoice = (voiceName, audioUrl) => ultraAudio.loadKeithVoice(voiceName, audioUrl);
window.playKeithVoice = (voiceName) => ultraAudio.playKeithVoice(voiceName);
window.clearMuffled = () => ultraAudio.clearMuffled();

// GLOBAL FUNCTIONS FOR MANUAL CONTROL
window.UltraKeith = {
    navigation: generateNavigation,
    footer: generateFooter,
    initMobileNav: initializeMobileNavigation,
    initAudio: initializeAudioToggle,
    setActivePage: setActiveNavLink,
    audio: ultraAudio
};
