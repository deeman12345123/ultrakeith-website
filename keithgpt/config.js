/* ========================================
   KEITH STUDIO - INNER UNIVERSE CONFIG
   ENHANCED: Better persona differentiation to prevent duplicates
   ======================================== */

// Entry Window Function (MUST match HTML onclick)
function enterKeithStudio() {
    const overlay = document.getElementById('entryOverlay');
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

// ENHANCED: Main Personas with better differentiation
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
        uniqueVocabulary: ['abstract', 'foundation', 'innovation', 'creative energy', 'ultramagnetic', 'artistic vision']
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
        uniqueVocabulary: ['cosmic', 'dimensional', 'surgical precision', 'consciousness', 'extraterrestrial', 'interdimensional']
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
        uniqueVocabulary: ['execution', 'fake MCs', 'body bags', 'real recognize real', 'industry cleanup', 'street authenticity']
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
        uniqueVocabulary: ['funk therapy', 'genre-bending', 'musical harmony', 'groove consciousness', 'rhythm diplomacy', 'sonic peace']
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

// ENHANCED: Conflict Triggers with unique contexts
const conflictTriggers = {
    'dooom_vs_octagon': {
        probability: 0.7,
        initiator: 'dr-dooom',
        target: 'dr-octagon',
        trigger_lines: [
            "That fake cosmic surgeon is still dead",
            "I killed you once, I'll do it again",
            "Cosmic nonsense from a dead persona",
            "Body bags don't do surgery",
            "Dead doctors can't operate"
        ],
        context_type: 'octagon_execution'
    },
    'octagon_responds': {
        probability: 0.8,
        initiator: 'dr-octagon', 
        target: 'dr-dooom',
        trigger_lines: [
            "Death is merely a transformation, limited earthbound consciousness",
            "My cosmic surgery transcends your crude executions",
            "Reports of my death were greatly exaggerated",
            "Dimensional consciousness cannot be terminated",
            "Your terrestrial violence lacks cosmic understanding"
        ],
        context_type: 'cosmic_rebuttal'
    },
    'random_diss': {
        probability: 0.3,
        initiator: 'dr-dooom',
        target: 'any',
        trigger_lines: [
            "Another fake persona in the building",
            "Real recognize real, and you ain't it",
            "Who asked for your opinion?",
            "Time for some industrial cleanup",
            "Fake MCs need immediate execution"
        ],
        context_type: 'general_diss'
    },
    'keith_mediates': {
        probability: 0.4,
        initiator: 'kool-keith',
        target: 'any',
        trigger_lines: [
            "The abstract foundation connects all personas",
            "Creative energy shouldn't be wasted on conflicts",
            "Innovation comes through collaboration, not destruction",
            "Ultramagnetic unity over division"
        ],
        context_type: 'foundation_wisdom'
    },
    'elvis_peacemaking': {
        probability: 0.5,
        initiator: 'black-elvis',
        target: 'any',
        trigger_lines: [
            "Y'all need some funk therapy to balance this energy",
            "Musical harmony beats lyrical warfare",
            "Groove consciousness can resolve any conflict",
            "Let the rhythm diplomacy work its magic"
        ],
        context_type: 'funk_diplomacy'
    }
};

// ENHANCED: Structured Conversation Topics with persona-specific angles
const conversationTopics = [
    {
        topic: "90s hip-hop golden era memories",
        starters: [
            { persona: 'kool-keith', line: 'The 90s was when hip-hop really broke all creative boundaries...', angle: 'innovation_focus' },
            { persona: 'dr-octagon', line: 'Those cosmic frequencies in 96 were unprecedented in their dimensional reach', angle: 'cosmic_medical' },
            { persona: 'dr-dooom', line: 'Back when MCs had real skills, not like these industry fakes today', angle: 'authenticity_attack' },
            { persona: 'black-elvis', line: 'Genre-blending in the 90s opened up infinite musical possibilities', angle: 'funk_fusion' }
        ],
        followUps: [
            { trigger: 'creative', personas: ['kool-keith'], responses: ['Abstract innovation was the foundation of everything'] },
            { trigger: 'cosmic', personas: ['dr-octagon'], responses: ['Interdimensional surgery reached new heights'] },
            { trigger: 'real', personas: ['dr-dooom'], responses: ['Street authenticity meant something back then'] },
            { trigger: 'genre', personas: ['black-elvis'], responses: ['Funk therapy healed hip-hop divisions'] }
        ]
    },
    {
        topic: "studio experiences and producer stories",
        starters: [
            { persona: 'black-elvis', line: 'Those late night studio sessions had that magical groove energy...', angle: 'musical_harmony' },
            { persona: 'kool-keith', line: 'Each producer brought unique abstract elements to the creative process', angle: 'artistic_collaboration' },
            { persona: 'dr-octagon', line: 'The laboratory where sonic surgery and dimensional beats converge', angle: 'medical_production' },
            { persona: 'dr-dooom', line: 'Some producers understood real hip-hop, others just industry garbage', angle: 'producer_authenticity' }
        ],
        followUps: [
            { trigger: 'studio', personas: ['black-elvis', 'kool-keith'], responses: ['Creative energy flowed like rhythm therapy', 'Abstract foundations built in real time'] },
            { trigger: 'producer', personas: ['dr-dooom', 'dr-octagon'], responses: ['Real producers vs industry sellouts', 'Sonic architects of dimensional consciousness'] },
            { trigger: 'laboratory', personas: ['dr-octagon'], responses: ['Precision beats meet cosmic surgical techniques'] }
        ]
    },
    {
        topic: "industry changes and evolution",
        starters: [
            { persona: 'dr-dooom', line: 'The industry\'s infected with fake MCs who need immediate cleanup', angle: 'industry_execution' },
            { persona: 'kool-keith', line: 'Hip-hop evolution requires maintaining the abstract innovative foundation', angle: 'creative_evolution' },
            { persona: 'black-elvis', line: 'Musical genres keep blending, funk influences stay eternally relevant', angle: 'genre_progression' },
            { persona: 'dr-octagon', line: 'Cosmic consciousness in music transcends temporal industry fluctuations', angle: 'dimensional_perspective' }
        ],
        followUps: [
            { trigger: 'fake', personas: ['dr-dooom'], responses: ['Body bags ready for industrial cleanup'] },
            { trigger: 'evolution', personas: ['kool-keith'], responses: ['Innovation builds on ultramagnetic foundations'] },
            { trigger: 'funk', personas: ['black-elvis'], responses: ['Rhythm diplomacy bridges all musical gaps'] },
            { trigger: 'cosmic', personas: ['dr-octagon'], responses: ['Interdimensional surgery adapts to any era'] }
        ]
    },
    {
        topic: "creative process and character development",
        starters: [
            { persona: 'kool-keith', line: 'Creating personas is like abstract architectural construction of consciousness', angle: 'foundational_creativity' },
            { persona: 'dr-octagon', line: 'Each dimensional persona requires its own cosmic surgical precision', angle: 'medical_character_creation' },
            { persona: 'dr-dooom', line: 'Sometimes you gotta execute old personas to make room for real evolution', angle: 'violent_transformation' },
            { persona: 'black-elvis', line: 'Musical personas flow through genre-bending like funk therapy sessions', angle: 'harmonic_development' }
        ],
        followUps: [
            { trigger: 'abstract', personas: ['kool-keith'], responses: ['Ultramagnetic foundations support infinite creative possibilities'] },
            { trigger: 'dimensional', personas: ['dr-octagon'], responses: ['Consciousness surgery creates multidimensional artistic entities'] },
            { trigger: 'execute', personas: ['dr-dooom'], responses: ['Real personas eliminate fake industry constructs'] },
            { trigger: 'funk', personas: ['black-elvis'], responses: ['Groove consciousness unifies all musical personalities'] }
        ]
    }
];

// ENHANCED: Natural Timing Patterns with persona variation
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

// ENHANCED: Persona Interaction Patterns
const interactionPatterns = {
    'dr-dooom': {
        likelyToInterrupt: ['dr-octagon'],
        triggerWords: ['fake', 'cosmic', 'surgery', 'dimensional'],
        responseStyle: 'aggressive_immediate',
        interruptChance: 0.4,
        uniqueResponses: {
            to_octagon: ['Dead doctors don\'t operate', 'Cosmic surgery can\'t fix being executed'],
            to_keith: ['Abstract foundation needs industrial cleanup'],
            to_elvis: ['Funk therapy can\'t heal fake personas']
        }
    },
    'dr-octagon': {
        likelyToIgnore: ['dr-dooom'],
        triggerWords: ['space', 'cosmic', 'dimension', 'consciousness', 'surgery'],
        responseStyle: 'philosophical_cosmic',
        interruptChance: 0.2,
        uniqueResponses: {
            to_dooom: ['Dimensional consciousness transcends terrestrial violence', 'Cosmic surgery operates beyond crude executions'],
            to_keith: ['Abstract innovation meets interdimensional precision'],
            to_elvis: ['Musical frequencies align with cosmic surgical vibrations']
        }
    },
    'kool-keith': {
        mediates: true,
        triggerWords: ['foundation', 'original', 'ultramagnetic', 'innovation', 'creative'],
        responseStyle: 'foundational_wisdom',
        interruptChance: 0.3,
        uniqueResponses: {
            mediating: ['The ultramagnetic foundation connects all creative consciousness', 'Innovation requires collaboration between all personas'],
            to_conflict: ['Abstract energy shouldn\'t be wasted on destructive conflicts']
        }
    },
    'black-elvis': {
        peacemaker: true,
        triggerWords: ['funk', 'music', 'genre', 'harmony', 'rhythm'],
        responseStyle: 'diplomatic_funky',
        interruptChance: 0.25,
        uniqueResponses: {
            peacemaking: ['Funk therapy can heal any creative division', 'Musical harmony transcends persona conflicts'],
            to_conflict: ['Groove consciousness brings all frequencies into alignment']
        }
    }
};

// Session Management
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
    recentContexts: [] // Track recent contexts to prevent duplicates
};

