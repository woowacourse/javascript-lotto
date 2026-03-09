import { COMMAND, INPUT_MESSAGE, LOTTO } from "../constants.js";
import { readLineAsync } from "../Utils.js";
import Validator from "../Validator.js";

const InputView = {
  async readMoney() {
    const input = await readLineAsync(INPUT_MESSAGE.MONEY);
    Validator.validateNotEmptyString(input);
    Validator.validateStringIsNumber(input);

    const money = Number(input);

    Validator.validateNumberDivided(money, LOTTO.PRICE);
    Validator.validatePositiveNumber(money);

    return money;
  },

  async readWinningNumbers() {
    const input = await readLineAsync(INPUT_MESSAGE.WINNING_NUMBERS);
    Validator.validateNotEmptyString(input);
    const splitInput = input.split(",");
    splitInput.forEach((string) => {
      Validator.validateStringIsNumber(string);
    });

    const numbers = splitInput.map((string) => Number(string));
    numbers.forEach((number) => {
      Validator.validatePositiveNumber(number);
      Validator.validateNumberLower(LOTTO.LOWER, number);
      Validator.validateNumberUpper(LOTTO.UPPER, number);
    });
    Validator.validateNotDuplicated(numbers);

    Validator.validateArrayLength(numbers, LOTTO.COUNT);

    return numbers;
  },

  async readBonusNumber() {
    const input = await readLineAsync(INPUT_MESSAGE.BONUS_NUMBER);
    Validator.validateNotEmptyString(input);
    Validator.validateStringIsNumber(input);
    const bonusNumber = Number(input);

    Validator.validatePositiveNumber(bonusNumber);
    Validator.validateNumberLower(LOTTO.LOWER, bonusNumber);
    Validator.validateNumberUpper(LOTTO.UPPER, bonusNumber);

    return bonusNumber;
  },

  async readRestartCommand() {
    const restartCommand = await readLineAsync(INPUT_MESSAGE.COMMAND);
    const validCommand = COMMAND.YES.concat(COMMAND.NO);
    Validator.validateIncludeElement(restartCommand, validCommand);

    return restartCommand;
  },
};

export default InputView;
