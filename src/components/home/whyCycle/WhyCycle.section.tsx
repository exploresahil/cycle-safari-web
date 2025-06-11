import { Volume2 } from "lucide-react";

import "./style.scss";
import Sounds from "./sounds/Sounds";

const WhyCycle = () => {
  return (
    <section id="WhyCtcle">
      <div className="title_container">
        <h1>Why Cycle?</h1>
        <p>
          In a jeep, you watch the jungle. On a cycle, you become part of it.
          <br /> Our rangers don't just lead the way—they teach you to read the
          jungle's hidden language. A snapped twig. A warning call. The thrill
          of decoding the wild.
        </p>
      </div>
      <div className="differences">
        <div className="title">
          <p>Listen to the difference</p>
          <Volume2 />
        </div>

        <Sounds />
      </div>
    </section>
  );
};

export default WhyCycle;
