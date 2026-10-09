export const metadata = {
  title: "Privacy Policy",
  description: "Read the WEBXWHALE privacy policy to understand how information is handled when you use our website, products and services.",
  alternates: { canonical: "/privacy" },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | WEBXWHALE",
    description: "How WEBXWHALE handles information on its website, products and services.",
    images: ["/webwhale_logo.png"],
  },
  openGraph: {
    title: "Privacy Policy | WEBXWHALE",
    description: "How WEBXWHALE handles information on its website, products and services.",
    url: "/privacy",
    siteName: "WEBXWHALE",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/webwhale_logo.png", alt: "WEBXWHALE logo" }],
  },
};

export default function PrivacyLayout({ children }) {
  return children;
}
