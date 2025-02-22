export default class Lotto {
  constructor() {
    this.numbers = Lotto.generateLottoNumbers();
  }

  static generateLottoNumbers() {
    const randomNumbers = new Set();
    while (randomNumbers.size < 6) {
      const randomNumber = Math.floor(Math.random() * 44 + 1);
      randomNumbers.add(randomNumber);
    }
    return Array.from(randomNumbers);
  }
}
