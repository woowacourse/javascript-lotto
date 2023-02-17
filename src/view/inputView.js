const Console = require('../utils/Console');
const { MESSAGE } = require('../utils/constant');
const {
  thousandValidate,
  integerValidate,
  maximumMoneyValidate,
  winningIncludeBonusNumber,
  restartValidate,
} = require('../utils/validation');

const inputView = {
  async readMoney() {
    const money = await Console.readLine(MESSAGE.INPUT_MONEY);
    if (thousandValidate(money) && integerValidate(money) && maximumMoneyValidate(money)) return this.readMoney();
    return money;
  },

  async readWinningNumber() {
    return await Console.readLine(MESSAGE.INPUT_WINNING_NUMBER);
  },

  async readBonusNumber() {
    return await Console.readLine(MESSAGE.INPUT_BONUS_NUMBER);
  },

  async readRestartOrFinish() {
    if ((await Console.readLine(MESSAGE.RESTART_OR_FINISH)) === 'y') return 1;
    Console.close();
  },
};

module.exports = inputView;
