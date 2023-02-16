import messages from '../constants/messages';
import InputValidator from '../validator/InputValidator';
import InputView from '../view/InputView';
import OutputView from '../view/OutputView';
import LottoMachine from '../model/LottoMachine';
import { values } from '../constants/values';

class LottoController {
  #LottoMachine;

  async start() {
    await this.handleMoneyInput();
    await this.handleWinningNumber();
    await this.handleBonusNumber();
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
  }

  async handleBonusNumber() {
    const bonusNumber = await InputView.readBonusNumber();

    try {
      InputValidator.validateBonusNumberInput(bonusNumber);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.handleBonusNumber();
    }
  }
}

export default LottoController;
