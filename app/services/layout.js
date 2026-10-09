export const metadata = {
  title: "Web Development & Digital Services",
  description: "Explore WEBXWHALE services in website development, AI and machine learning, mobile apps, cloud and backend development, UI/UX design, and data solutions.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Web Development & Digital Services | WEBXWHALE",
    description: "Website development and digital technology services for businesses, students and growing ideas.",
    url: "/services",
    siteName: "WEBXWHALE",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/webwhale_logo.png", alt: "WEBXWHALE logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development & Digital Services | WEBXWHALE",
    description: "Explore website development, AI, mobile, cloud, UI/UX and data services from WEBXWHALE.",
    images: ["/webwhale_logo.png"],
  },
};

export default function ServicesLayout({ children }) {
  return children;
}
