import { LOTTO_RULE } from '../constants';
import { RandomNumber } from '../utils';
import Validator from './Validator';

class LottoMachine {
  #lottoTickets = [];

  #paymentAmount = 0;

  /**
   * @param {string} paymentAmount
   */
  constructor(paymentAmountInput) {
    Validator.checkPaymentAmount(paymentAmountInput);

    this.#paymentAmount = Number(paymentAmountInput);
    this.#issueLottoTickets();
  }

  get lottoTickets() {
    return this.#lottoTickets;
  }

  get paymentAmount() {
    return this.#paymentAmount;
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
