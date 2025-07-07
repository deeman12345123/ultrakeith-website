// ULTRA KEITH PLAYERS CLUB - MAIN CORE JAVASCRIPT
console.log('main.js loading...');

// GLOBAL GAME STATE
let currentPin = '';
let pinAttempts = 0;
let playerName = '';
let chipCount = 500;
let drinkCount = 0;// ULTRA KEITH PLAYERS CLUB - MAIN CORE JAVASCRIPT
console.log('main.js loading...');

// GLOBAL GAME STATE
let currentPin = '';
let pinAttempts = 0;
let playerName = '';
let chipCount = 500;
let drinkCount = 0;
let currentScene = 'entrance';

// PIN ENTRY SYSTEM
function showPinPad() {
    console.log('showPinPad called');
    document.getElementById('pinOverlay').style.display = 'flex';
    updatePinDisplay();
}

function hidePinPad() {
    console.log('hidePinPad called');
    document.getElementById('pinOverlay').style.display = 'none';
}

function enterPin(digit) {
    console.log('enterPin called with:', digit);
    if (currentPin.length < 3) {
        currentPin += digit;
        updatePinDisplay();
    }
}

function clearPin() {
    console.log('clearPin called');
    currentPin = '';
    updatePinDisplay();
}

function updatePinDisplay() {
    const display = document.getElementById('pinDisplay');
    if (display) {
        if (currentPin.length === 0) {
            display.textContent = '***';
        } else {
            display.textContent = currentPin + '*'.repeat(3 - currentPin.length);
        }
    }
}

function submitPin() {
    console.log('submitPin called with pin:', currentPin);
    if (currentPin.length !== 3) {
        showMessage('Enter 3 digits!', 'warning2');
        return;
    }
    
    pinAttempts++;
    
    if (currentPin === '223') {
        hidePinPad();
        showMessage('Welcome to The Players Club!', 'success');
        
        setTimeout(() => {
            const clubDoor = document.getElementById('clubDoor');
            if (clubDoor) {
                clubDoor.classList.add('sliding');
            }
            setTimeout(() => {
                showScene('bouncer');
            }, 1000);
        }, 1500);
    } else {
        let message = '';
        if (pinAttempts === 1) {
            message = 'Come on, player... you should know this one.';
        } else if (pinAttempts === 2) {
            message = 'Keith\'s not gonna like this... think harder, kid.';
        } else if (pinAttempts === 3) {
            message = 'Alright, here\'s your hint: Dr. Doom\'s apartment number';
        } else {
            message = 'Too many attempts! The answer is 223 - Dr. Doom\'s apartment!';
        }
        showMessage(message, 'warning2');
    }
    
    clearPin();
}

// SCENE MANAGEMENT
function showScene(sceneName) {
    console.log('showScene called:', sceneName);
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
    });
    const targetScene = document.getElementById(sceneName + 'Scene');
    if (targetScene) {
        targetScene.classList.add('active');
        currentScene = sceneName;
    }
}

// NAVIGATION FUNCTIONS
function goToCashier() {
    console.log('goToCashier called');
    showScene('cashier');
}

function enterVIPBooth() {
    console.log('enterVIPBooth called');
    const nameInput = document.getElementById('playerNameInput');
    if (!nameInput || !nameInput.value.trim()) {
        showMessage('Please enter your name first!', 'warning2');
        return;
    }
    
    playerName = nameInput.value.trim();
    const playerDisplay = document.getElementById('playerDisplay');
    if (playerDisplay) {
        playerDisplay.textContent = playerName;
    }
    
    const uiPanel = document.getElementById('uiPanel');
    if (uiPanel) {
        uiPanel.classList.add('show');
    }
    
    showScene('booth');
    showMessage(`Welcome to your VIP booth, ${playerName}!`, 'success');
}

function backToBooth() {
    console.log('backToBooth called');
    showScene('booth');
}

// GAME LOADING SYSTEM
function loadGame(gameName) {
    console.log(`Loading ${gameName} game...`);
    showMessage('Loading casino-grade engine...', 'hint');
    
    const script = document.createElement('script');
    script.src = `js/${gameName}-engine.js`;
    script.onload = () => {
        console.log(`${gameName} engine loaded successfully!`);
        showScene(gameName);
        if (window[`${gameName}Engine`] && window[`${gameName}Engine`].init) {
            window[`${gameName}Engine`].init();
        }
        showMessage(`Welcome to professional ${gameName}!`, 'success');
    };
    script.onerror = () => {
        console.error(`Failed to load ${gameName} engine`);
        showMessage(`${gameName} coming soon! Engine not found.`, 'hint');
    };
    document.head.appendChild(script);
}

