import LottoBuyer from '../domain/LottoBuyer/LottoBuyer.js';
import RetryHandler from '../errors/RetryHandler/RetryHandler.js';
import InputView from '../views/InputView.js';

class LottoGameController {
  async run() {
    await this.#processBuyLotto();
  }

  async #processBuyLotto() {
    const buyLottoPrice = await RetryHandler.errorWithLogging(() => InputView.readBuyLottoPrice());

    const lottoNumber = LottoBuyer.from().purchase(buyLottoPrice);
  }
}

export default LottoGameController;
