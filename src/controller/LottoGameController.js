import { LottoBuyer, RateOfReturnCalculator, WinningRank } from '../domain/index.js';
import { InputView, OutputView } from '../views/index.js';

import RetryHandler from '../errors/RetryHandler/RetryHandler.js';

class LottoGameController {
  #retryCommands = ['Y', 'y'];

  async run() {
    const { buyLottoPrice, lottoNumbers } = await this.#processBuyLotto();

    await this.#processDrawLottoResult({ buyLottoPrice, lottoNumbers });

    await this.#processRetryGame();
  }

  async #processBuyLotto() {
    const buyLottoPrice = await RetryHandler.errorWithLogging(() => InputView.readBuyLottoPrice());
    const lottoBuyer = new LottoBuyer(buyLottoPrice);
    const lottoNumbers = lottoBuyer.purchase(buyLottoPrice);

    OutputView.printLottoCount(lottoNumbers.length);
    OutputView.printLottoNumbers(lottoNumbers);

    return { buyLottoPrice, lottoNumbers };
  }

  async #processDrawLottoResult({ buyLottoPrice, lottoNumbers }) {
    const { winningNumber, bonusNumber } = await this.#requireWinningDetail();
    const winningRank = new WinningRank({ winningNumber, bonusNumber, lottoNumbers });
    const winningRankResult = winningRank.calculateRank();

    const rateOfReturnCalculator = new RateOfReturnCalculator({ buyLottoPrice, winningRankResult });
    const rateOfReturn = rateOfReturnCalculator.execute();

    OutputView.printDrawLottoResult({ rateOfReturn, winningRankResult });
  }

  async #requireWinningDetail() {
    const winningNumber = await RetryHandler.errorWithLogging(() => InputView.readWinningNumber());
    const bonusNumber = await RetryHandler.errorWithLogging(() =>
      InputView.readBonusNumber(winningNumber),
    );

    return { winningNumber, bonusNumber };
  }

  async #processRetryGame() {
    const retryCommand = await RetryHandler.errorWithLogging(() => InputView.readRetryCommand());

    if (this.#retryCommands.includes(retryCommand)) await this.run();
  }
}

export default LottoGameController;
