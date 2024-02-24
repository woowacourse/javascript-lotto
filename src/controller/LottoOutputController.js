class LottoOutputController {
  #outputView;

  constructor(outputView) {
    this.#outputView = outputView;
  }

  printBoughtLotto(lottos) {
    const lottosCopy = lottos.map((lotto) => lotto.slice());

    this.#outputView.printBoughtLotto(lottos);
  }

  printLottoResult(lottoResult) {
    const rankArray = lottoResult.getRankArray();
    const getProfitRate = lottoResult.getProfitRate();

    this.#outputView.printLottoResult(rankArray, getProfitRate);
  }
}

export default LottoOutputController;
