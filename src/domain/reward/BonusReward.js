import Messages from '../../constant/Messages';
import Lotto from '../lotto/Lotto';
import WinningLotto from '../WinningLotto';
import Reward from './Reward';

class BonusNumberReward extends Reward {
  /**
   * @param {Lotto} lotto
   * @param {WinningLotto} winningLotto
   * @returns {boolean}
   */
  isQualified(lotto, winningLotto) {
    return (
      winningLotto.hasBonusNumber(lotto) &&
      winningLotto.getMatchCount(lotto) === this.getMatchCount()
    );
  }

  getName() {
    return Messages.format(Messages.BONUS_NUMBER_REWARD_NAME, this.getMatchCount());
  }
}

export default BonusNumberReward;
