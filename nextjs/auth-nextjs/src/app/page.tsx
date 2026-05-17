import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-white px-4 py-8">
            <div className="w-full max-w-4xl rounded-4xl border border-black/10 bg-white p-10 shadow-[0_35px_60px_-25px_rgba(0,0,0,0.25)]">
                <div className="flex flex-col gap-8 text-center">
                    <div>
                        <p className="uppercase tracking-[0.45em] text-sm font-semibold text-black/70">
                            Monochrome Auth
                        </p>
                        <h1 className="mt-6 text-5xl font-black leading-tight text-black">
                            A refined black and white authentication experience
                        </h1>
                    </div>
                    <p className="max-w-2xl mx-auto text-lg leading-8 text-black/80">
                        A minimal authentication UI built using Next.js,
                        MongoDB, and JWT. Every page uses only black and white
                        styling for a crisp, elegant interface.
                    </p>
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center ">
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center rounded-full border border-black bg-black px-7 py-3 text-sm font-semibold text-[white]! transition hover:bg-black/90"
                        >
                            Log In
                        </Link>
                        <Link
                            href="/signup"
                            className="inline-flex items-center justify-center rounded-full border border-black bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-black/5"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
