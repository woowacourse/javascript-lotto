import { calculateRank } from '../domain/calculateRank.js';
import { calculateTotalPrize } from '../domain/calculateTotalPrize.js';
import { calculateWinningRate } from '../domain/calculateWinningRate.js';
import { LOTTO_CONDITION } from '../constants/constants.js';

class LottoService {
  static getRank(lottoList, lottoMatch, lottoRank) {
    lottoList.forEach((lotto) => {
      lotto.ranking = calculateRank(lottoMatch.countMatchingNumbers(lotto), lottoMatch.hasBonusNumber(lotto));
      lottoRank.addRankingCount(lotto.ranking);
    });
  }

  static getWinningRate(lottoMaker, lottoList) {
    return calculateWinningRate(LOTTO_CONDITION.PRICE * lottoMaker.purchaseCount, calculateTotalPrize(lottoList));
  }
}
export default LottoService;
