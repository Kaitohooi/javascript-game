"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 250, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2022-05-10T14:18:46.235Z",
    "2022-05-14T16:33:06.386Z",
    "2022-05-16T14:43:26.374Z",
    "2022-05-18T13:49:59.371Z",
    "2022-05-19T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");
const labelMovementDate = document.querySelector(".movements__date");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

let currentAccount, timer;

/////////////////////////////////////////////////////////////
// Functions
const displayMovements = function (acc, sorted = false) {
  containerMovements.innerHTML = "";

  const movs = sorted
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const movementsDate = dateProcessing(
      acc.movementsDates[i],
      acc.locale,
      false
    );
    const position = type === "deposit" ? "11.5rem" : "10rem";
    const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">
                ${i + 1} ${type}
            </div>
            <div class="movements__date" style="right: ${position};">${movementsDate.toUpperCase()}</div>
            <div class="movements__value">${formattedCur(
              mov,
              acc.locale,
              acc.currency
            )}</div>
        </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  acc.balance = balance;
  labelBalance.textContent = formattedCur(balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (curAcc) {
  const interestRate = curAcc.interestRate;
  const income = curAcc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = formattedCur(income, curAcc.locale, curAcc.currency);

  const outcome = curAcc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = formattedCur(
    Math.abs(outcome),
    curAcc.locale,
    curAcc.currency
  );

  const interest = curAcc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => deposit * interestRate)
    .filter((interest) => interest > 1)
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = formattedCur(
    interest,
    curAcc.locale,
    curAcc.currency
  );
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUsernames(accounts);

const displayUIMessage = function (accs) {
  currentAccount = accs.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = "1";

    logoutTimer(10); // minute
  }

  const currentDate = dateProcessing(
    new Date().toISOString(),
    currentAccount.locale
  );
  labelDate.textContent = currentDate;

  inputLoginUsername.value = inputLoginPin.value = "";
  inputLoginPin.blur(); // lose the focus of the default input field
};

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const dateProcessing = function (date, locale, balanceDate = true) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(date), new Date());

  if (daysPassed < 1 && !balanceDate) return "Today";
  else if (daysPassed < 2 && !balanceDate) return "Yesterday";
  else if (daysPassed < 7 && !balanceDate) return `${daysPassed} days ago`;
  else {
    // const year = new Date(date).getFullYear();
    // const month = `${new Date(date).getMonth() + 1}`.padStart(2, 0);
    // const day = `${new Date(date).getDate()}`.padStart(2, 0);
    // const hour = `${new Date(date).getHours()}`.padStart(2, 0);
    // const min = `${new Date(date).getMinutes()}`.padStart(2, 0);
    // const second = `${new Date(date).getSeconds()}`.padStart(2, 0);

    // if (time) return `${day}/${month}/${year}, ${hour}:${min}`;
    // if (!time) return `${day}/${month}/${year}`;
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return balanceDate
      ? new Intl.DateTimeFormat(locale, options).format(new Date(date))
      : new Intl.DateTimeFormat(locale).format(new Date(date));
  }
};

const formattedCur = function (value, locale, cur) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: cur,
  }).format(value);
};

const logoutTimer = function (time) {
  // set logout time: 5min
  const logoutTime = +new Date() + time * 60 * 1000;
  const tick = function () {
    const loginTime = new Date().getTime();
    const interval = logoutTime - loginTime;

    const minute = `${Math.trunc(interval / (1000 * 60))}`.padStart(2, 0);
    const second = `${Math.trunc((interval % (1000 * 60)) / 1000)}`.padStart(
      2,
      0
    );

    // print the remaining time to the UI
    labelTimer.textContent = `${minute}:${second}`;

    if (interval < 1000) clearInterval(timer);
  };

  // call the timer every 1 second
  tick();
  timer = setInterval(tick, 1000);

  // When 0s, logout the user
  setTimeout(function () {
    containerApp.style.opacity = "0";
    labelWelcome.textContent = "Log in to get started";
  }, time * 60 * 1000);
};

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  if (timer) clearInterval(timer);

  // Display UI and message
  displayUIMessage(accounts);

  // Update UI
  updateUI(currentAccount);
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  const transferDate = new Date().toISOString();

  inputTransferTo.value = inputTransferAmount.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(transferDate);

    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(transferDate);

    updateUI(currentAccount);

    // reset the timer
    clearInterval(timer);
    timer = logoutTimer(10);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const loanAmount = Math.floor(inputLoanAmount.value);
  const loanDate = new Date().toISOString();

  if (
    loanAmount > 0 &&
    currentAccount.movements.some((mov) => mov >= loanAmount * 0.1)
  ) {
    setTimeout(function () {
      currentAccount.movements.push(loanAmount);
      currentAccount.movementsDates.push(loanDate);
      updateUI(currentAccount);

      // reset the timer
      clearInterval(timer);
      timer = logoutTimer(10);
    }, 3000);
  }

  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => inputCloseUsername.value === acc.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = "0";
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

let isSorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !isSorted);
  isSorted = !isSorted;
});

