import getSortedNumbers from '../util/getSortedNumbers.js';
import pickRandomNumber from '../util/pickRandomNumber.js';

const pickLotto = () => {
  const lotto = new Set();
  while (lotto.size < 6) {
    lotto.add(pickRandomNumber(45));
  }

  const sortedLotto = getSortedNumbers([...lotto], 'ASC');
  return sortedLotto;
};

export default pickLotto;
