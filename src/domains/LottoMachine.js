import LOTTO from '../constants/lotto.js';
import numberHandler from '../utils/numberHandler.js';
import Lotto from './Lotto.js';
import arrayHandler from '../utils/arrayHandler.js';

const lottoMachine = {
  generateLotto() {
    return new Lotto(this.generateLottoNumbers());
  },

  generateLottos(price) {
    const lottoQuantity = numberHandler.getQuotient(price, LOTTO.PRICE);

    return Array.from({ length: lottoQuantity }, () => this.generateLotto());
  },

  generateLottoNumbers() {
    const lottoNumbers = new Set();

    while (lottoNumbers.size < 6) {
      const lottoNumber = numberHandler.generateRandomNumber(
        LOTTO.MIN_RANGE,
        LOTTO.MAX_RANGE
      );
      lottoNumbers.add(lottoNumber);
    }

    return arrayHandler.sortAscendingOrder([...lottoNumbers]);
  },
};

export default lottoMachine;
