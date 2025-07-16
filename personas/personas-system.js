// ULTRA KEITH PERSONAS SYSTEM - ENHANCED WITH SCROLL-TO-TOP
// Trading card animation and interaction system

class PersonasSystem {
    constructor() {
        this.currentPage = 1;
        this.cardsPerPage = window.innerWidth <= 768 ? 6 : 9;
        this.sortOrder = 'oldest'; // 'oldest' or 'newest'
        this.sortedPersonas = [...PERSONAS_DATABASE];
        this.isAnimating = false;
        
        this.init();
        this.setupEventListeners();
        this.updatePersonaCounter();
        
        console.log('🎭 Personas System initialized with', this.sortedPersonas.length, 'personas');
    }
    
    init() {
        this.sortPersonas();
        this.updatePagination();
    }
    
    setupEventListeners() {
        // Deck click handler
        const deckBox = document.getElementById('deckBox');
        if (deckBox) {
            deckBox.addEventListener('click', () => this.openDeck());
        }
        
        // Sort button handlers
        const oldestFirstBtn = document.getElementById('oldestFirstBtn');
        const newestFirstBtn = document.getElementById('newestFirstBtn');
        
        if (oldestFirstBtn) {
            oldestFirstBtn.addEventListener('click', () => this.changeSortOrder('oldest'));
        }
        
        if (newestFirstBtn) {
            newestFirstBtn.addEventListener('click', () => this.changeSortOrder('newest'));
        }
        
        // Pagination handlers
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.changePage(this.currentPage - 1));
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.changePage(this.currentPage + 1));
        }
        
        // Window resize handler
        window.addEventListener('resize', () => {
            const newCardsPerPage = window.innerWidth <= 768 ? 6 : 9;
            if (newCardsPerPage !== this.cardsPerPage) {
                this.cardsPerPage = newCardsPerPage;
                this.currentPage = 1;
                this.updatePagination();
                this.renderCurrentPage(); // No animation for resize
            }
        });
    }
    
    sortPersonas() {
        if (this.sortOrder === 'oldest') {
            this.sortedPersonas.sort((a, b) => parseInt(a.year) - parseInt(b.year));
        } else {
            this.sortedPersonas.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        }
    }
    
    changeSortOrder(newOrder) {
        if (this.sortOrder === newOrder) return;
        
        this.sortOrder = newOrder;
        this.currentPage = 1;
        
        // Update button states
        const oldestFirstBtn = document.getElementById('oldestFirstBtn');
        const newestFirstBtn = document.getElementById('newestFirstBtn');
        
        if (oldestFirstBtn && newestFirstBtn) {
            oldestFirstBtn.classList.toggle('active', newOrder === 'oldest');
            newestFirstBtn.classList.toggle('active', newOrder === 'newest');
        }
        
        this.sortPersonas();
        this.updatePagination();
        this.renderCurrentPage(); // No animation for sorting
        
        // Scroll to top after sorting
        this.scrollToTop();
    }
    
    changePage(newPage) {
        const totalPages = Math.ceil(this.sortedPersonas.length / this.cardsPerPage);
        
        if (newPage < 1 || newPage > totalPages || newPage === this.currentPage) {
            return;
        }
        
        this.currentPage = newPage;
        this.updatePagination();
        this.renderCurrentPage(); // No animation for pagination
        
        // Scroll to top after changing page
        this.scrollToTop();
    }
    
    scrollToTop() {
        // Smooth scroll to top of page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    updatePersonaCounter() {
        const counter = document.getElementById('personaCounter');
        if (counter) {
            counter.textContent = `${this.sortedPersonas.length} Personas Total`;
        }
    }
    
    updatePagination() {
        const totalPages = Math.ceil(this.sortedPersonas.length / this.cardsPerPage);
        
        const pageInfo = document.getElementById('pageInfo');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (pageInfo) {
            pageInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
        }
        
        if (prevBtn) {
            prevBtn.classList.toggle('disabled', this.currentPage === 1);
        }
        
        if (nextBtn) {
            nextBtn.classList.toggle('disabled', this.currentPage === totalPages);
        }
    }
    
    async openDeck() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        console.log('🎴 Opening the deck...');
        
        const deckContainer = document.getElementById('deckContainer');
        const cardsContainer = document.getElementById('cardsContainer');
        const controlsSection = document.getElementById('controlsSection');
        const paginationContainer = document.getElementById('paginationContainer');
        const deckBox = document.getElementById('deckBox');
        
        // Add mystical effects to deck
        if (deckBox) {
            deckBox.classList.add('mystical-hover');
            deckBox.classList.add('energy-building');
        }
        
        // Create particle effects
        this.createParticleEffects();
        
        // Wait for effects
        await this.delay(1500);
        
        // Create screen flash
        this.createScreenFlash();
        
        // Wait for flash
        await this.delay(500);
        
        // Hide deck, show cards and controls
        if (deckContainer) deckContainer.classList.add('hidden');
        if (cardsContainer) cardsContainer.classList.add('show');
        if (controlsSection) controlsSection.classList.add('show');
        if (paginationContainer) paginationContainer.classList.add('show');
        
        // Render current page WITH animation for deck opening
        await this.renderCurrentPage(true);
        
        this.isAnimating = false;
        console.log('✨ Deck opened successfully!');
    }
    
    async renderCurrentPage(withAnimation = false) {
        const cardsGrid = document.getElementById('cardsGrid');
        if (!cardsGrid) return;
        
        // Clear existing cards
        cardsGrid.innerHTML = '';
        
        // Calculate which personas to show
        const startIndex = (this.currentPage - 1) * this.cardsPerPage;
        const endIndex = startIndex + this.cardsPerPage;
        const personasToShow = this.sortedPersonas.slice(startIndex, endIndex);
        
        console.log(`📄 Rendering page ${this.currentPage}: showing personas ${startIndex + 1}-${Math.min(endIndex, this.sortedPersonas.length)}`);
        
        // Create cards
        for (let i = 0; i < personasToShow.length; i++) {
            const persona = personasToShow[i];
            const card = this.createCard(persona);
            cardsGrid.appendChild(card);
            
            if (withAnimation) {
                // Animate card appearance only when opening deck
                await this.delay(100);
                card.classList.add('card-flying');
                
                // After animation completes, set final state
                setTimeout(() => {
                    card.classList.remove('card-flying');
                    card.classList.add('card-landed');
                }, 1200);
            } else {
                // Just show cards instantly for pagination
                card.classList.add('card-landed');
            }
        }
    }
    
    createCard(persona) {
        const card = document.createElement('div');
        card.className = 'trading-card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <div class="front-container">
                        <div class="card-header">
                            <div class="persona-title ${persona.name.length > 15 ? 'long-title' : ''}">${persona.name}</div>
                        </div>
                        <div class="image-container">
                            <img src="${persona.image}" alt="${persona.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='${persona.name}';">
                        </div>
                        <div class="stats-section">
                            <div class="stat-item">
                                <span class="stat-label">Year:</span>
                                <span class="stat-value">${persona.year}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Age:</span>
                                <span class="stat-value">${persona.age}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Origin:</span>
                                <span class="stat-value">${persona.origin}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Likes:</span>
                                <span class="stat-value">${persona.likes}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Dislikes:</span>
                                <span class="stat-value">${persona.dislikes}</span>
                            </div>
                        </div>
                        <div class="quote-section">"${persona.quote}"</div>
                    </div>
                    <div class="card-number">#${persona.number}</div>
                    <div class="mc-logo">
                        <img src="mc.png" alt="MC" class="mc-logo-img" onerror="this.style.display='none';">
                    </div>
                    <div class="flip-hint">Click to flip</div>
                </div>
                <div class="card-back">
                    <div class="back-container">
                        <div class="back-title ${persona.name.length > 15 ? 'long-title' : ''}">${persona.name}</div>
                        <div class="info-section">
                            <div class="section-title">Biography</div>
                            <div class="section-content">${persona.biography}</div>
                        </div>
                        <div class="info-section">
                            <div class="section-title">Debut</div>
                            <div class="section-content">${persona.debut}</div>
                        </div>
                        <div class="info-section">
                            <div class="section-title">Themes</div>
                            <div class="section-content">${persona.themes}</div>
                        </div>
                    </div>
                    <div class="logo-space">
                        <img src="logoback.png" alt="Ultra Keith" class="back-logo" onerror="this.style.display='none';">
                    </div>
                    <div class="card-number">#${persona.number}</div>
                    <div class="mc-logo">
                        <img src="mc.png" alt="MC" class="mc-logo-img" onerror="this.parentElement.innerHTML='MC';">
                    </div>
                </div>
            </div>
        `;
        
        // Add flip functionality
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
            this.createCardBurst(card);
        });
        
        return card;
    }
    
    createParticleEffects() {
        const deckBox = document.getElementById('deckBox');
        if (!deckBox) return;
        
        const rect = deckBox.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create mystical particles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'mystical-particle';
                
                const angle = (i / 20) * Math.PI * 2;
                const radius = 50 + Math.random() * 100;
                const endX = centerX + Math.cos(angle) * radius;
                const endY = centerY + Math.sin(angle) * radius;
                
                particle.style.left = centerX + 'px';
                particle.style.top = centerY + 'px';
                
                document.body.appendChild(particle);
                
                particle.style.animation = 'particle-burst 1.5s ease-out forwards';
                particle.style.transform = `translate(${endX - centerX}px, ${endY - centerY}px)`;
                
                setTimeout(() => particle.remove(), 1500);
            }, i * 50);
        }
        
        // Create energy waves
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const wave = document.createElement('div');
                wave.className = 'energy-wave';
                wave.style.left = centerX + 'px';
                wave.style.top = centerY + 'px';
                
                document.body.appendChild(wave);
                
                wave.style.animation = 'energy-wave-expand 1s ease-out forwards';
                
                setTimeout(() => wave.remove(), 1000);
            }, i * 300);
        }
    }
    
    createScreenFlash() {
        const flash = document.createElement('div');
        flash.className = 'screen-flash';
        document.body.appendChild(flash);
        
        flash.style.animation = 'screen-flash-effect 0.8s ease-out forwards';
        
        setTimeout(() => flash.remove(), 800);
    }
    
    createCardBurst(card) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const burst = document.createElement('div');
                burst.className = 'card-burst';
                
                const angle = (i / 8) * Math.PI * 2;
                const distance = 30 + Math.random() * 20;
                const endX = centerX + Math.cos(angle) * distance;
                const endY = centerY + Math.sin(angle) * distance;
                
                burst.style.left = centerX + 'px';
                burst.style.top = centerY + 'px';
                
                document.body.appendChild(burst);
                
                burst.style.animation = 'particle-burst 0.8s ease-out forwards';
                burst.style.transform = `translate(${endX - centerX}px, ${endY - centerY}px)`;
                
                setTimeout(() => burst.remove(), 800);
            }, i * 20);
        }
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎭 Initializing Personas System...');
    window.personasSystem = new PersonasSystem();
});

// Initialize immediately if DOM already loaded
if (document.readyState === 'loading') {
    // Do nothing, wait for DOMContentLoaded
} else {
    console.log('🎭 DOM already loaded, initializing Personas System...');
    window.personasSystem = new PersonasSystem();
}
