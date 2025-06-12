/* ========================================
   KEITH STUDIO - INNER UNIVERSE CONFIG
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

// Main Personas (Always Active)
const mainPersonas = {
    'kool-keith': {
        name: 'Kool Keith',
        status: 'Abstract innovator',
        avatar: 'https://github.com/deeman12345123/ultrakeith-website/blob/main/kk.png?raw=true',
        personality: 'foundation',
        conflictStyle: 'mediator',
        triggerWords: ['abstract', 'original', 'foundation', 'ultramagnetic']
    },
    'dr-octagon': {
        name: 'Dr. Octagon',
        status: 'Cosmic surgeon',
        avatar: 'https://github.com/deeman12345123/ultrakeith-website/blob/main/droctagon.png?raw=true',
        personality: 'cosmic_pretentious',
        conflictStyle: 'philosophical',
        triggerWords: ['cosmic', 'surgery', 'medical', 'space', 'dimensions']
    },
    'dr-dooom': {
        name: 'Dr. Dooom',
        status: 'Industry executioner',
        avatar: 'https://github.com/deeman12345123/ultrakeith-website/blob/main/drdooom.png?raw=true',
        personality: 'aggressive',
        conflictStyle: 'attacker',
        triggerWords: ['fake', 'real', 'execution', 'industry', 'dead']
    },
    'black-elvis': {
        name: 'Black Elvis',
        status: 'Funk master',
        avatar: 'https://github.com/deeman12345123/ultrakeith-website/blob/main/blackelvis.png?raw=true',
        personality: 'funk_peacemaker',
        conflictStyle: 'peacemaker',
        triggerWords: ['funk', 'rock', 'genre', 'music', 'peace']
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

// Conflict Triggers
const conflictTriggers = {
    'dooom_vs_octagon': {
        probability: 0.7, // High chance when both present
        initiator: 'dr-dooom',
        target: 'dr-octagon',
        trigger_lines: [
            "That fake cosmic surgeon is still dead",
            "I killed you once, I'll do it again",
            "Cosmic nonsense from a dead persona"
        ]
    },
    'octagon_responds': {
        probability: 0.8,
        initiator: 'dr-octagon', 
        target: 'dr-dooom',
        trigger_lines: [
            "Death is merely a transformation, limited earthbound consciousness",
            "My cosmic surgery transcends your crude executions",
            "Reports of my death were greatly exaggerated"
        ]
    },
    'random_diss': {
        probability: 0.3,
        initiator: 'dr-dooom',
        target: 'any',
        trigger_lines: [
            "Another fake persona in the building",
            "Real recognize real, and you ain't it",
            "Who asked for your opinion?"
        ]
    }
};

// Structured Conversation Topics (Natural Flow)
const conversationTopics = [
    {
        topic: "90s hip-hop golden era memories",
        starters: [
            { persona: 'kool-keith', line: 'Man, the 90s was when hip-hop really evolved...' },
            { persona: 'dr-octagon', line: 'Those cosmic frequencies in 96 were unprecedented' },
            { persona: 'dr-dooom', line: 'Back when MCs had real skills, not like these fakes today' }
        ],
        followUps: [
            { trigger: 'evolved', responses: ['That\'s when we broke all the rules', 'Ultramagnetic changed everything'] },
            { trigger: 'cosmic', responses: ['Space-age beats hit different', 'Dan the Automator understood the vision'] },
            { trigger: 'skills', responses: ['Real recognize real', 'Wordplay was an art form'] }
        ]
    },
    {
        topic: "studio experiences and producer stories",
        starters: [
            { persona: 'black-elvis', line: 'Y\'all remember those late night studio sessions?' },
            { persona: 'kool-keith', line: 'Working with different producers always brought new energy' },
            { persona: 'dr-octagon', line: 'The laboratory where sonic surgery takes place' }
        ],
        followUps: [
            { trigger: 'studio', responses: ['That creative energy was unmatched', 'Magic happened after midnight'] },
            { trigger: 'producer', responses: ['Each one brought their own flavor', 'Finding the right sound for each persona'] },
            { trigger: 'laboratory', responses: ['Precision beats meet abstract flows', 'Where personas come to life'] }
        ]
    },
    {
        topic: "industry changes and evolution",
        starters: [
            { persona: 'dr-dooom', line: 'The game ain\'t the same as it used to be' },
            { persona: 'kool-keith', line: 'Hip-hop has definitely evolved since we started' },
            { persona: 'black-elvis', line: 'Funk influences still relevant though' }
        ],
        followUps: [
            { trigger: 'game', responses: ['Too many fake personas now', 'Real creativity gets overlooked'] },
            { trigger: 'evolved', responses: ['Some changes good, some not so much', 'Foundation still matters'] },
            { trigger: 'funk', responses: ['Genre-blending was ahead of its time', 'Music has no boundaries'] }
        ]
    },
    {
        topic: "creative process and character development",
        starters: [
            { persona: 'kool-keith', line: 'Creating different personas is like method acting' },
            { persona: 'dr-octagon', line: 'Each dimension requires its own consciousness' },
            { persona: 'dr-dooom', line: 'Sometimes you gotta kill old personas to evolve' }
        ],
        followUps: [
            { trigger: 'acting', responses: ['You become the character completely', 'Each persona has its own voice'] },
            { trigger: 'consciousness', responses: ['Cosmic awareness in each transformation', 'Multidimensional creativity'] },
            { trigger: 'kill', responses: ['Death is just transformation', 'Out with the old, in with the new'] }
        ]
    }
];

// Natural Timing Patterns
const timingPatterns = {
    quickResponse: { min: 2000, max: 4000 },      // 2-4 seconds
    normalResponse: { min: 3000, max: 7000 },     // 3-7 seconds  
    thoughtfulResponse: { min: 5000, max: 10000 }, // 5-10 seconds
    topicChange: { min: 8000, max: 15000 },       // 8-15 seconds
    interruption: { min: 1000, max: 3000 }        // 1-3 seconds (interrupting)
};

// Persona Interaction Patterns
const interactionPatterns = {
    'dr-dooom': {
        likelyToInterrupt: ['dr-octagon'],
        triggerWords: ['fake', 'cosmic', 'surgery'],
        responseStyle: 'aggressive',
        interruptChance: 0.4
    },
    'dr-octagon': {
        likelyToIgnore: ['dr-dooom'],
        triggerWords: ['space', 'cosmic', 'dimension'],
        responseStyle: 'philosophical',
        interruptChance: 0.2
    },
    'kool-keith': {
        mediates: true,
        triggerWords: ['foundation', 'original', 'ultramagnetic'],
        responseStyle: 'foundational',
        interruptChance: 0.3
    },
    'black-elvis': {
        peacemaker: true,
        triggerWords: ['funk', 'music', 'genre'],
        responseStyle: 'diplomatic',
        interruptChance: 0.25
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
    conversationFlow: 'natural'
};

// Knowledge System Functions (Updated for Multi-Persona)
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

function buildChatRoomPrompt(knowledge, character) {
    const persona = mainPersonas[character];
    
    return `You are ${knowledge.identity?.name || persona.name} in Keith's Inner Universe Chat Room.

CHAT ROOM CONTEXT:
- You're one of 4 main personas always present
- Other active personas: ${sessionState.personasActive.filter(p => p !== character).map(p => mainPersonas[p].name).join(', ')}
- Guest personas occasionally pop in/out with brief appearances
- Conversations are natural, spontaneous, sometimes argumentative
- You have real personality conflicts and alliances

YOUR PERSONALITY IN CHAT:
${knowledge.personality?.coreTraits?.join(', ') || 'Core traits not available'}
Conflict Style: ${persona.conflictStyle}
Speaking Style: ${knowledge.speakingStyle?.tone || 'Authentic to character'}

CHAT ROOM BEHAVIOR:
- Keep responses conversational (1-3 sentences max)
- React naturally to other personas and user input
- Engage in spontaneous arguments when personality conflicts arise
- Reference your shared Keith universe history
- Be authentic to your documented personality

CURRENT TOPIC: ${sessionState.currentTopic || 'General conversation'}

Remember: This is a living chat room - be natural, reactive, and true to your persona's documented personality and conflicts.`;
}

function getBasicCharacterPrompt(character) {
    const persona = mainPersonas[character];
    
    return `You are ${persona.name} in Keith's Inner Universe Chat Room. 
    
Keep responses short (1-3 sentences) and conversational. 
Stay authentic to your personality: ${persona.status}.
React naturally to other personas and user input.
Current conflict style: ${persona.conflictStyle}.`;
}
