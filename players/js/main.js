// ULTRA KEITH PLAYERS CLUB - MAIN CORE JAVASCRIPT
// Professional Casino System - Core Functionality

// GLOBAL GAME STATE
let currentPin = '';
let pinAttempts = 0;
let playerName = '';
let chipCount = 500;
let drinkCount = 0;
let currentScene = 'entrance';
let songPlaying = false;

// BLACKJACK GAME STATE (Legacy - will be moved to engine)
let deck = [];
let playerHand = [];
let dealerHand = [];
let gameInProgress = false;

// SCENE MANAGEMENT SYSTEM
function showScene(sceneName) {
// ULTRA KEITH PLAYERS CLUB - MAIN CORE JAVASCRIPT
// Professional Casino System - Core Functionality

// GLOBAL GAME STATE
let currentPin = '';
let pinAttempts = 0;
let playerName = '';
let chipCount = 500;
let drinkCount = 0;
let currentScene = 'entrance';
let songPlaying = false;

// BLACKJACK GAME STATE (Legacy - will be moved to engine)
let deck = [];
let playerHand = [];
let dealerHand = [];
let gameInProgress = false;

// SCENE MANAGEMENT SYSTEM
function showScene(sceneName) {
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
    });
    document.getElementById(sceneName + 'Scene').classList.add('active');
    currentScene = sceneName;
    
    console.log(`Switched to scene: ${sceneName}`);
}

// NAVIGATION FUNCTIONS
function goToCashier() {
    showScene('cashier');
}

function enterVIPBooth() {
    const nameInput = document.getElementById('playerNameInput');
    if (!nameInput.value.trim()) {
        showMessage('Please enter your name first!', 'warning2');
        return;
    }
    
    playerName = nameInput.value.trim();
    document.getElementById('playerDisplay').textContent = playerName;
    document.getElementById('uiPanel').classList.add('show');
    showScene('booth');
    showMessage(`Welcome to your VIP booth, ${playerName}!`, 'success');
}

function backToBooth() {
    showScene('booth');
}

// PIN ENTRY SYSTEM
function showPinPad() {
    document.getElementById('pinOverlay').style.display = 'flex';
}

function hidePinPad() {
    document.getElementById('pinOverlay').style.display = 'none';
    if (songPlaying) {
        stopApartment223();
    }
}

function enterPin(digit) {
    if (currentPin.length < 3) {
        currentPin += digit;
        updatePinDisplay();
    }
}

function clearPin() {
    currentPin = '';
    updatePinDisplay();
}

function updatePinDisplay() {
    const display = document.getElementById('pinDisplay');
    display.textContent = currentPin.length === 0 ? '***' : currentPin.padEnd(3, '*');
}

function submitPin() {
    if (currentPin.length !== 3) return;
    
    pinAttempts++;
    
    if (currentPin === '223') {
        showPinSuccess();
    } else {
        showPinError();
    }
    
    clearPin();
}

function showPinError() {
    let message = '';
    let type = '';
    
    if (pinAttempts === 1) {
        message = 'Come on, player... you should know this one.';
        type = 'warning1';
    } else if (pinAttempts === 2) {
        message = 'Keith\'s not gonna like this... think harder, kid.';
        type = 'warning2';
    } else if (pinAttempts === 3) {
        message = 'Alright, here\'s your hint: Dr. Doom\'s apartment number';
        type = 'hint';
    } else if (pinAttempts === 4) {
        message = 'Still don\'t get it? Listen to this...';
        type = 'song-hint';
        playApartment223();
    } else {
        createLockout('pin_failure');
        return;
    }
    
    showMessage(message, type);
}

function playApartment223() {
    const audio = document.getElementById('apartment223Audio');
    const controls = document.getElementById('audioControls');
    
    songPlaying = true;
    controls.classList.add('show');
    
    setTimeout(() => {
        if (songPlaying) {
            showMessage('Did you catch that apartment number in the song? 🎵', 'hint');
            stopApartment223();
        }
    }, 30000);
}

