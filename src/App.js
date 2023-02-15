import LottoController from './LottoController';
import Console from './view/console/Console';
import InputView from './view/console/InputView';

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
    if (command === 'y') {
      this.play();
    }
    if (command === 'n') {
      Console.close();
    }
  }
}

export default App;
