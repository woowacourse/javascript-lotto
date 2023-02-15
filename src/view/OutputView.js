const Console = require('../util/Console');

const OutputView = {
  printPurchaseQuantity(quantity) {
    Console.print(`${quantity}개를 구매했습니다.`);
  },

  printLottos(lottos) {
    lottos.forEach((lotto) => {
      Console.print(lotto);
    });
  },

  printRanking(ranking) {
    Console.print('당첨 통계');
    Console.print('--------------------');
    Console.print(`3개 일치 (5,000원) - ${ranking[5]}개`);
    Console.print(`4개 일치 (50,000원) - ${ranking[4]}개`);
    Console.print(`5개 일치 (1,500,000원) - ${ranking[3]}개`);
    Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${ranking[2]}개`);
    Console.print(`6개 일치 (2,000,000,000원) - ${ranking[1]}개`);
  },

  printProfitRate(rate) {
    Console.print(`총 수익률은 ${rate.toFixed(1)}%입니다.`);
  },
};

module.exports = OutputView;
