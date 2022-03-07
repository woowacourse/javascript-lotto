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
    this.initWinningCalcualtor();
  }

  initWinningCalcualtor() {
    this.winningNumbers = [];
    this.bonusNumber = 0;
    this.totalWinningCount = {};
    this.totalYield = 0;
  }

  calculateWinningResult(winningNumberInputs, bonusNumberInput, lottos) {
    this.initWinningCalcualtor();

    this.#validateWinningNumbers(
      convertStringNumberArrayToNumberArray([...winningNumberInputs, bonusNumberInput])
    );

    this.winningNumbers = convertStringNumberArrayToNumberArray(winningNumberInputs);
    this.bonusNumber = Number(bonusNumberInput);
    this.totalYield = Math.round(
      (this.#calculateTotalWinningResult(lottos) / (lottos.length * LOTTO_PRICE)) * 100 - 100
    );
  }

  #validateWinningNumbers(winningNumbers) {
    if (!isNumberArray(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.NOT_A_NUMBER_WINNING_NUMBER_INPUTS);
    }
    if (!this.#isNumberArrayInLottoRange(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.OUT_OF_NUMBERS_RANGE);
    }
    if (!isAllNumbersUnique(winningNumbers)) {
      throw new Error(ERROR_MESSAGE.NOT_UNIQUE_NUMBERS);
    }
  }

  #calculateTotalWinningResult(lottos) {
    Object.values(WINNING_AMOUNT).forEach((amount) => (this.totalWinningCount[amount] = 0));

    return lottos.reduce((acc, { lottoNumberSet }) => {
      const winningAmount = this.#calculateWinningAmountByLotto(Array.from(lottoNumberSet));
      this.totalWinningCount[winningAmount]++;
      return acc + winningAmount;
    }, 0);
  }

  #isNumberArrayInLottoRange(numberArray) {
    return numberArray.every((number) =>
      isNumberInRange({ number, min: LOTTO_NUMBER_RANGE.MIN, max: LOTTO_NUMBER_RANGE.MAX })
    );
  }

  #calculateWinningAmountByLotto(lottoNumbers) {
    const matchingNumberCount = lottoNumbers.filter((number) =>
      this.winningNumbers.includes(number)
    ).length;
    if (matchingNumberCount === LOTTO_NUMBER_COUNT - 1 && lottoNumbers.includes(this.bonusNumber)) {
      return WINNING_AMOUNT.BONUS;
    }
    return Object.keys(WINNING_AMOUNT).includes(matchingNumberCount.toString())
      ? WINNING_AMOUNT[matchingNumberCount.toString()]
      : WINNING_AMOUNT.MIN;
  }
}

export default WinningCalculator;
