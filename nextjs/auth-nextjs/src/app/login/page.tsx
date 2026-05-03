"use client";
import axios from "axios";
import { on } from "events";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const onLogin = async () => {};

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl mb-4">Login</h1>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={user.email}
                placeholder="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="bg-white text-black p-2 rounded mb-4"
            />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={user.password}
                placeholder="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="bg-white text-black p-2 rounded mb-4"
            />
            <button
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white"
            >
                Login
            </button>
            <Link href="/signup" className="underline">
                Signup 
            </Link>
        </div>
    );
}

export default Login;
