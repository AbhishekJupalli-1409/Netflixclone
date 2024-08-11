require('dotenv').config();
console.log(process.env)
const API_KEY = "4a0f8eb0308c6a069d518c17f1465a55";




const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

// Fetch and display movies
const fetchMovies = async (url, sectionId) => {
    const res = await fetch(url);
    const data = await res.json();
    displayMovies(data.results, sectionId);
};

// Display movies in the respective section
const displayMovies = (movies, sectionId) => {
    const movieContainer = document.querySelector(`#${sectionId} .movie-container`);
    movieContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('img');
        movieElement.src = `${IMG_URL}${movie.poster_path}`;
        movieElement.alt = movie.title;
        movieContainer.appendChild(movieElement);
    });
};

// Fetch and set a random banner image and its information
const setRandomBanner = async () => {
    const res = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`);
    const data = await res.json();
    const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
    const banner = document.getElementById('banner');
    const movieTitle = document.getElementById('movie-title');
    const movieOverview = document.getElementById('movie-overview');

    banner.style.backgroundImage = `url(${IMG_URL}${randomMovie.backdrop_path})`;
    movieTitle.textContent = randomMovie.title || randomMovie.name;
    movieOverview.textContent = randomMovie.overview;
};

// Fetch data for different categories
fetchMovies(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`, 'trending');
fetchMovies(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`, 'top-rated');
fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`, 'action-movies');
fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`, 'romance-movies'); // Romance
fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`, 'horror-movies'); // Horror
fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=53`, 'thriller-movies'); // Thriller

// Set random banner image and info on page load
setRandomBanner();
