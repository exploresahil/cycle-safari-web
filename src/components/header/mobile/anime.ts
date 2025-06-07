import { Variants } from "motion/react";

export const mobileNavVariants: Variants = {
  initial: {
    x: "100%",
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const submenuVariants = {
  hidden: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  show: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
};
