class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    const regex = /^(?:[1-9]|[1-3][0-9]|4[0-5])$/;

    if (!numbers.every((number) => regex.test(number))) {
      throw new Error("에러다");
    }
    if (numbers.length !== 6) {
      throw new Error("에러다");
    }
    if (new Set(numbers).size !== numbers.length) {
      throw new Error("에러다");
    }
  }

  countMatchedNumber(answer) {
    return this.#numbers.filter((number) => answer.includes(number)).length;
  }

  hasBonusNumber(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

export default Lotto;
