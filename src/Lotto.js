class Lotto {
  #lottoNumbers;
  #score;
  #isContainBonusNumber;

  constructor(lottoNumbers) {
    this.#lottoNumbers = lottoNumbers;
    this.#score = 0;
    this.#isContainBonusNumber = false;
  }

  getLottoNumbers() {
    return this.#lottoNumbers;
  }

  getScore() {
    return this.#score;
  }

  getIsContainBonusNumber() {
    return this.#isContainBonusNumber;
  }

  sortLottoNumbers() {
    this.#lottoNumbers.sort((a, b) => a - b);
  }

  compareNumbers(winningNumbers) {
    winningNumbers.forEach((winningNumbers) => {
      this.#lottoNumbers.includes(winningNumbers) && this.addScore();
    });
  }

  checkBonusNumber(bonusNumber) {
    if (this.#lottoNumbers.includes(bonusNumber)) {
      this.#isContainBonusNumber = true;
    }
  }

  addScore() {
    this.#score += 1;
  }
}

export default Lotto;
