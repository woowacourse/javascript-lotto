import Console from '../util/Console.js';
import { COMMAND_NO, COMMAND_YES, SEPARATOR } from '../util/constants/constants.js';
import { INPUT_MESSAGE } from '../util/constants/messages.js';

const InputView = {
  async readMoney() {
    const input = await Console.question(INPUT_MESSAGE.money);
    const numberInput = input.replace(/ /g, '');

    if (!/^\d+$/.test(numberInput)) {
      throw new Error('[ERROR] 구매 금액 입력이 올바르지 않습니다. 숫자로만 입력해주세요. \n');
    }

    return Number(numberInput);
  },

  async readWinningNumbers() {
    const input = await Console.question(INPUT_MESSAGE.winningNumbers);
    const numbersInput = input.replace(/ /g, '');

    if (!new RegExp(`^[\\d|${SEPARATOR}]+$`).test(numbersInput)) {
      throw new Error(
        `\n[ERROR] 로또 번호 입력이 올바르지 않습니다. ${SEPARATOR}로 구분하여 번호를 입력하세요.\n`
      );
    }

    return numbersInput.split(SEPARATOR).map(Number);
  },

  async readBonusNumber() {
    const input = await Console.question(INPUT_MESSAGE.bonusNumber);
    const numberInput = input.replace(/ /g, '');

    if (!/^\d+$/.test(numberInput)) {
      throw new Error('\n[ERROR] 보너스 번호 입력이 올바르지 않습니다. 숫자로만 입력해주세요.\n');
    }

    return Number(input);
  },

  async readRetry() {
    const input = await Console.question(INPUT_MESSAGE.retry);
    const commandInput = input.replace(/ /g, '').toLowerCase();

    if (commandInput !== COMMAND_NO && commandInput !== COMMAND_YES) {
      throw new Error(
        `\n[ERROR] 재시작 입력이 올바르지 않습니다. 재시작을 원하시면 ${COMMAND_YES}, 그렇지 않다면 ${COMMAND_NO}를 입력 해주세요.\n`
      );
    }

    return commandInput;
  },
};

export default InputView;
