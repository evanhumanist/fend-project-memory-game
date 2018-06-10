const CARDS_CONTENT = document.querySelectorAll('.card > i'); //Targets the content of the cards
const CARD = document.querySelectorAll('.card'); //Targets the cards directly
const WIN_CONTENT = document.querySelector('.win'); //Targets the Win section
let deckArray = ['fa-gem', 'fa-paper-plane', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-gem', 'fa-paper-plane', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb']; //Our array of card items
const DECK = document.querySelector('.deck'); //Targets the Deck
const HEADING = document.querySelector('.header-container'); //Targets the Heading section
const SCORE_PANEL = document.querySelector('.score-panel'); //Targets the Score Panel
const MOVES = document.querySelector('.moves'); //Targets the Moves counter in the Score Panel
const WIN_MOVES = document.querySelector('.win-moves'); //Targets the moves section on the Win screen
const WIN_STARS = document.querySelector('.win-stars'); //Targets the stars section on the Win screen
const STARS = document.querySelector('.stars').getElementsByClassName('fa-star'); //Targets the Stars in the Score Panel
const RESTART = document.querySelector('.restart'); //Targets the Restart button on the main screen
const TIMER = document.querySelector('.timer'); //Targets the Timer on the main screen
const WIN_BUTTON = document.querySelector('.win-button'); //Targets the Restart button on the Win screen
const TIME_ELAPSED_MINUTES = document.querySelector('.time-elapsed-minutes');
const TIME_ELAPSED_SECONDS = document.querySelector('.time-elapsed-seconds');
let firstCard = ''; //Keeps track of first selected card
let cardFlipping = false; //Keeps track of if card flip is in process. If it is, then no other card can be flipped
let matches = 0; //Keeps track of the amount of matches to trigger a win
let moveCounter = 0; //Keeps track of the amount of moves
let stars = 3; //Keeps track of the amount of stars
let secondsRunning = 0; //Timer
let timerStop = false;

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
    let minuteText = ' Minutes';
    let secondText = ' Seconds';
    timerStop = true;
    WIN_MOVES.textContent = moveCounter.toString();
    if (stars === 1) {
        WIN_STARS.textContent = "1 star";
    } else {
        WIN_STARS.textContent = stars + " stars";
    };
    if (secondsRunning > 59) {
        if (secondsRunning < 120) {
            minuteText = ' Minute';
        }
        TIME_ELAPSED_MINUTES.textContent = Math.floor(secondsRunning / 60).toString() + minuteText;
    };
    if (secondsRunning % 60 === 1) {
        secondText = ' Second';
    };
    TIME_ELAPSED_SECONDS.textContent = (secondsRunning % 60).toString() + secondText;
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
                setTimeout(function() {
                    evt.target.classList.toggle('show');
                }, 200);
                setTimeout(function() {
                    evt.target.classList.replace('open', 'mismatch');
                    firstCard.classList.replace('open', 'mismatch');
                }, 500);
                setTimeout(function() {
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
            secondsRunning = 0;
            TIMER.textContent = "00:00";
            timerStop = false;
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

//Runs the code that updates the timer
setInterval(function() {
        if (timerStop === false) {
            let minutesFormatted = '';
            let secondsFormatted = '';
            let minutesRunning = 0;
            secondsRunning += 1;
            minutesRunning = Math.floor(secondsRunning / 60);
            if (minutesRunning < 10) {
                minutesFormatted = "0" + minutesRunning.toString();
            } else {
                minutesFormatted = minutesRunning.toString();
            };
            if (secondsRunning % 60 < 10) {
                secondsFormatted = "0" + (secondsRunning % 60).toString();
            } else {
                secondsFormatted = (secondsRunning % 60).toString();
            };
            TIMER.textContent = minutesFormatted + ':' + secondsFormatted;
        }
    }, 1000);