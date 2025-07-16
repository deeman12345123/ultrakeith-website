// Simple Working Personas System
document.addEventListener('DOMContentLoaded', function() {
    console.log('Starting simple system...');
    
    // Get elements
    const deckBox = document.getElementById('deckBox');
    const deckContainer = document.getElementById('deckContainer');
    const cardsContainer = document.getElementById('cardsContainer');
    const cardsGrid = document.getElementById('cardsGrid');
    const controlsSection = document.getElementById('controlsSection');
    const personaCounter = document.getElementById('personaCounter');
    
    // Check if data loaded
    if (!window.personasData) {
        console.error('No personas data!');
        return;
    }
    
    console.log('Found', window.personasData.length, 'personas');
    
    // Update counter
    if (personaCounter) {
        personaCounter.textContent = window.personasData.length + ' Personas Available';
    }
    
    // Deck click handler
    deckBox.addEventListener('click', function() {
        console.log('Deck clicked!');
        
        // Hide deck
        deckContainer.classList.add('hidden');
        
        // Show controls and cards
        if (controlsSection) controlsSection.classList.add('show');
        if (cardsContainer) cardsContainer.classList.add('show');
        
        // Create cards
        createAllCards();
    });
    
    function createAllCards() {
        if (!cardsGrid) return;
        
        cardsGrid.innerHTML = '';
        
        window.personasData.forEach((persona, index) => {
            const card = createCard(persona, index + 1);
            cardsGrid.appendChild(card);
            
            // Simple animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, index * 100);
        });
    }
    
    function createCard(persona, number) {
        const card = document.createElement('div');
        card.className = 'trading-card';
        
        // X-Caliber fix: smaller font for X-Caliber
        const titleClass = persona.name === "X-Caliber" ? 'persona-title long-title' : 'persona-title';
        const backTitleClass = persona.name === "X-Caliber" ? 'back-title long-title' : 'back-title';
        
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
                    
                    <div class="card-number">#${number.toString().padStart(3, '0')}</div>
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
                    
                    <div class="card-number">#${number.toString().padStart(3, '0')}</div>
                </div>
            </div>
        `;
        
        // Card flip on click
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
        
        return card;
    }
    
    console.log('Simple system ready!');
});
