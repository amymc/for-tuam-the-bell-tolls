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
  const [child, setChild] = useState(null);
  const [stackedNum, setStackedNum] = useState(0);
  // const voices = window.speechSynthesis.getVoices();

  const controller = new AbortController();
  const { signal } = controller;
  let shouldCancel = useRef(false);

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => setIsReady(true);
  }, []);

  // function timeout(duration, signal) {
  //   return new Promise((resolve, reject) => {
  //     const handle = setTimeout(resolve, duration);
  //     signal?.addEventListener("abort", (e) => {
  //       clearTimeout(handle);
  //       console.log("e", e);
  //       reject(new Error("aborted"));
  //     });
  //   });
  // }
  // let audioPromise = timeout(1000, controller.signal);

  function makeCancellableRequest(child) {
    return new Promise(function (resolve, reject, onCancel) {
      setTimeout(() => {
        playAudio(child.name);
        setChild(child);
      }, 3000);

      // var xhr = new XMLHttpRequest();
      // xhr.on("load", resolve);
      // xhr.on("error", reject);
      // xhr.open("GET", url, true);
      // xhr.send(null);
      // Note the onCancel argument only exists if cancellation has been enabled!
      // onCancel(function () {
      //   console.log("wtf");
      //   xhr.abort();
      // });
    });
  }
  let audioPromise = Promise.resolve();
  let testP = Promise.resolve();
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
  const listener = () => {
    console.log("aborted", signal);
  };

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
    // audioPromise.cancel();

    Promise.each(children, function (child) {
      // playAudio(child.name);
      // setChild(child);
      testP = new Promise(function (resolve, reject, onCancel) {
        // setTimeout(resolve, 3000);
        console.log("shouldCancel", shouldCancel.current);
        if (!shouldCancel.current) {
          playAudio(child.name);
          setChild(child);
          setTimeout(resolve, 3000);
        }
        onCancel(() => {
          console.log("onCancel called");
          // clearTimeout(to);
          reject(new Error("cancel")); // no error throwed. With resolve() in this place it also hangs on await
        });
      });
      // return new Promise(function (resolve, reject, onCancel) {
      //   playAudio(child.name);
      //   setChild(child);
      //   setTimeout(resolve, 3000);
      //   onCancel(() => {
      //     console.log("onCancel called");
      //     // clearTimeout(to);
      //     reject(new Error("cancel")); // no error throwed. With resolve() in this place it also hangs on await
      //   });
      // });

      return testP;
    });

    // children.map(async (child) => {
    //   //   // audioPromise.cancel();

    //   //   audioPromise = makeCancellableRequest(child);
    //   // });

    //   // audioPromise = audioPromise.then(() => {
    //   //   console.log("signal", child);

    //   //   playAudio(child.name);
    //   //   setChild(child);

    //   //   // setStackedNum((stackedNum) =>
    //   //   //   stackedNum < 10 ? stackedNum++ : stackedNum
    //   //   // );
    //   //   // if (!signal.aborted) {
    //   //   // testP = new Promise(function (resolve, reject, onCancel) {
    //   //   //   setTimeout(resolve, 3000);
    //   //   //   onCancel(() => {
    //   //   //     console.log("onCancel called wewerwuer");
    //   //   //     // clearTimeout(to);
    //   //   //     reject(new Error("cancel")); // no error throwed. With resolve() in this place it also hangs on await
    //   //   //   });
    //   //   return new Promise(function (resolve, reject, onCancel) {
    //   //     setTimeout(resolve, 3000);
    //   //     onCancel(() => {
    //   //       console.log("onCancel called wewerwuer");
    //   //       // clearTimeout(to);
    //   //       reject(new Error("cancel")); // no error throwed. With resolve() in this place it also hangs on await
    //   //     });
    //   //     // timeout(resolve, 3000, signal);

    //   //     // signal.addEventListener("abort", listener);
    //   //     // signal.addEventListener("abort", () => {
    //   //     //   ComponentSelector.log("aborting ", signal);
    //   //     //   window.clearTimeout(timeout);
    //   //     //   reject(new DOMException("Aborted", "AbortError"));
    //   //     // });
    //   //     // }
    //   //   });
    //   // });

    //   // Promise.each(children, audioPromise);
    //   // children.map(async (child) => {
    //   //   console.log(child, "outer");

    //   //   // await newAudio(child, { signal });

    //   // audioPromise = audioPromise.then(() => {
    //   //   playAudio(child.name);
    //   //   setChild(child);
    //   //   console.log("signal", signal);

    //   //   // setStackedNum((stackedNum) =>
    //   //   //   stackedNum < 10 ? stackedNum++ : stackedNum
    //   //   // );
    //   //   // if (!signal.aborted) {
    //   //   return new Promise(function (resolve) {
    //   //     setTimeout(resolve, 3000);
    //   //     // timeout(resolve, 3000, signal);

    //   //     // signal.addEventListener("abort", listener);
    //   //     // signal.addEventListener("abort", () => {
    //   //     //   ComponentSelector.log("aborting ", signal);
    //   //     //   window.clearTimeout(timeout);
    //   //     //   reject(new DOMException("Aborted", "AbortError"));
    //   //     // });
    //   //     // }
    //   //   });

    //   //     // audioPromise = await audioPromise({signal: controller.signal})
    //   //   });
    // });
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
    shouldCancel.current = true;
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
