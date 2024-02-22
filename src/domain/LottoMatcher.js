import { RANK } from '../constant/rank.js';

class LottoMatcher {
  #matchingResult;

  constructor(winningNumber, bonusNumber) {
    this.winningNumber = winningNumber;
    this.bonusNumber = bonusNumber;
    this.#matchingResult = {
      FIRST: 0,
      SECOND: 0,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 0,
    };
  }

  checkMatchAndBonus(tickets) {
    const matchCount = tickets.filter((ticket) => this.winningNumber.includes(ticket)).length;
    const hasBonusNumber = tickets.some((ticket) => ticket === this.bonusNumber);

    return { matchCount, hasBonusNumber };
  }

  processMatches(tickets) {
    const { matchCount, hasBonusNumber } = this.checkMatchAndBonus(tickets);

    if (this.findRankByMatchCount(matchCount)) {
      this.updateResult(matchCount, hasBonusNumber);
    }
  }

  findRankByMatchCount(matchCount) {
    for (const rank in RANK) {
      if (RANK[rank].MATCHING_COUNT === matchCount) {
        return rank;
      }
    }
    //return null;
  }

  updateResult(matchCount, hasBonusNumber) {
    if (hasBonusNumber) return (this.#matchingResult.SECOND += 1);

    const rank = this.findRankByMatchCount(matchCount);
    this.#matchingResult.rank += 1;
  }

  get matchingResult() {
    return this.#matchingResult;
  }
}

export default LottoMatcher;

const arr = [1, 2, 3, 4, 5, 6];
const lotto = new LottoMatcher([1, 2, 3, 4, 22, 33], 6);

lotto.processMatches(arr);
console.log(lotto.matchingResult);
