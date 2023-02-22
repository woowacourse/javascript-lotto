import Console from './Console';
import INPUT from '../../constants/input';

const InputView = {
  async readPurchaseAmount() {
    const money = await Console.read(INPUT.PURCHASE_AMOUNT);
    return Number(money);
  },

  async readWinNumbers() {
    const winNumbers = await Console.read(INPUT.WIN_NUMBERS);
    return winNumbers.split(',').map(Number);
  },

  async readBonusNumber() {
    const bonusNumber = await Console.read(INPUT.BONUS_NUMBER);
    return Number(bonusNumber);
  },

  async readRestartCommand() {
    const command = await Console.read(INPUT.RESTART_COMMAND);
    return command;
  },

  close() {
    Console.close();
  },
};

export default InputView;
