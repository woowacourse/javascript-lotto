import {
  convertStringNumberArrayToNumberArray,
  isNumberArray,
  isAllNumbersUnique,
  isNumberInRange,
} from '../utils/utils';
import {
  ERROR_MESSAGE,
  LOTTO_NUMBER_RANGE,
  LOTTO_NUMBER_COUNT,
  WINNING_AMOUNT,
} from '../constants/constants';

class WinningCalculator {
  calculateWinningAmount(winnerNumberInputs) {
    this.#validateWinnerNumbers(convertStringNumberArrayToNumberArray(winnerNumberInputs));
  }

  #validateWinnerNumbers(winnerNumbers) {
    if (!isNumberArray(winnerNumbers)) {
      throw new Error(ERROR_MESSAGE.NOT_A_NUMBER_WINNER_NUMBER_INPUTS);
    }
    if (!this.#isNumberArrayInLottoRange(winnerNumbers)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_NUMBERS_RANGE);
    }
    if (!isAllNumbersUnique(winnerNumbers)) {
      throw new Error(ERROR_MESSAGE.NOT_UNIQUE_NUMBERS);
    }
  }

  #isNumberArrayInLottoRange(numberArray) {
    return numberArray.every((number) =>
      isNumberInRange({ number, min: LOTTO_NUMBER_RANGE.MIN, max: LOTTO_NUMBER_RANGE.MAX })
    );
  }

  countNumberOfMatchingNumbers(lottoNumberArray, winnerNumberArray) {
    return lottoNumberArray.filter((number) => winnerNumberArray.includes(number)).length;
  }

  calculateWinningAmountByLotto(matchingNumberCount, isBonusNumberMatched) {
    if (matchingNumberCount === LOTTO_NUMBER_COUNT - 1 && isBonusNumberMatched) {
      return WINNING_AMOUNT.BONUS;
    }
    return Object.keys(WINNING_AMOUNT).includes(matchingNumberCount.toString())
      ? WINNING_AMOUNT[matchingNumberCount.toString()]
      : WINNING_AMOUNT.MIN;
  }

  calculateTotalYield(cashInput, totalWinningAmount) {
    return (totalWinningAmount / cashInput) * 100;
  }
}

export default WinningCalculator;
