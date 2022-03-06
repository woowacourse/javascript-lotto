import shuffle from 'lodash/shuffle';

export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const createRandomNumbers = (minRange, maxRange, count) => {
  const candidate = Array(maxRange - minRange + 1)
    .fill()
    .map((n, i) => i + minRange);

  const shuffledCandidate = shuffle(candidate);

  return shuffledCandidate.slice(0, count);
};
