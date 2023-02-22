class Lotto {
  #lottoNumbers;
  #score;
  #isContainBonusNumber;

  constructor(lottoNumbers) {
    this.#lottoNumbers = lottoNumbers.sort((a, b) => a - b);
    this.#score = 0;
    this.#isContainBonusNumber = false;
  }

  get lottoNumbers() {
    return [...this.#lottoNumbers];
  }

  get score() {
    return this.#score;
  }

  get isContainBonusNumber() {
    return this.#isContainBonusNumber;
  }

  addScore() {
    this.#score += 1;
  }

  setIsContainBonusNumber(isContain) {
    this.#isContainBonusNumber = isContain;
  }
}

export default Lotto;
