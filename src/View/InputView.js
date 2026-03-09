import { COMMAND, INPUT_MESSAGE, LOTTO } from "../constants.js";
import { readLineAsync } from "../Utils.js";
import Validator from "../Validator.js";

const InputView = {
  async readMoney() {
    const input = await readLineAsync(INPUT_MESSAGE.MONEY);
    Validator.notEmptyString(input);
    Validator.stringIsNumber(input);

    const money = Number(input);

    Validator.numberDivided(money, LOTTO.PRICE);
    Validator.positiveNumber(money);

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
    numbers.forEach((number) => {
      Validator.positiveNumber(number);
      Validator.numberLower(LOTTO.LOWER, number);
      Validator.numberUpper(LOTTO.UPPER, number);
    });
    Validator.notDuplicated(numbers);

    Validator.arrayLength(numbers, LOTTO.COUNT);

    return numbers;
  },

  async readBonusNumber() {
    const input = await readLineAsync(INPUT_MESSAGE.BONUS_NUMBER);
    Validator.notEmptyString(input);
    Validator.stringIsNumber(input);
    const bonusNumber = Number(input);

    Validator.positiveNumber(bonusNumber);
    Validator.numberLower(LOTTO.LOWER, bonusNumber);
    Validator.numberUpper(LOTTO.UPPER, bonusNumber);

    return bonusNumber;
  },

  async readRestartCommand() {
    const restartCommand = await readLineAsync(INPUT_MESSAGE.COMMAND);
    const validCommand = COMMAND.YES.concat(COMMAND.NO);
    Validator.includeElement(restartCommand, validCommand);

    return restartCommand;
  },
};

export default InputView;
