import { LottoBuyer, WinningRankCalculator, RateOfReturnCalculator } from '../domain/index.js';

class LottoWebController {
  #lottoGameInfo;

  processBuyLotto(buyLottoPrice) {
    const lottoBuyer = new LottoBuyer(buyLottoPrice);
    const lottoNumbersArray = lottoBuyer.purchase(buyLottoPrice);

    this.#lottoGameInfo = { buyLottoPrice, lottoNumbersArray };
  }

  processLottoResult({ winningNumbers, bonusNumber }) {
    this.#processCalculateRank({ winningNumbers, bonusNumber });
    this.#processCalculateRateOfReturn();
  }

  #processCalculateRank({ winningNumbers, bonusNumber }) {
    const { lottoNumbersArray } = this.#lottoGameInfo;
    // console.log(winningNumbers);
    // console.log(lottoNumbersArray);
    // console.log(bonusNumber);
    const winningRankCalculator = new WinningRankCalculator({
      winningNumbers,
      lottoNumbersArray,
      bonusNumber,
    });
    // console.log(winningRankCalculator.execute());
    this.#lottoGameInfo.winningRankResult = winningRankCalculator.execute();
  }

  #processCalculateRateOfReturn() {
    const { buyLottoPrice, winningRankResult } = this.#lottoGameInfo;
    const rateOfReturnCalculator = new RateOfReturnCalculator({ buyLottoPrice, winningRankResult });

    this.#lottoGameInfo.rateOfReturn = rateOfReturnCalculator.execute();
  }

  getLottoGameInfo() {
    return this.#lottoGameInfo;
  }
}

export default LottoWebController;
