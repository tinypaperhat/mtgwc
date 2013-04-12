var nextCardId = 0;
var cardImagePath = 'images/card/';

//base card class
var Card = function(config) {
    var self = this;
    
    self._data = {
        name: config && config.name ? config.name : '',
        types: config && config.types ? config.types : [''],
        cost: config && config.cost ? config.cost : 0,
        cardSet: config && config.cardSet ? config.cardSet : '',
        playText: config && config.playText ? config.playText : '',
        flavorText: config && config.flavorText ? config.flavorText : '',
        artist: config && config.artist ? config.artist : '',
        image: config && config.image ? config.image : '',
        controller: config && config.controller ? config.controller : null,
        owner: config && config.owner ? config.owner : null,
        abilities: config && config.abilities ? config.abilities : [null],
        handClick: config && config.handClick ? config.handClick : null
    };
    self._id = nextCardId++;
    self._cardPlayElement = document.createElement('div');
    self._cardHandElement = document.createElement('div');

    //public methods
    self.getCardHandElement = function() {
        return self._cardHandElement;
    };
    self.getCardPlayElement = function() {
        return self._cardPlayElement;
    };
     self.getData = function() {
        return self._data;
    };
    self.getName = function() {
        return self.getData().name;
    };
    self.getController = function() {
        return self.getData().controller;
    };
    self.getAbilities = function() {
        return self.getData().abilities;
    };
    self.getImage = function() {
        return self.getData().image;
    };
    self.getCardSet = function() {
        return self.getData().cardSet;
    };
    self.tapCard = function() {
        self.getCardPlayElement().className += ' tapped';
        self._isTapped = true;
    };
    self.untapCard = function() {
        self.getCardPlayElement().className = 'card';
        self._isTapped = false;
    };
    self.isTapped = function() {
        return self._isTapped;
    };
    
    self.getCardHandElement().onmouseover = function() { //show self card in the card view panel
        var viewElement = document.getElementById('card-view');
        viewElement.innerHTML = '<img class="card-view" src="' + self.getImage() + '">';
    };
    self.getCardPlayElement().onmouseover = function() { //show self card in the card view panel
        var viewElement = document.getElementById('card-view');
        viewElement.innerHTML = '<img class="card-view" src="' + self.getImage() + '">';
    };
};

//LANDS
var BasicLand = function(config) {
    var self = this;
    if (!config) { //config could be empty
        config = {};
    }
    config.types = ['Basic Land'];
    Card.call(self, config);
    self.untapCard();
    self.getData().controller = config.player;
    self.getData().owner = config.player;
    self.getData().cardSet = config.cardSet;
    self.getData().handClick = function() {
            var hand = self.getController().getHand();
            hand.playCard(self);
            hand.getHandElement().removeChild(self.getCardHandElement());
    }
    self.playCard = function() { //play a basic land
        self.getCardPlayElement().className = 'card';
        self.getCardPlayElement().style.backgroundImage = 'url("' + self.getImage() + '")';
        self.getCardPlayElement().ondblclick = function(event) {
            if (self.isTapped()) {
                self.untapCard();
                self.getAbilities().untap.removeMana();
            } else {
                self.tapCard();
                self.getAbilities().tap.addMana();
            }
        };
        self.getController().getPlayArea().appendChild(self.getCardPlayElement());
    };
};
BasicLand.prototype = new Card();
BasicLand.prototype.constructor = BasicLand;

var Land = function(config) {
    var self = this;
    if (!config) {
        config = {};
    }
    config.types.unshift('Land');
    Card.call(self, config);
};
Land.prototype = new Card();
Land.prototype.constructor = Land;

var Island = function(config) {
    var self = this;
    if (!config) {
        config = {};
    }
    BasicLand.call(self, config);
    self.getData().types.push('Island');
    self.getData().name = 'Island';
    self.getData().image = cardImagePath + self.getCardSet() + '/' +  'island.jpg';
    self.getData().abilities = {
        tap: {
            addMana: function() {self.getController().getManaPool().update('island', 1)}
        },
        untap: {
            removeMana: function() {self.getController().getManaPool().update('island', -1)}
        }
    };
};
Island.prototype = new BasicLand();
Island.prototype.constructor = Island;

var Mountain = function(config) {
    var self = this;
    if (!config) {
        config = {};
    }
    BasicLand.call(self, config);
    self.getData().types.push('Mountain');
    self.getData().name = 'Mountain';
    self.getData().image = cardImagePath + self.getCardSet() + '/' + 'mountain.jpg';
    self.getData().abilities = {
        tap: {
            addMana: function() {self.getController().getManaPool().update('mountain', 1)}
        },
        untap: {
            removeMana: function() {self.getController().getManaPool().update('mountain', -1)}
        }
    };
};
Mountain.prototype = new BasicLand();
Mountain.prototype.constructor = Mountain;

var Forest = function(config) {
    var self = this;
    if (!config) {
        config = {};
    }
    BasicLand.call(self, config);
    self.getData().types.push('Forest');
    self.getData().name = 'Forest';
    self.getData().image = cardImagePath + self.getCardSet() + '/' + 'forest.jpg';
    self.getData().abilities = {
        tap: {
            addMana: function() {self.getController().getManaPool().update('forest', 1)}
        },
        untap: {
            removeMana: function() {self.getController().getManaPool().update('forest', -1)}
        }
    };
};
Forest.prototype = new BasicLand();
Forest.prototype.constructor = Forest;

var Swamp = function(config) {
    var self = this;
    if (!config) {
        config = {};
    }
    BasicLand.call(self, config);
    self.getData().types.push('Swamp');
    self.getData().name = 'Swamp';
    self.getData().image = cardImagePath + self.getCardSet() + '/' + 'swamp.jpg';
    self.getData().abilities = {
        tap: {
            addMana: function() {self.getController().getManaPool().update('swamp', 1)}
        },
        untap: {
            removeMana: function() {self.getController().getManaPool().update('swamp', -1)}
        }
    };
};
Swamp.prototype = new BasicLand();
Swamp.prototype.constructor = Swamp;

var Plains = function(config) {
    var self = this;
    if (!config) {
        config = {};
    }
    BasicLand.call(self, config);
    self.getData().types.push('Plains');
    self.getData().name = 'Plains';
    self.getData().image = cardImagePath + self.getCardSet() + '/' + 'plains.jpg';
    self.getData().abilities = {
        tap: {
            addMana: function() {self.getController().getManaPool().update('plains', 1)}
        },
        untap: {
            removeMana: function() {self.getController().getManaPool().update('plains', -1)}
        }
    };
};
Plains.prototype = new BasicLand();
Plains.prototype.constructor = Plains;

//return an object for the given key
var CardFactory = {
    'island': function(player) {return new Island(player)},
    'swamp': function(player) {return new Swamp(player)},
    'plains': function(player) {return new Plains(player)},
    'mountain': function(player) {return new Mountain(player)},
    'forest': function(player) {return new Forest(player)}
};