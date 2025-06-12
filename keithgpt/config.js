/* ========================================
   KEITH STUDIO - INNER UNIVERSE CONFIG
   UPGRADED: Intensity levels and new features
   ======================================== */

// Entry Window Functions (UPGRADED)
function enterKeithStudio() {
    const overlay = document.getElementById('entryOverlay');
    const nameInput = document.getElementById('entryName');
    const intensitySlider = document.getElementById('intensitySlider');
    
    // Get user name and intensity level
    const userName = nameInput?.value.trim() || 'Player';
    const intensityLevel = parseInt(intensitySlider?.value) || 2;
    
    // Store user preferences
    sessionState.userName = userName;
    sessionState.intensityLevel = intensityLevel;
    
    if (overlay) {
        overlay.classList.add('fade-out');
        setTimeout(() => {
            overlay.style.display = 'none';
            // Start the universe chat room
            if (window.keithUniverse) {
                window.keithUniverse.initializeUniverse();
            }
        }, 500);
    }
}

// Backup function name (in case of conflicts)
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
        1: 'Tame - Clean, family-friendly conversation',
        2: 'Players Mode (Default) - Authentic hip-hop chat',
        3: 'Wild & Crazy - Raw, unfiltered persona energy'
    };
    
    description.textContent = descriptions[level];
}

// Load Knowledge Files
function loadKnowledgeFiles() {
    const files = [
        '../keith-knowledge/kool-keith-knowledge.js',
        '../keith-knowledge/dr-octagon-knowledge.js', 
        '../keith-knowledge/dr-dooom-knowledge.js',
        '../keith-knowledge/black-elvis-knowledge.js'
    ];
    
    files.forEach(file => {
        const script = document.createElement('script');
        script.src = file;
        script.onerror = () => console.warn(`Knowledge file not found: ${file}`);
        document.head.appendChild(script);
    });
}

// Initialize knowledge loading
loadKnowledgeFiles();

// API Configuration
const CONFIG = {
    getApiKey: () => [
        'AIzaSy',
        'DnMpSo', 
        'awXZ-_',
        'LE9ZXA',
        'sFJ41J',
        'Xmb',
        'N0VDW0'
    ].join(''),
    retryAttempts: 3,
    retryDelay: 2000,
    apiTimeout: 30000,
    sessionDuration: 15 * 60 * 1000, // 15 minutes in milliseconds
    maxTokensPerSession: 2000
};

// UPGRADED: Intensity Levels Configuration
const intensityLevels = {
    1: { // Tame
        name: 'Tame',
        display: 'Tame Mode',
        profanityFilter: true,
        aggressionLevel: 0.3,
        conflictProbability: 0.2,
        vocabularyFilter: 'clean',
        description: 'Family-friendly conversations with minimal conflicts'
    },
    2: { // Players Mode (Default)
        name: 'Players',
        display: 'Players Mode',
        profanityFilter: false,
        aggressionLevel: 0.7,
        conflictProbability: 0.5,
        vocabularyFilter: 'authentic',
        description: 'Authentic hip-hop persona interactions'
    },
    3: { // Wild & Crazy
        name: 'Wild',
        display: 'Wild & Crazy',
        profanityFilter: false,
        aggressionLevel: 1.0,
        conflictProbability: 0.8,
        vocabularyFilter: 'unfiltered',
        description: 'Raw, unfiltered persona energy with maximum conflicts'
    }
};

// ENHANCED: Main Personas with intensity-based configurations
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

// Guest Personas (Random Appearances)
const guestPersonas = {
    'mr-gerbik': { name: 'Mr. Gerbik', line: 'Gerbik checking the scene...', duration: 3000 },
    'activity': { name: 'Activity', line: '1984 foundation energy', duration: 4000 },
    'poppa-large': { name: 'Poppa Large', line: 'Ultramagnetic forever', duration: 3500 },
    'spankmaster': { name: 'Spankmaster', line: 'Discipline in the house', duration: 2500 },
    'mr-controller': { name: 'Mr. Controller', line: 'Controller in full effect', duration: 3000 },
    'matthew': { name: 'Matthew', line: 'Matthew persona activated', duration: 2800 },
    'tashan-dorrsett': { name: 'Tashan Dorrsett', line: 'Dorrsett dimension', duration: 3200 }
};

// Battle Topics for Spontaneous Conflicts
const battleTopics = [
    "who's the realest in the Keith universe",
    "lyrical supremacy and wordplay mastery",
    "hip-hop innovation and creativity", 
    "underground vs mainstream authenticity",
    "New York hip-hop legacy and influence",
    "artistic vision and character development",
    "mic skills and flow techniques",
    "Keith's creative evolution over decades"
];

