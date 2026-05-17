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
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl mb-4">Profile</h1>
            <h2 className="text-xl">
                {userId === "nothing" ? (
                    "Nothing"
                ) : (
                    <Link
                        href={`/profile/${userId}`}
                    >{`User ID: ${userId}`}</Link>
                )}
            </h2>
            {/* Fix the bug on get user details click */}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
                onClick={logout}
            >
                Logout
            </button>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
                onClick={getUserDetails}
            >
                Get User Details
            </button>
        </div>
    );
}

export default Profile;
