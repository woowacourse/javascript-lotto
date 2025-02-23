import { getRandomNumber } from './math.js';

export const makeNotDuplicatedRandomNumbers = (counts, range) => {
  const numbers = new Set();
  while (numbers.size !== counts) {
    const randomNumber = getRandomNumber(range.min, range.max);
    numbers.add(randomNumber);
  }
  return Array.from(numbers);
};
