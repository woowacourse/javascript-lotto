const readlinePromises = require("node:readline/promises");
export const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const close = () => {
  rl.close();
};

export const getIntersectionLengthOf = (...arrays) => {
  const unionOfArrays = arrays.flat();
  return unionOfArrays.length - new Set([...unionOfArrays]).size;
};

export const randomNumberBetween = (min = 1, max = 45) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getAscendingSortedNumbers = (numbers) => {
  return numbers.sort((a, b) => a - b);
};
