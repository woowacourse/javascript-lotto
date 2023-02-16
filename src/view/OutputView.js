const Console = require('../utils/Console');
const { LOTTO_PRIZE } = require('../domain/constants/index');

const OutputView = {
  printPurchasedLottos(lottos) {
    Console.print(`${lottos.length}개를 구매했습니다.\n`);
    lottos.forEach((lotto) => {
      Console.print(`[${lotto.numbers.join(', ')}]`);
    });
  },

  printErrorMessage(errorMessage) {
    Console.print(errorMessage);
  },

  printStatistics(winningLottos, profitRate) {
    Console.print('당첨 통계');
    Console.print('--------------------');
    this.printWinningLottos(winningLottos.slice(0, 5));
    Console.print(
      `총 수익률은 ${Number(profitRate).toLocaleString('en-US')}%입니다.\n`
    );
  },

  printWinningLottos(winningLottos) {
    [...winningLottos].reverse().forEach((_, idx) => {
      const { CONDITION, MONEY } = LOTTO_PRIZE[idx];
      Console.print(
        `${CONDITION} (${MONEY.toLocaleString('en-US')}원) - ${
          winningLottos[idx]
        }개`
      );
    });
  },

  quit() {
    Console.close();
  },
};

module.exports = OutputView;
