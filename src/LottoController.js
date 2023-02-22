import RestartCommand from './constant/RestartCommand';
import LottoResult from './domain/LottoResult';
import Buyer from './domain/subject/Buyer';
import Seller from './domain/subject/Seller';

class LottoController {
  #inputView;
  #outputView;

  /** @type {Buyer} */
  #buyer;

  /** @type {Seller} */
  #seller;

  constructor({ inputView, outputView }) {
    this.#inputView = inputView;
    this.#outputView = outputView;
  }

  async proceedBuyLottos() {
    const money = await this.#inputView.readMoney();
    this.#buyer = new Buyer(money);
    this.#seller = new Seller();
    this.#buyer.buyLottos(this.#seller);

    this.#outputView.printLottos(this.#buyer.getLottos());
  }

  async proceedLottoResult() {
    const winningLotto = await this.#inputView.readWinningLotto();
    const lottoResult = new LottoResult(winningLotto);
    this.#buyer.receiveRewards(lottoResult);
    const profitRate = this.#buyer.getProfitRate();

    this.#outputView.printLottoResult(lottoResult, this.#buyer.getRewards());
    this.#outputView.printProfitRate(profitRate);
  }

  async proceedRestart() {
    const restartCommand = await this.#inputView.readRestartCommand();

    if (restartCommand === RestartCommand.YES) {
      return true;
    }
    this.#outputView.printExit();
    return false;
  }
}

export default LottoController;
