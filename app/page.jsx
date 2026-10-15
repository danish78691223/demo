import IntroPageClient from "./IntroPageClient";

export const metadata = {
  title: {
    absolute: "WEBXWHALE | Web Development, Digital Products & SQL Learning",
  },
  description:
    "Discover WEBXWHALE: responsive website development, custom web applications, digital products and SQL learning with SQLwhale.",
  alternates: {
    canonical: "https://webxwhale.com/",
  },
  openGraph: {
    title: "WEBXWHALE | Web Development, Digital Products & SQL Learning",
    description:
      "Discover WEBXWHALE: responsive website development, custom web applications, digital products and SQL learning with SQLwhale.",
    url: "https://webxwhale.com/",
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
      "Discover WEBXWHALE: website development, digital products and SQL learning with SQLwhale.",
    images: ["/webwhale_logo.png"],
  },
};

export default function IntroPage() {
  return <IntroPageClient />;
}
