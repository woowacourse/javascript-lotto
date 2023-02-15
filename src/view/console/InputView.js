import { isValidRestartCommand } from '../../validation';
import Console from './Console';

const InputView = {
  async readBuyMoney() {
    const buyMoney = await Console.read('구입금액을 입력해 주세요.');
    return Number(buyMoney);
  },

  async readWinNumbers() {
    // to-do: 중간에 띄어쓰기 된 입력값 허용하고 있는데 허용하지 않을지
    const winNumbers = await Console.read('당첨 번호를 입력해 주세요.');
    const whiteSpaceRegexp = /\s/g;
    return winNumbers.replace(whiteSpaceRegexp, '').split(',').map(Number);
  },

  async readBonusNumber() {
    const bonusNumber = await Console.read('보너스 번호를 입력해 주세요.');
    return Number(bonusNumber);
  },

  async readRestartCommand() {
    const command = await Console.read('다시 시작 하겠습니까? (y/n)');
    if (!isValidRestartCommand(command)) {
      return new Error('[ERROR]');
    }
    return command;
  },
};

export default InputView;
