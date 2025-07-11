// ULTRA KEITH PERSONAS SYSTEM
// Professional, bulletproof, modular system
// Don't edit this file unless you know what you're doing!

console.log('🚀 Starting Ultra Keith Personas System...');

// Configuration
var CONFIG = {
    ANIMATION_SPEEDS: {
        PORTAL_PHASES: [0, 600, 1200, 1600, 2200, 3000],
        CARD_FLIGHT: 1200,
        CARD_LAUNCH_INTERVAL: 100,
        PARTICLE_BURST: 2000,
        ENERGY_WAVE: 1500,
        SCREEN_FLASH: 2000
    },
    CARD_LIMITS: {
        LONG_TITLE_THRESHOLD: 20 // Names longer than 20 chars get smaller font
    },
    PARTICLE_COUNTS: {
        MYSTICAL_PARTICLES: 60,
        ENERGY_WAVES: 6,
        CARD_BURSTS: 40
    },
    IMAGES: {
        DECK_LOGO: 'logoback.png',
        MC_LOGO: 'mc.png',
        BACK_LOGO: 'logoback.png'
    },
    COLORS: {
        PARTICLE_COLORS: ['var(--mystical-blue)', 'var(--energy-purple)', 'var(--plasma-pink)', 'var(--keith-gold)']
    },
    FEATURES: {
        HOVER_EFFECTS: true,
        CARD_ROTATION: true,
        SCREEN_FLASH: true,
        CONSOLE_LOGGING: true
    },
    PAGINATION: {
        CARDS_PER_PAGE: 12
    }
};

// Global state
var currentPage = 1;
var currentSort = 'oldest'; // 'oldest' or 'newest'
var deckOpened = false;
var currentPersonas = [];
var totalPages = 1;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function safeRemoveElement(element) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

function addClassSafely(element, className) {
    if (element && element.classList) {
        element.classList.add(className);
    }
}

function removeClassSafely(element, className) {
    if (element && element.classList) {
        element.classList.remove(className);
    }
}

function logSafely(message) {
    if (CONFIG.FEATURES.CONSOLE_LOGGING && console && console.log) {
        console.log(message);
    }
}

// ============================================================================
// PERSONA MANAGEMENT
// ============================================================================

// Sort personas by year and number
function sortPersonas(personas, order) {
    return personas.slice().sort(function(a, b) {
        var yearA = parseInt(a.year);
        var yearB = parseInt(b.year);
        var numA = parseInt(a.number);
        var numB = parseInt(b.number);
        
        if (order === 'oldest') {
            // Oldest first: by year, then by number
            if (yearA !== yearB) {
                return yearA - yearB;
            }
            return numA - numB;
        } else {
            // Newest first: by year desc, then by number desc
            if (yearA !== yearB) {
                return yearB - yearA;
            }
            return numB - numA;
        }
    });
}

// Get personas for current page
function getCurrentPagePersonas() {
    var sortedPersonas = sortPersonas(PERSONAS_DATABASE, currentSort);
    var startIndex = (currentPage - 1) * CONFIG.PAGINATION.CARDS_PER_PAGE;
    var endIndex = startIndex + CONFIG.PAGINATION.CARDS_PER_PAGE;
    return sortedPersonas.slice(startIndex, endIndex);
}

// Update persona counter display
function updatePersonaCounter() {
    var total = PERSONAS_DATABASE.length;
    var startNum = (currentPage - 1) * CONFIG.PAGINATION.CARDS_PER_PAGE + 1;
    var endNum = Math.min(currentPage * CONFIG.PAGINATION.CARDS_PER_PAGE, total);
    
    var counter = document.getElementById('personaCounter');
    if (counter) {
        counter.textContent = 'Showing ' + startNum + '-' + endNum + ' of ' + total + ' personas';
    }
}

// Update pagination controls
function updatePaginationControls() {
    totalPages = Math.ceil(PERSONAS_DATABASE.length / CONFIG.PAGINATION.CARDS_PER_PAGE);
    
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var pageInfo = document.getElementById('pageInfo');
    
    if (prevBtn) {
        if (currentPage <= 1) {
            addClassSafely(prevBtn, 'disabled');
            prevBtn.style.pointerEvents = 'none';
        } else {
            removeClassSafely(prevBtn, 'disabled');
            prevBtn.style.pointerEvents = 'auto';
        }
    }
    
    if (nextBtn) {
        if (currentPage >= totalPages) {
            addClassSafely(nextBtn, 'disabled');
            nextBtn.style.pointerEvents = 'none';
        } else {
            removeClassSafely(nextBtn, 'disabled');
            nextBtn.style.pointerEvents = 'auto';
        }
    }
    
    if (pageInfo) {
        pageInfo.textContent = 'Page ' + currentPage + ' of ' + totalPages;
    }
}

