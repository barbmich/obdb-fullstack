// might move this to the front-end, let the back-end provide all values no matter what
module.exports.formatAddress = ({ city, state, postal_code }) => {
  const string = [city, state, postal_code]
    .filter((value) => value !== null)
    .join(", ");
  return string ? string : null;
};
