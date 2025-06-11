"use client";

import "./style.scss";
import { Bike, Car } from "lucide-react";
import { useRef, useState, useCallback } from "react";

interface AudioButtonProps {
  icon: React.ReactNode;
  soundUrl: string;
  isPlaying: boolean;
  progress: number;
  onClick: () => void;
}

const ProgressRing = ({
  progress,
  radius = 25,
}: {
  progress: number;
  radius?: number;
}) => {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg width="60" height="60" className="progress-ring">
      <circle
        className="progress-ring__circle"
        stroke="currentColor"
        strokeWidth="2"
        fill="transparent"
        r={radius}
        cx="30"
        cy="30"
        style={{
          strokeDasharray: `${circumference} ${circumference}`,
          strokeDashoffset,
        }}
      />
    </svg>
  );
};

const AudioButton = ({
  icon,
  soundUrl,
  isPlaying,
  progress,
  onClick,
}: AudioButtonProps) => (
  <div className="button-wrapper">
    <ProgressRing progress={progress} />
    <button onClick={onClick} className={isPlaying ? "playing" : ""}>
      {icon}
    </button>
  </div>
);

const useAudioPlayer = (soundUrl: string) => {
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const initAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(soundUrl);
      audioRef.current.addEventListener("timeupdate", () => {
        if (audioRef.current) {
          const currentProgress =
            (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(currentProgress);
        }
      });
      audioRef.current.addEventListener("ended", () => {
        setProgress(0);
      });
    }
  }, [soundUrl]);

  const stop = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setProgress(0);
    }
  }, []);

  const togglePlay = useCallback(() => {
    initAudio();

    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      stop();
    }
  }, [initAudio, stop]);

  const isPlaying = Boolean(audioRef.current && !audioRef.current.paused);

  return { togglePlay, stop, progress, isPlaying };
};

const Sounds = () => {
  const cycleAudio = useAudioPlayer("/assets/sounds/cycle_sound.mp3");
  const carAudio = useAudioPlayer("/assets/sounds/car_sound.mp3");

  const handlePlay = (
    player: typeof cycleAudio,
    otherPlayer: typeof carAudio
  ) => {
    if (!player.isPlaying) {
      otherPlayer.stop(); // Stop the other player only if we're going to play
    }
    player.togglePlay();
  };

  return (
    <div id="Sounds">
      <div className="sounds_container">
        <AudioButton
          icon={<Bike size={28} />}
          soundUrl="/assets/sounds/cycle_sound.mp3"
          isPlaying={cycleAudio.isPlaying}
          progress={cycleAudio.progress}
          onClick={() => handlePlay(cycleAudio, carAudio)}
        />
        <AudioButton
          icon={<Car size={28} />}
          soundUrl="/assets/sounds/car_sound.mp3"
          isPlaying={carAudio.isPlaying}
          progress={carAudio.progress}
          onClick={() => handlePlay(carAudio, cycleAudio)}
        />
      </div>
    </div>
  );
};

export default Sounds;
