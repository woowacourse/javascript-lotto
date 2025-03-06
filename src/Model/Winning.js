import { LOTTO_NUMBER_LENGTH, PRIZE } from '../constants/common.js';
import Validate from './Validate.js';

class Winning {
  #rankHistory = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
  };

  constructor(winningNumbers) {
    this.#validateWinningNumbers(winningNumbers);

    this.winningNumbers = winningNumbers.map(Number).sort((a, b) => a - b);
    this.bonusNumber = null;
  }

  #validateWinningNumbers(winningNumbers) {
    winningNumbers.forEach((winningNumber) => {
      Validate.checkIsNumber(winningNumber);
      Validate.checkWinningNumberCount(winningNumbers);
      Validate.checkLottoNumberRange(winningNumber);
    });
    Validate.checkWinningNumberDuplicate(winningNumbers);
  }

  validateBonusNumber(bonusNumber) {
    Validate.checkIsNumber(bonusNumber);
    Validate.checkLottoNumberRange(bonusNumber);
    Validate.checkBonusNumberDuplicate(this.winningNumbers, Number(bonusNumber));
  }

  setBonusNumber(bonusNumber) {
    this.bonusNumber = Number(bonusNumber);
  }

  calculateRank(boughtLottos) {
    boughtLottos.forEach((boughtLotto) => {
      this.calculateRankHistory(boughtLotto.numbers);
    });
  }

  #updateSecondOrThirdPlace(boughtLotto) {
    if (boughtLotto.includes(this.bonusNumber)) {
      this.#increaseRankingHistory('second');
      return;
    }
    this.#increaseRankingHistory('third');
  }

  #getRankHandler(boughtLotto) {
    return {
      6: () => this.#increaseRankingHistory('first'),
      5: () => this.#updateSecondOrThirdPlace(boughtLotto),
      4: () => this.#increaseRankingHistory('fourth'),
      3: () => this.#increaseRankingHistory('fifth'),
    };
  }

  calculateRankHistory(boughtLotto) {
    const matchCount = this.winningNumbers.filter(
      (winningNumber) => boughtLotto.includes(winningNumber)
    ).length;

    const rankHandler = this.#getRankHandler(boughtLotto);

    if (rankHandler[matchCount]) {
      rankHandler[matchCount]();
    }
  }

  #getTotalPrize() {
    return Object.entries(this.rankHistory)
      .reduce((total, [rank, count]) => {
        return total + PRIZE[rank] * count;
      }, 0);
  }

  getCalculatedPrizeRate(price) {
    const totalPrize = this.#getTotalPrize();
    const prizeRate = ((totalPrize / price) * 100).toFixed(1);
    return Number(prizeRate);
  }

  #increaseRankingHistory(rank) {
    this.#rankHistory[rank] += 1;
  }

  get rankHistory() {
    return { ...this.#rankHistory };
  }
}

export default Winning;
