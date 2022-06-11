"use strict";

const body = document.querySelector("body");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const navLinksContainer = document.querySelector(".nav__links");
const nav = document.querySelector(".nav");
const tab = document.querySelector(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabContent = document.querySelectorAll(".operations__content");
const allSections = document.querySelectorAll(".section");
const imgTargets = document.querySelectorAll("img[data-src]");
const slides = document.querySelectorAll(".slide");
const btnSlideLeft = document.querySelector(".slider__btn--left");
const btnSlideRight = document.querySelector(".slider__btn--right");
const dotsContainer = document.querySelector(".dots");

// Modal Window
btnsOpenModal.forEach(function (btnOpenModal) {
  btnOpenModal.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
  });
});

btnCloseModal.addEventListener("click", function () {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});

overlay.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});

btnScrollTo.addEventListener("click", function (e) {
  // const s1Coords = section1.getBoundingClientRect();
  // console.log(s1Coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log("Current Scroll (X/Y): ", window.pageXOffset, window.pageYOffset);

  // console.log(
  //   "height/ width viewport",
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // window.scrollTo(
  //   s1Coords.left + window.pageXOffset,
  //   s1Coords.top + window.pageYOffset
  // );

  section1.scrollIntoView({ behavior: "smooth" });
});

// Page Navigation

// NOT A Good Practice because it would slow down the performance DRY
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// Best way: Event Delegation (Put the event listener on the common parent element)
navLinksContainer.addEventListener("click", function (e) {
  e.preventDefault();
  //determine what element originated the event
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Tabbed components
// Event Delegation
tabContainer.addEventListener("click", function (e) {
  if (
    e.target.closest(".operations__tab").classList.contains("operations__tab")
  ) {
    const clicked = e.target.closest(".operations__tab");

    // Remove all active classes
    document
      .querySelectorAll(".operations__tab")
      .forEach((t) => t.classList.remove("operations__tab--active"));

    tabContent.forEach((c) =>
      c.classList.remove("operations__content--active")
    );

    // Add active class to components
    document
      .querySelector(`.operations__tab--${clicked.dataset.tab}`)
      .classList.add("operations__tab--active");

    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
  }
  return;
});

// Menu Fade animation
// const handleHover = function (e, opacity) {
//   if (e.target.classList.contains("nav__link")) {
//     const link = e.target;
//     const siblings = e.target.closest(".nav").querySelectorAll(".nav__link");
//     const logo = e.target.closest(".nav").querySelector("img");

//     siblings.forEach((sibling) => {
//       if (sibling !== link) sibling.style.opacity = +opacity;
//     });

//     logo.style.opacity = +opacity;
//   }
// };

// nav.addEventListener("mouseover", function (e) {
//   handleHover(e, 0.5);
// });

// nav.addEventListener("mouseout", function (e) {
//   handleHover(e, 1);
// });

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = e.target.closest(".nav").querySelectorAll(".nav__link");
    const logo = e.target.closest(".nav").querySelector("img");

    siblings.forEach((sibling) => {
      if (sibling !== link) sibling.style.opacity = +this;
    });

    logo.style.opacity = +this;
  }
};

// Passing 'arguments' into event handler
nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));