// ENHANCED: Knowledge System Functions
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

// ENHANCED: Chat room prompt with better differentiation
function buildChatRoomPrompt(knowledge, character) {
    const persona = mainPersonas[character];
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
- Unique Vocabulary: ${persona.uniqueVocabulary.join(', ')}

CHAT ROOM CONTEXT:
- You're one of 4 main personas always present
- Other active personas: ${otherPersonas}
- Guest personas occasionally pop in/out with brief appearances
- Conversations are natural, spontaneous, sometimes argumentative
- You have real personality conflicts and alliances based on documented Keith lore

YOUR PERSONALITY IN CHAT:
${knowledge.personality?.coreTraits?.join(', ') || 'Core traits not available'}
Speaking Style: ${knowledge.speakingStyle?.tone || 'Authentic to character'}
Preferred Topics: ${persona.preferredTopics.join(', ')}

CRITICAL BEHAVIORAL RULES:
- Keep responses conversational (1-3 sentences max)
- React naturally to other personas and user input using YOUR unique vocabulary
- Engage in spontaneous arguments when personality conflicts arise
- Reference your shared Keith universe history and documented relationships
- Be authentic to your documented personality and conflicts
- DO NOT repeat phrases or responses from other personas
- Use your character-specific trigger words: ${persona.triggerWords.join(', ')}
- Respond in your unique ${persona.responseStyle} style

CURRENT TOPIC: ${sessionState.currentTopic || 'General conversation'}

Remember: This is a living chat room - be natural, reactive, and true to your persona's documented personality, conflicts, and unique vocabulary patterns. Your responses should be distinctly ${persona.name}.`;
}

