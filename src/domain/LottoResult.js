class LottoResult {
  static NEED_BONUS_NUMBER = (hasBonusNumber) => hasBonusNumber;

  static NO_NEED_BONUS_NUMBER = () => true;

  static REWARDS = [
    [6, LottoResult.NO_NEED_BONUS_NUMBER, 2_000_000_000],
    [5, LottoResult.NEED_BONUS_NUMBER, 30_000_000],
    [5, LottoResult.NO_NEED_BONUS_NUMBER, 1_500_000],
    [4, LottoResult.NO_NEED_BONUS_NUMBER, 50_000],
    [3, LottoResult.NO_NEED_BONUS_NUMBER, 5_000],
  ];

  constructor(winningNumbers, bonusNumber) {
    this.winningNumbers = winningNumbers;
    this.bonusNumber = bonusNumber;
  }

  exchangeLottoIntoMoney(lotto) {
    const matchingNumbers = lotto.countMatchingNumbers(this.winningNumbers);
    const hasBonusNumber = lotto.hasBonusNumber(this.bonusNumber);
    const reward = LottoResult.REWARDS.find(([_matchingNumbers, _bonusNumberCondition]) => {
      return matchingNumbers === _matchingNumbers && _bonusNumberCondition(hasBonusNumber);
    });
    if (!reward) return 0;
    const [, , rewardMoney] = reward;
    return rewardMoney;
  }
}

export default LottoResult;