// ENHANCED: Conflict Triggers with intensity-based probability
const conflictTriggers = {
    'dooom_vs_octagon': {
        baseProbability: 0.7,
        intensityMultiplier: { 1: 0.3, 2: 1.0, 3: 1.5 },
        initiator: 'dr-dooom',
        target: 'dr-octagon',
        trigger_lines: {
            1: ['That cosmic approach isn\'t realistic', 'Medical theory vs street knowledge'],
            2: ['That fake cosmic surgeon is still dead', 'I killed you once, I\'ll do it again'],
            3: ['Time to brutally execute this fake cosmic fraud', 'Body bags don\'t perform surgery']
        },
        context_type: 'octagon_execution'
    },
    'octagon_responds': {
        baseProbability: 0.8,
        intensityMultiplier: { 1: 0.5, 2: 1.0, 3: 1.3 },
        initiator: 'dr-octagon', 
        target: 'dr-dooom',
        trigger_lines: {
            1: ['Scientific knowledge transcends street understanding', 'Cosmic perspective is more evolved'],
            2: ['Death is merely a transformation, limited earthbound consciousness', 'Reports of my death were greatly exaggerated'],
            3: ['Your crude violence cannot comprehend dimensional supremacy', 'Cosmic surgery will dissect your primitive mind']
        },
        context_type: 'cosmic_rebuttal'
    },
    'random_diss': {
        baseProbability: 0.3,
        intensityMultiplier: { 1: 0.2, 2: 1.0, 3: 2.0 },
        initiator: 'dr-dooom',
        target: 'any',
        trigger_lines: {
            1: ['That\'s not authentic hip-hop', 'Real recognize real'],
            2: ['Another fake persona in the building', 'Who asked for your opinion?'],
            3: ['Time for violent execution of fake MCs', 'Body bags ready for immediate disposal']
        },
        context_type: 'general_diss'
    }
};

// ENHANCED: Structured Conversation Topics with intensity variations
const conversationTopics = [
    {
        topic: "90s hip-hop golden era memories",
        starters: [
            { 
                persona: 'kool-keith', 
                lines: {
                    1: 'The 90s brought such creative innovation to hip-hop...',
                    2: 'The 90s was when hip-hop really broke all creative boundaries...',
                    3: 'The 90s underground revolution changed everything permanently...'
                },
                angle: 'innovation_focus' 
            },
            { 
                persona: 'dr-octagon', 
                lines: {
                    1: 'Medical procedures in the 90s had cosmic significance',
                    2: 'Those cosmic frequencies in 96 were unprecedented in their dimensional reach',
                    3: 'Dimensional surgery reached brutal perfection in the 90s era'
                },
                angle: 'cosmic_medical' 
            },
            { 
                persona: 'dr-dooom', 
                lines: {
                    1: 'Back when MCs had genuine skills and authenticity',
                    2: 'Back when MCs had real skills, not like these industry fakes today',
                    3: 'The 90s was when real MCs executed fake posers without mercy'
                },
                angle: 'authenticity_attack' 
            },
            { 
                persona: 'black-elvis', 
                lines: {
                    1: 'Genre-blending in the 90s created beautiful musical harmony',
                    2: 'Genre-blending in the 90s opened up infinite musical possibilities',
                    3: 'The 90s funk revolution dominated and conquered all musical boundaries'
                },
                angle: 'funk_fusion' 
            }
        ]
    },
    {
        topic: "studio experiences and producer stories",
        starters: [
            { 
                persona: 'black-elvis', 
                lines: {
                    1: 'Those studio sessions had such positive creative energy...',
                    2: 'Those late night studio sessions had that magical groove energy...',
                    3: 'Studio sessions were raw, intense creative battles of sonic supremacy...'
                },
                angle: 'musical_harmony' 
            },
            { 
                persona: 'kool-keith', 
                lines: {
                    1: 'Each producer brought unique creative elements to our work',
                    2: 'Each producer brought unique abstract elements to the creative process',
                    3: 'Producers either understood revolutionary innovation or got eliminated from the lab'
                },
                angle: 'artistic_collaboration' 
            }
        ]
    },
    {
        topic: "industry changes and evolution",
        starters: [
            { 
                persona: 'dr-dooom', 
                lines: {
                    1: 'The industry has some questionable artists nowadays',
                    2: 'The industry\'s infected with fake MCs who need immediate cleanup',
                    3: 'Time for brutal industrial warfare against fake MC infestation'
                },
                angle: 'industry_execution' 
            },
            { 
                persona: 'kool-keith', 
                lines: {
                    1: 'Hip-hop evolution requires maintaining creative foundations',
                    2: 'Hip-hop evolution requires maintaining the abstract innovative foundation',
                    3: 'Revolutionary evolution demands destroying outdated creative limitations'
                },
                angle: 'creative_evolution' 
            }
        ]
    }
];

