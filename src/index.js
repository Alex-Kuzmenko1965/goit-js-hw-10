import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

import { fetchCountries } from "./js/fetchCountries.js";

const refs = {
  inputEvent: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),  
  countryInfo: document.querySelector('.country-info'),
};
console.log(refs.inputEvent);
console.log(refs.countryList);
console.log(refs.countryInfo);

refs.inputEvent.addEventListener("input", debounce(onEventInput, DEBOUNCE_DELAY, {
  'leading': true,
  'trailing': false
}));
// refs.inputEvent.addEventListener("input", onEventInput);

// === 1-й варіант - ".then().catch()" ===

// function onEventInput(e) {  
//   const inputValue = (e.currentTarget.value).trim();
//   console.log(inputValue); 
//   fetchCountries(inputValue)
//     .then((data) => {
//       console.log(data);        
//       if (data.length === 1) {
//         const markup = data.reduce(
//           (markup, data) => markup + createMarkupInfo(data), "");
//         console.log(markup);
//         updateNewsInfo(markup);
//       } else 
//       if (data.length > 10) {
//         Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
//         refs.countryList.innerHTML = "";
//         refs.countryInfo.innerHTML = "";
//         return;
//       } else {
//         refs.countryList.setAttribute('style', 'padding: 0');       
//         const markup = data.reduce(
//           (markup, data) => markup + createMarkupList(data), "");
//         console.log(markup);
//         updateNewsList(markup);}      
//     })    
//     .catch(onError);    
// }

// === 2-й варіант - "async/await" ===

async function onEventInput(e) {  
  // console.log(e.currentTarget.value);
  // console.log((e.currentTarget.value).trim());
  const inputValue = (e.currentTarget.value).trim();
  // console.log(inputValue); 
  const country = await fetchCountries(inputValue);
    try {
      // console.log(country);        
      if (country.length === 1) {
        const markup = country.reduce(
          (markup, country) => markup + createMarkupInfo(country), "");
        console.log(markup);
        updateNewsInfo(markup);
      } else 
      if (country.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
        refs.countryList.innerHTML = "";
        refs.countryInfo.innerHTML = "";
        return;
      } else {
        refs.countryList.setAttribute('style', 'padding: 0');       
        const markup = country.reduce(
          (markup, country) => markup + createMarkupList(country), "");
        console.log(markup);
        updateNewsList(markup);}      
    } catch (error) {onError()}  
}


function createMarkupInfo({ name, capital, population,flags, languages }) {  
  // console.log(Object.values(languages));  
  // console.log((Object.values(languages)).join(' '));
  return `
    <ul style="display: flex; align-items: baseline; list-style: none; margin: 0; padding: 0; gap: 10px">
      <li><img src=${flags.svg || "No flags"} width="30"></li>
      <li><h1 style="margin: 0">${name.official || "No name"}</h1></li>
    </ul>
    <p><b>Capital:</b> ${capital || "No capital"}</p>
    <p><b>Population:</b> ${population || "No population"}</p>
    <p><b>Languages:</b> ${(Object.values(languages)).join(' ') || "No languages"}</p>`;
};

function createMarkupList({ name, flags }) {  
  return `
  <li style="list-style: none"><ul style="display: flex; align-items: baseline; margin: 0; padding: 0; gap: 10px">
    <li><img src=${flags.svg || "No flags"} width="30"></li>
    <li><h2 style="margin: 0">${name.official || "No name"}</h2></li>
  </ul></li>`;
};

function updateNewsInfo(markup) {
  refs.countryList.innerHTML = "";
  refs.countryInfo.innerHTML = markup;
};

function updateNewsList(markup) {
  refs.countryInfo.innerHTML = "";
  refs.countryList.innerHTML = markup;
};

function onError(err) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
  refs.countryInfo.innerHTML = "";
  refs.countryList.innerHTML = "";
};
