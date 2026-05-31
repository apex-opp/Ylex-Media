import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero/Hero";
import ServicesMatrix from "@/components/Services/ServicesMatrix";
import TalentRoster from "@/components/Talent/TalentRoster";
import Footer from "@/components/Footer/Footer";

export default function Page() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-ink">
        <Hero />
        <ServicesMatrix />
        <TalentRoster />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
