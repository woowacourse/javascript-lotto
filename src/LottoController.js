import RestartCommand from './constant/RestartCommand';
import LottoResult from './domain/LottoResult';
import Buyer from './domain/subject/Buyer';
import Seller from './domain/subject/Seller';
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
    this.#buyer.receiveRewards(lottoResult);
    const profitRate = this.#buyer.getProfitRate();

    OutputView.printLottoResult(lottoResult, this.#buyer.getRewards());
    OutputView.printProfitRate(profitRate);
  }

  async proceedRestartCommand() {
    const restartCommand = await InputView.readRestartCommand();

    if (restartCommand === RestartCommand.YES) {
      return true;
    }
    OutputView.printExit();
    return false;
  }
}

export default LottoController;
