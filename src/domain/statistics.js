import { CONSTANTS, PRIZE } from '../constant/index.js';

export default class Statistics {
  #result = {
    three: CONSTANTS.zero,
    four: CONSTANTS.zero,
    five: CONSTANTS.zero,
    five_bonus: CONSTANTS.zero,
    six: CONSTANTS.zero,
  };

  #profit = CONSTANTS.zero;

  constructor({ lottos, winningLotto, bonusNumber, cost }) {
    this.#calculateResult({ lottos, winningLotto, bonusNumber, cost });

    this.#profit = ((this.#calculateTotal() / cost) * CONSTANTS.hundred).toFixed(CONSTANTS.one);
  }

  #calculateTotal() {
    return (
      this.#result.three * PRIZE.fifth +
      this.#result.four * PRIZE.fourth +
      this.#result.five * PRIZE.third +
      this.#result.five_bonus * PRIZE.second +
      this.#result.six * PRIZE.first
    );
  }

  #calculateResult({ lottos, winningLotto, bonusNumber }) {
    lottos.forEach((lotto) => {
      const correctNumber = this.#correctCount(lotto, winningLotto);
      const hasBonusNumber = this.#hasBonusNumber(lotto, bonusNumber);

      this.#addResult(correctNumber, hasBonusNumber);
    });
  }

  #addResult(correctNumber, hasBonusNumber) {
    if (correctNumber === CONSTANTS.three) this.#result.three += CONSTANTS.one;
    else if (correctNumber === CONSTANTS.four) this.#result.four += CONSTANTS.one;
    else if (correctNumber === CONSTANTS.five && hasBonusNumber) this.#result.five_bonus += CONSTANTS.one;
    else if (correctNumber === CONSTANTS.five) this.#result.five += CONSTANTS.one;
    else if (correctNumber === CONSTANTS.six) this.#result.six += CONSTANTS.one;
  }

  #correctCount(lotto, winningLotto) {
    return lotto.filter((number) => winningLotto.includes(number)).length;
  }

  #hasBonusNumber(lotto, bonusNumber) {
    return lotto.includes(bonusNumber);
  }

  get getResult() {
    return this.#result;
  }

  get getProfit() {
    return this.#profit;
  }
}
