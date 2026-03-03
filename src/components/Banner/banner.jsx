import React from 'react'
import { useEffect, useState } from "react"
import axios from "axios"
import { Info, Play } from 'lucide-react';

const API_KEY = import.meta.env.VITE_API_KEY;

const Banner = ({onSelect}) => {
    const [movie, setMovie] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`)
        
        const results = request.data.results;

        setMovie(results[Math.floor(Math.random() * results.length)]);
        }
        fetchData();
    }, []);

      return (
    <header
      className="h-[110vh] text-white flex flex-col justify-end pb-67 px-8 bg-cover bg-center relative"
      style={{
        backgroundImage: movie
          ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          : "none",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      

      <div className="relative max-w-xl">
        <h1 className="text-4xl font-bold mb-4">
          {movie?.title || movie?.name}
        </h1>

        <p className="text-sm mb-4 line-clamp-3">
          {movie?.overview}
        </p>

        <div className="flex space-x-4">
          <button className="bg-white text-black hover:bg-gray-400 px-5 py-2 rounded font-semibold flex items-center gap-x-2 transition">
            <Play size={24} />
            <span>Play</span>
          </button>

          <button
          onClick={(e) => {
              e.stopPropagation();
              onSelect(movie);
            }}
          className="bg-gray-700/70 hover:bg-gray-700 px-3 py-2 rounded font-semibold flex items-center gap-x-2 transition">
            <Info size={24} /> 
            <span>More Info</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Banner;