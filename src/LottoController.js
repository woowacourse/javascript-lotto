import RestartCommand from './constant/RestartCommand';
import LottoResult from './domain/LottoResult';
import Buyer from './domain/subject/Buyer';
import Seller from './domain/subject/Seller';
import LottoError from './errors/LottoError';

class LottoController {
  #inputView;
  #outputView;

  /** @type {Buyer} */
  #buyer;

  /** @type {Seller} */
  #seller;

  /** @type {boolean} 컨트롤러가 계속 사용될 수 있는지 여부. 재시작 제어를 위해 사용한다. */
  #finished = false;

  constructor({ inputView, outputView }) {
    this.#inputView = inputView;
    this.#outputView = outputView;
  }

  isFinished() {
    return this.#finished;
  }

  finish() {
    this.#finished = true;
  }

  #throwIfFinished() {
    if (this.#finished) throw new LottoError('사용이 종료된 컨트롤러입니다.');
  }

  async proceedBuyLottos() {
    this.#throwIfFinished();

    const money = await this.#inputView.readMoney();
    this.#buyer = new Buyer(money);
    this.#seller = new Seller();
    this.#buyer.buyLottos(this.#seller);

    this.#outputView.printLottos(this.#buyer.getLottos());
  }

  async proceedLottoResult() {
    this.#throwIfFinished();

    const winningLotto = await this.#inputView.readWinningLotto();
    const lottoResult = new LottoResult(winningLotto);
    this.#buyer.receiveRewards(lottoResult);
    const profitRate = this.#buyer.getProfitRate();

    this.#outputView.printLottoResult(lottoResult, this.#buyer.getRewards());
    this.#outputView.printProfitRate(profitRate);
  }

  async proceedRestart() {
    this.#throwIfFinished();

    const restartCommand = await this.#inputView.readRestartCommand();
    if (restartCommand === RestartCommand.YES) {
      return;
    }
    this.#outputView.printExit();
    this.finish();
  }
}

export default LottoController;
