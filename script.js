const DISCOVER_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=706c8547f1095e84af95e060e88f5219&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=706c8547f1095e84af95e060e88f5219&query='
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

async function getMoviesAsync(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = '';
  movies.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `
      <img src="${IMG_PATH}${poster_path}" alt="">
      <div class="movie-info">
          <h3>${title}</h3>
          <span class="${vote_average > 7 ? 'green' : vote_average < 4 ? 'red' : 'orange'}">${vote_average}</span>
      </div>
      <div class="overview">
          <h3>Overview</h3>
          ${overview}
      </div>
    `;
    main.appendChild(movieElement);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = search.value;
  if (searchTerm && searchTerm.trim() !== '') {
    const url = `${SEARCH_URL}"${searchTerm.trim()}"`;
    getMoviesAsync(url);
  }
});

getMoviesAsync(DISCOVER_URL);
