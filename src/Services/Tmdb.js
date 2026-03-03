const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const requests = {
  fetchSearch: (query) => `/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false`,

    // ================= ALL =================
  fetchTrendingAll: `${BASE_URL}/trending/all/week?api_key=${API_KEY}`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
  fetchPopular: `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
  fetchUpcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
  fetchTV: `${BASE_URL}/tv/popular?api_key=${API_KEY}`,
  fetchAction: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedy: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorror: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomance: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,

  // ================= MOVIES =================
  fetchTrendingMovies: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRatedMovies: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
  
  // ================= TV SERIES =================
  fetchNetflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`, 
  fetchTrendingTV: `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`,
  fetchActionAdventureTV: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10759`,
  fetchComedyTV: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=35`,
  fetchSciFiFantasyTV: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=10765`,
  fetchAnimationTV: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16`,
};

export default requests;