"use client";
import axios from "axios";
import { on } from "events";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Signup() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    const onSignup = async () => {};

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl mb-4">Signup</h1>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                value={user.username}
                placeholder="username"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="bg-white text-black p-2 rounded mb-4"
            />
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
                onClick={onSignup}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white"
            >
                Signup
            </button>
            <Link href="/login" className="underline">Login page</Link>
        </div>
    );
}

export default Signup;
