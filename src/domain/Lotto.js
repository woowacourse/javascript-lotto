class Lotto {
  #lotto;

  constructor(lotto) {
    this.#lotto = lotto;
  }

  countMatchedNumbers(winningNumbers) {
    const count = winningNumbers.filter((number) => this.hasNumber(number)).length;
    return count;
  }

  hasNumber(number) {
    return this.#lotto.includes(number);
  }
}

export default Lotto;
