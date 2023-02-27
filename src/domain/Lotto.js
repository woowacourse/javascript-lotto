class Lotto {
  #lottoNumbers;
  #score;

  constructor(lottoNumbers) {
    this.#lottoNumbers = lottoNumbers.sort((a, b) => a - b);
    this.#score = 0;
  }

  get lottoNumbers() {
    return [...this.#lottoNumbers];
  }

  get score() {
    return this.#score;
  }

  addScore() {
    this.#score += 1;
  }
}

export default Lotto;
