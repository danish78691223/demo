export const metadata = {
  title: "Contact WEBXWHALE",
  description:
    "Contact WEBXWHALE to discuss a business website, eCommerce store, custom web application or digital product project.",
  alternates: {
    canonical: "https://webxwhale.com/contact",
  },
  openGraph: {
    title: "Contact WEBXWHALE",
    description:
      "Discuss a website development or digital product project with WEBXWHALE.",
    url: "https://webxwhale.com/contact",
    siteName: "WEBXWHALE",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/webwhale_logo.png", alt: "WEBXWHALE logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact WEBXWHALE",
    description:
      "Discuss a website development or digital product project with WEBXWHALE.",
    images: ["/webwhale_logo.png"],
  },
};

export default function ContactLayout({ children }) {
  return children;
}
