import Console from '../utils/Console';
import { MESSAGES } from '../constants';

const InputView = {
  async readMoney() {
    const money = await Console.readLine(MESSAGES.GET_MONEY_INPUT);
    return Number(money);
  },

  async readLottoNumbers() {
    const readLottoNumbers = await Console.readLine(MESSAGES.GET_WINNING_NUMBERS);
    const lottoNumbers = readLottoNumbers
      .split(',')
      .map((number) => number.trim())
      .map(Number);
    return lottoNumbers;
  },

  async readBonusNumber() {
    const bonusNumber = await Console.readLine(MESSAGES.GET_BONUS_NUMBER);
    return Number(bonusNumber);
  },

  async readRestartCommand() {
    const restartCommand = await Console.readLine(MESSAGES.GET_RESTART_COMMAND);
    return restartCommand;
  },
};

export default InputView;
