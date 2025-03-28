// API Configuration
const API_KEY = "0a84a1e64a6c4fcc89489d8bafcdd24e";
const BASE_URL = "https://newsapi.org/v2";
const QUERY = "tesla";
const FROM_DATE = "2025-02-01";

const ENDPOINTS = {
  headlines: `${BASE_URL}/top-headlines?q=${QUERY}&from=${FROM_DATE}&sortBy=publishedAt&apiKey=${API_KEY}`,
  everything: `${BASE_URL}/everything?q=${QUERY}&from=${FROM_DATE}&sortBy=publishedAt&apiKey=${API_KEY}`,
};

// Selecting Sections
const newsSection = document.querySelector(".news");
const headlinesSection = document.querySelector(".headlines");

// Function to fetch news data
async function fetchNewsData(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();

    if (data.status !== "ok") {
      throw new Error("Failed to fetch news");
    }
    return data.articles;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// Function to append headlines to the headlines section
function appendHeadline(title) {
  const headlineElement = document.createElement("h3");
  headlineElement.setAttribute("class", "headline");
  headlineElement.className = "headline-title";
  headlineElement.innerText = title || "No Title Available";
  headlinesSection.appendChild(headlineElement);
}

// Fetch and display headlines
async function getHeadlines() {
  const articles = await fetchNewsData(ENDPOINTS.headlines);
  articles.forEach((article) => appendHeadline(article.title));
}

// Function to create and append a news card
function appendCard({ title, author, description, content, url, urlToImage }) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h3 class="card-title">${title || "No Title"}</h3>
    <h4 class="card-author">${author || "Unknown Author"}</h4>
    <img class="card-image" src="${urlToImage || "placeholder.jpg"}" alt="News Image" height="200px" width="100%">
    <p class="card-description">${description || "No Description"}</p>
    <p class="card-content">${content || "No Content"}</p>
    <a class="card-url" href="${url}" target="_blank">
      <button class="card-button">Read More</button>
    </a>
  `;

  newsSection.appendChild(card);
}

// Fetch and display news articles
async function getNews() {
  const articles = await fetchNewsData(ENDPOINTS.everything);
  articles.forEach(appendCard);
}

// Fetch both headlines and news articles
getHeadlines();
getNews();
