import { useEffect, useState, useRef } from "preact/hooks";
import * as Promise from "bluebird";
import RemembranceCard from "./RemembranceCard.jsx";
import children from "./children.json";
import "./app.css";

Promise.config({
  // Enable cancellation
  cancellation: true,
});

export function App(props) {
  const [isReady, setIsReady] = useState(false);
  const [child, setChild] = useState(0);
  const [stackedNum, setStackedNum] = useState(null);

  let shouldCancel = useRef(false);

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => setIsReady(true);
  }, []);

  let audioPromise = Promise.resolve();
  // let audioPromise = new Promise((resolve, reject, onCancel) => {
  //   // const to = setTimeout(() => resolve(), 2000);
  //   // setTimeout(resolve, 1000);
  //   // resolve();
  //   onCancel(() => {
  //     console.log("onCancel called");
  //     // clearTimeout(to);
  //     reject(new Error("cancel")); // no error throwed. With resolve() in this place it also hangs on await
  //   });
  // });

  // const newAudio = async (child, signal) => {
  //   playAudio(child.name);
  //   setChild(child);
  //   return new Promise(function (resolve) {
  //     if (!signal.aborted) {
  //       setTimeout(resolve, 3000);
  //     }
  //   });
  // };

  const onClick = async (children) => {
    console.log("signal", children);
    // audioPromise.cancel();

    // Promise.each(children, function (child) {
    //   // playAudio(child.name);
    //   // setChild(child);
    //   testP = new Promise(function (resolve, reject, onCancel) {
    //     // setTimeout(resolve, 3000);
    //     console.log("shouldCancel", shouldCancel.current);
    //     if (!shouldCancel.current) {
    //       playAudio(child.name);
    //       setChild(child);
    //       setTimeout(resolve, 3000);
    //     }
    //     onCancel(() => {
    //       console.log("onCancel called");
    //       // clearTimeout(to);
    //       reject(new Error("cancel")); // no error throwed. With resolve() in this place it also hangs on await
    //     });
    //   });
    //   // return new Promise(function (resolve, reject, onCancel) {
    //   //   playAudio(child.name);
    //   //   setChild(child);
    //   //   setTimeout(resolve, 3000);
    //   //   onCancel(() => {
    //   //     console.log("onCancel called");
    //   //     // clearTimeout(to);
    //   //     reject(new Error("cancel")); // no error throwed. With resolve() in this place it also hangs on await
    //   //   });
    //   // });

    //   return testP;
    // });

    children.map(async (child, index) => {
      // audioPromise.cancel();
      console.log("ddd", child);
      audioPromise = audioPromise.then(() => {
        if (!shouldCancel.current) {
          console.log("child", child);
          console.log("child ind", index);

          playAudio(child.name);
          setChild(child);

          // setStackedNum((stackedNum) =>
          //   stackedNum < 10 ? stackedNum++ : stackedNum
          // );
          // if (!signal.aborted) {
          // testP = new Promise(function (resolve, reject, onCancel) {
          //   setTimeout(resolve, 3000);
          //   onCancel(() => {
          //     console.log("onCancel called wewerwuer");
          //     // clearTimeout(to);
          //     reject(new Error("cancel")); // no error throwed. With resolve() in this place it also hangs on await
          //   });
          return new Promise(function (resolve, reject, onCancel) {
            // playAudio(child.name);
            // setChild(child);
            console.log("child", child);

            setTimeout(resolve, 3000);

            // setTimeout(resolve, 3000);
            // onCancel(() => {
            //   console.log("onCancel called wewerwuer");
            //   // clearTimeout(to);
            //   reject(new Error("cancel")); // no error throwed. With resolve() in this place it also hangs on await
            // });
            // timeout(resolve, 3000, signal);

            // signal.addEventListener("abort", listener);
            // signal.addEventListener("abort", () => {
            //   ComponentSelector.log("aborting ", signal);
            //   window.clearTimeout(timeout);
            //   reject(new DOMException("Aborted", "AbortError"));
            // });
            // }
          });
        }
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

  const start = () => {
    onClick(children);
  };
  const pause = () => {
    shouldCancel.current = true;
  };

  const resume = () => {
    shouldCancel.current = false;
    const index = children.findIndex((item) => item === child);
    onClick(children.slice(index + 1));
  };
  const skip = () => {};

  return (
    <>
      {child ? (
        <>
          <RemembranceCard child={child} />
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
          <button class="start" onClick={start} disabled={!isReady}>
            Start
          </button>
        </>
      )}
    </>
  );
}
