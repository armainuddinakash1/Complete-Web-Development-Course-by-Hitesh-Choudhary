"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function Profile() {
    const router = useRouter();
    const [userId, setUserId] = useState("nothing");
    const logout = async () => {
        try {
            const response = await axios.post("/api/users/logout");
            toast(response.data.message);
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.response?.data?.error || error.message);
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/me", {
                withCredentials: true,
            });
            const userId = res.data.user._id;
            setUserId(userId);
        } catch (error: any) {
            console.error(error);
            toast.error(
                error.response?.data?.error ||
                    error.message ||
                    "Failed to fetch user details",
            );
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-white px-4 py-8">
            <section className="w-full max-w-2xl rounded-4xl border border-black/10 bg-white p-10 shadow-[0_35px_60px_-25px_rgba(0,0,0,0.2)]">
                <div className="text-center">
                    <p className="text-sm uppercase tracking-[0.35em] text-black/60">
                        Account profile
                    </p>
                    <h1 className="mt-4 text-3xl font-black text-black">
                        Profile
                    </h1>
                </div>

                <div className="mt-8 rounded-3xl border border-black/10 bg-black/5 p-6">
                    <h2 className="text-lg font-semibold text-black">
                        Current status
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-black/80">
                        {userId === "nothing" ? (
                            "No user details loaded yet. Click below to fetch current session info."
                        ) : (
                            <Link
                                href={`/profile/${userId}`}
                                className="font-semibold underline"
                            >
                                {`User ID: ${userId}`}
                            </Link>
                        )}
                    </p>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <button
                        className="inline-flex w-full items-center justify-center rounded-full border border-black bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/90 sm:w-auto"
                        onClick={logout}
                    >
                        Logout
                    </button>
                    <button
                        className="inline-flex w-full items-center justify-center rounded-full border border-black bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-black/5 sm:w-auto"
                        onClick={getUserDetails}
                    >
                        Get User Details
                    </button>
                </div>
            </section>
        </main>
    );
}

export default Profile;
