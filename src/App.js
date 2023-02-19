import LottoController from './LottoController';
import Console from './view/console/Console';
import InputView from './view/console/InputView';
import { RESTART_COMMAND, EXIT_COMMAND } from './util/constants';

class App {
  #lottoController;

  constructor() {
    this.#lottoController = new LottoController();
  }

  async play() {
    await this.#lottoController.readBuyMoney();
    this.#lottoController.printBuyLottos();
    await this.#lottoController.readWinNumbers();
    await this.#lottoController.readBonusNumber();
    this.#lottoController.printWinStatistics();
    await this.readRestartCommand();
  }

  async readRestartCommand() {
    const command = await InputView.readRestartCommand();
    this.actionByCommand(command);
  }

  actionByCommand(command) {
    if (command === RESTART_COMMAND) {
      this.play();
    }
    if (command === EXIT_COMMAND) {
      Console.close();
    }
  }
}

export default App;
