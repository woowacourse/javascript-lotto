import { PRIZE, RANK, SYMBOL } from '../constant/constants.js';

export default class Statistics {
  #result = {
    [RANK.first]: 0,
    [RANK.second]: 0,
    [RANK.third]: 0,
    [RANK.fourth]: 0,
    [RANK.fifth]: 0,
  };

  #profit = 0;

  constructor({ lottos, winningLotto, bonusNumber, cost }) {
    this.#calculateResult({ lottos, winningLotto, bonusNumber, cost });

    this.#profit = ((this.#calculateTotal() / cost) * 100).toFixed(SYMBOL.decimalPlaces);
  }

  #calculateTotal() {
    return (
      this.#result[RANK.fifth] * PRIZE[RANK.fifth] +
      this.#result[RANK.fourth] * PRIZE[RANK.fourth] +
      this.#result[RANK.third] * PRIZE[RANK.third] +
      this.#result[RANK.second] * PRIZE[RANK.second] +
      this.#result[RANK.first] * PRIZE[RANK.first]
    );
  }

  #calculateResult({ lottos, winningLotto, bonusNumber }) {
    lottos.forEach((lotto) => {
      const correctNumber = this.#getCorrectCount(lotto, winningLotto);
      const hasBonusNumber = this.#hasBonusNumber(lotto, bonusNumber);

      this.#addResult(correctNumber, hasBonusNumber);
    });
  }

  #addResult(correctNumber, hasBonusNumber) {
    if (correctNumber === 3) this.#result[RANK.fifth] += 1;
    else if (correctNumber === 4) this.#result[RANK.fourth] += 1;
    else if (correctNumber === 5 && hasBonusNumber) this.#result[RANK.second] += 1;
    else if (correctNumber === 5) this.#result[RANK.third] += 1;
    else if (correctNumber === 6) this.#result[RANK.first] += 1;
  }

  #getCorrectCount(lotto, winningLotto) {
    return lotto.filter((number) => winningLotto.includes(number)).length;
  }

  #hasBonusNumber(lotto, bonusNumber) {
    return lotto.includes(bonusNumber);
  }

  get getResult() {
    return { ...this.#result };
  }

  get getProfit() {
    return this.#profit;
  }
}
