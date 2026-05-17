"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";

function Login() {
    const router = useRouter();
    const { login } = useAuth();
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
            login(response.data.user);
            router.push("/");
        } catch (err: any) {
            toast(err.message);
        } finally {
            setUser({
                email: "",
                password: "",
            });
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
        <main className="flex min-h-screen items-center justify-center bg-white px-4 py-8">
            <section className="w-full max-w-md rounded-4xl border border-black/10 bg-white p-10 shadow-[0_35px_60px_-25px_rgba(0,0,0,0.2)]">
                <div className="mb-8 text-center">
                    <p className="text-sm uppercase tracking-[0.35em] text-black/60">
                        Secure access
                    </p>
                    <h1 className="mt-4 text-3xl font-black text-black">
                        {loading ? "Processing..." : "Login"}
                    </h1>
                </div>

                <div className="flex flex-col gap-4">
                    <label
                        className="text-sm font-medium text-black/90"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={user.email}
                        placeholder="Enter email"
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                        className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-black outline-none transition focus:border-black"
                    />

                    <label
                        className="text-sm font-medium text-black/90"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={user.password}
                        placeholder="Enter password"
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                        className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-black outline-none transition focus:border-black"
                    />
                </div>

                <button
                    onClick={onLogin}
                    className="mt-8 w-full rounded-full border border-black bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-black/90 disabled:border-black/20 disabled:bg-black/10 disabled:text-black/40"
                    disabled={buttonDisabled}
                >
                    Login
                </button>

                <p className="mt-6 text-center text-sm text-black/70">
                    Don’t have an account?{" "}
                    <Link
                        href="/signup"
                        className="font-semibold text-black underline underline-offset-4"
                    >
                        Signup
                    </Link>
                </p>
            </section>
        </main>
    );
}

export default Login;
