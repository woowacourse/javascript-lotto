import Lotto from "./Lotto";

class WinningLotto {
  constructor(numbers, bonusNumber) {
    this.#validateNumbersInRange(numbers);
    this.#validateInteger(bonusNumber);
    this.#validateNumberInRange(bonusNumber);

    this.#validateNumbersLength(numbers);
    this.#validateIntegers(numbers);
  }

  #validateNumbersInRange(numbers) {
    numbers.forEach((number) => this.#validateNumberInRange(number));
  }

  #validateNumberInRange(number) {
    if (number < Lotto.MIN_LOTTO_NUMBER || number > Lotto.MAX_LOTTO_NUMBER) {
      throw new Error("[ERROR] 유효한 범위 로또 숫자가 아닙니다.");
    }
  }

  #validateNumbersLength(numbers) {
    if (numbers.length !== Lotto.NUMBERS_LENGTH) {
      throw new Error("[ERROR] 유효한 개수의 로또 숫자가 아닙니다");
    }
  }

  #validateIntegers(numbers) {
    numbers.forEach((number) => this.#validateInteger(number));
  }

  #validateInteger(number) {
    if (!Number.isInteger(number)) {
      throw new Error("[ERROR] 정수가 아닌 값입니다.");
    }
  }
}

export default WinningLotto;
