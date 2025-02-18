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
  }
}

export default Lotto;
