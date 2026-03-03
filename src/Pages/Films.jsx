import requests from "../Services/Tmdb";
import Banner from "../components/Banner/banner";
import Movies from "../components/Movies/Movies";
import Footer from '../components/Footer/Footer';

const homeRows = [
  { title: "Trending Now", fetchUrl: requests.fetchTrendingMovies },
  { title: "Top Rated", fetchUrl: requests.fetchTopRatedMovies },
  { title: "Action Movies", fetchUrl: requests.fetchActionMovies },
  { title: "Comedy", fetchUrl: requests.fetchComedyMovies },
  { title: "Horror", fetchUrl: requests.fetchHorrorMovies },
  { title: "Romance", fetchUrl: requests.fetchRomanceMovies },
  { title: "Documentaries", fetchUrl: requests.fetchDocumentaries },
];

export default function Films({onSelect}) {
    return (
        <div className="bg-black min-h-screen text-white">
        <Banner onSelect={onSelect}/>
        <Movies onSelect={onSelect} rowConfig={homeRows} />
        <Footer />
        </div>
    );
}