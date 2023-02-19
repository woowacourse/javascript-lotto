const Console = require("../util/Console");

const InputView = {
  async readInput(message) {
    const input = await Console.readline(message);
    return input;
  },

  close() {
    Console.close();
  },
};

module.exports = InputView;
