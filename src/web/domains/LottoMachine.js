import Lotto from './Lotto.js';
import NumberHandler from '../util/NumberHandler.js';
import LOTTO from '../constant/lotto.js';
import SORT from '../constant/sort.js';

const LottoMachine = (function () {
  const generateLottoNumbers = () => {
    return Array.from({ length: 45 }, (_, index) => index + 1)
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
