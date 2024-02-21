import LottoBuyer from '../domain/LottoBuyer/LottoBuyer.js';
import RateOfReturnCalculator from '../domain/RateOfReturnCalculator/RateOfReturnCalculator.js';
import WinningRank from '../domain/WinningRank/WinningRank.js';
import RetryHandler from '../errors/RetryHandler/RetryHandler.js';
import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';

class LottoGameController {
  async run() {
    const { buyLottoPrice, lottoNumbers } = await this.#processBuyLotto();

    await this.#processDrawLottoResult({ buyLottoPrice, lottoNumbers });
  }

  async #processDrawLottoResult({ buyLottoPrice, lottoNumbers }) {
    const { winningNumber, bonusNumber } = await this.#requireWinningDetail();
    const winningRank = new WinningRank({ winningNumber, bonusNumber, lottoNumbers });
    const winningRankDetail = winningRank.calculateRank();

    const rateOfReturnCalculator = new RateOfReturnCalculator({ buyLottoPrice, winningRankDetail });
    const rateOfReturn = rateOfReturnCalculator.execute();

    OutputView.printWinningLottoResult({ rateOfReturn, winningRankDetail });
  }

  async #processBuyLotto() {
    const buyLottoPrice = await RetryHandler.errorWithLogging(() => InputView.readBuyLottoPrice());

    const lottoNumbers = LottoBuyer.from().purchase(buyLottoPrice);

    OutputView.printLottoCount(lottoNumbers.length);
    OutputView.printLottoNumbers(lottoNumbers);

    return { buyLottoPrice, lottoNumbers };
  }

  async #requireWinningDetail() {
    const winningNumber = await RetryHandler.errorWithLogging(() => InputView.readWinningNumber());
    const bonusNumber = await RetryHandler.errorWithLogging(() =>
      InputView.readBonusNumber(winningNumber),
    );

    return { winningNumber, bonusNumber };
  }
}

export default LottoGameController;