// KEITH'S AI PHONE SYSTEM
function openPhone() {
    console.log('openPhone called');
    if (!playerName) {
        showMessage('Get setup at the cashier first!', 'warning2');
        return;
    }
    
    const responses = [
        `Yo ${playerName}, you reached Keith directly. What's good?`,
        `${playerName}! Hope you're enjoying the VIP treatment.`,
        `What's up ${playerName}? This is the exclusive line.`,
        `Keith here. You feeling that VIP status yet, ${playerName}?`,
        `${playerName}, remember - this phone is connected to my brain. Wild, right?`,
        `Ultra Keith speaking. ${playerName}, you're in the real Players Club now.`
    ];
    
    const message = responses[Math.floor(Math.random() * responses.length)];
    showMessage(message, 'success');
}

// CHAMPAGNE DRINKING SYSTEM WITH GLASS ANIMATION
function drinkChampagne() {
    console.log('drinkChampagne called');
    if (drinkCount >= 10) {
        showMessage('You\'ve had enough!', 'warning3');
        return;
    }
    
    drinkCount++;
    const drinkCountEl = document.getElementById('drinkCount');
    if (drinkCountEl) {
        drinkCountEl.textContent = drinkCount;
    }
    
    // GLASS ANIMATION - Switch to empty glass
    const champagneGlass = document.getElementById('champagneGlass');
    const champagneFallback = document.getElementById('champagneFallback');
    
    if (champagneGlass && champagneGlass.style.display !== 'none') {
        // Switch to empty glass
        champagneGlass.src = 'photos/table-items/glassfempty.png';
        champagneGlass.alt = 'Empty Glass';
        champagneGlass.title = 'Empty Glass - Click for refill';
        
        // Switch back to full glass after 2 seconds
        setTimeout(() => {
            champagneGlass.src = 'photos/table-items/champagne-glass.png';
            champagneGlass.alt = 'Champagne';
            champagneGlass.title = 'Champagne';
        }, 2000);
    } else if (champagneFallback && champagneFallback.style.display !== 'none') {
        // Fallback emoji animation
        champagneFallback.textContent = '🥃'; // Empty glass emoji
        champagneFallback.title = 'Empty Glass - Click for refill';
        
        setTimeout(() => {
            champagneFallback.textContent = '🥂'; // Full glass emoji
            champagneFallback.title = 'Champagne';
        }, 2000);
    }
    
    updateDrunkEffects();
    
    if (drinkCount >= 3) showDrunkItem('earring-item');
    if (drinkCount >= 5) showDrunkItem('bra-item');
    if (drinkCount >= 7) showDrunkItem('panties-item');
    if (drinkCount >= 9) showDrunkItem('heels-item');
    
    if (drinkCount === 1) {
        showMessage('Nice champagne...', 'success');
    } else if (drinkCount === 3) {
        showMessage('Nice champagne... wait, what\'s that?', 'warning1');
    } else if (drinkCount === 5) {
        showMessage('Things are getting interesting...', 'warning2');
    } else if (drinkCount === 7) {
        showMessage('This is getting out of hand...', 'warning3');
    } else if (drinkCount === 9) {
        showMessage('Seriously? Heels on the table?!', 'warning3');
    } else if (drinkCount === 10) {
        showMessage('SECURITY! You\'re outta here!', 'warning3');
        setTimeout(() => {
            createLockout('drunk_ejection');
        }, 2000);
    }
}

function updateDrunkEffects() {
    document.body.className = document.body.className.replace(/drunk-\d+/g, '');
    if (drinkCount > 0) {
        document.body.classList.add(`drunk-${drinkCount}`);
    }
}

function showDrunkItem(className) {
    const item = document.querySelector('.' + className);
    if (item) {
        item.classList.add('visible');
    }
}

// LEGACY GAME FUNCTIONS (for backward compatibility)
function rollCeelo() {
    const betAmount = parseInt(document.getElementById('ceelobBet')?.value) || 50;
    showMessage(`Rolling dice with ${betAmount} chip bet... (Game engine needed)`, 'hint');
}

