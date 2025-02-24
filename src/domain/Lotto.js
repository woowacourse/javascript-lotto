class Lotto {
  #numbers;

  constructor(numbers) {
    numbers.sort((a, b) => a - b);
    this.#numbers = numbers;
  }

  compareMatchingNumbers(lotto) {
    return lotto.reduce((acc, curr) => {
      if (this.#numbers.includes(curr)) {
        acc += 1;
      }
      return acc;
    }, 0);
  }

  compareBonusNumbers(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }

  get numbers() {
    return this.#numbers;
  }
}

export default Lotto;
