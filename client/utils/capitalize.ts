// small function to capitalize first letter of a string - needed for some of the data that comes back from the API

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default capitalize;
