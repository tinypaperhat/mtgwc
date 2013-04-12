var playArea = document.getElementById('play-area');
var wcd = 
    '-DECKNAME\n' + 
    'Lands\n' + 
    '-PLAYERNAME\n' +
    'Jeff McRiffey\n' +
    '-MAINBOARD\n' +
    '8 urzas-saga island\n' +
    '8 urzas-saga plains\n' +
    '8 urzas-saga swamp\n' +
    '8 urzas-saga mountain\n' +
    '8 urzas-saga forest\n';
var playerOne = new Player(wcd);

//draw 7 cards
for (var i = 0; i < 7; i++) {
    playerOne.drawCard();
}

