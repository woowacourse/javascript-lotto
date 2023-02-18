import {
  ERROR_MESSAGE,
  LOTTO_CONSTANT,
  LOTTO_RANKING,
  MATCHES_COUNT_TO_RANKING,
} from '../data/constants.js';
import Lotto from './Lotto.js';

class WinningLotto extends Lotto {
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    super(numbers);
    this.validateBonusNumber(numbers, bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  validateBonusNumber(numbers, bonusNumber) {
    this.validateEachNumber(bonusNumber);

    if (numbers.includes(bonusNumber))
      throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_DUPLICATE(LOTTO_CONSTANT.LOTTO_NUMBER));
  }

  calculateRanking(lotto) {
    const matchesCount = this._numbers.filter((number) => lotto.includes(number)).length;

    if (this.isSecondRanking(lotto, matchesCount)) return LOTTO_RANKING.SECOND;

    return MATCHES_COUNT_TO_RANKING[matchesCount];
  }

  isSecondRanking(lotto, matchesCount) {
    return (
      MATCHES_COUNT_TO_RANKING[matchesCount] === LOTTO_RANKING.THIRD &&
      lotto.includes(this.#bonusNumber)
    );
  }
}

export default WinningLotto;
