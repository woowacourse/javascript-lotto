class Lotto {
  #numbers;

  constructor(numbers, lottoRules) {
    lottoRules.validateForLotto(numbers);
    this.#numbers = numbers;
  }

  hasNumber(number) {
    return this.#numbers.includes(number);
  }

  getMatchedInfo(winningNumber, bonusNumber) {
    const matchedCount = this.#countMatchedNumber(winningNumber);
    const hasBonusNumber = this.hasNumber(bonusNumber);

    return { matchedCount, hasBonusNumber };
  }

  getNumbers() {
    return [...this.#numbers];
  }

  #countMatchedNumber(winningNumber) {
    return this.#numbers.filter((number) => winningNumber.includes(number))
      .length;
  }
}

export default Lotto;
