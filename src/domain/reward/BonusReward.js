import Lotto from '../lotto/Lotto';
import WinningLotto from '../WinningLotto';
import Reward from './Reward';

class BonusNumberReward extends Reward {
  /**
   * @param {Lotto} lotto
   * @param {WinningLotto} winningLotto
   * @returns {boolean}
   */
  canReceive(lotto, winningLotto) {
    return (
      winningLotto.hasBonusNumber(lotto) &&
      winningLotto.countMatchingNumbers(lotto) === this.getMatchingNumber()
    );
  }
}

export default BonusNumberReward;
