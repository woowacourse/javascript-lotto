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

  matchBonus(bonusNumber) {
    return this.numbers.includes(bonusNumber);
  }
}

module.exports = Lotto;
