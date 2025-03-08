import LottoResult from "../domain/LottoResult";

const getLottoResult = (matchedStatus, price) => {
  const lottoResult = new LottoResult({
    matchedLottoStatus: matchedStatus,
    price,
  });

  return {
    winningHistory: lottoResult.getWinningHistory(),
    rate: lottoResult.getRate(),
  };
};

export default getLottoResult;
