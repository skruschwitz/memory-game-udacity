/*
 * Create a list that holds all of your cards
 */
let myCards = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb'];


let heroDeck = document.getElementById('heroDeck');
let reset = document.querySelector('.restart');
let theDeck = document.querySelectorAll('.card');
let revealed = [];
let movecount = 0;
let matchedcards = [];
let time = 0;
let countTime;
let resultBoard = document.getElementById('results-modal');

let oneStar = document.getElementById('one-star');
let twoStar = document.getElementById('two-star');
let threeStar = document.getElementById('three-star');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided 'shuffle' method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Simple functions -

function gameOver() {
  //display modal
  clearTimeout(countTime);
  resultBoard.style.display = 'block';
}


// Star scoring system
function starRating(moves, match) {
  console.log(moves + '- - ' + match);
  if (moves * 2 < 32) {
    /* three */
    threeStar.style.color = '#ff0000';
    twoStar.style.color = '#ff0000';
    oneStar.style.color = '#ff0000';
  } else if (moves * 2 <= 40) {
    /* two */
    threeStar.style.color = '#cccccc';
    twoStar.style.color = '#ff0000';
    oneStar.style.color = '#ff0000';
  } else if (moves * 2 <= 48) {
    /* two */
    threeStar.style.color = '#cccccc';
    twoStar.style.color = '#cccccc';
    oneStar.style.color = '#ff0000';
  } else {
    /* one */
    threeStar.style.color = '#cccccc';
    twoStar.style.color = '#cccccc';
    oneStar.style.color = '#cccccc';
  }
}

function moveCounter() {
  console.log('time-' + time);
  movecount = movecount + 1;
  document.querySelector('.moves').textContent = movecount;
  starRating(movecount, matchedcards.length);
}

// Function to start game timer.
function startTime() {
  time += 1;
  document.querySelector('.timer').innerHTML = time;
  countTime = setTimeout(startTime, 1000);
}


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


function deal() {
  //kill deck holder children off - https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
  while (heroDeck.firstChild) {
    heroDeck.removeChild(heroDeck.firstChild);
  }
  //shuffle cards
  myCards = shuffle(myCards);
  //add cards to card holder
  myCards.forEach(function(element) {
    const newCard = document.createElement('li');
    newCard.classList.add('card');
    const newCardData = document.createElement('i');
    newCardData.className = element;
    const addNewCardData = newCard.appendChild(newCardData);
    const addNewCard = heroDeck.appendChild(newCard);
  });
}


heroDeck.addEventListener('click', function() {
  if(time <= 0){
    startTime();
  }
  const card = event.target;
  if (card.className === 'card') {
    console.log('card - ' + card);
    if (!card.classList.contains('open') || (!card.classList.contains('show') && !card.classList.contains('match'))) {

      revealed.push(card);

      card.classList.add('open', 'show');

      if (revealed.length == 2) {
        console.log(revealed[0].children[0].classList[1]);

        //check for match
        let cardOne = revealed[0].children[0].classList[1];
        let cardTwo = revealed[1].children[0].classList[1];
        console.log(cardOne + cardTwo);
        if (cardOne === cardTwo) {
          revealed.forEach(function(open) {
            //console.log(open + '-this is open');
            open.classList.remove('show');
            open.classList.add('match');
            matchedcards.push(open);
            //console.log(matchedcards);
            if (matchedcards.length == 16) {
              gameOver();
            }
          });
        } else {
          revealed.forEach(function(open) {
            open.classList.add('error');
            setTimeout(function() {
              open.classList.remove('open', 'show', 'error');
            }, 500);
          });
        }
        //remove active cards
        moveCounter();
        revealed = [];
      }
    }
  }
});

function init() {
  deal();
  //zero vars
}

init();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of 'open' cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
