import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Moviecard from "../components/Movies/Moviecard";
import requests from "../Services/Tmdb";

export default function Search({ onSelect }) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchSearch = async () => {
      const res = await fetch(`https://api.themoviedb.org/3${requests.fetchSearch(query)}`);
      const data = await res.json();
      setSearchResults(data.results || []);
    };

    const timeoutId = setTimeout(fetchSearch, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="bg-black pt-32 px-8 pb-10">
      <h2 className="text-2xl mb-6 text-gray-400">
        Showing results for: <span className="text-white font-bold">{query}</span>
      </h2>
      
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-10 gap-x-4">
          {searchResults.map((movie) => (
            <Moviecard key={movie.id} movie={movie} onSelect={onSelect} />
          ))}
        </div>
      ) : (
        <div className="text-gray-500 mt-10">
          <p>No results found for "{query}".</p>
        </div>
      )}
    </div>
  );
}