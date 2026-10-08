export default function sitemap() {
  const baseUrl = "https://webxwhale-ebon.vercel.app";

  return [
    "/home",
    "/services",
    "/services/web-development",
    "/products",
    "/aboutus",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/home" ? "weekly" : "monthly",
    priority: path === "" || path === "/home" ? 1 : 0.7,
  }));
}
