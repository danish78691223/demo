export const metadata = {
  title: "Digital Products, Learning & Ideas",
  description:
    "Explore WEBXWHALE digital products, learning platforms and practical tools designed to help people learn, build and create.",
  alternates: {
    canonical: "https://webxwhale.com/home",
  },
  openGraph: {
    title: "Digital Products, Learning & Ideas",
    description:
      "Explore digital products, learning platforms and practical tools from WEBXWHALE.",
    url: "https://webxwhale.com/home",
    siteName: "WEBXWHALE",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/webwhale_logo.png", alt: "WEBXWHALE logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Products, Learning & Ideas | WEBXWHALE",
    description:
      "Explore digital products, learning platforms and practical tools from WEBXWHALE.",
    images: ["/webwhale_logo.png"],
  },
};

export default function HomeLayout({ children }) {
  return children;
}
