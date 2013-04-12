var nextPlayerId = 1;

var DeckParser = function(wcd) {
    var self = this;
    
    var split = wcd.split('\n');
    var splitwc = wcd.toLowerCase().split('\n'); //parse in lower case
    for (var i = 0; i < split.length; i++) {
        if (split[i].charAt(0) === '-') { //this is an identifier line
            if (splitwc[i] === '-deckname') {
                i++;
                self.deckName = split[i];
            } else if (splitwc[i] === '-playername') {
                i++;
                self.playerName = split[i];
            } else if (splitwc[i] === '-mainboard') {
                self.mainBoard = [];
                i++;
                for (; i < split.length && split[i].charAt(0) !== '-'; i++) {
                    self.mainBoard.push(split[i]);
                }
                i--;
            } else if (splitwc[i] === '-sideboard') {
                self.sideBoard = [];
                i++;
                for (; i < split.length && split[i].charAt(0) !== '-'; i++) {
                    self.sideBoard.push(split[i]);
                }
                i--;
            }
        }
        
    }
    
    self.deckName = self.deckName ? self.deckName : 'Deck';
    self.playerName = self.playerName ? self.playerName : 'Player 1';
    if (!self.mainBoard || !self.mainBoard[0]) {
        throw new Error('There was a problem parsing the wcd.');
    }
    if (!self.sideBoard || !self.sideBoard[0]) {
        self.sideBoard = null;
    }
};

var Player = function(wcd) {
    var self = this;
    
    if (!wcd) { //the player requires a deck to play
        throw new Error('Must provide a wcd');
    }
    
    //public methods 
    self.drawCard = function() {
        var card = self.getLibrary().removeCard();
        if (card) {
            self.getHand().addCard(card);
        } else { //player loses the game if they cannot draw a card
            //TODO: self PLAYER LOSES THE GAME
            self._lost = true;
        }

    };
    
    //player values and getters
    self._id = nextPlayerId++;
    self._life = 20;
    self._poison = 0;
    self._playArea = document.getElementById('player' + self._id + '-play');
    self.getId = function() {
        return self._id;
    };
    self.getLife = function() {
        return self._life;
    };
    self._poison = function() {
        return self._poision;
    };
    self.getPlayArea = function() {
        return self._playArea;
    };
    
    //player wcd and getter
    self._wcd = new DeckParser(wcd);
    self.getWcd = function() {
        return self._wcd;
    };
    
    //player wcd values
    self._playerName = self.getWcd().playerName;
    self._deckName = self.getWcd().deckName;
    self._mainBoard = self.getWcd().mainBoard;
    self._sideBoard = self.getWcd().sideBoard;
    
    
    //player objects and getters
    self._library = new Library(self);
    self._hand = new Hand(self);
    self._manaPool = new ManaPool(self);
    self.getLibrary = function () {
        return self._library;
    };
    self.getHand = function() {
        return self._hand;
    };
    self.getManaPool = function() {
        return self._manaPool;
    };
   
};

var ManaPool = function(player) {
    var self = this;
    
    //values and getters
    self._player = player;
    self._manaPool = {
        plains: 0,
        island: 0,
        swamp: 0,
        mountain: 0,
        forest: 0,
        colorless: 0
    };
    self.getPlayer = function() {
        return self._player;
    };
     self.getManaPool = function() {
        return self._manaPool;
    }; 
    
    //setters
    var setMana = function(type, amount) {
        switch (type) {
            case 'island': self.getManaPool().island += amount; break;
            case 'mountain': self.getManaPool().mountain += amount; break;
            case 'forest': self.getManaPool().forest += amount; break;
            case 'swamp': self.getManaPool().swamp += amount; break;
            case 'plains': self.getManaPool().plains += amount; break;
        }
    };
    
    //renderers
    var showManaCount = function() {
        var manaPoolElement = document.getElementById('player' + self.getPlayer().getId() + '-mana-pool');
        var manaPool = manaPoolElement.getElementsByTagName('div');
        for (var mana in manaPool) {
            var node = manaPool[mana];
            if (node.nodeType === 1) {
                if (node.className === 'mana-symbol mana-plains') {
                    node.innerText = self.getManaPool().plains ? self.getManaPool().plains : '';
                } else if (node.className === 'mana-symbol mana-island') {
                    node.innerText = self.getManaPool().island ? self.getManaPool().island : '';
                } else if (node.className === 'mana-symbol mana-swamp') {
                    node.innerText = self.getManaPool().swamp ? self.getManaPool().swamp : '';
                } else if (node.className === 'mana-symbol mana-mountain') {
                    node.innerText = self.getManaPool().mountain ? self.getManaPool().mountain : '';
                } else if (node.className === 'mana-symbol mana-forest') {
                    node.innerText = self.getManaPool().forest ? self.getManaPool().forest : '';
                } else if (node.className === 'mana-symbol mana-colorless') {
                    node.innerText = self.getManaPool().colorless ? self.getManaPool().colorless : '';
                }
            }
        }
    };
    
    //public methods
    self.update = function(type, amount) {
        setMana(type, amount);
        showManaCount();
    };
   
};

