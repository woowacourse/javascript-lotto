import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class LottoGameStep1Controller {
  async play() {
    const input = await InputView.readPurchaseMoney();

    OutputView.purchaseLottoCount(input / 1000);
  }
}

export default LottoGameStep1Controller;
