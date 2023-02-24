import Lotto from './Lotto.js';
import NumberHandler from '../utils/NumberHandler.js';
import LOTTO from '../constants/lotto.js';
import SORT from '../constants/sort.js';

const LottoMachine = (function () {
  const randomNumbers = Array.from({ length: 45 }, (_, index) => index + 1);

  const generateLottoNumbers = () => {
    return randomNumbers
      .sort(SORT.disorder)
      .slice(0, LOTTO.NUMBERS_LENGTH)
      .sort(SORT.ascendingOrder);
  };

  return {
    generateLottos(price) {
      const numberOfLotto = NumberHandler.getQuotient(price, LOTTO.PRICE);

      return Array.from(
        { length: numberOfLotto },
        () => new Lotto(generateLottoNumbers())
      );
    },
  };
})();

export default LottoMachine;
