import { PRIZE } from '../constant/index.js';

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

    this.#profit = ((this.#calculateTotal() / cost) * 100).toFixed(1);
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
    if (correctNumber === 3) this.#result.three += 1;
    else if (correctNumber === 4) this.#result.four += 1;
    else if (correctNumber === 5 && hasBonusNumber) this.#result.five_bonus += 1;
    else if (correctNumber === 5) this.#result.five += 1;
    else if (correctNumber === 6) this.#result.six += 1;
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
