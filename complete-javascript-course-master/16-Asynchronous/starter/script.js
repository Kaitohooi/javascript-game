'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imagesContainer = document.querySelector('.images');

///////////////////////////////////////
// AJAX Call
// const getCountry = function (country) {
//   const xhttp = new XMLHttpRequest();
//   xhttp.open('GET', `https://restcountries.com/v3.1/name/${country}`, true);
//   xhttp.send();

//   //   xhttp.onreadystatechange = function () {
//   //     if (this.readyState === 4 && this.status === 200) {
//   //       const [data] = JSON.parse(this.responseText);
//   //       console.log(data);

//   //       let numLanguage = Object.keys(data.languages).length;
//   //       const language = Object.values(data.languages);
//   //       console.log(language);
//   //       let htmlLanguage = '';
//   //       for (let i = 0; i < numLanguage; i++) {
//   //         htmlLanguage += `${language[i]} `;
//   //       }
//   //       console.log(htmlLanguage);

//   //       const currency = Object.keys(data.currencies);

//   //       const html = `
//   //         <article class="country">
//   //             <img class="country__img" src="${data.flags.svg}" />
//   //             <div class="country__data">
//   //                 <h3 class="country__name">${data.name.common}</h3>
//   //                 <h4 class="country__region">${data.region}</h4>
//   //                 <p class="country__row"><span>👫</span>${(
//   //                   +data.population / 1000000
//   //                 ).toFixed(1)} million people</p>
//   //                 <p class="country__row"><span>🗣️</span>${htmlLanguage}</p>
//   //                 <p class="country__row"><span>💰</span>${
//   //                   data.currencies[currency].name
//   //                 }</p>
//   //             </div>
//   //         </article>
//   //       `;

//   //       countriesContainer.insertAdjacentHTML('beforeend', html);
//   //       countriesContainer.style.opacity = '1';
//   //     }
//   //   };

//   xhttp.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     let numLanguage = Object.keys(data.languages).length;
//     const language = Object.values(data.languages);
//     console.log(language);
//     let htmlLanguage = '';
//     for (let i = 0; i < numLanguage; i++) {
//       htmlLanguage += `${language[i]} `;
//     }
//     console.log(htmlLanguage);

//     const currency = Object.keys(data.currencies);

//     const html = `
//         <article class="country">
//             <img class="country__img" src="${data.flags.svg}" />
//             <div class="country__data">
//                 <h3 class="country__name">${data.name.common}</h3>
//                 <h4 class="country__region">${data.region}</h4>
//                 <p class="country__row"><span>👫</span>${(
//                   +data.population / 1000000
//                 ).toFixed(1)} million people</p>
//                 <p class="country__row"><span>🗣️</span>${htmlLanguage}</p>
//                 <p class="country__row"><span>💰</span>${
//                   data.currencies[currency].name
//                 }</p>
//             </div>
//         </article>
//       `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = '1';
//   });
// };

// getCountry('malaysia');
// getCountry('singapore');
// getCountry('usa');

// Callback Hell
const renderCountry = function (data, neighbour = '') {
  let numLanguage = Object.keys(data.languages).length;
  const language = Object.values(data.languages);
  console.log(language);
  let htmlLanguage = '';
  for (let i = 0; i < numLanguage; i++) {
    htmlLanguage += `${language[i]} `;
  }
  console.log(htmlLanguage);

  const currency = Object.keys(data.currencies);

  const html = `
        <article class="country ${neighbour}">
            <img class="country__img" src="${data.flags.svg}" />
            <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                ).toFixed(1)} million people</p>
                <p class="country__row"><span>🗣️</span>${htmlLanguage}</p>
                <p class="country__row"><span>💰</span>${
                  data.currencies[currency].name
                }</p>
            </div>
        </article>
      `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = '1';
};

// const getCountryAndNeighbour = function (country) {
//   const xhttp = new XMLHttpRequest();
//   xhttp.open('GET', `https://restcountries.com/v3.1/name/${country}`, true);
//   xhttp.send();

//   xhttp.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     renderCountry(data);

//     const neighbour = data.borders;
//     if (!neighbour) return;

//     for (let j = 0; j < neighbour.length; j++) {
//       const xhttp = new XMLHttpRequest();
//       xhttp.open(
//         'GET',
//         `https://restcountries.com/v3.1/alpha/${neighbour[j]}`,
//         true
//       );
//       xhttp.send();
//       xhttp.addEventListener('load', function () {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         renderCountry(data, 'neighbour');
//       });
//     }
//   });
// };

// getCountryAndNeighbour('usa');

// Promise and Chaining Promises
// wrapping fetching a resource, handling API error, and return Promise as JSON into a function
// const getJSON = function (url) {
//   return fetch(url).then(resp => {
//     if (!resp.ok) throw new Error('Country Not Found!');
//     return resp.json();
//   });
// };

const renderError = function (err) {
  const errMsg = `Something went wrong, ${err.message}. Try Again!`;
  countriesContainer.insertAdjacentText('beforeend', errMsg);
};

