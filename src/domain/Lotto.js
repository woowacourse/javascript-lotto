class Lotto {
  #numbers;

  constructor(numbers) {
    numbers.sort((a, b) => a - b);
    this.#numbers = numbers;
  }

  compareMatchingNumbers(lotto) {
    return lotto.filter((lottoNumber) => this.#numbers.includes(lottoNumber))
      .length;
  }

  compareBonusNumbers(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
