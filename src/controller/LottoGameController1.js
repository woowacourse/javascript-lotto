import { SETTING, RANKING } from '../constant/setting.js';
import LottoMachine from '../domain/LottoMachine.js';
import LottosManager from '../domain/LottosManager.js';
import OutputView from '../view/OutputView.js';
import InputController1 from './InputController1.js';

class LottoGameController1 {
  #purchaseAmount;
  #lottos;

  async play() {
    this.#purchaseAmount = await InputController1.inputPurchaseAmount();
    this.#createRandomLottos();

    const winningNumbers = await InputController1.inputWinningNumbers();
    const bonusNumber = await InputController1.inputBonusNumber(winningNumbers);
    this.#calculateWinningResult(winningNumbers, bonusNumber);

    const restartCommand = await InputController1.inputRestartCommand();
    this.#restartGame(restartCommand);
  }

  #createRandomLottos() {
    const lottoList = new LottoMachine(this.#purchaseAmount).getLottoNumberList();
    OutputView.printPurchaseResult(lottoList);
    this.#lottos = new LottosManager(lottoList);
  }

  #calculateWinningResult(winningNumbers, bonusNumber) {
    const winningResults = this.#lottos.getWinningResults(winningNumbers, bonusNumber);
    OutputView.printWinningResults(winningResults);
    OutputView.printProfitRate(this.#calculateProfitRate(winningResults));
  }

  #calculateProfitRate(winningResults) {
    const totalProfit = Object.entries(winningResults).reduce((profit, [matchedKey, count]) => {
      return profit + RANKING[matchedKey].REWARD * count;
    }, 0);
    return ((totalProfit * 100) / this.#purchaseAmount).toLocaleString('ko-KR', { minimumFractionDigits: 1 });
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

export default LottoGameController1;
