import Console from '../../utils/Console';
import Message from '../../constants/Message';

const { INPUT } = Message;

const Input = {
  async readMoney() {
    const input = await Console.readLineAsync(INPUT.MONEY);
    return input;
  },

  async readWinningNumbers() {
    const input = await Console.readLineAsync(INPUT.WINNING_NUMBERS);
    return input;
  },

  async readBonusNumber() {
    const input = await Console.readLineAsync(INPUT.BONUS_NUMBER);
    return input;
  },

  async readRestartOrExit() {
    const input = await Console.readLineAsync(INPUT.RESTART_OR_EXIT);
    return input;
  },
};

export default Input;