// ============================================================================
// CARD GENERATION
// ============================================================================

// Build individual card HTML (preserves long title handling)
function buildCardHTML(persona, isLongTitle) {
    return '<div class="card-inner">' +
        '<div class="card-front">' +
            '<div class="front-container">' +
                '<div class="card-header">' +
                    '<h1 class="persona-title ' + (isLongTitle ? 'long-title' : '') + '">' + persona.name + '</h1>' +
                '</div>' +
                '<div class="image-container">' +
                    '<img src="images/' + persona.image + '" alt="' + persona.name + '" onerror="this.parentNode.innerHTML=\'IMG\'">' +
                '</div>' +
                '<div class="stats-section">' +
                    '<div class="stat-item">' +
                        '<span class="stat-label">Age:</span>' +
                        '<span class="stat-value">' + persona.age + '</span>' +
                    '</div>' +
                    '<div class="stat-item">' +
                        '<span class="stat-label">Origin:</span>' +
                        '<span class="stat-value">' + persona.origin + '</span>' +
                    '</div>' +
                    '<div class="stat-item">' +
                        '<span class="stat-label">Likes:</span>' +
                        '<span class="stat-value">' + persona.likes + '</span>' +
                    '</div>' +
                    '<div class="stat-item">' +
                        '<span class="stat-label">Dislikes:</span>' +
                        '<span class="stat-value">' + persona.dislikes + '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="quote-section">"' + persona.quote + '"</div>' +
            '</div>' +
            '<div class="mc-logo">' +
                '<img src="' + CONFIG.IMAGES.MC_LOGO + '" alt="MC" class="mc-logo-img" onerror="this.style.display=\'none\'">' +
            '</div>' +
            '<div class="flip-hint">Click to flip</div>' +
            '<div class="card-number">#' + persona.number + '</div>' +
        '</div>' +
        '<div class="card-back">' +
            '<div class="back-container">' +
                '<h2 class="back-title ' + (isLongTitle ? 'long-title' : '') + '">' + persona.name + ' (' + persona.year + ')</h2>' +
                '<div class="info-section">' +
                    '<h3 class="section-title">Biography</h3>' +
                    '<div class="section-content">' + persona.biography + '</div>' +
                '</div>' +
                '<div class="info-section">' +
                    '<h3 class="section-title">Debut</h3>' +
                    '<div class="section-content">' + persona.debut + '</div>' +
                '</div>' +
                '<div class="info-section">' +
                    '<h3 class="section-title">Key Themes</h3>' +
                    '<div class="section-content">' + persona.themes + '</div>' +
                '</div>' +
            '</div>' +
            '<div class="logo-space">' +
                '<img src="' + CONFIG.IMAGES.BACK_LOGO + '" alt="Ultra Keith Logo" class="back-logo" onerror="this.style.display=\'none\'">' +
            '</div>' +
            '<div class="mc-logo">' +
                '<img src="' + CONFIG.IMAGES.MC_LOGO + '" alt="MC" class="mc-logo-img" onerror="this.style.display=\'none\'">' +
            '</div>' +
            '<div class="card-number">#' + persona.number + '</div>' +
        '</div>' +
    '</div>';
}

// Generate cards for current page
function generateCards() {
    logSafely('📋 Generating cards for page ' + currentPage + '...');
    var container = document.getElementById('cardsGrid');
    
    // Clear existing cards
    container.innerHTML = '';
    
    currentPersonas = getCurrentPagePersonas();
    
    for (var i = 0; i < currentPersonas.length; i++) {
        var persona = currentPersonas[i];
        var isLongTitle = persona.name.length > CONFIG.CARD_LIMITS.LONG_TITLE_THRESHOLD;
        var card = document.createElement('div');
        
        card.className = 'trading-card';
        card.innerHTML = buildCardHTML(persona, isLongTitle);
        
        // Add flip functionality
        card.addEventListener('click', function() {
            var personaName = this.querySelector('.persona-title').textContent;
            logSafely('🃏 Flipping card: ' + personaName);
            this.classList.toggle('flipped');
        });
        
        container.appendChild(card);
    }
    
    updatePersonaCounter();
    updatePaginationControls();
    
    logSafely('✅ Generated ' + currentPersonas.length + ' cards for page ' + currentPage);
}

// ============================================================================
// CONTROL HANDLERS
// ============================================================================

