import EXCEPTION from '../constants/exception';
import LOTTO from '../constants/lotto';

export default class LottoResult {
  constructor(lottoVendor) {
    this.lottoVendor = lottoVendor;
  }

  #winningNumbers = [];

  #bonusNumber = 0;

  #winningCounts = { fifthPlace: 0, fourthPlace: 0, thirdPlace: 0, secondPlace: 0, firstPlace: 0 };

  #lottoYield = 0;

  #winningMoney = 0;

  #resultList;

  set winningNumbers(numbers) {
    if (this.#isWinningNumbersDuplicated(numbers)) {
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

  get resultList() {
    return this.#resultList;
  }

  get lottoYield() {
    return this.#lottoYield;
  }

  getLottoResult() {
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
    this.#resultList = Array.from({ length: this.lottoVendor.lottos.length });

    userLottos.forEach((userLotto, index) => {
      const winningRank = this.#getWinningRank(userLotto);
      if (winningRank === 'noPrize') return;
      this.#resultList[index] = winningRank;
      this.#winningCounts[winningRank] += 1;
    });
  }

  calculateLottoYield() {
    const winningMoney =
      this.#winningCounts.fifthPlace * LOTTO.FIFTH_PRIZE +
      this.#winningCounts.fourthPlace * LOTTO.FOURTH_PRIZE +
      this.#winningCounts.thirdPlace * LOTTO.THIRD_PRIZE +
      this.#winningCounts.secondPlace * LOTTO.SECOND_PRIZE +
      this.#winningCounts.firstPlace * LOTTO.FIRST_PRIZE;
    const { paidMoney } = this.lottoVendor;
    this.#winningMoney = winningMoney;
    this.#lottoYield = Math.floor((winningMoney / paidMoney) * 100);
  }

  #getWinningRank(userLotto) {
    const mergedLottoNumbers = [...userLotto.numbers, ...this.#winningNumbers];
    const sameCount = mergedLottoNumbers.length - new Set(mergedLottoNumbers).size;
    switch (sameCount) {
      case 3:
        return 'fifthPlace';
      case 4:
        return 'fourthPlace';
      case 5:
        return this.#checkBonusNumber(userLotto);
      case 6:
        return 'firstPlace';
      default:
        return 'noPrize';
    }
  }

  #checkBonusNumber(userLotto) {
    if (userLotto.numbers.includes(this.#bonusNumber)) {
      return 'secondPlace';
    }

    return 'thirdPlace';
  }

  #isWinningNumbersDuplicated(winningNumbers) {
    const numbers = [...winningNumbers, this.#bonusNumber];
    return numbers.length !== new Set(numbers).size;
  }
}
