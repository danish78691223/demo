export const metadata = {
  title: "Web Development Services in India",
  description: "WEBXWHALE builds responsive business websites, landing pages, eCommerce stores and custom web applications for startups and businesses across India.",
  alternates: { canonical: "/services/web-development" },
  openGraph: {
    title: "Web Development Services in India | WEBXWHALE",
    description: "Explore business websites, eCommerce stores and custom web application development from WEBXWHALE.",
    url: "/services/web-development",
    siteName: "WEBXWHALE",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/webwhale_logo.png", alt: "WEBXWHALE logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Services in India | WEBXWHALE",
    description: "Business websites, eCommerce stores and custom web applications built by WEBXWHALE.",
    images: ["/webwhale_logo.png"],
  },
};

export default function WebDevelopmentLayout({ children }) {
  return children;
}
