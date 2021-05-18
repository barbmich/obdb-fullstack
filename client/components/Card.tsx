import capitalize from "../utils/capitalize";
import { formatAddress } from "../utils/formatAddress";

export default function Card({ brewery }) {
  const address = formatAddress({
    city: brewery.address.city,
    state: brewery.address.state,
    postalCode: brewery.address.postalCode,
  });
  return (
    <li key={brewery.id} className="card">
      {/* <Link to={`/breweries/${brewery.id}`}>
              <h2>{brewery.name}</h2>
          </Link> */}
      <div className="separate">
        <span>
          <strong>City:</strong>
          {address ? address : "Information not available"}
        </span>
        <span>
          <strong>Type of brewery:</strong> {capitalize(brewery.breweryType)}
        </span>
      </div>
    </li>
  );
}
