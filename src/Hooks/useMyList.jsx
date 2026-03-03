import { useState, useEffect } from "react";

export default function useMyList() {
    const [myList, setMyList] = useState(() => {
        const saved = localStorage.getItem("imflix_mylist");
        return saved ? JSON.parse(saved) : [];
    });
    useEffect(() => {
        localStorage.setItem("imflix_mylist", JSON.stringify(myList));
    }, [myList]);
    const toggleList = (movie) => {
        const isAdded = myList.find((m) => m.id === movie.id);
        if (isAdded){
            setMyList(myList.filter((m) => m.id !== movie.id))
        } else {
            setMyList([...myList, movie]);
        }
    };

    const isInList = (movieId)  => myList.some((m) => m.id === movieId)
  return { myList, toggleList, isInList}
}
