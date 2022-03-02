import {
  convertStringNumberArrayToNumberArray,
  isNumberArray,
  isAllNumbersUnique,
  isNumberInRange,
} from '../utils/utils';
import { ERROR_MESSAGE, LOTTO_NUMBER_RANGE } from '../constants/constants';

class WinningCalculator {
  calculateWinningAmount(winnerNumberInputs) {
    this.validateWinnerNumbers(convertStringNumberArrayToNumberArray(winnerNumberInputs));
  }

  validateWinnerNumbers(winnerNumbers) {
    if (!isNumberArray(winnerNumbers)) {
      throw new Error(ERROR_MESSAGE.NOT_A_NUMBER_WINNER_NUMBER_INPUTS);
    }
    if (!this.isNumberArrayInLottoRange(winnerNumbers)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_NUMBERS_RANGE);
    }
    if (!isAllNumbersUnique(winnerNumbers)) {
      throw new Error(ERROR_MESSAGE.NOT_UNIQUE_NUMBERS);
    }
  }

  isNumberArrayInLottoRange(numberArray) {
    return numberArray.every((number) =>
      isNumberInRange({ number, min: LOTTO_NUMBER_RANGE.MIN, max: LOTTO_NUMBER_RANGE.MAX })
    );
  }
}

export default WinningCalculator;
