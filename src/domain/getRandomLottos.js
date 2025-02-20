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

  while (setRandomNumbers.size !== 6) {
    setRandomNumbers.clear();
    Array.from({ length: 6 }, () => setRandomNumbers.add(getRandomNumber()));
  }

  return [...setRandomNumbers].sort((a, b) => a - b);
};
