export default class Statistics {
  #result = { three: 0, four: 0, five: 0, five_bonus: 0, six: 0 };
  #profit = 0;
  #total = 0;

  constructor({ lottos, winningLotto, bonusNumber, cost }) {
    this.calculateResult({ lottos, winningLotto, bonusNumber, cost });
    this.#profit = ((this.#total / cost) * 100).toFixed(1);
  }

  calculateResult({ lottos, winningLotto, bonusNumber }) {
    lottos.forEach((lotto) => {
      const correctNumber = this.#correctCount(lotto, winningLotto);
      const hasBonusNumber = this.#hasBonusNumber(lotto, bonusNumber);

      if (correctNumber === 3) {
        this.#total += 5_000;
        this.#result.three += 1;
      } else if (correctNumber === 4) {
        this.#total += 50_000;
        this.#result.four += 1;
      } else if (correctNumber === 5 && hasBonusNumber) {
        this.#total += 30_000_000;
        this.#result.five_bonus += 1;
      } else if (correctNumber === 5) {
        this.#total += 1_500_000;
        this.#result.five += 1;
      } else if (correctNumber === 6) {
        this.#total = 2_000_000_000;
        this.#result.six += 1;
      }
    });
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
