import EXCEPTION from '../constants/exception';
import LOTTO from '../constants/lotto';

export default class LottoResult {
  constructor(lottoVendor) {
    this.lottoVendor = lottoVendor;
  }

  #winningNumbers = [];

  #bonusNumber = 0;

  #winningCounts = { 3: 0, 4: 0, 5: 0, fiveBonus: 0, 6: 0 };

  #lottoYield = 0;

  #winningMoney = 0;

  set winningNumbers(numbers) {
    if (this.isWinningNumbersDuplicated(numbers)) {
      throw new Error(EXCEPTION.DUPLICATED_NUMBERS);
    }
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
    const userLottos = this.lottoVendor.lottos;
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
      this.#winningCounts[3] * LOTTO.FIFTH_PRIZE +
      this.#winningCounts[4] * LOTTO.FOURTH_PRIZE +
      this.#winningCounts[5] * LOTTO.THIRD_PRIZE +
      this.#winningCounts.fiveBonus * LOTTO.SECOND_PRIZE +
      this.#winningCounts[6] * LOTTO.FIRST_PRIZE;
    const { paidMoney } = this.lottoVendor;
    this.#winningMoney = winningMoney;
    this.#lottoYield = Math.floor((winningMoney / paidMoney) * 100);
  }

  get lottoYield() {
    return this.#lottoYield;
  }

  isWinningNumbersDuplicated(winningNumbers) {
    const numbers = [...winningNumbers, this.#bonusNumber];
    if (numbers.length !== new Set(numbers).size) {
      return true;
    }
    return false;
  }
}
