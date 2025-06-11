"use client";

import "./style.scss";
import { unscriptedMomentsData } from "./data.db";
import UnscriptedVideo from "./UnscriptedVideo";
import { useState, useRef, MouseEvent } from "react";

const UnscriptedMoments = () => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleVideoPlay = (index: number) => {
    if (playingIndex === index) {
      setPlayingIndex(null); // Stop the current video
    } else {
      setPlayingIndex(index); // Play the new video
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    containerRef.current.style.cursor = "grabbing";
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    if (!containerRef.current) return;
    setIsDragging(false);
    containerRef.current.style.cursor = "grab";
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (containerRef.current) {
        containerRef.current.style.cursor = "grab";
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="UnscriptedMoments">
      <h1>Unscripted Moments</h1>
      <div
        className="moments_container"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {unscriptedMomentsData.map((moment, index) => (
          <div
            className="moment_card_container"
            key={`${moment.title}-${index}`}
          >
            <UnscriptedVideo
              data={moment}
              index={index}
              isPlaying={playingIndex === index}
              onPlayChange={() => handleVideoPlay(index)}
            />
            <p>In Frame: {moment.inFrame}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UnscriptedMoments;
