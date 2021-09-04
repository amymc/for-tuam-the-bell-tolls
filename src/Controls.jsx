import { useEffect, useState, useRef } from "preact/hooks";
import PlayIcon from "./PlayIcon";
import SkipIcon from "./SkipIcon";
import PauseIcon from "./PauseIcon";
import "./app.css";

const Controls = ({ pause, resume, skip }) => {
  const [showPlay, setShowPlay] = useState(false);

  const onPlay = () => {
    resume();
    setShowPlay(false);
  };

  const onPause = () => {
    pause();
    setShowPlay(true);
  };

  return (
    <div>
      {showPlay ? (
        <button class="control-btn" onClick={onPlay} title="play">
          <PlayIcon />
        </button>
      ) : (
        <button class="control-btn" onClick={onPause} title="pause">
          <PauseIcon />
        </button>
      )}

      <button class="control-btn" onClick={skip} title="skip to end">
        <SkipIcon />
      </button>
    </div>
  );
};

export default Controls;
