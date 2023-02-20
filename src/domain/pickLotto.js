import getSortedNumbers from '../util/getSortedNumbers.js';
import { ORDER_TYPE } from '../util/constants.js';

const pickLotto = (maxNumber, lottoLength) => {
  const lotto = Array.from({ length: maxNumber }, (_, index) => index + 1);
  lotto.sort(() => Math.random() - 0.5);

  const sortedLotto = getSortedNumbers(lotto.slice(0, lottoLength), ORDER_TYPE.INCREASING);

  return sortedLotto;
};

export default pickLotto;
