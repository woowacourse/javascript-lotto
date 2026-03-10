import { INPUT_MESSAGE } from "../constants.js";
import { readLineAsync } from "../Utils.js";
import Validator from "../Validator.js";

const InputView = {
  async readMoney() {
    const input = await readLineAsync(INPUT_MESSAGE.MONEY);
    Validator.notEmptyString(input);
    Validator.stringIsNumber(input);

    const money = Number(input);
    return money;
  },

  async readWinningNumbers() {
    const input = await readLineAsync(INPUT_MESSAGE.WINNING_NUMBERS);
    Validator.notEmptyString(input);
    const splitInput = input.split(",");
    splitInput.forEach((string) => {
      Validator.stringIsNumber(string);
    });

    const numbers = splitInput.map((string) => Number(string));

    return numbers;
  },

  async readBonusNumber() {
    const input = await readLineAsync(INPUT_MESSAGE.BONUS_NUMBER);
    Validator.notEmptyString(input);
    Validator.stringIsNumber(input);
    const bonusNumber = Number(input);

    return bonusNumber;
  },

  async readRestartCommand() {
    const restartCommand = await readLineAsync(INPUT_MESSAGE.COMMAND);

    return restartCommand;
  },
};

export default InputView;
