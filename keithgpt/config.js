/* ========================================
   KEITH STUDIO - INNER UNIVERSE CONFIG
   ======================================== */

// Entry Window Function
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

// Chat Room Topics (Auto-Generated Conversations)
const chatTopics = [
    "the evolution of Keith's personas over 40+ years",
    "working with legendary producers like Dan the Automator",
    "the influence of Ultramagnetic MCs on hip-hop",
    "differences between cosmic and street personas",
    "Keith's approach to character development",
    "memorable studio sessions and collaborations",
    "the authenticity of underground vs mainstream",
    "how different personas approach creativity"
];

// Session Management
let sessionState = {
    startTime: null,
    tokensUsed: 0,
    personasActive: ['kool-keith', 'dr-octagon', 'dr-dooom', 'black-elvis'],
    currentTopic: null,
    battleInProgress: false,
    userLurking: true,
    lastActivity: null
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
