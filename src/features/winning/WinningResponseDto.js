export default class WinningResponseDto {
  #numbers;
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    this.#numbers = Object.freeze(numbers);
    this.#bonusNumber = bonusNumber;
    Object.freeze(this);
  }

  get numbers() {
    return this.#numbers;
  }
  get bonusNumber() {
    return this.#bonusNumber;
  }
}
