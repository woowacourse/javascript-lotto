export default class LottoResult {
  constructor(lottoBundle) {
    this.lottoBundle = lottoBundle;
  }

  #winningNumbers = [];

  #bonusNumber = 0;

  #winningCounts = { 3: 0, 4: 0, 5: 0, fiveBonus: 0, 6: 0 };

  #lottoYield = 0;

  #winningMoney = 0;

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
      winningMoney: this.#winningMoney,
    };
  }

  calculateWinningCounts() {
    const userLottos = this.lottoBundle.lottos;
    const winningCounts = {
      3: 0,
      4: 0,
      5: 0,
      fiveBonus: 0,
      6: 0,
    };
    userLottos.forEach((userLotto) => {
      winningCounts[this.#countLottoNumbers(userLotto)] += 1;
    });

    this.#winningCounts = winningCounts;
  }

  #countLottoNumbers(userLotto) {
    const mergedLottoNumbers = [...userLotto.numbers, ...this.#winningNumbers];
    const count = mergedLottoNumbers.length - new Set(mergedLottoNumbers).size;
    if (count === 5) {
      return this.#checkBonusNumber(userLotto);
    }

    return count;
  }

  #checkBonusNumber(userLotto) {
    if (userLotto.numbers.includes(this.#bonusNumber)) {
      return 'fiveBonus';
    }

    return 5;
  }

  calculateLottoYield() {
    const winningMoney =
      this.#winningCounts[3] * 5000 +
      this.#winningCounts[4] * 50000 +
      this.#winningCounts[5] * 1500000 +
      this.#winningCounts.fiveBonus * 30000000 +
      this.#winningCounts[6] * 2000000000;
    const investmentMoney = this.lottoBundle.paidMoney;
    this.#winningMoney = winningMoney;
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
