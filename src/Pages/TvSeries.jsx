import requests from "../Services/Tmdb";
import Banner from "../components/Banner/banner";
import Movies from "../components/Movies/Movies";
import Footer from '../components/Footer/Footer';

const homeRows = [
  { title: "Originals", fetchUrl: requests.fetchNetflixOriginals },
  { title: "Trending", fetchUrl: requests.fetchTrendingTV },
  { title: "Adventure", fetchUrl: requests.fetchActionAdventureTV },
  { title: "Comedy", fetchUrl: requests.fetchComedyTV },
  { title: "Sci-Fi", fetchUrl: requests.fetchSciFiFantasyTV },
  { title: "Animation", fetchUrl: requests.fetchAnimationTV },
  { title: "Popular TV", fetchUrl: requests.fetchTrendingAll },
];

export default function Tvseries({onSelect}) {
    return (
        <div className="bg-black min-h-screen text-white">
        <Banner onSelect={onSelect}/>
        <Movies onSelect={onSelect} rowConfig={homeRows} />
        <Footer />
        </div>
    );
}