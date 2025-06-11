import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import useResponsive from "@/hooks/useResponsive";
import { useRef, useEffect } from "react";
import { UnscriptedMomentsDataTypes } from "@/types";

const UnscriptedVideo = ({
  data,
  index,
  isPlaying,
  onPlayChange,
}: {
  data: UnscriptedMomentsDataTypes;
  index: number;
  isPlaying: boolean;
  onPlayChange: () => void;
}) => {
  const { isMounted } = useResponsive();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      // Reset video if it has ended
      if (videoRef.current.ended) {
        videoRef.current.currentTime = 0;
      }
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isPlaying]);

  if (!data || !isMounted) return null;

  return (
    <button
      className="moment_card"
      onClick={onPlayChange}
      data-playing={isPlaying}
    >
      <div className="bg" />
      <video
        ref={videoRef}
        src={data.videoUrl}
        playsInline
        loop={false}
        muted={false}
      />
      <h3>{data.title}</h3>
      <div className="play_icon">
        {isPlaying ? <BsPauseFill size={30} /> : <BsFillPlayFill size={30} />}
      </div>
    </button>
  );
};

export default UnscriptedVideo;
