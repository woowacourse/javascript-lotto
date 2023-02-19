import messages from '../constants/messages';
import inputValidator from '../validator/InputValidator';
import InputView from '../view/InputView';
import OutputView from '../view/OutputView';
import LottoMachine from '../model/LottoMachine';
import { values } from '../constants/values';
import rlConsole from '../utils/console';

class LottoController {
  #LottoMachine;

  constructor() {
    this.#LottoMachine = new LottoMachine();
  }
  async start() {
    await this.handleMoneyInput();
    const winningNumber = await this.handleWinningNumber();
    const bonusNumber = await this.handleBonusNumber();
    const statistics = this.#LottoMachine.calculateStatistics(winningNumber, bonusNumber);
    this.printStatistics(statistics);
    await this.handleRestart();
  }

  async handleMoneyInput() {
    const moneyInput = await InputView.readInputMoney();

    try {
      inputValidator.validateMoneyInput(moneyInput);
      OutputView.printMessage(moneyInput / values.LOTTO_PRICE + messages.OUTPUT.LOTTO_COUNT);
      this.#LottoMachine.buyLotto(+moneyInput);
      OutputView.printLottos(this.#LottoMachine.lottos);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.handleMoneyInput();
    }
  }

  async handleWinningNumber() {
    const winningNumber = await InputView.readWinningNumber();

    try {
      inputValidator.validateWinningNumberInput(winningNumber);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.handleWinningNumber();
    }

    return winningNumber;
  }

  async handleBonusNumber() {
    const bonusNumber = await InputView.readBonusNumber();

    try {
      inputValidator.validateBonusNumberInput(bonusNumber);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.handleBonusNumber();
    }
    return bonusNumber;
  }

  printStatistics(statistics) {
    OutputView.printStatistics(statistics);
  }

  restartOrFinishLotto(restartInput) {
    if (restartInput === 'y') {
      return this.start();
    }

    rlConsole.close();
  }

  async handleRestart() {
    const restartInput = await InputView.readRestartInput();

    try {
      inputValidator.validateRestartInput(restartInput);
      this.restartOrFinishLotto(restartInput);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.handleRestart();
    }
  }
}

export default LottoController;
