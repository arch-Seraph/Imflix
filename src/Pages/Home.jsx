import requests from "../Services/Tmdb";
import Banner from "../components/Banner/banner";
import Movies from "../components/Movies/Movies";

const homeRows = [
  { title: "Trending Now", fetchUrl: requests.fetchTrendingAll },
  { title: "Top Rated", fetchUrl: requests.fetchTopRated },
  { title: "Action Movies", fetchUrl: requests.fetchAction },
  { title: "Comedy", fetchUrl: requests.fetchComedy },
  { title: "Horror", fetchUrl: requests.fetchHorror },
  { title: "Romance", fetchUrl: requests.fetchRomance },
  { title: "Popular TV", fetchUrl: requests.fetchTrendingAll },
];

export default function Home({onSelect}) {
    return (
        <div className="bg-black min-h-screen text-white">
        <Banner onSelect={onSelect}/>
        <Movies onSelect={onSelect} rowConfig={homeRows} />
        </div>
    );
}