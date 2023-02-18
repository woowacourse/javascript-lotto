import Console from '../utils/console';
import messages from '../constants/messages';
import { values } from '../constants/values';

const InputView = {
  async readInputMoney() {
    const moneyInput = await Console.readLine(messages.INPUT.MONEY);

    return moneyInput;
  },

  async readWinningNumber() {
    const winningNumber = await Console.readLine(messages.INPUT.WINNING_NUMBER);

    return winningNumber;
  },

  async readBonusNumber() {
    const bonusNumber = await Console.readLine(messages.INPUT.BONUS_NUMBER);

    return bonusNumber;
  },

  async readAboutRestart() {
    const restartOrNot = await Console.readLine(messages.INPUT.RESTART);

    return restartOrNot;
  },
};

export default InputView;
