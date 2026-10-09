export const metadata = {
  title: "About WEBXWHALE",
  description: "Meet WEBXWHALE, a technology brand building practical learning platforms, useful digital products and modern web experiences for people and businesses.",
  alternates: { canonical: "/aboutus" },
  openGraph: {
    title: "About WEBXWHALE | Our Story & Mission",
    description: "Learn about WEBXWHALE and our focus on learning platforms, digital products and web experiences.",
    url: "/aboutus",
    siteName: "WEBXWHALE",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/webwhale_logo.png", alt: "WEBXWHALE logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About WEBXWHALE | Our Story & Mission",
    description: "Get to know WEBXWHALE, its products and its technology mission.",
    images: ["/webwhale_logo.png"],
  },
};

export default function AboutUsLayout({ children }) {
  return children;
}
