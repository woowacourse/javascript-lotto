import { ERROR_MESSAGE, LOTTO_RULE } from '../constants';
import { isEmptyInput, isInteger, RandomNumber } from '../utils';
import Lotto from './Lotto';
import {
  isDivisibleByPrice,
  isValidNumbersOfTickets,
  isValidWinningNumbersForm,
} from './validator/validators';
import WinningLotto from './WinningLotto';

class LottoMachine {
  #lottos = [];

  #winningLotto;

  /**
   * @param {string} paymentAmount
   */
  constructor(paymentAmountInput) {
    this.#validatePaymentAmount(paymentAmountInput);

    this.#lottos = this.#generateLottoTickets(Number(paymentAmountInput));
  }

  issueWinningLotto(lottoNumbersInput, bonusNumberInput) {
    this.#validateLottoNumbersForm(lottoNumbersInput);

    const lottoNumbers = lottoNumbersInput.split(',').map(Number);
    this.#winningLotto = new WinningLotto(
      new Lotto(lottoNumbers),
      bonusNumberInput,
    );
  }

  get lottos() {
    return this.#lottos.map((lotto) => lotto.numbers);
  }

  get paymentAmount() {
    return this.#lottos.length * LOTTO_RULE.price;
  }

  get matchingResults() {
    return this.#lottos.map((lotto) =>
      this.#winningLotto.compareLotto(lotto.numbers),
    );
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

    if (isEmptyInput(paymentAmountInput))
      throw new Error(ERROR_MESSAGE.emptyInput);

    if (!isInteger(paymentAmount)) throw new Error(ERROR_MESSAGE.notInteger);

    if (!isDivisibleByPrice(paymentAmount))
      throw new Error(ERROR_MESSAGE.inDivisibleByPrice);

    if (!isValidNumbersOfTickets(paymentAmount))
      throw new Error(ERROR_MESSAGE.inValidNumbersOfTickets);
  }

  #validateLottoNumbersForm(numbersInput) {
    if (isEmptyInput(numbersInput)) throw new Error(ERROR_MESSAGE.emptyInput);

    if (!isValidWinningNumbersForm(numbersInput))
      throw new Error(ERROR_MESSAGE.inValidwinningNumbersForm);
  }
}

export default LottoMachine;
