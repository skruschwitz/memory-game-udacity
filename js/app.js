/*
 * Create a list that holds all of your cards
 */


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

let reset = document.querySelector('.restart');
let theDeck = document.querySelectorAll('.card');
let revealed = [];
let movecount = 0;
let matchedcards = [];
/*
function timerFunc() {
  setInterval(function () {
  }, 1000);
};
*/

/*
timer from  https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
*/

var sec = 0;
function pad ( val ) { return val > 9 ? val : "0" + val; }
setInterval( function(){
    document.getElementById("seconds").innerHTML=pad(++sec%60);
    document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
    console.log(pad(++sec%60));
}, 1000);



function moveCounter() {
    movecount = movecount + 1;
  console.log(movecount);
document.querySelector('.moves').textContent = movecount;
}


reset.addEventListener('click', function(e) {
  theDeck.forEach(function(thecards){
    thecards.classList.remove('match', 'open', 'show');
    document.querySelector('.moves').textContent = 0;
    movecount = 0;
  });
});

console.log(theDeck);

theDeck.forEach(function(card) {
  card.addEventListener('click', function(e) {

      if (!card.classList.contains('open') || !card.classList.contains('show') || !card.classList.contains('match')) {



        revealed.push(card);

        card.classList.add('open', 'show');

        if (revealed.length == 2){
            moveCounter(1);
            //check for match
            var cardOne = revealed[0].children[0].classList[1];
            var cardTwo = revealed[1].children[0].classList[1];

            if (cardOne === cardTwo) {
              revealed.forEach(function(open){

              open.classList.remove('show');
              open.classList.add('match');
              matchedcards.push(open);
              console.log(matchedcards);
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
