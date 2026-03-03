import { useState, useEffect } from "react";
import { X, Play, Plus, VolumeX, Volume2, Check } from "lucide-react";
import YouTube from "react-youtube";
import useMyList from "../../Hooks/useMylist";

const API_KEY = import.meta.env.VITE_API_KEY;
const imageBaseUrl = "https://image.tmdb.org/t/p/original";
const recBaseUrl = "https://image.tmdb.org/t/p/w500";

export default function Modal({ movie, onClose, onSelect }) {
  const { toggleList, isInList } = useMyList();
  const added = isInList(movie?.id);
  const [recommendations, setRecommendations] = useState([]);
  const [details, setDetails] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!movie) return;

  const fetchData = async () => {
        //TV show or a Movie
        const isTV = movie.media_type === "tv" || movie.first_air_date ? true : false;
        const mediaType = isTV ? "tv" : "movie";

        //Fetch Details
        const detailsRes = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${movie.id}?api_key=${API_KEY}&append_to_response=videos`
        );
        const detailsData = await detailsRes.json();
        setDetails(detailsData);

        if (detailsData?.videos?.results) {
          const trailer = detailsData.videos.results.find(
            (vid) => vid.type === "Trailer" && vid.site === "YouTube"
          );
         const fallback = detailsData.videos.results[0]; 
                
         setTrailerUrl(trailer ? trailer.key : (fallback ? fallback.key : ""));
          }

        //Fetch Recommendations
        const recRes = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${movie.id}/recommendations?api_key=${API_KEY}`
        );
        const recData = await recRes.json();
        setRecommendations(recData.results?.slice(0, 6) || []);
      };

    fetchData();
    const modalContainer = document.getElementById("modal-scroll-container");
    if (modalContainer) modalContainer.scrollTop = 0;

  }, [movie]);

  if (!movie) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center pt-10 pb-3"
      onClick={onClose}
    >
      <div
        id="modal-scroll-container"
        className="relative bg-[#181818] w-[800px] max-h-[92vh] max-w-4xl overflow-y-auto scrollbar-hide rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 bg-[#181818] p-2 z-50 rounded-full text-white hover:bg-white/20 transition"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* HERO SECTION */}
        <div className="relative h-[400px] w-full overflow-hidden">
          {trailerUrl ? (
            <div className="absolute top-[-20%] left-0 w-full h-[140%] pointer-events-none">
              <YouTube
                videoId={trailerUrl}
                opts={{
                  width: "100%",
                  height: "100%",
                  playerVars: {
                    autoplay: 1,
                    controls: 0,
                    mute: isMuted ? 1 : 0,
                    loop: 1,
                    playlist: trailerUrl,
                    modestbranding: 1,
                  },
                }}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <img
              src={`${imageBaseUrl}${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#181818] to-transparent" />
          
          {/* Action Buttons Overlay */}
          <h2 className="absolute bottom-13 left-10 text-4xl font-bold text-white mb-2">{movie.title || movie.name}</h2>
          <div className="absolute bottom-0 left-10 flex items-center space-x-3 w-full">
            <button className="bg-white text-black px-8 py-2 rounded flex items-center gap-x-2 font-bold hover:bg-gray-300 transition">
              <Play size={24} fill="black" /> Play
            </button>
            <button 
              onClick={() => toggleList(movie)}
              className="border-2 border-gray-500 p-2 rounded-full text-white hover:border-white transition">
              {added ? <Check size={20} /> : <Plus size={20} />}
            </button>
            <div className="flex-grow"></div>
            {trailerUrl && (
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="mr-10 border-2 border-gray-500 p-2 rounded-full text-white hover:border-white transition z-10"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            )}
          </div>
        </div>

        {/* INFO SECTION */}
        <div className="pt-8 pl-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-2 text-sm font-semibold">
              <span className="text-green-500">
                {movie.vote_average ? Math.round(movie.vote_average * 10) + "% Match" : "New"}
              </span>
              <span className="text-gray-300">
                {(movie.release_date || movie.first_air_date)?.substring(0, 4)}
              </span>
              {(details?.runtime || (details?.episode_run_time && details?.episode_run_time[0])) && (
                <span className="text-gray-300">
                  {Math.floor((details.runtime || details.episode_run_time[0]) / 60) > 0 
                    ? `${Math.floor((details.runtime || details.episode_run_time[0]) / 60)}h ` 
                    : ''}
                  {(details.runtime || details.episode_run_time[0]) % 60}m
                </span>
              )}
              <span className="border border-gray-500 px-1 text-[10px] text-gray-300 rounded-sm font-normal">
                HD
              </span>
            </div>
            <p className="text-white text-base leading-relaxed">{movie.overview}</p>
          </div>

          {/*Genres & Languages*/}
          <div className="text-sm space-y-4 text-gray-400">
            <div>
              <span className="text-gray-500">Genres: </span>
              <span className="text-white">{details?.genres?.map(g => g.name).join(", ")}</span>
            </div>
            <div>
              <span className="text-gray-500">Available in: </span>
              <span className="text-white">{details?.spoken_languages?.map(l => l.english_name).join(", ")}</span>
            </div>
          </div>
        </div>

        {/*MORE LIKE THIS*/}
        <div className="px-10 pb-10">
          <h3 className="text-white text-2xl font-bold mb-6">More Like This</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {recommendations.map((rec) => (
              <div 
                key={rec.id} 
                className="bg-[#2f2f2f] rounded-md overflow-hidden cursor-pointer hover:scale-105 transition duration-300"
                onClick={() => onSelect(rec)}
              >
                <img 
                  src={rec.backdrop_path ? `${recBaseUrl}${rec.backdrop_path}` : "https://via.placeholder.com/500x281?text=No+Image"} 
                  className="w-full aspect-video object-cover" 
                  alt={rec.title} 
                />
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <p className="text-white font-bold text-sm line-clamp-1">{rec.title || rec.name}</p>
                    <span className="text-green-500 text-xs font-bold shrink-0 ml-2">
                      {Math.round(rec.vote_average * 10)}%
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs line-clamp-3">{rec.overview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}