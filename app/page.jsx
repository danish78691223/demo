"use client";

import { useRouter } from "next/navigation";

export default function IntroPage() {
  const router = useRouter();

  const handleVideoEnd = () => {
    router.replace("/home");
  };

  return (
    <main className="intro-page">
      <video
        className="intro-video"
        src="/webwhale_intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}
      />

      <div className="intro-overlay" />
    </main>
  );
}