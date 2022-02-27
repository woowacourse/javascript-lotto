export const $ = (selector) => document.querySelector(selector);

const createRandomNumber = (minRange, maxRange) =>
  Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;

export const createRandomNumbers = (minRange, maxRange, count) => {
  const ret = new Set();

  while (ret.size < count) {
    ret.add(createRandomNumber(minRange, maxRange));
  }

  return [...ret];
};
