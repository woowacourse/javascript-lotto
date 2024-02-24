class LottoOutputController {
  #outputView;

  constructor(outputView) {
    this.#outputView = outputView;
  }

  printBoughtLottos(lottos) {
    const lottosCopy = lottos.map((lotto) => lotto.slice());

    this.#outputView.printBoughtLottos(lottosCopy);
  }

  printLottoResult(lottoResult) {
    const rankArray = lottoResult.getRankArray();
    const getProfitRate = lottoResult.getProfitRate();

    this.#outputView.printLottoResult(rankArray, getProfitRate);
  }
}

export default LottoOutputController;
