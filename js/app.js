/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const cardsContent = document.querySelectorAll('.card > i'); //Targets the content of the cards
let deckArray = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb']; //Our array of card items
const card = document.querySelector('.deck');
let firstCard = ''; //Keeps track of first selected card

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Card match function
function cardClicked(evt) {
    if (evt.target.nodeName == 'LI' && ! evt.target.classList.contains('open')) {
        if (firstCard == '') {
            evt.target.classList.toggle('open');
            setTimeout(function (){
              evt.target.classList.toggle('show');
            }, 0);
            firstCard = evt.target.firstElementChild.classList.toString();
        } else if (evt.target.firstElementChild.classList.toString() == firstCard) {
            evt.target.classList.toggle('open');
            setTimeout(function (){
              evt.target.classList.toggle('show');
            }, 0);
            firstCard = '';
        } else {
            // console.log(evt.target.firstElementChild.classList);
            // console.log(firstCard);
        };
    };
}

//Shuffles the deck and initializes the items on the cards
deckArray = shuffle(deckArray);
for(const index in deckArray) {
    cardsContent[index].classList.toggle(deckArray[index]);
};

//Flips cards when clicked
card.addEventListener('click', cardClicked);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
