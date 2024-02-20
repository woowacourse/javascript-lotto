export default class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
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
}
