class LottoOutputController {
  static LOTTO_PRINT_LIMIT = 100;
  #outputView;

  constructor(outputView) {
    this.#outputView = outputView;
  }

  printBoughtLottos(lottos) {
    const sliced = this.#getSlicedCopiedLottos(lottos);
    const LOTTO_PRINT_LIMIT = LottoOutputController.LOTTO_PRINT_LIMIT;

    if (LOTTO_PRINT_LIMIT < lottos.length)
      this.#outputView.printBoughtSlicedLottos(sliced, lottos.length);
    else this.#outputView.printBoughtLottos(sliced);
  }

  printLottoResult(lottoResult) {
    const rankArray = lottoResult.getRankArray();
    const getProfitRate = lottoResult.getProfitRate();

    this.#outputView.printLottoResult(rankArray, getProfitRate);
  }

  #getSlicedCopiedLottos(lottos) {
    return lottos
      .slice(0, LottoOutputController.LOTTO_PRINT_LIMIT)
      .map((lotto) => lotto.sort((a, b) => a - b));
  }
}

export default LottoOutputController;
