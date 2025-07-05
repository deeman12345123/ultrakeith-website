// PROFESSIONAL CEE-LO (456) DICE ENGINE
// Keith's Players Club Street Dice Game

class CeeLoEngine {
    constructor() {
        this.minBet = 10;
        this.maxBet = 500;
        this.currentBet = 50;
        this.balance = 500;
        this.dice = [1, 1, 1];
        this.lastRoll = [];
        this.rolling = false;
        
        // Street Rules for Cee-Lo
        this.rules = {
            instantWin: [
                [4, 5, 6], // 456 - The ultimate win
                [1, 1, 1], // Triple 1s
                [2, 2, 2], // Triple 2s  
                [3, 3, 3], // Triple 3s
                [4, 4, 4], // Triple 4s
                [5, 5, 5], // Triple 5s
                [6, 6, 6]  // Triple 6s
            ],
            instantLose: [
                [1, 2, 3]  // 123 - Automatic loss
            ],
            pointNumbers: [1, 2, 3, 4, 5, 6] // Any number can be a point
        };
        
        // Payout multipliers
        this.payouts = {
            '456': 10,      // 456 pays 10:1 (ultimate win)
            'trips': 5,     // Any trips pay 5:1
            'point6': 3,    // Point of 6 pays 3:1
            'point5': 2,    // Point of 5 pays 2:1  
            'point4': 2,    // Point of 4 pays 2:1
            'point3': 1,    // Point of 3 pays 1:1
            'point2': 1,    // Point of 2 pays 1:1
            'point1': 1     // Point of 1 pays 1:1
        };
        
        // Statistics tracking
        this.totalRolls = 0;
        this.wins = 0;
        this.losses = 0;
        this.totalWagered = 0;
        this.totalWon = 0;
        this.rollHistory = [];
        
        // Keith-style street commentary
        this.keithCommentary = {
            win456: [
                "456! That's Keith-level legendary!",
                "Yo! 456 - you just hit the ultimate!",
                "Keith says: That's how real players roll!",
                "456 - straight from the Bronx streets!"
            ],
            winTrips: [
                "Trips! Street style domination!",
                "Triple threat like Keith's flow!",
                "That's some Ultramagnetic luck right there!",
                "Keith approved triple action!"
            ],
            lose123: [
                "123 - that's game over, player!",
                "Ouch! 123 is automatic death!",
                "Keith says: Sometimes the streets are cold!",
                "123 - time to reload and try again!"
            ],
            regularWin: [
                "Nice point! Keith would be proud!",
                "That's how we do it in the club!",
                "Solid street roll!",
                "Keep that energy flowing!"
            ],
            regularLose: [
                "No dice this time, player!",
                "Shake it off and roll again!",
                "Keith says: That's just the game!",
                "Better luck on the next roll!"
            ]
        };
    }
    
    // ROLL THE DICE
    roll() {
        if (this.rolling) return { success: false, message: 'Dice still rolling!' };
        if (this.balance < this.currentBet) {
            return { success: false, message: 'Insufficient balance!' };
        }
        
        this.rolling = true;
        this.totalRolls++;
        this.balance -= this.currentBet;
        this.totalWagered += this.currentBet;
        
        // Generate random dice roll
        this.dice = [
            Math.floor(Math.random() * 6) + 1,
            Math.floor(Math.random() * 6) + 1,
            Math.floor(Math.random() * 6) + 1
        ];
        
        // Sort dice for easier rule checking
        const sortedDice = [...this.dice].sort((a, b) => a - b);
        this.lastRoll = [...this.dice];
        
        // Determine outcome
        const result = this.evaluateRoll(sortedDice);
        
        // Add to history
        this.rollHistory.unshift({
            dice: [...this.dice],
            result: result.outcome,
            payout: result.payout,
            timestamp: Date.now()
        });
        
        // Keep only last 10 rolls in history
        if (this.rollHistory.length > 10) {
            this.rollHistory.pop();
        }
        
        // Update balance and stats
        if (result.payout > 0) {
            this.balance += result.payout;
            this.totalWon += result.payout;
            this.wins++;
        } else {
            this.losses++;
        }
        
        setTimeout(() => {
            this.rolling = false;
        }, 2000);
        
        return {
            success: true,
            dice: this.dice,
            result: result,
            balance: this.balance,
            commentary: this.getCommentary(result.outcome)
        };
    }
    
