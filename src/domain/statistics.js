export default class Statistics {
  #result = { three: 0, four: 0, five: 0, five_bonus: 0, six: 0 };

  constructor({ lottos, winningLotto, bonusNumber }) {
    this.calculateResult({ lottos, winningLotto, bonusNumber });
  }

  calculateResult({ lottos, winningLotto, bonusNumber }) {
    console.log(lottos, winningLotto, bonusNumber);
    lottos.forEach((lotto) => {
      const correctNumber = this.#correctCount(lotto, winningLotto);
      const hasBonusNumber = this.#hasBonusNumber(lotto, bonusNumber);

      if (correctNumber === 3) {
        this.#result.three += 1;
      } else if (correctNumber === 4) {
        this.#result.four += 1;
      } else if (correctNumber === 5 && hasBonusNumber) {
        this.#result.five_bonus += 1;
      } else if (correctNumber === 5) {
        this.#result.five += 1;
      } else if (correctNumber === 6) {
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
}
