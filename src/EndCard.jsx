import { useState } from "preact/hooks";
import RewindIcon from "./RewindIcon";
import SkipStartIcon from "./SkipStartIcon";
import separator from "./assets/separator.svg";
import children from "./children.json";
import "./endCard.css";

const EndCard = ({ skipToStart, resume }) => {
  const [showSources, setShowSources] = useState(false);
  const showSourceList = () => setShowSources((showSources) => !showSources);

  return (
    <>
      <div class="end-card">
        <div class="card-inner">
          {showSources ? (
            <div class="sources">
              <h3>Sources</h3>
              <ul>
                <li>
                  <a
                    class="source-link"
                    href="https://www.irishtimes.com/news/social-affairs/tuam-mother-and-baby-home-names-of-the-796-children-who-died-1.3008263"
                  >
                    Tuam mother and baby home: Names of the 796 children who
                    died - The Irish Times
                  </a>
                </li>
                <li>
                  <a
                    class="source-link"
                    href="https://www.irishtimes.com/news/social-affairs/mother-and-baby-homes-commission-finds-that-978-children-died-at-tuam-facility-1.4456694"
                  >
                    Mother and baby homes: Commission finds that 978 children
                    died at Tuam facility - The Irish Times
                  </a>
                </li>
                <li>
                  <a
                    class="source-link"
                    href="https://www.theguardian.com/world/2021/jan/12/report-scale-abuse-ireland-mother-baby-homes"
                  >
                    Report to reveal scale of abuse at Ireland's mother and baby
                    homes - The Guardian
                  </a>
                </li>
              </ul>
              The sound of the bell toll is taken from a recording of the
              Angelus. The Angelus is a bell ringing that has been broadacast on
              Irish state television at 6pm every day since the 1950s.
              Originally it would have been broadcast with Catholic imagery, in
              recent years it's become non-denominational
              <button class="source-link" onClick={showSourceList}>
                Back
              </button>
            </div>
          ) : (
            <>
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
              <button class="source-link" onClick={showSourceList}>
                Sources
              </button>
            </>
          )}
          <img class="separator" src={separator} />
        </div>
      </div>

      <div class="end-controls">
        <button class="control-btn" onClick={skipToStart} title="back to start">
          <SkipStartIcon />
        </button>
        <button class="control-btn" onClick={resume} title="return to cards">
          <RewindIcon />
        </button>
      </div>
    </>
  );
};

export default EndCard;
