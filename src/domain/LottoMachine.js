import Lotto from './Lotto.js';
import NumberHandler from '../util/numberHandler.js';
import ArrayHandler from '../util/ArrayHandler.js';
import LOTTO from '../../src/constant/lotto.js';

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

    while (lottoNumbers.size < LOTTO.NUMBERS_LENGTH) {
      lottoNumbers.add(this.generateLottoNumber());
    }

    return ArrayHandler.sortAscendingOrder([...lottoNumbers]);
  },

  generateLottoNumber() {
    return NumberHandler.generateRandomNumber(LOTTO.MIN_RANGE, LOTTO.MAX_RANGE);
  },
};

export default LottoMachine;
