import { LottoBuyer } from '../domain/index.js';
import OutputView from '../views/OutputView.js';

class LottoWebController {
  processBuyLotto(price) {
    const lottoBuyer = new LottoBuyer(price);
    const lottoNumbersArray = lottoBuyer.purchase(price);

    OutputView.printLottoCount(lottoNumbersArray.length);
    OutputView.printLottoNumbersArray(lottoNumbersArray);

    return { price, lottoNumbersArray };
  }
}

export default LottoWebController;
