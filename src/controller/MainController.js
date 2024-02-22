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
    const lottosNumbers = purchaseLottoService.getLottos();
    this.#showPurchasedLotto(lottosNumbers);

    const winningLotto = await InputView.readWinningNumbers();
    OutputView.print('');

    await InputView.readBonusNumber(winningLotto);

    const winningResult = this.#makeWinningResult(winningLotto, lottosNumbers);
    this.#showWinningSummary(winningResult, purchaseCount);
  }

  #showPurchasedLotto(lottosNumbers) {
    lottosNumbers.forEach(lotto => OutputView.printLotto(lotto));
    OutputView.print('');
  }

  #makeWinningResult(winningLotto, lottosNumbers) {
    const winningLottoObject = {
      numbers: winningLotto.getNumbers(),
      bonusNumber: winningLotto.getBonusNumber(),
    };

    return new WinningResultService(
      lottosNumbers,
      winningLottoObject,
    ).getWinningResult();
  }

  #showWinningSummary(winningResult, purchaseCount) {
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
