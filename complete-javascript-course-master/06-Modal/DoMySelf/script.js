const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".closed-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");

for (let i of btnsOpenModal)
  i.addEventListener("click", function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });

btnCloseModal.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

overlay.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

document.addEventListener("keydown", function (e) {
  if (
    e.key === "Escape" &&
    !modal.classList.contains("hidden") &&
    !overlay.classList.contains("hidden")
  ) {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});
