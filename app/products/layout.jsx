export const metadata = {
  title: "Digital Products & Online Tools",
  description:
    "Discover WEBXWHALE products, including SQLwhale for hands-on SQL practice and useful digital tools for learning and productivity.",
  alternates: {
    canonical: "https://webxwhale.com/products",
  },
  openGraph: {
    title: "Digital Products & Online Tools",
    description:
      "Discover learning platforms and digital tools from WEBXWHALE.",
    url: "https://webxwhale.com/products",
    siteName: "WEBXWHALE",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/webwhale_logo.png", alt: "WEBXWHALE logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Products & Online Tools | WEBXWHALE",
    description:
      "Discover learning platforms and digital tools from WEBXWHALE.",
    images: ["/webwhale_logo.png"],
  },
};

export default function ProductsLayout({ children }) {
  return children;
}
