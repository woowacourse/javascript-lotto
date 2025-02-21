class Lotto {
  constructor(numbers) {
    this.numbers = numbers;
  }

  getLottoNumber() {
    return this.numbers;
  }

  getCorrectNumber(targetNumber) {
    return this.numbers.filter(num => targetNumber.includes(num)).length;
  }

  hasBonusNumber(bonusNumber) {
    return this.numbers.includes(bonusNumber);
  }
}

export default Lotto;
