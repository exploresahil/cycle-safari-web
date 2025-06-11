import "./style.scss";
import FeaturedCard from "@/components/ui/card/featuredCard/FeaturedCard";
import { FeaturedData } from "./data.db";
import CardButton from "@/components/ui/card/cardButton/CardButton";

const Featured = () => {
  return (
    <section id="Featured">
      <h1>Featured Tours</h1>
      <div className="featured_cards">
        {FeaturedData.map((featured, index) => (
          <FeaturedCard key={`${featured.title}-${index}`} {...featured} />
        ))}
      </div>
      <CardButton text="View All Tours" link="/tours" type="secondary" />
    </section>
  );
};

export default Featured;
