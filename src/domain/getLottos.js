import { LOTTO_SYSTEM } from '../constants/LottoSystem.js';
import Lotto from './Lotto.js';

export const getLottos = (quantity) => {
  const lottos = [];
  Array.from({ length: quantity }, () => {
    const numbers = generateLotto();
    lottos.push(new Lotto(numbers));
  });

  return lottos;
};

export const generateLotto = () => {
  const numbers = Array.from({ length: LOTTO_SYSTEM.MAX_LOTTO_NUMBER }, (_, index) => index + 1);

  const shuffle = (arr) => {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return shuffle(numbers)
    .slice(0, 6)
    .sort((a, b) => a - b);
};
