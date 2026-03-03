import { SignUp } from "@clerk/clerk-react";
import logo from "../img/imflixLogo.png";
import WelcomeBanner from "../img/WelcomeBanner.jpg"
import "./Auth.css";

export default function Signup() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${WelcomeBanner})` }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <header className="absolute top-0 left-0 w-full p-8 z-20">
        <img src={logo} alt="Imflix" className="h-10 md:h-12 ml-4 md:ml-10" />
      </header>
      <div className="flex flex-col items-center dark z-100">
        <SignUp
          routing="hash"
          signInUrl="/"
        />
      </div>
    </div>
  );
}