import Console from '../utils/console';
import messages from '../constants/messages';

const InputView = {
  async readInputMoney() {
    const moneyInput = await Console.readLine(messages.input.money);

    return moneyInput;
  },

  async readWinningNumber() {
    const winningNumber = await Console.readLine(messages.input.winningNumber);

    return winningNumber;
  },

  async readBonusNumber() {
    const bonusNumber = await Console.readLine(messages.input.bonusNumber);

    return bonusNumber;
  },

  async readRestartInput() {
    const restartInput = await Console.readLine(messages.input.restart);

    return restartInput;
  },
};

export default InputView;
