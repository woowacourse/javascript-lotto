import Lotto from './Lotto.js';
import { getQuotient } from '../utils/numberHandler.js';
import LOTTO from '../constants/lotto.js';
import SORT from '../constants/sort.js';

const generateLottoBaseNumbers = () =>
  Array.from({ length: 45 }, (_, index) => index + 1);

const generateLottoNumbers = () => {
  return generateLottoBaseNumbers()
    .sort(SORT.disorder)
    .slice(0, LOTTO.NUMBERS_LENGTH)
    .sort(SORT.ascendingOrder);
};

const LottoMachine = {
  generateLottos(price) {
    const numberOfLotto = getQuotient(price, LOTTO.PRICE);

    return Array.from(
      { length: numberOfLotto },
      () => new Lotto(generateLottoNumbers())
    );
  },
};

export default LottoMachine;
