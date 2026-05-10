"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Login() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            toast("User logged in successfully");
            router.push("/");
        } catch (err: any) {
            toast(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const notify = () => toast("Here is your toast.");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl mb-4">
                {loading ? "Processing..." : "Login"}
            </h1>
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
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white disabled:bg-gray-400"
                disabled={buttonDisabled}
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