function dealCards() {
    showMessage('Dealing cards... (Blackjack engine needed)', 'hint');
}

function hit() {
    showMessage('Hit! (Blackjack engine needed)', 'hint');
}

function stand() {
    showMessage('Stand! (Blackjack engine needed)', 'hint');
}

function spinSlots() {
    showMessage('Spinning reels... (Slots engine needed)', 'hint');
}

function setSlotsbet(amount) {
    console.log(`Setting slots bet to ${amount}`);
}

// CHIP MANAGEMENT
function updateChips(amount) {
    chipCount += amount;
    const chipCountEl = document.getElementById('chipCount');
    if (chipCountEl) {
        chipCountEl.textContent = chipCount;
    }
    
    if (chipCount <= 0) {
        chipCount = 0;
        showMessage('You\'re out of chips! Game over.', 'warning3');
    }
}

// LOCKOUT SYSTEM
function createLockout(type) {
    const lockout = {
        type: type,
        expires: Date.now() + (type === 'pin_failure' ? 15 * 60 * 1000 : 12 * 60 * 60 * 1000)
    };
    
    localStorage.setItem('clubLockout', JSON.stringify(lockout));
    
    let message = '';
    if (type === 'pin_failure') {
        message = 'Too many failed PIN attempts. Come back in 15 minutes and maybe listen to some Keith tracks about apartments...';
    } else if (type === 'drunk_ejection') {
        message = 'Security says you\'ve had enough. Come back in 12 hours after this sobriety course.';
    } else if (type === 'broke') {
        message = 'You\'re broke! Keith says come back in 12 hours with a better gambling strategy.';
    }
    
    document.getElementById('lockoutMessage').textContent = message;
    document.getElementById('lockoutScreen').style.display = 'flex';
}

// MESSAGE SYSTEM
function showMessage(text, type) {
    console.log('showMessage called:', text, type);
    const messageEl = document.getElementById('messageDisplay');
    if (messageEl) {
        messageEl.textContent = text;
        messageEl.className = `message-display show ${type || 'success'}`;
        
        const duration = type === 'hint' ? 4000 : 3000;
        setTimeout(() => {
            messageEl.classList.remove('show');
        }, duration);
    }
}

// RESET SYSTEM
function resetClub() {
    console.log('resetClub called');
    currentPin = '';
    pinAttempts = 0;
    playerName = '';
    chipCount = 500;
    drinkCount = 0;
    
    document.body.className = '';
    const lockoutScreen = document.getElementById('lockoutScreen');
    if (lockoutScreen) {
        lockoutScreen.style.display = 'none';
    }
    
    const uiPanel = document.getElementById('uiPanel');
    if (uiPanel) {
        uiPanel.classList.remove('show');
    }
    
    document.querySelectorAll('.drunk-item').forEach(item => {
        item.classList.remove('visible');
    });
    
    const clubDoor = document.getElementById('clubDoor');
    if (clubDoor) {
        clubDoor.classList.remove('sliding');
    }
    
    const chipCountEl = document.getElementById('chipCount');
    if (chipCountEl) chipCountEl.textContent = '500';
    
    const drinkCountEl = document.getElementById('drinkCount');
    if (drinkCountEl) drinkCountEl.textContent = '0';
    
    const playerDisplay = document.getElementById('playerDisplay');
    if (playerDisplay) playerDisplay.textContent = 'Guest';
    
    const playerNameInput = document.getElementById('playerNameInput');
    if (playerNameInput) playerNameInput.value = '';
    
    showScene('entrance');
    updatePinDisplay();
}

// KEYBOARD SUPPORT
document.addEventListener('keydown', function(e) {
    const pinOverlay = document.getElementById('pinOverlay');
    if (pinOverlay && pinOverlay.style.display === 'flex') {
        if (e.key >= '0' && e.key <= '9') {
            enterPin(e.key);
        } else if (e.key === 'Enter') {
            submitPin();
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
            clearPin();
        } else if (e.key === 'Escape') {
            hidePinPad();
        }
    }
});

// INITIALIZE SYSTEM
document.addEventListener('DOMContentLoaded', function() {
    console.log('Ultra Keith Players Club - Core System Loaded');
    updatePinDisplay();
});

