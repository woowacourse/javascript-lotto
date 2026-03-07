class Lotto {
  #numbers;

  constructor(lottoNumberList) {
    this.#validate(lottoNumberList);
    this.#numbers = [...lottoNumberList].sort((a, b) => a - b);
  }

  #validate(numbers) {
    if (numbers.length !== 6)
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    if (new Set(numbers).size !== 6)
      throw new Error("[ERROR] 로또 번호는 중복되지 않아야 합니다.");
    if (numbers.some((n) => n < 1 || n > 45))
      throw new Error("[ERROR] 로또 번호는 1~45 사이여야 합니다.");
  }

  getNumbers() {
    return [...this.#numbers];
  }
}

export default Lotto;
