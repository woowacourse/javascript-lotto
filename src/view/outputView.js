const Console = require('../utils/Console.js');
const { MESSAGE } = require('../utils/constant.js');

const outputView = {
  printLottoCount(number) {
    Console.print(`${number}${MESSAGE.PURCHASE_LOTTO}`);
  },

  printLottoNumber(lottos) {
    lottos.forEach(lotto => {
      Console.print(lotto);
    });
  },

  printWinningHistory(winnings) {
    Console.print(
      `${MESSAGE.WINNING_STATICS}
${MESSAGE.THREE_MATCHED}${winnings[4]}${MESSAGE.THE_NUMBER_OF}
${MESSAGE.FOUR_MATCHED}${winnings[3]}${MESSAGE.THE_NUMBER_OF}
${MESSAGE.FIVE_MATCHED}${winnings[2]}${MESSAGE.THE_NUMBER_OF}
${MESSAGE.FIVE_WITH_BONUS_MATCHED}${winnings[1]}${MESSAGE.THE_NUMBER_OF}
${MESSAGE.SIX_MATCHED}${winnings[0]}${MESSAGE.THE_NUMBER_OF}`
    );
  },

  printEarningsRate(profit) {
    Console.print(`${MESSAGE.TOTAL_PROFIT}${profit}${MESSAGE.PROFIT_PERCENT}`);
  },
};

module.exports = outputView;
