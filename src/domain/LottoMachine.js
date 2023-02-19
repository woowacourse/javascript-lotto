import Lotto from './Lotto.js';
import numberHandler from '../util/numberHandler.js';
import LOTTO from '../constant/lotto.js';
import SORT from '../constant/sort.js';

const LottoMachine = (function () {
  const lottoNumbers = () => {
    return Array.from({ length: 45 }, (_, index) => index + 1)
      .sort(SORT.disorder)
      .slice(0, LOTTO.NUMBERS_LENGTH)
      .sort(SORT.ascendingOrder);
  };

  return {
    generateLottos(price) {
      const numberOfLotto = numberHandler.getQuotient(price, LOTTO.PRICE);

      return Array.from(
        { length: numberOfLotto },
        () => new Lotto(lottoNumbers())
      );
    },
  };
})();

export default LottoMachine;
