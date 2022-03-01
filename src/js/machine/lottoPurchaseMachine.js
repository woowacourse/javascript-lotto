import {
  CASH_INPUT_RANGE,
  ERROR_MESSAGE,
  LOTTO_NUMBER_COUNT,
  LOTTO_NUMBER_RANGE,
  LOTTO_PRICE,
} from '../constants/constants';
import { generateRandomNumberInRange, isNumberInRange } from '../utils/utils';

class LottoPurchaseMachine {
  constructor() {
    this.lottoPrice = LOTTO_PRICE;
    this.lottos = null;
    this.deliverMessage = () => {};
  }

  assignMessenger(deliverMessage) {
    this.deliverMessage = deliverMessage;
  }

  buyLotto(cashInput) {
    const cash = Number(cashInput);
    this.#validateCashInput(cash);
    this.#generateLottos(cash);
    this.deliverMessage({
      message: 'LOTTO_GENERATE_COMPLETE',
      to: 'view',
      params: [...this.lottos],
    });
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

  #generateLottos(cash) {
    const amount = cash / this.lottoPrice;
    this.lottos = Array.from({ length: amount }, () => this.#generateOneLotto());
  }

  #generateOneLotto() {
    return new Set(
      generateRandomNumberInRange({
        min: LOTTO_NUMBER_RANGE.MIN,
        max: LOTTO_NUMBER_RANGE.MAX,
        count: LOTTO_NUMBER_COUNT,
      })
    );
  }

  #isNoChangeLeft(cashInput) {
    return cashInput % this.lottoPrice === 0;
  }
}

export default LottoPurchaseMachine;
