const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
let maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;

  const MessageList = document.querySelector('.messageoptions');
  const ErrorMessage = document.createElement('p');
  ErrorMessage.className = "message";

  hideAllMessages();

  if (guess === targetNumber){
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }
  
  if (guess <= 0){
  ErrorMessage.innerHTML = `Must be greater than 0`;
  ErrorMessage.style.display = '';
  ErrorMessage.style.color = 'red';
  MessageList.appendChild(ErrorMessage);
  return 0
  }
  if (guess > 99){
  ErrorMessage.innerHTML = `Must be less than 100`;
  ErrorMessage.style.display = '';
  ErrorMessage.style.color = 'red';
  MessageList.appendChild(ErrorMessage)
  return 0
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = '';
    }

    let remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = '';
    if (remainingAttempts > 1){
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
    }
    if (remainingAttempts == 1){
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guess remaining`;
    }
  }

  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
    maxGuessesMessage.style.display ='';

  }

  guessInput.value = '';

  resetButton.style.display = '';
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  maxNumberOfAttempts = 5;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();