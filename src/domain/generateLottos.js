import { LOTTO_SYSTEM } from '../constants/LottoSystem.js';
import Lotto from './Lotto.js';

const NUMBERS = Array.from({ length: LOTTO_SYSTEM.SIZE.MAX_LOTTO_NUMBER }, (_, index) => index + 1);

export const generateLottos = (quantity) => {
  return Array.from({ length: quantity }, () => new Lotto(generateLotto()));
};

export const generateLotto = () => {
  const shuffle = (arr) => {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return shuffle(NUMBERS)
    .slice(0, 6)
    .sort((a, b) => a - b);
};
