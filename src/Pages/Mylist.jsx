import Moviecard from "../components/Movies/Moviecard";
import useMyList from '../Hooks/useMyList';

export default function MyList({ onSelect }) {
  const { myList } = useMyList();

  return (
    <div className="bg-black flex flex-col min-h-screen text-white">
      
    <div className="px-8 pt-32 flex-grow">
      <h1 className="text-4xl font-bold mb-8">Watchlist</h1>  
        {myList.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-10 gap-x-4">
            {myList.map((movie) => (
              <Moviecard 
                key={movie.id} 
                movie={movie} 
                onSelect={onSelect} 
              />
            ))}
          </div>
        ) : (
          <div className="text-gray-500 mt-20 text-center">
            <p className="text-xl">You haven't added anything to your list yet.</p>
          </div>
        )}
    </div>
    </div>
  );
}
