import WinningResultService from '../domain/service/WinningResultService.js';
import WinningRewardService from '../domain/service/WinningRewardService.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

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
    const purchaseLottoService = await InputView.readPurchaseMoney();
    const purchaseCount = purchaseLottoService.getPurchaseCount();
    OutputView.printPurchaseCount(purchaseCount);

    purchaseLottoService
      .getLottos()
      .forEach(lotto => OutputView.printLotto(lotto));
    OutputView.print('');
    const winningLotto = await InputView.readWinningNumbers();
    OutputView.print('');
    await InputView.readBonusNumber(winningLotto);

    const lottosNumbers = purchaseLottoService.getLottos();
    const winningLottoObject = {
      numbers: winningLotto.getNumbers(),
      bonusNumber: winningLotto.getBonusNumber(),
    };

    const winningResult = new WinningResultService(
      lottosNumbers,
      winningLottoObject,
    ).getWinningResult();

    OutputView.printWinningCharacteristic(winningResult);

    const winningRewardService = new WinningRewardService(
      winningResult,
      purchaseCount,
    );
    const returnRate = winningRewardService.getReturnRate();
    OutputView.printReturnRate(returnRate);
  }
}

export default MainController;
