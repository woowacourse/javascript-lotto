export class Lotto {
  constructor(numbers) {
    this._numbers = numbers;
  }

  get numbers() {
    return [...this._numbers];
  }
}
