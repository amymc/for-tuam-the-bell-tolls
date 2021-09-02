import separator from "./separator.svg";
import bloodyCross from "./bloody-cross.svg";
import "./remembranceCard.css";

const RemembranceCard = ({ child }) => {
  const { name, age, year } = child;
  return (
    <div class="card">
      <div class="card-inner">
        In Loving Memory of
        <h2 class="card-title">{name}</h2>
        <span class="card-subtitle">
          Died in {year} aged {age}
        </span>
        <img class="cross" src={bloodyCross} />
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
