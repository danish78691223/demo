export const metadata = {
  title: "About WEBXWHALE",
  description:
    "Learn about WEBXWHALE, a technology-focused brand building digital products, learning platforms and modern web experiences.",
  alternates: {
    canonical: "https://webxwhale.com/aboutus",
  },
  openGraph: {
    title: "About WEBXWHALE",
    description:
      "Learn about WEBXWHALE and its approach to software, learning and digital experiences.",
    url: "https://webxwhale.com/aboutus",
    siteName: "WEBXWHALE",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/webwhale_logo.png", alt: "WEBXWHALE logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About WEBXWHALE",
    description:
      "Learn about WEBXWHALE and its approach to software, learning and digital experiences.",
    images: ["/webwhale_logo.png"],
  },
};

export default function AboutLayout({ children }) {
  return children;
}
