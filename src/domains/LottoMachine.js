import LOTTO from '../constants/lotto.js';
import Lotto from './Lotto.js';
import arrayHandler from '../utils/arrayHandler.js';
import numberHandler from '../utils/numberHandler.js';

const lottoMachine = {
  generateLottos(buyMoney) {
    const lottoQuantity = numberHandler.getQuotient(buyMoney, LOTTO.PRICE);

    return Array.from({ length: lottoQuantity }, () => this.generateLotto());
  },

  generateLotto() {
    return new Lotto(this.generateLottoNumbers());
  },

  generateLottoNumbers() {
    const lottoNumbers = new Set();

    while (lottoNumbers.size < LOTTO.NUMBERS_LENGTH) {
      const lottoNumber = numberHandler.generateRandomNumber(LOTTO.MIN_RANGE, LOTTO.MAX_RANGE);
      lottoNumbers.add(lottoNumber);
    }

    return arrayHandler.sortAscendingOrder([...lottoNumbers]);
  },
};

export default lottoMachine;
