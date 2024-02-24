import MATCH_COUNT_CONDITION from '../Constants/matchCountCondition';

class RewardGenerator {
  #totalRewardResult = [
    {
      rank: 1,
      count: 0,
    },
    {
      rank: 2,
      count: 0,
    },
    {
      rank: 3,
      count: 0,
    },
    {
      rank: 4,
      count: 0,
    },
    {
      rank: 5,
      count: 0,
    },
  ];

  #matchCount = 0;

  #isBonusMatch = false;

  /**
   * 단일 로또와 당첨 번호를 인자로 받아서, 등수를 개산합니다.
   * @param { number[] } lottoNumbers
   * @param {  winningLottoNumbers : number[], bonusNumber : number } totalWinningLottoInfo
   */

  calculateRewardRank(lottoNumbers, totalWinningLottoInfo) {
    this.#initializeField();
    const { winningLottoNumbers, bonusNumber } = totalWinningLottoInfo;
    this.#compareWinNumber(lottoNumbers, winningLottoNumbers);
    this.#compareBonusNumber(lottoNumbers, bonusNumber);
    this.#setRewardRank();
  }

  #compareWinNumber(lottoNumbers, winningLottoNumbers) {
    winningLottoNumbers.forEach((winNumber) => {
      if (lottoNumbers.includes(winNumber)) {
        this.#matchCount += 1;
      }
    });
  }

  #compareBonusNumber(lottoNumbers, bonusNumber) {
    if (this.#matchCount === MATCH_COUNT_CONDITION.SECOND.COUNT && lottoNumbers.includes(bonusNumber)) {
      this.#isBonusMatch = true;
    }
  }

  #setRewardRank() {
    this.#setFirstRank();
    this.#setSecondRank();
    this.#setThirdRank();
    this.#setFourthRank();
    this.#setFifthRank();
  }

  #setFirstRank() {
    if (this.#matchCount === MATCH_COUNT_CONDITION.FIRST.COUNT && !this.#isBonusMatch) {
      const targetRank = this.#totalRewardResult.find((result) => result.rank === MATCH_COUNT_CONDITION.FIRST.RANK);
      targetRank.count += 1;
    }
  }

  #setSecondRank() {
    if (this.#matchCount === MATCH_COUNT_CONDITION.SECOND.COUNT && !this.isBonusMatch) {
      const targetRank = this.#totalRewardResult.find((result) => result.rank === MATCH_COUNT_CONDITION.SECOND.RANK);
      targetRank.count += 1;
    }
  }

  #setThirdRank() {
    if (this.#matchCount === MATCH_COUNT_CONDITION.THIRD.COUNT && this.isBonusMatch) {
      const targetRank = this.#totalRewardResult.find((result) => result.rank === MATCH_COUNT_CONDITION.THIRD.RANK);
      targetRank.count += 1;
    }
  }

  #setFourthRank() {
    if (this.#matchCount === MATCH_COUNT_CONDITION.FIFTH.COUNT && !this.isBonusMatch) {
      const targetRank = this.#totalRewardResult.find((result) => result.rank === MATCH_COUNT_CONDITION.FOURTH.RANK);
      targetRank.count += 1;
    }
  }

  #setFifthRank() {
    if (this.#matchCount === MATCH_COUNT_CONDITION.FIFTH.COUNT && !this.isBonusMatch) {
      const targetRank = this.#totalRewardResult.find((result) => result.rank === MATCH_COUNT_CONDITION.FIFTH.RANK);
      targetRank.count += 1;
    }
  }

  getTotalRewardResult() {
    return this.#totalRewardResult;
  }

  #initializeField() {
    this.#matchCount = 0;
    this.#isBonusMatch = false;
  }
}

export default RewardGenerator;
