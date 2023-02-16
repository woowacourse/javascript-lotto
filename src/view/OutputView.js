import Console from '../utils/Console';

const OutputView = {
  printLottos(lottos) {
    lottos.forEach((lotto) => {
      Console.print(`[${lotto.getLottoNumbers().join(', ')}]`);
    });
  },

  printLottoResult(receivedRewards) {
    Console.print(`당첨 통계`);
    Console.print('★-★-★-★-★-★');
    receivedRewards.forEach(([reward, count]) => {
      Console.print(`${reward.getTitle()} - ${count}개`);
    });
  },

  printProfitRate(profitRate) {
    Console.print(`총 수익률은 ${(profitRate * 100).toFixed(2)}%입니다.`);
  },
};

export default OutputView;
