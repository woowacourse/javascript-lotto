import { CASH_INPUT_RANGE, ERROR_MESSAGE, LOTTO_PRICE } from '../constants/constants';
import { isNumberInRange } from '../utils/utils';
import Lotto from './lotto';

class LottoManager {
  buyLotto(cashInput) {
    this.lottoPrice = LOTTO_PRICE;
    try {
      this.#validateCashInput(Number(cashInput));
      this.purchaseAmount = this.#getLottoPurchaseAmount(Number(cashInput));
      this.generateLottos();
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

  #getLottoPurchaseAmount(cashInput) {
    return cashInput / this.lottoPrice;
  }

  generateLottos() {
    this.lottos = Array.from({ length: this.purchaseAmount }, () => new Lotto());
  }

  static isNoChangeLeft(insertCash, price) {
    return insertCash % price === 0;
  }
}

export default LottoManager;
