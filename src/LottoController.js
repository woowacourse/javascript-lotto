import Buyer from './domain/Buyer';
import LottoResult from './domain/LottoResult';
import Seller from './domain/Seller';
import WinningLotto from './domain/WinningLotto';
import InputView from './view/InputView';
import OutputView from './view/OutputView';

class LottoController {
  /** @type {Buyer} */
  #buyer;

  /** @type {Seller} */
  #seller;

  /** @type {WinningLotto} */
  #winningLotto;

  async proceedBuyLottos() {
    const money = await InputView.readMoney();
    this.#buyer = new Buyer(money);
    this.#seller = new Seller();
    this.#buyer.buyLottos(this.#seller);

    OutputView.printLottos(this.#buyer.getLottos());
  }

  async proceedWinningLotto() {
    this.#winningLotto = await InputView.readWinningLotto();
  }

  proceedLottoResult() {
    const lottoResult = new LottoResult(this.#winningLotto);
    const receivedRewards = this.#buyer.receiveRewards(lottoResult);
    const profitRate = this.#buyer.getProfitRate();

    OutputView.printLottoResult(receivedRewards);
    OutputView.printProfitRate(profitRate);
  }

  async proceedRestartCommand() {
    const restartCommand = await InputView.readRestartCommand();

    if (restartCommand === 'y') {
      return true;
    }
    OutputView.printExit();
    return false;
  }
}

export default LottoController;
