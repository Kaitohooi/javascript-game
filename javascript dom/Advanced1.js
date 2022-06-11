"use strict";

// 1. Selecting and Manipulating elements
// For non-input field
// console.log(document.querySelector(".message").textContent);

// document.querySelector(".message").textContent = "Correct Number!";
// console.log(document.querySelector(".message").textContent);

// // For input field
// console.log(document.querySelector(".guess").value);

// document.querySelector("guess").value = 13;

// 2. Handling Click Events

// document.querySelector(".check").addEventListener("click", function () {
//   console.log(document.querySelector("guess").value);
// });

// document.querySelector(".check").addEventListener("click", function () {
//   const guess = Number(document.querySelector(".guess").value);
//   console.log(guess);

//   if (!guess) {
//     document.querySelector(".message").textContent = "⛔ No number";
//   }
// });

// 3. Manipulating CSS styles
// document.querySelector("body").style.backgroundColor = "#60b347";
// document.querySelector(".number").style.width = "200px";

// 4. working with classes
// const modal = document.querySelector(".modal");
// const overlay = document.querySelector(".overlay");
// const btnCloseModal = document.querySelector(".closed-modal");
// const btnsOpenModal = document.querySelectorAll(".show-modal");

// for (let i of btnsOpenModal)
//   i.addEventListener("click", function () {
//     modal.classList.remove("hidden");
//     overlay.classList.remove("hidden");
//   });

// btnCloseModal.addEventListener("click", function () {
//   modal.classList.add("hidden");
//   overlay.classList.add("hidden");
// });

// overlay.addEventListener("click", function () {
//   modal.classList.add("hidden");
//   overlay.classList.add("hidden");
// });

// document.addEventListener("keydown", function (e) {
//   if (
//     e.key === "Escape" &&
//     !modal.classList.contains("hidden") &&
//     !overlay.classList.contains("hidden")
//   ) {
//     modal.classList.add("hidden");
//     overlay.classList.add("hidden");
//   }
// });
