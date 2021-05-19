import Card, { fakeCard } from "./Card";
import styles from "../styles/List.module.scss";

export default function List({ breweries }) {
  return (
    <ul className={styles.list}>
      {breweries.map((brewery) => {
        return <Card brewery={brewery} key={brewery.id} />;
      })}
      {fakeCard}
      {fakeCard}
    </ul>
  );
}
