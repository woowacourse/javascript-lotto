import { LOTTO_NUMBER_LENGTH, PRIZE } from '../constants/common.js';

class Winning {
  #rankHistory = {
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

  #updateSecondOrThirdPlace(boughtLotto) {
    if (boughtLotto.includes(this.bonusNumber)) {
      this.#increaseRankingHistory('second');
      return;
    }
    this.#increaseRankingHistory('third');
  }

  calculateRankHistory(boughtLotto) {
    const matchCount = this.winningNumbers.filter((winningNumber) => boughtLotto.includes(winningNumber)).length;
    if (matchCount === LOTTO_NUMBER_LENGTH) {
      this.#increaseRankingHistory('first');
    }
    if (matchCount === 5) {
      this.#updateSecondOrThirdPlace(boughtLotto);
    }
    if (matchCount === 4) {
      this.#increaseRankingHistory('fourth');
    }
    if (matchCount === 3) {
      this.#increaseRankingHistory('fifth');
    }
  }

  #getTotalPrize() {
    let totalPrize = 0;
    for (let rank in this.#rankHistory) {
      totalPrize = this.#sumPrize(rank, totalPrize);
    }
    return totalPrize;
  }

  #sumPrize(rank, totalPrize) {
    if (this.#rankHistory[rank]) {
      totalPrize += PRIZE[rank] * this.#rankHistory[rank];
    }
    return totalPrize;
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
