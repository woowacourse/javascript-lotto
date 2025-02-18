class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }

  #validate(numbers) {
    if (!numbers.every((number) => typeof number === "number")) {
      throw new Error("로또 번호는 숫자여야 합니다.");
    }

    if (numbers.length !== 6) {
      throw new Error("로또 번호는 6개여야 합니다.");
    }

    if (!numbers.every((number) => number >= 1 && number <= 45)) {
      throw new Error("로또 번호의 범위는 1~45 사이입니다.");
    }

    if (new Set(numbers).size !== 6) {
      throw new Error("로또 번호는 중복되면 안됩니다.");
    }
  }
}

export default Lotto;
