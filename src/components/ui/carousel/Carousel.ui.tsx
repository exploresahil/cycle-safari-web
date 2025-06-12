"use client";

import "./style.scss";
import { Variants, LazyMotion } from "motion/react";
import * as m from "motion/react-m";
import { useState, useEffect, useCallback } from "react";
import { carouselData } from "./data.tb";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import useResponsive from "@/hooks/useResponsive";
import { headerHeight } from "@/constants/header";

// Load features asynchronously
const loadFeatures = () => import("./features").then((res) => res.default);

interface CarouselProps {
  data?: {
    image: string;
    title: string;
  }[];
  pagination?: boolean;
  navigation?: boolean;
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

const CarouselHero = ({
  data = carouselData,
  pagination = true,
  navigation = false,
  autoSlide = true,
  autoSlideInterval = 4000,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>(
    {}
  );
  const { isMounted, isLaptop, isDesktop } = useResponsive();

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  const goToSlide = useCallback(
    (index: number) => {
      let newindex = index;
      if (newindex < 0) {
        newindex = data.length - 1;
      } else if (newindex >= data.length) {
        newindex = 0;
      }
      setCurrentIndex(newindex);
    },
    [data.length, setCurrentIndex]
  );

  useEffect(() => {
    if (!autoSlide) return;
    const slideTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, autoSlideInterval);
    return () => clearInterval(slideTimer);
  }, [autoSlide, currentIndex, goToSlide, autoSlideInterval]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  const handlePaginationClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
  };

  const getPosition = (index: number) => {
    if (index === currentIndex) return "center";
    if (index === (currentIndex - 1 + data.length) % data.length) return "left";
    if (index === (currentIndex + 1) % data.length) return "right";
    if (index < currentIndex) return "hiddenLeft";
    return "hiddenRight";
  };

  const imageVariants: Variants = {
    center: {
      x: 0,
      scale: 1,
      zIndex: 3,
      opacity: 1,
    },
    left: {
      x: isLaptop ? "-92%" : isDesktop ? "-92%" : "-94%",
      scale: 0.8,
      zIndex: 2,
      opacity: 1,
    },
    right: {
      x: isLaptop ? "92%" : isDesktop ? "92%" : "94%",
      scale: 0.8,
      zIndex: 1,
      opacity: 1,
    },
    hiddenLeft: {
      opacity: 0,
      scale: 0.5,
      zIndex: 0,
      x: "-200%",
    },
    hiddenRight: {
      opacity: 0,
      scale: 0.5,
      zIndex: 0,
      x: "200%",
    },
  };

  if (!isMounted)
    return (
      <div
        id="CarouselHero"
        style={{
          height: isLaptop
            ? `calc(100vh - ${headerHeight.laptop})`
            : `calc(100vh - ${headerHeight.mobile})`,
        }}
      >
        <div className="carosel_container">
          <div className="carousel_item center">
            <div className="skeleton" />
            <div className="bg_overlay" />
          </div>
        </div>
      </div>
    );

  return (
    <div
      id="CarouselHero"
      style={{
        height: isLaptop
          ? `calc(100vh - ${headerHeight.laptop})`
          : `calc(100vh - ${headerHeight.mobile})`,
      }}
    >
      <LazyMotion features={loadFeatures} strict>
        <div className="carosel_container">
          {data.map((item, index) => {
            const position = getPosition(index);
            return (
              <m.div
                key={index}
                className={`carousel_item ${position}`}
                variants={imageVariants}
                initial={false}
                animate={position}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                onAnimationComplete={() => setIsAnimating(false)}
              >
                <div className="skeleton" />
                <div className="bg_overlay" />
                <img
                  src={item.image}
                  alt={item.title}
                  className={loadedImages[index] ? "loaded" : ""}
                  onLoad={() => handleImageLoad(index)}
                />
                <h2>{item.title}</h2>
              </m.div>
            );
          })}
          {navigation && (
            <>
              <button
                onClick={handlePrevious}
                className="nav_btn previous_button"
              >
                <ArrowLeftIcon size={20} />
              </button>
              <button onClick={handleNext} className="nav_btn next_button">
                <ArrowRightIcon size={20} />
              </button>
            </>
          )}
        </div>
      </LazyMotion>
      {pagination && (
        <div className="pagination">
          {data.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "dot_active" : ""}`}
              onClick={() => handlePaginationClick(index)}
              disabled={isAnimating}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarouselHero;
