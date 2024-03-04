import MESSAGE from '../constant/Message';
import RetryAnswer from '../domain/entity/RetryAnswer';
import InputView from '../view/InputView';
import PurchaseLottoServiceController from './PurchaseLottoServiceController';
import WinningLottoController from './WinningLottoController';
import WinningResultController from './WinningResultController';

class MainController {
  async run() {
    while (true) {
      await this.playLottoGame();
      const retryAnswerConfig = {
        message: MESSAGE.prompt.retry,
        factory: inputString => new RetryAnswer(inputString).get(),
      };
      const isRetry = await InputView.readExactValue(retryAnswerConfig);
      if (!isRetry) {
        return;
      }
    }
  }

  async playLottoGame() {
    const purchaseLottoObject =
      await PurchaseLottoServiceController.playPurchaseLottoService();
    const winningLottoObject = await WinningLottoController.playWinningLotto();

    WinningResultController.playWinningResult(
      purchaseLottoObject,
      winningLottoObject,
    );
  }
}

export default MainController;
