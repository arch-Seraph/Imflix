import { Navigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home";
import Mylist from "./Pages/Mylist";
import Films from "./Pages/Films";
import Tvseries from "./Pages/TvSeries";
import Modal from "./components/Modal/Modal";
import { useState } from "react";
import Search from "./Pages/Search";
import Footer from "./components/Footer/Footer";
import ScrollTop from "./Hooks/ScrollTop";
import NotFound from "./Pages/404";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Auth from "./Pages/Auth";
import SignUp from "./Pages/Signup";

export default function App() {
  
  const [selectedMovie, setSelectedMovie] = useState(null);
      const handleSelect = (movie) => {
          setSelectedMovie(movie);
          document.body.style.overflow = "hidden";
      };
  
      const handleClose = () => {
          setSelectedMovie(null);
          document.body.style.overflow = "auto";
      };
  return (
    <>
    <SignedIn>
    <ScrollTop/>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home onSelect={handleSelect}/>} />
        <Route path="/Movies" element={<Films onSelect={handleSelect}/>} />
        <Route path="/Tvseries" element={<Tvseries onSelect={handleSelect}/>} />
        <Route path="/Mylist" element={<Mylist onSelect={handleSelect}/>} />
        <Route path="/search" element={<Search onSelect={handleSelect} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {selectedMovie && (
        <Modal 
          movie={selectedMovie} 
          onClose={handleClose} 
          onSelect={handleSelect} 
        />
      )}
    <Footer />
    </SignedIn>
    <SignedOut>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SignedOut>
    </>
  );
}