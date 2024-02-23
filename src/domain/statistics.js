import { PRIZE, SYMBOL } from '../constant/constants.js';

export default class Statistics {
  #result = {
    three: 0,
    four: 0,
    five: 0,
    five_bonus: 0,
    six: 0,
  };

  #profit = 0;

  constructor({ lottos, winningLotto, bonusNumber, cost }) {
    this.#calculateResult({ lottos, winningLotto, bonusNumber, cost });

    this.#profit = ((this.#calculateTotal() / cost) * SYMBOL.hundred).toFixed(SYMBOL.one);
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
    if (correctNumber === SYMBOL.three) this.#result.three += SYMBOL.one;
    else if (correctNumber === SYMBOL.four) this.#result.four += SYMBOL.one;
    else if (correctNumber === SYMBOL.five && hasBonusNumber) this.#result.five_bonus += SYMBOL.one;
    else if (correctNumber === SYMBOL.five) this.#result.five += SYMBOL.one;
    else if (correctNumber === SYMBOL.six) this.#result.six += SYMBOL.one;
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
