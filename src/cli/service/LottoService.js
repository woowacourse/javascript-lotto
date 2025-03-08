import LottoGame from '../../common/domain/LottoGame.js';
import LottoMaker from '../../common/domain/LottoMaker.js';
import LottoMatch from '../../common/domain/LottoMatch.js';
import { LOTTO_CONDITION } from '../../common/constants/constants.js';

class LottoService {
  static createLotto(purchaseMoney) {
    return new LottoMaker(purchaseMoney);
  }

  static calculateLottoRank(lottoMaker, { winningNumbers, bonusNumber }) {
    const lottoMatch = new LottoMatch(winningNumbers, bonusNumber);
    const lottoGame = new LottoGame();

    lottoMaker.lottoList.forEach((lotto) => {
      lottoGame.addRankingCount(
        LottoGame.calculateRank(lottoMatch.countMatchingNumbers(lotto), lottoMatch.hasBonusNumber(lotto)),
      );
    });

    return lottoGame.rank;
  }

  static calclateWinningRate(lottoMaker, lottoRank) {
    const winningRate = LottoGame.calculateWinningRate(
      LOTTO_CONDITION.PRICE * lottoMaker.lottoList.length,
      LottoGame.calculateTotalPrize(lottoRank),
    );

    return winningRate;
  }
}

export default LottoService;
