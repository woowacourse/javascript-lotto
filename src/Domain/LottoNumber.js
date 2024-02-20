export default class LottoNumber {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers.sort((a, b) => a - b);
    this.#validLottoNumbers();
  }

  #validLottoNumbers() {
    this.#validInRange(1, 45);
    this.#validDuplicate();
    this.#validLength();
  }

  #validInRange(min, max) {
    this.#numbers.forEach((number) => {
      if (number < min || number > max) {
        throw new Error("❌");
      }
    });
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
