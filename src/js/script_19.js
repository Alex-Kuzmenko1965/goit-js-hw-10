// **Написати додаток пошуку новин**
// Користувач бачить на екрані інпут ⇒ вводить в нього запит ⇒ отримує на екрані підбірку новин по його запиту.

// === 1-й варіант по apiKey ===
// const ENDPOINT = "https://newsapi.org/v2/everything";
// const API_KEY = "cb5bcb93f4484fa092445b6753e125a2";

// fetch(`${ENDPOINT}?apiKey=${API_KEY}&q=gpt`)
//   .then((data) => data.json())
//   .then(({ articles }) => console.log(articles));

// === 2-й варіант по X-Api-Key===
// const ENDPOINT = "https://newsapi.org/v2/everything";
// const API_KEY = "cb5bcb93f4484fa092445b6753e125a2";

  // fetch(`${ENDPOINT}?q=gpt`, {
  //   headers: {
  //     "X-Api-Key": API_KEY,
  //   },
  // })
  //   .then((data) => data.json())
  //   .then(({ articles }) => console.log(articles));

  // === 3-й варіант по X-Api-Key===
  // import { getNews } from "./api.js";

  // const result = getNews('web development');
  // console.log(result);

// === 4-й варіант===
import { getNews } from "./fetchCountries.js";

const refs = {
  form: document.getElementById("form"),
  newsWrapper: document.getElementById("newsWrapper"),
};

refs.form.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault(); 
  console.log(e.currentTarget); 
  console.log(e.currentTarget.elements.news);
  const form = e.currentTarget;
  const inputValue = form.elements.news.value;
  getNews(inputValue)
    .then(({ articles }) => {
      console.log(articles);
      if (articles.length === 0) throw new Error("No data!");

      const markup = articles.reduce(
        (markup, article) => markup + createMarkup(article), "");
      console.log(markup);
      updateNewsList(markup);
    })
    // .catch((err) => onError(err))
    .catch(onError)
    .finally(() => form.reset());
}

function createMarkup({ title, author, url, urlToImage, description }) {
  return `<div class="article-card">
      <h2 class="article-title">${title}</h2>
      <h3 class="article-author">${author || "Unknown"}</h3>
      <img src=${
        urlToImage ||
        "./img/088.jpg"
      } class="article-img">
      <p class="article-description">${description}</p>
      <a href=${url} target="_blank" class="article-link">Read more</a>
    </div>`;
}

function updateNewsList(markup) {
  refs.newsWrapper.innerHTML = markup;
}

function onError(err) {
  console.error(err);
  updateNewsList("<p>Not found!</p>");
}

/*
* CRUD - create read update delete

- POST - create
- створює новий ресурс
- при створенні ресурсу, сервер автоматично дасть йому ID
- цей метод не є ідемпотентим

/user

- PUT - update
- оновлює вже існуючий ресурс, або створює його, якщо на сервері такого не існує
- є ідемпотентним

/user/{id}
*/