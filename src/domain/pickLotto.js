import getSortedNumbers from '../util/getSortedNumbers.js';
import pickRandomNumber from '../util/pickRandomNumber.js';

import { GAME_VALUE } from '../constants/index.js';

const pickLotto = () => {
  const lotto = new Set();
  while (lotto.size < GAME_VALUE.LOTTO_SIZE) {
    lotto.add(pickRandomNumber(GAME_VALUE.MAX_LOTTO_NUMBER));
  }

  const sortedLotto = getSortedNumbers([...lotto], 'ASC');
  return sortedLotto;
};

export default pickLotto;
