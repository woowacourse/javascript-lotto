const generateRandomNumber = (lowerBound, upperBound) =>
  Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound;

export default generateRandomNumber;
