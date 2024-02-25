import { SETTING } from '../constant/setting';
import InputController from './InputController';
import Lotto from '../domain/Lotto';
import LottoMachine from '../service/LottoMachine';
import WinningResultService from '../service/WinningResultService';
import OutputView from '../view/OutputView';

class LottoGameController {
  #lottos;

  async play() {
    const purchaseAmount = await InputController.inputPurchaseAmount();
    this.#purchaseLottos(purchaseAmount);

    const { winningNumbers, bonusNumber } = await InputController.inputWinningConditions();
    this.#processWinningResult(winningNumbers, bonusNumber);

    const restartCommand = await InputController.inputRestartCommand();
    this.#restartGame(restartCommand);
  }

  #purchaseLottos(purchaseAmount) {
    const lottoList = new LottoMachine(purchaseAmount).getLottoNumbersList();
    this.#lottos = lottoList.map((lotto) => new Lotto(lotto));
    OutputView.printPurchaseResult(lottoList);
  }

  #processWinningResult(winningNumbers, bonusNumber) {
    const winningResultService = new WinningResultService([...this.#lottos], { winningNumbers, bonusNumber });
    OutputView.printWinningResult(winningResultService.getWinningResult());
    OutputView.printProfitRate(winningResultService.getProfitRate());
  }

  #restartGame(restartCommand) {
    if (restartCommand === SETTING.RESTART_COMMAND) {
      this.play();
    }
    if (restartCommand === SETTING.EXIT_COMMAND) {
      OutputView.printExitMessage();
    }
  }
}

export default LottoGameController;
