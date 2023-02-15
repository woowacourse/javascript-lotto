class Lotto {
  #lottoNumbers;
  #score;
  constructor(lottoNumbers) {
    this.#lottoNumbers = lottoNumbers;
    this.#score = 0;
  }

  getLottoNumbers() {
    return this.#lottoNumbers;
  }

  getScore() {
    return this.#score;
  }

  sortLottoNumbers() {
    this.#lottoNumbers.sort((a, b) => a - b);
  }

  compareNumbers(winningNumbers) {
    winningNumbers.forEach((winningNumbers) => {
      this.#lottoNumbers.includes(winningNumbers) && this.addScore();
    });
  }

  addScore() {
    this.#score += 1;
  }
}

export default Lotto;
