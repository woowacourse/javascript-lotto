import Reward from './Reward';

class BonusNumberReward extends Reward {
  canReceive(lotto, winningLotto) {
    const hasBonusNumber = lotto.hasBonusNumber(winningLotto.getBonusNumber());
    const matchingNumbers = lotto.countMatchingNumbers(winningLotto.getLottoNumbers());
    return hasBonusNumber && this.matchingNumbers === matchingNumbers;
  }
}

export default BonusNumberReward;
