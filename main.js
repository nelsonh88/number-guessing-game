'use strict';

// We multiply by 20 to give us a random number between 1 and 20 (but it will only go from 1 to 19 unless we add the +1 since it will count the 0)
// .Math.trunc() is another method on the Math object and it allows us to remove the decimal places
let secretNumber = Math.trunc(Math.random() * 20) + 1;

// how many guesses you are allowed before you lose
let score = 10;

let highScore = 0;

// the pattern for the konami code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// current variable to keep track oh how many keys in the konamiCode have been pressed succesfully
let current = 0;

const easterEgg = document.querySelector('.konami img');

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

// console.log(secretNumber);

document.querySelector('.check').addEventListener('click', function () {
    // Number method makes the string into a number
    const guess = Number(document.querySelector('.guess').value);

    // console.log(typeof guess);
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
    // console.log('new number', secretNumber);
    numberDisplay('?');
    score = 10;
    updateScore(score);
    displayMessage('Start guessing...');
    resetGuessField('');

    document.querySelector('html').style.backgroundColor = '#222';
});


// below will be the konami code

const keyHandler = function (event) {
    // console.log(event.key)

    // If the key isn't in the konamiCode, reset
    // If the key isn't in the konamiCode, or isn't the current key in the konamiCode, reset
    if (konamiCode.indexOf(event.key) < 0 || event.key !== konamiCode[current]) {
        current = 0;
        return;
    }

    // Update how much of the konamiCode is complete
    current++;

    // If complete, alert and reset
    if (konamiCode.length === current) {
        current = 0;
        easterEgg.classList.add('showEasterEgg')
        // had to insertrule for the keyframes
        const css = window.document.styleSheets[1];
        // console.log(css)
        css.insertRule(`
@keyframes marioKart {
  0%   { left: 0;     }
  50%  { left: 660px; }
  100% { left: 0; }
}`);

        setTimeout(function () {
            easterEgg.classList.remove('showEasterEgg');
        }, 6000);
    }

};
// adding the eventlistener with th callback fn keyhandler
document.addEventListener('keydown', keyHandler, false);