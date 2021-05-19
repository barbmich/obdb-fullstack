interface IArgsAddress {
  city: string;
  state: string;
  postalCode: string;
}

export const formatAddress = (
  { city, state, postalCode }: IArgsAddress,
  preview = false
) => {
  const addressString = [city, state, preview ? null : postalCode]
    .filter((value) => value !== null)
    .join(", ");
  return addressString ? addressString : null;
};
