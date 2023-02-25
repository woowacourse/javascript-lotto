import COMMAND from '../constants/command';
import LOTTO from '../constants/lotto';
import LottoService from '../domain/LottoService';
import InputView from '../view/console/InputView';
import OutputView from '../view/console/OutputView';

class ConsoleController {
  #lottoService;

  constructor() {
    this.#lottoService = new LottoService();
  }

  async init() {
    await this.purchaseLottos();
    await this.setWinningLotto();
    this.printStatstics();
    await this.restartCommand();
  }

  async purchaseLottos() {
    const money = await InputView.readPurchaseAmount();
    const lottoAmount = money / LOTTO.UNIT;

    this.#lottoService.purchaseLottos(lottoAmount);
    OutputView.printPurchaseAmount(lottoAmount);
    this.#lottoService.getLottosNumbers().forEach(OutputView.printLottoNumbers);
  }

  async setWinningLotto() {
    const winNumbers = await InputView.readWinNumbers();
    const bonusNumber = await InputView.readBonusNumber();

    this.#lottoService.setWinningLotto(winNumbers, bonusNumber);
  }

  printStatstics() {
    const statstics = this.#lottoService.getStatstics();
    statstics.forEach(OutputView.printStatstics);
    OutputView.printProfitRate(this.#lottoService.getProfitRate(statstics));
  }

  async restartCommand() {
    const command = await InputView.readRestartCommand();
    if (command === COMMAND.RESTART) this.init();
    if (command === COMMAND.QUIT) InputView.close();
  }
}

export default ConsoleController;
