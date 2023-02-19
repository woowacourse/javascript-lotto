import Lotto from './lotto/Lotto';
import BonusNumberReward from './reward/BonusReward';
import Reward from './reward/Reward';
import WinningLotto from './WinningLotto';

class LottoResult {
  /** @type {Reward[]} */
  static REWARDS = [
    new Reward(6, 2_000_000_000),
    new BonusNumberReward(5, 30_000_000),
    new Reward(5, 1_500_000),
    new Reward(4, 50_000),
    new Reward(3, 5_000),
  ];

  /** @type {WinningLotto} */
  #winningLotto;

  /**
   * @param {WinningLotto} winningLotto
   */
  constructor(winningLotto) {
    this.#winningLotto = winningLotto;
  }

  /**
   * @param {Lotto} lotto
   * @returns {Reward | null}
   */
  findReward(lotto) {
    const foundReward =
      LottoResult.REWARDS.find((reward) => {
        return reward.canReceive(lotto, this.#winningLotto);
      }) ?? null;
    return foundReward;
  }

  /**
   * @param {Lotto[]} lottos
   * @returns {[Reward, number][]}
   */
  countRewards(lottos) {
    const givenRewards = lottos.map((lotto) => this.findReward(lotto));
    const receivedRewardCounts = LottoResult.REWARDS.map((reward) => [
      reward,
      givenRewards.reduce((count, givenReward) => {
        return givenReward === reward ? count + 1 : count;
      }, 0),
    ]);
    return receivedRewardCounts;
  }
}

export default LottoResult;
