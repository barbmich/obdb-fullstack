// might move this to the front-end, let the back-end provide all values no matter what
interface IArgsAddress {
  city: string;
  state: string;
  postal_code: string;
}

export const formatAddress = ({ city, state, postal_code }: IArgsAddress) => {
  const addressString = [city, state, postal_code]
    .filter((value) => value !== null)
    .join(", ");
  return addressString ? addressString : null;
};
