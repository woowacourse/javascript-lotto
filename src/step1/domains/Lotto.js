class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    const regex = /^(?:[1-9]|[1-3][0-9]|4[0-5])$/;

    if (!numbers.every((number) => regex.test(number))) {
      throw new Error("[ERROR]");
    }
    if (numbers.length !== 6) {
      throw new Error("[ERROR]");
    }
    if (new Set(numbers).size !== numbers.length) {
      throw new Error("[ERROR]");
    }
  }

  #countMatchedNumber(answer) {
    return this.#numbers.filter((number) => answer.includes(number)).length;
  }

  hasNumber(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }

  getMatchedInfo(answer, bonusNumber) {
    const matchedCount = this.#countMatchedNumber(answer);
    const hasBonusNumber = this.hasNumber(bonusNumber);

    return { matchedCount, hasBonusNumber };
  }

  getNumbers() {
    return [...this.#numbers];
  }
}

export default Lotto;
