import MESSAGE from '../constant/Message.js';
import WinningResultService from '../domain/service/WinningResultService.js';
import WinningRewardService from '../domain/service/WinningRewardService.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class MainController {
  async run() {
    while (true) {
      await this.playLottoGame();
      const isRetry = await InputView.readRetryAnswer();
      if (!isRetry) {
        return;
      }
    }
  }

  async playLottoGame() {
    const purchaseLottoService = await InputView.readPurchaseMoney();
    const purchaseCount = purchaseLottoService.getPurchaseCount();
    OutputView.print(MESSAGE.purchaseCount(purchaseCount));

    purchaseLottoService
      .getLottos()
      .forEach(lotto => OutputView.print(MESSAGE.lotto(lotto)));
    OutputView.print(MESSAGE.blank);

    const winningLotto = await InputView.readWinningNumbers();
    OutputView.print(MESSAGE.blank);
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

    OutputView.print(MESSAGE.winningCharacteristicsHeader);
    OutputView.print(MESSAGE.lineSplitter);
    OutputView.print(MESSAGE.winningCharacteristics(winningResult));

    const winningRewardService = new WinningRewardService(
      winningResult,
      purchaseCount,
    );
    const returnRate = winningRewardService.getReturnRate();
    OutputView.print(MESSAGE.returnRate(returnRate));
  }
}

export default MainController;
