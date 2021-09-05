import { useEffect, useState, useRef } from "preact/hooks";
// import * as Promise from "bluebird";
import RemembranceCard from "./RemembranceCard";
import RewindIcon from "./RewindIcon";
import SkipStartIcon from "./SkipStartIcon";
import Controls from "./Controls";
import separator from "./assets/separator.svg";
import children from "./children.json";
import mp3 from "./assets/angelus-bell-7.mp3";
import "./app.css";

// Promise.config({
//   // Enable cancellation
//   cancellation: true,
// });

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
    console.log("click!!!");
    // if (shouldCancel.current) return;

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

    for (let child of children) {
      console.log("wtf", child);
      if (shouldCancel.current) {
        console.log("break", child);

        break;
      }
      audioPromise = audioPromise.then(() => {
        if (shouldCancel.current) return false;
        // if (!shouldCancel.current) {
        console.log("child", child);
        console.log("child", children);

        // console.log("child ind", index);

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
          if (shouldCancel.current) {
            reject(new Error("cancel"));
          }
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
        // }
      });
    }

    // children.map(async (child, index) => {
    //   // audioPromise.cancel();
    //   console.log("child outer", child);
    //   if (shouldCancel.current) return;
    //   audioPromise = audioPromise.then(() => {
    //     if (shouldCancel.current) return;
    //     // if (!shouldCancel.current) {
    //     console.log("child", child);
    //     console.log("child", children);

    //     console.log("child ind", index);

    //     playAudio(child.name);
    //     setChild(child);

    //     // setStackedNum((stackedNum) =>
    //     //   stackedNum < 10 ? stackedNum++ : stackedNum
    //     // );
    //     // if (!signal.aborted) {
    //     // testP = new Promise(function (resolve, reject, onCancel) {
    //     //   setTimeout(resolve, 3000);
    //     //   onCancel(() => {
    //     //     console.log("onCancel called wewerwuer");
    //     //     // clearTimeout(to);
    //     //     reject(new Error("cancel")); // no error throwed. With resolve() in this place it also hangs on await
    //     //   });
    //     return new Promise(function (resolve, reject, onCancel) {
    //       // playAudio(child.name);
    //       // setChild(child);
    //       if (shouldCancel.current) return;

    //       setTimeout(resolve, 3000);

    //       // setTimeout(resolve, 3000);
    //       // onCancel(() => {
    //       //   console.log("onCancel called wewerwuer");
    //       //   // clearTimeout(to);
    //       //   reject(new Error("cancel")); // no error throwed. With resolve() in this place it also hangs on await
    //       // });
    //       // timeout(resolve, 3000, signal);

    //       // signal.addEventListener("abort", listener);
    //       // signal.addEventListener("abort", () => {
    //       //   ComponentSelector.log("aborting ", signal);
    //       //   window.clearTimeout(timeout);
    //       //   reject(new DOMException("Aborted", "AbortError"));
    //       // });
    //       // }
    //     });
    //     // }
    //   });
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
    // audioElement.play();
    play(mp3);
    // if (shouldCancel.current) return;

    window.speechSynthesis.speak(utterance);
  }

  const start = (e) => {
    // e.stopPropagation();
    shouldCancel.current = false;
    onClick(children);
    setStage(stages.card);
  };
  const pause = () => {
    shouldCancel.current = true;
  };

  const resume = () => {
    shouldCancel.current = false;
    setStage(stages.card);
    const index = children.findIndex((item) => item === child);
    console.log("index", index);
    console.log("children", children);
    onClick(children.slice(index + 1));
  };

  const skipToStart = () => {
    shouldCancel.current = true;
    setStage(stages.start);
  };

  const skipToEnd = () => {
    shouldCancel.current = true;
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
              that time. These are their names.
              <img class="separator" src={separator} />
            </div>
          </div>
          <button class="start-btn" onClick={start} disabled={!isReady}>
            Toll the bell
          </button>
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
