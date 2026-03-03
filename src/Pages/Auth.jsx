import logo from "../img/imflixLogo.png";
import { SignIn, useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import WelcomeBanner from "../img/WelcomeBanner.jpg"
import "./Auth.css";

export default function Auth() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const loginAsGuest = async () => {
        if (!isLoaded) return;
        setError("");

        try {
        const result = await signIn.create({
            identifier: "guest@gmail.com",
            password: "GuestUser@123",
        });

        if (result.status === "complete") {
            await setActive({ session: result.createdSessionId });
            navigate("/");
        } else {
            console.log("Incomplete sign-in status:", result.status);
            setError("Guest account requires verification. Please check Clerk settings.");
        }
        } catch (err) {
        console.error("Guest login failed", err);
        setError("Unable to login as guest. Try again later.");
        }
    };
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
        <div className="mb-2">
          <button 
            onClick={loginAsGuest}
            className="px-32 py-2 bg-[#db202c] hover:bg-[#444] text-white font-bold rounded-xl transition-all text-lg border-t border-white/5"
          >
            Sign in as Guest
          </button>
          {error && <p className="text-[#DB202C] text-xs mt-3 text-center">{error}</p>}
        </div>
        <SignIn 
          routing="hash"
          signUpUrl="/sign-up"
        />
      </div>
    </div>
  );
}