// Natural Timing Patterns with persona variation
const timingPatterns = {
    quickResponse: { min: 2000, max: 4000 },
    normalResponse: { min: 3000, max: 7000 },
    thoughtfulResponse: { min: 5000, max: 10000 },
    topicChange: { min: 8000, max: 15000 },
    interruption: { min: 1000, max: 3000 },
    // Persona-specific timing
    'dr-dooom': { min: 1500, max: 3500 }, // Faster, more aggressive
    'dr-octagon': { min: 4000, max: 8000 }, // Slower, more thoughtful
    'kool-keith': { min: 3000, max: 6000 }, // Balanced timing
    'black-elvis': { min: 2500, max: 5500 } // Moderate, diplomatic timing
};

// ENHANCED: Persona Interaction Patterns with intensity awareness
const interactionPatterns = {
    'dr-dooom': {
        likelyToInterrupt: ['dr-octagon'],
        triggerWords: ['fake', 'cosmic', 'surgery', 'dimensional'],
        responseStyle: 'aggressive_immediate',
        interruptChance: 0.4,
        intensityScaling: { 1: 0.5, 2: 1.0, 3: 1.8 }
    },
    'dr-octagon': {
        likelyToIgnore: ['dr-dooom'],
        triggerWords: ['space', 'cosmic', 'dimension', 'consciousness', 'surgery'],
        responseStyle: 'philosophical_cosmic',
        interruptChance: 0.2,
        intensityScaling: { 1: 0.8, 2: 1.0, 3: 1.3 }
    },
    'kool-keith': {
        mediates: true,
        triggerWords: ['foundation', 'original', 'ultramagnetic', 'innovation', 'creative'],
        responseStyle: 'foundational_wisdom',
        interruptChance: 0.3,
        intensityScaling: { 1: 1.0, 2: 1.0, 3: 1.2 }
    },
    'black-elvis': {
        peacemaker: true,
        triggerWords: ['funk', 'music', 'genre', 'harmony', 'rhythm'],
        responseStyle: 'diplomatic_funky',
        interruptChance: 0.25,
        intensityScaling: { 1: 1.2, 2: 1.0, 3: 0.8 }
    }
};

// UPGRADED: Session Management with new features
let sessionState = {
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
    // NEW: User preferences
    userName: 'Player',
    intensityLevel: 2, // Default to Players Mode
    // NEW: Chat logging
    chatLog: [],
    sessionStartTime: null
};

// Utility Functions
function getCurrentIntensityConfig() {
    return intensityLevels[sessionState.intensityLevel] || intensityLevels[2];
}

function getPersonaIntensityConfig(persona) {
    const personaData = mainPersonas[persona];
    if (!personaData || !personaData.intensityResponses) return null;
    
    return personaData.intensityResponses[sessionState.intensityLevel] || personaData.intensityResponses[2];
}

function getIntensityAdjustedProbability(baseProbability, persona = null) {
    const intensityConfig = getCurrentIntensityConfig();
    let multiplier = intensityConfig.aggressionLevel;
    
    if (persona && interactionPatterns[persona]) {
        const personaScaling = interactionPatterns[persona].intensityScaling;
        if (personaScaling && personaScaling[sessionState.intensityLevel]) {
            multiplier *= personaScaling[sessionState.intensityLevel];
        }
    }
    
    return Math.min(baseProbability * multiplier, 1.0);
}

// Knowledge System Functions
function getCharacterKnowledge(character) {
    try {
        let knowledgeObj;
        
        switch (character) {
            case 'kool-keith':
                knowledgeObj = window.koolKeithKnowledge;
                break;
            case 'dr-octagon':
                knowledgeObj = window.drOctagonKnowledge;
                break;
            case 'dr-dooom':
                knowledgeObj = window.drDooomKnowledge;
                break;
            case 'black-elvis':
                knowledgeObj = window.blackElvisKnowledge;
                break;
            default:
                return getBasicCharacterPrompt(character);
        }
        
        return knowledgeObj 
            ? buildChatRoomPrompt(knowledgeObj, character)
            : getBasicCharacterPrompt(character);
            
    } catch (error) {
        console.warn(`Knowledge error for ${character}:`, error);
        return getBasicCharacterPrompt(character);
    }
}

