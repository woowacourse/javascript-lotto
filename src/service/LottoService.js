import {
  LOTTO_SIZE,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from '../constants/MagicNumber.js';
import Lotto from '../model/Lotto.js';
import { getUniqueRandomNumbers } from '../util/getUniqueRandomNumbers.js';
import { printLotto } from '../View/OutputView.js';

export default function makeLotto(purchaseAmount) {
  const lottos = [];

  for (let i = 0; i < purchaseAmount; i++) {
    const numberRange = {
      min: MIN_LOTTO_NUMBER,
      max: MAX_LOTTO_NUMBER,
      count: LOTTO_SIZE,
    };
    const numbers = getUniqueRandomNumbers(numberRange);
    const lotto = new Lotto(numbers);
    printLotto(lotto);
    lottos.push(lotto);
  }
  return lottos;
}
