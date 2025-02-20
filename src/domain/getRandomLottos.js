import { LOTTO } from '../constants/messages.js';
import { getRandomNumber } from '../utils/getRandomNumber.js';

export const getRandomLottos = (quantity) => {
  const lottos = [];
  Array.from({ length: quantity }, () => {
    const lotto = getUnduplicatedRandomLottos();

    lottos.push(lotto);
  });

  return lottos;
};

const getUnduplicatedRandomLottos = () => {
  const randomNumberSet = new Set();

  while (randomNumberSet.size !== LOTTO.MAX_LENGTH) {
    randomNumberSet.clear();
    Array.from({ length: LOTTO.MAX_LENGTH }, () => randomNumberSet.add(getRandomNumber()));
  }

  return [...randomNumberSet].sort((a, b) => a - b);
};
