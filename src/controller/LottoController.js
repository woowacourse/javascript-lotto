import messages from '../constants/messages';
import InputValidator from '../validator/InputValidator';
import InputView from '../view/InputView';
import OutputView from '../view/OutputView';
import LottoMachine from '../model/LottoMachine';
import { values } from '../constants/values';
import Console from '../utils/console';

class LottoController {
  #LottoMachine;

  async startManage() {
    await this.handleMoneyInput();
    const winningNumber = await this.handleWinningNumber();
    const bonusNumber = await this.handleBonusNumber();
    const statistics = this.#LottoMachine.calculateStatistics(winningNumber, bonusNumber);
    this.printStatistics(statistics);
    await this.handleRestart();
  }

  processLottoMachine(moneyInput) {
    this.#LottoMachine = new LottoMachine();
    this.#LottoMachine.buyLotto(+moneyInput);
  }

  async handleMoneyInput() {
    const moneyInput = await InputView.readInputMoney();

    try {
      InputValidator.validateMoneyInput(moneyInput);
      OutputView.printMessage(moneyInput / values.LOTTO_PRICE + messages.OUTPUT.LOTTO_COUNT);
      this.processLottoMachine(moneyInput);
      OutputView.printLottos(this.#LottoMachine.lottos);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.handleMoneyInput();
    }
  }

  async handleWinningNumber() {
    const winningNumber = await InputView.readWinningNumber();

    try {
      InputValidator.validateWinningNumberInput(winningNumber);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.handleWinningNumber();
    }

    return winningNumber;
  }

  async handleBonusNumber() {
    const bonusNumber = await InputView.readBonusNumber();

    try {
      InputValidator.validateBonusNumberInput(bonusNumber);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.handleBonusNumber();
    }
    return bonusNumber;
  }

  printStatistics(statistics) {
    OutputView.printStatistics(statistics);
  }

  async handleRestart() {
    const restartOrNot = await InputView.readAboutRestart();

    try {
      InputValidator.validateRestart(restartOrNot);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.handleRestart();
    }

    if (restartOrNot === values.YES) {
      return this.startManage();
    }

    return Console.close();
  }
}

export default LottoController;
