'use strict';

// We multiply by 20 to give us a random number between 1 and 20 (but it will only go from 1 to 19 unless we add the +1 since it will count the 0)
// .Math.trunc() is another method on the Math object and it allows us to remove the decimal places
let secretNumber = Math.trunc(Math.random() * 20) + 1;

// how many guesses you are allowed before you lose
let score = 5;

let highScore = 0;

const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
};

const numberDisplay = function (displayThis) {
    document.querySelector('.number').textContent = displayThis;
};

const updateScore = function (updatedScore) {
    document.querySelector('.score').textContent = updatedScore;
};

const resetGuessField = function (newValue) {
    document.querySelector('.guess').value = newValue;
};

console.log(secretNumber);

document.querySelector('.check').addEventListener('click', function () {
    // Number method makes the string into a number
    const guess = Number(document.querySelector('.guess').value);

    console.log(typeof guess);
    // if no input
    if (!guess) {
        displayMessage('No number')
        // if guess is correct
    } else if (guess === secretNumber) {

        numberDisplay(secretNumber);

        displayMessage('Correct number!! WooHoo!!');

        document.querySelector('html').style.backgroundColor = '#60b347';

        if (score > highScore) {
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        };
        // if guess is too high
    } else if (guess !== secretNumber) {
        if (score > 1) {
            displayMessage(guess > secretNumber ? 'Too high' : 'Too low')


            score--;
            updateScore(score);
        } else {
            displayMessage('You lost the game. You suck.');

            updateScore(0);
        }

    }

});

document.querySelector('.again').addEventListener('click', function () {
    let newSecretNumber = Math.trunc(Math.random() * 20) + 1;
    secretNumber = newSecretNumber;
    console.log('new number', secretNumber);
    numberDisplay('?');
    score = 5;
    updateScore(score);
    displayMessage('Start guessing...');
    resetGuessField('');

    document.querySelector('html').style.backgroundColor = '#222';
});


// below will be the konami code

// the pattern if the konami code
const pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// current variable to keep track oh how many keys in the pattern have been pressed succesfully
let current = 0;


const keyHandler = function (event) {
    console.log(event.key)

    // If the key isn't in the pattern, reset
    // If the key isn't in the pattern, or isn't the current key in the pattern, reset
    if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
        current = 0;
        return;
    }

    // Update how much of the pattern is complete
    current++;

    // If complete, alert and reset
    if (pattern.length === current) {
        current = 0;

        document.querySelector('.konami img').style.visibility = 'visible'

        document.querySelector('.konami img').style.animationName = 'marioKart'

        document.querySelector('.konami img').style.animationDuration = '6s'
        // had to insertrule for the keyframes
        const css = window.document.styleSheets[1];
        console.log(css)
        css.insertRule(`
@keyframes marioKart {
  0%   { left: 0;     }
  50%  { left: 660px; }
  100% { left: 0; }
}`);

        // window.alert('You found it!');

        setTimeout(function () {
            document.querySelector('.konami img').style.visibility = 'hidden';

            document.querySelector('.konami img').style.animationName = 'none'

            document.querySelector('.konami img').style.animationDuration = ''

        }, 6000);
    }

};
// adding the eventlistener with th callback fn keyhandler
document.addEventListener('keydown', keyHandler, false);