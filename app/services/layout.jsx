export const metadata = {
  title: "Web Development & Digital Services",
  description:
    "Explore WEBXWHALE services for business websites, web applications and digital experiences, built around practical business goals.",
  alternates: {
    canonical: "https://webxwhale.com/services",
  },
  openGraph: {
    title: "Web Development & Digital Services",
    description:
      "Explore website development and digital services from WEBXWHALE.",
    url: "https://webxwhale.com/services",
    siteName: "WEBXWHALE",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/webwhale_logo.png", alt: "WEBXWHALE logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development & Digital Services | WEBXWHALE",
    description:
      "Explore website development and digital services from WEBXWHALE.",
    images: ["/webwhale_logo.png"],
  },
};

export default function ServicesLayout({ children }) {
  return children;
}
