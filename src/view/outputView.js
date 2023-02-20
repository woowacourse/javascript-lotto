const { CONSOLE_MESSAGE, PROFIT_PER_RANK } = require('../constants/constants');
const Console = require('./Console');
const { showStatistics } = require('../utils/index');

const outputView = {
  printLottoCount(lottoCount) {
    Console.print(CONSOLE_MESSAGE.showLottoCount(lottoCount));
  },

  printLottoNumbers(lottos) {
    lottos.forEach((lotto) => {
      Console.print(`[${lotto.getNumbers().join(', ')}]`);
    });
    Console.print('');
  },

  printStatistics(ranks) {
    Console.print(CONSOLE_MESSAGE.RESULT_HEADER);

    ranks.forEach((lottoCount, index, origin) => {
      Console.print(
        showStatistics(
          PROFIT_PER_RANK.length - index,
          origin[PROFIT_PER_RANK.length - index - 1]
        )
      );
    });
  },

  printProfitRate(profitRate) {
    Console.print(CONSOLE_MESSAGE.showProfitRate(profitRate));
  },
};
module.exports = outputView;
