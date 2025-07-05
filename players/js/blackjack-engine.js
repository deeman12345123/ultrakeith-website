// PROFESSIONAL BLACKJACK ENGINE
// Keith's Players Club Casino-Grade Blackjack

class BlackjackEngine {
    constructor() {
        this.decks = 6; // 6-deck shoe (standard casino)
        this.penetration = 0.75; // Deal 75% of shoe before shuffle
        this.dealerStandsOn17 = true;
        this.blackjackPayout = 1.5; // 3:2 blackjack payout
        this.surrenderAllowed = true;
        this.doubleAfterSplitAllowed = true;
        this.maxSplits = 3;
        this.minBet = 25;
        this.maxBet = 500;
        
        this.shoe = [];
        this.discardTray = [];
        this.playerHands = [[]];
        this.dealerHand = [];
        this.currentHandIndex = 0;
        this.bets = [100];
        this.gameState = 'waiting'; // waiting, dealing, playing, dealer, finished
        this.balance = 500;
        
        // Statistics tracking
        this.handsPlayed = 0;
        this.handsWon = 0;
        this.blackjacksHit = 0;
        this.totalWagered = 0;
        this.totalWon = 0;
        this.actualRTP = 0;
        
        this.initializeShoe();
    }
    
    // CREATE AND SHUFFLE 6-DECK SHOE
    initializeShoe() {
        this.shoe = [];
        const suits = ['♠', '♥', '♦', '♣'];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        
        // Create 6 decks
        for (let deck = 0; deck < this.decks; deck++) {
            for (let suit of suits) {
                for (let rank of ranks) {
                    this.shoe.push({
                        rank: rank,
                        suit: suit,
                        value: this.getCardValue(rank),
                        id: `${rank}${suit}${deck}`
                    });
                }
            }
        }
        
        this.shuffleShoe();
        console.log(`Blackjack: ${this.decks}-deck shoe initialized (${this.shoe.length} cards)`);
    }
    
    // PROFESSIONAL CASINO SHUFFLE
    shuffleShoe() {
        // Fisher-Yates shuffle algorithm
        for (let i = this.shoe.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.shoe[i], this.shoe[j]] = [this.shoe[j], this.shoe[i]];
        }
        
