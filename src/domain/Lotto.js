import MESSAGE from '../constants/message';

class Lotto {
  #numbers;
  constructor(numbers = []) {
    this.#numbers = numbers;
    this.#validate(numbers);
  }

  #validate(numbers = []) {
    this.#validateInNumbersRange(numbers);
    this.#validateNumbersLength(numbers);
    this.#validateDuplicationNumbers(numbers);
  }

  #validateInNumbersRange(numbers = []) {
    numbers.forEach((numberString) => {
      const number = Number(numberString);
      if (!Number.isInteger(number) || number > 45 || number < 1) {
        throw new Error(MESSAGE.ERROR.NUMBERS_RANGE_ERROR);
      }
    });
  }

  #validateNumbersLength(numbers = []) {
    if (numbers.length !== 6) {
      throw new Error(MESSAGE.ERROR.NUMBERS_LENGTH_ERROR);
    }
  }

  #validateDuplicationNumbers(numbers = []) {
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error(MESSAGE.ERROR.NUMBERS_DUPLICATION_ERROR);
    }
  }
}

export default Lotto;
