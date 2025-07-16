// MINIMAL DECK CLICK FIX
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Deck system loading...');
    
    // Get the deck element
    const deckBox = document.getElementById('deckBox');
    
    if (!deckBox) {
        console.error('❌ Deck box not found!');
        return;
    }
    
    console.log('✅ Deck box found, adding click listener...');
    
    // Simple deck click handler
    deckBox.addEventListener('click', function() {
        console.log('🎉 DECK CLICKED!');
        
        // Hide the deck
        const deckContainer = document.getElementById('deckContainer');
        if (deckContainer) {
            deckContainer.style.display = 'none';
            console.log('✅ Deck hidden');
        }
        
        // Show the controls
        const controlsSection = document.getElementById('controlsSection');
        if (controlsSection) {
            controlsSection.classList.add('show');
            console.log('✅ Controls shown');
        }
        
        // Show the cards container
        const cardsContainer = document.getElementById('cardsContainer');
        if (cardsContainer) {
            cardsContainer.classList.add('show');
            console.log('✅ Cards container shown');
        }
        
        // Update persona counter if data exists
        if (typeof window.personasData !== 'undefined') {
            const personaCounter = document.getElementById('personaCounter');
            if (personaCounter) {
                personaCounter.textContent = window.personasData.length + ' Personas Available';
            }
        }
        
        console.log('🎉 Deck opened successfully!');
    });
    
    console.log('🚀 Deck system ready!');
});
