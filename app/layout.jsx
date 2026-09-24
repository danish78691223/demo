import "./globals.css";

export const metadata = {
  title: "WEBXWHALE — Learn. Build. Scale.",
  description:
    "WEBWHALE is a multipurpose platform for learning, digital products, web development and business growth.",
    icons: {
    icon: '/favicon.ico', // public folder me rakhi image ka path
    
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}