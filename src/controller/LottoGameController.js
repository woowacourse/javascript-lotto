import LottoBuyer from '../domain/LottoBuyer/LottoBuyer.js';
import RetryHandler from '../errors/RetryHandler/RetryHandler.js';
import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';

class LottoGameController {
  async run() {
    const { buyLottoPrice, lottoNumbers } = await this.#processBuyLotto();

    await this.#processDrawLottoResult({ buyLottoPrice, lottoNumbers });
  }

  async #processDrawLottoResult({ buyLottoPrice, lottoNumbers }) {
    const winningNumber = await RetryHandler.errorWithLogging(() => InputView.readWinningNumber());
    const bonusNumber = await RetryHandler.errorWithLogging(() =>
      InputView.readBonusNumber(winningNumber),
    );

    console.log(winningNumber, bonusNumber);
  }

  async #processBuyLotto() {
    const buyLottoPrice = await RetryHandler.errorWithLogging(() => InputView.readBuyLottoPrice());

    const lottoNumbers = LottoBuyer.from().purchase(buyLottoPrice);

    OutputView.printLottoCount(lottoNumbers.length);
    OutputView.printLottoNumbers(lottoNumbers);

    return { buyLottoPrice, lottoNumbers };
  }
}

export default LottoGameController;