// Sticky Navigation
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener("scroll", function () {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add("sticky");
//   } else if (window.scrollY < initialCoords.top) nav.classList.remove("sticky");
// });

// Intersection Observer API
const header = document.querySelector(".header");
const navHeight = getComputedStyle(nav).height;

const headerObsCallBack = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}`, // only px or %
};

const headerObserver = new IntersectionObserver(
  headerObsCallBack,
  headerObsOptions
);
headerObserver.observe(header);

// Revealing sections

const sectionObsCallBack = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) entry.target.classList.add("section--hidden");
  else entry.target.classList.remove("section--hidden");

  // observer.unobserve(entry.target);
};

const sectionObsOptions = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(
  sectionObsCallBack,
  sectionObsOptions
);

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Lazy Loading
const imgObsCallBack = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  else {
    entry.target.src = entry.target.dataset.src;
    // similar to 'block' - flash of invisible text (FOIT)
    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
      observer.unobserve(entry.target);
    });
  }
};

const imgObsOptions = {
  root: null,
  threshold: 0.5,
};

const imgObserver = new IntersectionObserver(imgObsCallBack, imgObsOptions);
imgTargets.forEach((img) => imgObserver.observe(img));

// Slider
const slider = function () {
  slides.forEach(
    (slide, i) => (slide.style.transform = `translateX(${i * 105}%)`)
  );

  let currSlide = 0;
  let currDot = 0;
  const maxSlide = slides.length - 1;

  const slideSwapping = function (e, curr) {
    if (
      e.target.classList.contains("slider__btn--right") ||
      e.key === "ArrowRight"
    ) {
      if (curr >= maxSlide) {
        currSlide = currDot = 0;
      } else {
        currSlide++;
        currDot++;
      }
    } else if (
      e.target.classList.contains("slider__btn--left") ||
      e.key === "ArrowLeft"
    ) {
      if (curr === 0) {
        currSlide = currDot = maxSlide;
      } else {
        currSlide--;
        currDot--;
      }
    } else return;

    slides.forEach((slide, i) => {
      // transfrom: translateX -> 0% 100% 200% 300%
      slide.style.transform = `translateX(${(i - currSlide) * 105}%)`;
      // -100% 0 100% 200%
    });

    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`button[data-slide = "${currDot}"]`)
      .classList.add("dots__dot--active");
  };

  btnSlideRight.addEventListener("click", function (e) {
    slideSwapping(e, currSlide);
  });

  btnSlideLeft.addEventListener("click", function (e) {
    slideSwapping(e, currSlide);
  });

  document.addEventListener("keydown", function (e) {
    slideSwapping(e, currSlide);
  });

  const createDots = function () {
    slides.forEach((slide, i) => {
      const btnDotHTML = `<button class="dots__dot" data-slide="${i}"></button>`;
      dotsContainer.insertAdjacentHTML("beforeend", btnDotHTML);
    });

    dotsContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("dots__dot")) {
        currDot = currSlide = e.target.dataset.slide;

        document
          .querySelectorAll(".dots__dot")
          .forEach((dot) => dot.classList.remove("dots__dot--active"));
        e.target.classList.add("dots__dot--active");

        slides.forEach((slide, i) => {
          // transfrom: translateX -> -100% 0% 100%
          slide.style.transform = `translateX(${(i - currDot) * 105}%)`;
          // 0% 100% 200%
          // -100% 0% 100%
          // -200% -100% 0%
        });
      } else return;
    });
  };

  createDots();

  document
    .querySelector(`button[data-slide = "${currDot}"]`)
    .classList.add("dots__dot--active");
};

slider();

// LECTURES
// const header = document.querySelector(".header");
// const message = document.createElement("div");
// message.classList.add("cookie-message");
// message.innerHTML = `We use cookies for improved and analytics. <button class="btn">Got it!</button>`;
// header.append(message);

// Styles
// message.style.backgroundColor = "black";
// message.style.width = "120%";
// message.style.setProperty("width", "120%");
// document.documentElement.style.setProperty("--color-primary", "orangered");

// const logo = document.querySelector(".nav__logo");
// console.log(logo.dataset.versionNumber);

// btnScrollTo.onclick = function () {
//   console.log("Alert from JS");
// };

// const h1 = document.querySelector("h1");
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.firstElementChild);
// console.log(h1.lastElementChild);

// console.log(h1.parentNode);
// console.log(h1.parentElement);
// console.log(h1.closest(".header"));
// console.log(h1.closest("h1"));

// Intersection Observer API
// const obsCallBack = function (entries, observer) {
//   entries.forEach((entry) => console.log(entry));
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);

// DOM Content Loaded event - Html, CSS, Script files are being downloaded, parsed, executed and converted to DOM tree.
//                            This event would not wait for any external resources

// document.addEventListener("DOMContentLoaded", function (e) {
//   console.log("HTML parsed and DOM Built", e);
// });

// Not necessary to put the entire document into our DOMContentLoaded event listener because we're already put
// the script tag at the end of our html file

// JQuery: document.ready

// Load event is fired as soon as everything is ready including the external resources
// window.addEventListener("load", function (e) {
//   console.log("Page fully loaded", e);
// });

// // This event is created immediately before a user leaves the page
// window.addEventListener("beforeunload", function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = "";
// });
