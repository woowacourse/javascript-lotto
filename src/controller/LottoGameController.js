import RetryHandler from '../errors/RetryHandler/RetryHandler.js';
import InputView from '../views/InputView.js';

class LottoGameController {
  async run() {
    await this.#processBuyLotto();
  }

  async #processBuyLotto() {
    const buyLottoPrice = await RetryHandler.errorWithLogging(() => InputView.readBuyLottoPrice());
    console.log(buyLottoPrice);
  }
}

export default LottoGameController;
