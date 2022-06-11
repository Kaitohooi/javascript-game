"use strict";

let secretNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    displayMessage("⛔ No number");
  } else if (guess === secretNumber) {
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
    displayMessage("🎉 Correct Number");
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "200px";
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "📈Too High!" : "📉 Too Low!"); // ternary operator
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      score = 0;
      document.querySelector(".score").textContent = score;
      displayMessage("💥You lost the game!");
    }
  }
  // } else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = "📈Too High!";
  //     score--;
  //     document.querySelector(".score").textContent = score;
  //   } else {
  //     score = 0;
  //     document.querySelector(".score").textContent = score;
  //     document.querySelector(".message").textContent = "💥You lost the game!";
  //   }
  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = "📉 Too Low!";
  //     score--;
  //     document.querySelector(".score").textContent = score;
  //   } else {
  //     score = 0;
  //     document.querySelector(".score").textContent = score;
  //     document.querySelector(".message").textContent = "💥You lost the game!";
  //   }
  // }
});

// document.querySelector(".again").addEventListener("click", function () {
//   location.reload();
// });

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  document.querySelector(".number").textContent = "?";
  displayMessage("Start guessing...");
  document.querySelector(".score").textContent = score;
  document.querySelector(".highscore").textContent = highScore;
  document.querySelector(".guess").value = "";

  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "100px";
});
