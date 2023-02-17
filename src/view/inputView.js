const Console = require('../utils/Console');
const { MESSAGE, ERROR } = require('../utils/constant');
const { thousandValidate, maximumMoneyValidate } = require('../utils/validation');

const inputView = {
  async readMoney() {
    const money = await Console.readLine(MESSAGE.INPUT_MONEY);
    if (thousandValidate(money)) throw new Error(ERROR.INPUT_MONEY_THOUSAND);
    if (maximumMoneyValidate(money)) throw new Error(ERROR.INPUT_MONEY_LIMIT);
    return money;
  },

  async readWinningNumber() {
    return await Console.readLine(MESSAGE.INPUT_WINNING_NUMBER);
  },

  async readBonusNumber() {
    return await Console.readLine(MESSAGE.INPUT_BONUS_NUMBER);
  },

  async readRestartOrFinish() {
    if ((await Console.readLine(MESSAGE.RESTART_OR_FINISH)) === 'y') return true;
    Console.close();
  },
};

module.exports = inputView;
