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
  LOTTO_PRICE,
} from '../constants/constants';

class WinningCalculator {
  constructor() {
    this.winnerNumbers = [];
    this.bonusNumber = '';
    this.totalWinningCount = {
      0: 0,
      5000: 0,
      50000: 0,
      1500000: 0,
      2000000000: 0,
      30000000: 0,
    };
    this.totalYield = 0;
  }

  calculateWinningResult(winnerNumberInputs, bonusNumberInput, lottos) {
    this.#validateWinnerNumbers(
      convertStringNumberArrayToNumberArray([...winnerNumberInputs, bonusNumberInput])
    );
    this.winnerNumbers = convertStringNumberArrayToNumberArray(winnerNumberInputs);
    this.bonusNumber = Number(bonusNumberInput);
    this.#updateTotalWinningCount(lottos);
    this.totalYield = this.calculateTotalYield(
      lottos.length * LOTTO_PRICE,
      this.#calculateTotalWinningAmount(lottos)
    );
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

  #updateTotalWinningCount(lottos) {
    lottos.forEach(
      (lotto) =>
        this.totalWinningCount[
          this.calculateWinningAmountByLotto(
            this.countNumberOfMatchingNumbers(Array.from(lotto.lottoNumberSet), this.winnerNumbers),
            Array.from(lotto.lottoNumberSet).includes(this.bonusNumber)
          )
        ]++
    );
  }

  #calculateTotalWinningAmount(lottos) {
    return lottos.reduce(
      (acc, lotto) =>
        acc +
        this.calculateWinningAmountByLotto(
          this.countNumberOfMatchingNumbers(Array.from(lotto.lottoNumberSet), this.winnerNumbers),
          Array.from(lotto.lottoNumberSet).includes(this.bonusNumber)
        ),
      0
    );
  }

  calculateTotalYield(cashInput, totalWinningAmount) {
    return Math.round((totalWinningAmount / cashInput) * 100);
  }
}

export default WinningCalculator;
