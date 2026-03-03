import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import "./Navbar.css";
import logo from "../../img/imflixLogo.png";
import { Link } from 'react-router-dom';
import { useClerk } from "@clerk/clerk-react";
import { UserButton } from "@clerk/clerk-react";

const Nav = () => {
  const [scroll, setScroll] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const { signOut } = useClerk();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchInput(query);

    if (query.length > 0) {
      navigate(`/search?q=${query}`);
    } else {
      navigate(`/`);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 190) {
        setScroll(true);
      } else setScroll(false);
    });
  }, []);
  return (
    <div className={`nav flex items-center justify-between px-6 py-3 ${scroll && "nav_black"}`}>
    <div className="flex items-center space-x-6">
      <img
        className="h-8 w-auto"
        src={logo}
        alt="Imflix Logo"
      />

      <Link to="/" className="text-sm font-semibold text-gray-400 uppercase cursor-pointer hover:text-white">Home</Link>
      <Link to="/Movies" className="text-sm font-semibold text-gray-400 uppercase cursor-pointer hover:text-white">Movies</Link>
      <Link to="/TvSeries" className="text-sm font-semibold text-gray-400 uppercase cursor-pointer hover:text-white">TV Series</Link>
      <Link to="/Mylist"className="text-sm font-semibold text-gray-400 uppercase cursor-pointer hover:text-white">WatchList</Link>
    </div>
    <div className="flex items-center bg-black/50 border border-white/30 px-2 py-1 ml-auto rounded">
        <Search size={20} className="text-gray-400" />
        <input
          type="text"
          value={searchInput}
          onChange={handleSearch}
          placeholder="Titles, people, genres"
          className="bg-transparent border-none outline-none ml-2 text-white text-sm w-44 focus:w-64 transition-all duration-300"
        />
    </div>
    
    <div className="ml-4">
      <button 
      onClick={() => signOut()} 
      className="bg-[#db202c] text-black px-3 py-1 rounded text-sm font-bold"
    >
      Sign Out
    </button>
    </div>
    </div>
  );
};

export default Nav;