import ERROR_MESSAGE from '../constants/messages/errorMessage';
import LOTTO_RULE from '../constants/rules/lottoRule';

class BonusNumber {
  #bonumNumber;

  constructor(number) {
    const parsedBonusNumber = Number(number);
    this.#validateBonusNumber(parsedBonusNumber);
    this.#bonumNumber = parsedBonusNumber;
  }

  #validateBonusNumber(number) {
    this.#isValidBonusNumberCount(number);
    this.#isNumber(number);
    this.#isPositiveInteger(number);
    this.#isValidNumberRange(number);
  }

  #isValidBonusNumberCount(number) {
    if (number === 0) {
      throw new Error(ERROR_MESSAGE.IS_INVALID_BONUS_NUMBER_COUNT);
    }
  }

  #isNumber(number) {
    if (Number.isNaN(number)) {
      throw new Error(ERROR_MESSAGE.IS_NOT_NUMBER);
    }
  }

  #isPositiveInteger(number) {
    if (number < 1) {
      throw new Error(ERROR_MESSAGE.IS_NOT_POSITIVE_INTEGER);
    }
  }

  #isValidNumberRange(number) {
    if (number > LOTTO_RULE.RANDOM_NUMBER_TO || number < LOTTO_RULE.RANDOM_NUMBER_FROM) {
      throw new Error(ERROR_MESSAGE.IS_INVALID_LOTTO_NUMBER_RANGE);
    }
  }

  // #hasRedundantNumber(number, winningLotto) {
  //   const winningLottoNumbers = winningLotto.lottoNumbers;

  //   if (winningLottoNumbers.includes(number)) {
  //     throw new Error(ERROR_MESSAGE.BONUS_NUMBER_ALREADY_CHOSEN);
  //   }
  // }

  get value() {
    return this.#bonumNumber;
  }
}

export default BonusNumber;
