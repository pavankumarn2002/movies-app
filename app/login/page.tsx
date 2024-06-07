"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { cookies } from "next/headers";
export default function Login() {
    const router = useRouter();
    const [info, setInfo] = useState({ email: "", password: "" });
    const [pendingState, setPendingState] = useState(false);
    const handleChange = (e:any) => {
        setInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            setPendingState(true)
            // const res=await signIn('credentials',{
            //     email:info.email,
            //     password:info.password
            // })
            // if(res?.error){
            //     setPendingState(false)
            // }
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(info),
              })
              const data=await response.json()
              if (response.ok) {
            // window.localStorage.setItem("payload",JSON.stringify(data.payload))
            // cookies().set("token",JSON.stringify(data.payload.token))
               // router.push('/movies')
              } else {
                // Handle errors
              }
            router.replace('/home')
        } catch (error) {
            setPendingState(false)
        }
    };
    return (
        <div>
            <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                <div className="flex flex-col mb-10">
                    <label>Email</label>
                    <input
                        className="shadow appearance-none border rounded w-250 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        name="email"
                        id="name"
                        onChange={(e) => handleChange(e)}
                        value={info.email}
                    />
                </div>
                <div className="flex flex-col mb-10">
                    <label>Password</label>
                    <input
                        className="shadow appearance-none border rounded w-250 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => handleChange(e)}
                        value={info.password}
                    />
                    <div className="mt-10">
                        <button
                            disabled={pendingState ? true : false}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            {pendingState ? "Logging In" : "Login"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
