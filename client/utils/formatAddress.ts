interface IArgsAddress {
  city: string;
  state: string;
  postalCode: string;
}

export const formatAddress = ({ city, state, postalCode }: IArgsAddress) => {
  const addressString = [city, state, postalCode]
    .filter((value) => value !== null)
    .join(", ");
  return addressString ? addressString : null;
};
