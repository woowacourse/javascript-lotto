import { getRandomNumber } from '../utils/getRandomNumber.js';

export const getRandomLottos = (quantity) => {
  const lottos = [];
  Array.from({ length: quantity }, () => {
    const lotto = retryIfDuplicatedRandomNumbers();

    lottos.push(lotto);
  });

  return lottos;
};

export const retryIfDuplicatedRandomNumbers = () => {
  const setRandomNumbers = new Set();

  while (1) {
    if (setRandomNumbers.size === 6) {
      break;
    }
    setRandomNumbers.clear();
    Array.from({ length: 6 }, () => setRandomNumbers.add(getRandomNumber()));
  }

  return [...setRandomNumbers].sort((a, b) => a - b);
};
