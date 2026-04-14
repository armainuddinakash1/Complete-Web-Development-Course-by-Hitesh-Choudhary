const githubPrefetchCache = new Map();

export async function prefetchGithubUser(githubId) {
    if (!githubId) return null;
    const key = githubId.toLowerCase();

    if (githubPrefetchCache.has(key)) {
        return githubPrefetchCache.get(key);
    }

    const promise = Promise.all([
        fetch(`https://api.github.com/users/${key}`).then((res) => {
            if (!res.ok) throw new Error("GitHub user not found.");
            return res.json();
        }),
        fetch(
            `https://api.github.com/users/${key}/repos?per_page=6&sort=updated`,
        ).then((res) => {
            if (!res.ok) throw new Error("Unable to fetch repositories.");
            return res.json();
        }),
    ])
        .then(([profile, repos]) => ({ profile, repos }))
        .catch((error) => {
            githubPrefetchCache.delete(key);
            throw error;
        });

    githubPrefetchCache.set(key, promise);
    return promise;
}

export function getPrefetchedGithubUser(githubId) {
    if (!githubId) return null;
    return githubPrefetchCache.get(githubId.toLowerCase()) ?? null;
}
