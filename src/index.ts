import { serve } from "bun";
import puppeteer from "puppeteer";
import index from "./index.html";

const server = serve({
  port: 4000,
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/profile.jpg": () => new Response(Bun.file("public/profile.jpg")),

    "/api/pdf": {
      async POST(req) {
        const { html } = await req.json();
        const browser = await puppeteer.launch();
        try {
          const page = await browser.newPage();
          await page.setContent(html, { waitUntil: "networkidle0" });
          const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" },
          });
          return new Response(pdf, {
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": 'attachment; filename="cv.pdf"',
            },
          });
        } finally {
          await browser.close();
        }
      },
    },

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
