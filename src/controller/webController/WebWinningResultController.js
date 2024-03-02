import CONDITION from '../../constant/Condition';
import MESSAGE from '../../constant/Message';
import WinningResultService from '../../domain/service/WinningResultService';
import WinningRewardService from '../../domain/service/WinningRewardService';

class WebWinningResultController {
  purchaseLottoObject;
  winningLottoObject;

  static playWinningResult() {
    const winningResultObject = new WinningResultService(
      this.purchaseLottoObject.lottosNumbersKey,
      this.winningLottoObject,
    ).getWinningResult();

    const desiredKeys = CONDITION.winningKeys;

    const winningResult = desiredKeys.map(key => winningResultObject[key]);

    const $winningResultCount = document.querySelectorAll(
      '.winningResultCount',
    );

    $winningResultCount.forEach(
      (node, index) => (node.textContent = `${winningResult[index]}개`),
    );

    const winningRewardService = new WinningRewardService(
      winningResultObject,
      this.purchaseLottoObject.purchaseCountKey,
    );

    const $winningReturnRate = document.querySelector('.winningReturnRate');

    $winningReturnRate.textContent = MESSAGE.returnRate(
      winningRewardService.getReturnRate(),
    );

    const $winningResultModal = document.querySelector('.winningResultModal');
    $winningResultModal.classList.add('winningResultModal-visible');

    const $winningResult = document.querySelector('.winningResult');
    $winningResult.classList.add('winningResult-visible');
  }

  static setPurchaseLottoObject(purchaseLottoObject) {
    this.purchaseLottoObject = purchaseLottoObject;
  }

  static setWinningLottoObject(winningLottoObject) {
    this.winningLottoObject = winningLottoObject;
  }
}

export default WebWinningResultController;
