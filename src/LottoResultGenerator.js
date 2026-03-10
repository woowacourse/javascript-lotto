import LottoRankCalculator from './LottoRankCalculator.js';
import LottoReturnCalculator from './LottoReturnCalculator.js';
import LOTTO from './constants/lotto.js';

class LottoResultGenerator {
  static generateResult(lottos, winningLottoAndBonusNumber) {
    const ranks = LottoRankCalculator.calculateLottoRanks(lottos, winningLottoAndBonusNumber);

    const returnAmount = LottoReturnCalculator.calculateReturnAmount(ranks);
    const returnRate = LottoReturnCalculator.calculateReturnRate(
      returnAmount,
      lottos.length * LOTTO.UNIT,
    );

    return { ranks, returnRate };
  }
}

export default LottoResultGenerator;
