import { ERROR_MESSAGE, LOTTO_RULE } from '../constants';
import {
  RandomNumber,
  isDivisibleByPrice,
  isInteger,
  isValidNumbersOfTickets,
} from '../utils';
import Lotto from './Lotto';

// TODO: Lotto[]와 WinningLotto를 저장하는 것으로 변경.

class LottoMachine {
  #lottos = [];

  /**
   * @param {string} paymentAmount
   */
  constructor(paymentAmountInput) {
    this.#validatePaymentAmount(paymentAmountInput);

    this.#lottos = this.#generateLottoTickets(Number(paymentAmountInput));
  }

  get lottos() {
    return this.#lottos.map((lotto) => lotto.numbers);
  }

  get paymentAmount() {
    return this.#lottos.length * LOTTO_RULE.price;
  }

  #generateLottoTickets(paymentAmount) {
    const { range, price, length } = LOTTO_RULE;
    const numbersOfTickets = paymentAmount / price;

    return Array.from({ length: numbersOfTickets }, () => {
      const uniqueNumbers = RandomNumber.pickUniqueNumbersInRange(
        range,
        length,
      );
      return new Lotto(uniqueNumbers);
    });
  }

  #validatePaymentAmount(paymentAmountInput) {
    const paymentAmount = Number(paymentAmountInput);

    if (!isInteger(paymentAmount)) throw new Error(ERROR_MESSAGE.notInteger);

    if (!isDivisibleByPrice(paymentAmount))
      throw new Error(ERROR_MESSAGE.inDivisibleByPrice);

    if (!isValidNumbersOfTickets(paymentAmount))
      throw new Error(ERROR_MESSAGE.inValidNumbersOfTickets);
  }
}

export default LottoMachine;
