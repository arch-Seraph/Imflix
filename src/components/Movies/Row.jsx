import { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import Moviecard from './Moviecard';
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Row({title, fetchUrl, onSelect}) {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try{
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results || []);
                return request;
            } catch (error) {
            console.error("Fetch error:", error);
            setMovies([]);}
        }
        fetchData();
    }, [fetchUrl]);
    
    const rowRef = useRef(null);
    const scroll = (direction) => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === "left" 
                ? scrollLeft - clientWidth 
                : scrollLeft + clientWidth;
            rowRef.current.scrollTo({
                left: scrollTo,
                behavior: "smooth"
            });
        }
    };

    return(
        <div className="relative group mt-8 mr-2">
            <h2 className="text-white text-2xl font-bold ml-8">{title}</h2>
            
            <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-0 bottom-0 z-30 w-12 h-60 mt-18  bg-black/30 opacity-0 group-hover:opacity-100 transition">
                <ChevronLeft size={50}/>
            </button>

            <div ref={rowRef} className="flex overflow-x-scroll overflow-y-hidden px-8 space-x-4 scrollbar-hide py-10">
                {movies.map((movie) => (
                    <Moviecard 
                    key= {movie.id}
                    movie= {movie}
                    onSelect= {onSelect}
                    />
                    ))
                }
            </div>

            <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-0 bottom-0 z-30 w-12 h-60 mt-18  bg-black/30 opacity-0 group-hover:opacity-100 transition">
                <ChevronRight size={50}/>
            </button>
        </div>
    )
};