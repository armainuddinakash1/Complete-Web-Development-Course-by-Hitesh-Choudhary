"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";

function Navbar() {
    const router = useRouter();
    const { user, loading, logout } = useAuth();

    const logoutFunc = async () => {
        try {
            const response = await axios.post("/api/users/logout");
            toast(response.data.message);
            logout();
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.response?.data?.error || error.message);
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-black/10">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-black font-black text-xl tracking-tight uppercase hover:opacity-60 transition-opacity duration-200"
                >
                    Next<span className="font-light">Auth</span>
                </Link>

                {/* Right side */}
                <div className="flex items-center gap-6">
                    {/* Loading skeleton */}
                    {loading && (
                        <div className="flex items-center gap-3">
                            <div className="h-3 w-20 bg-black/10 rounded-full animate-pulse" />
                            <div className="h-8 w-16 bg-black/10 rounded-full animate-pulse" />
                        </div>
                    )}

                    {/* Logged in */}
                    {user && !loading && (
                        <div className="flex items-center gap-5">
                            <Link
                                href="/profile"
                                className="flex items-center gap-2 group"
                            >
                                {/* Avatar circle */}
                                <span className="w-8 h-8 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center uppercase group-hover:bg-black/70 transition-colors duration-200">
                                    {user.username?.[0] ?? "U"}
                                </span>
                                <span className="text-sm font-medium text-black group-hover:opacity-60 transition-opacity duration-200 hidden sm:block">
                                    {user.username}
                                </span>
                            </Link>

                            <div className="w-px h-5 bg-black/15" />

                            <button
                                onClick={logoutFunc}
                                className="text-sm font-medium text-black border border-black rounded-full px-4 py-1.5 hover:bg-black hover:text-white transition-all duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    )}

                    {/* Logged out */}
                    {!user && !loading && (
                        <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className="text-sm font-medium text-black hover:opacity-60 transition-opacity duration-200"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="text-sm font-semibold text-white bg-black rounded-full px-5 py-2 hover:bg-black/75 transition-colors duration-200"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
