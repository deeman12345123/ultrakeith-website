// PERSONAS SYSTEM - Complete Working Version
// File: personas-system.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Personas system starting...');
    
    // Check if personas data is available
    if (typeof window.personasData === 'undefined') {
        console.error('❌ Personas data not loaded! Make sure personas-data.js loads first.');
        return;
    }
    
    console.log('✅ Personas data found:', window.personasData.length, 'personas');
    
    // GLOBAL VARIABLES
    let currentPage = 1;
    let cardsPerPage = 9;
    let currentSort = 'oldest';
    let deckOpened = false;
    
    // ELEMENTS
    const deckContainer = document.getElementById('deckContainer');
    const deckBox = document.getElementById('deckBox');
    const cardsContainer = document.getElementById('cardsContainer');
    const cardsGrid = document.getElementById('cardsGrid');
    const controlsSection = document.getElementById('controlsSection');
    const personaCounter = document.getElementById('personaCounter');
    const paginationContainer = document.getElementById('paginationContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageInfo = document.getElementById('pageInfo');
    const oldestFirstBtn = document.getElementById('oldestFirstBtn');
    const newestFirstBtn = document.getElementById('newestFirstBtn');
    
    // VERIFY ELEMENTS
    if (!deckBox) {
        console.error('❌ Deck box not found!');
        return;
    }
    
    console.log('✅ All elements found');
    
    // INITIALIZE
    updatePersonaCounter();
    setupEventListeners();
    handleResize();
    
    // EVENT LISTENERS
    function setupEventListeners() {
        console.log('🔧 Setting up event listeners...');
        
        // Deck click
        deckBox.addEventListener('click', handleDeckClick);
        console.log('✅ Deck click listener added');
        
        // Sort buttons
        if (oldestFirstBtn) oldestFirstBtn.addEventListener('click', () => setSortOrder('oldest'));
        if (newestFirstBtn) newestFirstBtn.addEventListener('click', () => setSortOrder('newest'));
        
        // Pagination
        if (prevBtn) prevBtn.addEventListener('click', () => changePage(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => changePage(1));
        
        // Responsive
        window.addEventListener('resize', handleResize);
    }
    
    // RESPONSIVE CARDS PER PAGE
    function handleResize() {
        if (window.innerWidth <= 768) {
            cardsPerPage = 6; // Mobile: 1 column
        } else if (window.innerWidth <= 1200) {
            cardsPerPage = 8; // Tablet: 2 columns
        } else {
            cardsPerPage = 9; // Desktop: 3 columns
        }
        
        if (deckOpened) {
            renderCurrentPage();
        }
    }
    
    // UPDATE PERSONA COUNTER
    function updatePersonaCounter() {
        const totalCount = window.personasData.length;
        if (personaCounter) {
            personaCounter.textContent = `${totalCount} Personas Available`;
        }
    }
    
    // DECK CLICK HANDLER
    function handleDeckClick() {
        if (deckOpened) return;
        
        console.log('🎉 Deck clicked! Opening deck...');
        deckOpened = true;
        
        // Add effects
        deckBox.classList.add('mystical-hover');
        
        // Create particles
        createMysticalParticles();
        
        // Energy building
        setTimeout(() => {
            deckBox.classList.add('energy-building');
        }, 500);
        
        // Screen flash
        setTimeout(() => {
            createScreenFlash();
        }, 1500);
        
        // Show cards
        setTimeout(() => {
            deckContainer.classList.add('hidden');
            if (controlsSection) controlsSection.classList.add('show');
            if (cardsContainer) cardsContainer.classList.add('show');
            if (paginationContainer) paginationContainer.classList.add('show');
            
            renderCurrentPage();
        }, 2000);
    }
    
    // MYSTICAL PARTICLES
    function createMysticalParticles() {
        const colors = ['#00BFFF', '#8A2BE2', '#FF1493'];
        
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'mystical-particle';
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                const deckRect = deckBox.getBoundingClientRect();
                const centerX = deckRect.left + deckRect.width / 2;
                const centerY = deckRect.top + deckRect.height / 2;
                
                const angle = (i / 12) * Math.PI * 2;
                const startRadius = 180;
                const startX = centerX + Math.cos(angle) * startRadius;
                const startY = centerY + Math.sin(angle) * startRadius;
                
                particle.style.left = startX + 'px';
                particle.style.top = startY + 'px';
                
                document.body.appendChild(particle);
                
                particle.style.animation = 'particle-burst 1.5s ease-out forwards';
                
                const endX = startX + (Math.random() - 0.5) * 300;
                const endY = startY + (Math.random() - 0.5) * 300;
                
                setTimeout(() => {
                    particle.style.transform = `translate(${endX - startX}px, ${endY - startY}px) scale(0)`;
                }, 100);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 1600);
            }, i * 100);
        }
    }
    
    // SCREEN FLASH
    function createScreenFlash() {
        const flash = document.createElement('div');
        flash.className = 'screen-flash';
        document.body.appendChild(flash);
        
        flash.style.animation = 'screen-flash-effect 0.8s ease-out forwards';
        
        setTimeout(() => {
            if (flash.parentNode) {
                flash.parentNode.removeChild(flash);
            }
        }, 800);
    }
    
    // SORT ORDER
    function setSortOrder(order) {
        currentSort = order;
        currentPage = 1;
        
        if (oldestFirstBtn && newestFirstBtn) {
            oldestFirstBtn.classList.toggle('active', order === 'oldest');
            newestFirstBtn.classList.toggle('active', order === 'newest');
        }
        
        renderCurrentPage();
    }
    
    // GET SORTED PERSONAS
    function getSortedPersonas() {
        const sorted = [...window.personasData];
        
        if (currentSort === 'newest') {
            return sorted.reverse();
        }
        
        return sorted;
    }
    
    // PAGINATION
    function changePage(direction) {
        const totalPages = Math.ceil(window.personasData.length / cardsPerPage);
        const newPage = currentPage + direction;
        
        if (newPage >= 1 && newPage <= totalPages) {
            currentPage = newPage;
            renderCurrentPage();
        }
    }
    
    // RENDER CURRENT PAGE
    function renderCurrentPage() {
        console.log('🎨 Rendering page', currentPage);
        
        const sortedPersonas = getSortedPersonas();
        const totalPages = Math.ceil(sortedPersonas.length / cardsPerPage);
        const startIndex = (currentPage - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        const pagePersonas = sortedPersonas.slice(startIndex, endIndex);
        
        // Clear existing cards
        if (cardsGrid) {
            cardsGrid.innerHTML = '';
        
            // Create cards
            pagePersonas.forEach((persona, index) => {
                const card = createTradingCard(persona, startIndex + index + 1);
                cardsGrid.appendChild(card);
                
                // Animate card appearance
                setTimeout(() => {
                    if (window.innerWidth <= 768 && index > 0) {
                        card.classList.add('card-flying');
                    } else {
                        card.classList.add('card-flying');
                    }
                    
                    setTimeout(() => {
                        card.classList.remove('card-flying');
                        card.classList.add('card-landed');
                    }, 1200);
                }, index * 150);
            });
        }
        
        // Update pagination
        updatePagination(totalPages);
    }
    
    // UPDATE PAGINATION
    function updatePagination(totalPages) {
        if (pageInfo) {
            pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        }
        
        if (prevBtn) {
            prevBtn.classList.toggle('disabled', currentPage === 1);
        }
        if (nextBtn) {
            nextBtn.classList.toggle('disabled', currentPage === totalPages);
        }
    }
    
    // CREATE TRADING CARD
    function createTradingCard(persona, cardNumber) {
        const card = document.createElement('div');
        card.className = 'trading-card';
        
        // X-CALIBER FIX: Force smaller font for X-Caliber specifically
        const isLongTitle = persona.name.length > 12 || persona.name === "X-Caliber";
        const titleClass = isLongTitle ? 'persona-title long-title' : 'persona-title';
        const backTitleClass = isLongTitle ? 'back-title long-title' : 'back-title';
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <div class="front-container">
                        <div class="card-header">
                            <h3 class="${titleClass}">${persona.name}</h3>
                        </div>
                        
                        <div class="image-container">
                            <img src="${persona.image}" alt="${persona.name}" onerror="this.style.display='none'">
                        </div>
                        
                        <div class="stats-section">
                            <div class="stat-item">
                                <span class="stat-label">Era:</span>
                                <span class="stat-value">${persona.era}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Style:</span>
                                <span class="stat-value">${persona.style}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Origin:</span>
                                <span class="stat-value">${persona.origin}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Albums:</span>
                                <span class="stat-value">${persona.albums}</span>
                            </div>
                        </div>
                        
                        <div class="quote-section">
                            "${persona.quote}"
                        </div>
                    </div>
                    
                    <div class="mc-logo-small">
                        <img src="mclogosml.png" alt="MC" onerror="this.style.display='none'">
                    </div>
                    
                    <div class="card-number">#${cardNumber.toString().padStart(3, '0')}</div>
                    <div class="flip-hint">Click to flip</div>
                </div>
                
                <div class="card-back">
                    <div class="back-container">
                        <h3 class="${backTitleClass}">${persona.name}</h3>
                        
                        <div class="info-section">
                            <div class="section-title">Biography</div>
                            <div class="section-content">${persona.biography}</div>
                        </div>
                        
                        <div class="info-section">
                            <div class="section-title">Notable Tracks</div>
                            <div class="section-content">${persona.notableTracks}</div>
                        </div>
                        
                        <div class="info-section">
                            <div class="section-title">Influence</div>
                            <div class="section-content">${persona.influence}</div>
                        </div>
                    </div>
                    
                    <div class="logo-space">
                        <img class="back-logo" src="logoback.png" alt="Ultra Keith" onerror="this.style.display='none'">
                    </div>
                    
                    <div class="card-number">#${cardNumber.toString().padStart(3, '0')}</div>
                </div>
            </div>
        `;
        
        // Add flip functionality
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
        
        return card;
    }
    
    console.log('🎉 Personas system loaded successfully!');
});
