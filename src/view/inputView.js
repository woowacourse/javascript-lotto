const Console = require("../util/Console");
const { MESSAGES } = require("../constant/Constant");

const InputView = {
  async readMoney() {
    const money = await Console.readline(MESSAGES.readMoneyText);
    return money;
  },

  async readWinNumbers() {
    const winNumbers = await Console.readline(MESSAGES.readWinNumbersText);
    return winNumbers;
  },

  async readBonusNumber() {
    const bonusNumber = await Console.readline(MESSAGES.readBonusNumberText);
    return bonusNumber;
  },

  async readCommandRestart() {
    const bonusNumber = await Console.readline(MESSAGES.readCommandRestartText);
    return bonusNumber;
  },

  close() {
    Console.close();
  },
};

module.exports = InputView;
