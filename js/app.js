/*
 * Create a list that holds all of your cards
 */
var cards = document.getElementsByClassName('card');
var cardValue = new Array();
for (var i = 0; i < cards.length; i++){
    cardValue.push(cards[i].innerHTML);
}
var tries = document.querySelector('.moves');
tries.innerHTML = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
shuffle(cardValue);
    for (var i = 0; i < cards.length; i++) {
     cards[i].innerHTML = cardValue[i];
    }

var restart = document.querySelector('.restart');
restart.addEventListener('click', function(){
    shuffle(cardValue);
    for (var i = 0; i < cards.length; i++) {
        cards[i].innerHTML = cardValue[i];
        cards[i].classList.remove('match');
        cards[i].classList.remove('show');
        cards[i].classList.remove('open');
        cards[i].classList.remove('shake');
        cards[i].classList.remove('flipInY');
        cards[i].classList.remove('rubberBand');
        cards[i].addEventListener('click',clicked);
    }
    tries.innerHTML = 0;
});

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
var picked_cards = new Array();
var can_pick = true;
var sucess_move = 0;

function clicked() {
    if(can_pick) {
        var picked = this;
        if(picked_cards.indexOf(picked) == -1) {
            picked_cards.push(picked);
            this.classList.toggle("open");
            this.classList.toggle('show');
            this.classList.toggle('flipInY');
        }

        if(picked_cards.length == 2) {
            tries.innerHTML++;
            can_pick = false;
            if(picked_cards[0].innerHTML == picked_cards[1].innerHTML) {
                setTimeout(function(){
                    picked_cards[0].removeEventListener('click', clicked, false);
                    picked_cards[1].removeEventListener('click', clicked, false);
                    picked_cards[0].classList.remove('open');
                    picked_cards[0].classList.remove('show');
                    picked_cards[1].classList.remove('open');
                    picked_cards[1].classList.remove('show');
                    picked_cards[0].classList.remove('flipInY');
                    picked_cards[1].classList.remove('flipInY');  
                    picked_cards[0].classList.add('match');
                    picked_cards[1].classList.add('match');
                    picked_cards[0].classList.add('shake');
                    picked_cards[1].classList.add('shake');
                    picked_cards = new Array();
                    can_pick = true;
                    sucess_move++;
                    console.log(sucess_move);
                    if(sucess_move == 8){
                        alert('well done your movies are: ' + tries.innerHTML);
                    }
                }, 500)
            } else {
                setTimeout(function(){
                    picked_cards[0].classList.add('rubberBand');
                    picked_cards[1].classList.add('rubberBand');
                    picked_cards[0].classList.remove('open');
                    picked_cards[0].classList.remove('show');
                    picked_cards[1].classList.remove('open');
                    picked_cards[1].classList.remove('show');
                    picked_cards[0].classList.remove('flipInY');
                    picked_cards[1].classList.remove('flipInY');                    
                    picked_cards = new Array();
                    can_pick = true;
                }, 1000)
            }
        }
    }
}

 for (var i = 0; i < cards.length; i++) {
     cards[i].classList.add('animated');
     cards[i].addEventListener('click', clicked);
 }
