import Card from "./Card";
const fakeCard = <ul className="fake-card" />;

export default function List({ breweries }) {
  return (
    <ul className="list">
      {breweries.map((brewery) => {
        return <Card brewery={brewery} key={brewery.id} />;
      })}
      {fakeCard}
      {fakeCard}
    </ul>
  );
}
