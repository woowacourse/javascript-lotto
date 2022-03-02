/* eslint-disable max-lines-per-function */
/* eslint-disable max-depth */
export default class LottoResult {
  constructor(lottoBundle) {
    this.lottoBundle = lottoBundle;
  }

  #winningNumbers = [];

  #bonusNumber = 0;

  #winningCounts = { three: 0, four: 0, five: 0, fiveBonus: 0, six: 0 };

  #lottoYield = 0;

  set winningNumbers(numbers) {
    this.#winningNumbers = numbers;
  }

  set bonusNumber(number) {
    this.#bonusNumber = number;
  }

  get winningCounts() {
    return this.#winningCounts;
  }

  getLottoResult(winningNumbers, bonusNumber) {
    this.winningNumbers = winningNumbers;
    this.bonusNumber = bonusNumber;
    this.calculateWinningCounts();
    this.calculateLottoYield();
    return {
      winningCounts: this.#winningCounts,
      lottoYield: this.#lottoYield,
    };
  }

  calculateWinningCounts() {
    const userLottos = this.lottoBundle.lottos;

    let three = 0;
    let four = 0;
    let five = 0;
    let fiveBonus = 0;
    let six = 0;

    userLottos.forEach((userLotto) => {
      switch (this.#countLottoNumbers(userLotto)) {
        case 3:
          three += 1;
          break;
        case 4:
          four += 1;
          break;
        case 5:
          five += 1;
          break;
        case 'fiveBonus':
          fiveBonus += 1;
          break;
        case 6:
          six += 1;
          break;
        default:
          break;
      }
    });

    this.#winningCounts = { three, four, five, fiveBonus, six };
  }

  #countLottoNumbers(userLotto) {
    let count = 0;
    for (let i = 0; i <= 5; i += 1) {
      for (let j = 0; j <= 5; j += 1) {
        if (userLotto.numbers[i] === this.#winningNumbers[j]) {
          count += 1;
        }
      }
    }
    if (count === 5) {
      for (let i = 0; i < 6; i += 1) {
        if (userLotto.numbers[i] === this.#bonusNumber) {
          return 'fiveBonus';
        }
      }
    }

    return count;
  }

  calculateLottoYield() {
    const winningMoney =
      this.#winningCounts.three * 5000 +
      this.#winningCounts.four * 50000 +
      this.#winningCounts.five * 1500000 +
      this.#winningCounts.fiveBonus * 30000000 +
      this.#winningCounts.six * 2000000000;
    const investmentMoney = this.lottoBundle.money;
    this.#lottoYield = Math.floor((winningMoney / investmentMoney) * 100);
  }

  get lottoYield() {
    return this.#lottoYield;
  }

  reset() {
    this.#winningNumbers = [];
    this.#bonusNumber = 0;
    this.#winningCounts = { three: 0, four: 0, five: 0, fiveBonus: 0, six: 0 };
    this.#lottoYield = 0;
  }

  isWinningNumbersDuplicated() {
    const numbers = [...this.#winningNumbers, this.#bonusNumber];

    if (numbers.length !== new Set(numbers).size) {
      return true;
    }
    return false;
  }
}
