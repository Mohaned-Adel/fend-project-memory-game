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

function reset(){
    shuffle(cardValue);
    for (var i = 0; i < cards.length; i++) {
        cards[i].innerHTML = cardValue[i];
        cards[i].classList.remove('match');
        cards[i].classList.remove('show');
        cards[i].classList.remove('open');
        cards[i].classList.remove('shake');
        cards[i].classList.remove('flipInY');
        cards[i].classList.remove('rubberBand');
        stars.childNodes[5].firstChild.classList.remove('far');
        stars.childNodes[3].firstChild.classList.remove('far'); 
        stars.childNodes[1].firstChild.classList.remove('far'); 
        stars.childNodes[5].firstChild.classList.add('fa'); 
        stars.childNodes[3].firstChild.classList.add('fa'); 
        stars.childNodes[1].firstChild.classList.add('fa');          
        cards[i].addEventListener('click',clicked);
    }
    tries.innerHTML = 0;
    minuteLabel.innerHTML = 00;
    secondLabel.innerHTML = 00;
    totalSeconds = 0;
    sucess_move = 0;
}

var restart = document.querySelector('.restart');
restart.addEventListener('click', reset);

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

// function for the timer
var minuteLabel = document.getElementById('minutes');
var secondLabel = document.getElementById('seconds');
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime(){
    ++totalSeconds;
    secondLabel.innerHTML = pad(totalSeconds % 60);
    minuteLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valueString = val + "";
    if (valueString.length < 2){
        return "0" + valueString;
    } else {
        return valueString;
    }
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
var starsCount = 3;
var stars = document.querySelector('.stars');

function clicked() {
    if(can_pick) {
        var picked = this;
        if(picked_cards.indexOf(picked) == -1) {
            picked_cards.push(picked);
            this.classList.toggle("open");
            this.classList.toggle('show');
            this.classList.toggle('flipInY');
            this.classList.toggle('rubberBand');
        }

        if(picked_cards.length == 2) {
            tries.innerHTML++;
            if (tries.innerHTML > 10){
                stars.childNodes[5].firstChild.classList.add('far'); 
                stars.childNodes[5].firstChild.classList.remove('fa');
                starsCount = 2;               
            } 
            if (tries.innerHTML > 20 && tries.innerHTML < 30) {
                stars.childNodes[5].firstChild.classList.add('far'); 
                stars.childNodes[5].firstChild.classList.remove('fa');  
                stars.childNodes[3].firstChild.classList.add('far'); 
                stars.childNodes[3].firstChild.classList.remove('fa'); 
                starsCount = 1;
            } 
            if (tries.innerHTML > 30) {
                stars.childNodes[5].firstChild.classList.add('far'); 
                stars.childNodes[5].firstChild.classList.remove('fa');  
                stars.childNodes[3].firstChild.classList.add('far'); 
                stars.childNodes[3].firstChild.classList.remove('fa');  
                stars.childNodes[1].firstChild.classList.add('far'); 
                stars.childNodes[1].firstChild.classList.remove('fa');
                starsCount = 0; 
            }
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
                    picked_cards[0].classList.remove('rubberBand');
                    picked_cards[1].classList.remove('rubberBand');                        
                    picked_cards[0].classList.add('match');
                    picked_cards[1].classList.add('match');
                    picked_cards[0].classList.add('shake');
                    picked_cards[1].classList.add('shake');
                    picked_cards = new Array();
                    can_pick = true;
                    sucess_move++;
                    if(sucess_move == (cards.length/2)){
                        cong();
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

function cong(){
    const mainDiv = document.getElementById('main')
    const finishDiv = document.getElementById('finish');
    const playButton = document.querySelector('.play-again');
    const score = document.querySelector('.final-score');
    mainDiv.style.display = 'none';
    finishDiv.style.display = 'block';
    if(starsCount !== 1) {
    score.innerHTML = "with " + tries.innerHTML + " Moves and " + starsCount 
            + " stars and your final time is: " + minuteLabel.innerHTML + " minutes and " + secondLabel.innerHTML + " seconds";
    } else {
    score.innerHTML = "with " + tries.innerHTML + " Moves and " + starsCount 
            + " stars and your final time is: " + minuteLabel.innerHTML + " minutes and " + secondLabel.innerHTML + " seconds";        
    }
    playButton.addEventListener('click', function(){
        finishDiv.style.display = 'none';
        mainDiv.style.display = 'flex';
        reset();
    });
}

 for (var i = 0; i < cards.length; i++) {
     cards[i].classList.add('animated');
     cards[i].addEventListener('click', clicked);
 }
