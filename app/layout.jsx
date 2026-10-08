import "./globals.css";
import VisitorTracker from "../components/VisitorTracker";

export const metadata = {
  metadataBase: new URL("https://webxwhale-ebon.vercel.app"),
  title: {
    default: "WEBXWHALE — Learn, Build & Grow with Technology",
    template: "%s | WEBXWHALE",
  },
  description:
    "WEBXWHALE builds practical learning platforms, digital products and modern web experiences. Discover SQLwhale for hands-on SQL learning and explore budget-friendly web development services.",
  keywords: [
    "WEBXWHALE",
    "SQLwhale",
    "SQL learning platform",
    "learn SQL online",
    "SQL practice",
    "web development services",
    "website development",
    "React development",
    "Next.js development",
    "MERN stack development",
    "AI solutions",
    "digital products",
  ],
  authors: [{ name: "WEBXWHALE" }],
  creator: "WEBXWHALE",
  publisher: "WEBXWHALE",
  alternates: {
    canonical: "https://webxwhale-ebon.vercel.app/home",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  openGraph: {
    title: "WEBXWHALE — Learn, Build & Grow with Technology",
    description:
      "Explore SQLwhale, digital products and modern web development services from WEBXWHALE.",
    url: "https://webxwhale-ebon.vercel.app/home",
    siteName: "WEBXWHALE",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/webwhale_logo.png",
        width: 1200,
        height: 630,
        alt: "WEBXWHALE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WEBXWHALE — Learn, Build & Grow with Technology",
    description:
      "SQLwhale learning, digital products and modern web development services by WEBXWHALE.",
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
        "@id": "https://webxwhale-ebon.vercel.app/#organization",
        name: "WEBXWHALE",
        url: "https://webxwhale-ebon.vercel.app/home",
        logo: "https://webxwhale-ebon.vercel.app/webwhale_logo.png",
        description:
          "Technology brand building practical learning platforms, digital products and modern web experiences.",
      },
      {
        "@type": "WebSite",
        "@id": "https://webxwhale-ebon.vercel.app/#website",
        url: "https://webxwhale-ebon.vercel.app/home",
        name: "WEBXWHALE",
        publisher: {
          "@id": "https://webxwhale-ebon.vercel.app/#organization",
        },
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <html lang="en">
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
