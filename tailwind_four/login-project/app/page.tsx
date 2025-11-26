import Image from "next/image";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-slate-950 ">
            <div className="w-full max-w-md bg-slate-300 rounded-lg shadow-md p-8 m-8">
                <h1 className="text-slate-950 text-2xl font-bold mb-6 text-center">
                    Login
                </h1>
                <form action="">
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-950"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm shadow-slate-500 focus- sm:text-sm p-2 text-slate-950 focus:outline-none focus:ring-0 focus:shadow-slate-950"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div className="mb-0">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-slate-950"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm shadow-slate-500 sm:text-sm p-2 text-slate-950 focus:outline-none focus:ring-0 focus:shadow-slate-950"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-6 w-full bg-slate-950 text-slate-300 py-2 px-4 rounded-md hover:bg-slate-800 focus:outline-none focus:ring-0 cursor-pointer font-semibold"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
