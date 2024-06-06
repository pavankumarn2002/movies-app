"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const MoviesPage = () => {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([
        {
            id: "",
            title: "",
            director: "",
            releaseDate: "",
            genre: "",
        },
    ]);
    const [m, setM] = useState([
        {
            id: "",
            title: "",
            director: "",
            releaseDate: "",
            genre: "",
        },
    ]);
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get("/api/movies", {
                    params: { search },
                });
               
              
                setMovies(response.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        const filtered = movies.filter((item) =>
            item.title.toLowerCase().includes(e.target.value.toLowerCase())
          );
          console.log(filtered)
          setM(filtered);
    };
    
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold mb-10 mt-2">Movies</h1>
            <input className="mb-8shadow appearance-none border rounded w-250 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Search movies..." value={search} onChange={handleSearchChange} />
            <ul className="my-10">
                {m.map((movie) => (
                    <li key={movie.id}>
                        <Link href={`/movies/${movie.id}`}>
                            {movie.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <Link className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" href="/movies/create">
                Add New Movie
            </Link>
        </div>
    );
};

export default MoviesPage;
