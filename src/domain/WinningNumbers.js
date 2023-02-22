import {
  LOTTO_NUMBERS_COUNT,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
} from './constants';

class WinningNumbers {
  #numbers;

  #bonusNumber;

  constructor(numbers) {
    this.validateWinningNumbers(numbers);
    this.#numbers = numbers;
  }

  validateWinningNumbers(numbers) {
    if (!this.isValidWinningNumbers(numbers)) {
      throw new Error(
        `[ERROR] 당첨 번호는 ${MIN_LOTTO_NUMBER} 이상 ${MAX_LOTTO_NUMBER} 이하의 숫자 6개여야 합니다.`
      );
    }
    if (this.hasDuplicateNumber(numbers)) {
      throw new Error('[ERROR] 당첨 번호가 중복이 되면 안됩니다. ');
    }
  }

  isValidWinningNumbers(numbers) {
    return (
      numbers.filter((number) => this.isValidWinningNumber(number)).length ===
      LOTTO_NUMBERS_COUNT
    );
  }

  isValidWinningNumber(number) {
    return number >= MIN_LOTTO_NUMBER && number <= MAX_LOTTO_NUMBER;
  }

  hasDuplicateNumber(numbers) {
    return new Set(numbers).size !== numbers.length;
  }

  initBonusNumber(bonusNumber) {
    this.validateBonusNumber(bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  validateBonusNumber(bonusNumber) {
    if (!this.isValidWinningNumber(bonusNumber)) {
      throw new Error(
        `[ERROR] 보너스 번호는 ${MIN_LOTTO_NUMBER} 이상 ${MAX_LOTTO_NUMBER} 이하의 숫자여야 합니다.`
      );
    }
    if (this.isDuplicateFor(this.#numbers, bonusNumber)) {
      throw new Error('[ERROR] 당첨 번호가 중복이 되면 안됩니다. ');
    }
  }

  isDuplicateFor(winningNumbers, bonusNumber) {
    return winningNumbers.includes(bonusNumber);
  }

  get numbers() {
    return this.#numbers;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }
}

export default WinningNumbers;
