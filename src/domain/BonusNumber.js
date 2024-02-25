import ERROR_MESSAGE from '../constants/messages/errorMessage';
import LOTTO_RULE from '../constants/rules/lottoRule';

class BonusNumber {
  #bonumNumber;

  constructor(bonusNumberInput, winningLotto) {
    this.#bonumNumber = Number(bonusNumberInput);
    this.#validateBonusNumber(winningLotto);
  }

  #validateBonusNumber(winningLotto) {
    this.#isPositiveNumber();
    this.#isInvalidNumberRange();
    this.#hasRedundantNumber(winningLotto);
  }

  #isPositiveNumber() {
    if (isNaN(this.#bonumNumber) || this.#bonumNumber < 1) {
      throw new Error(ERROR_MESSAGE.IS_NOT_POSITIVE_INTEGER);
    }
  }

  #isInvalidNumberRange() {
    if (this.#bonumNumber > LOTTO_RULE.RANDOM_NUMBER_TO || this.#bonumNumber < LOTTO_RULE.RANDOM_NUMBER_FROM) {
      throw new Error(ERROR_MESSAGE.IS_INVALID_LOTTO_NUMBER_RANGE);
    }
  }

  #hasRedundantNumber(winningLotto) {
    const winningLottoNumbers = winningLotto.lottoNumbers;

    if (winningLottoNumbers.includes(this.#bonumNumber)) {
      throw new Error(ERROR_MESSAGE.HAS_REDUNDANT_LOTTO_NUMBER);
    }
  }

  get value() {
    return this.#bonumNumber;
  }
}

export default BonusNumber;
