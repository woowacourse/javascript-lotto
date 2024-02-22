import { SETTING, RANKING } from '../constant/setting.js';
import LottoMachine from '../domain/LottoMachine.js';
import Lottos from '../domain/Lottos.js';
import OutputView from '../view/OutputView.js';
import InputController from './InputController.js';

class LottoGameController {
  #purchaseAmount;
  #lottos;

  async play() {
    this.#purchaseAmount = await InputController.inputPurchaseAmount();
    this.#createRandomLottos();

    const winningNumbers = await InputController.inputWinningNumbers();
    const bonusNumber = await InputController.inputBonusNumber(winningNumbers);
    this.#lottosWinningResult(winningNumbers, bonusNumber);

    const restartCommand = await InputController.inputRestartCommand();
    this.#restartGame(restartCommand);
  }

  #createRandomLottos() {
    const lottoList = new LottoMachine(this.#purchaseAmount).getLottoNumberList();
    this.#lottos = new Lottos(lottoList);
    OutputView.printPurchaseResult(lottoList);
  }

  #lottosWinningResult(winningNumbers, bonusNumber) {
    const winningResults = this.#lottos.getWinningResults(winningNumbers, bonusNumber);
    OutputView.printWinningResults(winningResults);
    OutputView.printProfitRate(this.#calculateProfitRate(winningResults));
  }

  #calculateProfitRate(winningResults) {
    const totalProfit = Object.entries(winningResults).reduce((profit, [ranking, count]) => {
      return (profit += RANKING[ranking].REWARD * count);
    }, 0);
    return ((totalProfit * 100) / this.#purchaseAmount).toLocaleString('ko-KR', { minimumFractionDigits: 1 });
  }

  #restartGame(restartCommand) {
    if (restartCommand === SETTING.RESTART_COMMAND) {
      this.play();
    }
    if (restartCommand === SETTING.EXIT_COMMAND) {
      OutputView.printExitMessage();
      return;
    }
  }
}

export default LottoGameController;
