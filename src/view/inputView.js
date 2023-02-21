const Console = require('../utils/Console.js');
const { MESSAGE, RESPONSE } = require('../utils/constant.js');
const {
  moneyValidate,
  restartValidate,
  winningNumberValidate,
  bonusNumberValidate,
} = require('../utils/validation.js');

const inputView = {
  async readMoney() {
    const money = await Console.readLine(MESSAGE.INPUT_MONEY);
    if (moneyValidate(money)) return this.readMoney();
    return money;
  },

  async readWinningNumber() {
    const winning = await Console.readLine(MESSAGE.INPUT_WINNING_NUMBER);
    if (winningNumberValidate(winning)) return this.readWinningNumber();
    return winning;
  },

  async readBonusNumber() {
    const bonus = await Console.readLine(MESSAGE.INPUT_BONUS_NUMBER);
    if (bonusNumberValidate(bonus)) return this.readBonusNumber();
    return bonus;
  },

  async readRestartOrFinish() {
    const response = await Console.readLine(MESSAGE.RESTART_OR_FINISH);
    if (restartValidate(response)) return this.readRestartOrFinish();
    if (response === RESPONSE.YES) return true;
  },
};

module.exports = inputView;
