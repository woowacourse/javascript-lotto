import Console from '../utils/console';
import messages from '../constants/messages';

const InputView = {
  async readInputMoney() {
    const moneyInput = await Console.readLine(messages.INPUT.MONEY);

    return moneyInput;
  },

  async readWinningNumber() {
    const winningNumber = await Console.readLine(messages.INPUT.WINNING_NUMBER);

    return winningNumber;
  }
};

export default InputView;
