import UserDashboard from "../components/UserDashboard";

export function meta() {
    return [
        { title: "User Dashboard | React Router App" },
        {
            name: "description",
            content: "View the dashboard for a specific user.",
        },
    ];
}

export default function UserRoute() {
    return <UserDashboard />;
}
