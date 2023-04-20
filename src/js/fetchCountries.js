const ENDPOINT = "https://restcountries.com/v3.1";

// === 1-й варіант - ".then().catch()" ===

// function fetchCountries(name) {
//   return fetch(`${ENDPOINT}/name/${name}?fields=flags,name,capital,population,languages`).then((data) =>
//     data.json()
//   );
// };

// === 2-й варіант - "async/await" ===
async function fetchCountries(name) {  
  const response = await fetch(`${ENDPOINT}/name/${name}?fields=flags,name,capital,population,languages`);
  const data = await response.json();
  console.log(data);
  return data;  
};

export { fetchCountries };

fetch(`${ENDPOINT}/name/swe?fields=flags,name,capital,population,languages`)
  .then((data) => data.json())
  .then((data) => console.log(data));
