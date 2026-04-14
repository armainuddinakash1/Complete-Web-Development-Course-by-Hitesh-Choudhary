import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
    getPrefetchedGithubUser,
    prefetchGithubUser,
} from "../utils/githubCache";

export default function GitHubDashboard() {
    let { githubId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState({ profile: null, repos: [] });

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError(null);

        const cached = getPrefetchedGithubUser(githubId);
        const load = cached ? cached : prefetchGithubUser(githubId);

        load.then((result) => {
            if (!mounted) return;
            setData(result);
            setLoading(false);
        }).catch((fetchError) => {
            if (!mounted) return;
            setError(fetchError.message || "Unable to load GitHub data.");
            setLoading(false);
        });

        return () => {
            mounted = false;
        };
    }, [githubId]);

    return (
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        GitHub Dashboard
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Viewing GitHub profile for{" "}
                        <span className="font-semibold">{githubId}</span>.
                    </p>
                </div>
                <Link
                    to="/"
                    className="inline-flex items-center rounded-full bg-orange-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600"
                >
                    Back to Home
                </Link>
            </div>

            {loading ? (
                <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-700 shadow-sm">
                    Loading GitHub profile...
                </div>
            ) : error ? (
                <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center text-red-700 shadow-sm">
                    <p className="text-lg font-semibold">{error}</p>
                    <p className="mt-2 text-sm">
                        Try a different GitHub username.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                        <img
                            src={data.profile.avatar_url}
                            alt={data.profile.login}
                            className="h-32 w-32 rounded-full object-cover"
                        />
                        <div className="mt-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {data.profile.name || data.profile.login}
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                @{data.profile.login}
                            </p>
                        </div>

                        <div className="mt-6 space-y-4 text-sm text-gray-700">
                            {data.profile.bio && <p>{data.profile.bio}</p>}
                            <div className="rounded-3xl bg-gray-50 p-4">
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div>
                                        <span className="block text-xs uppercase tracking-[0.24em] text-gray-500">
                                            Followers
                                        </span>
                                        <p className="mt-1 text-xl font-semibold text-gray-900">
                                            {data.profile.followers}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="block text-xs uppercase tracking-[0.24em] text-gray-500">
                                            Following
                                        </span>
                                        <p className="mt-1 text-xl font-semibold text-gray-900">
                                            {data.profile.following}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="block text-xs uppercase tracking-[0.24em] text-gray-500">
                                            Public repos
                                        </span>
                                        <p className="mt-1 text-xl font-semibold text-gray-900">
                                            {data.profile.public_repos}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="block text-xs uppercase tracking-[0.24em] text-gray-500">
                                            Stars
                                        </span>
                                        <p className="mt-1 text-xl font-semibold text-gray-900">
                                            {data.repos.reduce(
                                                (sum, repo) =>
                                                    sum + repo.stargazers_count,
                                                0,
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3 text-sm text-gray-600">
                            {data.profile.company && (
                                <p>
                                    <strong>Company:</strong>{" "}
                                    {data.profile.company}
                                </p>
                            )}
                            {data.profile.location && (
                                <p>
                                    <strong>Location:</strong>{" "}
                                    {data.profile.location}
                                </p>
                            )}
                            {data.profile.blog && (
                                <p>
                                    <strong>Website:</strong>{" "}
                                    <a
                                        href={
                                            data.profile.blog.startsWith("http")
                                                ? data.profile.blog
                                                : `https://${data.profile.blog}`
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-orange-700 hover:underline"
                                    >
                                        {data.profile.blog}
                                    </a>
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Latest repositories
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Most recently updated repositories from
                                        GitHub.
                                    </p>
                                </div>
                                <a
                                    href={data.profile.html_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm font-semibold text-orange-700 hover:text-orange-600"
                                >
                                    View on GitHub
                                </a>
                            </div>

                            <div className="mt-6 space-y-4">
                                {data.repos.length === 0 ? (
                                    <p className="text-sm text-gray-500">
                                        No repositories available.
                                    </p>
                                ) : (
                                    data.repos.map((repo) => (
                                        <div
                                            key={repo.id}
                                            className="rounded-3xl border border-gray-200 p-4 hover:border-orange-300"
                                        >
                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <a
                                                        href={repo.html_url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-base font-semibold text-gray-900 hover:text-orange-700"
                                                    >
                                                        {repo.name}
                                                    </a>
                                                    <p className="mt-1 text-sm text-gray-600">
                                                        {repo.description ||
                                                            "No description."}
                                                    </p>
                                                </div>
                                                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                                                    ⭐ {repo.stargazers_count}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
