const { consoleMessage, profitByRank } = require('../constants/constants');
const Console = require('./Console');

const outputView = {
  printLottoCount(lottoCount) {
    Console.print(consoleMessage.showLottoCount(lottoCount));
  },
  printLottoNumbers(lottos) {
    lottos.forEach((lotto) => {
      Console.print(`[${lotto.getNumbers().join(', ')}]`);
    });
    Console.print('');
  },
  printStatistics(ranks) {
    Console.print(consoleMessage.RESULT_HEADER);

    ranks.forEach((lottoCount, index, origin) => {
      Console.print(
        consoleMessage.showStatistics(
          profitByRank.length - index,
          origin[profitByRank.length - index - 1]
        )
      );
    });
  },

  printProfitRate(profitRate) {
    Console.print(consoleMessage.showProfitRate(profitRate));
  },
};
module.exports = outputView;
