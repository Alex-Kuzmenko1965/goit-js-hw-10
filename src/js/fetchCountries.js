const ENDPOINT = "https://restcountries.com/v3.1";
// const API_KEY = "cb5bcb93f4484fa092445b6753e125a2";

// === 3-й варіант по X-Api-Key===
// function getNews(query) {
//   return fetch(`${ENDPOINT}?apiKey=${API_KEY}&q=${query}`)
//   .then((data) => data.json())
//   .then(({ articles }) => console.log(articles));
// }

// export { getNews };

// === 4-й варіант===
function fetchCountries(name) {
  return fetch(`${ENDPOINT}/name/${name}?fields=flags,name,capital,population,languages`).then((data) =>
    data.json()
  );
}

export { fetchCountries };

fetch(`${ENDPOINT}/name/sw?fields=flags,name,capital,population,languages`)
  .then((data) => data.json())
  .then((data) => console.log(data));
