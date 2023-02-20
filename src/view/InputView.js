import Console from '../util/Console.js';
import { COMMAND_NO, COMMAND_YES, SEPARATOR } from '../util/constants/constants.js';
import { INPUT_MESSAGE } from '../util/constants/messages.js';

const InputView = {
  async readMoney() {
    const input = await Console.question(INPUT_MESSAGE.money);
    const numberInput = input.replace(/ /g, '');

    if (!/^\d+$/.test(numberInput)) throw new Error('[ERROR]10');

    return Number(numberInput);
  },

  async readWinningNumbers() {
    const input = await Console.question(INPUT_MESSAGE.winningNumbers);
    const numbersInput = input.replace(/ /g, '');

    if (!new RegExp(`^[\\d|${SEPARATOR}]+$`).test(numbersInput)) throw new Error('[ERROR]11');

    return numbersInput.split(SEPARATOR).map(Number);
  },

  async readBonusNumber() {
    const input = await Console.question(INPUT_MESSAGE.bonusNumber);
    const numberInput = input.replace(/ /g, '');

    if (!/^\d+$/.test(numberInput)) throw new Error('1');

    return Number(input);
  },

  async readRetry() {
    const input = await Console.question(INPUT_MESSAGE.retry);
    const commandInput = input.replace(/ /g, '').toLowerCase();

    if (commandInput !== COMMAND_NO && commandInput !== COMMAND_YES) throw new Error('[ERROR]');

    console.log('>>> commandInput :', commandInput);
    return commandInput;
  },
};

export default InputView;
