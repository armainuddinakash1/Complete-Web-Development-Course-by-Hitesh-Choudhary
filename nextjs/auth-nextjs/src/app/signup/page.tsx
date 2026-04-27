"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMemo, useState } from "react";

export default function SignupPage() {
  type FormSubmitEvent = Parameters<NonNullable<React.ComponentProps<"form">["onSubmit"]>>[0];

  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isFormValid = useMemo(() => {
    return (
      user.username.trim().length >= 3 &&
      /^\S+@\S+\.\S+$/.test(user.email) &&
      user.password.length >= 6
    );
  }, [user]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    if (error) setError("");
    if (success) setSuccess("");
  };

  const onSignup = async (event: FormSubmitEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!isFormValid) {
      setError("Please enter a valid username, email, and password.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/users/signup", user);
      setSuccess("Account created successfully. Redirecting to login...");
      setUser({ email: "", password: "", username: "" });

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (signupError: unknown) {
      if (axios.isAxiosError(signupError)) {
        setError(signupError.response?.data?.error || "Signup failed. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900">Create account</h1>
        <p className="mt-1 text-sm text-slate-600">Sign up to get started.</p>

        <form className="mt-6 space-y-4" onSubmit={onSignup}>
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Full name
            </label>
            <input
              id="name"
              name="username"
              type="text"
              placeholder="John Doe"
              value={user.username}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 text-black"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={user.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 text-black"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="text"
              placeholder="Create a password"
              value={user.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 text-black"
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {success ? <p className="text-sm text-emerald-600">{success}</p> : null}

          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-slate-900 underline underline-offset-2"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
