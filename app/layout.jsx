import "./globals.css";
import VisitorTracker from "../components/VisitorTracker";

export const metadata = {
  metadataBase: new URL("https://webxwhale.com"),
  title: {
    default: "WEBXWHALE | Web Development, Digital Products & SQL Learning",
    template: "%s | WEBXWHALE",
  },
  description:
    "WEBXWHALE creates modern websites, digital products and practical learning experiences. Explore SQLwhale for hands-on SQL practice and affordable web development services for businesses and students.",
  keywords: [
    "WEBXWHALE",
    "web development company",
    "website development services",
    "affordable web development",
    "custom website development",
    "SQLwhale",
    "SQL practice online",
    "learn SQL online",
    "digital products",
    "AI solutions",
  ],
  authors: [{ name: "WEBXWHALE" }],
  creator: "WEBXWHALE",
  publisher: "WEBXWHALE",
  alternates: {
    canonical: "/home",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  openGraph: {
    title: "WEBXWHALE | Web Development, Digital Products & SQL Learning",
    description:
      "Explore SQLwhale, useful digital products and modern web development services from WEBXWHALE.",
    url: "/home",
    siteName: "WEBXWHALE",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/webwhale_logo.png",
        alt: "WEBXWHALE logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WEBXWHALE | Web Development, Digital Products & SQL Learning",
    description:
      "Hands-on SQL learning, digital products and modern web development services by WEBXWHALE.",
    images: ["/webwhale_logo.png"],
  },
  applicationName: "WEBXWHALE",
  category: "technology",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://webxwhale.com/#organization",
        name: "WEBXWHALE",
        url: "https://webxwhale.com",
        logo: "https://webxwhale.com/webwhale_logo.png",
        description:
          "WEBXWHALE builds practical learning platforms, digital products and modern web experiences.",
      },
      {
        "@type": "WebSite",
        "@id": "https://webxwhale.com/#website",
        url: "https://webxwhale.com",
        name: "WEBXWHALE",
        publisher: {
          "@id": "https://webxwhale.com/#organization",
        },
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <html lang="en-IN">
      <body>
        {children}
        <VisitorTracker />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