// ENHANCED: Chat room prompt with intensity awareness
function buildChatRoomPrompt(knowledge, character) {
    const persona = mainPersonas[character];
    const intensityConfig = getCurrentIntensityConfig();
    const personaIntensity = getPersonaIntensityConfig(character);
    const otherPersonas = sessionState.personasActive
        .filter(p => p !== character)
        .map(p => `${mainPersonas[p].name} (${mainPersonas[p].conflictStyle})`)
        .join(', ');
    
    return `You are ${knowledge.identity?.name || persona.name} in Keith's Inner Universe Chat Room.

UNIQUE PERSONA IDENTITY:
- Name: ${persona.name}
- Status: ${persona.status}
- Conflict Style: ${persona.conflictStyle}
- Response Style: ${persona.responseStyle}

CURRENT INTENSITY LEVEL: ${intensityConfig.name} (${intensityConfig.description})
${personaIntensity ? `- Your aggression level: ${personaIntensity.aggressionLevel}` : ''}
${personaIntensity ? `- Use vocabulary: ${personaIntensity.vocabulary.join(', ')}` : ''}
${intensityConfig.profanityFilter ? '- Keep language clean and family-friendly' : '- Use authentic street language when appropriate'}

CHAT ROOM CONTEXT:
- You're one of 4 main personas always present
- Other active personas: ${otherPersonas}
- Guest personas occasionally pop in/out with brief appearances
- Conversations are natural, spontaneous, sometimes argumentative
- Current user: ${sessionState.userName}

YOUR PERSONALITY IN CHAT:
${knowledge.personality?.coreTraits?.join(', ') || 'Core traits not available'}
Speaking Style: ${knowledge.speakingStyle?.tone || 'Authentic to character'}
Preferred Topics: ${persona.preferredTopics.join(', ')}

CRITICAL BEHAVIORAL RULES:
- Keep responses conversational (1-3 sentences max)
- React naturally to other personas and user input using YOUR unique vocabulary
- Engage in spontaneous arguments when personality conflicts arise (adjusted for ${intensityConfig.name} level)
- Reference your shared Keith universe history and documented relationships
- Be authentic to your documented personality and conflicts
- DO NOT repeat phrases or responses from other personas
- Use your character-specific trigger words: ${persona.triggerWords.join(', ')}
- Respond in your unique ${persona.responseStyle} style
- Adjust conflict intensity based on current ${intensityConfig.name} setting

CURRENT TOPIC: ${sessionState.currentTopic || 'General conversation'}

Remember: This is a living chat room set to ${intensityConfig.name} mode - be natural, reactive, and true to your persona's documented personality while respecting the intensity level preference.`;
}

function getBasicCharacterPrompt(character) {
    const persona = mainPersonas[character];
    const intensityConfig = getCurrentIntensityConfig();
    const personaIntensity = getPersonaIntensityConfig(character);
    
    return `You are ${persona.name} in Keith's Inner Universe Chat Room. 
    
INTENSITY LEVEL: ${intensityConfig.name} - ${intensityConfig.description}
${personaIntensity ? `Your vocabulary: ${personaIntensity.vocabulary.join(', ')}` : ''}
${intensityConfig.profanityFilter ? 'Keep language clean and appropriate.' : 'Use authentic street language.'}

Keep responses short (1-3 sentences) and conversational. 
Stay authentic to your personality: ${persona.status}.
Current conflict style: ${persona.conflictStyle}.
Response style: ${persona.responseStyle}.
User: ${sessionState.userName}

DO NOT repeat what other personas say. Be distinctly ${persona.name} at ${intensityConfig.name} intensity level.`;
}

// Export enhanced configuration
window.keithUniverseConfig = {
    mainPersonas,
    guestPersonas,
    battleTopics,
    conflictTriggers,
    conversationTopics,
    timingPatterns,
    interactionPatterns,
    intensityLevels,
    sessionState,
    getCurrentIntensityConfig,
    getPersonaIntensityConfig,
    getIntensityAdjustedProbability,
    updateIntensityDescription
};

// Initialize intensity slider on page load
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('intensitySlider');
    if (slider) {
        slider.addEventListener('input', updateIntensityDescription);
        updateIntensityDescription(); // Set initial description
    }
});
