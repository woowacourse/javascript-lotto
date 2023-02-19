import Reward from './Reward';

class BonusNumberReward extends Reward {
  canReceive(lotto, winningLotto) {
    return (
      winningLotto.hasBonusNumber(lotto) &&
      winningLotto.countMatchingNumbers(lotto) === matchingNumbers
    );
  }
}

export default BonusNumberReward;
