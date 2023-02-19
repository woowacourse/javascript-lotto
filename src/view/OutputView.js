import Console from '../utils/Console';

const OutputView = {
  printLottos(lottos) {
    Console.print(`${lottos.length}개를 구매했습니다.`);
    lottos.forEach((lotto) => {
      Console.print(`[${lotto.getLottoNumbers().join(', ')}]`);
    });
  },

  printLottoResult(receivedRewards) {
    Console.print(`당첨 통계`);
    Console.print('★-★-★-★-★-★');
    receivedRewards.forEach(({ reward, count }) => {
      Console.print(
        `${reward.getMatchingNumber()}개 ${reward.getMoney().toLocaleString()}원 - ${count}개`,
      );
    });
  },

  printProfitRate(profitRate) {
    Console.print(`총 수익률은 ${(profitRate * 100).toFixed(2)}%입니다.`);
  },

  printExit() {
    Console.print('게임이 종료되었습니다.');
    Console.close();
  },
};

export default OutputView;
