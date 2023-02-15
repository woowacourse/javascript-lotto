class Lotto {
  constructor(numbers) {
    this.numbers = numbers.sort((prev, next) => prev - next);
  }

  getLottoString() {
    return this.numbers.join(", ");
  }
}

module.exports = Lotto;
