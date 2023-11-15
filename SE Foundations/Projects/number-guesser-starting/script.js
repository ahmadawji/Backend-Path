let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:

function generateTarget() {
  return Math.floor(Math.random() * 10);
}

function compareGuesses(userGuess, computerGuess, targetNumber) {
  userGuess = getAbsoluteDistance(userGuess, targetNumber);
  computerGuess = getAbsoluteDistance(computerGuess, targetNumber);

  if (computerGuess < userGuess) return false;
  else if (computerGuess === userGuess) return true;
  else return true;
}

function updateScore(winner) {
  if (winner === "human") humanScore++;
  if (winner === "computer") computerScore++;
}

function advanceRound() {
  currentRoundNumber++;
}

function getAbsoluteDistance(guess, target) {
  return Math.abs(guess - target);
}

function checkUsersGuessValidity(userGuess) {
  if (userGuess < 0 || userGuess > 9) {
    alert("Please keep your guess between 0 and 9");
    return true;
  }
}
