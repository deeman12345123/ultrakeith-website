// ULTRA KEITH PLAYERS CLUB - SIMPLE TEST VERSION
console.log('Simple main.js loaded successfully!');

// GLOBAL VARIABLES
let currentPin = '';
let pinAttempts = 0;
let playerName = '';

// PIN FUNCTIONS
function showPinPad() {
    console.log('showPinPad called!');
    const pinOverlay = document.getElementById('pinOverlay');
    if (pinOverlay) {
        pinOverlay.style.display = 'flex';
        updatePinDisplay(); // Make sure display is correct when opened
    }
}

function hidePinPad() {
    console.log('hidePinPad called!');
    const pinOverlay = document.getElementById('pinOverlay');
    if (pinOverlay) {
        pinOverlay.style.display = 'none';
    }
}

function enterPin(digit) {
    console.log('enterPin called with:', digit);
    if (currentPin.length < 3) {
        currentPin += digit;
        updatePinDisplay();
    }
}

function clearPin() {
    console.log('clearPin called!');
    currentPin = '';
    updatePinDisplay();
}

function updatePinDisplay() {
    const display = document.getElementById('pinDisplay');
    if (display) {
        if (currentPin.length === 0) {
            display.textContent = '***';
        } else {
            // Show entered digits and pad with asterisks
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
        
        // Animate door and go to bouncer scene
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

// NAVIGATION FUNCTIONS
function showScene(sceneName) {
    console.log('showScene called:', sceneName);
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
    });
    const targetScene = document.getElementById(sceneName + 'Scene');
    if (targetScene) {
        targetScene.classList.add('active');
    }
}

function goToCashier() {
    console.log('goToCashier called!');
    showScene('cashier');
}

function enterVIPBooth() {
    console.log('enterVIPBooth called!');
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
    console.log('backToBooth called!');
    showScene('booth');
}

function openPhone() {
    console.log('openPhone called!');
    if (!playerName) {
        showMessage('Get setup at the cashier first!', 'warning2');
        return;
    }
    
    const responses = [
        `Yo ${playerName}, you reached Keith directly. What's good?`,
        `${playerName}! Hope you're enjoying the VIP treatment.`,
        `What's up ${playerName}? This is the exclusive line.`,
        `Keith here. You feeling that VIP status yet, ${playerName}?`
    ];
    
    const message = responses[Math.floor(Math.random() * responses.length)];
    showMessage(message, 'success');
}

function drinkChampagne() {
    console.log('drinkChampagne called!');
    showMessage('Nice champagne! VIP treatment all the way.', 'success');
}

// PLACEHOLDER GAME FUNCTIONS
function testGameLoad(gameName) {
    console.log(`Testing ${gameName} game...`);
    showMessage(`${gameName} game would load here! Coming soon.`, 'hint');
}

// MESSAGE SYSTEM
function showMessage(text, type) {
    console.log('showMessage called:', text, type);
    const messageEl = document.getElementById('messageDisplay');
    if (messageEl) {
        messageEl.textContent = text;
        messageEl.className = `message-display show ${type || 'success'}`;
        
        setTimeout(() => {
            messageEl.classList.remove('show');
        }, 3000);
    }
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

// MAKE ALL FUNCTIONS GLOBAL
window.showPinPad = showPinPad;
window.hidePinPad = hidePinPad;
window.enterPin = enterPin;
window.clearPin = clearPin;
window.submitPin = submitPin;
window.showScene = showScene;
window.goToCashier = goToCashier;
window.enterVIPBooth = enterVIPBooth;
window.backToBooth = backToBooth;
window.openPhone = openPhone;
window.drinkChampagne = drinkChampagne;
window.showMessage = showMessage;
window.testGameLoad = testGameLoad;

// INITIALIZE
document.addEventListener('DOMContentLoaded', function() {
    console.log('Simple Players Club loaded - PIN pad should work!');
    updatePinDisplay();
});

console.log('Simple main.js finished loading - all functions should be available!');
