import NotFound from "../components/NotFound";

export function meta() {
    return [
        { title: "404 | React Router App" },
        { name: "description", content: "Page not found." },
    ];
}

export default function NotFoundRoute() {
    return <NotFound />;
}
