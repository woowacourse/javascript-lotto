import { isValidRestartCommand } from '../../validation';
import Console from './Console';

const InputView = {
  BUY_MONEY_QUERY: '구입금액을 입력해 주세요.',
  WIN_NUMBERS_QUERY: '당첨 번호를 입력해 주세요.',
  BONUS_QUERY: '보너스 번호를 입력해 주세요.',
  RESTART_QUERY: '다시 시작 하겠습니까? (y/n)',
  INVALID_COMMAND_ERROR: '잘못된 명령어입니다.',

  async readBuyMoney() {
    const buyMoney = await Console.read(InputView.BUY_MONEY_QUERY);
    return Number(buyMoney);
  },

  async readWinNumbers() {
    // to-do: 중간에 띄어쓰기 된 입력값 허용하고 있는데 허용하지 않을지
    const winNumbers = await Console.read(InputView.WIN_NUMBERS_QUERY);
    const whiteSpaceRegexp = /\s/g;
    return winNumbers.replace(whiteSpaceRegexp, '').split(',').map(Number);
  },

  async readBonusNumber() {
    const bonusNumber = await Console.read(InputView.BONUS_QUERY);
    return Number(bonusNumber);
  },

  async readRestartCommand() {
    const command = await Console.read(InputView.RESTART_QUERY);
    if (!isValidRestartCommand(command)) {
      return new Error(this.INVALID_COMMAND_ERROR);
    }
    return command;
  },
};

export default InputView;
