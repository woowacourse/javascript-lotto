import WinningResultService from '../domain/service/WinningResultService.js';
import WinningRewardService from '../domain/service/WinningRewardService.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import PurchaseLottoController from './PurchaseLottoController.js';
import WinningLottoController from './WinningLottoController.js';

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
