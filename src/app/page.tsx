import UnscriptedMoments from "@/components/home/unscripted-moments/UnscriptedMoments.section.";
import WhyCycle from "@/components/home/whyCycle/WhyCycle.section";
import CarouselHero from "@/components/ui/carousel/Carousel.ui";

export default function Home() {
  return (
    <main>
      <CarouselHero />
      <WhyCycle />
      <UnscriptedMoments />
    </main>
  );
}