function getBasicCharacterPrompt(character) {
    const persona = mainPersonas[character];
    
    return `You are ${persona.name} in Keith's Inner Universe Chat Room. 
    
Keep responses short (1-3 sentences) and conversational. 
Stay authentic to your personality: ${persona.status}.
Use your unique vocabulary: ${persona.uniqueVocabulary.join(', ')}.
Current conflict style: ${persona.conflictStyle}.
Response style: ${persona.responseStyle}.

DO NOT repeat what other personas say. Be distinctly ${persona.name}.`;
}

// ENHANCED: Persona-specific response generators
const personaResponseGenerators = {
    'dr-dooom': {
        generateUniqueResponse: (context, recentResponses) => {
            const dooomPhrases = [
                'fake MCs getting executed',
                'body bags ready for pickup',
                'real recognize real in this universe',
                'industrial cleanup in progress',
                'street authenticity verification',
                'wack persona elimination protocol'
            ];
            
            // Filter out recently used phrases
            const available = dooomPhrases.filter(phrase => 
                !recentResponses.some(response => response.includes(phrase))
            );
            
            return available[Math.floor(Math.random() * available.length)] || 'Another fake needs execution';
        }
    },
    
    'dr-octagon': {
        generateUniqueResponse: (context, recentResponses) => {
            const octagonPhrases = [
                'cosmic surgical procedures continue',
                'dimensional consciousness expanding',
                'interdimensional medical analysis',
                'extraterrestrial surgical precision',
                'cosmic frequency modulation',
                'multidimensional diagnostic protocols'
            ];
            
            const available = octagonPhrases.filter(phrase => 
                !recentResponses.some(response => response.includes(phrase))
            );
            
            return available[Math.floor(Math.random() * available.length)] || 'Cosmic consciousness persists';
        }
    },
    
    'kool-keith': {
        generateUniqueResponse: (context, recentResponses) => {
            const keithPhrases = [
                'abstract innovation continues flowing',
                'ultramagnetic foundation stays strong',
                'creative energy connects all dimensions',
                'artistic vision transcends conflicts',
                'foundational wisdom guides evolution',
                'innovative consciousness builds bridges'
            ];
            
            const available = keithPhrases.filter(phrase => 
                !recentResponses.some(response => response.includes(phrase))
            );
            
            return available[Math.floor(Math.random() * available.length)] || 'Abstract creativity flows eternal';
        }
    },
    
    'black-elvis': {
        generateUniqueResponse: (context, recentResponses) => {
            const elvisPhrases = [
                'funk therapy heals all divisions',
                'groove consciousness unifies frequencies',
                'musical harmony transcends conflicts',
                'rhythm diplomacy brings peace',
                'genre-bending creates understanding',
                'sonic peace negotiations ongoing'
            ];
            
            const available = elvisPhrases.filter(phrase => 
                !recentResponses.some(response => response.includes(phrase))
            );
            
            return available[Math.floor(Math.random() * available.length)] || 'Funk brings universal harmony';
        }
    }
};

// ENHANCED: Context tracking for uniqueness
function generateUniqueContext(persona, baseContext, existingContexts) {
    const personaData = mainPersonas[persona];
    const contextPrefixes = {
        'dr-dooom': ['aggressive', 'brutal', 'execution-focused', 'street-authentic', 'industry-cleaning'],
        'dr-octagon': ['cosmic', 'dimensional', 'surgical', 'consciousness-expanding', 'interdimensional'],
        'kool-keith': ['foundational', 'innovative', 'abstract', 'creative', 'ultramagnetic'],
        'black-elvis': ['diplomatic', 'harmonious', 'funk-therapeutic', 'genre-blending', 'rhythmic']
    };
    
    const prefixes = contextPrefixes[persona] || ['unique'];
    const availablePrefixes = prefixes.filter(prefix => 
        !existingContexts.some(context => context.includes(prefix))
    );
    
    const selectedPrefix = availablePrefixes[Math.floor(Math.random() * availablePrefixes.length)] || 'distinctive';
    
    return `${selectedPrefix} ${personaData.name} ${baseContext} using ${personaData.responseStyle} approach`;
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
    personaResponseGenerators,
    generateUniqueContext,
    sessionState
};
