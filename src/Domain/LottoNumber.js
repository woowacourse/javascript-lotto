export const LOTTO_NUMBER_RANGE = Object.freeze({
  MIN: 1,
  MAX: 45,
});

export const LOTTO_LENGTH = 6;

export default class LottoNumber {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers.sort((a, b) => a - b);
    this.#validLottoNumbers();
  }

  #validLottoNumbers() {
    this.#numbers.forEach((number) => {
      this.#validInRange(number);
    });
    this.#validDuplicate();
    this.#validLength();
  }

  #validInRange(number) {
    if (number < LOTTO_NUMBER_RANGE.MIN || number > LOTTO_NUMBER_RANGE.MAX) {
      throw new Error('❌');
    }
  }

  validInRangeWrapper(number) {
    return this.#validInRange(number);
  }

  #validDuplicate() {
    if (new Set([...this.#numbers]).size !== this.#numbers.length) {
      throw new Error('❌');
    }
  }

  #validLength() {
    if (this.#numbers.length !== LOTTO_LENGTH) {
      throw new Error('❌');
    }
  }

  getLottoNumbers() {
    return [...this.#numbers];
  }
}
