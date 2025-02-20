import { LOTTO } from '../constants/messages.js';
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

  while (setRandomNumbers.size !== LOTTO.MAX_LENGTH) {
    setRandomNumbers.clear();
    Array.from({ length: LOTTO.MAX_LENGTH }, () => setRandomNumbers.add(getRandomNumber()));
  }

  return [...setRandomNumbers].sort((a, b) => a - b);
};
