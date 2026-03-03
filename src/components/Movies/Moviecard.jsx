import { Play, Plus, Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import useMyList from "../../Hooks/useMylist";

const API_KEY = import.meta.env.VITE_API_KEY;

const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  10759: "Action & Adventure",
  10765: "Sci-Fi & Fantasy",
};

export default function Moviecard({ movie, onSelect }) {
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    if (!movie?.backdrop_path) return null;

    const [runtime, setRuntime] = useState(null);
    const fetchMovieDetails = async () => {
    if (runtime) return;
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`
    );
    const data = await res.json();
    setRuntime(data.runtime);
    };

    const { toggleList, isInList } = useMyList();
    const added = isInList(movie?.id);

  return (
    <div
      className="group/card relative min-w-[170px]  h-[240px] transition-all duration-300 ease-in-out hover:scale-125 hover:z-50 cursor-pointer"
      onMouseEnter={fetchMovieDetails}
    >
      <img
        className="w-full h-full object-cover rounded shadow-xl"
        src={`${imageBaseUrl}${movie.backdrop_path || movie.poster_path}`}
        alt={movie.title}
      />
      <div className="absolute top-0 left-[-20%] w-[120%] bg-[#181818] rounded shadow-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 delay-100 pointer-events-none group-hover/card:pointer-events-auto z-50">
        
        <img
          className="w-full h-[120px] object-cover rounded-t"
          src={`${imageBaseUrl}${movie.backdrop_path}`}
          alt="preview"
        />

        <div className="p-4 bg-[#181818]">
          <div className="flex space-x-2 mb-2">
            <button className="border-2 border-gray-500 rounded-full p-1 text-white hover:border-white"><Play size={16} fill="black" /></button>
            <button 
              onClick={() => toggleList(movie)}
              className="border-2 border-gray-500 rounded-full p-1 text-white hover:border-white transition">
              {added ? <Check size={16} /> : <Plus size={16} />}
            </button>
            <button 
            onClick={(e) => {
              e.stopPropagation();
              onSelect(movie);
            }}
            className="ml-auto border-2 border-gray-500 rounded-full p-1 text-white hover:border-white transition"
            >
            <ChevronDown size={16} />
            </button>
          </div>

          <h3 className="text-white font-bold text-sm truncate">
            {movie.title || movie.name}
          </h3>

          <div className="flex items-center space-x-2 text-xs text-white font-semibold">
            <span className="text-green-500">
              {movie.vote_average ? Math.round(movie.vote_average * 10) + "%" : "New"}
            </span>

            <span className="text-gray-300 font-normal">
              {(movie.release_date || movie.first_air_date)?.substring(0, 4)}
            </span>
            <span className="text-gray-300 font-normal">
                {runtime ? `${runtime} min` : ""}
            </span>
            <span className="ml-auto border border-gray-500 px-1 text-[10px] rounded-sm text-gray-300 font-normal">
              HD
            </span>
          </div>
            <div className="flex flex-wrap gap-1 mt-2 text-[11px] text-gray-400">
                {movie?.genre_ids?.slice(0, 3).map((id, index, array) => (
                    <span key={id}>
                        {genreMap[id]}
                        {index !== array.length - 1 && " • "}
                    </span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}