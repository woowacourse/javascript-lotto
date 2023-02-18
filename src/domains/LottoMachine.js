import LOTTO from '../../src/constants/lotto.js';
import NumberHandler from '../utils/numberHandler.js';
import Lotto from './Lotto.js';
import ArrayHandler from '../utils/ArrayHandler.js';

const LottoMachine = {
  generateLotto() {
    return new Lotto(this.generateLottoNumbers());
  },

  generateLottos(price) {
    const lottoQuantity = NumberHandler.getQuotient(price, LOTTO.PRICE);

    return Array.from({ length: lottoQuantity }, () => this.generateLotto());
  },

  generateLottoNumbers() {
    const lottoNumbers = new Set();

    while (lottoNumbers.size < 6) {
      const lottoNumber = NumberHandler.generateRandomNumber(
        LOTTO.MIN_RANGE,
        LOTTO.MAX_RANGE
      );
      lottoNumbers.add(lottoNumber);
    }

    return ArrayHandler.sortAscendingOrder([...lottoNumbers]);
  },
};

export default LottoMachine;
