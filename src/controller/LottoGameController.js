import { SETTING, RANKING } from '../constant/setting';
import Lotto from '../domain/Lotto';
import LottoMachine from '../domain/LottoMachine';
import Lottos from '../domain/Lottos';
import OutputView from '../view/OutputView';
import InputController from './InputController';

class LottoGameController {
  #lottos;

  async play() {
    const purchaseAmount = await InputController.inputPurchaseAmount();
    this.#createRandomLottos(purchaseAmount);

    const { winningNumbers, bonusNumber } = await InputController.inputWinningConditions();
    this.#lottosWinningResult(winningNumbers, bonusNumber);

    const restartCommand = await InputController.inputRestartCommand();
    this.#restartGame(restartCommand);
  }

  #createRandomLottos(purchaseAmount) {
    const lottoList = new LottoMachine(purchaseAmount).getLottoNumbersList();
    this.#lottos = lottoList.map((lotto) => new Lotto(lotto));
    OutputView.printPurchaseResult(lottoList);
  }

  #lottosWinningResult(winningNumbers, bonusNumber) {
    const lottos = new Lottos([...this.#lottos]);
    const winningResults = lottos.getWinningResults(winningNumbers, bonusNumber);
    OutputView.printWinningResults(winningResults);
    OutputView.printProfitRate(this.#calculateProfitRate(winningResults));
  }

  #calculateProfitRate(winningResults) {
    const totalProfit = Object.entries(winningResults).reduce(
      (profit, [ranking, count]) => profit + RANKING[ranking].REWARD * count,
      0,
    );
    return ((totalProfit * 100) / (this.#lottos.length * SETTING.LOTTO_PRICE)).toLocaleString('ko-KR', {
      minimumFractionDigits: 1,
    });
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
