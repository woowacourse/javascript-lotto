export default class StatisticsResponseDto {
  #lottosResult;
  #profitRate;

  constructor(lottosResult, profitRate) {
    this.#lottosResult = Object.freeze(lottosResult);
    this.#profitRate = profitRate;
    Object.freeze(this);
  }

  get lottosResult() {
    return this.#lottosResult;
  }

  get profitRate() {
    return this.#profitRate;
  }
}
