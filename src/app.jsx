import { useEffect, useState, useRef } from "preact/hooks";
import RemembranceCard from "./RemembranceCard";
import EndCard from "./EndCard";
import Controls from "./Controls";
import separator from "./assets/separator.svg";
import children from "./children.json";
import mp3 from "./assets/angelus-bell-7.mp3";
import "./app.css";

const stages = {
  start: "start",
  card: "card",
  end: "end",
};

export function App() {
  const [isReady, setIsReady] = useState(false);
  const [child, setChild] = useState(null);
  const [stage, setStage] = useState(stages.start);
  let timeout = useRef(null);
  let audioPromise = Promise.resolve();

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => setIsReady(true);

    return () => clearTimeout(timeout.current);
  }, []);

  const onClick = async (children) => {
    for (let child of children) {
      audioPromise = audioPromise.then(() => {
        playAudio(child.name);
        setChild(child);
        return new Promise(function (resolve, reject, onCancel) {
          timeout.current = setTimeout(resolve, 3000);
        });
      });
    }
  };

  function play(url) {
    return new Promise(function (resolve, reject) {
      var audio = new Audio();
      audio.preload = "auto";
      audio.autoplay = true;
      audio.onerror = reject;
      audio.onended = resolve;
      audio.volume = 0.3;
      audio.src = url;
    });
  }

  function playAudio(phrase) {
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.rate = 0.9;
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find((voice) => voice.name == "Moira");
    play(mp3);
    window.speechSynthesis.speak(utterance);
  }

  const start = (e) => {
    onClick(children);
    setStage(stages.card);
  };

  const pause = () => clearTimeout(timeout.current);

  const resume = () => {
    setStage(stages.card);
    const index = children.findIndex((item) => item === child);
    onClick(children.slice(index + 1));
  };

  const skipToStart = () => {
    clearTimeout(timeout.current);
    setStage(stages.start);
  };

  const skipToEnd = () => {
    clearTimeout(timeout.current);
    setStage(stages.end);
  };

  return (
    <>
      {stage === stages.start && (
        <>
          <div class="card">
            <div class="card-inner">
              <h2 class="card-title">For Tuam the bell tolls</h2>
              In 2017 it was discoverd that nuns had buried the remains of
              children in unmarked graves, some in a septic tank, on the site of
              a mother and baby home in Tuam, Galway, Ireland. Between 1925 and
              1960, a child died on average every two weeks at this home. <br />
              <br />
              In total 978 children died there in the "care" of the nuns during
              that time. Of those, the identity of almost 800 are known. These
              are their names.
              <button class="start-btn" onClick={start} disabled={!isReady}>
                Toll the bell
              </button>
              <img class="separator" src={separator} />
            </div>
          </div>
        </>
      )}

      {stage === stages.card && (
        <>
          <RemembranceCard child={child} />
          <Controls
            pause={pause}
            resume={resume}
            skipToStart={skipToStart}
            skipToEnd={skipToEnd}
          />
        </>
      )}

      {stage == stages.end && (
        <EndCard resume={resume} skipToStart={skipToStart} />
      )}
    </>
  );
}
