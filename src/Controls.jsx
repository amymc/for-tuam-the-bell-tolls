import { useEffect, useState, useRef } from "preact/hooks";
import PlayIcon from "./PlayIcon";
import SkipEndIcon from "./SkipEndIcon";
import SkipStartIcon from "./SkipStartIcon";
import PauseIcon from "./PauseIcon";
import "./app.css";

const Controls = ({ pause, resume, skipToEnd, skipToStart }) => {
  const [showPlay, setShowPlay] = useState(false);

  const onPlay = (e) => {
    e.stopPropagation();
    resume();
    setShowPlay(false);
  };

  const onPause = () => {
    pause();
    setShowPlay(true);
  };

  return (
    <div>
      <button class="control-btn" onClick={skipToStart} title="back to start">
        <SkipStartIcon />
      </button>
      {showPlay ? (
        <button class="control-btn" onClick={onPlay} title="play">
          <PlayIcon />
        </button>
      ) : (
        <button class="control-btn" onClick={onPause} title="pause">
          <PauseIcon />
        </button>
      )}

      <button class="control-btn" onClick={skipToEnd} title="skip to end">
        <SkipEndIcon />
      </button>
    </div>
  );
};

export default Controls;
