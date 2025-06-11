import { FeaturedTypes } from "@/types";
import CardButton from "../cardButton/CardButton";
import "./style.scss";

const FeaturedCard = ({
  title,
  image,
  description,
  date,
  Attractions,
  button,
}: FeaturedTypes) => {
  return (
    <section id="FeaturedCard">
      <div className="up">
        <div className="img_container">
          <img src={image} alt={title} />
        </div>
        <h1>{title}</h1>
        <p>Date: {date}</p>
        <p>{description}</p>
      </div>
      <div className="down">
        <h2>Attractions</h2>
        <div className="featured_attractions">
          {Attractions.map((attraction, index) => (
            <div
              key={`${attraction.title}-${index}`}
              className="featured_attractions_item"
            >
              <h3>{attraction.title}</h3>
              <p>{attraction.value}</p>
            </div>
          ))}
        </div>
        <CardButton text="Know More" link={button.link} />
      </div>
    </section>
  );
};

export default FeaturedCard;
