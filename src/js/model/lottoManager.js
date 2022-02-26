import { CASH_INPUT_RANGE, ERROR_MESSAGE, LOTTO_PRICE } from '../constants/constants';
import { isNumberInRange } from '../utils/utils';
import Lotto from './lotto';

class LottoManager {
  constructor() {
    this.lottoPrice = LOTTO_PRICE;
    this.purchaseAmount = null;
    this.lottos = null;
  }

  buyLotto(cashInput) {
    this.#validateCashInput(Number(cashInput));
    this.purchaseAmount = this.#getLottoPurchaseAmount(Number(cashInput));
    this.#generateLottos();
  }

  #validateCashInput(cashInput) {
    if (!cashInput) {
      throw new Error(ERROR_MESSAGE.EMPTY_INPUT);
    }
    if (
      !isNumberInRange({ number: cashInput, min: CASH_INPUT_RANGE.MIN, max: CASH_INPUT_RANGE.MAX })
    ) {
      throw new Error(ERROR_MESSAGE.CASH_INPUT_OUT_OF_RANGE);
    }
    if (!this.#isNoChangeLeft(cashInput)) {
      throw new Error(ERROR_MESSAGE.INVALID_UNIT);
    }
  }

  #getLottoPurchaseAmount(cashInput) {
    return cashInput / this.lottoPrice;
  }

  #generateLottos() {
    this.lottos = Array.from({ length: this.purchaseAmount }, () => new Lotto());
  }

  #isNoChangeLeft(cashInput) {
    return cashInput % this.lottoPrice === 0;
  }
}

export default LottoManager;
