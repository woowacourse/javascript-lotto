import Constants from "../constant/Constants.js";

class Lotto {
  constructor(numbers) {
    this.numbers = numbers;
  }

  getLottoNumber() {
    return this.numbers;
  }

  getCorretNumber(targetNumber) {
    let correctNumber = 0;
    for (let i = 0; i < Constants.LOTTO.NUMBER_LENGTH; i += 1) {
      correctNumber += this.#addCorrectNumber(targetNumber, this.numbers[i]);
    }
    return correctNumber;
  }

  #addCorrectNumber(targetNumber, number) {
    if (targetNumber.includes(number)) return 1;
    return 0;
  }

  hasBonusNumber(bonusNumber) {
    return this.numbers.includes(bonusNumber);
  }
}

export default Lotto;
