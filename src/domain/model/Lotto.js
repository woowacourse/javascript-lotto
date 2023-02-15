class Lotto {
  #lottoNumbers;

  constructor(lottoNumbers) {
    this.#lottoNumbers = lottoNumbers;
  }

  getLottoNumbers() {
    return this.#lottoNumbers;
  }
}

module.exports = Lotto;
