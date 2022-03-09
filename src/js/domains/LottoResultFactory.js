import { RESULT } from '../constants/constants';
import LottoResult from './LottoResult';
export default class LottoResultFactory {
  static createLottoResult(numberOfMatches, hasBonus) {
    if (numberOfMatches === 3)
      return new LottoResult(RESULT.FIFTH.NAME, RESULT.FIFTH.REWARD);
    if (numberOfMatches === 4)
      return new LottoResult(RESULT.FOURTH.NAME, RESULT.FOURTH.REWARD);
    if (numberOfMatches === 5 && hasBonus) {
      return new LottoResult(RESULT.SECOND.NAME, RESULT.SECOND.REWARD);
    }
    if (numberOfMatches === 5)
      return new LottoResult(RESULT.THIRD.NAME, RESULT.THIRD.REWARD);
    if (numberOfMatches === 6)
      return new LottoResult(RESULT.FIRST.NAME, RESULT.FIRST.REWARD);
    return new LottoResult(RESULT.LOOSING.NAME, RESULT.LOOSING.REWARD);
  }
}
