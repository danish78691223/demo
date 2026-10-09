export const metadata = {
  title: "Website Development Services",
  description: "Get modern, responsive website development from WEBXWHALE, including business websites, e-commerce, web applications and student project support.",
  alternates: { canonical: "/services/web-development" },
  openGraph: {
    title: "Website Development Services | WEBXWHALE",
    description: "Build responsive business websites, e-commerce stores and web applications with WEBXWHALE.",
    url: "/services/web-development",
    siteName: "WEBXWHALE",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/webwhale_logo.png", alt: "WEBXWHALE logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development Services | WEBXWHALE",
    description: "Modern, responsive websites and web applications by WEBXWHALE.",
    images: ["/webwhale_logo.png"],
  },
};

export default function WebDevelopmentLayout({ children }) {
  return children;
}
