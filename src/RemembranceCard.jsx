import separator from "./separator.svg";
import cross from "./cross.svg";
import blood from "./blood.svg";
import "./remembranceCard.css";

const RemembranceCard = ({ name, age, year }) => {
  return (
    <div class="card">
      <div class="card-inner">
        In Loving Memory of
        <h2 class="card-title">{name}</h2>
        Died in {year} aged {age}
        <br />
        <img class="cross" src={cross} />
        <img class="blood" src={blood} />
        <br />
        Suffered at the hands of the Catholic Church
        <br />
        <br />
        Rest in peace
        <img class="separator" src={separator} />
      </div>
    </div>
  );
};

export default RemembranceCard;
