export default class Lotto {
  constructor() {
    this.numbers = Lotto.generateLottoNumbers();
  }

  static generateLottoNumbers() {
    const randomNumbers = [];
    while (randomNumbers.length < 6) {
      const randomNumber = Math.floor(Math.random() * 44 + 1);
      if (randomNumbers.includes(randomNumber)) continue;
      randomNumbers.push(randomNumber);
    }
    return randomNumbers;
  }
}
