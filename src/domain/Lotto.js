class Lotto {
  constructor(lottoNumber) {
    this.lottoNumber = this.#ascendingSort(lottoNumber);
  }

  #ascendingSort(lottoNumber) {
    return lottoNumber.sort((a, b) => a - b);
  }
}

export default Lotto;
