import CustomError from "../error/CustomError.js";
import ERROR_MESSAGE from "../error/errorMessage.js";
import COMMANDS from "../constants/commands.js";

class Command {
  static isExit(input) {
    this.#validate(input);
    return COMMANDS.false === input;
  }

  static #validate(input) {
    const isInvalidCommand = !Object.entries(COMMANDS).some(([_, value]) => input === value);

    if (isInvalidCommand) throw new CustomError(ERROR_MESSAGE.commandNotInList);
  }
}

export default Command;
