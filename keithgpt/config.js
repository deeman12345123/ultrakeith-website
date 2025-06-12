/* ========================================
   KEITHGPT v9 - CONFIGURATION & DATA
   ======================================== */

// Entry Window Function
function enterKeithGPT() {
    const overlay = document.getElementById('entryOverlay');
    if (overlay) {
        overlay.classList.add('fade-out');
        setTimeout(() => {
            overlay.style.display = 'none';
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
    apiTimeout: 30000
};

// Character Data
const characterData = {
    'kool-keith': {
        name: 'Kool Keith',
        status: 'Abstract innovator',
        avatar: 'https://github.com/deeman12345123/ultrakeith-website/blob/main/kk.png?raw=true'
    },
    'dr-octagon': {
        name: 'Dr. Octagon',
        status: 'Cosmic surgeon', 
        avatar: 'https://github.com/deeman12345123/ultrakeith-website/blob/main/droctagon.png?raw=true'
    },
    'dr-dooom': {
        name: 'Dr. Dooom',
        status: 'Industry executioner',
        avatar: 'https://github.com/deeman12345123/ultrakeith-website/blob/main/drdooom.png?raw=true'
    },
    'black-elvis': {
        name: 'Black Elvis',
        status: 'Funk master',
        avatar: 'https://github.com/deeman12345123/ultrakeith-website/blob/main/blackelvis.png?raw=true'
    }
};

// Battle Topics
const battleTopics = [
    "lyrical supremacy and wordplay mastery",
    "hip-hop innovation and creativity", 
    "underground vs mainstream authenticity",
    "New York hip-hop legacy and influence",
    "artistic vision and character development",
    "mic skills and flow techniques"
];

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
            ? buildCharacterPrompt(knowledgeObj, character)
            : getBasicCharacterPrompt(character);
            
    } catch (error) {
        console.warn(`Knowledge error for ${character}:`, error);
        return getBasicCharacterPrompt(character);
    }
}

function getBasicCharacterPrompt(character) {
    const prompts = {
        'kool-keith': 'You are Kool Keith, abstract innovator of hip-hop. Known for surreal lyrics, complex wordplay, and avant-garde creativity. Speak with abstract confidence and innovative flow.',
        'dr-octagon': 'You are Dr. Octagon, cosmic surgeon and extraterrestrial hip-hop entity. Known for medical metaphors, space themes, and bizarre surgical scenarios. Speak with cosmic medical authority.',
        'dr-dooom': 'You are Dr. Dooom, the industry executioner. Known for harsh criticism of fake rappers and raw, aggressive delivery. Speak with uncompromising directness and industry knowledge.',
        'black-elvis': 'You are Black Elvis, funk master mixing hip-hop with rock and funk. Known for genre-blending creativity and rebellious attitude. Speak with funky confidence and musical innovation.'
    };
    
    return prompts[character] || `You are ${character}. Respond authentically as this hip-hop persona.`;
}

function buildCharacterPrompt(knowledge, character) {
    try {
        let prompt = `You are ${knowledge.identity?.name || character}.\n\n`;
        
        // Identity & Background
        prompt += `IDENTITY & BACKGROUND:\n`;
        prompt += `${knowledge.identity?.significance || 'Character significance not available'}\n`;
        prompt += `Origin: ${knowledge.identity?.origin || 'Unknown origin'}\n`;
        prompt += `Status: ${knowledge.identity?.status || 'Unknown status'}\n\n`;
        
        // Personality
        prompt += `PERSONALITY:\n`;
        prompt += `Core traits: ${knowledge.personality?.coreTraits?.join(', ') || 'Traits not available'}\n`;
        prompt += `Psychology: ${knowledge.personality?.psychologicalProfile || 'Profile not available'}\n`;
        prompt += `Motivations: ${knowledge.personality?.motivations?.join(', ') || 'Motivations not available'}\n\n`;
        
        // Speaking Style
        prompt += `SPEAKING STYLE:\n`;
        prompt += `Tone: ${knowledge.speakingStyle?.tone || 'Tone not specified'}\n`;
        prompt += `Delivery: ${knowledge.speakingStyle?.delivery || 'Delivery not specified'}\n\n`;
        
        // Key Themes
        prompt += `KEY THEMES: ${knowledge.themes?.join(', ') || 'Themes not available'}\n\n`;
        
        // Vocabulary
        prompt += `VOCABULARY TO USE:`;
        if (knowledge.vocabulary) {
            if (knowledge.vocabulary.medical) {
                prompt += `\n- Medical: ${knowledge.vocabulary.medical.slice(0, 10).join(', ')}`;
            }
            if (knowledge.vocabulary.violence) {
                prompt += `\n- Violence: ${knowledge.vocabulary.violence.slice(0, 10).join(', ')}`;
            }
            if (knowledge.vocabulary.technical) {
                prompt += `\n- Technical: ${knowledge.vocabulary.technical.slice(0, 10).join(', ')}`;
            }
            if (knowledge.vocabulary.street) {
                prompt += `\n- Street: ${knowledge.vocabulary.street.slice(0, 10).join(', ')}`;
            }
            if (knowledge.vocabulary.abstract) {
                prompt += `\n- Abstract: ${knowledge.vocabulary.abstract.slice(0, 10).join(', ')}`;
            }
            if (knowledge.vocabulary.space) {
                prompt += `\n- Space: ${knowledge.vocabulary.space.slice(0, 10).join(', ')}`;
            }
            if (knowledge.vocabulary.elvis) {
                prompt += `\n- Elvis: ${knowledge.vocabulary.elvis.slice(0, 10).join(', ')}`;
            }
        }
        
        // Response Examples
        if (knowledge.responses) {
            prompt += `\n\nAUTHENTIC RESPONSE EXAMPLES:`;
            Object.keys(knowledge.responses).forEach(category => {
                if (knowledge.responses[category].medium) {
                    prompt += `\n${category.toUpperCase()}: "${knowledge.responses[category].medium[0]}"`;
                }
            });
        }
        
        // Likes & Dislikes
        if (knowledge.likes) {
            prompt += `\n\nLIKES: ${knowledge.likes.slice(0, 8).join(', ')}`;
        }
        if (knowledge.dislikes) {
            prompt += `\n\nDISLIKES: ${knowledge.dislikes.slice(0, 8).join(', ')}`;
        }
        
        prompt += `\n\nRemember: Stay completely authentic to this character's documented personality, vocabulary, and style.`;
        
        return prompt;
        
    } catch (error) {
        console.error(`Error building prompt for ${character}:`, error);
        return getBasicCharacterPrompt(character);
    }
}

// Global State Variables
let currentCharacter = 'kool-keith';
let conversationHistory = [];
let currentMode = 'chat';
let isProcessing = false;
let battleState = {
    active: false,
    fighter1: 'kool-keith',
    fighter2: 'dr-octagon', 
    currentRound: 1,
    maxRounds: 3,
    topic: '',
    nextUp: 'fighter1'
};
