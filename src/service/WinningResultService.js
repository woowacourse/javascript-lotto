import { RateOfReturnCalculator, WinningRank } from '../domain/index.js';

const WinningResultService = Object.freeze({
  createWinningResult({ winningNumber, bonusNumber, lottoNumbers, buyLottoPrice }) {
    const winningRank = new WinningRank({ winningNumber, bonusNumber, lottoNumbers });
    const winningRankResult = winningRank.calculateRank();

    const rateOfReturnCalculator = new RateOfReturnCalculator({ buyLottoPrice, winningRankResult });
    const rateOfReturn = rateOfReturnCalculator.execute();

    return { rateOfReturn, winningRankResult };
  },
});

export default WinningResultService;
