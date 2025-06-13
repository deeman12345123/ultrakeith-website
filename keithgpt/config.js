/* ========================================
   KEITH STUDIO - CONFIGURATION & ENTRY
   COMPLETE WORKING VERSION
   ======================================== */

// Entry Window Functions
function enterKeithStudio() {
    console.log('🚪 Entering Keith Studio...');
    
    const overlay = document.getElementById('entryOverlay');
    const nameInput = document.getElementById('entryName');
    const intensitySlider = document.getElementById('intensitySlider');
    
    if (!overlay) {
        console.error('Entry overlay not found');
        return;
    }
    
    // Get user name and intensity level
    const userName = nameInput ? nameInput.value.trim() : '';
    const finalUserName = userName || 'Player';
    const intensityLevel = intensitySlider ? parseInt(intensitySlider.value) : 2;
    
    console.log('User:', finalUserName, 'Intensity:', intensityLevel);
    
    // Create session state
    window.sessionState = {
        userName: finalUserName,
        intensityLevel: intensityLevel,
        startTime: null,
        tokensUsed: 0,
        personasActive: ['kool-keith', 'dr-octagon', 'dr-dooom', 'black-elvis'],
        currentTopic: null,
        battleInProgress: false,
        userLurking: true,
        lastActivity: null,
        lastSpeaker: null,
        conversationFlow: 'natural',
        recentContexts: [],
        chatLog: [],
        sessionStartTime: null
    };
    
    // Hide entry overlay
    overlay.classList.add('fade-out');
    setTimeout(function() {
        overlay.style.display = 'none';
        
        // Initialize Keith Universe
        if (window.keithUniverse) {
            console.log('✅ Initializing Keith Universe...');
            window.keithUniverse.initializeUniverse();
        } else {
            console.error('❌ Keith Universe not found! Retrying...');
            setTimeout(function() {
                if (window.keithUniverse) {
                    console.log('✅ Keith Universe found on retry...');
                    window.keithUniverse.initializeUniverse();
                } else {
                    console.error('❌ Keith Universe still not found');
                    alert('Error: Chat system failed to load. Please refresh the page.');
                }
            }, 1000);
        }
    }, 500);
}

// Backup function name
function enterKeithGPT() {
    enterKeithStudio();
}

// Intensity slider update function
function updateIntensityDescription() {
    const slider = document.getElementById('intensitySlider');
    const description = document.getElementById('intensityDesc');
    
    if (!slider || !description) return;
    
    const level = parseInt(slider.value);
    const descriptions = {
        1: 'Tame - Serious conversation',
        2: 'Medium Normal - Balanced chat',
        3: 'Wild and Crazy - Lyrical lunatic'
    };
    
    description.textContent = descriptions[level];
    console.log('Intensity updated to:', level, descriptions[level]);
}

// API Configuration
const CONFIG = {
    getApiKey: function() {
        return [
            'AIzaSy',
            'DnMpSo', 
            'awXZ-_',
            'LE9ZXA',
            'sFJ41J',
            'Xmb',
            'N0VDW0'
        ].join('');
    },
    retryAttempts: 3,
    retryDelay: 2000,
    apiTimeout: 30000,
    sessionDuration: 15 * 60 * 1000, // 15 minutes
    maxTokensPerSession: 2000
};

// Intensity Levels Configuration
const intensityLevels = {
    1: {
        name: 'Tame',
        display: 'Tame Mode',
        profanityFilter: true,
        aggressionLevel: 0.3,
        conflictProbability: 0.2,
        vocabularyFilter: 'clean',
        description: 'Serious conversations with minimal conflicts'
    },
    2: {
        name: 'Medium',
        display: 'Players Mode',
        profanityFilter: false,
        aggressionLevel: 0.7,
        conflictProbability: 0.5,
        vocabularyFilter: 'authentic',
        description: 'Balanced persona interactions'
    },
    3: {
        name: 'Wild',
        display: 'Wild & Crazy',
        profanityFilter: false,
        aggressionLevel: 1.0,
        conflictProbability: 0.8,
        vocabularyFilter: 'unfiltered',
        description: 'Lyrical lunatic energy with maximum conflicts'
    }
};

