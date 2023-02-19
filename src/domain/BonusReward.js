import Reward from './Reward';

class BonusNumberReward extends Reward {
  constructor(matchingNumbers, money) {
    super(matchingNumbers, money);
  }

  canReceive(lotto, winningLotto) {
    const hasBonusNumber = lotto.hasBonusNumber(winningLotto.getBonusNumber());
    return hasBonusNumber && super.canReceive(lotto, winningLotto);
  }
}

export default BonusNumberReward;
