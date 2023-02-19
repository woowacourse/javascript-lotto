class Lotto {
  #lottoNumbers;
  #score;
  #isContainBonusNumber;

  constructor(lottoNumbers) {
    this.#lottoNumbers = lottoNumbers;
    this.#score = 0;
    this.#isContainBonusNumber = false;
  }

  // getLottoNumbers() {
  //   return this.#lottoNumbers;
  // }

  get lottoNumbers() {
    return [...this.#lottoNumbers];
  }

  // getScore() {
  //   return this.#score;
  // }

  get score() {
    const tempScore = this.#score
    return tempScore
  }

  // getIsContainBonusNumber() {
  //   return this.#isContainBonusNumber;
  // }

  get isContainBonusNumber() {
    const tempIsContainBonusNumber = this.#isContainBonusNumber
    return tempIsContainBonusNumber
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
