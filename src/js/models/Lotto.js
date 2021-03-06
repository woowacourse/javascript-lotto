export default class Lotto {
  static get MIN_NUMBER() {
    return 1;
  }
  static get MAX_NUMBER() {
    return 45;
  }
  static get NUMBERS_LENGTH() {
    return 6;
  }
  static get UNIT_PRICE() {
    return 1000;
  }

  constructor(numbers) {
    this._numbers = [...numbers].sort((a, b) => a - b);
  }

  get numbers() {
    return this._numbers;
  }
}
