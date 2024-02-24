import LottoResult from "./LottoResult.js";

class LottoResultMaker {
  static getLottoResult(lottos, lottoBoard) {
    const lottoResult = new LottoResult();

    lottos.forEach((lotto) => {
      const rank = lottoBoard.getLottoRank(lotto);
      lottoResult.countRank(rank);
    });

    return lottoResult;
  }
}

export default LottoResultMaker;
