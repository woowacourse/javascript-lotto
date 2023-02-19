import Lotto from '../domain/lotto/Lotto';
import LottoResult from '../domain/LottoResult';
import Reward from '../domain/reward/Reward';
import Console from '../utils/Console';

const OutputView = {
  /**
   * @param {Lotto[]} lottos
   */
  printLottos(lottos) {
    Console.print(`${lottos.length}개를 구매했습니다.`);
    lottos.forEach((lotto) => {
      Console.print(`[${lotto.getLottoNumbers().join(', ')}]`);
    });
  },

  /**
   * @param {LottoResult} lottoResult
   * @param {Reward} rewards
   */
  printLottoResult(lottoResult, rewards) {
    Console.print(`당첨 통계`);
    Console.print('★-★-★-★-★-★');
    lottoResult.getRewards().forEach((reward) => {
      const count = rewards.filter((_reward) => _reward === reward).length;
      Console.print(`${reward.toString()} - ${count}개`);
    });
  },

  /**
   * @param {number} profitRate
   */
  printProfitRate(profitRate) {
    Console.print(`총 수익률은 ${(profitRate * 100).toFixed(2)}%입니다.`);
  },

  printExit() {
    Console.print('게임이 종료되었습니다.');
    Console.close();
  },
};

export default OutputView;
