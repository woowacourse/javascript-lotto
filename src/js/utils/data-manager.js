export const getRandomNumber = (minNumber, maxNumber) =>
  Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
