"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
const MovieDetailsPage = ({ params }) => {
    const { id } = params;
    const [movie, setMovie] = useState({
        id: "",
        title: "",
        director: "",
        releaseDate: "",
        genre: "",
    });
    const router = useRouter();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`/api/movies/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        };

        fetchMovie();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/movies/delete`, { data: { id } });
            router.push("/movies");
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    };

    if (!movie) return <div>Loading...</div>;

    return (
        <div>
            <Link className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" href={`/movies`}>
                Back
            </Link>
            <div className="flex flex-col justify-center items-center">
                <h1 className="font-bold mb-10">{movie.title}</h1>
                <p className="mb-10">
                    <span className="font-bold">Director:</span> {movie.director}
                </p>
                <p className="mb-10">
                    <span className="font-bold">DirectorRelease Date:</span> {new Date(movie.releaseDate).toLocaleDateString()}
                </p>
                <p className="mb-10">
                    <span className="font-bold">DirectorGenre:</span> {movie.genre}
                </p>
                <button
                    className="mb-10 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleDelete}
                >
                    Delete
                </button>
                <button className=" mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline">
                    <Link href={`/movies/update/${id}`}>Update</Link>
                </button>
            </div>
        </div>
    );
};

export default MovieDetailsPage;
