export const $ = (selector) => document.querySelector(selector);

const createRandomNumber = (minRange, maxRange) =>
  Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;

export const createRandomNumbers = (minRange, maxRange, count) => {
  const result = new Set();

  while (result.size < count) {
    result.add(createRandomNumber(minRange, maxRange));
  }

  return [...result];
};
