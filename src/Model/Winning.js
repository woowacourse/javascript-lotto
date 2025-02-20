import { LOTTO_NUMBER_LENGTH, PRIZE } from '../constants/common.js';

class Winning {
  rankHistory = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
  };

  constructor(winningNumbers, bonusNumber) {
    this.winningNumbers = winningNumbers.sort((a, b) => a - b);
    this.bonusNumber = bonusNumber;
  }

  calculateRank(boughtLottos) {
    boughtLottos.forEach((boughtLotto) => {
      this.calculateRankHistory(boughtLotto.numbers);
    });
  }

  updateSecondOrThirdPlace(boughtLotto) {
    if (boughtLotto.includes(this.bonusNumber)) {
      this.rankHistory.second += 1;
      return;
    }
    this.rankHistory.third += 1;
  }

  calculateRankHistory(boughtLotto) {
    const matchCount = this.winningNumbers.filter((winningNumber) => boughtLotto.includes(winningNumber)).length;
    if (matchCount === LOTTO_NUMBER_LENGTH) {
      this.rankHistory.first += 1;
    }
    if (matchCount === 5) {
      this.updateSecondOrThirdPlace(boughtLotto);
    }
    if (matchCount === 4) {
      this.rankHistory.fourth += 1;
    }
    if (matchCount === 3) {
      this.rankHistory.fifth += 1;
    }
  }

  getTotalPrize() {
    let totalPrize = 0;

    for (let rank in this.rankHistory) {
      if (this.rankHistory[rank]) {
        totalPrize += PRIZE[rank] * this.rankHistory[rank];
      }
    }
    return totalPrize;
  }

  getCalculatedPrizeRate(price) {
    const totalPrize = this.getTotalPrize();
    const prizeRate = ((totalPrize / price) * 100).toFixed(1);
    return Number(prizeRate);
  }
}

export default Winning;
