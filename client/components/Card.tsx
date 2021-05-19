import Link from "next/link";
import capitalize from "../utils/capitalize";
import { formatAddress } from "../utils/formatAddress";
import styles from "../styles/Card.module.scss";

export const fakeCard = <ul className={styles.fakeCard} />;

export default function Card({ brewery }) {
  const address = formatAddress(
    {
      city: brewery.address.city,
      state: brewery.address.state,
      postalCode: brewery.address.postalCode,
    },
    true
  );
  return (
    <li key={brewery.id} className={styles.card}>
      <Link href={`/${brewery.slug}`}>
        <strong>
          <a>{brewery.name}</a>
        </strong>
      </Link>
      <div>
        <span>
          <strong>City: </strong>
          {/* <br /> */}
          {address ? address : "Information not available"}
        </span>
        <br />
        <span>
          <strong>Type of brewery: </strong>
          {/* <br /> */}
          {capitalize(brewery.breweryType)}
        </span>
      </div>
    </li>
  );
}
