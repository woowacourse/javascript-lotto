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
      '.winning-result__count',
    );

    $winningResultCount.forEach(
      (node, index) => (node.textContent = `${winningResult[index]}개`),
    );

    const winningRewardService = new WinningRewardService(
      winningResultObject,
      this.purchaseLottoObject.purchaseCountKey,
    );

    const $winningReturnRate = document.querySelector(
      '.winning-result__return-rate',
    );

    $winningReturnRate.textContent = MESSAGE.returnRate(
      winningRewardService.getReturnRate(),
    );

    const $winningResultModal = document.querySelector('.winning-result-modal');
    $winningResultModal.classList.add('visible');

    const $winningResult = document.querySelector('.winning-result');
    $winningResult.classList.add('visible');
  }

  static setPurchaseLottoObject(purchaseLottoObject) {
    this.purchaseLottoObject = purchaseLottoObject;
  }

  static setWinningLottoObject(winningLottoObject) {
    this.winningLottoObject = winningLottoObject;
  }
}

export default WebWinningResultController;
