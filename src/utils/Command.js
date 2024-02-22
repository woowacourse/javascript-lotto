class Command {
  static Commands = ["y", "n"];

  static isRestart(input) {
    this.#validate(input);
    return this.Commands[0] === input;
  }

  static #validate(input) {
    const isInvalidCommand = !this.Commands.includes(input);
    if (isInvalidCommand) throw new Error("[ERROR]");
  }
}

export default Command;