    // EVALUATE DICE ROLL ACCORDING TO CEE-LO RULES
    evaluateRoll(sortedDice) {
        const diceString = sortedDice.join('');
        
        // Check for 456 (ultimate win)
        if (diceString === '456') {
            return {
                outcome: '456',
                description: '4-5-6 - ULTIMATE WIN!',
                payout: this.currentBet * (this.payouts['456'] + 1),
                multiplier: this.payouts['456']
            };
        }
        
        // Check for 123 (automatic loss)
        if (diceString === '123') {
            return {
                outcome: '123',
                description: '1-2-3 - Automatic Loss',
                payout: 0,
                multiplier: 0
            };
        }
        
        // Check for trips (three of a kind)
        if (sortedDice[0] === sortedDice[1] && sortedDice[1] === sortedDice[2]) {
            return {
                outcome: 'trips',
                description: `Triple ${sortedDice[0]}s!`,
                payout: this.currentBet * (this.payouts['trips'] + 1),
                multiplier: this.payouts['trips']
            };
        }
        
        // Check for point (pair + single die)
        const point = this.findPoint(sortedDice);
        if (point) {
            const multiplier = this.payouts[`point${point}`] || 1;
            return {
                outcome: 'point',
                description: `Point: ${point}`,
                payout: this.currentBet * (multiplier + 1),
                multiplier: multiplier,
                point: point
            };
        }
        
        // No valid combination - loss
        return {
            outcome: 'noPoint',
            description: 'No Point - Loss',
            payout: 0,
            multiplier: 0
        };
    }
    
    // FIND POINT IN DICE ROLL
    findPoint(sortedDice) {
        // Check each possible pair combination
        if (sortedDice[0] === sortedDice[1]) {
            return sortedDice[2]; // Third die is the point
        }
        if (sortedDice[1] === sortedDice[2]) {
            return sortedDice[0]; // First die is the point
        }
        if (sortedDice[0] === sortedDice[2]) {
            return sortedDice[1]; // Middle die is the point
        }
        
        return null; // No pair found
    }
    
    // GET KEITH-STYLE COMMENTARY
    getCommentary(outcome) {
        let commentaryArray;
        
        switch (outcome) {
            case '456':
                commentaryArray = this.keithCommentary.win456;
                break;
            case 'trips':
                commentaryArray = this.keithCommentary.winTrips;
                break;
            case '123':
                commentaryArray = this.keithCommentary.lose123;
                break;
            case 'point':
                commentaryArray = this.keithCommentary.regularWin;
                break;
            default:
                commentaryArray = this.keithCommentary.regularLose;
        }
        
        return commentaryArray[Math.floor(Math.random() * commentaryArray.length)];
    }
    
    // SET BET AMOUNT
    setBet(amount) {
        if (this.rolling) return false;
        if (amount < this.minBet || amount > this.maxBet || amount > this.balance) {
            return false;
        }
        
        this.currentBet = amount;
        return true;
    }
    
    // GET GAME STATISTICS
    getStats() {
        const totalGames = this.wins + this.losses;
        const winPercentage = totalGames > 0 ? (this.wins / totalGames * 100).toFixed(1) : 0;
        const actualRTP = this.totalWagered > 0 ? (this.totalWon / this.totalWagered * 100).toFixed(1) : 0;
        
        return {
            balance: this.balance,
            currentBet: this.currentBet,
            totalRolls: this.totalRolls,
            wins: this.wins,
            losses: this.losses,
            winPercentage: winPercentage,
            totalWagered: this.totalWagered,
            totalWon: this.totalWon,
            actualRTP: actualRTP,
            rollHistory: this.rollHistory.slice(0, 5) // Last 5 rolls
        };
    }
    
    // GET RULES EXPLANATION
    getRules() {
        return {
            title: "Keith's Cee-Lo Rules",
            rules: [
                "456 = Ultimate Win (10:1 payout)",
                "Any Trips = Big Win (5:1 payout)", 
                "123 = Automatic Loss",
                "Point 6 = 3:1 payout",
                "Point 5 = 2:1 payout",
                "Point 4 = 2:1 payout", 
                "Point 1-3 = 1:1 payout",
                "Point = Pair + single die",
                "No pair = No point = Loss"
            ],
            note: "This is real street Cee-Lo - Keith's favorite dice game!"
        };
    }
    
    // RESET GAME
    reset() {
        this.dice = [1, 1, 1];
        this.lastRoll = [];
        this.rolling = false;
    }
    
