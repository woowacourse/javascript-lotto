import OPTIONS from '../constant/Options.js';

class WinningLotto {
  #winningNumbers;

  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  determineRank(lotto) {
    const lottoNumbers = lotto.getNumbers();
    const matchingCount = this.#countMatchedNumbers(lottoNumbers);
    const bonusMatch = this.#containBonusNumber(lottoNumbers);

    const rank = OPTIONS.RANK.find((rank_) =>
      this.#isRankConditionSatisfied(rank_, matchingCount, bonusMatch)
    );

    return rank;
  }

  #countMatchedNumbers(lottoNumbers) {
    return lottoNumbers.reduce((matchingCount, lottoNumber) => {
      return matchingCount + this.#winningNumbers.includes(lottoNumber);
    }, 0);
  }

  #containBonusNumber(lottoNumbers) {
    return lottoNumbers.includes(this.#bonusNumber);
  }

  #isRankConditionSatisfied(rank, matchingCount, bonusMatch) {
    const rankCondition = OPTIONS.RANK_CONDITION[rank];
    const matchingCondition = rankCondition.matchingCount ?? matchingCount;
    const bonusCondition = rankCondition.bonusMatch ?? bonusMatch;

    return matchingCondition === matchingCount && bonusCondition === bonusMatch;
  }
}

export default WinningLotto;
