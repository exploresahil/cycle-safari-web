import Featured from "@/components/home/featured/Featured.section";
import Hero from "@/components/home/hero/Hero";
import UnscriptedMoments from "@/components/home/unscripted-moments/UnscriptedMoments.section.";
import WhyCycle from "@/components/home/whyCycle/WhyCycle.section";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyCycle />
      <UnscriptedMoments />
      <Featured />
    </main>
  );
}
