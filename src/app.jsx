import { useEffect, useState } from "preact/hooks";
import RemembranceCard from "./RemembranceCard.jsx";
import children from "./children.json";
import "./app.css";

export function App(props) {
  const [isReady, setIsReady] = useState(false);
  const [child, setChild] = useState(null);
  const [stackedNum, setStackedNum] = useState(0);
  // const voices = window.speechSynthesis.getVoices();

  const controller = new AbortController();
  const { signal } = controller;

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => setIsReady(true);
  }, []);

  function timeout(duration, signal) {
    return new Promise((resolve, reject) => {
      const handle = setTimeout(resolve, duration);
      signal?.addEventListener("abort", (e) => {
        clearTimeout(handle);
        console.log("e", e);
        reject(new Error("aborted"));
      });
    });
  }
  let audioPromise = timeout(1000, controller.signal);

  // let audioPromise = Promise.resolve();

  // const listener = () => {
  //   console.log("aborted", signal);
  // };

  // signal.addEventListener("abort", listener);

  // const newAudio = async (child, signal) => {
  //   playAudio(child.name);
  //   setChild(child);
  //   return new Promise(function (resolve) {
  //     if (!signal.aborted) {
  //       setTimeout(resolve, 3000);
  //     }
  //   });
  // };

  const onClick = async () => {
    console.log("signal", signal);
    children.map(async (child) => {
      console.log(child, "outer");

      // await newAudio(child, { signal });

      audioPromise = audioPromise.then(() => {
        playAudio(child.name);
        setChild(child);
        console.log("signal", signal);

        // setStackedNum((stackedNum) =>
        //   stackedNum < 10 ? stackedNum++ : stackedNum
        // );
        // if (!signal.aborted) {
        return new Promise(function (resolve) {
          setTimeout(resolve, 3000);
          // timeout(resolve, 3000, signal);

          // signal.addEventListener("abort", listener);
          // signal.addEventListener("abort", () => {
          //   ComponentSelector.log("aborting ", signal);
          //   window.clearTimeout(timeout);
          //   reject(new DOMException("Aborted", "AbortError"));
          // });
          // }
        });

        // audioPromise = await audioPromise({signal: controller.signal})
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
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find((voice) => voice.name == "Moira");
    // Interupt any speech already playing
    // window.speechSynthesis.cancel();
    console.log("wtf", phrase);
    // audioElement.play();
    play("./src/angelus-bell-7.m4a");
    window.speechSynthesis.speak(utterance);
  }

  const pause = () => {
    // window.speechSynthesis.pause();
    debugger;
    controller.abort();
  };
  const resume = () => window.speechSynthesis.resume();
  const skip = () => {};

  return (
    <>
      {child ? (
        <>
          <RemembranceCard
            age={child.age}
            year={child.year}
            name={child.name}
          />
          <div>
            <button>
              <span class="material-icons" onClick={pause}>
                pause_circle_outline
              </span>
            </button>
            <button>
              <span class="material-icons" onClick={resume}>
                play_circle
              </span>
            </button>
            <button>
              <span class="material-icons" onClick={skip}>
                skip_next
              </span>
            </button>
          </div>
        </>
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