var CardLocation = function(player) {
    var self = this;
    
    //values and getters
    self._cards = [];
    self._player = player;
    self.getCards = function() {
        return self._cards;
    };
    self.getPlayer = function() {
        return self._player;
    };
    self.getCount = function() {
        return self.getCards().length;
    };
};

var Library = function(player) {
    var self = this;
    CardLocation.call(self, player);
    
    if (!self.getPlayer()) { //check to make sure self library has a player
        throw new Error('The Library object requires a Player object');
    }

    //public methods
    self.addCard = function(card, pos) {
        if (!pos) {
            pos = 0;
        }
        self.showLibraryCount();
        self.getCards().splice(pos, 0, card);
    };
    self.removeCard = function() {
        var card = self.getCards().pop();
        self.showLibraryCount();
        return card;
    };
    self.shuffle = function() {
        var j, tmp;
        for (var i = self.getCount() - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            tmp = self.getCards()[i];
            self.getCards()[i] = self.getCards()[j];
            self.getCards()[j] = tmp;
        }
    };
    self.showLibraryCount = function() {
        var libraryElement = document.getElementById('player' + self.getPlayer().getId() + '-library-size');
        libraryElement.innerText = self.getCount();
    };

    //private methods
    var buildLibrary = function() {
        var deckArray = self.getPlayer().getWcd().mainBoard;
        var splitCard = null, cardCount = 0, cardSet = 0, cardName = 0;
        
        for (var i = 0; i < deckArray.length; i++) {
            if (deckArray[i]) {
                splitCard = deckArray[i].split(' ', 3);
                cardCount = splitCard[0];
                cardSet = splitCard[1];
                cardName = splitCard[2];
                
                for (var j = 0; j < cardCount; j++) {
                    if (CardFactory.hasOwnProperty(cardName)) {
                        self.addCard(CardFactory[cardName]({
                            player: self.getPlayer(), 
                            cardSet: cardSet
                        }));
                    } else {
                        throw new Error('Could not create a card called ' + cardName);
                    }
                } 
            }
        }
    };

    buildLibrary();
    self.shuffle();
};
Library.prototype = new CardLocation();
Library.prototype.constructor = Library;

var Hand = function(player) {
    var self = this;
    CardLocation.call(self, player);
    
    //values and getters
    self._handElement = document.getElementById('player' + self.getPlayer().getId() + '-hand');
    self.getHandElement = function() {
        return self._handElement;
    }
    
    //public methods
    self.addCard = function(card) {
        var cardImage = new Image();
        card.getCardHandElement().ondblclick = function() {
            card.getData().handClick();
        };
        card.getCardHandElement().className = 'card-hand';
        card.getCardHandElement().style.backgroundImage = 'url("' + card.getImage() + '")';
        self.getHandElement().appendChild(card.getCardHandElement());
        self.getCards().push(card);
        self.showHandCount();
    };
    self.removeCard = function(card) {
        var index = self.getCards().indexOf(card);
        if (index > -1) {
           self.getCards().splice(index, 1);
           self.showHandCount();
        }
    };
    self.playCard = function(card) {
        var index = self.getCards().indexOf(card);
        if (index > -1 ) {
            card.playCard();
            self.removeCard(card);
        }
    };
    self.showHandCount = function() {
        var handElement = document.getElementById('player' + self.getPlayer().getId() + '-hand-size');
        handElement.innerText = self.getCount();
    }; 
};
Hand.prototype = new CardLocation();
Hand.prototype.constructor = Hand;

/*var Graveyard = function(player) {
    CardLocation.call(self, player);
    
   self.showGraveyardCount = function() {
    var graveyardElement = document.getElementById('player' + self.getPlayer().getId() + '-hand-size');
   };
    
};
Graveyard.prototype = new CardLocation();
Graveyard.prototype.constructor = Graveyard;*/