// MAKE FUNCTIONS GLOBAL FOR HTML ONCLICK
window.showPinPad = showPinPad;
window.hidePinPad = hidePinPad;
window.enterPin = enterPin;
window.clearPin = clearPin;
window.submitPin = submitPin;
window.showScene = showScene;
window.goToCashier = goToCashier;
window.enterVIPBooth = enterVIPBooth;
window.backToBooth = backToBooth;
window.loadGame = loadGame;
window.openPhone = openPhone;
window.drinkChampagne = drinkChampagne;
window.rollCeelo = rollCeelo;
window.dealCards = dealCards;
window.hit = hit;
window.stand = stand;
window.spinSlots = spinSlots;
window.setSlotsbet = setSlotsbet;
window.updateChips = updateChips;
window.showMessage = showMessage;
window.resetClub = resetClub;

console.log('main.js loaded successfully - all functions available!');
let currentScene = 'entrance';

// PIN ENTRY SYSTEM
function showPinPad() {
    console.log('showPinPad called');
    document.getElementById('pinOverlay').style.display = 'flex';
    updatePinDisplay();
}

function hidePinPad() {
    console.log('hidePinPad called');
    document.getElementById('pinOverlay').style.display = 'none';
}

function enterPin(digit) {
    console.log('enterPin called with:', digit);
    if (currentPin.length < 3) {
        currentPin += digit;
        updatePinDisplay();
    }
}

function clearPin() {
    console.log('clearPin called');
    currentPin = '';
    updatePinDisplay();
}

function updatePinDisplay() {
    const display = document.getElementById('pinDisplay');
    if (display) {
        if (currentPin.length === 0) {
            display.textContent = '***';
        } else {
            display.textContent = currentPin + '*'.repeat(3 - currentPin.length);
        }
    }
}

function submitPin() {
    console.log('submitPin called with pin:', currentPin);
    if (currentPin.length !== 3) {
        showMessage('Enter 3 digits!', 'warning2');
        return;
    }
    
    pinAttempts++;
    
    if (currentPin === '223') {
        hidePinPad();
        showMessage('Welcome to The Players Club!', 'success');
        
        setTimeout(() => {
            const clubDoor = document.getElementById('clubDoor');
            if (clubDoor) {
                clubDoor.classList.add('sliding');
            }
            setTimeout(() => {
                showScene('bouncer');
            }, 1000);
        }, 1500);
    } else {
        let message = '';
        if (pinAttempts === 1) {
            message = 'Come on, player... you should know this one.';
        } else if (pinAttempts === 2) {
            message = 'Keith\'s not gonna like this... think harder, kid.';
        } else if (pinAttempts === 3) {
            message = 'Alright, here\'s your hint: Dr. Doom\'s apartment number';
        } else {
            message = 'Too many attempts! The answer is 223 - Dr. Doom\'s apartment!';
        }
        showMessage(message, 'warning2');
    }
    
    clearPin();
}

// SCENE MANAGEMENT
function showScene(sceneName) {
    console.log('showScene called:', sceneName);
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
    });
    const targetScene = document.getElementById(sceneName + 'Scene');
    if (targetScene) {
        targetScene.classList.add('active');
        currentScene = sceneName;
    }
}

// NAVIGATION FUNCTIONS
function goToCashier() {
    console.log('goToCashier called');
    showScene('cashier');
}

function enterVIPBooth() {
    console.log('enterVIPBooth called');
    const nameInput = document.getElementById('playerNameInput');
    if (!nameInput || !nameInput.value.trim()) {
        showMessage('Please enter your name first!', 'warning2');
        return;
    }
    
    playerName = nameInput.value.trim();
    const playerDisplay = document.getElementById('playerDisplay');
    if (playerDisplay) {
        playerDisplay.textContent = playerName;
    }
    
    const uiPanel = document.getElementById('uiPanel');
    if (uiPanel) {
        uiPanel.classList.add('show');
    }
    
    showScene('booth');
    showMessage(`Welcome to your VIP booth, ${playerName}!`, 'success');
}

function backToBooth() {
    console.log('backToBooth called');
    showScene('booth');
}