    // INITIALIZE ENGINE
    init() {
        console.log('Professional Cee-Lo Engine Initialized');
        console.log('Street rules: 456 wins, 123 loses, trips pay big!');
        this.reset();
        
        // Update UI if elements exist
        this.updateDisplay();
    }
    
    // UPDATE GAME DISPLAY
    updateDisplay() {
        // Update dice display
        const dice1El = document.getElementById('dice1');
        const dice2El = document.getElementById('dice2');
        const dice3El = document.getElementById('dice3');
        
        if (dice1El) dice1El.textContent = this.dice[0];
        if (dice2El) dice2El.textContent = this.dice[1];
        if (dice3El) dice3El.textContent = this.dice[2];
        
        // Update balance display
        const balanceEl = document.getElementById('ceeloBalance');
        if (balanceEl) balanceEl.textContent = this.balance;
        
        // Update bet display
        const betEl = document.getElementById('ceelobBet');
        if (betEl) betEl.value = this.currentBet;
        
        // Update main UI panel
        const chipCount = document.getElementById('chipCount');
        if (chipCount) chipCount.textContent = this.balance;
    }
    
    // ANIMATE DICE ROLL
    animateRoll() {
        const dice1El = document.getElementById('dice1');
        const dice2El = document.getElementById('dice2');
        const dice3El = document.getElementById('dice3');
        
        if (!dice1El || !dice2El || !dice3El) return;
        
        // Add rolling animation class
        [dice1El, dice2El, dice3El].forEach(el => {
            el.classList.add('rolling');
        });
        
        // Animate random numbers for 2 seconds
        const animationInterval = setInterval(() => {
            dice1El.textContent = Math.floor(Math.random() * 6) + 1;
            dice2El.textContent = Math.floor(Math.random() * 6) + 1;
            dice3El.textContent = Math.floor(Math.random() * 6) + 1;
        }, 100);
        
        // Stop animation and show final result
        setTimeout(() => {
            clearInterval(animationInterval);
            dice1El.textContent = this.dice[0];
            dice2El.textContent = this.dice[1];
            dice3El.textContent = this.dice[2];
            
            [dice1El, dice2El, dice3El].forEach(el => {
                el.classList.remove('rolling');
            });
        }, 2000);
    }
    
    // PROFESSIONAL ROLL WITH ANIMATION
    rollWithAnimation() {
        if (this.rolling) return { success: false, message: 'Dice still rolling!' };
        
        // Start animation
        this.animateRoll();
        
        // Execute actual roll
        return this.roll();
    }
}

// GLOBAL CEE-LO ENGINE INSTANCE
window.ceeloEngine = new CeeLoEngine();

// CEE-LO GAME FUNCTIONS FOR HTML
window.rollCeelo = function() {
    const result = window.ceeloEngine.rollWithAnimation();
    
    if (result.success) {
        // Update UI
        window.ceeloEngine.updateDisplay();
        
        // Show result message
        setTimeout(() => {
            const resultEl = document.getElementById('ceeloResult');
            if (resultEl) {
                let message = `<strong>${result.result.description}</strong><br>`;
                
                if (result.result.payout > 0) {
                    message += `You win ${result.result.payout} chips!<br>`;
                } else {
                    message += `You lose ${window.ceeloEngine.currentBet} chips.<br>`;
                }
                
                message += `<em>"${result.commentary}"</em>`;
                resultEl.innerHTML = message;
            }
            
            // Show message popup
            if (typeof window.showMessage === 'function') {
                if (result.result.outcome === '456') {
                    window.showMessage(result.commentary, 'success');
                } else if (result.result.payout > 0) {
                    window.showMessage(`${result.result.description} - ${result.commentary}`, 'success');
                } else {
                    window.showMessage(result.commentary, 'warning2');
                }
            }
        }, 2100);
    } else {
        if (typeof window.showMessage === 'function') {
            window.showMessage(result.message, 'warning3');
        }
    }
    
    return result;
};

window.setCeeloBet = function(amount) {
    const success = window.ceeloEngine.setBet(amount);
    if (success) {
        window.ceeloEngine.updateDisplay();
        
        // Update bet button styling
        document.querySelectorAll('.ceelo-bet-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[onclick="setCeeloBet(${amount})"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }
    return success;
};

window.getCeeloStats = function() {
    return window.ceeloEngine.getStats();
};

window.getCeeloRules = function() {
    return window.ceeloEngine.getRules();
};
