export const $ = (selector) => document.querySelector(selector);

export const $$ = (selector) => document.querySelectorAll(selector);

const createRandomNumber = (minRange, maxRange) =>
  Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;

export const createRandomNumbers = (minRange, maxRange, count) => {
  const result = new Set();

  while (result.size < count) {
    result.add(createRandomNumber(minRange, maxRange));
  }

  return [...result];
};

export const isEmpty = (value) => value === '';

export const isNotNumber = (value) => !/^\d+$/.test(value);

export const isOutOfRanged = (number, minRange, maxRange) => number < minRange || number > maxRange;
