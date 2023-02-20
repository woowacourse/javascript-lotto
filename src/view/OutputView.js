import Messages from '../constant/Messages';
import Lotto from '../domain/lotto/Lotto';
import LottoResult from '../domain/LottoResult';
import Reward from '../domain/reward/Reward';
import Console from '../utils/Console';

const OutputView = {
  /**
   * @param {Lotto[]} lottos
   */
  printLottos(lottos) {
    Console.printf(Messages.PRINT_BOUGHT_LOTTOS_COUNT, lottos.length);
    lottos.forEach((lotto) => {
      Console.printf(Messages.PRINT_BOUGHT_LOTTO, lotto.getLottoNumbers().join(', '));
    });
  },

  /**
   * @param {LottoResult} lottoResult
   * @param {Reward} rewards
   */
  printLottoResult(lottoResult, rewards) {
    Console.print(Messages.PRINT_LOTTO_RESULT_TITLE);
    Console.print(Messages.PRINT_LOTTO_RESULT_SUBTITLE);
    lottoResult.getRewards().forEach((reward) => {
      const count = rewards.filter((_reward) => _reward === reward).length;
      Console.printf(
        Messages.PRINT_LOTTO_RESULT_REWARD,
        reward.getName(),
        reward.getMoney().toLocaleString(),
        count,
      );
    });
  },

  /**
   * @param {number} profitRate
   */
  printProfitRate(profitRate) {
    Console.printf(Messages.PRINT_PROFIT_RATE, (profitRate * 100).toFixed(2));
  },

  printExit() {
    Console.print(Messages.PRINT_EXIT);
    Console.close();
  },
};

export default OutputView;
