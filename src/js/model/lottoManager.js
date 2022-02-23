import { CASH_INPUT_RANGE, ERROR_MESSAGE, LOTTO_PRICE } from '../constants/constants';
import { isNumberInRange } from '../utils/utils';

class LottoManager {
  buyLotto(cashInput) {
    this.lottoPrice = LOTTO_PRICE;
    try {
      this.#validateCashInput(Number(cashInput));
      // todo: 로또 구매 구현
    } catch (error) {
      alert(error.message);
    }
  }

  #validateCashInput(cashInput) {
    if (!cashInput) {
      throw new Error(ERROR_MESSAGE.EMPTY_INPUT_MESSAGE);
    }
    if (
      !isNumberInRange({ number: cashInput, min: CASH_INPUT_RANGE.MIN, max: CASH_INPUT_RANGE.MAX })
    ) {
      throw new Error(ERROR_MESSAGE.OUT_OF_RANGE_MESSAGE);
    }
    if (!LottoManager.isNoChangeLeft(cashInput, this.lottoPrice)) {
      throw new Error(ERROR_MESSAGE.INVALID_UNIT_MESSAGE);
    }
  }

  static isNoChangeLeft(insertCash, price) {
    return insertCash % price === 0;
  }
}

export default LottoManager;
