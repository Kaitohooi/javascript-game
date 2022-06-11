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

let currentScore1 = 0;
let currentScore2 = 0;
let totalScore1 = 0;
let totalScore2 = 0;

// Starting conditions
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add("hidden");

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
    if (player1EL.classList.contains("player--active")) {
      currentScore1 += dice;
      current0EL.textContent = currentScore1;
    } else if (player2EL.classList.contains("player--active")) {
      currentScore2 += dice;
      current1EL.textContent = currentScore2;
    }
  } else {
    // switching to other player and drop all the current score
    if (player1EL.classList.contains("player--active")) {
      player1EL.classList.remove("player--active");
      current0EL.textContent = 0;
      player2EL.classList.add("player--active");
    } else if (player2EL.classList.contains("player--active")) {
      player2EL.classList.remove("player--active");
      current1EL.textContent = 0;
      player1EL.classList.add("player--active");
    }
  }
});

btnHold.addEventListener("click", function () {
  if (player1EL.classList.contains("player--active")) {
    totalScore1 += currentScore1;
    currentScore1 = 0;
    if (totalScore1 >= 20) {
      player1EL.classList.add("player--winner");
      diceEL.classList.add("hidden");
      btnRoll.disabled = true;
      btnHold.disabled = true;
    } else {
      player1EL.classList.remove("player--active");
      player2EL.classList.add("player--active");
    }
    current0EL.textContent = 0;
    score0EL.textContent = totalScore1;
  } else if (player2EL.classList.contains("player--active")) {
    totalScore2 += currentScore2;
    currentScore2 = 0;
    if (totalScore2 >= 20) {
      player2EL.classList.add("player--winner");
      diceEL.classList.add("hidden");
      btnRoll.disabled = true;
      btnHold.disabled = true;
    } else {
      player2EL.classList.remove("player--active");
      player1EL.classList.add("player--active");
    }
    current1EL.textContent = 0;
    score1EL.textContent = totalScore2;
  }
});

btnNew.addEventListener("click", function () {
  if (player1EL.classList.contains("player--winner"))
    player1EL.classList.remove("player--winner");
  else if (player2EL.classList.contains("player--winner"))
    player2EL.classList.remove("player--winner");

  currentScore1 = 0;
  currentScore2 = 0;
  totalScore1 = 0;
  totalScore2 = 0;
  diceEL.classList.add("hidden");
  btnRoll.disabled = false;
  btnHold.disabled = false;

  document.querySelector(`.player--0`).classList.add("player--active");

  player2EL.classList.remove("player--active");

  score0EL.textContent = totalScore1;
  score1EL.textContent = totalScore2;
});
