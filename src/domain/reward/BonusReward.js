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
    return `${this.getMatchCount()}개 일치, 보너스 볼 일치`;
  }
}

export default BonusNumberReward;
