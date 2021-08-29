import { useEffect, useState } from "preact/hooks";
import RemembranceCard from "./RemembranceCard.jsx";
import children from "./children.json";
import "./app.css";

export function App(props) {
  const [isReady, setIsReady] = useState(false);
  const [child, setChild] = useState(null);

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => setIsReady(true);
  }, []);

  let promise = Promise.resolve();

  const onClick = () => {
    children.map((child) => {
      promise = promise.then(() => {
        console.log(child, "really");
        playAudio(child.name);
        setChild(child);
        return new Promise(function (resolve) {
          setTimeout(resolve, 3000);
        });
      });
    });
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

    const voices = [...window.speechSynthesis.getVoices()];
    utterance.voice = voices.find((voice) => voice.name == "Moira");
    // Interupt any speech already playing
    // window.speechSynthesis.cancel();
    console.log("wtf", phrase);
    // audioElement.play();
    play("./src/angelus-bell-7.m4a");
    window.speechSynthesis.speak(utterance);
  }

  return (
    <>
      {child ? (
        <RemembranceCard age={child.age} year={child.year} name={child.name} />
      ) : (
        <>
          <h1 class="title">For Tuam the bell tolls</h1>
          It's time to toll the bell
          <button class="start" onClick={onClick} disabled={!isReady}>
            Start
          </button>
        </>
      )}
    </>
  );
}
