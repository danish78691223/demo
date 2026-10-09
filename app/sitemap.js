const baseUrl = "https://webxwhale.com";

export default function sitemap() {
  const paths = [
    ["/home", 1.0, "weekly"],
    ["/services", 0.9, "monthly"],
    ["/services/web-development", 0.9, "monthly"],
    ["/products", 0.9, "monthly"],
    ["/aboutus", 0.7, "monthly"],
    ["/contact", 0.7, "monthly"],
    ["/privacy", 0.3, "yearly"],
    ["/terms", 0.3, "yearly"],
  ];

  return paths.map(([path, priority, changeFrequency]) => ({
    url: `${baseUrl}${path}`,
    changeFrequency,
    priority,
  }));
}
