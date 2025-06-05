// Ultra Keith Battle System - Revolutionary AI Rap Battles
// This file loads separately when Battle Mode is activated

(function() {
    'use strict';

    // Battle System State
    let battleMode = false;
    let currentBattle = null;
    let battleRound = 0;
    let battleHistory = [];

    // Battle Configurations
    const battleMatchups = {
        'kool-keith-vs-dr-octagon': {
            fighters: ['kool-keith', 'dr-octagon'],
            theme: 'Creator vs Creation',
            description: 'The original master faces his most famous creation!',
            strategies: {
                'kool-keith': "You created Dr. Octagon. Remind him who's the original innovator. Use your Bronx street credibility and foundational hip-hop knowledge. Call out his alien obsessions as derivative of your creativity.",
                'dr-octagon': "You've evolved beyond your creator. Use your medical knowledge and space themes to show you're more advanced. Point out Keith's repetitive patterns and claim you're the perfected version."
            }
        },
        'kool-keith-vs-dr-dooom': {
            fighters: ['kool-keith', 'dr-dooom'],
            theme: 'Original vs Evolution', 
            description: 'Keith battles his darker, more aggressive alter ego!',
            strategies: {
                'kool-keith': "Dr. Dooom is just your angry side. Use your versatility and show that you don't need darkness to be powerful. Point out that Dooom is one-dimensional compared to your range.",
                'dr-dooom': "You represent Keith's raw, unfiltered power. Attack his other personas as weak attempts at relevance. Show that you're the most authentic and aggressive version."
            }
        },
        'kool-keith-vs-black-elvis': {
            fighters: ['kool-keith', 'black-elvis'],
            theme: 'Hip-Hop vs Rock & Roll',
            description: 'The hip-hop innovator clashes with the King!',
            strategies: {
                'kool-keith': "You're the real innovator of music. Elvis was just copying Black artists. Show how hip-hop surpassed rock and roll. Point out the cultural appropriation.",
                'black-elvis': "You're the King of entertainment. Your influence crosses all genres and generations. Keith is just one rapper among many, but you're legendary across all music."
            }
        },
        'dr-octagon-vs-dr-dooom': {
            fighters: ['dr-octagon', 'dr-dooom'],
            theme: 'Medical Rivalry',
            description: 'Two doctors battle for supreme medical authority!',
            strategies: {
                'dr-octagon': "You're the futuristic medical genius with alien technology. Dr. Dooom is just a crude surgeon with anger issues. Your methods are advanced while his are primitive.",
                'dr-dooom': "Octagon is all talk and no action. You get results through decisive medical procedures. His alien nonsense is just fantasy while you deal in harsh medical reality."
            }
        },
        'dr-octagon-vs-black-elvis': {
            fighters: ['dr-octagon', 'black-elvis'],
            theme: 'Alien vs Entertainer',
            description: 'The space doctor meets the ultimate showman!',
            strategies: {
                'dr-octagon': "You're from an advanced alien civilization. Elvis is just an earthly entertainer stuck in the past. Your knowledge spans galaxies while his is limited to one planet.",
                'black-elvis': "You're the ultimate performer who conquered Earth. Octagon is just a weird alien fantasy with no real stage presence. Entertainment value beats medical mumbo-jumbo."
            }
        },
        'dr-dooom-vs-black-elvis': {
            fighters: ['dr-dooom', 'black-elvis'],
            theme: 'Dark Doctor vs King',
            description: 'The aggressive surgeon faces the smooth King!',
            strategies: {
                'dr-dooom': "You're the no-nonsense doctor who tells it like it is. Elvis is all flash and no substance. Your medical expertise is real while his performance is just an act.",
                'black-elvis': "You're royalty with class and style. Dr. Dooom is just an angry doctor with no charisma. Grace and entertainment value always win over crude aggression."
            }
        }
    };

    // Battle UI Components
    function createBattleInterface() {
        const battleContainer = document.createElement('div');
        battleContainer.id = 'battleInterface';
        battleContainer.innerHTML = `
            <div class="battle-setup" id="battleSetup">
                <h3>🥊 CHOOSE YOUR BATTLE</h3>
                <div class="battle-fighters">
                    <div class="fighter-selection">
                        <label>Persona 1:</label>
                        <select id="battleFighter1" class="fighter-select">
                            <option value="kool-keith">Kool Keith</option>
                            <option value="dr-octagon">Dr. Octagon</option>
                            <option value="dr-dooom">Dr. Dooom</option>
                            <option value="black-elvis">Black Elvis</option>
                        </select>
                    </div>
                    <div class="vs-divider">VS</div>
                    <div class="fighter-selection">
                        <label>Persona 2:</label>
                        <select id="battleFighter2" class="fighter-select">
                            <option value="dr-octagon">Dr. Octagon</option>
                            <option value="kool-keith">Kool Keith</option>
                            <option value="dr-dooom">Dr. Dooom</option>
                            <option value="black-elvis">Black Elvis</option>
                        </select>
                    </div>
                </div>
                <button id="startBattleBtn" class="battle-start-btn">START BATTLE 🔥</button>
            </div>
            
            <div class="battle-arena" id="battleArena" style="display: none;">
                <div class="battle-header">
                    <div class="round-indicator">ROUND <span id="roundNumber">1</span> of 3</div>
                    <div class="battle-title" id="battleTitle"></div>
                </div>
                
                <div class="fighter-display">
                    <div class="fighter fighter-1" id="fighter1">
                        <div class="fighter-avatar"></div>
                        <div class="fighter-name"></div>
                    </div>
                    <div class="vs-indicator">VS</div>
                    <div class="fighter fighter-2" id="fighter2">
                        <div class="fighter-avatar"></div>
                        <div class="fighter-name"></div>
                    </div>
                </div>
                
                <button id="backToSetup" class="back-btn">← Back to Battle Selection</button>
            </div>
        `;
        
        return battleContainer;
    }

    // Add Battle CSS
    function addBattleStyles() {
        if (document.getElementById('battleStyles')) return;
        
        const battleCSS = `
            <style id="battleStyles">
            .battle-setup {
                text-align: center;
                padding: 20px;
            }
            
            .battle-setup h3 {
                color: #ffd700;
                font-family: 'Orbitron', monospace;
                font-size: 1.8rem;
                margin-bottom: 30px;
                text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
                text-align: center;
            }
            
            .battle-fighters {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 30px;
                margin-bottom: 25px;
                flex-wrap: wrap;
            }
            
            .fighter-selection {
                display: flex;
                flex-direction: column;
                gap: 8px;
                align-items: center;
            }
            
            .fighter-selection label {
                color: rgba(255, 255, 255, 0.8);
                font-weight: 600;
                font-size: 0.9rem;
                font-family: 'Orbitron', monospace;
            }
            
            .fighter-select {
                background: rgba(0, 0, 0, 0.7);
                border: 1px solid rgba(255, 215, 0, 0.3);
                border-radius: 10px;
                padding: 12px 18px;
                color: #fff;
                font-size: 1rem;
                outline: none;
                cursor: pointer;
                min-width: 160px;
                font-family: 'Orbitron', monospace;
                font-weight: 600;
            }
            
            .fighter-select:focus {
                border-color: #ffd700;
                box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
            }
            
            .fighter-select option {
                background: #000;
                color: #fff;
                padding: 8px;
            }
            
            .vs-divider {
                font-family: 'Orbitron', monospace;
                font-size: 2rem;
                font-weight: 900;
                color: #ffd700;
                text-shadow: 0 0 15px rgba(255, 215, 0, 0.7);
                margin: 0 20px;
            }
            
            .battle-start-btn {
                background: linear-gradient(45deg, #ffd700, #ffed4e);
                color: #000;
                border: none;
                padding: 15px 40px;
                border-radius: 15px;
                font-family: 'Orbitron', monospace;
                font-weight: 700;
                font-size: 1.1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                text-transform: uppercase;
            }
            
            .battle-start-btn:disabled {
                background: rgba(255, 255, 255, 0.1);
                color: rgba(255, 255, 255, 0.3);
                cursor: not-allowed;
            }
            
            .battle-start-btn:not(:disabled):hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(255, 215, 0, 0.3);
            }
            
            .battle-arena {
                padding: 20px;
            }
            
            .battle-header {
                text-align: center;
                margin-bottom: 30px;
            }
            
            .round-indicator {
                color: #ffd700;
                font-family: 'Orbitron', monospace;
                font-size: 1.5rem;
                font-weight: 700;
                margin-bottom: 10px;
            }
            
            .battle-title {
                color: rgba(255, 255, 255, 0.8);
                font-size: 1.1rem;
            }
            
            .fighter-display {
                display: flex;
                justify-content: space-around;
                align-items: center;
                margin-bottom: 30px;
            }
            
            .fighter {
                text-align: center;
                padding: 20px;
                border-radius: 15px;
                min-width: 150px;
            }
            
            .fighter-1 {
                border: 3px solid #ff4444;
                background: linear-gradient(145deg, rgba(255, 68, 68, 0.1), rgba(0, 0, 0, 0.8));
            }
            
            .fighter-2 {
                border: 3px solid #4444ff;
                background: linear-gradient(145deg, rgba(68, 68, 255, 0.1), rgba(0, 0, 0, 0.8));
            }
            
            .fighter-avatar {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                margin: 0 auto 15px;
                background-size: cover;
                background-position: center;
                border: 3px solid rgba(255, 215, 0, 0.6);
            }
            
            .fighter-name {
                color: #ffd700;
                font-family: 'Orbitron', monospace;
                font-weight: 600;
                font-size: 1.1rem;
            }
            
            .vs-indicator {
                color: #ffd700;
                font-family: 'Orbitron', monospace;
                font-size: 2rem;
                font-weight: 900;
                text-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
            }
            
            .back-btn {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: #fff;
                padding: 10px 20px;
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .back-btn:hover {
                background: rgba(255, 255, 255, 0.2);
                border-color: #ffd700;
            }
            
            .message.battle-round {
                text-align: center;
                margin: 30px 0;
            }
            
            .message.battle-round .message-content {
                background: linear-gradient(45deg, #ffd700, #ffed4e);
                color: #000;
                font-family: 'Orbitron', monospace;
                font-weight: 700;
                font-size: 1.2rem;
                padding: 20px;
                max-width: 100%;
            }
            
            @media (max-width: 768px) {
                .battle-fighters {
                    flex-direction: column;
                    gap: 15px;
                }
                
                .vs-divider {
                    transform: rotate(90deg);
                    margin: 10px 0;
                }
                
                .fighter-select {
                    min-width: 200px;
                }
                
                .fighter-display {
                    flex-direction: column;
                    gap: 20px;
                }
            }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', battleCSS);
    }

    // Start Battle Function
    async function startBattle() {
        const fighter1 = document.getElementById('battleFighter1').value;
        const fighter2 = document.getElementById('battleFighter2').value;
        
        if (fighter1 === fighter2) {
            alert('Please select two different personas!');
            return;
        }
        
        const battleKey = `${fighter1}-vs-${fighter2}`;
        const battle = battleMatchups[battleKey] || {
            fighters: [fighter1, fighter2],
            theme: `${getCharacterData(fighter1).identity?.name || fighter1} vs ${getCharacterData(fighter2).identity?.name || fighter2}`,
            description: `Epic battle between two legendary personas!`,
            strategies: battleMatchups[`${fighter2}-vs-${fighter1}`]?.strategies || {}
        };
        
        currentBattle = battle;
        battleRound = 1;
        battleHistory = [];

        // Show arena
        document.getElementById('battleSetup').style.display = 'none';
        document.getElementById('battleArena').style.display = 'block';

        // Setup fighters
        setupFighters(battle.fighters);

        // Clear chat and show battle start
        document.getElementById('chatMessages').innerHTML = '';
        addBattleMessage('system', `🔥 BATTLE BEGINS: ${battle.theme} 🔥`, 'BATTLE SYSTEM');

        // Start first round
        await battleRound1();
    }

    // Setup Fighter Display
    function setupFighters(fighters) {
        const [fighter1, fighter2] = fighters;
        
        // Fighter 1 (Red Corner)
        const fighter1Element = document.getElementById('fighter1');
        const fighter1Avatar = fighter1Element.querySelector('.fighter-avatar');
        const fighter1Name = fighter1Element.querySelector('.fighter-name');
        const fighter1Data = getCharacterData(fighter1);
        
        fighter1Avatar.style.backgroundImage = `url(${characterAvatars[fighter1]})`;
        fighter1Name.textContent = fighter1Data.identity?.name || fighter1;

        // Fighter 2 (Blue Corner)
        const fighter2Element = document.getElementById('fighter2');
        const fighter2Avatar = fighter2Element.querySelector('.fighter-avatar');
        const fighter2Name = fighter2Element.querySelector('.fighter-name');
        const fighter2Data = getCharacterData(fighter2);
        
        fighter2Avatar.style.backgroundImage = `url(${characterAvatars[fighter2]})`;
        fighter2Name.textContent = fighter2Data.identity?.name || fighter2;

        // Update battle title
        document.getElementById('battleTitle').textContent = currentBattle.description;
    }

    // Battle Round Functions
    async function battleRound1() {
        updateRoundDisplay(1);
        addBattleMessage('system', '🥊 ROUND 1: First Blood!', 'ROUND 1');
        
        const [fighter1, fighter2] = currentBattle.fighters;
        
        // Fighter 1 opens with one verse
        await generateBattleVerse(fighter1, fighter2, 1, 'opening');
        updateSendButton('NEXT VERSE 🔥');
    }

    async function battleRound2() {
        const [fighter1, fighter2] = currentBattle.fighters;
        
        // Fighter 2 responds with one verse
        await generateBattleVerse(fighter2, fighter1, 1, 'response');
        updateSendButton('ROUND 2 🥊');
        
        // Add round transition
        setTimeout(() => {
            updateRoundDisplay(2);
            addBattleMessage('system', '🔥 ROUND 2: The Heat Rises!', 'ROUND 2');
        }, 1500);
    }

    async function battleRound3() {
        const [fighter1, fighter2] = currentBattle.fighters;
        
        // Fighter 1's second verse
        await generateBattleVerse(fighter1, fighter2, 2, 'escalation');
        updateSendButton('FINAL VERSE 💀');
    }

    async function battleFinale() {
        const [fighter1, fighter2] = currentBattle.fighters;
        
        // Fighter 2's final verse
        await generateBattleVerse(fighter2, fighter1, 2, 'finisher');
        
        // Battle conclusion
        setTimeout(() => {
            addBattleMessage('system', '🏆 BATTLE COMPLETE! 🏆', 'BATTLE SYSTEM');
            addBattleMessage('system', 'The crowd goes wild! Both fighters brought the heat!', 'BATTLE SYSTEM');
            
            updateSendButton('NEW BATTLE 🔥');
            document.getElementById('sendBtn').onclick = () => returnToBattleSetup();
        }, 2000);
    }

    // Generate Battle Verse
    async function generateBattleVerse(attacker, defender, round, type) {
        const attackerData = getCharacterData(attacker);
        const defenderData = getCharacterData(defender);
        const strategy = currentBattle.strategies[attacker];
        
        const battlePrompt = `You are ${attackerData.identity?.name || attacker} in an epic rap battle against ${defenderData.identity?.name || defender}.

BATTLE STRATEGY: ${strategy}

This is Round ${round}. Generate ONE FIERCE VERSE ONLY (4-6 lines maximum) that:
- Attacks ${defenderData.identity?.name || defender} based on the strategy
- Uses your character's vocabulary and style from your knowledge base
- Includes clever wordplay and metaphors
- Shows your character's personality
- Ends with a strong punch line

IMPORTANT: Only give me the rap verse - no extra commentary, no "here's my verse", just pure bars!`;

        showTyping(true);
        
        try {
            const response = await callGeminiAPI(battlePrompt);
            hideTyping();
            addBattleMessage('bot', response, attackerData.identity?.name || attacker, attacker);
            
            battleHistory.push({
                round,
                type,
                fighter: attacker,
                verse: response
            });
            
        } catch (error) {
            hideTyping();
            console.error('Battle API Error:', error);
            addBattleMessage('bot', "The fighter stumbles! Technical difficulties in the battle arena!", attackerData.identity?.name || attacker);
        }
    }

    // Battle Message Function
    function addBattleMessage(type, content, characterName = '', fighterCharacter = '') {
        const messageDiv = document.createElement('div');
        
        if (type === 'system') {
            messageDiv.className = 'message battle-round';
            messageDiv.innerHTML = `<div class="message-content">${content}</div>`;
        } else {
            messageDiv.className = `message ${type}`;
            
            let html = '';
            if (type === 'bot' && characterName) {
                // Use the correct character for avatar lookup
                const avatarUrl = characterAvatars[fighterCharacter] || characterAvatars[currentCharacter];
                const borderColor = currentBattle && currentBattle.fighters[0] === fighterCharacter ? '#ff4444' : '#4444ff';
                
                html += `<div class="character-name">`;
                if (avatarUrl) {
                    html += `<img src="${avatarUrl}" alt="${characterName}" class="character-avatar" 
                             style="border-color: ${borderColor};" onerror="this.style.display='none';">`;
                }
                html += `<span style="color: ${borderColor};">${characterName}</span></div>`;
            }
            html += `<div class="message-content">${content}</div>`;
            
            messageDiv.innerHTML = html;
        }
        
        document.getElementById('chatMessages').appendChild(messageDiv);
        document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
    }

    // Helper Functions
    function updateRoundDisplay(round) {
        document.getElementById('roundNumber').textContent = round;
        battleRound = round;
    }

    function updateSendButton(text) {
        const sendBtn = document.getElementById('sendBtn');
        sendBtn.textContent = text;
        sendBtn.disabled = false;
    }

    function returnToBattleSetup() {
        document.getElementById('battleArena').style.display = 'none';
        document.getElementById('battleSetup').style.display = 'block';
        document.getElementById('chatMessages').innerHTML = '';
        updateSendButton('Send');
        
        // Reset battle state
        currentBattle = null;
        battleRound = 0;
        battleHistory = [];
        
        // Clear battle selection
        const battleFighter1 = document.getElementById('battleFighter1');
        const battleFighter2 = document.getElementById('battleFighter2');
        if (battleFighter1) battleFighter1.selectedIndex = 0;
        if (battleFighter2) battleFighter2.selectedIndex = 1;
    }

    // Battle System Initialization
    function initBattleMode() {
        if (battleMode) return; // Already initialized
        
        battleMode = true;
        
        // Add battle styles
        addBattleStyles();
        
        // Update mode buttons
        document.getElementById('battleModeBtn').classList.add('active');
        document.getElementById('chatModeBtn').classList.remove('active');
        
        // Clear existing content and show battle interface
        const container = document.querySelector('.container');
        const existingInterface = document.getElementById('battleInterface');
        
        if (existingInterface) {
            existingInterface.remove();
        }
        
        // Insert battle interface before chat container
        const chatContainer = document.querySelector('.chat-container');
        const battleInterface = createBattleInterface();
        container.insertBefore(battleInterface, chatContainer);
        
        // Hide character selection in battle mode
        document.querySelector('.character-selection').style.display = 'none';
        
        // Setup battle selection events
        setupBattleEvents();
        
        // Clear chat messages
        document.getElementById('chatMessages').innerHTML = '';
        addBattleMessage('system', '🥊 Welcome to Battle Mode! Choose your epic matchup above!', 'BATTLE SYSTEM');
    }

    function setupBattleEvents() {
        // Start battle button
        document.getElementById('startBattleBtn').addEventListener('click', startBattle);

        // Back to setup button
        document.getElementById('backToSetup').addEventListener('click', returnToBattleSetup);

        // Override send button for battle progression
        const sendBtn = document.getElementById('sendBtn');
        const originalSendHandler = sendBtn.onclick;
        
        sendBtn.onclick = function() {
            if (!battleMode || !currentBattle) {
                return originalSendHandler?.call(this);
            }
            
            // Battle progression logic
            if (battleRound === 1) {
                battleRound2();
            } else if (battleRound === 2) {
                battleRound3();
            } else if (battleRound === 3) {
                battleFinale();
            }
        };
    }

    // Exit battle mode
    function exitBattleMode() {
        battleMode = false;
        
        // Update mode buttons
        document.getElementById('chatModeBtn').classList.add('active');
        document.getElementById('battleModeBtn').classList.remove('active');
        
        // Remove battle interface
        const battleInterface = document.getElementById('battleInterface');
        if (battleInterface) {
            battleInterface.remove();
        }
        
        // Show character selection
        document.querySelector('.character-selection').style.display = 'flex';
        
        // Reset send button
        updateSendButton('Send');
        document.getElementById('sendBtn').onclick = sendMessage;
        
        // Reset conversation
        resetConversation();
    }

    // Make functions globally available
    window.initBattleMode = initBattleMode;
    window.exitBattleMode = exitBattleMode;
    window.battleSystemLoaded = true;

    // Override chat mode button when battle system is loaded
    document.getElementById('chatModeBtn').addEventListener('click', exitBattleMode);

})();
