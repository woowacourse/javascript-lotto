import { LOTTO_NUMBER } from './constants';

const getRandomNumberArray = (length) => {
  const set = new Set();
  while (set.size < length) {
    const randomNumber = Math.floor(Math.random() * LOTTO_NUMBER.MAX) + LOTTO_NUMBER.MIN;
    set.add(randomNumber);
  }

  return [...set].sort((a, b) => a - b);
};

export default getRandomNumberArray;
