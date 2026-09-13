import { Hero } from "@/components/home/Hero";
import { CorePromise } from "@/components/home/CorePromise";
import { HomeDiscover } from "@/components/home/HomeDiscover";
import { FounderStory } from "@/components/home/FounderStory";
import { StudioWall } from "@/components/home/StudioWall";
import { PinnedNotes } from "@/components/home/PinnedNotes";
import { LocationSection } from "@/components/home/LocationSection";
import { getUpcoming } from "@/lib/experiences";

export default function Home() {
  const upcoming = getUpcoming();

  return (
    <main id="main" className="flex-1 bg-[#FAF8F5]">
      <Hero />
      <div className="section-bridge" aria-hidden />
      <CorePromise />
      <HomeDiscover upcoming={upcoming} />
      <div className="bg-[#FDFBF9]">
        <FounderStory />
        <StudioWall />
        <PinnedNotes />
      </div>
      <LocationSection />
      <div className="footer-bridge" aria-hidden />
    </main>
  );
}
