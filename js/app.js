/*
 * Create a list that holds all of your cards
 */
 let myCards = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb","fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb"];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function deal(){
  myCards = shuffle(myCards);
  myCards.forEach(function(element) {
    //document.getElementById('alt-deck').innerHTML = '<li><i class="fa ' + element+'"></i>';
    const newCard = document.createElement('li');
    newCard.className = "card";
    const newCardData = document.createElement('i');
    newCardData.className = element;

    const addNewCardData = newCard.appendChild(newCardData);
    console.log(newCard);
  const addNewCard = altDeck.appendChild(newCard);
  //console.log('<li><i class="fa ' + element+'"><\/i>');
});
}
/*
for (let i = 0; i < card_names.length; i++) {

    const newCard = document.createElement('li');
    newCard.className = "card";
    const newCardData = document.createElement('i');
    newCardData.className = card_names[i];

    const addNewCardData = newCard.appendChild(newCardData);
    const addNewCard = deck.appendChild(newCard);
}
}*/
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

let heroDeck = document.getElementById('deck');

let reset = document.querySelector('.restart');
let theDeck = document.querySelectorAll('.card');
let revealed = [];
let movecount = 0;
let matchedcards = [];
let timer = 0;
let timePTR;
let resultBoard = document.getElementById('results-modal');

let oneStar = document.querySelector('one-stars');
let twoStar = document.querySelector('two-stars');
let threeStar = document.querySelector('three-stars');

function starRating(moves){
  console.log(moves);
}

// Function to start game timer.
function startTimer(){
    timer += 1;
    //document.getElementById("timer").innerHTML = timer;
    timePTR = setTimeout(startTimer, 1000);
}


function gameOver(){
  //display modal
  clearTimeout(timePTR);
  resultBoard.style.display='block';
}

function moveCounter() {
    movecount = movecount + 1;
    console.log(movecount);
    document.querySelector('.moves').textContent = movecount;
    starRating(movecount);
}

//reset listener - function ??
reset.addEventListener('click', function(e) {
  matchedcards = [];
  movecount = 0;
  deal();
  theDeck.forEach(function(thecards){
    thecards.classList.remove('match', 'open', 'show');
    document.querySelector('.moves').textContent = 0;
  });
  startTimer();
});

console.log(theDeck);

theDeck.forEach(function(card) {
  card.addEventListener('click', function(e) {

      if (!card.classList.contains('open') || (!card.classList.contains('show') && !card.classList.contains('match'))) {



        revealed.push(card);

        card.classList.add('open', 'show');

        if (revealed.length == 2){
            moveCounter(1);
            //check for match
            var cardOne = revealed[0].children[0].classList[1];
            var cardTwo = revealed[1].children[0].classList[1];

            if (cardOne === cardTwo) {
              revealed.forEach(function(open){
                console.log(open + '-this is open');
              open.classList.remove('show');
              open.classList.add('match');
              matchedcards.push(open);
              console.log(matchedcards);
              if (matchedcards.length == 16) {
                gameOver();
              }
              });
            }
            else {
            revealed.forEach(function(open){
            open.classList.remove('open', 'show');
            });
          }
          //reset reveal
          revealed = [];
        }

      }

});
});
