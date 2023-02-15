const Console = require('../utils/Console');

const OutputView = {
  printPurchasedLottos(lottos) {
    Console.print(`${lottos.length}개를 구매했습니다.\n`);
    lottos.forEach((lotto) => {
      Console.print(`[${lotto.join(', ')}]`);
    });
  },

  printErrorMessage(errorMessage) {
    Console.print(errorMessage);
  },

  printStatistics(winningLottos, profitRate) {
    Console.print('당첨 통계');
    Console.print('--------------------');
    Console.print(`3개 일치 (5,000원) - ${winningLottos[4]}개`);
    Console.print(`4개 일치 (50,000원) - ${winningLottos[3]}개`);
    Console.print(`5개 일치 (1,500,000원) - ${winningLottos[2]}개`);
    Console.print(`5개 일치 (30,000,000원) - ${winningLottos[1]}개`);
    Console.print(`6개 일치 (2,000,000,000원) - ${winningLottos[0]}개`);
    Console.print(
      `총 수익률은 ${Number(profitRate).toLocaleString('en-US')}%입니다.\n`
    );
  },

  quit() {
    Console.close();
  },
};

module.exports = OutputView;
