import MESSAGE from '../constants/messages';
import LottoValidator from '../model/LottoValidator';
import InputView from '../view/InputView';
import OutputView from '../view/OutputView';
import LottoMachine from '../model/LottoMachine';
import { VALUES } from '../constants/values';
import Console from '../utils/console';

class LottoController {
  #LottoMachine;

  async startManage() {
    await this.handleMoneyInput();
    await this.handleWinningLotto();

    this.printStatistics();

    await this.handleRestart();
  }

  async handleMoneyInput() {
    const moneyInput = await InputView.readInputMoney();

    try {
      LottoValidator.validateMoneyInput(moneyInput);
      this.#LottoMachine = new LottoMachine(moneyInput);
      OutputView.printMessage(moneyInput / VALUES.LOTTO_PRICE + MESSAGE.OUTPUT.LOTTO_COUNT);
      OutputView.printLottos(this.#LottoMachine.lottos);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.handleMoneyInput();
    }
  }

  async handleWinningLotto() {
    const winningNumber = await InputView.readWinningNumber();

    try {
      LottoValidator.validateWinningNumberInput(winningNumber);
      await this.handleBonusNumber(winningNumber);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.handleWinningLotto();
    }
  }

  async handleBonusNumber(winningNumber) {
    const bonusNumber = await InputView.readBonusNumber();

    try {
      LottoValidator.validateBonusNumberInput(winningNumber, bonusNumber);
      this.#LottoMachine.initWinningLotto(winningNumber, bonusNumber);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.handleBonusNumber(winningNumber);
    }
  }

  printStatistics() {
    OutputView.printStatistics(this.#LottoMachine.calculateStatistics());
  }

  async handleRestart() {
    const restartOrNot = await InputView.readAboutRestart();

    try {
      LottoValidator.validateRestart(restartOrNot);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.handleRestart();
    }

    if (restartOrNot === VALUES.YES) {
      return this.startManage();
    }

    return Console.close();
  }
}

export default LottoController;
