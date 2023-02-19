import BonusNumberReward from './BonusReward';
import Reward from './Reward';

class LottoResult {
  static REWARDS = [
    new Reward(6, 2_000_000_000),
    new BonusNumberReward(5, 30_000_000),
    new Reward(5, 1_500_000),
    new Reward(4, 50_000),
    new Reward(3, 5_000),
  ];

  constructor(winningLotto) {
    this.winningLotto = winningLotto;
  }

  findReward(lotto) {
    const foundReward =
      LottoResult.REWARDS.find((reward) => {
        return reward.canReceive(lotto, this.winningLotto);
      }) ?? null;
    return foundReward;
  }

  countRewards(lottos) {
    const givenRewards = lottos.map((lotto) => this.findReward(lotto));

    const receivedRewardCounts = LottoResult.REWARDS.map((reward) => {
      const count = givenRewards.reduce(
        (count, givenReward) => (givenReward === reward ? count + 1 : count),
        0,
      );
      return { reward, count };
    });
    return receivedRewardCounts;
  }
}

export default LottoResult;
