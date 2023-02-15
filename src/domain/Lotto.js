class Lotto {
  constructor(numbers) {
    this.numbers = numbers.sort((prev, next) => prev - next);
  }

  getLottoString() {
    return this.numbers.join(", ");
  }

  matchNumbers(lottoNumbers) {
    const mergedNumbers = new Set([...this.numbers, ...lottoNumbers]);
    return mergedNumbers.size;
  }
}

module.exports = Lotto;
