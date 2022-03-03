import { CASH_INPUT_RANGE, ERROR_MESSAGE, LOTTO_PRICE } from '../constants/constants';
import { isNumberInRange } from '../utils/utils';
import LottoNumber from './lottoNumber';

class LottoGenerator {
  constructor() {
    this.initLottos();
  }

  initLottos() {
    this.lottos = [];
  }

  buyLotto(cashInput) {
    this.#validateCashInput(Number(cashInput));
    this.#generateLottos(this.#getLottoPurchaseAmount(Number(cashInput)));
  }

  #validateCashInput(cashInput) {
    if (!cashInput) {
      throw new Error(ERROR_MESSAGE.NOT_A_NUMBER_CASH_INPUT);
    }
    if (
      !isNumberInRange({ number: cashInput, min: CASH_INPUT_RANGE.MIN, max: CASH_INPUT_RANGE.MAX })
    ) {
      throw new Error(ERROR_MESSAGE.OUT_OF_CASH_RANGE);
    }
    if (!this.#isNoChangeLeft(cashInput)) {
      throw new Error(ERROR_MESSAGE.INVALID_CASH_UNIT);
    }
  }

  #getLottoPurchaseAmount(cashInput) {
    return cashInput / LOTTO_PRICE;
  }

  #generateLottos(purchaseAmount) {
    this.lottos = Array.from({ length: purchaseAmount }, () => new LottoNumber());
  }

  #isNoChangeLeft(insertCash) {
    return insertCash % LOTTO_PRICE === 0;
  }
}

export default LottoGenerator;
