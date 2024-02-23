import InputView from '../view/InputView';
import PurchaseLottoController from './PurchaseLottoController';
import WinningLottoController from './WinningLottoController';

class MainController {
  async run() {
    while (true) {
      await this.#playLottoGameOnce();
      if (!(await this.#isRetryGame())) {
        return;
      }
    }
  }

  #isRetryGame() {
    return InputView.readIsRetry();
  }

  async #playLottoGameOnce() {
    const purchaseLottoController = new PurchaseLottoController();
    await purchaseLottoController.run();

    const lottosNumbers = purchaseLottoController.getLottos();
    const winningLottoController = new WinningLottoController(lottosNumbers);
    await winningLottoController.run();
  }
}

export default MainController;
