import { LottoBuyer, WinningRankCalculator, RateOfReturnCalculator } from '../domain/index.js';

class LottoWebController {
  #lottoGameInfo;

  processBuyLotto(price) {
    const lottoBuyer = new LottoBuyer(price);
    const lottoNumbersArray = lottoBuyer.purchase(price);

    this.#lottoGameInfo.price = price;
    this.#lottoGameInfo.lottoNumbersArray = lottoNumbersArray;
  }

  processCalculateRank({ winningNumbers, bonusNumber }) {
    const { lottoNumbersArray } = this.#lottoGameInfo;
    const winningRankCalculator = new WinningRankCalculator({
      winningNumbers,
      bonusNumber,
      lottoNumbersArray,
    });
    this.#lottoGameInfo.winningRankResult = winningRankCalculator.execute();
  }

  processCalculateRateOfReturn() {
    const { buyLottoPrice, winningRankResult } = this.#lottoGameInfo;
    const rateOfReturnCalculator = new RateOfReturnCalculator({ buyLottoPrice, winningRankResult });

    this.#lottoGameInfo.rateOfReturn = rateOfReturnCalculator.execute();
  }

  // processRaffleLottoResult({ winningNumbers, bonusNumber }) {
  //   const { lottoNumbersArray } = this.#lottoGameInfo;
  //   const winningRankCalculator = new WinningRankCalculator({
  //     winningNumbers,
  //     bonusNumber,
  //     lottoNumbersArray,
  //   });
  //   const winningRankResult = winningRankCalculator.execute();

  //   const rateOfReturnCalculator = new RateOfReturnCalculator({ buyLottoPrice, winningRankResult });
  //   const rateOfReturn = rateOfReturnCalculator.execute();

  //   this.#lottoGameInfo.winningRankResult = winningRankResult;
  //   this.#lottoGameInfo.rateOfReturn = rateOfReturn;
  // }

  getLottoGameInfo() {
    return this.#lottoGameInfo;
  }
}

export default LottoWebController;
