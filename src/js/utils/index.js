import * as _ from 'lodash';

export const $ = (selector) => document.querySelector(selector);

export const createRandomNumbers = (minRange, maxRange, count) => {
  const candidate = Array(maxRange - minRange + 1)
    .fill()
    .map((n, i) => i + minRange);

  const shuffledCandiate = _.shuffle(candidate);

  return shuffledCandiate.slice(0, count);
};
