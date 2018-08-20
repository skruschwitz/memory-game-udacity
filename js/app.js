/*
 * Deck with card classess
 */
let myCards = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb'];

//create 'pairs' of the cards in the array by combining myCards with itself
myCards = myCards.concat(myCards);

let deckRack = document.getElementById('deckRack');

let oneStar = document.getElementById('one-star');
let twoStar = document.getElementById('two-star');
let threeStar = document.getElementById('three-star');

let timerDisplay = document.querySelector('.timer');
let movesDisplay = document.querySelector('.moves');
let reset = document.querySelector('.restart');

/* results modal */
let resultBoard = document.getElementById('results-modal');
let finalScore = document.querySelector('.final-score');
let finalTime = document.querySelector('.final-time');
let finalMoves = document.querySelector('.final-moves');
let playAgain = document.querySelector('.play-again');

let revealed = [];
let moveCount = 0;
let matchedcards = [];
let score = 3;
let time = 0;
let timer;



//Gamer over - stop scoring,timer display result modal
function gameOver() {
  //stop time
  clearTimeout(timer);
  //insert final score into modal
  let i = 0;
  while(i < score){
    console.log(finalScore.innerHTML + '-' + score);
    finalScore.innerHTML = finalScore.innerHTML + '<i class="fa fa-star"></i>';
    i++;
  }
  //insert final time into modal
  finalTime.innerHTML = secondsToMinutes(time);
  finalMoves.innerHTML = moveCount;
  //display modal
  resultBoard.style.display = 'block';
}


// Star scoring system
function starRating(reset) {
  console.log(score);
  if (reset == 'reset'){
    threeStar.style.color = '#ff0000';
    twoStar.style.color = '#ff0000';
    oneStar.style.color = '#ff0000';
  }
  else {
  /* defaults to 3 starts */
  if (moveCount * 2 === 32) {
    /* two */
    score = 2;
    threeStar.style.color = '#cccccc';
  }
  if (moveCount * 2 === 48) {
    /* one */
    score = 1;
    twoStar.style.color = '#cccccc';
  }
}
}

//count moves
function moveCounter() {
  moveCount = moveCount + 1;
  movesDisplay.textContent = moveCount;
  //call score function
  starRating();
}

//Pretty up minutes and seconds(dont think anyone will play for hours) https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
function secondsToMinutes(time){
return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
}

//Gamer timer
function startTime() {
  time += 1;
  //call function for 0minutes:00seconds
  timerDisplay.innerHTML = secondsToMinutes(time);
  timer = setTimeout(startTime, 1000);
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
  while (deckRack.firstChild) {
    deckRack.removeChild(deckRack.firstChild);
  }
  //shuffle cards
  myCards = shuffle(myCards);
  //add cards to card holder(#deckRack)
  myCards.forEach(function(element) {
    const newCard = document.createElement('li');
    newCard.classList.add('card');
    const newCardData = document.createElement('i');
    newCardData.className = element;
    const addNewCardData = newCard.appendChild(newCardData);
    const addNewCard = deckRack.appendChild(newCard);
  });
}


deckRack.addEventListener('click', function() {
  // if timer hasnt started start time
  if(time <= 0){
    startTime();
  }
  const card = event.target;
  if (card.className === 'card') {
    //chick for 'playable' card
    if (!card.classList.contains('open') || (!card.classList.contains('show') && !card.classList.contains('match'))) {
      //push to revealed array
      revealed.push(card);
      //display card as in play
      card.classList.add('open', 'show');
      //check to see if two cards have been chosen(2 cards equal a turn)
      if (revealed.length == 2) {

        //check for match
        let cardOne = revealed[0].children[0].classList[1];
        let cardTwo = revealed[1].children[0].classList[1];

        // if match - display as matched - move to matched array
        if (cardOne === cardTwo) {
          revealed.forEach(function(open){
            open.classList.remove('show');
            open.classList.add('match');
            matchedcards.push(open);
          });
        } else {
        //no match - display not match - then hide cards
          revealed.forEach(function(open) {
            open.classList.add('error');
            setTimeout(function() {
              open.classList.remove('open', 'show', 'error');
            }, 500);
          });
        }
        //count move
        moveCounter();
        //check if game is still in play
        if (matchedcards.length == 16) {
          gameOver();
        }
        //empty cards in play array
        revealed = [];
      }
    }
  }
});


//Initialize game
function initGame() {
  revealed = [];
  moveCount = 0;
  matchedcards = [];
  score = 3;
  time = 0;
  timer;
  movesDisplay.textContent = moveCount;
  timerDisplay.innerHTML = '0:00';
  starRating('reset');
  deal();
}

//reset game - while playing
reset.addEventListener('click',function(){
  clearTimeout(timer);
  initGame();
});

//play again from - result modal
playAgain.addEventListener('click',function(){
  resultBoard.style.display = 'none';
  initGame();
});

initGame();
