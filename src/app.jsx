import { useEffect, useState, useRef } from "preact/hooks";
import RemembranceCard from "./RemembranceCard";
import RewindIcon from "./RewindIcon";
import SkipStartIcon from "./SkipStartIcon";
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

export function App(props) {
  const [isReady, setIsReady] = useState(false);
  const [child, setChild] = useState(null);
  const [stage, setStage] = useState(stages.start);
  const [stackedNum, setStackedNum] = useState(null);
  let timeout = useRef(null);

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => setIsReady(true);

    return () => clearTimeout(timeout.current);
  }, []);

  let audioPromise = Promise.resolve();

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
      // return a promise
      var audio = new Audio(); // create audio wo/ src
      audio.preload = "auto"; // intend to play through
      audio.autoplay = true; // autoplay when loaded
      audio.onerror = reject; // on error, reject
      audio.onended = resolve; // when done, resolve
      audio.volume = 0.3;
      audio.src = url; // just for example
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

  const skipToStart = () => setStage(stages.start);

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
        <>
          <div class="card">
            <div class="card-inner">
              <h2 class="card-title">Litany of abuse</h2>
              The home in Tuam was one of 18 mother and baby homes that operated
              in Ireland over a 76 year period. Women and girls in these homes
              were subject to physical and emotional abuse and forced labour.
              Their children were subject to illegal adoptions.
              <br /> <br />
              Approximately 9,000 children died in these homes, well above
              infant mortaility rates for the time. To date, there has been no
              redress paid to surviving victims.
              <br /> <br />
              Unbelievably, Catholic organisations are still heavily involved in
              providing education and healthcare in Ireland.
              <img class="separator" src={separator} />
            </div>
          </div>
          {/* <p>
            The home in Tuam was one of 18 mother and baby homes that operated
            in Ireland over a 76 year period. Women and girls in these homes
            were subject to physical and emotional abuse and forced labour.
            Their children were subject to illegal adoptions. Approximately
            9,000 children died in these homes. To date, there has been no
            redress paid to surviving victims.
            <br />
            Unbelievably, Catholic organisations are still heavily involved in
            providing education and healthcare in Ireland.
          </p> */}

          <div>
            <button
              class="control-btn"
              onClick={skipToStart}
              title="back to start"
            >
              <SkipStartIcon />
            </button>
            <button
              class="control-btn"
              onClick={resume}
              title="return to cards"
            >
              <RewindIcon />
            </button>
          </div>
        </>
      )}
    </>
  );
}
