import LottoResult from "../domain/LottoResult.js";

export const ResultController = (winningLotto, lottoArray) => {
  const lottoResult = new LottoResult(winningLotto, lottoArray);
  const matchingCount = lottoResult.calculateResult();
  return matchingCount;
};
