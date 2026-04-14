import { Link } from "react-router";

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
                <p className="mt-4 text-lg text-gray-600">
                    The page you are looking for does not exist.
                </p>
                <Link
                    to="/"
                    className="inline-block mt-6 px-5 py-3 rounded-lg bg-orange-700 text-white hover:bg-orange-600 transition"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
