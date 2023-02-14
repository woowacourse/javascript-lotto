class Lotto {
  #numbers;

  constructor(numbers) {
    this.validateNumbers(numbers);
    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }

  validateNumbers(numbers) {
    numbers.forEach((number) => {
      if (!Number.isInteger(number))
        throw new Error('로또 번호는 숫자여야 합니다.');
      if (1 > number || 45 < number)
        throw new Error('로또 번호는 1~45 사이의 숫자여야 합니다.');
    });
    if (new Set(numbers).size !== numbers.length)
      throw new Error('로또 번호는 중복될 수 없습니다.');
  }
}

export default Lotto;
