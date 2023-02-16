import InputValidator from '../validator/InputValidator';
import InputView from '../view/InputView';
import OutputView from '../view/OutputView';

class LottoController {
  async start() {
    this.handleMoneyInput();
  }

  async handleMoneyInput() {
    const moneyInput = await InputView.readInputMoney();

    try {
      InputValidator.validateMoneyInput(moneyInput);
    } catch (error) {
      OutputView.printMessage(error.message);
      await this.handleMoneyInput();
    }
  }
}

export default LottoController;
