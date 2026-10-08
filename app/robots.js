export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://webxwhale-ebon.vercel.app/sitemap.xml",
  };
}
