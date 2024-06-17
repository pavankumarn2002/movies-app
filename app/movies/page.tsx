"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MoviesPage = () => {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState([]);
    const [drop, setDrop] = useState(false);
    // const [mov, setMov] = useState([
    //     {
    //         id: "",
    //         title: "",
    //         director: "",
    //         releaseDate: "",
    //         genre: "",
    //     },
    // ]);
    const [movies, setMovies] = useState([
        {
            id: "",
            title: "",
            director: "",
            releaseDate: "",
            genre: "",
            image: "",
        },
    ]);
    const [m, setM] = useState([
        {
            id: "",
            title: "",
            director: "",
            releaseDate: "",
            genre: "",
            image: "",
        },
    ]);
    const fetchMovies = async () => {
        try {
            const response = await axios.get("/api/movies", {
                params: { search },
            });

            setMovies(response.data);
            setM(response.data);
            console.log("image", response.data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };
    useEffect(() => {
        fetchMovies();
    }, []);
    const fetchCart = async () => {
        try {
            let carts;
            const response = await axios.get("/api/cart");
            carts = await response.data;
            setCart(carts);
            console.log("carts", carts);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };
    useEffect(() => {
        fetchCart();
    }, []);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        const filtered = movies.filter((item) => item.title.toLowerCase().includes(e.target.value.toLowerCase()));
        console.log(filtered);
        setM(filtered);
    };
    const addToCart = async (id: any) => {
        let push = false;
        let mov = [
            {
                id: "",
                title: "",
                director: "",
                releaseDate: "",
                genre: "",
                image: "",
            },
        ];

        try {
            const response = await axios.get("/api/cart", {
                params: { search },
            });
            mov = await response.data;
            console.log("rr", mov);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
        try {
            const response = await axios.get(`/api/movies/${id}`);

            console.log("rr1", response.data.title);
            mov.map((item) => {
                if (item.title.toLowerCase() === response.data.title.toLowerCase()) {
                    push = true;
                    console.log("push", push);
                }
            });
            console.log("push", push);
            if (push) {
                alert("already exist");
            } else {
                try {
                    await axios.post("/api/cart/create", response.data);
                    push = false;
                    fetchCart();
                    // const res1=await res.data
                    // setCart(res1);
                    // router.push("/movies");
                } catch (error) {
                    console.error("Error creating movie:", error);
                }
            }
        } catch (error) {
            console.error("Error fetching movie:", error);
        }
    };
    const toggleDrop = () => {
        setDrop(!drop);
    };
    const deleteItem = async (id: any, e: any) => {
        console.log(id);
        try {
            const response = await axios.delete(`/api/cart/delete/${id}`);
            const deleteData = await response.data;
            await fetchCart();
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    };
    const handleLogout = async () => {
        await axios.post("api/auth/logout").then(() => {
            router.push(`/login`);
        });
    };

    return (
        <div className="">
            <div className="flex justify-between">
                <h1 className="font-bold">Movies</h1>
                <button
                    className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleLogout}
                >
                    logout
                </button>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="mb-5 flex flex-col items-center justify-center">
                    <button
                        className="bg-zinc-100 hover:bg-zinc-200 text-black font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={toggleDrop}
                    >
                        Cart : {cart?.length}
                    </button>
                    {drop ? (
                        <div className="flex flex-col justify-center items-center p-2 shadow-lg rounded-lg">
                            {cart?.map((item) => (
                                <li className="my-2 " key={item?.id}>
                                    <span className="text-sm">{item?.title}</span>
                                    <button
                                        className="text-sm ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={(e) => deleteItem(item.id, e)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </div>
                    ) : null}
                </div>
                <div className="flex justify-between gap-10">
                    <Link
                        className="w-[250px] text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        href="/movies/create"
                    >
                        Add New Movie
                    </Link>
                    <input
                        className="shadow appearance-none border rounded w-[250px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Search movies..."
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="mb-5 flex flex-wrap">
                    {m.map((movie) => (
                        <div className="flex flex-col m-2 items-center p-4 shadow-lg rounded-lg">
                            <div className="flex flex-col justify-center items-center mr-2 font-bold" key={movie.id}>
                                {movie.title}
                                <Link href={`/movies/${movie.id}`}>
                                    <img className="h-64 w-64 rounded-lg" src={movie.image} alt="salaar pic" />
                                </Link>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm p-2">{movie.director}</span>
                                <span className="text-sm p-2">{movie.genre}</span>
                            </div>
                            <button
                                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => addToCart(movie.id)}
                            >
                                Add To Cart
                            </button>
                        </div>
                    ))}
                </div>
                <Link
                        className="w-[250px] text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        href="/movies/create"
                    >
                        Add New Movie
                    </Link>
            </div>
        </div>
    );
};

export default MoviesPage;
