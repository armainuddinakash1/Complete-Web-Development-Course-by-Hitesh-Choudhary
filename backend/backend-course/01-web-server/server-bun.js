import { serve } from "bun";

serve({
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/") {
      return new Response("Wellcome to the website bun", { status: 200 });
    } else if (url.pathname === "/ice-tea") {
      return new Response("Thanks for ordering ice tea bun", { status: 200 });
    } else {
      return new Response("404 Not found bun", { status: 404 });
    }
  },
  port: 3000,
  hostname: "127.0.0.1",
});
