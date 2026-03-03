import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-7xl md:text-9xl font-extrabold text-red-600"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-6 text-xl md:text-2xl text-gray-300 text-center"
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="mt-8 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition"
      >
        Go Back Home
      </motion.button>
    </div>
  );
}