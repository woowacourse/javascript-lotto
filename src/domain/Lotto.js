class Lotto {
  #lottoNumbers;
  constructor(lottoNumbers) {
    this.#lottoNumbers = this.#ascendingSort(lottoNumbers);
  }

  #ascendingSort(lottoNumbers) {
    return lottoNumbers.sort((a, b) => a - b);
  }

  get lottoNumbers() {
    return this.#lottoNumbers;
  }
}

export default Lotto;
