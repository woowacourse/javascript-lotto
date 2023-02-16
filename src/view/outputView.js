import Console from '../utils/Console.js';
import { MESSAGE } from '../utils/constant.js';

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
${MESSAGE.THREE_MATCHED}${winnings[0]}${MESSAGE.THE_NUMBER_OF}
${MESSAGE.FOUR_MATCHED}${winnings[1]}${MESSAGE.THE_NUMBER_OF}
${MESSAGE.FIVE_MATCHED}${winnings[2]}${MESSAGE.THE_NUMBER_OF}
${MESSAGE.FIVE_WITH_BONUS_MATCHED}${winnings[3]}${MESSAGE.THE_NUMBER_OF}
${MESSAGE.SIX_MATCHED}${winnings[4]}${MESSAGE.THE_NUMBER_OF}`
    );
  },

  printEarningsRate(profit) {
    Console.print(`총 수익률은 ${profit}%입니다.`);
  },
};

export default outputView;
