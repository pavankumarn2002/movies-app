"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
const UpdateMoviePage = ({ params }) => {
    const { id } = params;
    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [genre, setGenre] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`/api/movies/${id}`);
                const movie = response.data;
                setTitle(movie.title);
                setDirector(movie.director);
                setReleaseDate(movie.releaseDate);
                setGenre(movie.genre);
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        };

        fetchMovie();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.put(`/api/movies/update`, {
                id,
                title,
                director,
                releaseDate,
                genre,
            });
            router.push(`/movies/${id}`);
        } catch (error) {
            console.error("Error updating movie:", error);
        }
    };

    return (
        <div>
            <Link className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" href={`/movies`}>
                Back
            </Link>
            <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                <h1 className="font-bold">Update Movie</h1>
                <div className="flex flex-col mb-10">
                    <label>Title</label>
                    <input
                        className="mb-8shadow appearance-none border rounded w-[250px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mb-10">
                    <label>Director</label>
                    <input
                        className="mb-8shadow appearance-none border rounded w-[250px]  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mb-10">
                    <label>Release Date</label>
                    <input
                        className="mb-8shadow appearance-none border rounded w-[250px]  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mb-10">
                    <label>Genre</label>
                    <input
                        className="mb-8shadow appearance-none border rounded w-[250px]  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </div>
                <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Update Movie
                </button>
            </form>
        </div>
    );
};

export default UpdateMoviePage;
