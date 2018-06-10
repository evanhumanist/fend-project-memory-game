const CARDS_CONTENT = document.querySelectorAll('.card > i'); //Targets the content of the cards
const CARD = document.querySelectorAll('.card');
const WIN_CONTENT = document.querySelector('.win');
let deckArray = ['fa-gem', 'fa-paper-plane', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-gem', 'fa-paper-plane', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb']; //Our array of card items
const DECK = document.querySelector('.deck');
const HEADING = document.querySelector('.header-container');
const SCORE_PANEL = document.querySelector('.score-panel');
const MOVES = document.querySelector('.moves');
const WIN_MOVES = document.querySelector('.win-moves');
const WIN_STARS = document.querySelector('.win-stars');
const STARS = document.querySelector('.stars').getElementsByClassName('fa-star');
const RESTART = document.querySelector('.restart');
const WIN_BUTTON = document.querySelector('.win-button');
let firstCard = ''; //Keeps track of first selected card
let cardFlipping = false;
let matches = 0;
let moveCounter = 0;
let stars = 3;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Increments the move counter by 1
function increaseMoveCounter() {
    moveCounter += 1;
    MOVES.textContent = moveCounter.toString();
}

//Decreases stars depending on the amount of moves
function starCheck() {
    if (moveCounter === 12) {
        STARS[2].classList.toggle('fas');
        STARS[2].classList.toggle('far');
        stars -= 1;
    } else if (moveCounter === 18) {
        STARS[1].classList.toggle('fas');
        STARS[1].classList.toggle('far');
        stars -= 1;
    }
}

//Displays the Win screen
function win() {
    WIN_MOVES.textContent = moveCounter.toString();
    if (stars === 1) {
        WIN_STARS.textContent = "1 star";
    } else {
        WIN_STARS.textContent = stars + " stars";
    };
    DECK.classList.toggle('hide');
    HEADING.classList.toggle('hide');
    SCORE_PANEL.classList.toggle('hide');
    WIN_CONTENT.classList.toggle('hide');
}

//React to cards being clicked, match/mismatch/win
function cardClicked(evt) {
    if (evt.target.nodeName === 'LI' && ! evt.target.classList.contains('open') && ! evt.target.classList.contains('match') && cardFlipping === false) {
        cardFlipping = true;
        if (firstCard === '') {
            evt.target.classList.replace('closed', 'open');
            setTimeout(function () {
                evt.target.classList.toggle('show');
                cardFlipping = false;
            }, 200);
            firstCard = evt.target;
        } else {
            increaseMoveCounter();
            starCheck();

            //found a match
            if (evt.target.firstElementChild.classList.toString() === firstCard.firstElementChild.classList.toString()) {
                evt.target.classList.replace('closed', 'open');
                setTimeout(function () {
                    evt.target.classList.toggle('show');
                }, 200);
                setTimeout(function () {
                    evt.target.classList.replace('open', 'match');
                    firstCard.classList.replace('open', 'match');
                    firstCard = '';
                    cardFlipping = false;
                    matches += 1;
                    if (matches === deckArray.length / 2 ) {
                        setTimeout(function () {
                            win();
                        }, 700);
                    };
                }, 500);
            } else { //Not a match
                evt.target.classList.replace('closed', 'open');
                setTimeout(function () {
                    evt.target.classList.toggle('show');
                }, 200);
                setTimeout(function () {
                    evt.target.classList.replace('open', 'mismatch');
                    firstCard.classList.replace('open', 'mismatch');
                }, 500);
                setTimeout(function () {
                    evt.target.classList.remove('mismatch', 'show');
                    firstCard.classList.remove('mismatch', 'show');
                    evt.target.classList.toggle('closed');
                    firstCard.classList.toggle('closed');
                    firstCard = '';
                    cardFlipping = false;
                }, 1500);
            };
        };
    };
}

//Starts/restarts the game
function restart() {
    if (cardFlipping === false) {
        //Shuffles the deck and initializes the items on the cards
        deckArray = shuffle(deckArray);
        for(const index in deckArray) {
            CARD[index].classList = "card closed";
            CARDS_CONTENT[index].classList = "fas";
            CARDS_CONTENT[index].classList.toggle(deckArray[index]);
            stars = 3;
            STARS[1].classList = 'fas fa-star';
            STARS[2].classList = 'fas fa-star';
            moveCounter = 0;
            matches = 0;
            MOVES.textContent = 0;
            DECK.classList.toggle('hide', false);
            HEADING.classList.toggle('hide', false);
            SCORE_PANEL.classList.toggle('hide', false);
            WIN_CONTENT.classList.toggle('hide', true);
        };
    };

};

//Runs the restart function when the code first runs
restart();

//Flips cards when clicked
DECK.addEventListener('click', cardClicked);

//Runs the restart code when clicked
RESTART.addEventListener('click', restart);
WIN_BUTTON.addEventListener('click', restart);
