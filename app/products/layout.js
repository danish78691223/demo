export const metadata = {
  title: "Digital Products & Learning Platforms",
  description: "Discover WEBXWHALE digital products including SQLwhale for interactive SQL learning and practical online tools made to help people work smarter.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Digital Products & Learning Platforms | WEBXWHALE",
    description: "Explore SQL learning and useful digital tools from WEBXWHALE.",
    url: "/products",
    siteName: "WEBXWHALE",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/webwhale_logo.png", alt: "WEBXWHALE logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Products & Learning Platforms | WEBXWHALE",
    description: "Explore SQLwhale and practical digital products by WEBXWHALE.",
    images: ["/webwhale_logo.png"],
  },
};

export default function ProductsLayout({ children }) {
  return children;
}
