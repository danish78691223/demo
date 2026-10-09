export const metadata = {
  title: { absolute: "WEBXWHALE | Learn, Build & Grow with Technology" },
  description: "Discover SQLwhale for hands-on SQL practice, explore useful digital products and find modern web development services from WEBXWHALE.",
  alternates: { canonical: "/home" },
  openGraph: {
    title: "WEBXWHALE | Learn, Build & Grow with Technology",
    description: "Explore SQLwhale, digital products and modern web development services from WEBXWHALE.",
    url: "/home",
    siteName: "WEBXWHALE",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/webwhale_logo.png", alt: "WEBXWHALE logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WEBXWHALE | Learn, Build & Grow with Technology",
    description: "Hands-on SQL learning, digital products and modern web development services by WEBXWHALE.",
    images: ["/webwhale_logo.png"],
  },
};

export default function HomeLayout({ children }) {
  return children;
}
