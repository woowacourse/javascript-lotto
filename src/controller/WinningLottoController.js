import WinningResultService from '../domain/service/WinningResultService.js';
import WinningRewardService from '../domain/service/WinningRewardService.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class WinningLottoController {
  #lottosNumbers;

  constructor(lottosNumbers) {
    this.#lottosNumbers = lottosNumbers;
  }

  async run() {
    const winningLotto = await InputView.readWinningNumbers();
    OutputView.print('');
    await InputView.readBonusNumber(winningLotto);

    const winningResult = this.#makeWinningResult(winningLotto);
    this.#printWinningCharacteristic(winningResult);
    this.#printReturnRate(winningResult);
  }

  #makeWinningResult(winningLotto) {
    const winningLottoObject = {
      numbers: winningLotto.getNumbers(),
      bonusNumber: winningLotto.getBonusNumber(),
    };

    return new WinningResultService(
      this.#lottosNumbers,
      winningLottoObject,
    ).getWinningResult();
  }

  #printWinningCharacteristic(winningResult) {
    OutputView.printWinningCharacteristic(winningResult);
  }

  #printReturnRate(winningResult) {
    const purchaseCount = this.#lottosNumbers.length;

    const winningRewardService = new WinningRewardService(
      winningResult,
      purchaseCount,
    );
    const returnRate = winningRewardService.getReturnRate();
    OutputView.printReturnRate(returnRate);
  }
}

export default WinningLottoController;
