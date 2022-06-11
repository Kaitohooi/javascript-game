// Selecting elements
const score0EL = document.querySelector("#score--0");
const score1EL = document.getElementById("score--1");
const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0EL = document.getElementById("current--0");
const current1EL = document.getElementById("current--1");
const player1EL = document.querySelector(".player--0");
const player2EL = document.querySelector(".player--1");

let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  diceEL.classList.add("hidden");
  btnRoll.disabled = false;
  btnHold.disabled = false;

  player1EL.classList.remove("player--winner");
  player2EL.classList.remove("player--winner");

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");

  player2EL.classList.remove("player--active");

  score0EL.textContent = score[0];
  score1EL.textContent = score[1];
};

// Starting conditions
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add("hidden");

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player1EL.classList.toggle("player--active");
  player2EL.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  // 1. Generate an random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display the dice roll
  diceEL.classList.remove("hidden");
  diceEL.src = `dice-${dice}.png`;

  // 3. Check for roll 1: if true, switch to next player; if not, add the roll to the current score
  if (dice !== 1) {
    // check who is the active player
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // switching to other player and drop all the current score
    switchPlayer();
  }
});

btnHold.addEventListener("click", function () {
  // Adding current score to active player's score
  score[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  // Checking whether the score is over 100
  if (score[activePlayer] >= 20) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
    btnRoll.disabled = true;
    btnHold.disabled = true;
    diceEL.classList.add("hidden");
  } else {
    // Switch to other player
    switchPlayer();
  }
});

btnNew.addEventListener("click", init);