// GAME LOADING SYSTEM
function loadGame(gameName) {
    console.log(`Loading ${gameName} game...`);
    showMessage('Loading casino-grade engine...', 'hint');
    
    const script = document.createElement('script');
    script.src = `js/${gameName}-engine.js`;
    script.onload = () => {
        console.log(`${gameName} engine loaded successfully!`);
        showScene(gameName);
        if (window[`${gameName}Engine`] && window[`${gameName}Engine`].init) {
            window[`${gameName}Engine`].init();
        }
        showMessage(`Welcome to professional ${gameName}!`, 'success');
    };
    script.onerror = () => {
        console.error(`Failed to load ${gameName} engine`);
        showMessage(`${gameName} coming soon! Engine not found.`, 'hint');
    };
    document.head.appendChild(script);
}

// KEITH'S AI PHONE SYSTEM
function openPhone() {
    console.log('openPhone called');
    if (!playerName) {
        showMessage('Get setup at the cashier first!', 'warning2');
        return;
    }
    
    const responses = [
        `Yo ${playerName}, you reached Keith directly. What's good?`,
        `${playerName}! Hope you're enjoying the VIP treatment.`,
        `What's up ${playerName}? This is the exclusive line.`,
        `Keith here. You feeling that VIP status yet, ${playerName}?`,
        `${playerName}, remember - this phone is connected to my brain. Wild, right?`,
        `Ultra Keith speaking. ${playerName}, you're in the real Players Club now.`
    ];
    
    const message = responses[Math.floor(Math.random() * responses.length)];
    showMessage(message, 'success');
}

// CHAMPAGNE DRINKING SYSTEM
function drinkChampagne() {
    console.log('drinkChampagne called');
    if (drinkCount >= 10) {
        showMessage('You\'ve had enough!', 'warning3');
        return;
    }
    
    drinkCount++;
    const drinkCountEl = document.getElementById('drinkCount');
    if (drinkCountEl) {
        drinkCountEl.textContent = drinkCount;
    }
    
    updateDrunkEffects();
    
    if (drinkCount >= 3) showDrunkItem('earring-item');
    if (drinkCount >= 5) showDrunkItem('bra-item');
    if (drinkCount >= 7) showDrunkItem('panties-item');
    if (drinkCount >= 9) showDrunkItem('heels-item');
    
    if (drinkCount === 1) {
        showMessage('Nice champagne...', 'success');
    } else if (drinkCount === 3) {
        showMessage('Nice champagne... wait, what\'s that?', 'warning1');
    } else if (drinkCount === 5) {
        showMessage('Things are getting interesting...', 'warning2');
    } else if (drinkCount === 7) {
        showMessage('This is getting out of hand...', 'warning3');
    } else if (drinkCount === 9) {
        showMessage('Seriously? Heels on the table?!', 'warning3');
    } else if (drinkCount === 10) {
        showMessage('SECURITY! You\'re outta here!', 'warning3');
        setTimeout(() => {
            createLockout('drunk_ejection');
        }, 2000);
    }
}

function updateDrunkEffects() {
    document.body.className = document.body.className.replace(/drunk-\d+/g, '');
    if (drinkCount > 0) {
        document.body.classList.add(`drunk-${drinkCount}`);
    }
}

function showDrunkItem(className) {
    const item = document.querySelector('.' + className);
    if (item) {
        item.classList.add('visible');
    }
}

// LEGACY GAME FUNCTIONS (for backward compatibility)
function rollCeelo() {
    const betAmount = parseInt(document.getElementById('ceelobBet')?.value) || 50;
    showMessage(`Rolling dice with ${betAmount} chip bet... (Game engine needed)`, 'hint');
}

function dealCards() {
    showMessage('Dealing cards... (Blackjack engine needed)', 'hint');
}

function hit() {
    showMessage('Hit! (Blackjack engine needed)', 'hint');
}

function stand() {
    showMessage('Stand! (Blackjack engine needed)', 'hint');
}

function spinSlots() {
    showMessage('Spinning reels... (Slots engine needed)', 'hint');
}

function setSlotsbet(amount) {
    console.log(`Setting slots bet to ${amount}`);
}

// CHIP MANAGEMENT
function updateChips(amount) {
    chipCount += amount;
    const chipCountEl = document.getElementById('chipCount');
    if (chipCountEl) {
        chipCountEl.textContent = chipCount;
    }
    
    if (chipCount <= 0) {
        chipCount = 0;
        showMessage('You\'re out of chips! Game over.', 'warning3');
    }
}

