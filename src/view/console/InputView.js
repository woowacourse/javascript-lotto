import { isValidRestartCommand } from '../../validation';
import Console from './Console';
import OutputView from './OutputView';

const InputView = {
  BUY_MONEY_QUERY: '구입금액을 입력해 주세요.',
  WIN_NUMBERS_QUERY: '당첨 번호를 입력해 주세요.',
  BONUS_QUERY: '보너스 번호를 입력해 주세요.',
  RESTART_QUERY: '다시 시작 하겠습니까? (y/n)',
  INVALID_COMMAND_ERROR: '잘못된 명령어입니다.',

  async readPayments() {
    const payments = await Console.read(InputView.BUY_MONEY_QUERY);
    return Number(payments);
  },

  async readWinNumbers() {
    const winNumbers = await Console.read(InputView.WIN_NUMBERS_QUERY);
    return winNumbers.split(',').map(Number);
  },

  async readBonusNumber() {
    const bonusNumber = await Console.read(InputView.BONUS_QUERY);
    return Number(bonusNumber);
  },

  async readRestartCommand() {
    const command = await Console.read(InputView.RESTART_QUERY);
    try {
      if (!isValidRestartCommand(command)) {
        throw new Error(this.INVALID_COMMAND_ERROR);
      }
    } catch (error) {
      OutputView.printErrorMsg(error.message);
    }
    return command;
  },
};

export default InputView;
