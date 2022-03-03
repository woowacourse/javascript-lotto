import { CASH_INPUT_RANGE, ERROR_MESSAGE, LOTTO_RULES } from '../constants/constants';
import { generateRandomNumberInRange, isNumberInRange } from '../utils/utils';

class LottoPurchaseMachine {
  buyLotto(cashInput) {
    const cash = Number(cashInput);
    this.#validateCashInput(cash);
    return this.#generateLottos(cash);
  }

  #validateCashInput(cashInput) {
    if (!cashInput) {
      throw new Error(ERROR_MESSAGE.EMPTY_CASH_INPUT);
    }
    if (
      !isNumberInRange({ number: cashInput, min: CASH_INPUT_RANGE.MIN, max: CASH_INPUT_RANGE.MAX })
    ) {
      throw new Error(ERROR_MESSAGE.OUT_OF_RANGE_CASH_INPUT);
    }
    if (this.#hasChangeLeft(cashInput)) {
      throw new Error(ERROR_MESSAGE.INVALID_UNIT_CASH_INPUT);
    }
  }

  #generateLottos(cash) {
    const amount = cash / LOTTO_RULES.PRICE;
    return Array.from({ length: amount }, () => this.#generateOneLotto());
  }

  #generateOneLotto() {
    return new Set(
      generateRandomNumberInRange({
        min: LOTTO_RULES.NUMBER_RANGE.MIN,
        max: LOTTO_RULES.NUMBER_RANGE.MAX,
        count: LOTTO_RULES.NUMBER_COUNT,
      })
    );
  }

  #hasChangeLeft(cashInput) {
    return cashInput % LOTTO_RULES.PRICE !== 0;
  }
}

export default LottoPurchaseMachine;
