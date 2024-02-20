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
        throw new Error("[ERROR]: 허용된 정수 범위를 벗어났습니다.");
      }
    });
  }

  #validateNumbersLength(numbers = []) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR]: 6개의 정수를 입력하셔야 합니다.");
    }
  }

  #validateDuplicationNumbers(numbers = []) {
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error("[ERROR]: 중복된 숫자가 있습니다.");
    }
  }
}

export default Lotto;
