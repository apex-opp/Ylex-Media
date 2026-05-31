import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WarRoom from "@/components/WarRoom";
import ContactFooter from "@/components/ContactFooter";
import SchematicPath from "@/components/SchematicPath";

export default function Page() {
  return (
    <main className="relative">
      <SchematicPath />
      <Hero />
      <Services />
      <WarRoom />
      <ContactFooter />
    </main>
  );
}
