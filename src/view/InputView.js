import Console from '../utils/console';
import MESSAGE from '../constants/messages';

const InputView = {
  async readInputMoney() {
    const moneyInput = await Console.readLine(MESSAGE.INPUT.MONEY);

    return +moneyInput;
  },

  async readWinningNumber() {
    const winningNumber = await Console.readLine(MESSAGE.INPUT.WINNING_NUMBER);

    return winningNumber;
  },

  async readBonusNumber() {
    const bonusNumber = await Console.readLine(MESSAGE.INPUT.BONUS_NUMBER);

    return +bonusNumber;
  },

  async readAboutRestart() {
    const restartOrNot = await Console.readLine(MESSAGE.INPUT.RESTART);

    return restartOrNot;
  },
};

export default InputView;
