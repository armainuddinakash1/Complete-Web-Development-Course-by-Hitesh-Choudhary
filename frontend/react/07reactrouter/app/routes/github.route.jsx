import GitHubDashboard from "../components/GitHubDashboard";

export function meta() {
    return [
        { title: "GitHub Dashboard | React Router App" },
        {
            name: "description",
            content: "Fetch GitHub user data and display it in a dashboard.",
        },
    ];
}

export default function GitHubRoute() {
    return <GitHubDashboard />;
}
