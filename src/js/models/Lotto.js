export default class Lotto {
  constructor(numbers) {
    this.numbers = [...numbers].sort((a, b) => a - b);
  }
}
