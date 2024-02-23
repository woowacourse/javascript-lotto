import InputView from '../view/InputView';
import PurchaseLottoController from './PurchaseLottoController';
import WinningLottoController from './WinningLottoController';

class MainController {
  async run() {
    while (true) {
      await this.playLottoGameOnce();
      const isRetry = await InputView.readIsRetry();
      if (!isRetry) {
        return;
      }
    }
  }

  async playLottoGameOnce() {
    const purchaseLottoController = new PurchaseLottoController();
    await purchaseLottoController.run();

    const lottosNumbers = purchaseLottoController.getLottos();
    const winningLottoController = new WinningLottoController(lottosNumbers);
    await winningLottoController.run();
  }
}

export default MainController;
