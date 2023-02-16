import Console from '../util/Console.js';

const OutputView = {
  printTheChange(change) {
    if (change) Console.print(`거스름돈은 ${change}원이에요!!`);
  },

  printLottos(lottos) {
    lottos.forEach((numbers) => {
      Console.print(`[${numbers.join(', ')}]`);
    });
  },

  printResult({ first, second, third, fourth, fifth }, earningRate) {
    const formattedRate = this.formatEarningRate(earningRate);
    Console.print(`당첨 통계
--------------------
3개 일치 (5,000원) - ${fifth}개
4개 일치 (50,000원) - ${fourth}개
5개 일치 (1,500,000원) - ${third}개
5개 일치, 보너스 볼 일치 (30,000,000원) - ${second}개
6개 일치 (2,000,000,000원) - ${first}개
총 수익률은 ${formattedRate}%입니다.`);
  },

  formatEarningRate(earningRate) {
    return earningRate.toFixed(1);
  },

  close() {
    Console.close();
  }
};

export default OutputView;
