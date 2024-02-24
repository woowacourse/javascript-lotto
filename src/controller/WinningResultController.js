import MESSAGE from '../constant/Message';
import WinningResultService from '../domain/service/WinningResultService';
import WinningRewardService from '../domain/service/WinningRewardService';
import OutputView from '../view/OutputView';

class WinningResultController {
  static playWinningResult(purchaseLottoObject, winningLottoObject) {
    const winningResult = new WinningResultService(
      purchaseLottoObject.lottosNumbersKey,
      winningLottoObject,
    ).getWinningResult();

    OutputView.print(MESSAGE.winningCharacteristicsHeader);
    OutputView.print(MESSAGE.lineSplitter);
    OutputView.print(MESSAGE.winningCharacteristicsResult(winningResult));
    this.playWinningReWard(winningResult, purchaseLottoObject.purchaseCountKey);
  }

  static playWinningReWard(winningResult, purchaseCount) {
    const winningRewardService = new WinningRewardService(
      winningResult,
      purchaseCount,
    );
    OutputView.print(MESSAGE.returnRate(winningRewardService.getReturnRate()));
  }
}

export default WinningResultController;
