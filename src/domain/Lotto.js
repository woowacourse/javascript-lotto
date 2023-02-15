class Lotto {
  constructor(numbers) {
    this.numbers = numbers.sort((a, b) => a - b);
  }

  getLottoString() {
    return this.numbers.join(", ");
  }
}

module.exports = Lotto;
