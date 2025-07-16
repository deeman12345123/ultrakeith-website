// PERSONAS SYSTEM - Complete Interactive Trading Card System
// File: personas-system.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('Personas system loading...');
    
    // Check if personas data is available
    if (typeof window.personasData === 'undefined') {
        console.error('Personas data not loaded! Make sure personas-data.js loads first.');
        return;
    }
    
    // GLOBAL VARIABLES
    let currentPage = 1;
    let cardsPerPage = 9; // 3x3 grid on desktop, 9 cards on mobile
    let currentSort = 'oldest'; // 'oldest' or 'newest'
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
    
    // INITIALIZE
    updatePersonaCounter();
    setupEventListeners();
    
    // EVENT LISTENERS
    function setupEventListeners() {
        // Deck click
        deckBox.addEventListener('click', handleDeckClick);
        
        // Sort buttons
        oldestFirstBtn.addEventListener('click', () => setSortOrder('oldest'));
        newestFirstBtn.addEventListener('click', () => setSortOrder('newest'));
        
        // Pagination
        prevBtn.addEventListener('click', () => changePage(-1));
        nextBtn.addEventListener('click', () => changePage(1));
        
        // Responsive card count
        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial cards per page
    }
    
    // RESPONSIVE CARD COUNT
    function handleResize() {
        if (window.innerWidth <= 768) {
            cardsPerPage = 6; // Mobile: 1 column, 6 cards
        } else if (window.innerWidth <= 1200) {
            cardsPerPage = 8; // Tablet: 2 columns, 8 cards
        } else {
            cardsPerPage = 9; // Desktop: 3 columns, 9 cards
        }
        
        if (deckOpened) {
            renderCurrentPage();
        }
    }
    
    // UPDATE PERSONA COUNTER
    function updatePersonaCounter() {
        const totalCount = window.personasData.length;
        personaCounter.textContent = `${totalCount} Personas Available`;
    }
    
    // DECK CLICK HANDLER
    async function handleDeckClick() {
        if (deckOpened) return;
        
        console.log('Deck clicked! Opening...');
        deckOpened = true;
        
        // Add mystical hover effect
        deckBox.classList.add('mystical-hover');
        
        // Create mystical particles
        createMysticalParticles();
        
        // Energy building effect
        setTimeout(() => {
            deckBox.classList.add('energy-building');
        }, 500);
        
        // Screen flash
        setTimeout(() => {
            createScreenFlash();
        }, 1500);
        
        // Hide deck and show cards
        setTimeout(() => {
            deckContainer.classList.add('hidden');
            controlsSection.classList.add('show');
            cardsContainer.classList.add('show');
            paginationContainer.classList.add('show');
            
            // Start card animation
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
                
                // Position around deck
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
                
                // Animate particle burst
                particle.style.animation = 'particle-burst 1.5s ease-out forwards';
                
                // Random end position
                const endX = startX + (Math.random() - 0.5) * 300;
                const endY = startY + (Math.random() - 0.5) * 300;
                
                setTimeout(() => {
                    particle.style.transform = `translate(${endX - startX}px, ${endY - startY}px) scale(0)`;
                }, 100);
                
                // Remove particle
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
        
        // Update button states
        oldestFirstBtn.classList.toggle('active', order === 'oldest');
        newestFirstBtn.classList.toggle('active', order === 'newest');
        
        renderCurrentPage();
    }
    
    // GET SORTED PERSONAS
    function getSortedPersonas() {
        const sorted = [...window.personasData];
        
        if (currentSort === 'newest') {
            return sorted.reverse();
        }
        
        return sorted; // Default: oldest first
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
        const sortedPersonas = getSortedPersonas();
        const totalPages = Math.ceil(sortedPersonas.length / cardsPerPage);
        const startIndex = (currentPage - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        const pagePersonas = sortedPersonas.slice(startIndex, endIndex);
        
        // Clear existing cards
        cardsGrid.innerHTML = '';
        
        // Create cards
        pagePersonas.forEach((persona, index) => {
            const card = createTradingCard(persona, startIndex + index + 1);
            cardsGrid.appendChild(card);
            
            // Animate card appearance
            setTimeout(() => {
                if (window.innerWidth <= 768 && index > 0) {
                    // Mobile: only first card spins
                    card.classList.add('card-flying');
                } else {
                    // Desktop: all cards spin
                    card.classList.add('card-flying');
                }
                
                setTimeout(() => {
                    card.classList.remove('card-flying');
                    card.classList.add('card-landed');
                }, 1200);
            }, index * 150);
        });
        
        // Update pagination
        updatePagination(totalPages);
    }
    
    // UPDATE PAGINATION
    function updatePagination(totalPages) {
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        
        prevBtn.classList.toggle('disabled', currentPage === 1);
        nextBtn.classList.toggle('disabled', currentPage === totalPages);
    }
    
    // CREATE TRADING CARD
    function createTradingCard(persona, cardNumber) {
        const card = document.createElement('div');
        card.className = 'trading-card';
        
        // Determine if title is long (X-Caliber gets small font too)
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
    
    console.log('Personas system loaded successfully!');
});