// Sort button handlers
function setupSortControls() {
    var oldestBtn = document.getElementById('oldestFirstBtn');
    var newestBtn = document.getElementById('newestFirstBtn');
    
    if (oldestBtn) {
        oldestBtn.addEventListener('click', function() {
            if (currentSort !== 'oldest') {
                currentSort = 'oldest';
                currentPage = 1;
                
                removeClassSafely(newestBtn, 'active');
                addClassSafely(oldestBtn, 'active');
                
                if (deckOpened) {
                    generateCards();
                    animateCardsFromDeck();
                }
            }
        });
    }
    
    if (newestBtn) {
        newestBtn.addEventListener('click', function() {
            if (currentSort !== 'newest') {
                currentSort = 'newest';
                currentPage = 1;
                
                removeClassSafely(oldestBtn, 'active');
                addClassSafely(newestBtn, 'active');
                
                if (deckOpened) {
                    generateCards();
                    animateCardsFromDeck();
                }
            }
        });
    }
}

// Pagination handlers
function setupPaginationControls() {
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                generateCards();
                animateCardsFromDeck();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                generateCards();
                animateCardsFromDeck();
            }
        });
    }
}

// ============================================================================
// MYSTICAL ANIMATIONS (Preserved from original)
// ============================================================================

function createMysticalParticles(container, count) {
    if (!container) return;
    count = count || CONFIG.PARTICLE_COUNTS.MYSTICAL_PARTICLES;
    
    for (var i = 0; i < count; i++) {
        setTimeout(function(index) {
            return function() {
                var particle = document.createElement('div');
                particle.className = 'mystical-particle';
                
                var centerX = container.offsetWidth / 2;
                var centerY = container.offsetHeight / 2;
                var angle = (Math.PI * 2 * index) / count;
                var radius = 30 + Math.random() * 100;
                
                particle.style.left = (centerX + Math.cos(angle) * radius) + 'px';
                particle.style.top = (centerY + Math.sin(angle) * radius) + 'px';
                
                var colors = CONFIG.COLORS.PARTICLE_COLORS;
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                particle.style.animation = 'particle-burst 2s ease-out forwards';
                
                container.appendChild(particle);
                
                setTimeout(function() {
                    safeRemoveElement(particle);
                }, CONFIG.ANIMATION_SPEEDS.PARTICLE_BURST);
            };
        }(i), i * 30);
    }
}

function createEnergyWaves(container, count) {
    if (!container) return;
    count = count || CONFIG.PARTICLE_COUNTS.ENERGY_WAVES;
    
    for (var i = 0; i < count; i++) {
        setTimeout(function() {
            var wave = document.createElement('div');
            wave.className = 'energy-wave';
            wave.style.animation = 'energy-wave-expand 1.5s ease-out forwards';
            container.appendChild(wave);
            
            setTimeout(function() {
                safeRemoveElement(wave);
            }, CONFIG.ANIMATION_SPEEDS.ENERGY_WAVE);
        }, i * 200);
    }
}

function createScreenFlash() {
    if (!CONFIG.FEATURES.SCREEN_FLASH) return;
    
    var flash = document.createElement('div');
    flash.className = 'screen-flash';
    flash.style.animation = 'screen-flash-effect ' + (CONFIG.ANIMATION_SPEEDS.SCREEN_FLASH / 1000) + 's ease-out forwards';
    document.body.appendChild(flash);
    
    setTimeout(function() {
        safeRemoveElement(flash);
    }, CONFIG.ANIMATION_SPEEDS.SCREEN_FLASH);
}

function createCardBurst(container, count) {
    if (!container) return;
    count = count || CONFIG.PARTICLE_COUNTS.CARD_BURSTS;
    
    for (var i = 0; i < count; i++) {
        setTimeout(function() {
            var cardBurst = document.createElement('div');
            cardBurst.className = 'card-burst';
            
            var centerX = container.offsetWidth / 2;
            var centerY = container.offsetHeight / 2;
            cardBurst.style.left = (centerX + (Math.random() - 0.5) * 200) + 'px';
            cardBurst.style.top = (centerY + (Math.random() - 0.5) * 200) + 'px';
            
            var moveX = (Math.random() - 0.5) * 400;
            var moveY = (Math.random() - 0.5) * 400;
            cardBurst.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px) rotate(' + (Math.random() * 360) + 'deg)';
            cardBurst.style.animation = 'particle-burst 2.5s ease-out forwards';
            
            container.appendChild(cardBurst);
            
            setTimeout(function() {
                safeRemoveElement(cardBurst);
            }, 2500);
        }, i * 50);
    }
}