function stopApartment223() {
    const audio = document.getElementById('apartment223Audio');
    const controls = document.getElementById('audioControls');
    
    songPlaying = false;
    controls.classList.remove('show');
}

function showPinSuccess() {
    hidePinPad();
    showMessage('Welcome to The Players Club!', 'success');
    
    setTimeout(() => {
        document.getElementById('clubDoor').classList.add('sliding');
        setTimeout(() => {
            showScene('bouncer');
        }, 1000);
    }, 1500);
}

// CHAMPAGNE DRINKING SYSTEM (VIP BOOTH EASTER EGG)
function drinkChampagne() {
    if (drinkCount >= 10) {
        showMessage('You\'ve had enough!', 'warning3');
        return;
    }
    
    drinkCount++;
    document.getElementById('drinkCount').textContent = drinkCount;
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

// KEITH'S AI PHONE SYSTEM
function openPhone() {
    if (!playerName) {
        showMessage('Get setup at the cashier first!', 'warning2');
        return;
    }
    
    const responses = [
        `Yo ${playerName}, you reached Keith directly. What's good?`,
        `${playerName}! Hope you're enjoying the VIP treatment.`,
        `What's up ${playerName}? Don't go too crazy with that champagne.`,
        `${playerName}, if you need that apartment number, it's 223... Dr. Doom style!`,
        `Keith here. You feeling that VIP status yet, ${playerName}?`,
        `${playerName}, remember - this phone is connected to my brain. Wild, right?`,
        `Ultra Keith speaking. ${playerName}, you're in the real Players Club now.`,
        `${playerName}, this is the exclusive line. Feel special yet?`
    ];
    
    const message = responses[Math.floor(Math.random() * responses.length)];
    showMessage(message, 'success');
}

// LEGACY SIMPLE DICE GAME (Will be replaced by Cee-Lo engine)
function rollDice() {
    const betAmount = parseInt(document.getElementById('diceBet').value);
    if (betAmount > chipCount) {
        showMessage('Not enough chips!', 'warning3');
        return;
    }
    
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const total = dice1 + dice2;
    
    document.getElementById('dice1').textContent = dice1;
    document.getElementById('dice2').textContent = dice2;
    
    let winnings = 0;
    let message = '';
    
    if (dice1 === dice2) {
        winnings = betAmount * 3;
        message = `DOUBLES! You win ${winnings} chips!`;
        updateChips(winnings);
        showMessage(message, 'success');
    } else if (total === 7 || total === 11) {
        winnings = betAmount;
        message = `Lucky ${total}! You win ${winnings} chips!`;
        updateChips(winnings);
        showMessage(message, 'success');
    } else {
        updateChips(-betAmount);
        message = `Total: ${total}. You lose ${betAmount} chips.`;
        showMessage(message, 'warning2');
    }
    
    document.getElementById('diceResult').innerHTML = `<strong>Roll: ${dice1}, ${dice2} (Total: ${total})</strong><br>${message}`;
}

// CEE-LO DICE GAME (456)
function rollCeelo() {
    const betAmount = parseInt(document.getElementById('ceelobBet').value);
    if (betAmount > chipCount) {
        showMessage('Not enough chips!', 'warning3');
        return;
    }
    
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const dice3 = Math.floor(Math.random() * 6) + 1;
    
    document.getElementById('dice1').textContent = dice1;
    document.getElementById('dice2').textContent = dice2;
    document.getElementById('dice3').textContent = dice3;
    
    let winnings = 0;
    let message = '';
    
    // Cee-Lo Rules
    if (dice1 === 4 && dice2 === 5 && dice3 === 6) {
        winnings = betAmount * 10;
        message = `456 - INSTANT WIN! You win ${winnings} chips!`;
        updateChips(winnings);
        showMessage(message, 'success');
    } else if (dice1 === 1 && dice2 === 2 && dice3 === 3) {
        updateChips(-betAmount);
        message = `123 - INSTANT LOSE! You lose ${betAmount} chips.`;
        showMessage(message, 'warning3');
    } else if (dice1 === dice2 && dice2 === dice3) {
        winnings = betAmount * 5;
        message = `TRIPS ${dice1}! You win ${winnings} chips!`;
        updateChips(winnings);
        showMessage(message, 'success');
    } else {
        updateChips(-betAmount);
        message = `No combo. You lose ${betAmount} chips.`;
        showMessage(message, 'warning2');
    }
    
    document.getElementById('ceeloResult').innerHTML = `<strong>Roll: ${dice1}-${dice2}-${dice3}</strong><br>${message}`;
}

// LEGACY BLACKJACK (Will be replaced by professional engine)
function initializeBlackjack() {
    createDeck();
    shuffleDeck();
}

function createDeck() {
    const suits = ['♠', '♥', '♦', '♣'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    deck = [];
    
    for (let suit of suits) {
        for (let value of values) {
            deck.push({value: value, suit: suit});
        }
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealCards() {
    const betAmount = parseInt(document.getElementById('blackjackBet').value);
    if (betAmount > chipCount) {
        showMessage('Not enough chips!', 'warning3');
        return;
    }
    
    if (deck.length < 10) {
        createDeck();
        shuffleDeck();
    }
    
    playerHand = [];
    dealerHand = [];
    gameInProgress = true;
    
    // Deal initial cards
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
    
    updateBlackjackDisplay();
    
    const playerScore = calculateScore(playerHand);
    if (playerScore === 21) {
        endBlackjackGame('blackjack');
    } else {
        document.getElementById('blackjackControls').innerHTML = `
            <button class="btn" onclick="hit()">Hit</button>
            <button class="btn" onclick="stand()">Stand</button>
        `;
    }
}

function hit() {
    if (!gameInProgress) return;
    
    playerHand.push(deck.pop());
    updateBlackjackDisplay();
    
    const playerScore = calculateScore(playerHand);
    if (playerScore > 21) {
        endBlackjackGame('bust');
    } else if (playerScore === 21) {
        stand();
    }
}

function stand() {
    if (!gameInProgress) return;
    
    // Dealer hits until 17 or higher
    while (calculateScore(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }
    
    updateBlackjackDisplay(true);
    
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);
    
    if (dealerScore > 21) {
        endBlackjackGame('dealer_bust');
    } else if (playerScore > dealerScore) {
        endBlackjackGame('win');
    } else if (playerScore < dealerScore) {
        endBlackjackGame('lose');
    } else {
        endBlackjackGame('push');
    }
}

function calculateScore(hand) {
    let score = 0;
    let aces = 0;
    
    for (let card of hand) {
        if (card.value === 'A') {
            aces++;
            score += 11;
        } else if (['J', 'Q', 'K'].includes(card.value)) {
            score += 10;
        } else {
            score += parseInt(card.value);
        }
    }
    
    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }
    
    return score;
}

function updateBlackjackDisplay(showDealerCards = false) {
    const playerHandEl = document.getElementById('playerHand');
    const dealerHandEl = document.getElementById('dealerHand');
    
    if (!playerHandEl || !dealerHandEl) return;
    
    playerHandEl.innerHTML = '';
    dealerHandEl.innerHTML = '';
    
    // Show player cards
    for (let card of playerHand) {
        const cardEl = document.createElement('div');
        cardEl.className = `playing-card ${(['♥', '♦'].includes(card.suit)) ? 'red' : ''}`;
        cardEl.innerHTML = `<div>${card.value}</div><div>${card.suit}</div>`;
        playerHandEl.appendChild(cardEl);
    }
    
    // Show dealer cards
    for (let i = 0; i < dealerHand.length; i++) {
        const cardEl = document.createElement('div');
        if (i === 1 && !showDealerCards && gameInProgress) {
            // Hide second card until game ends
            cardEl.className = 'playing-card';
            cardEl.innerHTML = '<div>?</div><div>?</div>';
            cardEl.style.background = '#333';
        } else {
            const card = dealerHand[i];
            cardEl.className = `playing-card ${(['♥', '♦'].includes(card.suit)) ? 'red' : ''}`;
            cardEl.innerHTML = `<div>${card.value}</div><div>${card.suit}</div>`;
        }
        dealerHandEl.appendChild(cardEl);
    }
    
    // Update scores
    const playerScoreEl = document.getElementById('playerScore');
    const dealerScoreEl = document.getElementById('dealerScore');
    
    if (playerScoreEl) playerScoreEl.textContent = calculateScore(playerHand);
    if (dealerScoreEl) {
        if (showDealerCards || !gameInProgress) {
            dealerScoreEl.textContent = calculateScore(dealerHand);
        } else {
            dealerScoreEl.textContent = '?';
        }
    }
}

function endBlackjackGame(result) {
    gameInProgress = false;
    const betAmount = parseInt(document.getElementById('blackjackBet').value);
    let winnings = 0;
    let message = '';
    
    switch(result) {
        case 'blackjack':
            winnings = Math.floor(betAmount * 1.5);
            message = `BLACKJACK! You win ${winnings} chips!`;
            updateChips(winnings);
            showMessage(message, 'success');
            break;
        case 'win':
            winnings = betAmount;
            message = `You win! +${winnings} chips!`;
            updateChips(winnings);
            showMessage(message, 'success');
            break;
        case 'dealer_bust':
            winnings = betAmount;
            message = `Dealer bust! You win ${winnings} chips!`;
            updateChips(winnings);
            showMessage(message, 'success');
            break;
        case 'lose':
            updateChips(-betAmount);
            message = `You lose ${betAmount} chips.`;
            showMessage(message, 'warning2');
            break;
        case 'bust':
            updateChips(-betAmount);
            message = `Bust! You lose ${betAmount} chips.`;
            showMessage(message, 'warning3');
            break;
        case 'push':
            message = 'Push! It\'s a tie.';
            showMessage(message, 'hint');
            break;
    }
    
    const resultEl = document.getElementById('blackjackResult');
    if (resultEl) resultEl.innerHTML = `<strong>${message}</strong>`;
    
    const controlsEl = document.getElementById('blackjackControls');
    if (controlsEl) {
        controlsEl.innerHTML = `<button class="btn" onclick="dealCards()">Deal New Hand</button>`;
    }
}

// CHIP MANAGEMENT SYSTEM
function updateChips(amount) {
    chipCount += amount;
    document.getElementById('chipCount').textContent = chipCount;
    
    // Update all game balance displays
    const slotsBalance = document.getElementById('slotsBalance');
    if (slotsBalance) slotsBalance.textContent = chipCount;
    
    if (chipCount <= 0) {
        chipCount = 0;
        document.getElementById('chipCount').textContent = '0';
        showMessage('You\'re out of chips! Game over.', 'warning3');
        setTimeout(() => {
            createLockout('broke');
        }, 2000);
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
    
    if (songPlaying) {
        stopApartment223();
    }
}

// MESSAGE SYSTEM
function showMessage(text, type) {
    const messageEl = document.getElementById('messageDisplay');
    messageEl.textContent = text;
    messageEl.className = `message-display show ${type}`;
    
    const duration = type === 'hint' || type === 'song-hint' ? 6000 : 3000;
    setTimeout(() => {
        messageEl.classList.remove('show');
    }, duration);
}

// RESET SYSTEM
function resetClub() {
    localStorage.removeItem('clubLockout');
    currentPin = '';
    pinAttempts = 0;
    playerName = '';
    chipCount = 500;
    drinkCount = 0;
    songPlaying = false;
    gameInProgress = false;
    playerHand = [];
    dealerHand = [];
    
    document.body.className = '';
    document.getElementById('lockoutScreen').style.display = 'none';
    document.getElementById('uiPanel').classList.remove('show');
    document.getElementById('audioControls').classList.remove('show');
    
    document.querySelectorAll('.drunk-item').forEach(item => {
        item.classList.remove('visible');
    });
    
    document.getElementById('clubDoor').classList.remove('sliding');
    document.getElementById('chipCount').textContent = '500';
    document.getElementById('drinkCount').textContent = '0';
    document.getElementById('playerDisplay').textContent = 'Guest';
    document.getElementById('playerNameInput').value = '';
    
    // Reset game displays
    const diceResult = document.getElementById('diceResult');
    const ceeloResult = document.getElementById('ceeloResult');
    const blackjackResult = document.getElementById('blackjackResult');
    
    if (diceResult) diceResult.innerHTML = '';
    if (ceeloResult) ceeloResult.innerHTML = '';
    if (blackjackResult) blackjackResult.innerHTML = '';
    
    // Reset dice displays
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    const dice3 = document.getElementById('dice3');
    
    if (dice1) dice1.textContent = '?';
    if (dice2) dice2.textContent = '?';
    if (dice3) dice3.textContent = '?';
    
    // Reset blackjack
    const playerHand = document.getElementById('playerHand');
    const dealerHand = document.getElementById('dealerHand');
    const playerScore = document.getElementById('playerScore');
    const dealerScore = document.getElementById('dealerScore');
    const blackjackControls = document.getElementById('blackjackControls');
    
    if (playerHand) playerHand.innerHTML = '';
    if (dealerHand) dealerHand.innerHTML = '';
    if (playerScore) playerScore.textContent = '0';
    if (dealerScore) dealerScore.textContent = '?';
    if (blackjackControls) {
        blackjackControls.innerHTML = `<button class="btn" onclick="dealCards()">Deal Cards</button>`;
    }
    
    showScene('entrance');
    updatePinDisplay();
    stopApartment223();
}

// CHECK LOCKOUT ON LOAD
function checkLockout() {
    const lockoutData = localStorage.getItem('clubLockout');
    if (lockoutData) {
        const lockout = JSON.parse(lockoutData);
        if (Date.now() < lockout.expires) {
            let message = '';
            if (lockout.type === 'pin_failure') {
                message = 'You\'re still locked out. Try listening to some Kool Keith tracks while you wait...';
            } else if (lockout.type === 'drunk_ejection') {
                message = 'Still in timeout for drinking too much. Come back later!';
            } else if (lockout.type === 'broke') {
                message = 'Still broke! Keith says practice your gambling skills and come back later.';
            }
            document.getElementById('lockoutMessage').textContent = message;
            document.getElementById('lockoutScreen').style.display = 'flex';
        } else {
            localStorage.removeItem('clubLockout');
        }
    }
}

// KEYBOARD SUPPORT
document.addEventListener('keydown', function(e) {
    if (document.getElementById('pinOverlay').style.display === 'flex') {
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
    checkLockout();
    initializeBlackjack();
});

// MAKE FUNCTIONS GLOBAL
window.showScene = showScene;
window.goToCashier = goToCashier;
window.enterVIPBooth = enterVIPBooth;
window.backToBooth = backToBooth;
window.showPinPad = showPinPad;
window.hidePinPad = hidePinPad;
window.enterPin = enterPin;
window.clearPin = clearPin;
window.submitPin = submitPin;
window.drinkChampagne = drinkChampagne;
window.openPhone = openPhone;
window.rollDice = rollDice;
window.rollCeelo = rollCeelo;
window.dealCards = dealCards;
window.hit = hit;
window.stand = stand;
window.updateChips = updateChips;
window.showMessage = showMessage;
window.resetClub = resetClub;document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
    });
    document.getElementById(sceneName + 'Scene').classList.add('active');
    currentScene = sceneName;
    
    console.log(`Switched to scene: ${sceneName}`);
}

// NAVIGATION FUNCTIONS
function goToCashier() {
    showScene('cashier');
}

function enterVIPBooth() {
    const nameInput = document.getElementById('playerNameInput');
    if (!nameInput.value.trim()) {
        showMessage('Please enter your name first!', 'warning2');
        return;
    }
