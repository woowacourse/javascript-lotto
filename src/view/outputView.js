const Console = require('../utils/Console');
const { MESSAGE, NUMBER } = require('../utils/constant');

const outputView = {
  printCountLotto(number) {
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
${MESSAGE.THREE_MATCHED}${winnings[NUMBER.FIFTH]}${MESSAGE.THE_NUMBER_OF}
${MESSAGE.FOUR_MATCHED}${winnings[NUMBER.FOURTH]}${MESSAGE.THE_NUMBER_OF}
${MESSAGE.FIVE_MATCHED}${winnings[NUMBER.THIRD]}${MESSAGE.THE_NUMBER_OF}
${MESSAGE.FIVE_WITH_BONUS_MATCHED}${winnings[NUMBER.SECOND]}${MESSAGE.THE_NUMBER_OF}
${MESSAGE.SIX_MATCHED}${winnings[NUMBER.FIRST]}${MESSAGE.THE_NUMBER_OF}`
    );
  },

  printEarningsRate(profit) {
    Console.print(`총 수익률은 ${profit}%입니다.`);
  },
};

module.exports = outputView;
