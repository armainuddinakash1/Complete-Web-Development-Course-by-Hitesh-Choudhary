import Contact from "../components/Contact";

export function meta() {
    return [
        { title: "Contact | React Router App" },
        { name: "description", content: "Get in touch with us." },
    ];
}

export default function ContactRoute() {
    return <Contact />;
}
