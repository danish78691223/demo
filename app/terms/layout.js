export const metadata = {
  title: "Terms & Conditions",
  description: "Review the terms and conditions for using the WEBXWHALE website, digital products and services.",
  alternates: { canonical: "/terms" },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | WEBXWHALE",
    description: "Terms that apply to the use of the WEBXWHALE website, products and services.",
    images: ["/webwhale_logo.png"],
  },
  openGraph: {
    title: "Terms & Conditions | WEBXWHALE",
    description: "Terms that apply to the use of the WEBXWHALE website, products and services.",
    url: "/terms",
    siteName: "WEBXWHALE",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/webwhale_logo.png", alt: "WEBXWHALE logo" }],
  },
};

export default function TermsLayout({ children }) {
  return children;
}