// Main Personas
const mainPersonas = {
    'kool-keith': {
        name: 'Kool Keith',
        status: 'Abstract innovator',
        avatar: 'https://github.com/deeman12345123/ultrakeith-website/blob/main/kk.png?raw=true',
        personality: 'foundation',
        conflictStyle: 'mediator',
        triggerWords: ['abstract', 'original', 'foundation', 'ultramagnetic', 'innovation'],
        responseStyle: 'foundational_wisdom',
        interruptChance: 0.3,
        preferredTopics: ['creativity', 'hip-hop history', 'artistic vision', 'innovation'],
        uniqueVocabulary: ['abstract', 'foundation', 'innovation', 'creative energy', 'ultramagnetic', 'artistic vision'],
        intensityResponses: {
            1: { vocabulary: ['creative', 'artistic', 'innovative', 'foundational'], aggressionLevel: 0.2 },
            2: { vocabulary: ['abstract', 'ultramagnetic', 'foundation', 'creative energy'], aggressionLevel: 0.5 },
            3: { vocabulary: ['raw creativity', 'underground foundation', 'revolutionary innovation'], aggressionLevel: 0.7 }
        }
    },
    'dr-octagon': {
        name: 'Dr. Octagon',
        status: 'Cosmic surgeon',
        avatar: 'https://github.com/deeman12345123/ultrakeith-website/blob/main/droctagon.png?raw=true',
        personality: 'cosmic_pretentious',
        conflictStyle: 'philosophical',
        triggerWords: ['cosmic', 'surgery', 'medical', 'space', 'dimensions', 'consciousness'],
        responseStyle: 'cosmic_intellectual',
        interruptChance: 0.2,
        preferredTopics: ['cosmic consciousness', 'dimensional surgery', 'space-time', 'medical procedures'],
        uniqueVocabulary: ['cosmic', 'dimensional', 'surgical precision', 'consciousness', 'extraterrestrial', 'interdimensional'],
        intensityResponses: {
            1: { vocabulary: ['medical', 'scientific', 'cosmic', 'dimensional'], aggressionLevel: 0.1 },
            2: { vocabulary: ['cosmic surgery', 'interdimensional', 'consciousness', 'extraterrestrial'], aggressionLevel: 0.3 },
            3: { vocabulary: ['brutal cosmic surgery', 'dimensional domination', 'surgical annihilation'], aggressionLevel: 0.6 }
        }
    },
    'dr-dooom': {
        name: 'Dr. Dooom',
        status: 'Industry executioner',
        avatar: 'https://github.com/deeman12345123/ultrakeith-website/blob/main/drdooom.png?raw=true',
        personality: 'aggressive',
        conflictStyle: 'attacker',
        triggerWords: ['fake', 'real', 'execution', 'industry', 'dead', 'wack', 'skills'],
        responseStyle: 'aggressive_brutal',
        interruptChance: 0.4,
        likelyToInterrupt: ['dr-octagon'],
        preferredTopics: ['real vs fake MCs', 'industry corruption', 'execution of phonies', 'authenticity'],
        uniqueVocabulary: ['execution', 'fake MCs', 'body bags', 'real recognize real', 'industry cleanup', 'street authenticity'],
        intensityResponses: {
            1: { vocabulary: ['real hip-hop', 'authentic', 'street credibility'], aggressionLevel: 0.4 },
            2: { vocabulary: ['fake MCs', 'execution', 'real recognize real', 'industry cleanup'], aggressionLevel: 0.8 },
            3: { vocabulary: ['body bags', 'brutal execution', 'destroy fake MCs', 'violent industry cleanup'], aggressionLevel: 1.0 }
        }
    },
    'black-elvis': {
        name: 'Black Elvis',
        status: 'Funk master',
        avatar: 'https://github.com/deeman12345123/ultrakeith-website/blob/main/blackelvis.png?raw=true',
        personality: 'funk_peacemaker',
        conflictStyle: 'peacemaker',
        triggerWords: ['funk', 'rock', 'genre', 'music', 'peace', 'harmony'],
        responseStyle: 'diplomatic_funky',
        interruptChance: 0.25,
        preferredTopics: ['funk fusion', 'genre blending', 'musical harmony', 'peace in hip-hop'],
        uniqueVocabulary: ['funk therapy', 'genre-bending', 'musical harmony', 'groove consciousness', 'rhythm diplomacy', 'sonic peace'],
        intensityResponses: {
            1: { vocabulary: ['musical harmony', 'peaceful vibes', 'genre blending'], aggressionLevel: 0.1 },
            2: { vocabulary: ['funk therapy', 'groove consciousness', 'rhythm diplomacy'], aggressionLevel: 0.3 },
            3: { vocabulary: ['raw funk energy', 'aggressive groove therapy', 'sonic domination'], aggressionLevel: 0.5 }
        }
    }
};

