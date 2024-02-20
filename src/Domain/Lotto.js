export default class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
    // Lotto.validLottoNumbers();
  }

  // static validLottoNumbers() {
  //   this.#validInRange(1, 45);
  //   this.#validDuplicate();
  // }

  // #validInRange(min, max) {
  //   this.#numbers.forEach((number) => {
  //     if (number < min || number > max) {
  //     } // TODO: throw error
  //   });
  // }

  // #validDuplicate() {}
}
