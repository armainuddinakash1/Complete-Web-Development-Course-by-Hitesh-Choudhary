import { index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.route.jsx"),
    route("about", "routes/about.route.jsx"),
    route("contact", "routes/contact.route.jsx"),
    route("user/:userId", "routes/user.route.jsx"),
    route("github/:githubId", "routes/github.route.jsx"),
    route("*", "routes/not-found.route.jsx"),
];
