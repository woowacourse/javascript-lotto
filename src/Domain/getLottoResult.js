import LottoManager from './Model/LottoManager.js';

export const getLottoResult = (winningLotto, lottoList) => {
  const lottoManager = new LottoManager(winningLotto, lottoList);
  const lottoResult = lottoManager.compareWinningLotto();
  const totalLottoPrize = lottoManager.calculatePrize(lottoResult);
  const lottoProfit = lottoManager.calculateProfit(totalLottoPrize);
  return { lottoResult, lottoProfit };
};
