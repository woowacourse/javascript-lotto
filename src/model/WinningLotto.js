import { MATCH_COUNT_TO_RANK } from '../constants/values';

class WinningLotto {
  #winningNumber;
  #bonusNumber;

  constructor(winningNumber) {
    this.#winningNumber = winningNumber.split(',').map(Number);
  }

  computeMatchCounts(winningNumber, lottoNumber) {
    const matchCounts = lottoNumber.reduce((acc, cur) => (winningNumber.includes(cur) ? acc + 1 : acc), 0);

    return matchCounts;
  }

  isFiveMatchCount(matchCounts) {
    return matchCounts === 5;
  }

  isSecondRank(bonusNumber, lottoNumber) {
    return lottoNumber.includes(bonusNumber);
  }

  checkLotteryWinningsRank(lottoNumber) {
    const matchCounts = this.computeMatchCounts(this.#winningNumber, lottoNumber);

    if (this.isFiveMatchCount(matchCounts)) {
      return MATCH_COUNT_TO_RANK[5][`${this.isSecondRank(this.#bonusNumber, lottoNumber) ? 0 : 1}`].rank;
    }
    return MATCH_COUNT_TO_RANK[matchCounts].rank;
  }

  get winningNumber() {
    return this.#winningNumber;
  }

  set bonusNumber(bonusNumber) {
    this.#bonusNumber = +bonusNumber;
  }
}

export default WinningLotto;
