import { isValidNumber, isValidLength } from '../utils/validator';
import { ERROR_MESSAGE } from '../constants/errorMessage';
import { NUMBER } from '../constants/number';

class Lotto {
  constructor(lottoNumbers) {
    this.lottoNumbers = lottoNumbers;
  }

  static create(lottoNumbers) {
    if (isValidNumber(lottoNumbers) && isValidLength(lottoNumbers)) {
      return new Lotto(lottoNumbers);
    }
    throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_IS_INVALIDATE);
  }

  result(winningNumbers) {
    let countMatchNumber = 0;
    let isContainBonusNumber = false;

    this.lottoNumbers.forEach((number) => {
      if (winningNumbers.includes(number)) {
        countMatchNumber += 1;
        if (number === winningNumbers[NUMBER.BONUS_NUMBER]) {
          isContainBonusNumber = true;
        }
      }
    });

    return this.getLottoRank(countMatchNumber, isContainBonusNumber);
  }

  getLottoRank(countMatchNumber, isContainBonusNumber) {
    switch (countMatchNumber) {
      case 3:
        return NUMBER.FIFTH_GRADE_INDEX;
      case 4:
        return NUMBER.FOURTH_GRADE_INDEX;
      case 5:
        return NUMBER.THIRD_GRADE_INDEX;
      case 6:
        if (isContainBonusNumber) return NUMBER.SECOND_GRADE_INDEX;
        return NUMBER.FIRST_GRADE_INDEX;
      default:
        return NUMBER.NOT_WINNING_INDEX;
    }
  }
}

export default Lotto;
