export const metadata = {
  title: "Contact Us",
  description: "Contact WEBXWHALE about website development, software and product builds, AI solutions or collaboration. Tell us about your project.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact WEBXWHALE | Start a Project",
    description: "Have a website, software or digital product idea? Contact WEBXWHALE to discuss your project.",
    url: "/contact",
    siteName: "WEBXWHALE",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/webwhale_logo.png", alt: "WEBXWHALE logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact WEBXWHALE | Start a Project",
    description: "Talk to WEBXWHALE about your next website or digital project.",
    images: ["/webwhale_logo.png"],
  },
};

export default function ContactLayout({ children }) {
  return children;
}
