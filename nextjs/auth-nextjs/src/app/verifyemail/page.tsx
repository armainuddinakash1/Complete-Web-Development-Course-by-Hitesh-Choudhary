"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function verifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    };
    useEffect(() => {
        if (token.length > 0) verifyUserEmail();
    }, [token]);

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    return (
        <main className="flex min-h-screen items-center justify-center bg-white px-4 py-8">
            <section className="w-full max-w-xl rounded-4xl border border-black/10 bg-white p-10 shadow-[0_35px_60px_-25px_rgba(0,0,0,0.2)]">
                <div className="space-y-6 text-center">
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-black/60">
                            Email verification
                        </p>
                        <h1 className="mt-4 text-4xl font-black text-black">
                            Verify Your Email
                        </h1>
                    </div>

                    <div className="rounded-3xl border border-black/10 bg-black/5 px-5 py-4 text-left text-black">
                        <p className="text-sm font-medium text-black/80">
                            Token
                        </p>
                        <p className="mt-2 break-all text-black">
                            {token ? token : "No token found"}
                        </p>
                    </div>

                    {verified && (
                        <div className="rounded-3xl border border-black/10 bg-black text-white p-5">
                            <h2 className="text-xl font-semibold">
                                Email Verified
                            </h2>
                            <Link
                                href="/login"
                                className="mt-3 inline-block text-sm underline"
                            >
                                Login
                            </Link>
                        </div>
                    )}

                    {error && (
                        <div className="rounded-3xl border border-black/10 bg-black text-white p-5">
                            <h2 className="text-xl font-semibold">
                                Verification failed
                            </h2>
                            <p className="mt-2 text-sm text-white/85">
                                Please check your email link and try again.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
