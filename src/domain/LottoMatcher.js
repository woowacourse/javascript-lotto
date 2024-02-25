import { RANK } from '../constants';

class LottoMatcher {
  #matchingResult;

  constructor(winningNumber, bonusNumber) {
    this.winningNumber = winningNumber;
    this.bonusNumber = bonusNumber;
    this.#matchingResult = { FIRST: 0, SECOND: 0, THIRD: 0, FOURTH: 0, FIFTH: 0 };
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
    return Object.keys(RANK).find((rank) => RANK[rank].MATCHING_COUNT === matchCount);
  }

  updateResult(matchCount, hasBonusNumber) {
    if (hasBonusNumber && matchCount === 5) return (this.#matchingResult[SECOND] += 1);

    const rank = this.findRankByMatchCount(matchCount);
    this.#matchingResult[rank] += 1;
  }

  get matchingResult() {
    return this.#matchingResult;
  }
}

export default LottoMatcher;