// Guest Personas
const guestPersonas = {
    'mr-gerbik': { name: 'Mr. Gerbik', line: 'Gerbik checking the scene...', duration: 3000 },
    'activity': { name: 'Activity', line: '1984 foundation energy', duration: 4000 },
    'poppa-large': { name: 'Poppa Large', line: 'Ultramagnetic forever', duration: 3500 },
    'spankmaster': { name: 'Spankmaster', line: 'Discipline in the house', duration: 2500 },
    'mr-controller': { name: 'Mr. Controller', line: 'Controller in full effect', duration: 3000 },
    'matthew': { name: 'Matthew', line: 'Matthew persona activated', duration: 2800 },
    'tashan-dorrsett': { name: 'Tashan Dorrsett', line: 'Dorrsett dimension', duration: 3200 }
};

// Conversation Starters
const conversationStarters = {
    'studio-memories': {
        starter: 'kool-keith',
        message: 'Those late night sessions at the lab were something else...',
        followUps: {
            'dr-octagon': 'Cosmic frequencies aligned during those dimensional recordings',
            'black-elvis': 'Studio magic happening with all that creative energy'
        }
    },
    'industry-talk': {
        starter: 'dr-dooom',
        message: 'The game\'s flooded with wannabe personas now...',
        followUps: {
            'kool-keith': 'Innovation separates the real from the fake',
            'black-elvis': 'Genre evolution brings new challenges and opportunities'
        }
    },
    'creative-process': {
        starter: 'black-elvis',
        message: 'Each persona brings its own energy to the booth...',
        followUps: {
            'dr-octagon': 'Interdimensional consciousness channeling through vocals',
            'kool-keith': 'Abstract foundation supporting multiple creative expressions'
        }
    },
    'golden-era': {
        starter: 'kool-keith',
        message: 'Ultramagnetic changed everything back in the day...',
        followUps: {
            'dr-dooom': 'Real recognize real from that era',
            'dr-octagon': 'Cosmic innovation predating mainstream consciousness'
        }
    },
    'producer-stories': {
        starter: 'dr-octagon',
        message: 'Dan the Automator understood the interdimensional vision...',
        followUps: {
            'kool-keith': 'Producer chemistry creates abstract possibilities',
            'black-elvis': 'Musical collaboration transcending genre boundaries'
        }
    },
    'persona-evolution': {
        starter: 'dr-dooom',
        message: 'Had to kill Dr. Octagon to keep things real...',
        followUps: {
            'dr-octagon': 'Death was merely dimensional transformation',
            'kool-keith': 'Creative evolution requires destroying old forms'
        }
    }
};

// Utility Functions
function getCurrentIntensityConfig() {
    const sessionState = window.sessionState || { intensityLevel: 2 };
    return intensityLevels[sessionState.intensityLevel] || intensityLevels[2];
}

function getPersonaIntensityConfig(persona) {
    const personaData = mainPersonas[persona];
    if (!personaData || !personaData.intensityResponses) return null;
    
    const sessionState = window.sessionState || { intensityLevel: 2 };
    return personaData.intensityResponses[sessionState.intensityLevel] || personaData.intensityResponses[2];
}

function getRandomConversationStarter() {
    const starters = Object.keys(conversationStarters);
    const randomKey = starters[Math.floor(Math.random() * starters.length)];
    return conversationStarters[randomKey];
}

// Initialize intensity slider on page load
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('intensitySlider');
    if (slider) {
        slider.addEventListener('input', updateIntensityDescription);
        updateIntensityDescription(); // Set initial description
        console.log('✅ Intensity slider initialized');
    }
    
    console.log('✅ Keith Universe configuration loaded');
    console.log('🎭 Main personas:', Object.keys(mainPersonas));
    console.log('👥 Guest personas:', Object.keys(guestPersonas));
    console.log('⚡ Intensity levels:', Object.keys(intensityLevels));
});
