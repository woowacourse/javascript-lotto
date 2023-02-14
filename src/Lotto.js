class Lotto {
  #lottoNumbers;
  constructor(lottoNumbers) {
    this.#lottoNumbers = lottoNumbers;
  }

  getLottoNumbers() {
    return this.#lottoNumbers;
  }

  sortLottoNumbers() {
    this.#lottoNumbers.sort((a, b) => a - b);
    console.log(this.#lottoNumbers);
  }
}

export default Lotto;
