const LOTTO_SIZE = 6;

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = new Set(numbers);
  }

  countIntersect(winningNumbers) {
    return ((LOTTO_SIZE * 2)
      - new Set([...this.#numbers, ...winningNumbers]).size);
  }
}

export default Lotto;
