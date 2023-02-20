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
    const moneyInput = await this.handleMoneyInput();
    this.processMoneyInput(moneyInput);
    const winningNumber = await this.handleWinningNumber();
    const bonusNumber = await this.handleBonusNumber();
    const statistics = this.#LottoMachine.calculateStatistics(winningNumber, bonusNumber);
    this.printStatistics(statistics);
    const restartInput = await this.handleRestart();
    this.processRestartInput(restartInput);
  }

  async handleMoneyInput() {
    const moneyInput = await InputView.readInputMoney();

    try {
      inputValidator.validateMoneyInput(moneyInput);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.handleMoneyInput();
    }

    return moneyInput;
  }

  processMoneyInput(moneyInput) {
    OutputView.printMessage(moneyInput / values.LOTTO_PRICE + messages.output.lottoCount);
    this.#LottoMachine.buyLotto(+moneyInput);
    OutputView.printLottos(this.#LottoMachine.lottos);
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

    return rlConsole.close();
  }

  async handleRestart() {
    const restartInput = await InputView.readRestartInput();

    try {
      inputValidator.validateRestartInput(restartInput);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.handleRestart();
    }

    return restartInput;
  }

  processRestartInput(restartInput) {
    this.restartOrFinishLotto(restartInput);
  }
}

export default LottoController;
