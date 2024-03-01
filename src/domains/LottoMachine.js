import { ERROR_MESSAGES, LOTTO_RULE } from '../constants';
import RandomNumber from '../utils/RandomNumber';
import {
  checkDefinedInputValue,
  isDivisibleByPrice,
  isInteger,
  isValidNumbersOfTickets,
} from '../utils/validatorsUtils';

class LottoMachine {
  /**
   * 발행되는 로또 번호의 이중배열
   * @property {number[][]|[]}
   */
  #lottoTickets = [];

  #paymentAmount = 0;

  /**
   * @param {string} paymentAmount
   */
  constructor(paymentAmountInput) {
    this.#validatePaymentAmount(paymentAmountInput);
    this.#issueLottoTickets();
  }

  get lottoTickets() {
    return JSON.parse(JSON.stringify(this.#lottoTickets));
  }

  get paymentAmount() {
    return this.#paymentAmount;
  }

  /**
   * @param {string} paymentAmount
   */
  #validatePaymentAmount(paymentAmountInput) {
    checkDefinedInputValue(paymentAmountInput);

    const number = Number(paymentAmountInput);

    if (!isInteger(number)) throw new Error(ERROR_MESSAGES.notInteger);

    if (!isValidNumbersOfTickets(number))
      throw new Error(ERROR_MESSAGES.inValidNumbersOfTickets);

    if (!isDivisibleByPrice(number))
      throw new Error(ERROR_MESSAGES.inDivisibleByPrice);

    this.#paymentAmount = number;
  }

  #issueLottoTickets() {
    const { range, price } = LOTTO_RULE;
    const numbersOfTickets = this.#paymentAmount / price;

    this.#lottoTickets = Array.from({ length: numbersOfTickets }, () =>
      RandomNumber.pickUniqueNumbersInRange(range, LOTTO_RULE.length),
    );
  }
}

export default LottoMachine;
