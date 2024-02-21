export default class LottoNumber {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers.sort((a, b) => a - b);
    this.#validLottoNumbers();
  }

  #validLottoNumbers() {
    this.#numbers.forEach((number) => {
      this.#validInRange(number, { min: 1, max: 45 });
    });
    this.#validInRange(1, 45);
    this.#validDuplicate();
    this.#validLength();
  }

  #validInRange(number) {
    if (number < 1 || number > 45) {
      throw new Error("❌");
    }
  }

  validInRangeWrapper(number) {
    return this.#validInRange(number);
  }

  #validDuplicate() {
    if (new Set([...this.#numbers]).size !== this.#numbers.length) {
      throw new Error("❌");
    }
  }

  #validLength() {
    if (this.#numbers.length !== 6) {
      throw new Error("❌");
    }
  }

  getLottoNumbers() {
    return [...this.#numbers];
  }
}
