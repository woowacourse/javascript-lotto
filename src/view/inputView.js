const { consoleMessage } = require("../constants/constants");
const Console = require("./Console");

const inputView = {
  readPurchasePrice(createLottos) {
    Console.readLine(
      consoleMessage.ASK_PURCHASE_PRICE,
      (purchasePriceInput) => {
        return createLottos(purchasePriceInput);
      }
    );
  },

  readWinningNumbers(createWinningNumbers) {
    Console.readLine(
      consoleMessage.ASK_WINNING_NUMBERS,
      (winningNumbersInput) => {
        return createWinningNumbers(winningNumbersInput);
      }
    );
  },

  readBonusNumber(createBonusNumber) {
    Console.readLine(consoleMessage.ASK_BONUS_NUMBER, (bonusNumberInput) => {
      return createBonusNumber(bonusNumberInput);
    });
  },

  readRestartCommand(determineRestart) {
    Console.readLine(
      consoleMessage.ASK_RESTART_COMMAND,
      (restartCommandInput) => {
        return determineRestart(restartCommandInput);
      }
    );
  },
};
module.exports = inputView;
