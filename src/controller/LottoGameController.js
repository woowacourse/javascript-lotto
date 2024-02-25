import { SETTING, RANKING } from '../constant/setting';
import InputController from './InputController';
import Lotto from '../domain/Lotto';
import LottoMachine from '../service/LottoMachine';
import WinningResultService from '../service/WinningResultService';
import OutputView from '../view/OutputView';

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
    const winningResultService = new WinningResultService([...this.#lottos], { winningNumbers, bonusNumber });
    const winningResult = winningResultService.getWinningResult();
    OutputView.printWinningResult(winningResult);
    OutputView.printProfitRate(this.#calculateProfitRate(winningResult));
  }

  #calculateProfitRate(winningResult) {
    const totalProfit = Object.entries(winningResult).reduce(
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
