"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { cookies } from "next/headers";
const CreateMoviePage = () => {
    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [genre, setGenre] = useState("");
    const [image, setImage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post("/api/movies/create", {
                title,
                director,
                releaseDate,
                genre,
                image

            });
            router.push("/movies");
        } catch (error) {
            console.error("Error creating movie:", error);
        }
    };

    return (
        <div>
            <Link className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" href={`/movies`}>
                Back
            </Link>
            <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                <h1 className="font-bold mb-10 mt-10">Add New Movie</h1>
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
                        className="mb-8shadow appearance-none border rounded w-[250px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mb-10">
                    <label>Release Date</label>
                    <input
                        className="mb-8shadow appearance-none border rounded w-[250px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mb-10">
                    <label>Genre</label>
                    <input
                        className="mb-8shadow appearance-none border rounded w-[250px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mb-10">
                    <label>Image URL</label>
                    <input
                        className="mb-8shadow appearance-none border rounded w-[250px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Add Movie
                </button>
            </form>
        </div>
    );
};

export default CreateMoviePage;
