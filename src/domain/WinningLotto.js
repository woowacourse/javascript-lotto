import {
  ERROR_MESSAGE,
  LOTTO_CONSTANT,
  LOTTO_RANKING,
  MATCHES_COUNT_TO_RANKING,
} from '../data/constants';
import Validator from '../utils/Validator';
import Lotto from './Lotto';

class WinningLotto extends Lotto {
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    super(numbers);
    this.validateBonusNumber(bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  validateBonusNumber(bonusNumber) {
    if (!Validator.isInteger(bonusNumber))
      throw new Error(ERROR_MESSAGE.NOT_INTEGER(LOTTO_CONSTANT.BONUS_NUMBER));
    if (
      LOTTO_CONSTANT.MIN_NUMBER > bonusNumber ||
      LOTTO_CONSTANT.MAX_NUMBER < bonusNumber
    )
      throw new Error(
        ERROR_MESSAGE.LOTTO_NUMBER_RANGE(LOTTO_CONSTANT.BONUS_NUMBER)
      );
    if (this.numbers.includes(bonusNumber))
      throw new Error(
        ERROR_MESSAGE.LOTTO_NUMBER_DUPLICATE(LOTTO_CONSTANT.BONUS_NUMBER)
      );
  }

  calculateRanking(lotto) {
    const matchesCount = lotto.numbers.filter((number) =>
      this.numbers.includes(number)
    ).length;

    if (
      MATCHES_COUNT_TO_RANKING[matchesCount] === LOTTO_RANKING.THIRD &&
      this.isBonusNumberMatched(lotto)
    )
      return LOTTO_RANKING.SECOND;
    return MATCHES_COUNT_TO_RANKING[matchesCount];
  }

  isBonusNumberMatched(lotto) {
    return lotto.numbers.includes(this.#bonusNumber);
  }
}

export default WinningLotto;
