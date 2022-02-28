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

    return this.getLottoScore(countMatchNumber, isContainBonusNumber);
  }

  getLottoScore(countMatchNumber, isContainBonusNumber) {
    switch (countMatchNumber) {
      case 3:
        return 5;
      case 4:
        return 4;
      case 5:
        return 3;
      case 6:
        if (isContainBonusNumber) return 2;
        return 1;
      default:
        return 0;
    }
  }
}

export default Lotto;
