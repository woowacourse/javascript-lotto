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

  constructor(numbers) {
    this.numbers = [...numbers].sort((a, b) => a - b);
  }
}
