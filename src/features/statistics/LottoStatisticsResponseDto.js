export default class LottoStatisticsResponseDto {
  #lottosResult;
  #totalPrize;

  constructor(lottosResult, totalPrize) {
    this.#lottosResult = Object.freeze(lottosResult);
    this.#totalPrize = totalPrize;
    Object.freeze(this);
  }

  get lottosResult() {
    return this.#lottosResult;
  }

  get totalPrize() {
    return this.#totalPrize;
  }
}
