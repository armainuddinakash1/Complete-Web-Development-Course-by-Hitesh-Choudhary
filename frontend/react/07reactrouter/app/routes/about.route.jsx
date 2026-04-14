import About from "../components/About";

export function meta() {
    return [
        { title: "About | React Router App" },
        { name: "description", content: "Learn more about this app." },
    ];
}

export default function AboutRoute() {
    return <About />;
}