// LOCKOUT SYSTEM
function createLockout(type) {
    const lockout = {
        type: type,
        expires: Date.now() + (type === 'pin_failure' ? 15 * 60 * 1000 : 12 * 60 * 60 * 1000)
    };
    
    localStorage.setItem('clubLockout', JSON.stringify(lockout));
    
    let message = '';
    if (type === 'pin_failure') {
        message = 'Too many failed PIN attempts. Come back in 15 minutes and maybe listen to some Keith tracks about apartments...';
    } else if (type === 'drunk_ejection') {
        message = 'Security says you\'ve had enough. Come back in 12 hours after this sobriety course.';
    } else if (type === 'broke') {
        message = 'You\'re broke! Keith says come back in 12 hours with a better gambling strategy.';
    }
    
    document.getElementById('lockoutMessage').textContent = message;
    document.getElementById('lockoutScreen').style.display = 'flex';
}

// MESSAGE SYSTEM
function showMessage(text, type) {
    console.log('showMessage called:', text, type);
    const messageEl = document.getElementById('messageDisplay');
    if (messageEl) {
        messageEl.textContent = text;
        messageEl.className = `message-display show ${type || 'success'}`;
        
        const duration = type === 'hint' ? 4000 : 3000;
        setTimeout(() => {
            messageEl.classList.remove('show');
        }, duration);
    }
}

// RESET SYSTEM
function resetClub() {
    console.log('resetClub called');
    currentPin = '';
    pinAttempts = 0;
    playerName = '';
    chipCount = 500;
    drinkCount = 0;
    
    document.body.className = '';
    const lockoutScreen = document.getElementById('lockoutScreen');
    if (lockoutScreen) {
        lockoutScreen.style.display = 'none';
    }
    
    const uiPanel = document.getElementById('uiPanel');
    if (uiPanel) {
        uiPanel.classList.remove('show');
    }
    
    document.querySelectorAll('.drunk-item').forEach(item => {
        item.classList.remove('visible');
    });
    
    const clubDoor = document.getElementById('clubDoor');
    if (clubDoor) {
        clubDoor.classList.remove('sliding');
    }
    
    const chipCountEl = document.getElementById('chipCount');
    if (chipCountEl) chipCountEl.textContent = '500';
    
    const drinkCountEl = document.getElementById('drinkCount');
    if (drinkCountEl) drinkCountEl.textContent = '0';
    
    const playerDisplay = document.getElementById('playerDisplay');
    if (playerDisplay) playerDisplay.textContent = 'Guest';
    
    const playerNameInput = document.getElementById('playerNameInput');
    if (playerNameInput) playerNameInput.value = '';
    
    showScene('entrance');
    updatePinDisplay();
}

// KEYBOARD SUPPORT
document.addEventListener('keydown', function(e) {
    const pinOverlay = document.getElementById('pinOverlay');
    if (pinOverlay && pinOverlay.style.display === 'flex') {
        if (e.key >= '0' && e.key <= '9') {
            enterPin(e.key);
        } else if (e.key === 'Enter') {
            submitPin();
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
            clearPin();
        } else if (e.key === 'Escape') {
            hidePinPad();
        }
    }
});

// INITIALIZE SYSTEM
document.addEventListener('DOMContentLoaded', function() {
    console.log('Ultra Keith Players Club - Core System Loaded');
    updatePinDisplay();
});

// MAKE FUNCTIONS GLOBAL FOR HTML ONCLICK
window.showPinPad = showPinPad;
window.hidePinPad = hidePinPad;
window.enterPin = enterPin;
window.clearPin = clearPin;
window.submitPin = submitPin;
window.showScene = showScene;
window.goToCashier = goToCashier;
window.enterVIPBooth = enterVIPBooth;
window.backToBooth = backToBooth;
window.loadGame = loadGame;
window.openPhone = openPhone;
window.drinkChampagne = drinkChampagne;
window.rollCeelo = rollCeelo;
window.dealCards = dealCards;
window.hit = hit;
window.stand = stand;
window.spinSlots = spinSlots;
window.setSlotsbet = setSlotsbet;
window.updateChips = updateChips;
window.showMessage = showMessage;
window.resetClub = resetClub;

console.log('main.js loaded successfully - all functions available!');
