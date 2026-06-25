import AnalyticsSection from "@/components/AnalyticsSection";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-[var(--color-ink)]">
      <HeroSection />
      <AnalyticsSection />
    </main>
  );
}
