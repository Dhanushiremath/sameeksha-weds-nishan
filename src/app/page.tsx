import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { InvitationAudioProvider } from "@/components/BackgroundMusic";
import { CardOpener } from "@/components/CardOpener";
import { HeroSection } from "@/components/HeroSection";
import { CountdownSection } from "@/components/CountdownSection";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { EventDetails } from "@/components/EventDetails";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <InvitationAudioProvider>
        <CardOpener />
        <main className="relative z-0">
          <HeroSection />
          <CountdownSection />
          <PhotoCarousel />
          <EventDetails />
          <Footer />
        </main>
      </InvitationAudioProvider>
    </SmoothScrollProvider>
  );
}
