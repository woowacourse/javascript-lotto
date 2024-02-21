import LottoBuyer from '../domain/LottoBuyer/LottoBuyer.js';
import RetryHandler from '../errors/RetryHandler/RetryHandler.js';
import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';

class LottoGameController {
  async run() {
    await this.#processBuyLotto();
  }

  async #processBuyLotto() {
    const buyLottoPrice = await RetryHandler.errorWithLogging(() => InputView.readBuyLottoPrice());

    const lottoNumbers = LottoBuyer.from().purchase(buyLottoPrice);

    OutputView.printLottoCount(lottoNumbers.length);
    OutputView.printLottoNumbers(lottoNumbers);
  }
}

export default LottoGameController;