        // Insert shuffle card at penetration point
        this.shufflePoint = Math.floor(this.shoe.length * this.penetration);
        console.log(`Shoe shuffled. Shuffle point: ${this.shufflePoint}`);
    }
    
    // GET CARD VALUE FOR BLACKJACK
    getCardValue(rank) {
        if (rank === 'A') return 11; // Ace starts as 11
        if (['J', 'Q', 'K'].includes(rank)) return 10;
        return parseInt(rank);
    }
    
    // DEAL SINGLE CARD FROM SHOE
    dealCard() {
        if (this.shoe.length <= this.shufflePoint) {
            console.log('Shuffle needed - reshuffling shoe');
            this.shoe = [...this.shoe, ...this.discardTray];
            this.discardTray = [];
            this.shuffleShoe();
        }
        
        return this.shoe.pop();
    }
    
    // CALCULATE HAND VALUE WITH ACE HANDLING
    calculateHandValue(hand) {
        let value = 0;
        let aces = 0;
        
        for (let card of hand) {
            if (card.rank === 'A') {
                aces++;
                value += 11;
            } else {
                value += card.value;
            }
        }
        
        // Convert aces from 11 to 1 if over 21
        while (value > 21 && aces > 0) {
            value -= 10;
            aces--;
        }
        
        return value;
    }
    
    // CHECK IF HAND IS SOFT (HAS USABLE ACE)
    isSoftHand(hand) {
        let value = 0;
        let aces = 0;
        
        for (let card of hand) {
            if (card.rank === 'A') {
                aces++;
                value += 11;
            } else {
                value += card.value;
            }
        }
        
        return aces > 0 && value <= 21;
    }
    
    // START NEW GAME
    startGame(betAmount) {
        if (betAmount < this.minBet || betAmount > this.maxBet) {
            return { success: false, message: `Bet must be between ${this.minBet} and ${this.maxBet}` };
        }
        
        if (betAmount > this.balance) {
            return { success: false, message: 'Insufficient balance' };
        }
        
        // Reset game state
        this.playerHands = [[]];
        this.dealerHand = [];
        this.currentHandIndex = 0;
        this.bets = [betAmount];
        this.gameState = 'dealing';
        
        // Deduct bet from balance
        this.balance -= betAmount;
        this.totalWagered += betAmount;
        
        // Deal initial cards
        this.playerHands[0].push(this.dealCard());
        this.dealerHand.push(this.dealCard());
        this.playerHands[0].push(this.dealCard());
        this.dealerHand.push(this.dealCard());
        
        // Check for blackjacks
        const playerValue = this.calculateHandValue(this.playerHands[0]);
        const dealerValue = this.calculateHandValue(this.dealerHand);
        
        if (playerValue === 21 && dealerValue === 21) {
            return this.endGame('push');
        } else if (playerValue === 21) {
            this.blackjacksHit++;
            return this.endGame('blackjack');
        } else if (dealerValue === 21) {
            return this.endGame('dealer_blackjack');
        }
        
        this.gameState = 'playing';
        return {
            success: true,
            playerHands: this.playerHands,
            dealerHand: [this.dealerHand[0]], // Hide dealer hole card
            gameState: this.gameState,
            currentHand: this.currentHandIndex,
            availableActions: this.getAvailableActions()
        };
    }
    
    // GET AVAILABLE PLAYER ACTIONS
    getAvailableActions() {
        const hand = this.playerHands[this.currentHandIndex];
        const handValue = this.calculateHandValue(hand);
        const actions = [];
        
        if (handValue < 21) {
            actions.push('hit');
            actions.push('stand');
            
            // Double down (only on first two cards)
            if (hand.length === 2 && this.balance >= this.bets[this.currentHandIndex]) {
                actions.push('double');
            }
            
            // Split (only on first two cards of same rank)
            if (hand.length === 2 && 
                hand[0].rank === hand[1].rank && 
                this.playerHands.length < this.maxSplits &&
                this.balance >= this.bets[this.currentHandIndex]) {
                actions.push('split');
            }
            
            // Surrender (only on first two cards)
            if (hand.length === 2 && this.surrenderAllowed) {
                actions.push('surrender');
            }
        }
        
        return actions;
    }
    
    // PLAYER HIT
    hit() {
        if (this.gameState !== 'playing') {
            return { success: false, message: 'Game not in playing state' };
        }
        
        const hand = this.playerHands[this.currentHandIndex];
        hand.push(this.dealCard());
        
        const handValue = this.calculateHandValue(hand);
        
        if (handValue > 21) {
            // Hand busted, move to next hand or dealer
            return this.nextHandOrDealer();
        }
        
        return {
            success: true,
            playerHands: this.playerHands,
            currentHand: this.currentHandIndex,
            availableActions: this.getAvailableActions()
        };
    }
    
    // PLAYER STAND
    stand() {
        if (this.gameState !== 'playing') {
            return { success: false, message: 'Game not in playing state' };
        }
        
        return this.nextHandOrDealer();
    }
    
    // PLAYER DOUBLE DOWN
    double() {
        if (this.gameState !== 'playing') {
            return { success: false, message: 'Game not in playing state' };
        }
        
        const hand = this.playerHands[this.currentHandIndex];
        if (hand.length !== 2) {
            return { success: false, message: 'Can only double on first two cards' };
        }
        
        const betAmount = this.bets[this.currentHandIndex];
        if (betAmount > this.balance) {
            return { success: false, message: 'Insufficient balance to double' };
        }
        
        // Double the bet
        this.balance -= betAmount;
        this.bets[this.currentHandIndex] *= 2;
        this.totalWagered += betAmount;
        
        // Deal exactly one more card
        hand.push(this.dealCard());
        
        // Automatically stand after doubling
        return this.nextHandOrDealer();
    }
    
    // PLAYER SPLIT
    split() {
        if (this.gameState !== 'playing') {
            return { success: false, message: 'Game not in playing state' };
        }
        
        const hand = this.playerHands[this.currentHandIndex];
        if (hand.length !== 2 || hand[0].rank !== hand[1].rank) {
            return { success: false, message: 'Can only split pairs' };
        }
        
        const betAmount = this.bets[this.currentHandIndex];
        if (betAmount > this.balance) {
            return { success: false, message: 'Insufficient balance to split' };
        }
        
        // Create new hand with second card
        const newHand = [hand.pop()];
        this.playerHands.push(newHand);
        this.bets.push(betAmount);
        
        // Deduct bet for new hand
        this.balance -= betAmount;
        this.totalWagered += betAmount;
        
        // Deal second card to both hands
        hand.push(this.dealCard());
        newHand.push(this.dealCard());
        
        return {
            success: true,
            playerHands: this.playerHands,
            currentHand: this.currentHandIndex,
            availableActions: this.getAvailableActions()
        };
    }
    
    // PLAYER SURRENDER
    surrender() {
        if (this.gameState !== 'playing') {
            return { success: false, message: 'Game not in playing state' };
        }
        
        const hand = this.playerHands[this.currentHandIndex];
        if (hand.length !== 2) {
            return { success: false, message: 'Can only surrender on first two cards' };
        }
        
        // Return half the bet
        const halfBet = Math.floor(this.bets[this.currentHandIndex] / 2);
        this.balance += halfBet;
        
        return this.endGame('surrender');
    }
    
    // MOVE TO NEXT HAND OR DEALER TURN
    nextHandOrDealer() {
        this.currentHandIndex++;
        
        if (this.currentHandIndex < this.playerHands.length) {
            // More hands to play
            return {
                success: true,
                playerHands: this.playerHands,
                currentHand: this.currentHandIndex,
                availableActions: this.getAvailableActions()
            };
        } else {
            // All hands played, dealer's turn
            return this.playDealerHand();
        }
    }
    
    // DEALER PLAYS HAND
    playDealerHand() {
        this.gameState = 'dealer';
        
        // Check if all player hands busted
        const allBusted = this.playerHands.every(hand => 
            this.calculateHandValue(hand) > 21
        );
        
        if (allBusted) {
            return this.endGame('all_busted');
        }
        
        // Dealer hits until 17 or higher (or soft 17 rule)
        while (this.shouldDealerHit()) {
            this.dealerHand.push(this.dealCard());
        }
        
        return this.endGame('compare');
    }
    
    // DEALER HITTING LOGIC
    shouldDealerHit() {
        const dealerValue = this.calculateHandValue(this.dealerHand);
        
        if (dealerValue < 17) return true;
        if (dealerValue > 17) return false;
        
        // Exactly 17 - check soft 17 rule
        if (this.dealerStandsOn17) return false;
        
        // Hit on soft 17
        return this.isSoftHand(this.dealerHand);
    }
    
    // END GAME AND CALCULATE PAYOUTS
    endGame(outcome) {
        this.gameState = 'finished';
        this.handsPlayed++;
        
        let totalPayout = 0;
        const results = [];
        
        if (outcome === 'blackjack') {
            const payout = Math.floor(this.bets[0] * (1 + this.blackjackPayout));
            this.balance += payout;
            this.totalWon += payout;
            this.handsWon++;
            results.push({ hand: 0, result: 'blackjack', payout });
            
        } else if (outcome === 'push') {
            this.balance += this.bets[0]; // Return bet
            results.push({ hand: 0, result: 'push', payout: this.bets[0] });
            
        } else if (outcome === 'dealer_blackjack' || outcome === 'all_busted') {
            // All bets lost (already deducted)
            for (let i = 0; i < this.playerHands.length; i++) {
                results.push({ hand: i, result: 'lose', payout: 0 });
            }
            
        } else if (outcome === 'surrender') {
            results.push({ hand: 0, result: 'surrender', payout: Math.floor(this.bets[0] / 2) });
            
        } else if (outcome === 'compare') {
            const dealerValue = this.calculateHandValue(this.dealerHand);
            const dealerBusted = dealerValue > 21;
            
            for (let i = 0; i < this.playerHands.length; i++) {
                const hand = this.playerHands[i];
                const handValue = this.calculateHandValue(hand);
                const handBusted = handValue > 21;
                
                if (handBusted) {
                    results.push({ hand: i, result: 'lose', payout: 0 });
                } else if (dealerBusted || handValue > dealerValue) {
                    const payout = this.bets[i] * 2;
                    this.balance += payout;
                    this.totalWon += payout;
                    this.handsWon++;
                    results.push({ hand: i, result: 'win', payout });
                } else if (handValue < dealerValue) {
                    results.push({ hand: i, result: 'lose', payout: 0 });
                } else {
                    this.balance += this.bets[i]; // Push - return bet
                    results.push({ hand: i, result: 'push', payout: this.bets[i] });
                }
            }
        }
        
        // Update RTP
        this.actualRTP = this.totalWagered > 0 ? this.totalWon / this.totalWagered : 0;
        
        // Move cards to discard tray
        this.discardTray.push(...this.playerHands.flat(), ...this.dealerHand);
        
        return {
            success: true,
            outcome,
            results,
            dealerHand: this.dealerHand,
            playerHands: this.playerHands,
            balance: this.balance,
            gameState: this.gameState
        };
    }
    
    // GET GAME STATISTICS
    getStats() {
        return {
            balance: this.balance,
            handsPlayed: this.handsPlayed,
            handsWon: this.handsWon,
            winPercentage: this.handsPlayed > 0 ? (this.handsWon / this.handsPlayed * 100).toFixed(1) : 0,
            blackjacksHit: this.blackjacksHit,
            totalWagered: this.totalWagered,
            totalWon: this.totalWon,
            actualRTP: (this.actualRTP * 100).toFixed(1),
            cardsRemaining: this.shoe.length
        };
    }
    
    // SET NEW BET AMOUNT
    setBet(amount) {
        if (this.gameState !== 'waiting' && this.gameState !== 'finished') {
            return false;
        }
        
        if (amount < this.minBet || amount > this.maxBet || amount > this.balance) {
            return false;
        }
        
        this.currentBet = amount;
        return true;
    }
    
    // RESET GAME STATE
    reset() {
        this.gameState = 'waiting';
        this.playerHands = [[]];
        this.dealerHand = [];
        this.currentHandIndex = 0;
        this.bets = [];
    }
    
    // INITIALIZE ENGINE
    init() {
        console.log('Professional Blackjack Engine Initialized');
        console.log('Rules: 6-deck shoe, dealer stands on 17, 3:2 blackjack');
        console.log('Surrender allowed, double after split allowed');
        this.reset();
    }
}

// GLOBAL BLACKJACK ENGINE INSTANCE
window.blackjackEngine = new BlackjackEngine();

// BLACKJACK GAME FUNCTIONS FOR HTML
window.startBlackjackGame = function(betAmount) {
    return window.blackjackEngine.startGame(betAmount);
};

window.blackjackHit = function() {
    return window.blackjackEngine.hit();
};

window.blackjackStand = function() {
    return window.blackjackEngine.stand();
};

window.blackjackDouble = function() {
    return window.blackjackEngine.double();
};

window.blackjackSplit = function() {
    return window.blackjackEngine.split();
};

window.blackjackSurrender = function() {
    return window.blackjackEngine.surrender();
};

window.getBlackjackStats = function() {
    return window.blackjackEngine.getStats();
};

window.setBlackjackBet = function(amount) {
    return window.blackjackEngine.setBet(amount);
};
