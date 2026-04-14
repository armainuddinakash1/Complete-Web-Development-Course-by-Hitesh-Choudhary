import { Link, useParams } from "react-router";

export default function UserDashboard() {
    let { userId } = useParams();

    return (
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-200">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            User Dashboard
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Dashboard view for user ID{" "}
                            <span className="font-semibold text-orange-700">
                                {userId}
                            </span>
                            .
                        </p>
                    </div>
                    <Link
                        to="/"
                        className="inline-flex items-center rounded-full bg-orange-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600"
                    >
                        Back to Home
                    </Link>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl border border-gray-200 p-5 bg-orange-50">
                        <p className="text-sm font-semibold text-gray-500">
                            Projects
                        </p>
                        <p className="mt-3 text-3xl font-bold text-gray-900">
                            12
                        </p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 p-5 bg-white">
                        <p className="text-sm font-semibold text-gray-500">
                            Active Sessions
                        </p>
                        <p className="mt-3 text-3xl font-bold text-gray-900">
                            4
                        </p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 p-5 bg-white">
                        <p className="text-sm font-semibold text-gray-500">
                            Notifications
                        </p>
                        <p className="mt-3 text-3xl font-bold text-gray-900">
                            8
                        </p>
                    </div>
                </div>

                <div className="mt-10 rounded-3xl border border-gray-200 bg-gray-50 p-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Welcome back, user {userId}!
                    </h2>
                    <p className="mt-3 text-gray-600">
                        This section is your personalized dashboard. You can use
                        the URL parameter{" "}
                        <code className="rounded bg-white px-1 py-0.5 font-semibold">
                            userId
                        </code>{" "}
                        to load different user profiles.
                    </p>
                </div>
            </div>
        </div>
    );
}
