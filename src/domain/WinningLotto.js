import { ERROR_MESSAGE, LOTTO_STRING } from '../data/constants';
import { toOrdinalNumber } from '../data/Converter';
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
      throw new Error(ERROR_MESSAGE.NOT_INTEGER(LOTTO_STRING.BONUS_NUMBER));
    if (1 > bonusNumber || 45 < bonusNumber)
      throw new Error(
        ERROR_MESSAGE.LOTTO_NUMBER_RANGE(LOTTO_STRING.BONUS_NUMBER)
      );
    if (this.numbers.includes(bonusNumber))
      throw new Error(
        ERROR_MESSAGE.LOTTO_NUMBER_DUPLICATE(LOTTO_STRING.BONUS_NUMBER)
      );
  }

  calculateRanking(lotto) {
    const matchedNumber = lotto.numbers.filter((number) =>
      this.numbers.includes(number)
    );

    if (matchedNumber.length === 5 && lotto.numbers.includes(this.#bonusNumber))
      return 'SECOND';
    return toOrdinalNumber[matchedNumber.length];
  }
}

export default WinningLotto;