// Card flight animation
function animateCardsFromDeck() {
    console.log('🎆 Animating cards flying from deck...');
    var cards = document.querySelectorAll('.trading-card');
    
    for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        
        setTimeout(function(index, cardElement) {
            return function() {
                var personaName = cardElement.querySelector('.persona-title').textContent;
                console.log('🃏 Launching card ' + (index + 1) + ': ' + personaName);
                addClassSafely(cardElement, 'card-flying');
                
                setTimeout(function() {
                    removeClassSafely(cardElement, 'card-flying');
                    addClassSafely(cardElement, 'card-landed');
                    console.log('✅ Card ' + (index + 1) + ' landed!');
                }, CONFIG.ANIMATION_SPEEDS.CARD_FLIGHT);
            };
        }(i, card), i * CONFIG.ANIMATION_SPEEDS.CARD_LAUNCH_INTERVAL);
    }
}

// ============================================================================
// DECK SETUP
// ============================================================================

function setupDeck() {
    console.log('🎮 Setting up mystical deck...');
    var deckBox = document.getElementById('deckBox');
    var deckContainer = document.getElementById('deckContainer');
    var cardsContainer = document.getElementById('cardsContainer');
    var paginationContainer = document.getElementById('paginationContainer');
    
    if (!deckBox) {
        console.error('❌ Deck box not found!');
        return;
    }
    
    console.log('✅ Deck box found:', deckBox);
    
    deckBox.addEventListener('mouseenter', function() {
        if (!deckOpened && CONFIG.FEATURES.HOVER_EFFECTS) {
            logSafely('🌟 Mystical aura activated...');
            addClassSafely(deckBox, 'mystical-hover');
        }
    });
    
    deckBox.addEventListener('mouseleave', function() {
        removeClassSafely(deckBox, 'mystical-hover');
    });
    
    deckBox.addEventListener('click', function() {
        console.log('🎯 MYSTICAL DECK CLICKED!');
        
        if (!deckOpened) {
            logSafely('🎭 MYSTICAL PORTAL OPENING SEQUENCE INITIATED...');
            deckOpened = true;
            
            removeClassSafely(deckBox, 'mystical-hover');
            
            logSafely('⚡ Phase 1: Energy building...');
            addClassSafely(deckBox, 'energy-building');
            
            setTimeout(function() {
                logSafely('🌊 Phase 2: Energy waves expanding...');
                createEnergyWaves(deckContainer);
            }, CONFIG.ANIMATION_SPEEDS.PORTAL_PHASES[1]);
            
            setTimeout(function() {
                logSafely('💫 Phase 3: Mystical particle explosion!');
                createMysticalParticles(deckContainer);
            }, CONFIG.ANIMATION_SPEEDS.PORTAL_PHASES[2]);
            
            setTimeout(function() {
                logSafely('🃏 Phase 4: Card burst sequence!');
                createCardBurst(deckContainer);
            }, CONFIG.ANIMATION_SPEEDS.PORTAL_PHASES[3]);
            
            setTimeout(function() {
                logSafely('⚡ Phase 5: Reality-bending screen flash!');
                createScreenFlash();
            }, CONFIG.ANIMATION_SPEEDS.PORTAL_PHASES[4]);
            
            setTimeout(function() {
                logSafely('✨ Phase 6: Portal opened - cards flying out!');
                addClassSafely(deckContainer, 'hidden');
                addClassSafely(cardsContainer, 'show');
                addClassSafely(paginationContainer, 'show');
                
                setTimeout(function() {
                    generateCards();
                    animateCardsFromDeck();
                }, 200);
                
                logSafely('🎮 Card interaction system activated!');
            }, CONFIG.ANIMATION_SPEEDS.PORTAL_PHASES[5]);
        } else {
            logSafely('⚠️ Portal already opened');
        }
    });
    
    console.log('✅ Mystical deck setup complete');
}

// ============================================================================
// INITIALIZATION
// ============================================================================

function initializePersonasSystem() {
    console.log('🎬 Initializing Personas System...');
    
    try {
        // Check if data is loaded
        if (typeof PERSONAS_DATABASE === 'undefined') {
            console.error('❌ PERSONAS_DATABASE not found! Make sure personas-data.js is loaded.');
            return;
        }
        
        setupSortControls();
        setupPaginationControls();
        setupDeck();
        updatePersonaCounter();
        updatePaginationControls();
        
        console.log('🎉 System ready! Click the mystical deck to begin!');
        console.log('📊 Loaded ' + PERSONAS_DATABASE.length + ' personas total');
        
    } catch (error) {
        console.error('❌ Initialization failed:', error);
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializePersonasSystem);
