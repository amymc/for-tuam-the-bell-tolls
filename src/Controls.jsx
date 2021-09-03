import { useEffect, useState, useRef } from "preact/hooks";
import * as Promise from "bluebird";
import RemembranceCard from "./RemembranceCard.jsx";
import PlayIcon from "./PlayIcon";
import SkipIcon from "./SkipIcon";
import PauseIcon from "./PauseIcon";
import children from "./children.json";
import "./app.css";

Promise.config({
  // Enable cancellation
  cancellation: true,
});

const stages = {
  paused: "paused",
  active: "active",
  end: "end",
};

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
