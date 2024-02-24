import LottoResult from "./LottoResult.js";

class LottoResultMaker {
  static getLottoResult(lottos, winningLotto) {
    const lottoResult = new LottoResult();

    lottos.forEach((lotto) => {
      const rank = winningLotto.getLottoRank(lotto);
      lottoResult.countRank(rank);
    });

    return lottoResult;
  }
}

export default LottoResultMaker;
