import { SETTINGS } from "../constants/index.js";

class LottoMatcher {
  constructor(numbers, winningNumbers, bonusNumber) {
    this.numbers = numbers;
    this.winningNumbers = winningNumbers;
    this.bonusNumber = bonusNumber;
  }

  countMatches() {
    return this.numbers.filter((number) => this.winningNumbers.includes(number))
      .length;
  }

  hasBonusMatch() {
    return this.numbers.includes(this.bonusNumber);
  }

  calculateRank() {
    const matchCount = this.countMatches();

    if (matchCount === SETTINGS.rewards.first.matchCount) return "first";
    if (
      matchCount === SETTINGS.rewards.second.matchCount &&
      this.hasBonusMatch()
    )
      return "second";
    if (matchCount === SETTINGS.rewards.third.matchCount) return "third";
    if (matchCount === SETTINGS.rewards.fourth.matchCount) return "fourth";
    if (matchCount === SETTINGS.rewards.fifth.matchCount) return "fifth";

    return "none";
  }
}

export default LottoMatcher;
