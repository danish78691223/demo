export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/login", "/api/"],
      },
    ],
    sitemap: "https://webxwhale.com/sitemap.xml",
    host: "https://webxwhale.com",
  };
}
