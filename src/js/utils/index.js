export const $ = (selector) => document.querySelector(selector);

export const createRandomNumbers = (minRange, maxRange, count) => {
  const candidate = Array(maxRange - minRange + 1)
    .fill()
    .map((_, i) => i + minRange);

  return Array(count)
    .fill()
    .map(() => candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
};