// const getCountry = function () {
//   getJSON(`https://restcountries.com/v3.1/name/${this}`)
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) throw new Error('Failed to find neighbour countries');

//       return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => renderError(err))
//     .finally(() => (countriesContainer.style.opacity = '1'));
// };

// btn.addEventListener('click', getCountry.bind('malaysia'));

// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
// const getJSON = function (url) {
//   return fetch(url).then(resp => {
//     if (!resp.ok) throw new Error('Country Not Found');
//     return resp.json();
//   });
// };

// const renderError = function (err) {
//   const errMsg = `Problem with geocoding, ${err.message} (${err.status}), please try again later`;
//   console.error(errMsg);
// };

// const whereAmI = function () {
//   const lat = this[0];
//   const lng = this[1];
//   console.log(lat, lng);

//   getJSON(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(data =>
//       getJSON(
//         `https://restcountries.com/v3.1/name/${data.country.toLowerCase()}`
//       )
//     )
//     .then(data => renderCountry(data[0]))
//     .catch(err => renderError(err));
// };

// btn.addEventListener('click', whereAmI.bind([19.037, 72.873]));

// Building Promise
// const lotteryPromise = new Promise(function (resolve, reject) {
//   if (Math.random() <= 0.5) {
//     resolve('You win');
//   } else {
//     reject('You lose');
//   }
// });

// Consuming Promise
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying asynchronous APIs
// setTimeout API
// const wait = function (seconds) {
//   return new Promise(resolve => {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log('I have waited for 1 seconds');
//     return wait(2);
//   })
//   .then(() => console.log('I have waited for 3 seconds'));

// Geolocation API
// const getPosition = function () {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return getJSON(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(data =>
//       getJSON(
//         `https://restcountries.com/v3.1/name/${data.country.toLowerCase()}`
//       )
//     )
//     .then(data => renderCountry(data[0]))
//     .catch(err => renderError(err));
// };

// btn.addEventListener('click', whereAmI);

// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. 
This function returns a promise which creates a new image (use document.createElement('img')) 
and sets the .src attribute to the provided image path. When the image is done loading, 
append it to the DOM element with the 'images' class, and resolve the promise. 
The fulfilled value should be the image element itself. 
In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/
// let currentImg = 1;
// let imgEl;

// const createImage = function (imgPath) {
//   return new Promise((resolve, reject) => {
//     imgEl = document.createElement('img');
//     imgEl.src = `${imgPath}/img-${currentImg}.jpg`;
//     imgEl.dataset.img = currentImg;

//     imgEl.addEventListener('load', function (e) {
//       e.preventDefault();
//       resolve();
//     }); // MARK Prevent load the entire page

//     // MARK Image failed to load
//     imgEl.addEventListener('error', function (e) {
//       e.preventDefault();
//       reject(new Error('Loading image failed'));
//     });
//   });
// };

// createImage('./img')
//   .then(() => {
//     imagesContainer.insertAdjacentElement('beforeend', imgEl);
//     return wait(2);
//   })
//   .then(() => {
//     document.querySelector(`img[data-img = "${currentImg}"]`).style.display =
//       'none';
//     if (currentImg <= 3) currentImg++;
//     return createImage('./img');
//   })
//   .then(() => {
//     imagesContainer.insertAdjacentElement('beforeend', imgEl);
//     return wait(2);
//   })
//   .then(() => {
//     document.querySelector(`img[data-img = "${currentImg}"]`).style.display =
//       'none';
//     if (currentImg <= 3) currentImg++;
//     return createImage('./img');
//   })
//   .then(() => {
//     imagesContainer.insertAdjacentElement('beforeend', imgEl);
//     return wait(2);
//   })
//   .catch(err => console.error(err));

// Aync / await
const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getJSON = function (url) {
  return fetch(url).then(resp => {
    if (!resp.ok) throw new Error('Country Not Found');
    return resp.json();
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse Geocode
    const resGeo = await getJSON(
      `https://geocode.xyz/${lat},${lng}?geoit=json`
    );

    // Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${resGeo.country.toLowerCase()}`
    );
    if (!res.ok) throw new Error('Problem in getting country');

    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);

    return `I am from ${resGeo.capital}, ${resGeo.country}`; // would be the fulfilled value of the returned promise
  } catch (err) {
    renderError(err);
    // Reject promise returned from async/await
    throw err;
  }
};

// Use .then() to handle promise
console.log('1: Fetching position');
whereAmI()
  .then(res => console.log(`2: ${res}`))
  .catch(err => console.error(`2: ${err}`))
  .finally(() => console.log(`3: Getting Country Finished`));

// Use async/await to handle promise
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${res}`);
  } catch (err) {
    console.error(`2: ${err}`);
  } finally {
    console.log(`3: Getting Country Finished`);
  }
})();

const get3Countries = async function (c1, c2, c3) {
  try {
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('malaysia', 'singapore', 'thailand');