// const now = new Date();
// console.log(now.getTime());
// console.log(Number(now));
// console.log(+now);

// const calcDayPass = (date1, date2) => (date2 - date1) / (1000 * 60 * 60 * 24);
// console.log(calcDayPass(new Date(2022, 4, 18), new Date()));

// const iso = "2022-04-18T21:31:17.178Z";

// console.log(new Date(iso));

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const testCase1 = [5, 2, 4, 1, 15, 8, 3];
// const testCase2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function (arr) {
//   const result = arr
//     .map((age) => (age <= 2 ? age * 2 : 16 + age * 4))
//     .filter((convertedAge) => convertedAge >= 18)
//     .reduce((acc, filteredAge, i, arr) => acc + filteredAge / arr.length, 0);

//   return result;
// };

// console.log(calcAverageHumanAge(testCase1));
// console.log(calcAverageHumanAge(testCase2));

// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

// const dogs = [
//   { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
//   { weight: 8, curFood: 200, owners: ["Matilda"] },
//   { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
//   { weight: 32, curFood: 340, owners: ["Michael"] },
// ];

// // 1.
// const calcRecommendedPortion = function (dogsArr) {
//   dogsArr.forEach(
//     (dog, i) => (dog.recommendedPortion = Math.trunc(dog.weight ** 0.75 * 28))
//   );
// };

// calcRecommendedPortion(dogs);

// // 2.

// const owner = "Sarah";

// const dogSarah = dogs.find((dog) => dog.owners.includes(owner));
// console.log(
//   `Sarah's dog is eating too ${
//     dogSarah.curFood > dogSarah.recommendedPortion ? "much" : "little"
//   }`
// );

// const determineFoodPortionByOwner = function (dogsArr, dogOwner) {
//   let dogIndex = -1;
//   for (let [i, dog] of dogsArr.entries()) {
//     let index = dog.owners.findIndex((own) => own === dogOwner);
//     dogIndex = index !== -1 ? i : null;
//     if (index !== -1) break;
//     else continue;
//   }

//   if (dogsArr[dogIndex].curFood > dogsArr[dogIndex].recommendedPortion)
//     console.log(`Dog ${dogIndex + 1} is eating too much!`);
//   else if (dogsArr[dogIndex].curFood < dogsArr[dogIndex].recommendedPortion)
//     console.log(`Dog ${dogIndex + 1} is eating too little!`);
// };

// determineFoodPortionByOwner(dogs, owner);

// // 3.

// const ownerEatTooMuch = dogs
//   .filter((dog) => dog.curFood > dog.recommendedPortion)
//   .flatMap((dog) => dog.owners);

// console.log(ownerEatTooMuch);

// let ownersEatTooMuch = [];
// let ownersEatTooLittle = [];

// const identifyDogOwnerByFoodPortion = function (dogsArr) {
//   for (let [i, dog] of dogsArr.entries()) {
//     if (dog.curFood > dog.recommendedPortion) {
//       ownersEatTooMuch.push(dogsArr[i].owners);
//       const tempTooMuch = ownersEatTooMuch.flat(2);
//       ownersEatTooMuch.splice(0, ownersEatTooMuch.length);
//       ownersEatTooMuch = tempTooMuch;
//     } else if (dog.curFood < dog.recommendedPortion) {
//       ownersEatTooLittle.push(dogsArr[i].owners);
//       const tempTooLittle = ownersEatTooLittle.flat(2);
//       ownersEatTooLittle.splice(0, ownersEatTooLittle.length);
//       ownersEatTooLittle = tempTooLittle;
//     }
//   }
// };

// identifyDogOwnerByFoodPortion(dogs);

// // 4.

// const textGenerator = function (muchArr, littleArr) {
//   const strEatMuch = muchArr.reduce((acc, cur) => `${cur} and ` + acc);
//   console.log(strEatMuch + "'s dogs eat too much!");

//   const strEatLittle = littleArr.reduce((acc, cur) => `${cur} and ` + acc);
//   console.log(strEatLittle + "'s dogs eat too little!");
// };

// textGenerator(ownersEatTooMuch, ownersEatTooLittle);

// // 5, 6.

// const findHealtyDogs = function (dogsArr) {
//   const exactAmount = dogsArr.some(
//     (dog) => dog.curFood === dog.recommendedPortion
//   );
//   console.log(`is there any dog eats exact amount of food? ${exactAmount}`);

//   const okayAmount = dogsArr.some(
//     (dog) =>
//       dog.curFood > dog.recommendedPortion * 0.9 &&
//       dog.curFood < dog.recommendedPortion * 1.1
//   );
//   console.log(`is there any dog eats okay amount of food? ${okayAmount}`);
// };

// findHealtyDogs(dogs);

// // 7.

// const okayAmountArr = dogs.filter(
//   (dog) =>
//     dog.curFood > dog.recommendedPortion * 0.9 &&
//     dog.curFood < dog.recommendedPortion * 1.1
// );

// console.log(okayAmountArr);

// // 8.

// const dogCopied = dogs.slice();
// console.log(
//   dogCopied.sort((a, b) => a.recommendedPortion - b.recommendedPortion)
// );
