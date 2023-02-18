import messages from '../constants/messages';
import InputValidator from '../validator/InputValidator';
import InputView from '../view/InputView';
import OutputView from '../view/OutputView';
import LottoMachine from '../model/LottoMachine';
import { values } from '../constants/values';
import Console from '../utils/console';

class LottoController {
  #LottoMachine;

  handleLottoMachine(moneyInput) {
    InputValidator.validateMoneyInput(moneyInput);
    OutputView.printMessage(moneyInput / values.LOTTO_PRICE + messages.OUTPUT.LOTTO_COUNT);
    this.initLottoMachine(moneyInput);
    OutputView.printLottos(this.#LottoMachine.lottos);
  }

  initLottoMachine(moneyInput) {
    this.#LottoMachine = new LottoMachine();
    this.#LottoMachine.buyLotto(+moneyInput);
  }

  async handleMoneyInput() {
    const moneyInput = await InputView.readInputMoney();

    try {
      this.handleLottoMachine(moneyInput);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.handleMoneyInput();
    }
  }

  async handleWinningNumber() {
    const winningNumber = await InputView.readWinningNumber();
    try {
      InputValidator.validateWinningNumberInput(winningNumber);
      this.#LottoMachine.initWinningLotto(winningNumber);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.handleWinningNumber();
    }
  }

  async handleBonusNumber() {
    const bonusNumber = await InputView.readBonusNumber();

    try {
      InputValidator.validateBonusNumberInput(this.#LottoMachine.winningLotto.winningNumber, bonusNumber);
      this.#LottoMachine.winningLotto.bonusNumber = bonusNumber;
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.handleBonusNumber();
    }
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

  async startManage() {
    await this.handleMoneyInput();
    await this.handleWinningNumber();
    await this.handleBonusNumber();

    const statistics = this.#LottoMachine.calculateStatistics();
    this.printStatistics(statistics);

    await this.handleRestart();
  }
}

export default LottoController;
